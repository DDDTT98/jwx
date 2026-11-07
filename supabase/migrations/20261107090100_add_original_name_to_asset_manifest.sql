alter table public.app_storage_asset_manifest
  add column if not exists original_name text;