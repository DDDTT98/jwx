create table if not exists public.dialog_simulation_state (
  state_key text primary key check (state_key = 'shared'),
  payload jsonb not null default '{"activeId":"client-default","items":[]}'::jsonb,
  updated_at timestamptz not null default now()
);

comment on table public.dialog_simulation_state is
  'BHP shared WhatsApp-style sales conversation library; accessed only by the authenticated Cloudflare Worker using service_role.';

alter table public.dialog_simulation_state enable row level security;
revoke all on table public.dialog_simulation_state from public, anon, authenticated;
grant select, insert, update, delete on table public.dialog_simulation_state to service_role;
