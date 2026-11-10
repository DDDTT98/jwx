-- Durable staging rows for large customer imports.
-- The Worker uses the Supabase service key; browser roles receive no table access.
create table if not exists public.dialer_import_job_items (
  job_id text not null,
  row_no integer not null,
  customer jsonb not null,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'skipped', 'failed')),
  error text,
  updated_at timestamptz not null default now(),
  primary key (job_id, row_no)
);

create index if not exists idx_dialer_import_job_items_pending
  on public.dialer_import_job_items (job_id, status, row_no);

alter table public.dialer_import_job_items enable row level security;
revoke all on public.dialer_import_job_items from anon, authenticated;
grant all on public.dialer_import_job_items to service_role;
