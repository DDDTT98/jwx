-- Phase 2: normalize remaining active dialer and diet runtime state.
create table if not exists public.diet_daily_entries (
  entry_date date primary key, data jsonb not null, updated_at timestamptz not null default now()
);
comment on table public.diet_daily_entries is 'Daily health and activity check-in data for BHP diet page.';

create table if not exists public.diet_settings (
  settings_id text primary key check (settings_id='primary'),
  config jsonb not null default '{}'::jsonb, updated_at timestamptz not null default now()
);
comment on table public.diet_settings is 'BHP diet page goals and baseline settings.';

create table if not exists public.dialer_wechat_counts (
  account_id text not null, count_date date not null, count integer not null default 0,
  updated_at timestamptz not null default now(), primary key(account_id,count_date)
);
comment on table public.dialer_wechat_counts is 'Per-account daily WeChat add count.';

create table if not exists public.dialer_master_pull_daily (
  account_id text not null, pull_date date not null, count integer not null default 0,
  updated_at timestamptz not null default now(), expires_at timestamptz,
  primary key(account_id,pull_date)
);
comment on table public.dialer_master_pull_daily is 'Daily master-account customer pull quota and usage.';

create table if not exists public.dialer_pull_locks (
  account_id text primary key, lock_value text not null, expires_at timestamptz not null,
  updated_at timestamptz not null default now()
);
comment on table public.dialer_pull_locks is 'Short-lived per-account customer-pull lock state.';

create table if not exists public.dialer_batch_delete_markers (
  marker_key text primary key, account_id text not null, batch_label text not null,
  payload jsonb not null, created_at timestamptz not null default now()
);
create index if not exists idx_dialer_batch_delete_markers_account on public.dialer_batch_delete_markers(account_id,created_at desc);
comment on table public.dialer_batch_delete_markers is 'Prevents duplicate auto-delete tasks for the same customer batch.';

create table if not exists public.app_runtime_cache (
  cache_key text primary key, value text not null, value_type text not null default 'text',
  expires_at timestamptz, updated_at timestamptz not null default now()
);
create index if not exists idx_app_runtime_cache_expiry on public.app_runtime_cache(expires_at);
comment on table public.app_runtime_cache is 'Small ephemeral runtime counters and caches; not a business-data store.';

do $$
declare t text;
begin
  foreach t in array array[
    'diet_daily_entries','diet_settings','dialer_wechat_counts','dialer_master_pull_daily',
    'dialer_pull_locks','dialer_batch_delete_markers','app_runtime_cache'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
    execute format('grant all on table public.%I to service_role', t);
  end loop;
end $$;

insert into public.diet_daily_entries(entry_date,data,updated_at)
select split_part(key,':',2)::date,convert_from(decode(value,'base64'),'UTF8')::jsonb,updated_at
from public.app_kv where key ~ '^diet:[0-9]{4}-[0-9]{2}-[0-9]{2}$'
on conflict(entry_date) do nothing;

insert into public.diet_settings(settings_id,config,updated_at)
select 'primary',convert_from(decode(value,'base64'),'UTF8')::jsonb,updated_at
from public.app_kv where key='diet:config'
on conflict(settings_id) do nothing;

insert into public.dialer_wechat_counts(account_id,count_date,count,updated_at)
select split_part(key,':',3),split_part(key,':',4)::date,
       coalesce(nullif(convert_from(decode(value,'base64'),'UTF8'),'')::integer,0),updated_at
from public.app_kv where key like 'dialer:wc:%'
on conflict(account_id,count_date) do nothing;

insert into public.dialer_master_pull_daily(account_id,pull_date,count,updated_at,expires_at)
select split_part(key,':',4),split_part(key,':',5)::date,
       coalesce(case when p->>'count' ~ '^-?[0-9]+$' then (p->>'count')::integer end,0),
       case when p->>'updated_at' ~ '^[0-9]{10,13}$' then to_timestamp((p->>'updated_at')::double precision/1000.0) else updated_at end,
       expires_at
from (select key,updated_at,expires_at,convert_from(decode(value,'base64'),'UTF8')::jsonb p
      from public.app_kv where key like 'dialer:master-pull:day:%') s
on conflict(account_id,pull_date) do nothing;
