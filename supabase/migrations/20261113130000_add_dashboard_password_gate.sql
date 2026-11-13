-- Dedicated server-side password hash for the master database dashboard.
-- The plaintext password is never stored; only PBKDF2 salt/hash are persisted.
create table if not exists public.dialer_dashboard_passwords (
  account_id text primary key,
  password_salt text not null,
  password_hash text not null,
  updated_at timestamptz not null default now()
);
comment on table public.dialer_dashboard_passwords is 'Master-only database dashboard password hashes. Service-role access only.';
alter table public.dialer_dashboard_passwords enable row level security;
revoke all on table public.dialer_dashboard_passwords from anon, authenticated;
grant all on table public.dialer_dashboard_passwords to service_role;
