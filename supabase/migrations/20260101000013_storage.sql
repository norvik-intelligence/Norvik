-- Storage buckets: original source documents + company certificates
-- Both private; access via RLS policies below.

insert into storage.buckets (id, name, public)
values
  ('documents', 'documents', false),
  ('certificates', 'certificates', false)
on conflict (id) do nothing;

-- documents: pipeline writes with service role (bypasses RLS); admin reads
create policy "documents_admin_read" on storage.objects
  for select using (bucket_id = 'documents' and is_admin());

-- certificates: companies manage files under their own company_id/ prefix
create policy "certificates_company_all" on storage.objects
  for all
  using (
    bucket_id = 'certificates'
    and (storage.foldername(name))[1] = get_my_company_id()::text
  )
  with check (
    bucket_id = 'certificates'
    and (storage.foldername(name))[1] = get_my_company_id()::text
  );

create policy "certificates_admin_all" on storage.objects
  for all using (bucket_id = 'certificates' and is_admin());
