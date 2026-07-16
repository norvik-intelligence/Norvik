-- Helper functions for RLS policies

-- Returns true if the current user has the admin claim
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (auth.jwt() ->> 'role') = 'admin',
    false
  );
$$;

-- Returns the company_id associated with the current auth user, or null
create or replace function get_my_company_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select id from public.companies where auth_user_id = auth.uid() limit 1;
$$;

-- Auto-update updated_at trigger
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
