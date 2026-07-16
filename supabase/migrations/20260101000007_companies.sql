-- Company (contractor) profiles and related tables

create table companies (
  id                  uuid primary key default gen_random_uuid(),
  auth_user_id        uuid unique references auth.users(id) on delete set null,
  name                text not null,
  legal_form          text,          -- GmbH, GmbH & Co. KG, etc.
  address             text,
  lat                 double precision,
  lng                 double precision,
  radius_km           int not null default 50,
  website             text,
  phone               text,
  verification_status verification_status not null default 'unverified',
  notes               text,          -- internal admin notes
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index companies_auth_user_id_idx on companies(auth_user_id);
create index companies_verification_status_idx on companies(verification_status);

create trigger companies_updated_at before update on companies
  for each row execute function set_updated_at();

-- n:m: company ↔ trade
create table company_trades (
  company_id uuid not null references companies(id) on delete cascade,
  trade_id   uuid not null references trades(id) on delete cascade,
  primary key (company_id, trade_id)
);

-- Regulatory certifications uploaded by the company
create table certifications (
  id                  uuid primary key default gen_random_uuid(),
  company_id          uuid not null references companies(id) on delete cascade,
  type                cert_type not null,
  file_path           text not null,  -- Supabase Storage path
  valid_until         date,
  verified_by_admin_at timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index certifications_company_id_idx on certifications(company_id);

create trigger certifications_updated_at before update on certifications
  for each row execute function set_updated_at();

-- Capacity declarations – the data moat
create table capacities (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  from_date  date not null,
  to_date    date not null,
  team_size  int,
  note       text,        -- e.g. "Frei ab KW 40 mit 6 Mann, Asbest-Zulassung"
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (to_date >= from_date)
);

create index capacities_company_id_idx on capacities(company_id);
create index capacities_from_date_idx on capacities(from_date);

create trigger capacities_updated_at before update on capacities
  for each row execute function set_updated_at();

-- Contact persons at the company
create table contacts (
  id         uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  name       text not null,
  email      text,
  phone      text,
  role       text,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contacts_company_id_idx on contacts(company_id);

create trigger contacts_updated_at before update on contacts
  for each row execute function set_updated_at();
