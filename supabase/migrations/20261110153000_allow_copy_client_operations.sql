alter table public.dialer_client_operations
  drop constraint if exists dialer_client_operations_operation_type_check;

alter table public.dialer_client_operations
  add constraint dialer_client_operations_operation_type_check
  check (operation_type in ('all', 'dial', 'copy'));
