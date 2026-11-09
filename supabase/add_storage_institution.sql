-- Add a dedicated field for each customer's storage institution.
-- Keep this separate from company_name (单位).
ALTER TABLE public.customers
ADD COLUMN IF NOT EXISTS storage_institution text;
