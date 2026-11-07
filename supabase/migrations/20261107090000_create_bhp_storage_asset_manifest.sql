-- Private Supabase Storage bucket for legacy BHP files.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('bhp-assets', 'bhp-assets', false, 26214400, null)
on conflict (id) do update
set public = false,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = null;

create table if not exists public.app_storage_asset_manifest (
  source_key text primary key,
  object_path text not null unique,
  content_type text not null default 'application/octet-stream',
  byte_size bigint not null default 0,
  sha256 text,
  source_updated_at timestamptz,
  migrated_at timestamptz not null default now()
);

comment on table public.app_storage_asset_manifest is
  'Server-only mapping from legacy BHP app_kv file keys to private Supabase Storage objects.';

alter table public.app_storage_asset_manifest enable row level security;
revoke all on table public.app_storage_asset_manifest from anon, authenticated;
grant all on table public.app_storage_asset_manifest to service_role;
