-- Lookup / master data tables

create table regions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  bundesland  text not null,
  geo_polygon extensions.geometry(multipolygon, 4326),  -- populated later
  is_brokerage_active boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger regions_updated_at before update on regions
  for each row execute function set_updated_at();

create table trades (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,  -- rueckbau | schadstoff | geruest | abdichtung | entsorgung | gutachten
  name       text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trades_updated_at before update on trades
  for each row execute function set_updated_at();

create table buyer_categories (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,  -- sanierer | gutachter | entsorger | geruestbauer | entwickler
  name       text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger buyer_categories_updated_at before update on buyer_categories
  for each row execute function set_updated_at();
