-- Phase 1: normalize high-traffic structured app_kv namespaces.
-- app_kv rows are deliberately retained as rollback/source copies.
create table if not exists public.app_settings (
  setting_key text primary key, value text not null, value_type text not null default 'text',
  updated_at timestamptz not null default now(), expires_at timestamptz
);
comment on table public.app_settings is 'BHP application settings migrated from app_kv config namespace. Service-role only.';

create table if not exists public.dialer_account_registry (
  registry_id text primary key check (registry_id = 'primary'),
  accounts jsonb not null default '[]'::jsonb, updated_at timestamptz not null default now()
);
comment on table public.dialer_account_registry is 'BHP dialer account roster; one authoritative registry document.';

create table if not exists public.dialer_sessions (
  session_token text primary key, payload jsonb not null, created_at timestamptz,
  updated_at timestamptz not null default now(), expires_at timestamptz
);
comment on table public.dialer_sessions is 'BHP dialer sessions migrated from dialer:session keys. Tokens are service-role only.';

create table if not exists public.dialer_work_stats (
  account_id text not null, stat_date date not null, rounds integer not null default 0,
  wechat_count integer not null default 0, payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(), primary key (account_id, stat_date)
);
create index if not exists idx_dialer_work_stats_date on public.dialer_work_stats (stat_date, account_id);
comment on table public.dialer_work_stats is 'Daily dialer work metrics per account.';

create table if not exists public.dialer_work_cooldowns (
  account_id text not null, stat_date date not null, device_id text not null,
  payload jsonb not null, updated_at timestamptz not null default now(),
  primary key (account_id, stat_date, device_id)
);
comment on table public.dialer_work_cooldowns is 'Per-device dialer cooldown state.';

create table if not exists public.dialer_upload_logs (
  log_key text primary key, occurred_at timestamptz, account_id text, account_name text,
  batch_label text, customer_count integer, metric_version integer, log_type text,
  payload jsonb not null, created_at timestamptz not null default now()
);
create index if not exists idx_dialer_upload_logs_occurred_at on public.dialer_upload_logs (occurred_at desc);
create index if not exists idx_dialer_upload_logs_account_time on public.dialer_upload_logs (account_id, occurred_at desc);
comment on table public.dialer_upload_logs is 'Structured BHP customer import and pool-transfer audit events.';

create table if not exists public.dialer_client_operations (
  operation_key text primary key, operation_type text not null check (operation_type in ('all','dial')),
  account_id text not null, operation_date date not null, mobile text not null,
  value text not null default '1', value_type text not null default 'text',
  expires_at timestamptz, created_at timestamptz not null default now(),
  unique (operation_type, account_id, operation_date, mobile)
);
create index if not exists idx_dialer_client_operations_range on public.dialer_client_operations (account_id, operation_type, operation_date, mobile);
comment on table public.dialer_client_operations is 'Deduplicated daily customer operation markers used by weekly/monthly metrics.';

create table if not exists public.dialer_background_jobs (
  job_id text primary key, status text not null default 'queued', job_kind text,
  payload jsonb not null, updated_at timestamptz not null default now(), expires_at timestamptz
);
create index if not exists idx_dialer_background_jobs_status on public.dialer_background_jobs (status, updated_at);
comment on table public.dialer_background_jobs is 'Durable CRM background job state.';

do $$
declare t text;
begin
  foreach t in array array[
    'app_settings','dialer_account_registry','dialer_sessions',
    'dialer_work_stats','dialer_work_cooldowns','dialer_upload_logs',
    'dialer_client_operations','dialer_background_jobs'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant all on table public.%I to service_role', t);
  end loop;
end $$;

insert into public.app_settings (setting_key, value, value_type, updated_at, expires_at)
select key, value, value_type, updated_at, expires_at from public.app_kv
where key like 'config:%' on conflict (setting_key) do nothing;

insert into public.dialer_account_registry (registry_id, accounts, updated_at)
select 'primary', convert_from(decode(value,'base64'),'UTF8')::jsonb, updated_at
from public.app_kv where key = 'dialer:accounts' and value_type = 'base64'
on conflict (registry_id) do nothing;

insert into public.dialer_sessions (session_token, payload, created_at, updated_at, expires_at)
select substring(key from length('dialer:session:') + 1),
       convert_from(decode(value,'base64'),'UTF8')::jsonb,
       nullif(convert_from(decode(value,'base64'),'UTF8')::jsonb->>'created_at','')::timestamptz,
       updated_at, expires_at
from public.app_kv where key like 'dialer:session:%' and value_type = 'base64'
on conflict (session_token) do nothing;

insert into public.dialer_work_stats (account_id, stat_date, rounds, wechat_count, payload, updated_at)
select split_part(key,':',2), split_part(key,':',3)::date,
       coalesce(case when p->>'rounds' ~ '^-?[0-9]+$' then (p->>'rounds')::integer end,0),
       coalesce(case when p->>'wechat_count' ~ '^-?[0-9]+$' then (p->>'wechat_count')::integer end,0),
       p, updated_at
from (select key, updated_at, convert_from(decode(value,'base64'),'UTF8')::jsonb p
      from public.app_kv where key like 'work_stats:%' and value_type = 'base64') s
on conflict (account_id, stat_date) do nothing;

insert into public.dialer_work_cooldowns (account_id, stat_date, device_id, payload, updated_at)
select split_part(key,':',2), split_part(key,':',3)::date, split_part(key,':',4),
       convert_from(decode(value,'base64'),'UTF8')::jsonb, updated_at
from public.app_kv where key like 'work_stats_cd:%' and value_type = 'base64'
on conflict (account_id, stat_date, device_id) do nothing;

insert into public.dialer_upload_logs
  (log_key, occurred_at, account_id, account_name, batch_label, customer_count, metric_version, log_type, payload, created_at)
select key,
       coalesce(case when p->>'created_at' ~ '^[0-9]{10,13}$'
                     then to_timestamp((p->>'created_at')::double precision / 1000.0) end,
                case when split_part(key,':',2) ~ '^[0-9]{10,13}$'
                     then to_timestamp(split_part(key,':',2)::double precision / 1000.0) end,
                updated_at),
       p->>'account_id', p->>'account_name', p->>'batch_label',
       case when p->>'count' ~ '^-?[0-9]+$' then (p->>'count')::integer end,
       case when p->>'metric_version' ~ '^-?[0-9]+$' then (p->>'metric_version')::integer end,
       p->>'type', p, updated_at
from (select key, updated_at, convert_from(decode(value,'base64'),'UTF8')::jsonb p
      from public.app_kv where key like 'upload_log:%' and value_type = 'base64') s
on conflict (log_key) do nothing;

insert into public.dialer_client_operations
  (operation_key, operation_type, account_id, operation_date, mobile, value, value_type, expires_at, created_at)
select key,
       case when split_part(key,':',1) = 'client_ops_dial' then 'dial' else 'all' end,
       split_part(key,':',2), split_part(key,':',3)::date, split_part(key,':',4),
       value, value_type, expires_at, updated_at
from public.app_kv
where key like 'client_ops_all:%' or key like 'client_ops_dial:%'
on conflict (operation_key) do nothing;
