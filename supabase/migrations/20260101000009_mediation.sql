-- Demand side (building owners) and mediation / lead tables

create table demand_contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  org_type   demand_org_type not null,
  email      text,
  phone      text,
  notes      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger demand_contacts_updated_at before update on demand_contacts
  for each row execute function set_updated_at();

-- Mediation process: a signal ↔ demand_contact workflow
create table mediations (
  id                uuid primary key default gen_random_uuid(),
  signal_id         uuid not null references signals(id) on delete restrict,
  demand_contact_id uuid not null references demand_contacts(id) on delete restrict,
  status            mediation_status not null default 'proposed',
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index mediations_signal_id_idx on mediations(signal_id);
create index mediations_status_idx on mediations(status);

create trigger mediations_updated_at before update on mediations
  for each row execute function set_updated_at();

-- Individual lead offers to contractors
create table leads (
  id            uuid primary key default gen_random_uuid(),
  mediation_id  uuid not null references mediations(id) on delete restrict,
  company_id    uuid not null references companies(id) on delete restrict,
  fee_cents     int,            -- agreed fee in euro cents
  fee_band      text,           -- 's' | 'm' | 'l' | 'xl' human label
  status        lead_status not null default 'offered',
  qualified_at  timestamptz,    -- when admin marked this lead as qualified
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index leads_mediation_id_idx on leads(mediation_id);
create index leads_company_id_idx on leads(company_id);
create index leads_status_idx on leads(status);

create trigger leads_updated_at before update on leads
  for each row execute function set_updated_at();
