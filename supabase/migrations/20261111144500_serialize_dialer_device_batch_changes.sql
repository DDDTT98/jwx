
create or replace function public.claim_dialer_customers(
  p_source_account_id text, p_target_account_id text, p_device_id text, p_batch_id text,
  p_limit integer default 50, p_exclude_mobiles text[] default array[]::text[], p_master_quota integer default 600
)
returns setof public.customers
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_limit integer;
  v_batch_count integer := 0;
  v_used integer := 0;
  v_remaining integer;
  v_claimed integer := 0;
  v_pull_date date := (now() at time zone 'Asia/Shanghai')::date;
begin
  if coalesce(trim(p_source_account_id), '') = '' or coalesce(trim(p_target_account_id), '') = '' or
     coalesce(trim(p_device_id), '') = '' or coalesce(trim(p_batch_id), '') = '' then
    raise exception 'source account, target account, device and batch are required';
  end if;

  -- Serialize batch replacement and manual additions for this account/device pair.
  perform pg_advisory_xact_lock(hashtextextended(p_target_account_id || ':' || p_device_id, 0));

  v_limit := greatest(1, least(coalesce(p_limit, 50), 200));
  return query
    select c.* from public.customers c
     where c.account_id = p_target_account_id and c.dialer_batch_id = p_batch_id
       and c.dialer_device_id = p_device_id and c.dialer_source_account_id = p_source_account_id
     order by c.pulled_at asc nulls first, c.created_at desc;
  if found then return; end if;

  select count(*) into v_batch_count from public.customers c
   where c.account_id = p_target_account_id and c.dialer_batch_id = p_batch_id
     and c.dialer_device_id = p_device_id;
  v_limit := greatest(0, v_limit - v_batch_count);
  if v_limit <= 0 then return; end if;

  update public.customers
     set dialer_batch_id = null, dialer_device_id = null,
         dialer_source_account_id = null, dialer_claimed_at = null
   where account_id = p_target_account_id and dialer_device_id = p_device_id
     and dialer_batch_id is not null and dialer_batch_id <> p_batch_id;

  if p_source_account_id <> p_target_account_id then
    insert into public.dialer_master_pull_daily(account_id, pull_date, count, updated_at)
    values (p_target_account_id, v_pull_date, 0, now())
    on conflict (account_id, pull_date) do nothing;
    select coalesce(d.count, 0) into v_used from public.dialer_master_pull_daily d
     where d.account_id = p_target_account_id and d.pull_date = v_pull_date for update;
    v_remaining := greatest(0, coalesce(p_master_quota, 600) - v_used);
    v_limit := least(v_limit, v_remaining);
    if v_limit <= 0 then return; end if;
  end if;

  return query
    with candidates as (
      select c.id from public.customers c
       where c.account_id = p_source_account_id and c.category is distinct from '公海客户'
         and (c.pulled_at is null or c.pulled_at < now() - interval '10 days')
         and (coalesce(array_length(p_exclude_mobiles, 1), 0) = 0 or c.mobile <> all(p_exclude_mobiles))
       order by c.pulled_at asc nulls first, c.created_at desc
       limit v_limit for update skip locked
    ),
    claimed as (
      update public.customers c
         set account_id = p_target_account_id, pulled_at = now(),
             dialer_batch_id = p_batch_id, dialer_device_id = p_device_id,
             dialer_source_account_id = p_source_account_id, dialer_claimed_at = now(),
             updated_at = now()
        from candidates x where c.id = x.id returning c.*
    )
    select claimed.* from claimed;
  get diagnostics v_claimed = row_count;
  if p_source_account_id <> p_target_account_id and v_claimed > 0 then
    update public.dialer_master_pull_daily set count = count + v_claimed, updated_at = now()
     where account_id = p_target_account_id and pull_date = v_pull_date;
  end if;
end;
$$;

create or replace function public.claim_specific_dialer_customers(
  p_account_id text, p_device_id text, p_batch_id text, p_mobiles text[]
)
returns setof public.customers
language plpgsql
security invoker
set search_path = public
as $$
begin
  if coalesce(trim(p_account_id), '') = '' or coalesce(trim(p_device_id), '') = '' or coalesce(trim(p_batch_id), '') = '' then
    raise exception 'account, device and batch are required';
  end if;
  if coalesce(array_length(p_mobiles, 1), 0) = 0 then return; end if;

  perform pg_advisory_xact_lock(hashtextextended(p_account_id || ':' || p_device_id, 0));

  if not exists (
    select 1 from public.customers c
     where c.account_id = p_account_id and c.dialer_device_id = p_device_id
       and c.dialer_batch_id = p_batch_id
  ) then
    raise exception '拨号列表已失效，请刷新后重新加载';
  end if;

  return query
    select c.* from public.customers c
     where c.account_id = p_account_id and c.dialer_device_id = p_device_id
       and c.dialer_batch_id = p_batch_id and c.mobile = any(p_mobiles);
  if found then return; end if;

  return query
    with candidates as (
      select c.id from public.customers c
       where c.account_id = p_account_id and c.mobile = any(p_mobiles)
         and c.category is distinct from '公海客户'
         and (c.pulled_at is null or c.pulled_at < now() - interval '10 days')
         and c.dialer_batch_id is null
       order by c.created_at desc for update skip locked
    ),
    claimed as (
      update public.customers c
         set pulled_at = now(), dialer_batch_id = p_batch_id, dialer_device_id = p_device_id,
             dialer_source_account_id = p_account_id, dialer_claimed_at = now(), updated_at = now()
        from candidates x where c.id = x.id returning c.*
    )
    select claimed.* from claimed;
end;
$$;

revoke all on function public.claim_dialer_customers(text,text,text,text,integer,text[],integer) from public, anon, authenticated;
grant execute on function public.claim_dialer_customers(text,text,text,text,integer,text[],integer) to service_role;
revoke all on function public.claim_specific_dialer_customers(text,text,text,text[]) from public, anon, authenticated;
grant execute on function public.claim_specific_dialer_customers(text,text,text,text[]) to service_role;
