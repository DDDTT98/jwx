-- JWX personal WeChat screenshot imports. Raw screenshots are processed in memory and are not stored.
create table if not exists public.ai_chat_imports (
  id uuid primary key default gen_random_uuid(),
  source_files text[] not null default '{}',
  representative text not null default '',
  customer_alias text not null default '',
  raw_text text not null default '',
  messages jsonb not null default '[]'::jsonb,
  status text not null default 'pending_review' check (status in ('pending_review','refined','archived')),
  extracted_knowledge jsonb not null default '[]'::jsonb,
  created_by text not null,
  created_at timestamptz not null default now(),
  refined_at timestamptz
);
create index if not exists ai_chat_imports_created_at_idx on public.ai_chat_imports (created_at desc);
create index if not exists ai_chat_imports_status_created_idx on public.ai_chat_imports (status, created_at desc);
alter table public.ai_chat_imports enable row level security;
revoke all on table public.ai_chat_imports from anon, authenticated;
grant select, insert, update, delete on table public.ai_chat_imports to service_role;
comment on table public.ai_chat_imports is 'JWX personal WeChat screenshot OCR imports; accessible only through authenticated Cloudflare Worker master-account APIs.';
