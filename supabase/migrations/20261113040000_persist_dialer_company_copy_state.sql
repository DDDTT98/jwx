-- Persist copied-company state independently from last_operation.
-- This allows a device's dialer cards to recover their faded state after cloud restore.
alter table public.customers
  add column if not exists dialer_company_copied_at timestamptz;

-- Recover the state where the most recent stored operation already records a company copy.
update public.customers
   set dialer_company_copied_at = coalesce(
     dialer_company_copied_at,
     nullif(last_operation->>'ts', '')::timestamptz,
     now()
   )
 where dialer_company_copied_at is null
   and jsonb_typeof(last_operation) = 'object'
   and last_operation->>'type' = 'copy_company';
