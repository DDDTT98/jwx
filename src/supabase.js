// Supabase-backed persistence adapter.
// Structured high-traffic namespaces use dedicated PostgreSQL tables.
// Runtime keys are stored in dedicated Supabase tables. The protected legacy archive is accessed only by the separate one-time asset migration endpoint.
export function createSupabaseStore(env) {
  const baseUrl = env.SUPABASE_URL;
  const key = env.SUPABASE_KEY;
  if (!baseUrl || !key) throw new Error('Supabase persistence requires SUPABASE_URL and SUPABASE_KEY');

  const rowCache = new Map();
  const pendingGets = new Map();

  function headers(extra) {
    return Object.assign({
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': 'Bearer ' + key
    }, extra || {});
  }
  function endpoint(table, params) {
    return baseUrl.replace(/\/$/, '') + '/rest/v1/' + table + (params ? '?' + params : '');
  }
  async function requestTable(table, params, init) {
    const resp = await fetch(endpoint(table, params), Object.assign({ headers: headers() }, init || {}));
    if (!resp.ok) throw new Error('Supabase ' + table + ' request failed [' + resp.status + ']: ' + await resp.text());
    if (resp.status === 204) return [];
    const body = await resp.text();
    return body ? JSON.parse(body) : [];
  }
  function decodeBase64(value) {
    const binary = atob(value || '');
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
  function encodeBase64(bytes) {
    let binary = '';
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }
  function decodeRow(row, type) {
    if (!row || (row.expires_at && new Date(row.expires_at).getTime() <= Date.now())) return null;
    const bytes = row.value_type === 'base64' ? decodeBase64(row.value) : new TextEncoder().encode(row.value || '');
    const requestedType = typeof type === 'string' ? type : (type && type.type) || 'text';
    if (requestedType === 'json') return JSON.parse(new TextDecoder().decode(bytes));
    if (requestedType === 'arrayBuffer') return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    if (requestedType === 'stream') return new Response(bytes).body;
    return new TextDecoder().decode(bytes);
  }
  function parseKey(keyName) {
    const parts = String(keyName).split(':');
    if (keyName.indexOf('config:') === 0) return { kind: 'setting' };
    if (keyName === 'dialer:accounts') return { kind: 'accounts' };
    if (parts[0] === 'dialer' && parts[1] === 'session' && parts.length >= 3) return { kind: 'session', token: parts.slice(2).join(':') };
    // Device-ban flags must be mapped to Supabase and read fresh on every check.
    if (parts[0] === 'dialer' && parts[1] === 'device-ban' && parts.length === 4) return { kind: 'device_ban', accountId: parts[2], deviceId: parts[3] };
    if (parts[0] === 'dialer' && parts[1] === 'master-active' && parts.length === 3) return { kind: 'runtime_cache' };
    if (parts[0] === 'dialer' && (parts[1] === 'login' || parts[1] === 'unlock') && parts[2] === 'fail' && parts.length >= 4) return { kind: 'runtime_cache' };
    if (parts[0] === 'dialer' && parts[1] === 'bgjob' && parts.length >= 3) return { kind: 'job', id: parts.slice(2).join(':') };
    if (parts[0] === 'work_stats' && parts.length === 3) return { kind: 'work', accountId: parts[1], date: parts[2] };
    if (parts[0] === 'work_stats_cd' && parts.length >= 4) return { kind: 'cooldown', accountId: parts[1], date: parts[2], deviceId: parts.slice(3).join(':') };
    if (parts[0] === 'upload_log' && parts.length >= 3) return { kind: 'upload' };
    if ((parts[0] === 'client_ops_all' || parts[0] === 'client_ops_dial' || parts[0] === 'client_ops_copy') && parts.length >= 4) {
      const operationType = parts[0] === 'client_ops_dial' ? 'dial' : (parts[0] === 'client_ops_copy' ? 'copy' : 'all');
      return { kind: 'operation', operationType: operationType, accountId: parts[1], date: parts[2] };
    }
    if (keyName === 'diet:config') return { kind: 'diet_config' };
    if (parts[0] === 'diet' && parts.length === 2 && /^\d{4}-\d{2}-\d{2}$/.test(parts[1])) return { kind: 'diet_date', date: parts[1] };
    if (parts[0] === 'dialer' && parts[1] === 'wc' && parts.length === 4) return { kind: 'wechat', accountId: parts[2], date: parts[3] };
    if (parts[0] === 'dialer' && parts[1] === 'master-pull' && parts[2] === 'day' && parts.length === 5) return { kind: 'master_pull', accountId: parts[3], date: parts[4] };
    if (parts[0] === 'dialer' && parts[1] === 'lock' && parts[2] === 'pull' && parts.length >= 4) return { kind: 'pull_lock', accountId: parts.slice(3).join(':') };
    if (parts[0] === 'auto_delete_batch' && parts.length >= 3) return { kind: 'batch_marker', accountId: parts[1], batchLabel: parts.slice(2).join(':') };
    if (parts[0] === 'correction' && parts.length >= 2) return { kind: 'runtime_cache' };
    return null;
  }
  function normalizeTypedRow(keyName, kind, row) {
    if (!row) return null;
    if (kind === 'setting') return { key: keyName, value: row.value, value_type: row.value_type || 'text', expires_at: row.expires_at || null };
    if (kind === 'accounts') return { key: keyName, value: JSON.stringify(row.accounts || []), value_type: 'text', expires_at: null };
    if (kind === 'session' || kind === 'work' || kind === 'cooldown' || kind === 'upload' || kind === 'job') {
      return { key: keyName, value: JSON.stringify(row.payload || {}), value_type: 'text', expires_at: row.expires_at || null };
    }
    if (kind === 'operation') return { key: keyName, value: row.value || '1', value_type: row.value_type || 'text', expires_at: row.expires_at || null };
    if (kind === 'diet_config') return { key: keyName, value: JSON.stringify(row.config || {}), value_type: 'text', expires_at: null };
    if (kind === 'diet_date') return { key: keyName, value: JSON.stringify(row.data || {}), value_type: 'text', expires_at: null };
    if (kind === 'wechat') return { key: keyName, value: String(row.count || 0), value_type: 'text', expires_at: null };
    if (kind === 'master_pull') return { key: keyName, value: JSON.stringify({ count: row.count || 0, updated_at: row.updated_at }), value_type: 'text', expires_at: row.expires_at || null };
    if (kind === 'pull_lock') return { key: keyName, value: row.lock_value || '', value_type: 'text', expires_at: row.expires_at || null };
    if (kind === 'batch_marker') return { key: keyName, value: JSON.stringify(row.payload || {}), value_type: 'text', expires_at: null };
    if (kind === 'runtime_cache' || kind === 'device_ban') return { key: keyName, value: row.value, value_type: row.value_type || 'text', expires_at: row.expires_at || null };
    return null;
  }
  async function getTypedRow(keyName, descriptor) {
    const params = new URLSearchParams();
    let table, kind = descriptor.kind;
    if (kind === 'setting') {
      table = 'app_settings'; params.set('select', 'value,value_type,expires_at'); params.set('setting_key', 'eq.' + keyName);
    } else if (kind === 'accounts') {
      table = 'dialer_account_registry'; params.set('select', 'accounts'); params.set('registry_id', 'eq.primary');
    } else if (kind === 'session') {
      table = 'dialer_sessions'; params.set('select', 'payload,expires_at'); params.set('session_token', 'eq.' + descriptor.token);
    } else if (kind === 'job') {
      table = 'dialer_background_jobs'; params.set('select', 'payload,expires_at'); params.set('job_id', 'eq.' + descriptor.id);
    } else if (kind === 'work') {
      table = 'dialer_work_stats'; params.set('select', 'payload'); params.set('account_id', 'eq.' + descriptor.accountId); params.set('stat_date', 'eq.' + descriptor.date);
    } else if (kind === 'cooldown') {
      table = 'dialer_work_cooldowns'; params.set('select', 'payload'); params.set('account_id', 'eq.' + descriptor.accountId); params.set('stat_date', 'eq.' + descriptor.date); params.set('device_id', 'eq.' + descriptor.deviceId);
    } else if (kind === 'upload') {
      table = 'dialer_upload_logs'; params.set('select', 'payload'); params.set('log_key', 'eq.' + keyName);
    } else if (kind === 'operation') {
      table = 'dialer_client_operations'; params.set('select', 'value,value_type,expires_at'); params.set('operation_key', 'eq.' + keyName);
    } else if (kind === 'diet_config') {
      table = 'diet_settings'; params.set('select', 'config'); params.set('settings_id', 'eq.primary');
    } else if (kind === 'diet_date') {
      table = 'diet_daily_entries'; params.set('select', 'data'); params.set('entry_date', 'eq.' + descriptor.date);
    } else if (kind === 'wechat') {
      table = 'dialer_wechat_counts'; params.set('select', 'count'); params.set('account_id', 'eq.' + descriptor.accountId); params.set('count_date', 'eq.' + descriptor.date);
    } else if (kind === 'master_pull') {
      table = 'dialer_master_pull_daily'; params.set('select', 'count,updated_at,expires_at'); params.set('account_id', 'eq.' + descriptor.accountId); params.set('pull_date', 'eq.' + descriptor.date);
    } else if (kind === 'pull_lock') {
      table = 'dialer_pull_locks'; params.set('select', 'lock_value,expires_at'); params.set('account_id', 'eq.' + descriptor.accountId);
    } else if (kind === 'batch_marker') {
      table = 'dialer_batch_delete_markers'; params.set('select', 'payload'); params.set('marker_key', 'eq.' + keyName);
    } else if (kind === 'runtime_cache' || kind === 'device_ban') {
      table = 'app_runtime_cache'; params.set('select', 'value,value_type,expires_at'); params.set('cache_key', 'eq.' + keyName);
    } else return null;
    params.set('limit', '1');
    const rows = await requestTable(table, params.toString());
    return normalizeTypedRow(keyName, kind, rows[0] || null);
  }
  function getExpiry(options) {
    const opts = options || {};
    if (Number.isFinite(opts.expirationTtl) && opts.expirationTtl > 0) return new Date(Date.now() + opts.expirationTtl * 1000).toISOString();
    if (Number.isFinite(opts.expiration) && opts.expiration > 0) return new Date(opts.expiration * 1000).toISOString();
    return null;
  }
  async function upsertTable(table, conflict, row) {
    await requestTable(table, 'on_conflict=' + encodeURIComponent(conflict), {
      method: 'POST',
      headers: headers({ 'Prefer': 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify([row])
    });
  }
  async function putTyped(keyName, descriptor, storedValue, valueType, options) {
    const expiresAt = getExpiry(options);
    const now = new Date().toISOString();
    if (descriptor.kind === 'setting') {
      await upsertTable('app_settings', 'setting_key', { setting_key: keyName, value: storedValue, value_type: valueType, updated_at: now, expires_at: expiresAt });
      return { key: keyName, value: storedValue, value_type: valueType, expires_at: expiresAt };
    }
    if (descriptor.kind === 'accounts') {
      const accounts = JSON.parse(storedValue || '[]');
      await upsertTable('dialer_account_registry', 'registry_id', { registry_id: 'primary', accounts: accounts, updated_at: now });
      return { key: keyName, value: JSON.stringify(accounts), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'session') {
      const payload = JSON.parse(storedValue || '{}');
      await upsertTable('dialer_sessions', 'session_token', { session_token: descriptor.token, payload: payload, created_at: payload.created_at || null, updated_at: now, expires_at: expiresAt });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: expiresAt };
    }
    if (descriptor.kind === 'work') {
      const payload = JSON.parse(storedValue || '{}');
      await upsertTable('dialer_work_stats', 'account_id,stat_date', {
        account_id: descriptor.accountId, stat_date: descriptor.date,
        rounds: Number(payload.rounds || 0), wechat_count: Number(payload.wechat_count || 0),
        payload: payload, updated_at: now
      });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'cooldown') {
      const payload = JSON.parse(storedValue || '{}');
      await upsertTable('dialer_work_cooldowns', 'account_id,stat_date,device_id', {
        account_id: descriptor.accountId, stat_date: descriptor.date, device_id: descriptor.deviceId,
        payload: payload, updated_at: now
      });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'upload') {
      const payload = JSON.parse(storedValue || '{}');
      const parts = keyName.split(':');
      const keyTime = Number(parts[1]);
      const payloadTime = Number(payload.created_at);
      const occurredAt = Number.isFinite(payloadTime) && payloadTime > 0
        ? new Date(payloadTime < 100000000000 ? payloadTime * 1000 : payloadTime).toISOString()
        : (Number.isFinite(keyTime) && keyTime > 0 ? new Date(keyTime).toISOString() : now);
      await upsertTable('dialer_upload_logs', 'log_key', {
        log_key: keyName, occurred_at: occurredAt, account_id: payload.account_id || null,
        account_name: payload.account_name || null, batch_label: payload.batch_label || null,
        customer_count: Number.isFinite(Number(payload.count)) ? Number(payload.count) : null,
        metric_version: Number.isFinite(Number(payload.metric_version)) ? Number(payload.metric_version) : null,
        log_type: payload.type || null, payload: payload, created_at: now
      });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'operation') {
      const parts = keyName.split(':');
      const mobile = parts.slice(3).join(':');
      await upsertTable('dialer_client_operations', 'operation_key', {
        operation_key: keyName, operation_type: descriptor.operationType,
        account_id: descriptor.accountId, operation_date: descriptor.date,
        mobile: mobile, value: storedValue, value_type: valueType, expires_at: expiresAt, created_at: now
      });
      return { key: keyName, value: storedValue, value_type: valueType, expires_at: expiresAt };
    }
    if (descriptor.kind === 'job') {
      const payload = JSON.parse(storedValue || '{}');
      await upsertTable('dialer_background_jobs', 'job_id', {
        job_id: descriptor.id, status: payload.status || 'queued', job_kind: payload.kind || null,
        payload: payload, updated_at: now, expires_at: expiresAt
      });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: expiresAt };
    }
    if (descriptor.kind === 'diet_config') {
      const config = JSON.parse(storedValue || '{}');
      await upsertTable('diet_settings', 'settings_id', { settings_id: 'primary', config: config, updated_at: now });
      return { key: keyName, value: JSON.stringify(config), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'diet_date') {
      const data = JSON.parse(storedValue || '{}');
      await upsertTable('diet_daily_entries', 'entry_date', { entry_date: descriptor.date, data: data, updated_at: now });
      return { key: keyName, value: JSON.stringify(data), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'wechat') {
      const count = Math.max(0, parseInt(storedValue || '0', 10) || 0);
      await upsertTable('dialer_wechat_counts', 'account_id,count_date', { account_id: descriptor.accountId, count_date: descriptor.date, count: count, updated_at: now });
      return { key: keyName, value: String(count), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'master_pull') {
      const payload = JSON.parse(storedValue || '{}');
      const updatedAt = Number(payload.updated_at);
      const updatedIso = Number.isFinite(updatedAt) && updatedAt > 0
        ? new Date(updatedAt < 100000000000 ? updatedAt * 1000 : updatedAt).toISOString()
        : now;
      await upsertTable('dialer_master_pull_daily', 'account_id,pull_date', {
        account_id: descriptor.accountId, pull_date: descriptor.date,
        count: Math.max(0, parseInt(payload.count || 0, 10) || 0),
        updated_at: updatedIso, expires_at: expiresAt
      });
      return { key: keyName, value: JSON.stringify({ count: Math.max(0, parseInt(payload.count || 0, 10) || 0), updated_at: payload.updated_at }), value_type: 'text', expires_at: expiresAt };
    }
    if (descriptor.kind === 'pull_lock') {
      const lockExpiry = expiresAt || new Date(Date.now() + 60000).toISOString();
      await upsertTable('dialer_pull_locks', 'account_id', { account_id: descriptor.accountId, lock_value: storedValue, expires_at: lockExpiry, updated_at: now });
      return { key: keyName, value: storedValue, value_type: 'text', expires_at: lockExpiry };
    }
    if (descriptor.kind === 'batch_marker') {
      const payload = JSON.parse(storedValue || '{}');
      let label = descriptor.batchLabel;
      try { label = decodeURIComponent(label); } catch (_) {}
      await upsertTable('dialer_batch_delete_markers', 'marker_key', {
        marker_key: keyName, account_id: descriptor.accountId, batch_label: label, payload: payload, created_at: now
      });
      return { key: keyName, value: JSON.stringify(payload), value_type: 'text', expires_at: null };
    }
    if (descriptor.kind === 'runtime_cache' || descriptor.kind === 'device_ban') {
      await upsertTable('app_runtime_cache', 'cache_key', { cache_key: keyName, value: storedValue, value_type: valueType, expires_at: expiresAt, updated_at: now });
      return { key: keyName, value: storedValue, value_type: valueType, expires_at: expiresAt };
    }
    return null;
  }
  async function deleteTyped(keyName, descriptor) {
    const params = new URLSearchParams();
    let table, field, value;
    if (descriptor.kind === 'setting') { table='app_settings'; field='setting_key'; value=keyName; }
    else if (descriptor.kind === 'accounts') { table='dialer_account_registry'; field='registry_id'; value='primary'; }
    else if (descriptor.kind === 'session') { table='dialer_sessions'; field='session_token'; value=descriptor.token; }
    else if (descriptor.kind === 'job') { table='dialer_background_jobs'; field='job_id'; value=descriptor.id; }
    else if (descriptor.kind === 'work') { table='dialer_work_stats'; params.set('account_id','eq.'+descriptor.accountId); params.set('stat_date','eq.'+descriptor.date); }
    else if (descriptor.kind === 'cooldown') { table='dialer_work_cooldowns'; params.set('account_id','eq.'+descriptor.accountId); params.set('stat_date','eq.'+descriptor.date); params.set('device_id','eq.'+descriptor.deviceId); }
    else if (descriptor.kind === 'upload') { table='dialer_upload_logs'; field='log_key'; value=keyName; }
    else if (descriptor.kind === 'operation') { table='dialer_client_operations'; field='operation_key'; value=keyName; }
    else if (descriptor.kind === 'diet_config') { table='diet_settings'; field='settings_id'; value='primary'; }
    else if (descriptor.kind === 'diet_date') { table='diet_daily_entries'; field='entry_date'; value=descriptor.date; }
    else if (descriptor.kind === 'wechat') { table='dialer_wechat_counts'; params.set('account_id','eq.'+descriptor.accountId); params.set('count_date','eq.'+descriptor.date); }
    else if (descriptor.kind === 'master_pull') { table='dialer_master_pull_daily'; params.set('account_id','eq.'+descriptor.accountId); params.set('pull_date','eq.'+descriptor.date); }
    else if (descriptor.kind === 'pull_lock') { table='dialer_pull_locks'; field='account_id'; value=descriptor.accountId; }
    else if (descriptor.kind === 'batch_marker') { table='dialer_batch_delete_markers'; field='marker_key'; value=keyName; }
    else if (descriptor.kind === 'runtime_cache' || descriptor.kind === 'device_ban') { table='app_runtime_cache'; field='cache_key'; value=keyName; }
    else return false;
    if (field) params.set(field, 'eq.' + value);
    await requestTable(table, params.toString(), { method: 'DELETE', headers: headers({ 'Prefer': 'return=minimal' }) });
    return true;
  }
  function listDescriptor(prefix) {
    if (prefix && prefix.indexOf('upload_log:') === 0) return { kind: 'upload', table: 'dialer_upload_logs', field: 'log_key', select: 'log_key,payload' };
    if (prefix && (prefix.indexOf('client_ops_all:') === 0 || prefix.indexOf('client_ops_dial:') === 0 || prefix.indexOf('client_ops_copy:') === 0)) return { kind: 'operation', table: 'dialer_client_operations', field: 'operation_key', select: 'operation_key,value,value_type,expires_at' };
    if (prefix && prefix.indexOf('dialer:bgjob:') === 0) return { kind: 'job', table: 'dialer_background_jobs', field: 'job_id', select: 'job_id,payload,expires_at' };
    if (prefix && prefix.indexOf('diet:') === 0 && prefix !== 'diet:config') return { kind: 'diet', table: 'diet_daily_entries', field: 'entry_date', select: 'entry_date,data' };
    return null;
  }
  function normalizeListRow(row, descriptor) {
    if (descriptor.kind === 'upload') return { key: row.log_key, value: JSON.stringify(row.payload || {}), value_type: 'text', expires_at: row.expires_at || null };
    if (descriptor.kind === 'operation') return { key: row.operation_key, value: row.value || '1', value_type: row.value_type || 'text', expires_at: row.expires_at || null };
    if (descriptor.kind === 'job') return { key: 'dialer:bgjob:' + row.job_id, value: JSON.stringify(row.payload || {}), value_type: 'text', expires_at: row.expires_at || null };
    if (descriptor.kind === 'diet') return { key: 'diet:' + row.entry_date, value: JSON.stringify(row.data || {}), value_type: 'text', expires_at: null };
    return null;
  }
  function isExpiredRow(row) {
    if (!row || !row.expires_at) return false;
    const expiresAt = Date.parse(row.expires_at);
    return Number.isFinite(expiresAt) && expiresAt <= Date.now();
  }
  async function get(keyName, type) {
    // Always read dialer sessions from Postgres: a master account's remote revoke
    // must be visible immediately across Worker isolates, not hidden by rowCache.
    const sessionDescriptor = parseKey(keyName);
    if (sessionDescriptor && (sessionDescriptor.kind === 'session' || sessionDescriptor.kind === 'device_ban')) {
      let sessionRow = await getTypedRow(keyName, sessionDescriptor);
      if (isExpiredRow(sessionRow)) {
        await deleteTyped(keyName, sessionDescriptor);
        sessionRow = null;
      }
      return decodeRow(sessionRow, type);
    }
    if (rowCache.has(keyName)) {
      const cached = rowCache.get(keyName);
      if (isExpiredRow(cached)) {
        rowCache.set(keyName, null);
        return null;
      }
      return decodeRow(cached, type);
    }
    let pending = pendingGets.get(keyName);
    if (!pending) {
      pending = (async function() {
        const descriptor = parseKey(keyName);
        if (!descriptor) throw new Error('未映射的 Supabase 数据键，已阻止回退到 app_kv：' + keyName);
        let row = await getTypedRow(keyName, descriptor);
        if (isExpiredRow(row)) {
          await deleteTyped(keyName, descriptor);
          row = null;
        }
        rowCache.set(keyName, row);
        return row;
      })();
      pendingGets.set(keyName, pending);
    }
    try { return decodeRow(await pending, type); }
    finally { if (pendingGets.get(keyName) === pending) pendingGets.delete(keyName); }
  }
  async function put(keyName, value, options) {
    let storedValue, valueType = 'text';
    if (typeof value === 'string') storedValue = value;
    else {
      let bytes;
      if (value instanceof ArrayBuffer) bytes = new Uint8Array(value);
      else if (ArrayBuffer.isView(value)) bytes = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      else if (value && typeof value.arrayBuffer === 'function') bytes = new Uint8Array(await value.arrayBuffer());
      else storedValue = String(value);
      if (bytes) { storedValue = encodeBase64(bytes); valueType = 'base64'; }
    }
    const descriptor = parseKey(keyName);
    if (!descriptor) throw new Error('未映射的 Supabase 数据键，已阻止写入 app_kv：' + keyName);
    const row = await putTyped(keyName, descriptor, storedValue, valueType, options);
    if (!row) throw new Error('Supabase 数据键没有专用表映射：' + keyName);
    rowCache.set(keyName, row);
  }
  async function remove(keyName) {
    const descriptor = parseKey(keyName);
    if (!descriptor) throw new Error('未映射的 Supabase 数据键，已阻止删除 app_kv：' + keyName);
    if (!await deleteTyped(keyName, descriptor)) throw new Error('Supabase 数据键没有专用表映射：' + keyName);
    rowCache.set(keyName, null);
  }
  async function list(options) {
    const opts = options || {};
    const limit = Math.max(1, Math.min(Number(opts.limit) || 1000, 5000));
    const offset = Math.max(0, parseInt(opts.cursor || '0', 10) || 0);
    const mapped = listDescriptor(opts.prefix || '');
    if (mapped) {
      const params = new URLSearchParams({ select: mapped.select, order: mapped.field + '.asc', limit: String(limit), offset: String(offset) });
      if (mapped.kind === 'operation') {
        const parts = String(opts.prefix).split(':');
        params.set('operation_type', 'eq.' + (parts[0] === 'client_ops_dial' ? 'dial' : (parts[0] === 'client_ops_copy' ? 'copy' : 'all')));
        if (parts[1]) params.set('account_id', 'eq.' + parts[1]);
        if (parts[2]) params.set('operation_date', 'eq.' + parts[2]);
        params.set('order', 'operation_date.asc,mobile.asc');
      } else if (mapped.kind === 'diet') {
        const datePrefix = String(opts.prefix).slice('diet:'.length);
        if (/^\d{4}-\d{2}$/.test(datePrefix)) {
          const year = Number(datePrefix.slice(0,4));
          const month = Number(datePrefix.slice(5,7));
          const startDate = datePrefix + '-01';
          const nextDate = new Date(Date.UTC(year, month, 1)).toISOString().slice(0,10);
          params.set('entry_date', 'gte.' + startDate);
          params.append('entry_date', 'lt.' + nextDate);
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(datePrefix)) {
          params.set('entry_date', 'eq.' + datePrefix);
        }
      } else if (mapped.kind === 'job') {
        // job_id 列只存 crm_xxx 任务号，不带 'dialer:bgjob:' 前缀，
        // 用 like 过滤会让后台任务永远查不到自己，导入将一直停在 queued。
        // 同时按更新时间倒序，避免已完成任务累积后占满 limit 饿死新任务。
        params.set('order', 'updated_at.desc');
      } else {
        // 其余类型（如 upload_log）的键值本身就带前缀，仍用 like 过滤。
        params.set(mapped.field, 'like.' + String(opts.prefix).replace(/[\\*]/g, '\\$&') + '*');
      }
      if (mapped.kind !== 'upload' && mapped.kind !== 'diet') params.set('or', '(expires_at.is.null,expires_at.gt.' + new Date().toISOString() + ')');
      const rows = await requestTable(mapped.table, params.toString());
      rows.forEach(row => { const normalized = normalizeListRow(row, mapped); if (normalized) rowCache.set(normalized.key, normalized); });
      return {
        keys: rows.map(row => ({ name: mapped.kind === 'upload' ? row.log_key : mapped.kind === 'operation' ? row.operation_key : mapped.kind === 'diet' ? 'diet:' + row.entry_date : 'dialer:bgjob:' + row.job_id })),
        list_complete: rows.length < limit,
        cursor: rows.length < limit ? undefined : String(offset + rows.length)
      };
    }
    throw new Error('未映射的 Supabase 列表前缀，已阻止扫描 app_kv：' + String(opts.prefix || ''));
  }
  return { get: get, put: put, delete: remove, list: list };
}

// Supabase REST API helper for Cloudflare Workers
// Uses fetch() directly to avoid SDK compatibility issues

export function createSupabaseClient(env) {
  const baseUrl = env.SUPABASE_URL;
  const key = env.SUPABASE_KEY;

  if (!baseUrl || !key) {
    console.warn('[supabase] SUPABASE_URL or SUPABASE_KEY not configured. All operations will be no-ops.');
  }

  function headers() {
    return {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': 'Bearer ' + key,
      'Prefer': 'return=minimal'
    };
  }

  /**
   * Upsert companies into the whitelist.
   * Accepts array of strings or array of { company_name, alias? } objects.
   * Uses resolution=merge-duplicates to upsert by unique company_name.
   */
  async function upsertCompanies(companies) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!Array.isArray(companies) || companies.length === 0) {
      return { count: 0 };
    }

    // Normalize and deduplicate by company + product. One company may belong to multiple products.
    const rowMap = new Map();
    companies.forEach(function(c) {
      const row = typeof c === 'string'
        ? { company_name: c.trim(), bank_name: '建行建易贷', status: '正常' }
        : {
            company_name: (c.company_name || '').trim(),
            alias: c.alias || null,
            bank_name: String(c.bank_name || '建行建易贷').trim(),
            status: c.status || '正常'
          };
      if (!row.company_name || !row.bank_name) return;
      rowMap.set(row.company_name.toLowerCase() + '\\u0000' + row.bank_name.toLowerCase(), row);
    });
    const rows = Array.from(rowMap.values());
    if (rows.length === 0) return { count: 0 };

    let count = 0;
    const batchSize = 1000;
    for (let i = 0; i < rows.length; i += batchSize) {
      const chunk = rows.slice(i, i + batchSize);
      const resp = await fetch(baseUrl + '/rest/v1/whitelist_companies?on_conflict=company_name,bank_name', {
        method: 'POST',
        headers: Object.assign({}, headers(), {
          'Prefer': 'resolution=merge-duplicates'
        }),
        body: JSON.stringify(chunk)
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error('Supabase upsert failed [' + resp.status + ']: ' + text);
      }
      count += chunk.length;
    }

    return { count: count };
  }

  /**
   * Get all whitelist companies, sorted by company_name.
   */
  async function getAllCompanies() {
    if (!baseUrl || !key) return [];

    var all = [];
    var page = 0;
    var pageSize = 5000; // Supabase 项目 Max rows 已按 5000 配置，减少白名单分页请求。

    while (true) {
      var from = page * pageSize;
      var to = from + pageSize - 1;

      var resp = await fetch(
        baseUrl + '/rest/v1/whitelist_companies?select=id,company_name,alias,bank_name,status,created_at&order=company_name.asc',
        {
          headers: Object.assign({}, headers(), {
            'Range': from + '-' + to
          })
        }
      );

      if (!resp.ok) {
        var text = await resp.text();
        throw new Error('Supabase query failed [' + resp.status + ']: ' + text);
      }

      var data = await resp.json();
      if (!Array.isArray(data) || data.length === 0) {
        break;
      }

      all.push.apply(all, data);

      if (data.length < pageSize) {
        break;
      }

      page++;
    }

    return all;
  }

  /**
   * Check client company names against the whitelist.
   * Returns match results with case-insensitive comparison.
   */
  async function checkCompanies(companyNames) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');

    // Fetch the full whitelist (efficient for typical sizes <10000 entries)
    const whitelist = await getAllCompanies();

    // Group all active product rows under both company name and alias.
    var lookup = {};
    whitelist.forEach(function(entry) {
      if (entry.status === '已失效' || entry.status === '已删除') return;
      [entry.company_name, entry.alias].forEach(function(value) {
        var key = String(value || '').toLowerCase().trim();
        if (!key) return;
        if (!lookup[key]) lookup[key] = [];
        lookup[key].push(entry);
      });
    });

    return (companyNames || []).map(function(name) {
      if (!name || !String(name).trim()) {
        return { company: name, isMatch: false, matchedName: null, bank_name: null, bank_names: [], status: null };
      }
      var matches = lookup[String(name).toLowerCase().trim()] || [];
      var products = Array.from(new Set(matches.map(function(row) { return row.bank_name; }).filter(Boolean)));
      return {
        company: name,
        isMatch: matches.length > 0,
        matchedName: matches.length ? matches[0].company_name : null,
        bank_name: products[0] || null,
        bank_names: products,
        status: matches.length ? matches[0].status : null
      };
    });
  }

  /**
   * Delete a company from the whitelist by name.
   */
  async function deleteCompany(companyName) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!companyName || !companyName.trim()) {
      throw new Error('company_name is required');
    }

    const resp = await fetch(
      baseUrl + '/rest/v1/whitelist_companies?company_name=eq.' + encodeURIComponent(companyName.trim()),
      {
        method: 'DELETE',
        headers: headers()
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error('Supabase delete failed [' + resp.status + ']: ' + text);
    }

    return { success: true };
  }

  /**
   * Save learning knowledge item to Supabase knowledge_base table.
   */
  async function saveKnowledge(item) {
    if (!baseUrl || !key) return null;

    const row = {
      title: item.title || '未命名知识',
      summary: item.summary || '',
      content: item.content || '',
      tags: Array.isArray(item.tags) ? item.tags : [],
      source_type: item.source_type || '自定义'
    };

    const resp = await fetch(baseUrl + '/rest/v1/knowledge_base', {
      method: 'POST',
      headers: Object.assign({}, headers(), {
        'Prefer': 'return=representation'
      }),
      body: JSON.stringify(row)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('[supabase] saveKnowledge failed:', text);
      throw new Error('Supabase saveKnowledge failed: ' + text);
    }

    const data = await resp.json();
    return data && data[0] ? data[0] : null;
  }

  async function searchCustomers(queryStr) {
    if (!baseUrl || !key) return [];
    const resp = await fetch(
      baseUrl + '/rest/v1/customers?select=*&or=(name.ilike.%' + encodeURIComponent(queryStr) + '%,mobile.ilike.%' + encodeURIComponent(queryStr) + '%,company_name.ilike.%' + encodeURIComponent(queryStr) + '%)&order=created_at.desc',
      { headers: headers() }
    );
    if (!resp.ok) return [];
    return await resp.json();
  }

  async function searchSpeech(queryStr) {
    if (!baseUrl || !key) return [];
    const resp = await fetch(
      baseUrl + '/rest/v1/speech_library?select=*&or=(category.ilike.%' + encodeURIComponent(queryStr) + '%,scenario.ilike.%' + encodeURIComponent(queryStr) + '%,content.ilike.%' + encodeURIComponent(queryStr) + '%)&order=score.desc',
      { headers: headers() }
    );
    if (!resp.ok) return [];
    return await resp.json();
  }

  async function searchLoanCases(queryStr) {
    if (!baseUrl || !key) return [];
    const resp = await fetch(
      baseUrl + '/rest/v1/loan_cases?select=*&or=(company_name.ilike.%' + encodeURIComponent(queryStr) + '%,loan_product.ilike.%' + encodeURIComponent(queryStr) + '%)&order=company_name.asc',
      { headers: headers() }
    );
    if (!resp.ok) return [];
    return await resp.json();
  }

  async function searchKnowledge(queryStr) {
    if (!baseUrl || !key) return [];
    const resp = await fetch(
      baseUrl + '/rest/v1/knowledge_base?select=*&or=(title.ilike.%' + encodeURIComponent(queryStr) + '%,summary.ilike.%' + encodeURIComponent(queryStr) + '%,content.ilike.%' + encodeURIComponent(queryStr) + '%)&limit=5',
      { headers: headers() }
    );
    if (!resp.ok) return [];
    return await resp.json();
  }

  /**
   * Get all customers with pagination and optional search.
   */
  async function getAllCustomers(page, pageSize, search, sortBy, sortDir, category, batchLabel, excludeMobiles, accountId) {
    if (!baseUrl || !key) return { data: [], total: 0, page: page || 1, pageSize: pageSize || 50 };

    try {
      var p = Math.max(1, parseInt(page, 10) || 1);
      var ps = Math.min(5000, Math.max(1, parseInt(pageSize, 10) || 50)); // 最多 5000 条，避免单次请求扫描过大

      var searchOrFilter = '';
      if (search) {
        searchOrFilter = 'or(name.ilike.%25' + encodeURIComponent(search) + '%25,mobile.ilike.%25' + encodeURIComponent(search) + '%25,company_name.ilike.%25' + encodeURIComponent(search) + '%25)';
      }

      // Exclude cooldown mobiles (cap at 100 to keep URL within limits)
      var excludeFilter = '';
      if (excludeMobiles && Array.isArray(excludeMobiles) && excludeMobiles.length > 0) {
        var capped = excludeMobiles.slice(0, 100);
        excludeFilter = '&mobile=not.in.(' + capped.map(function(m) { return encodeURIComponent(m); }).join(',') + ')';
      }

      // 普通首页按当前账户过滤；公海视图只显示主账户归属及历史未归属的公海数据。
      var accountFilter = '';
      var accountOrFilter = '';
      if (accountId && String(accountId).indexOf('__public_pool__:') === 0) {
        var poolMasterId = String(accountId).slice('__public_pool__:'.length);
        accountOrFilter = 'or(account_id.is.null,account_id.eq.' + encodeURIComponent(poolMasterId) + ')';
      } else if (accountId) {
        accountFilter = '&account_id=eq.' + encodeURIComponent(accountId);
      }
      // 把搜索 OR 与公海归属 OR 放进同一个 AND，避免重复 or 查询参数相互覆盖。
      var andFilters = [];
      if (searchOrFilter) andFilters.push(searchOrFilter);
      if (accountOrFilter) andFilters.push(accountOrFilter);
      var andFilter = andFilters.length ? '&and=(' + andFilters.join(',') + ')' : '';

      var filterParams = '';
      if (category) {
        if (category === '线索池') {
          filterParams += '&or=(category.eq.待跟进,category.eq.潜在客户,category.is.null,category.eq.,category.eq.未分类)';
        } else if (category === '公海客户') {
          filterParams += '&or=(category.eq.公海客户,category.eq.其他)';
        } else {
          filterParams += '&category=eq.' + encodeURIComponent(category);
        }
      }
      if (batchLabel) {
        filterParams += '&batch_label=eq.' + encodeURIComponent(batchLabel);
      }

      // Build sort clause
      var orderClause = '&order=created_at.desc'; // default
      if (sortBy) {
        var dir = (sortDir === 'asc' ? 'asc' : 'desc');
        orderClause = '&order=' + encodeURIComponent(sortBy) + '.' + dir;
        if (sortBy !== 'created_at') {
          orderClause += ',created_at.desc'; // secondary sort
        }
      }

      // Try column sets from most to least specific
      var colSets = [
        'name,mobile,company_name,storage_institution,unit_nature,asset,category,note,fund,batch_label,created_at,last_operation,account_id',
        'name,mobile,company_name,storage_institution,category,note,fund,created_at,last_operation,account_id',
        'name,mobile,company_name,storage_institution,category,note,batch_label,created_at,account_id',
        'name,mobile,company_name,storage_institution,category,note,created_at,account_id',
        'name,mobile,company_name,created_at,account_id',
        '*'
      ];

      // 按项目 Supabase Max rows=5000 分段；严格遵守调用方 pageSize，
      // 避免旧逻辑无视 pageSize 一直扫描整张表，造成 Worker 子请求超限。
      var SUPABASE_MAX = 5000; // 项目 Max rows 为 5000；大页一次取完，避免 5 次 REST 子请求。
      var allData = [];
      var totalCount = 0;
      var currentFrom = (p - 1) * ps;

      while (allData.length < ps) {
        var fetchSize = Math.min(SUPABASE_MAX, ps - allData.length);
        var currentTo = currentFrom + fetchSize - 1;
        var headersWithCount = Object.assign({}, headers(), {
          'Range': currentFrom + '-' + currentTo,
          'Prefer': 'count=exact'
        });

        var resp = null;
        var batch = null;
        var anySuccess = false;

        for (var ci = 0; ci < colSets.length; ci++) {
          var url2 = baseUrl + '/rest/v1/customers?select=' + colSets[ci] + orderClause + andFilter + excludeFilter + accountFilter + filterParams;
          resp = await fetch(url2, { headers: headersWithCount });
          if (resp.ok) {
            batch = await resp.json();
            anySuccess = true;
            break;
          }
        }

        if (!anySuccess || !Array.isArray(batch)) {
          console.error('[supabase] getAllCustomers query failed — all column sets returned non-ok');
          return { data: [], total: 0, page: p, pageSize: ps, error: 'Supabase 查询失败，请检查数据库连接' };
        }

        allData = allData.concat(batch);
        var contentRange = resp.headers.get('Content-Range');
        if (contentRange) {
          var parts = contentRange.split('/');
          if (parts.length === 2 && parts[1] !== '*') totalCount = parseInt(parts[1], 10) || totalCount;
        }

        if (batch.length < fetchSize) break;
        currentFrom += batch.length;
      }
      // Return result — may be empty for new accounts with no data yet
      // (real query failures are caught earlier by anySuccess check)
      return { data: allData, total: totalCount, page: p, pageSize: ps };
    } catch (e) {
      console.error('[supabase] getAllCustomers error:', e.message);
      return { data: [], total: 0, page: page || 1, pageSize: pageSize || 50 };
    }
  }

  /**
   * Upsert customers (dialer clients) into Supabase.
   * Uses mobile as unique key to prevent duplicates.
   * Each customer gets: name, mobile, company_name, note, batch_label
   */
  async function upsertCustomers(customers, accountId) {
    if (!baseUrl || !key) return { count: 0, error: 'Supabase not configured' };
    if (!Array.isArray(customers) || customers.length === 0) return { count: 0 };

    var acctId = accountId || null;
    const rows = customers.map(function(c) {
      var noteVal = (c.note || '').trim();
      var callNoteVal = (c.callNote || '').trim();
      if (callNoteVal) {
        var marker = '[通话小记] ' + callNoteVal;
        if (!noteVal.includes(marker)) {
          if (noteVal) {
            noteVal += '\n' + marker;
          } else {
            noteVal = marker;
          }
        }
      }

      var fundVal = (c.fund || '').trim();
      if (fundVal) {
        // We want to ensure that fund is saved in noteVal JSON
        if (noteVal.indexOf('{') === 0) {
          try {
            var obj = JSON.parse(noteVal);
            if (obj && typeof obj === 'object') {
              obj.fund = fundVal;
              noteVal = JSON.stringify(obj);
            }
          } catch (e) {
            noteVal = JSON.stringify({ note: noteVal, fund: fundVal });
          }
        } else {
          noteVal = JSON.stringify({ note: noteVal, fund: fundVal });
        }
      }

      var row = {
        name: (c.name || '').trim() || '未知姓名',
        mobile: (c.mobile || c.phone || '').trim(),
        company_name: (c.company || c.company_name || '').trim(),
        unit_nature: String(c.unit_nature || c.unitNature || '').trim() || null,
        asset: String(c.asset || '').trim() || null,
        note: noteVal,
        category: (c.category || '').trim() || '待跟进',
        batch_label: (c.batch_label || '').trim(),
        account_id: c.account_id || acctId
      };
      var storageInstitution = String(c.storage_institution || c.storageInstitution || '').trim();
      if (storageInstitution) row.storage_institution = storageInstitution;
      if (c.last_operation) row.last_operation = c.last_operation;
      return row;
    }).filter(function(r) {
      return r.mobile.length > 0;
    });

    // 同一批次内同手机号只保留一条记录，但把不同单位名称按出现顺序合并。
    function mergeCompanyNames(a, b) {
      var values = [];
      [a, b].forEach(function(value) {
        String(value || '').split(/[；;\n、|]+/).forEach(function(part) {
          var name = part.trim();
          if (name && !values.some(function(v) { return v.toLowerCase() === name.toLowerCase(); })) values.push(name);
        });
      });
      return values.join('；');
    }
    var uniqueMap = {};
    var uniqueRows = [];
    rows.forEach(function(row) {
      if (uniqueMap[row.mobile]) {
        var previous = uniqueMap[row.mobile];
        var merged = Object.assign({}, previous, row);
        merged.company_name = mergeCompanyNames(previous.company_name, row.company_name);
        uniqueMap[row.mobile] = merged;
      } else {
        uniqueMap[row.mobile] = row;
      }
    });
    for (var m in uniqueMap) {
      if (uniqueMap.hasOwnProperty(m)) {
        uniqueRows.push(uniqueMap[m]);
      }
    }

    if (uniqueRows.length === 0) return { count: 0 };

    // 跨账户保护：查询已存在的手机号归属，排除属于其他账户的记录
    // 防止 merge-duplicates 覆盖其他账户的 account_id
    var skippedForeignCount = 0;
    var newCustomers = [];
    var ownerPrecheckSucceeded = !acctId;
    if (acctId) {
      try {
        var existingMobiles = {};
        var existingCategories = {};
        var existingCompanies = {};
        // Query in chunks (Supabase in filter max ~100 items)
        var allMobiles = Object.keys(uniqueMap);
        for (var mi = 0; mi < allMobiles.length; mi += 100) {
          var mobileChunk = allMobiles.slice(mi, mi + 100);
          var inFilter = 'mobile=in.(' + mobileChunk.map(function(m) { return encodeURIComponent(m); }).join(',') + ')';
          var checkUrl = baseUrl + '/rest/v1/customers?select=mobile,account_id,category,company_name&' + inFilter;
          var checkResp = await fetch(checkUrl, { headers: headers() });
          if (!checkResp.ok) {
            var checkError = await checkResp.text();
            throw new Error('Customer ownership pre-check failed [' + checkResp.status + ']: ' + checkError);
          }
          {
            var checkData = await checkResp.json();
            if (Array.isArray(checkData)) {
              for (var ci = 0; ci < checkData.length; ci++) {
                existingMobiles[checkData[ci].mobile] = checkData[ci].account_id;
                existingCategories[checkData[ci].mobile] = checkData[ci].category || '';
                existingCompanies[checkData[ci].mobile] = checkData[ci].company_name || '';
              }
            }
          }
        }
        // 过滤掉属于其他账户或公海的记录，并区分首次新增与同账号重复更新
        ownerPrecheckSucceeded = true;
        var safeRows = [];
        for (var ri = 0; ri < uniqueRows.length; ri++) {
          var rowMobile = uniqueRows[ri].mobile;
          var existingOwner = existingMobiles[rowMobile];
          if (existingOwner === undefined) {
            // 数据库此前不存在：计入新增并通知主账号
            safeRows.push(uniqueRows[ri]);
            newCustomers.push(uniqueRows[ri]);
          } else if (existingOwner === null || existingCategories[rowMobile] === '公海客户') {
            // 已在公海，禁止任何账户重新添加（公海归属主账户后仍按分类识别）
            skippedForeignCount++;
            console.warn('[supabase] Skipping mobile ' + rowMobile.slice(0, 3) + '**** — in public pool (blocked)');
          } else if (existingOwner !== acctId) {
            // 属于其他账户，跳过不覆盖
            skippedForeignCount++;
            console.warn('[supabase] Skipping mobile ' + rowMobile.slice(0, 3) + '**** — owned by ' + existingOwner);
          } else {
            // 属于同一账户：保留原单位名称，并把本次上传的不同单位名称追加在后面。
            uniqueRows[ri].company_name = mergeCompanyNames(existingCompanies[rowMobile], uniqueRows[ri].company_name);
            // 不能把重复导入误记成一次新添加。
            delete uniqueRows[ri].last_operation;
            safeRows.push(uniqueRows[ri]);
          }
        }
        uniqueRows = safeRows;
      } catch (preCheckErr) {
        // 无法确认手机号归属时终止本次写入，避免跨账号覆盖或漏记新增业绩
        console.error('[supabase] Customer ownership pre-check failed:', preCheckErr.message);
        throw preCheckErr;
      }
    }

    if (uniqueRows.length === 0) {
      console.warn('[supabase] All ' + skippedForeignCount + ' mobiles owned by other accounts — nothing to upsert');
      return { count: 0, skipped: skippedForeignCount, new_customers: [] };
    }

    let count = 0;
    const batchSize = 500;
    for (let i = 0; i < uniqueRows.length; i += batchSize) {
      const chunk = uniqueRows.slice(i, i + batchSize);
      const resp = await fetch(baseUrl + '/rest/v1/customers?on_conflict=mobile', {
        method: 'POST',
        headers: Object.assign({}, headers(), {
          'Prefer': 'resolution=merge-duplicates'
        }),
        body: JSON.stringify(chunk)
      });

      if (!resp.ok) {
        const text = await resp.text();
        // If fund column doesn't exist, retry without it
        if (text.includes('fund') && text.includes('column')) {
          const fallbackRows = chunk.map(function(r) {
            var copy = Object.assign({}, r);
            delete copy.fund;
            return copy;
          });
          const fbResp = await fetch(baseUrl + '/rest/v1/customers?on_conflict=mobile', {
            method: 'POST',
            headers: Object.assign({}, headers(), {
              'Prefer': 'resolution=merge-duplicates'
            }),
            body: JSON.stringify(fallbackRows)
          });
          if (!fbResp.ok) {
            const fbText = await fbResp.text();
            throw new Error('Supabase upsert customers fallback failed [' + fbResp.status + ']: ' + fbText);
          }
        } else if (text.includes('batch_label') && text.includes('column')) {
          const fallbackRows = chunk.map(function(r) {
            var copy = Object.assign({}, r);
            delete copy.batch_label;
            delete copy.note;
            return copy;
          });
          const fbResp = await fetch(baseUrl + '/rest/v1/customers?on_conflict=mobile', {
            method: 'POST',
            headers: Object.assign({}, headers(), {
              'Prefer': 'resolution=merge-duplicates'
            }),
            body: JSON.stringify(fallbackRows)
          });
          if (!fbResp.ok) {
            const fbText = await fbResp.text();
            throw new Error('Supabase upsert customers failed [' + fbResp.status + ']: ' + fbText);
          }
        } else {
          throw new Error('Supabase upsert customers failed [' + resp.status + ']: ' + text);
        }
      }
      count += chunk.length;
    }

    return { count: count, skipped: skippedForeignCount || 0, new_customers: ownerPrecheckSucceeded ? newCustomers : [] };
  }

  /**
   * Batch update category for all customers with a given batch_label.
   * Uses a simpler approach: fetch all matching mobiles first, then PATCH each.
   */
  async function batchUpdateCategory(batchLabel, category, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!batchLabel || !category) throw new Error('batch_label and category required');

    // Account filter to prevent cross-account modification
    var acctFilter = '';
    if (accountId) {
      acctFilter = '&account_id=eq.' + encodeURIComponent(accountId);
    }

    // Fetch all matching mobiles (pagination loop)
    var allMobiles = [];
    var offset = 0;
    var pageSize = 1000;
    while (true) {
      var url2 = baseUrl + '/rest/v1/customers?select=mobile&batch_label=eq.' + encodeURIComponent(batchLabel) + acctFilter + '&limit=' + pageSize + '&offset=' + offset;
      var pageResp = await fetch(url2, { headers: headers() });
      if (!pageResp.ok) {
        var text = await pageResp.text();
        throw new Error('Batch query failed [' + pageResp.status + ']: ' + text);
      }
      var page = await pageResp.json();
      if (!Array.isArray(page) || page.length === 0) break;
      allMobiles.push.apply(allMobiles, page.map(function(r) { return r.mobile; }));
      if (page.length < pageSize) break;
      offset += pageSize;
    }

    if (allMobiles.length === 0) return { count: 0 };

    // 目标分类为「公海客户」时同步清空 account_id，保持"公海=无主"不变量
    var patchBody = { category: category };
    if (String(category || '') === '公海客户') {
      patchBody.account_id = null;
    }

    // PATCH each one (scoped to account)
    var updated = 0;
    for (var i = 0; i < allMobiles.length; i++) {
      var patchUrl = baseUrl + '/rest/v1/customers?mobile=eq.' + encodeURIComponent(allMobiles[i]);
      if (accountId) {
        patchUrl += '&account_id=eq.' + encodeURIComponent(accountId);
      }
      var patchResp = await fetch(
        patchUrl,
        {
          method: 'PATCH',
          headers: Object.assign({}, headers(), { 'Prefer': 'return=minimal' }),
          body: JSON.stringify(patchBody)
        }
      );
      if (patchResp.ok) updated++;
    }

    return { count: updated };
  }

  /**
   * Get customers for dialer batch pull using pulled_at ordering.
   * Never-pulled customers come first (newest first), then oldest-pulled come back.
   * This naturally implements "沉底" (sink to bottom) without key-value database cursors.
   */

  /**
   * Atomically claim a dialer batch in PostgreSQL. Row-level locks and SKIP LOCKED
   * ensure concurrent devices/accounts cannot claim the same customer.
   */
  async function claimCustomersForDialer(sourceAccountId, targetAccountId, deviceId, batchId, limit, excludeMobiles, masterQuota) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!sourceAccountId || !targetAccountId || !deviceId || !batchId) {
      throw new Error('缺少客户认领所需的账号、设备或批次标识');
    }
    var resp = await fetch(baseUrl + '/rest/v1/rpc/claim_dialer_customers', {
      method: 'POST',
      headers: Object.assign({}, headers(), { 'Prefer': 'return=representation' }),
      body: JSON.stringify({
        p_source_account_id: String(sourceAccountId),
        p_target_account_id: String(targetAccountId),
        p_device_id: String(deviceId),
        p_batch_id: String(batchId),
        p_limit: Math.max(1, Math.min(parseInt(limit, 10) || 50, 200)),
        p_exclude_mobiles: Array.isArray(excludeMobiles) ? excludeMobiles.map(function(m) { return String(m || '').trim(); }).filter(Boolean) : [],
        p_master_quota: Math.max(1, parseInt(masterQuota, 10) || 600)
      })
    });
    if (!resp.ok) {
      var err = await resp.text();
      throw new Error('数据库原子认领客户失败 [' + resp.status + ']：' + err.slice(0, 400));
    }
    var rows = await resp.json();
    if (!Array.isArray(rows)) throw new Error('数据库原子认领返回格式异常');
    return { data: rows, total: rows.length };
  }

  async function getCustomersForDialer(limit, excludeMobiles, accountId) {
    if (!baseUrl || !key) return { data: [], total: 0 };

    try {
      var lim = Math.max(1, Math.min(parseInt(limit, 10) || 50, 200));

      // Build mobile not.in filter for client-side current list
      var notInFilter = '';
      if (excludeMobiles && excludeMobiles.length > 0) {
        var uniqueMobiles = [];
        for (var ei = 0; ei < excludeMobiles.length; ei++) {
          var m = (excludeMobiles[ei] || '').trim();
          if (m && uniqueMobiles.indexOf(m) === -1) uniqueMobiles.push(m);
        }
        if (uniqueMobiles.length > 0) {
          notInFilter = '&mobile=not.in.(' + uniqueMobiles.map(function(m) { return encodeURIComponent(m); }).join(',') + ')';
        }
      }

      // Account filter: if accountId provided, only pull that account's customers
      var accountFilter = '';
      if (accountId) {
        accountFilter = '&account_id=eq.' + encodeURIComponent(accountId);
      }

      // Server-enforced 10-day cooldown. Never-pulled or older-than-10-day rows are eligible.
      var cooldownCutoff = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
      // 同时排除公海客户；category 为空的历史普通客户仍保留可拨资格。
      var cooldownFilter = '&and=(or(category.neq.' + encodeURIComponent('公海客户') + ',category.is.null),or(pulled_at.is.null,pulled_at.lt.' + encodeURIComponent(cooldownCutoff) + '))';
      var orderFilter = '&order=pulled_at.asc.nullsfirst,created_at.desc';

      var colSets = [
        'name,mobile,company_name,storage_institution,unit_nature,asset,category,note,fund,batch_label,created_at,last_operation,pulled_at,account_id',
        'name,mobile,company_name,storage_institution,unit_nature,asset,category,note,fund,created_at,last_operation,pulled_at,account_id',
        'name,mobile,company_name,storage_institution,category,note,batch_label,created_at,pulled_at,account_id',
        'name,mobile,company_name,storage_institution,category,note,created_at,pulled_at,account_id',
        'name,mobile,company_name,created_at,pulled_at,account_id',
        '*'
      ];

      var hdrs = Object.assign({}, headers(), {
        'Range': '0-' + (lim - 1),
        'Prefer': 'count=estimated'
      });

      var data = null;
      var resp = null;
      var anySuccess = false;
      for (var ci = 0; ci < colSets.length; ci++) {
        var qUrl = baseUrl + '/rest/v1/customers?select=' + colSets[ci] + orderFilter + accountFilter + cooldownFilter + notInFilter;
        resp = await fetch(qUrl, { headers: hdrs });
        if (resp.ok) {
          data = await resp.json();
          anySuccess = true;
          break;
        }
      }

      if (!anySuccess) {
        console.error('[supabase] getCustomersForDialer query failed — all column sets returned non-ok');
        return { data: [], total: 0, limit: lim, error: 'Supabase 查询失败' };
      }

      var totalCount = 0;
      if (resp) {
        var contentRange = resp.headers.get('Content-Range');
        if (contentRange) {
          var parts = contentRange.split('/');
          if (parts.length === 2) totalCount = parseInt(parts[1], 10) || 0;
        }
      }

      return {
        data: Array.isArray(data) ? data : [],
        total: totalCount,
        limit: lim
      };
    } catch (e) {
      console.error('[supabase] getCustomersForDialer error:', e.message);
      return { data: [], total: 0, error: e.message };
    }
  }

  /**
   * Batch transfer customers to the public pool.
   * Sets account_id to null and category to '公海客户'.
   * Only affects records belonging to the specified accountId.
   * Chunked into batches of 100 to stay within URL and Worker limits.
   */
  /**
   * Atomically enforce dial-list eligibility using the database as source of truth.
   * Public-pool rows are never eligible; pulled_at enforces the 10-day cooldown.
   */
  async function reserveCustomersForDialer(mobiles, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!accountId) throw new Error('account_id required');
    if (!Array.isArray(mobiles) || !mobiles.length) return { added: [], skipped_public: [], skipped_cooldown: [], skipped_missing: [] };
    var unique = Array.from(new Set(mobiles.map(function(m) { return String(m || '').trim(); }).filter(Boolean)));
    if (!unique.length) return { added: [], skipped_public: [], skipped_cooldown: [], skipped_missing: [] };
    var rows = [];
    for (var offset = 0; offset < unique.length; offset += 100) {
      var chunk = unique.slice(offset, offset + 100);
      var url = baseUrl + '/rest/v1/customers?select=mobile,category,pulled_at,account_id&mobile=in.(' + chunk.map(encodeURIComponent).join(',') + ')';
      var resp = await fetch(url, { headers: headers() });
      if (!resp.ok) throw new Error('读取客户添加状态失败：' + resp.status + ' ' + (await resp.text()).slice(0, 240));
      var page = await resp.json();
      if (Array.isArray(page)) rows = rows.concat(page);
    }
    var byMobile = Object.create(null);
    rows.forEach(function(row) { byMobile[String(row.mobile || '').trim()] = row; });
    var now = Date.now(), cooldownMs = 10 * 24 * 60 * 60 * 1000;
    var added = [], skippedPublic = [], skippedCooldown = [], skippedMissing = [];
    unique.forEach(function(m) {
      var row = byMobile[m];
      if (!row) { skippedMissing.push(m); return; }
      if (String(row.category || '') === '公海客户' || !row.account_id) { skippedPublic.push(m); return; }
      if (String(row.account_id || '') !== String(accountId)) { skippedMissing.push(m); return; }
      var pulledAt = row.pulled_at ? Date.parse(row.pulled_at) : 0;
      if (pulledAt && Number.isFinite(pulledAt) && now - pulledAt < cooldownMs) { skippedCooldown.push(m); return; }
      added.push(m);
    });
    for (var pi = 0; pi < added.length; pi += 100) {
      var part = added.slice(pi, pi + 100);
      var patchUrl = baseUrl + '/rest/v1/customers?mobile=in.(' + part.map(encodeURIComponent).join(',') + ')&account_id=eq.' + encodeURIComponent(accountId);
      var patch = await fetch(patchUrl, { method: 'PATCH', headers: Object.assign({}, headers(), { 'Prefer': 'return=representation' }), body: JSON.stringify({ pulled_at: new Date(now).toISOString() }) });
      if (!patch.ok) throw new Error('写入10天添加冷却失败：' + patch.status + ' ' + (await patch.text()).slice(0, 240));
      var changed = await patch.json();
      var changedSet = Object.create(null);
      (Array.isArray(changed) ? changed : []).forEach(function(row) { changedSet[String(row.mobile || '').trim()] = true; });
      part.forEach(function(m) { if (!changedSet[m]) { added.splice(added.indexOf(m), 1); skippedMissing.push(m); } });
    }
    return { added: added, skipped_public: skippedPublic, skipped_cooldown: skippedCooldown, skipped_missing: skippedMissing };
  }

  async function transferToPool(mobiles, accountId, poolOwnerAccountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!Array.isArray(mobiles) || mobiles.length === 0) return 0;

    // Deduplicate and normalize requested mobile numbers.
    var unique = [];
    var seen = {};
    for (var mi = 0; mi < mobiles.length; mi++) {
      var m = String(mobiles[mi] || '').trim();
      if (m && !seen[m]) { seen[m] = true; unique.push(m); }
    }
    if (!unique.length) return 0;

    var chunkSize = 100;
    var patchErrors = [];
    for (var ci = 0; ci < unique.length; ci += chunkSize) {
      var chunk = unique.slice(ci, ci + chunkSize);
      var inFilter = 'mobile=in.(' + chunk.map(function(m) { return encodeURIComponent(m); }).join(',') + ')';
      var patchUrl = baseUrl + '/rest/v1/customers?' + inFilter;
      if (accountId) patchUrl += '&account_id=eq.' + encodeURIComponent(accountId);

      try {
        var resp = await fetch(patchUrl, {
          method: 'PATCH',
          headers: Object.assign({}, headers(), { 'Prefer': 'return=minimal' }),
          body: JSON.stringify({ account_id: poolOwnerAccountId || null, category: '公海客户' })
        });
        if (!resp.ok) {
          var errorText = await resp.text();
          patchErrors.push('chunk ' + (ci / chunkSize + 1) + ' [' + resp.status + ']: ' + errorText);
        }
      } catch (e) {
        patchErrors.push('chunk ' + (ci / chunkSize + 1) + ': ' + e.message);
      }
    }

    // Verify final state from Supabase rather than summing PATCH response counts.
    // This makes retries safe when an earlier chunk succeeded but a later chunk failed:
    // already-transferred rows remain verifiable as public-pool rows on the next attempt.
    var verified = {};
    for (var vi = 0; vi < unique.length; vi += chunkSize) {
      var verifyChunk = unique.slice(vi, vi + chunkSize);
      // PATCH 会把 account_id 设为公海主账户；同时兼容历史 account_id 为 NULL 的公海记录。
      var verifyOwnershipFilter = poolOwnerAccountId
        ? '&or=(account_id.is.null,account_id.eq.' + encodeURIComponent(String(poolOwnerAccountId)) + ')'
        : '&account_id=is.null';
      var verifyFilter = 'select=mobile&mobile=in.(' +
        verifyChunk.map(function(m) { return encodeURIComponent(m); }).join(',') +
        ')' + verifyOwnershipFilter + '&category=eq.' + encodeURIComponent('公海客户');
      var verifyResp = await fetch(baseUrl + '/rest/v1/customers?' + verifyFilter, {
        method: 'GET',
        headers: headers()
      });
      if (!verifyResp.ok) {
        var verifyError = await verifyResp.text();
        throw new Error('Supabase transfer verification failed [' + verifyResp.status + ']: ' + verifyError);
      }
      var rows = await verifyResp.json();
      if (!Array.isArray(rows)) throw new Error('Supabase transfer verification returned invalid data');
      rows.forEach(function(row) {
        var mobile = String(row && row.mobile || '').trim();
        if (mobile && seen[mobile]) verified[mobile] = true;
      });
    }

    var verifiedCount = Object.keys(verified).length;
    if (verifiedCount !== unique.length) {
      var detail = patchErrors.length ? '; ' + patchErrors.join(' | ') : '';
      throw new Error('公海转移未全部确认：' + verifiedCount + '/' + unique.length + detail);
    }
    return verifiedCount;
  }

  /**
   * Batch-update pulled_at = NOW() for customers that were just loaded into the dialer.
   * Uses Supabase PATCH with mobile.in filter.
   */
  async function batchSetPulledAt(mobiles, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!Array.isArray(mobiles) || mobiles.length === 0) return 0;

    var uniqueMobiles = [];
    for (var i = 0; i < mobiles.length; i++) {
      var m = String(mobiles[i] || '').trim();
      if (m && uniqueMobiles.indexOf(m) === -1) uniqueMobiles.push(m);
    }
    if (uniqueMobiles.length === 0) return 0;

    var updatedCount = 0;
    for (var offset = 0; offset < uniqueMobiles.length; offset += 100) {
      var chunk = uniqueMobiles.slice(offset, offset + 100);
      var qUrl = baseUrl + '/rest/v1/customers?mobile=in.(' +
        chunk.map(function(m) { return encodeURIComponent(m); }).join(',') + ')';
      if (accountId) qUrl += '&account_id=eq.' + encodeURIComponent(accountId);
      var resp = await fetch(qUrl, {
        method: 'PATCH',
        headers: Object.assign({}, headers(), {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }),
        body: JSON.stringify({ pulled_at: new Date().toISOString() })
      });
      if (!resp.ok) {
        var errText = await resp.text().catch(function() { return ''; });
        throw new Error('写入10天拨打冷却失败：' + resp.status + ' ' + errText.slice(0, 240));
      }
      var changed = await resp.json().catch(function() { return []; });
      if (!Array.isArray(changed)) throw new Error('写入10天拨打冷却失败：数据库返回格式异常');
      updatedCount += changed.length;
      if (changed.length !== chunk.length) {
        throw new Error('写入10天拨打冷却未全部确认：' + (offset + changed.length) + '/' + uniqueMobiles.length);
      }
    }
    return updatedCount;
  }

  /** Reset prior call outcome so an old operation cannot complete a newly imported batch. */
  async function resetBatchDialStatus(batchLabel, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!batchLabel || !accountId) throw new Error('batch_label and account_id required');
    var resetUrl = baseUrl + '/rest/v1/customers?batch_label=eq.' + encodeURIComponent(batchLabel) +
      '&account_id=eq.' + encodeURIComponent(accountId);
    var resp = await fetch(resetUrl, {
      method: 'PATCH',
      headers: Object.assign({}, headers(), { 'Prefer': 'return=minimal' }),
      body: JSON.stringify({ last_operation: null })
    });
    if (!resp.ok) {
      var errText = await resp.text();
      throw new Error('Batch call status reset failed [' + resp.status + ']: ' + errText);
    }
    return true;
  }

  /** Persist the latest operation while retaining the batch's terminal call result. */
  async function updateCustomerTimeline(mobile, entry, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!mobile || !entry || !entry.type) throw new Error('mobile and timeline entry required');
    var currentUrl = baseUrl + '/rest/v1/customers?select=last_operation&mobile=eq.' + encodeURIComponent(mobile);
    if (accountId) currentUrl += '&account_id=eq.' + encodeURIComponent(accountId);
    var currentResp = await fetch(currentUrl, { headers: headers() });
    if (!currentResp.ok) {
      var currentErr = await currentResp.text();
      throw new Error('Read customer timeline state failed [' + currentResp.status + ']: ' + currentErr);
    }
    var currentRows = await currentResp.json();
    var previous = currentRows && currentRows[0] ? currentRows[0].last_operation : null;
    var merged = Object.assign({}, entry);
    // 保留首次上传账户作为“前操作员”，后续拨打/跟进不能覆盖来源账户。
    if (previous) {
      if (previous.previous_operator_account_id) merged.previous_operator_account_id = previous.previous_operator_account_id;
      if (previous.previous_operator_account_name) merged.previous_operator_account_name = previous.previous_operator_account_name;
      // 兼容旧记录：首次操作记录中的 operator 字段可作为来源账户。
      if (!merged.previous_operator_account_id && previous.type === 'add' && previous.operator_account_id) merged.previous_operator_account_id = previous.operator_account_id;
      if (!merged.previous_operator_account_name && previous.type === 'add' && previous.operator_account_name) merged.previous_operator_account_name = previous.operator_account_name;
    }
    if (entry.type === 'call_success' || entry.type === 'call_failed') {
      merged.call_result = entry.type;
    } else if (entry.type !== 'dial' && previous && ['call_success', 'call_failed'].indexOf(previous.call_result || previous.type) !== -1) {
      merged.call_result = previous.call_result || previous.type;
    }
    // A new dial attempt invalidates the previous result until this attempt is marked.
    return await updateCustomer(mobile, { last_operation: merged }, accountId);
  }

  /**
   * Check a batch's persisted call outcomes. When deleteIfComplete is true,
   * delete only if every row has a terminal call outcome.
   */
  async function getBatchDialStatus(batchLabel, accountId, deleteIfComplete) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!batchLabel || !accountId) throw new Error('batch_label and account_id required');
    var rows = [];
    var offset = 0;
    var pageSize = 1000;
    while (true) {
      var queryUrl = baseUrl + '/rest/v1/customers?select=mobile,last_operation&batch_label=eq.' +
        encodeURIComponent(batchLabel) + '&account_id=eq.' + encodeURIComponent(accountId) +
        '&limit=' + pageSize + '&offset=' + offset;
      var resp = await fetch(queryUrl, { headers: headers() });
      if (!resp.ok) {
        var errText = await resp.text();
        throw new Error('Batch status query failed [' + resp.status + ']: ' + errText);
      }
      var page = await resp.json();
      if (!Array.isArray(page) || page.length === 0) break;
      rows = rows.concat(page);
      if (page.length < pageSize) break;
      offset += pageSize;
    }
    if (rows.length === 0) return { total: 0, remaining: 0, completed: false, deleted: false };
    var remaining = rows.filter(function(row) {
      var op = row.last_operation;
      var outcome = op && (op.call_result || op.type);
      return !op || ['call_success', 'call_failed'].indexOf(outcome) === -1;
    }).length;
    if (remaining > 0) return { total: rows.length, remaining: remaining, completed: false, deleted: false };
    if (!deleteIfComplete) return { total: rows.length, remaining: 0, completed: true, deleted: false };
    var deleteUrl = baseUrl + '/rest/v1/customers?batch_label=eq.' + encodeURIComponent(batchLabel) +
      '&account_id=eq.' + encodeURIComponent(accountId);
    var deleteResp = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: Object.assign({}, headers(), { 'Prefer': 'return=minimal' })
    });
    if (!deleteResp.ok) {
      var deleteErr = await deleteResp.text();
      throw new Error('Completed batch delete failed [' + deleteResp.status + ']: ' + deleteErr);
    }
    return { total: rows.length, remaining: 0, completed: true, deleted: true, count: rows.length };
  }

  return {
    upsertCompanies: upsertCompanies,
    getAllCompanies: getAllCompanies,
    checkCompanies: checkCompanies,
    deleteCompany: deleteCompany,
    saveKnowledge: saveKnowledge,
    searchCustomers: searchCustomers,
    searchSpeech: searchSpeech,
    searchLoanCases: searchLoanCases,
    searchKnowledge: searchKnowledge,
    upsertCustomers: upsertCustomers,
    getAllCustomers: getAllCustomers,
    updateCustomer: updateCustomer,
    getCustomersForDialer: getCustomersForDialer,
    claimCustomersForDialer: claimCustomersForDialer,
    reserveCustomersForDialer: reserveCustomersForDialer,
    batchSetPulledAt: batchSetPulledAt,
    batchUpdateCategory: batchUpdateCategory,
    transferToPool: transferToPool,
    deleteCustomer: deleteCustomer,
    deleteCustomers: deleteCustomers,
    saveCorrection: saveCorrection,
    getCorrections: getCorrections,
    getCorrectionsForExport: getCorrectionsForExport,
    getCorrectionsCount: getCorrectionsCount,
    exportAllCustomers: exportAllCustomers,
    resetBatchDialStatus: resetBatchDialStatus,
    updateCustomerTimeline: updateCustomerTimeline,
    getBatchDialStatus: getBatchDialStatus
  };

  /**
   * Update a single customer by mobile (unique key).
   * fields: { category?, note?, company_name?, name? }
   */
  async function updateCustomer(mobile, fields, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!mobile) throw new Error('mobile is required');

    var updateUrl = baseUrl + '/rest/v1/customers?mobile=eq.' + encodeURIComponent(mobile);
    // Belt-and-suspenders: if accountId provided, restrict to this account
    if (accountId) {
      updateUrl += '&account_id=eq.' + encodeURIComponent(accountId);
    }
    // 改为「公海客户」时必须同步清空 account_id，保持"公海=无主"不变量（右上角账户数量按 account_id 统计）
    var body = Object.assign({}, fields);
    if (String(body.category || '') === '公海客户') {
      body.account_id = null;
    }
    const resp = await fetch(updateUrl,
      {
        method: 'PATCH',
        headers: Object.assign({}, headers(), { 'Prefer': 'return=representation' }),
        body: JSON.stringify(body)
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error('Supabase update customer failed [' + resp.status + ']: ' + text);
    }

    const data = await resp.json();
    return data && data[0] ? data[0] : null;
  }

  async function deleteCustomer(mobile, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!mobile) throw new Error('mobile is required');

    var delUrl = baseUrl + '/rest/v1/customers?mobile=eq.' + encodeURIComponent(mobile);
    if (accountId) {
      delUrl += '&account_id=eq.' + encodeURIComponent(accountId);
    }
    const resp = await fetch(delUrl,
      {
        method: 'DELETE',
        headers: headers()
      }
    );

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error('Supabase delete customer failed [' + resp.status + ']: ' + text);
    }
    return true;
  }

  async function deleteCustomers(mobiles, accountId) {
    if (!baseUrl || !key) throw new Error('Supabase not configured');
    if (!mobiles || mobiles.length === 0) throw new Error('mobiles are required');

    var acctFilter = '';
    if (accountId) {
      acctFilter = '&account_id=eq.' + encodeURIComponent(accountId);
    }

    const chunkSize = 100;
    for (let i = 0; i < mobiles.length; i += chunkSize) {
      const chunk = mobiles.slice(i, i + chunkSize);
      const inClause = chunk.map(function(m) { return encodeURIComponent(m); }).join(',');
      const resp = await fetch(
        baseUrl + '/rest/v1/customers?mobile=in.(' + inClause + ')' + acctFilter,
        {
          method: 'DELETE',
          headers: headers()
        }
      );
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error('Supabase delete customers failed [' + resp.status + ']: ' + text);
      }
    }
    return true;
  }

  /**
   * Save an OCR correction record (training data).
   */
  async function saveCorrection(correction) {
    if (!baseUrl || !key) return null;

    const row = {
      raw_text: correction.rawText || '',
      original_json: correction.originalContacts || [],
      corrected_json: correction.correctedContacts || [],
      source_file: correction.sourceFile || '',
      ocr_pipeline: correction.ocrPipeline || 'ai_vision',
      ocr_mode: correction.ocrMode || 'bulk',
      edit_count: correction.editCount || 0,
      metadata: correction.metadata || {}
    };

    const resp = await fetch(baseUrl + '/rest/v1/ocr_corrections', {
      method: 'POST',
      headers: Object.assign({}, headers(), {
        'Prefer': 'return=representation'
      }),
      body: JSON.stringify(row)
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('[supabase] saveCorrection failed:', text);
      throw new Error('Supabase saveCorrection failed [' + resp.status + ']: ' + text);
    }

    const data = await resp.json();
    return data && data[0] ? data[0] : null;
  }

  /**
   * Get OCR corrections with pagination and optional filtering.
   */
  async function getCorrections(page, pageSize, minEdits, sort) {
    if (!baseUrl || !key) return { data: [], total: 0, page: page || 1, pageSize: pageSize || 20 };

    try {
      var p = page || 1;
      var ps = pageSize || 20;
      var from = (p - 1) * ps;
      var to = from + ps - 1;

      var url2 = baseUrl + '/rest/v1/ocr_corrections?select=*';

      // Filter: only show rows with edits if minEdits > 0
      if (minEdits && minEdits > 0) {
        url2 += '&edit_count=gte.' + minEdits;
      }

      // Sort
      if (sort === 'oldest') {
        url2 += '&order=created_at.asc';
      } else {
        url2 += '&order=created_at.desc';
      }

      var headersWithCount = Object.assign({}, headers(), {
        'Range': from + '-' + to,
        'Prefer': 'count=exact'
      });

      var resp = await fetch(url2, { headers: headersWithCount });

      if (!resp.ok) {
        var text = await resp.text();
        throw new Error('Supabase getCorrections failed [' + resp.status + ']: ' + text);
      }

      var data = await resp.json();
      var total = data.length;
      var contentRange = resp.headers.get('Content-Range');
      if (contentRange) {
        var parts = contentRange.split('/');
        if (parts.length === 2) total = parseInt(parts[1], 10) || total;
      }

      return {
        data: Array.isArray(data) ? data : [],
        total: total,
        page: p,
        pageSize: ps
      };
    } catch (e) {
      console.error('[supabase] getCorrections error:', e.message);
      throw e;
    }
  }

  /**
   * Get OCR corrections for JSONL export.
   */
  async function getCorrectionsForExport(limit) {
    if (!baseUrl || !key) return [];

    var maxLimit = Math.min(limit || 200, 1000);
    var url2 = baseUrl + '/rest/v1/ocr_corrections?select=*&edit_count=gt.0&order=created_at.desc&limit=' + maxLimit;

    var resp = await fetch(url2, { headers: headers() });

    if (!resp.ok) {
      var text = await resp.text();
      throw new Error('Supabase getCorrectionsForExport failed [' + resp.status + ']: ' + text);
    }

    return await resp.json();
  }

  /**
   * Get total count of OCR corrections.
   */
  async function getCorrectionsCount() {
    if (!baseUrl || !key) return 0;

    try {
      var resp = await fetch(
        baseUrl + '/rest/v1/ocr_corrections?select=id&limit=0',
        {
          headers: Object.assign({}, headers(), {
            'Prefer': 'count=exact'
          })
        }
      );

      if (!resp.ok) {
        var errorText = await resp.text();
        throw new Error('Supabase getCorrectionsCount failed [' + resp.status + ']: ' + errorText);
      }

      var contentRange = resp.headers.get('Content-Range');
      if (contentRange) {
        var parts = contentRange.split('/');
        if (parts.length === 2) return parseInt(parts[1], 10) || 0;
      }
      throw new Error('Supabase getCorrectionsCount failed: missing Content-Range');
    } catch (e) {
      console.error('[supabase] getCorrectionsCount error:', e.message);
      throw e;
    }
  }

  /**
   * Export all customers across all accounts (no account_id filter).
   * Returns full rows for backup/export purposes.
   */
  async function exportAllCustomers() {
    if (!baseUrl || !key) return [];

    var all = [];
    var pageSize = 5000; // 与 Supabase Max rows 设置一致，减少子请求数量
    var from = 0;

    while (true) {
      var to = from + pageSize - 1;
      var colSets = [
        'name,mobile,company_name,storage_institution,unit_nature,asset,category,note,fund,batch_label,created_at,last_operation,account_id',
        'name,mobile,company_name,storage_institution,category,note,fund,batch_label,created_at,account_id',
        'name,mobile,company_name,category,note,created_at,account_id',
        '*'
      ];

      var batch = null;
      var anySuccess = false;
      for (var ci = 0; ci < colSets.length; ci++) {
        var qUrl = baseUrl + '/rest/v1/customers?select=' + colSets[ci] + '&order=created_at.desc';
        var resp = await fetch(qUrl, {
          headers: Object.assign({}, headers(), {
            'Range': from + '-' + to
          })
        });
        if (resp.ok) {
          batch = await resp.json();
          anySuccess = true;
          break;
        }
      }

      if (!batch || !Array.isArray(batch) || batch.length === 0) break;
      all = all.concat(batch);
      if (batch.length < pageSize) break;
      from += pageSize;
    }

    return all;
  }
}

