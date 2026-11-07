-- Complete phase-1 backfill for the legacy rows stored as UTF-8 text.
-- Earlier writes in the same namespaces used both text and base64 storage modes.
insert into public.dialer_sessions (session_token,payload,created_at,updated_at,expires_at)
select substring(key from length('dialer:session:') + 1),
       case when value_type='base64' then convert_from(decode(value,'base64'),'UTF8')::jsonb else value::jsonb end,
       nullif((case when value_type='base64' then convert_from(decode(value,'base64'),'UTF8')::jsonb else value::jsonb end)->>'created_at','')::timestamptz,
       updated_at,expires_at
from public.app_kv
where key like 'dialer:session:%'
on conflict(session_token) do nothing;

insert into public.dialer_upload_logs
  (log_key,occurred_at,account_id,account_name,batch_label,customer_count,metric_version,log_type,payload,created_at)
select key,
       coalesce(
         case when p->>'created_at' ~ '^[0-9]{10,13}$' then to_timestamp((p->>'created_at')::double precision/1000.0) end,
         case when split_part(key,':',2) ~ '^[0-9]{10,13}$' then to_timestamp(split_part(key,':',2)::double precision/1000.0) end,
         updated_at),
       p->>'account_id',p->>'account_name',p->>'batch_label',
       case when p->>'count' ~ '^-?[0-9]+$' then (p->>'count')::integer end,
       case when p->>'metric_version' ~ '^-?[0-9]+$' then (p->>'metric_version')::integer end,
       p->>'type',p,updated_at
from (
  select key,updated_at,
         case when value_type='base64' then convert_from(decode(value,'base64'),'UTF8')::jsonb else value::jsonb end p
  from public.app_kv where key like 'upload_log:%'
) s
on conflict(log_key) do nothing;
