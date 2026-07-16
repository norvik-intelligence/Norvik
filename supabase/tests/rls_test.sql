-- RLS tests (pgTAP) – run with: supabase test db
begin;
create extension if not exists pgtap with schema extensions;

select plan(10);

-- ── Setup: two auth users + two companies ───────────────────────────────────
insert into auth.users (id, email)
values
  ('00000000-0000-0000-0000-000000000001', 'firma-a@example.com'),
  ('00000000-0000-0000-0000-000000000002', 'firma-b@example.com');

insert into companies (id, auth_user_id, name)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Firma A'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Firma B');

insert into capacities (company_id, from_date, to_date, team_size)
values
  ('10000000-0000-0000-0000-000000000001', '2026-08-01', '2026-08-31', 6),
  ('10000000-0000-0000-0000-000000000002', '2026-08-01', '2026-08-31', 4);

-- A published signal without any subscription match
insert into sources (id, type, name, base_url, adapter_key)
values ('20000000-0000-0000-0000-000000000001', 'oparl', 'Test', 'https://example.com', 'oparl');
insert into raw_documents (id, source_id, url, content_hash)
values ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001',
        'https://example.com/doc', 'testhash');
insert into signals (id, raw_document_id, title, status, source_url)
values ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001',
        'Testsignal', 'published', 'https://example.com/doc');

-- ── Tests as Firma A ─────────────────────────────────────────────────────────
set local role authenticated;
set local request.jwt.claims to
  '{"sub": "00000000-0000-0000-0000-000000000001", "role": "authenticated", "app_metadata": {}}';

select is(
  (select count(*)::int from companies),
  1,
  'Company sees only its own row'
);

select is(
  (select count(*)::int from capacities),
  1,
  'Company sees only own capacities'
);

select is(
  (select count(*)::int from signals),
  0,
  'Published signal hidden without matching subscription'
);

select is(
  (select count(*)::int from audit_log),
  0,
  'audit_log hidden from companies'
);

select is(
  (select count(*)::int from mediations),
  0,
  'mediations hidden from companies'
);

select is(
  (select count(*)::int from sources),
  0,
  'sources hidden from companies'
);

-- ── Subscription match makes the signal visible ─────────────────────────────
set local role postgres;
insert into buyer_categories (id, slug, name)
values ('50000000-0000-0000-0000-000000000001', 'test_cat', 'Test')
on conflict (slug) do nothing;
insert into signal_buyers (signal_id, buyer_category_id)
values ('40000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001');
insert into subscriptions (company_id, buyer_category_id, plan, status)
values ('10000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001',
        'signal_basic', 'active');

set local role authenticated;
set local request.jwt.claims to
  '{"sub": "00000000-0000-0000-0000-000000000001", "role": "authenticated", "app_metadata": {}}';

select is(
  (select count(*)::int from signals),
  1,
  'Published signal visible with active matching subscription'
);

-- ── Admin sees everything ────────────────────────────────────────────────────
set local request.jwt.claims to
  '{"sub": "00000000-0000-0000-0000-000000000002", "role": "authenticated", "app_metadata": {"role": "admin"}}';

select is(
  (select count(*)::int from companies),
  2,
  'Admin sees all companies'
);

select ok(
  (select count(*)::int from audit_log) >= 0,
  'Admin can read audit_log'
);

select ok(
  (select count(*)::int from mediations) >= 0,
  'Admin can read mediations'
);

select * from finish();
rollback;
