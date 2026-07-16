-- Audit log for all sensitive actions

create table audit_log (
  id        uuid primary key default gen_random_uuid(),
  actor     text not null,       -- auth.uid() or 'system'
  action    text not null,       -- e.g. 'lead.accept', 'signal.publish', 'company.verify'
  entity    text not null,       -- table name
  entity_id uuid,
  payload   jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index audit_log_actor_idx on audit_log(actor);
create index audit_log_entity_idx on audit_log(entity, entity_id);
create index audit_log_created_at_idx on audit_log(created_at desc);

-- GDPR cleanup function: delete raw_documents older than 24 months
create or replace function cleanup_old_raw_documents()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from public.raw_documents
  where created_at < now() - interval '24 months';
$$;
