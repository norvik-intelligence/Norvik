-- Row Level Security policies
-- Principle: public read where safe, company-scoped write, admin full access

-- ============================================================
-- LOOKUP TABLES (regions, trades, buyer_categories)
-- Public read, admin write
-- ============================================================

alter table regions enable row level security;
create policy "regions_select" on regions for select using (true);
create policy "regions_admin_all" on regions for all using (is_admin());

alter table trades enable row level security;
create policy "trades_select" on trades for select using (true);
create policy "trades_admin_all" on trades for all using (is_admin());

alter table buyer_categories enable row level security;
create policy "buyer_categories_select" on buyer_categories for select using (true);
create policy "buyer_categories_admin_all" on buyer_categories for all using (is_admin());

-- ============================================================
-- SOURCES + RAW DOCUMENTS
-- Admin only (sensitive: URLs, raw content)
-- ============================================================

alter table sources enable row level security;
create policy "sources_admin_all" on sources for all using (is_admin());

alter table raw_documents enable row level security;
create policy "raw_documents_admin_all" on raw_documents for all using (is_admin());

alter table geocode_cache enable row level security;
create policy "geocode_cache_admin_all" on geocode_cache for all using (is_admin());

-- ============================================================
-- SIGNALS
-- Published signals visible to matching subscribers.
-- Full address only for signal_pro plan.
-- ============================================================

alter table signals enable row level security;

-- Admin sees everything
create policy "signals_admin_all" on signals for all using (is_admin());

-- Authenticated companies see published signals where they have an active
-- subscription matching buyer_category. Address visibility handled in app.
create policy "signals_subscriber_select" on signals
  for select
  using (
    status = 'published'
    and exists (
      select 1
      from subscriptions s
      join signal_buyers sb on sb.signal_id = signals.id
        and sb.buyer_category_id = s.buyer_category_id
      where
        s.company_id = get_my_company_id()
        and s.status = 'active'
        and (s.ends_at is null or s.ends_at > now())
    )
  );

alter table signal_trades enable row level security;
create policy "signal_trades_admin_all" on signal_trades for all using (is_admin());
create policy "signal_trades_select" on signal_trades for select
  using (
    exists (
      select 1 from signals sg
      where sg.id = signal_id and sg.status = 'published'
    )
  );

alter table signal_buyers enable row level security;
create policy "signal_buyers_admin_all" on signal_buyers for all using (is_admin());
create policy "signal_buyers_select" on signal_buyers for select
  using (
    exists (
      select 1 from signals sg
      where sg.id = signal_id and sg.status = 'published'
    )
  );

-- ============================================================
-- COMPANIES + CHILD TABLES
-- Company sees/edits only own rows. Admin full access.
-- ============================================================

alter table companies enable row level security;
create policy "companies_admin_all" on companies for all using (is_admin());
create policy "companies_own_select" on companies for select
  using (auth_user_id = auth.uid());
create policy "companies_own_update" on companies for update
  using (auth_user_id = auth.uid())
  with check (auth_user_id = auth.uid());
create policy "companies_insert" on companies for insert
  with check (auth_user_id = auth.uid());

alter table company_trades enable row level security;
create policy "company_trades_admin_all" on company_trades for all using (is_admin());
create policy "company_trades_own" on company_trades for all
  using (company_id = get_my_company_id());

alter table certifications enable row level security;
create policy "certifications_admin_all" on certifications for all using (is_admin());
create policy "certifications_own" on certifications for all
  using (company_id = get_my_company_id());

alter table capacities enable row level security;
create policy "capacities_admin_all" on capacities for all using (is_admin());
create policy "capacities_own" on capacities for all
  using (company_id = get_my_company_id());

alter table contacts enable row level security;
create policy "contacts_admin_all" on contacts for all using (is_admin());
create policy "contacts_own" on contacts for all
  using (company_id = get_my_company_id());

-- ============================================================
-- SUBSCRIPTIONS + TERRITORY
-- ============================================================

alter table subscriptions enable row level security;
create policy "subscriptions_admin_all" on subscriptions for all using (is_admin());
create policy "subscriptions_own" on subscriptions for select
  using (company_id = get_my_company_id());

alter table territory_slots enable row level security;
create policy "territory_slots_select" on territory_slots for select using (true);
create policy "territory_slots_admin_all" on territory_slots for all using (is_admin());

alter table territory_partners enable row level security;
create policy "territory_partners_admin_all" on territory_partners for all using (is_admin());
create policy "territory_partners_own" on territory_partners for select
  using (company_id = get_my_company_id());

-- ============================================================
-- MEDIATION + LEADS (admin only)
-- ============================================================

alter table demand_contacts enable row level security;
create policy "demand_contacts_admin_all" on demand_contacts for all using (is_admin());

alter table mediations enable row level security;
create policy "mediations_admin_all" on mediations for all using (is_admin());

-- Leads: admin full access + company sees own offered/accepted leads
alter table leads enable row level security;
create policy "leads_admin_all" on leads for all using (is_admin());
create policy "leads_own_select" on leads for select
  using (company_id = get_my_company_id());
create policy "leads_own_accept" on leads for update
  using (
    company_id = get_my_company_id()
    and status = 'offered'
  )
  with check (
    company_id = get_my_company_id()
    and status in ('accepted', 'declined')
  );

-- ============================================================
-- AUDIT LOG (admin only)
-- ============================================================

alter table audit_log enable row level security;
create policy "audit_log_admin_all" on audit_log for all using (is_admin());
