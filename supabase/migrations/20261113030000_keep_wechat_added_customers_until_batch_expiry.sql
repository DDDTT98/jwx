-- Keep WeChat-added customers in their device dialer list until the same 48-hour expiry.
-- Adding WeChat is an operation marker, not a transfer/release event.
create or replace function public.recycle_expired_dialer_claims()
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_recycled integer := 0;
begin
  update public.customers
     set account_id = coalesce(dialer_source_account_id, account_id),
         pulled_at = null,
         dialer_batch_id = null,
         dialer_device_id = null,
         dialer_source_account_id = null,
         dialer_claimed_at = null,
         dialer_wechat_added_at = null,
         dialer_recycled_at = now(),
         updated_at = now()
   where dialer_batch_id is not null
     and dialer_claimed_at is not null
     and dialer_claimed_at <= now() - interval '48 hours'
     and category is distinct from '公海客户';

  get diagnostics v_recycled = row_count;
  return v_recycled;
end;
$$;

-- The marker remains useful for operation history, but must not block future claims
-- after the 48-hour device reservation has legitimately expired.
drop index if exists public.idx_customers_dialer_expiry;
create index if not exists idx_customers_dialer_expiry
  on public.customers (dialer_claimed_at)
  where dialer_batch_id is not null;
