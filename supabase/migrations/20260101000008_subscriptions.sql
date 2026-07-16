-- Subscription and territory partner tables

create table subscriptions (
  id               uuid primary key default gen_random_uuid(),
  company_id       uuid not null references companies(id) on delete cascade,
  buyer_category_id uuid references buyer_categories(id) on delete set null,
  region_id        uuid references regions(id) on delete set null,
  radius_km        int,
  plan             subscription_plan not null default 'free_trial',
  status           subscription_status not null default 'active',
  started_at       timestamptz not null default now(),
  ends_at          timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index subscriptions_company_id_idx on subscriptions(company_id);
create index subscriptions_status_idx on subscriptions(status);

create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function set_updated_at();

-- Territory slot configuration (max 3-5 per region/trade)
create table territory_slots (
  id             uuid primary key default gen_random_uuid(),
  region_id      uuid not null references regions(id) on delete cascade,
  trade_id       uuid not null references trades(id) on delete cascade,
  max_slots      int not null default 3,
  price_monthly  int not null,  -- in euro cents
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  unique (region_id, trade_id)
);

create trigger territory_slots_updated_at before update on territory_slots
  for each row execute function set_updated_at();

-- Contracted territory partners
create table territory_partners (
  id                uuid primary key default gen_random_uuid(),
  territory_slot_id uuid not null references territory_slots(id) on delete restrict,
  company_id        uuid not null references companies(id) on delete restrict,
  started_at        timestamptz not null default now(),
  ends_at           timestamptz,
  status            territory_partner_status not null default 'active',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unique (territory_slot_id, company_id)
);

create index territory_partners_company_id_idx on territory_partners(company_id);
create index territory_partners_status_idx on territory_partners(status);

create trigger territory_partners_updated_at before update on territory_partners
  for each row execute function set_updated_at();
