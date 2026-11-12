-- JWX AI business knowledge base.
-- Access is mediated by the authenticated Cloudflare Worker; never expose service_role to browsers.

create table if not exists public.ai_business_knowledge (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('products','profiles','qa','cases','compliance')),
  title text not null check (char_length(trim(title)) between 1 and 160),
  content text not null check (char_length(trim(content)) between 1 and 30000),
  source text not null default '',
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_by text not null,
  updated_by text not null,
  review_note text not null default '',
  version integer not null default 1 check (version >= 1),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists ai_business_knowledge_category_status_updated_idx
  on public.ai_business_knowledge (category, status, updated_at desc);

create index if not exists ai_business_knowledge_updated_idx
  on public.ai_business_knowledge (updated_at desc);

alter table public.ai_business_knowledge enable row level security;

revoke all on table public.ai_business_knowledge from anon, authenticated;
grant select, insert, update, delete on table public.ai_business_knowledge to service_role;

comment on table public.ai_business_knowledge is
  'JWX AI业务员知识库；仅由Cloudflare Worker使用service_role访问，权限由Worker拨号账号会话校验。';
