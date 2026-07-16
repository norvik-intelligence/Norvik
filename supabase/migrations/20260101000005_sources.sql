-- Source tracking and raw document ingestion

create table sources (
  id               uuid primary key default gen_random_uuid(),
  type             source_type not null,
  name             text not null,
  base_url         text not null,
  adapter_key      text not null,  -- matches Python adapter module name
  region_id        uuid references regions(id) on delete set null,
  schedule         text not null default '0 5 * * *',  -- cron expression
  is_active        boolean not null default true,
  last_run_at      timestamptz,
  last_status      text,           -- 'ok' | 'error: <msg>' | 'no_new'
  config           jsonb not null default '{}',  -- adapter-specific settings
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger sources_updated_at before update on sources
  for each row execute function set_updated_at();

create table raw_documents (
  id           uuid primary key default gen_random_uuid(),
  source_id    uuid not null references sources(id) on delete cascade,
  external_id  text,               -- source-native ID (e.g. OParl paper ID)
  url          text not null,
  fetched_at   timestamptz not null default now(),
  content_hash text not null,      -- SHA-256 of raw content, globally unique
  storage_path text,               -- path in Supabase Storage (nullable until stored)
  raw_text     text,               -- extracted plain text for keyword filter
  parse_status parse_status_t not null default 'pending',
  parse_error  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (content_hash)
);

create index raw_documents_source_id_idx on raw_documents(source_id);
create index raw_documents_parse_status_idx on raw_documents(parse_status);
create index raw_documents_fetched_at_idx on raw_documents(fetched_at desc);

create trigger raw_documents_updated_at before update on raw_documents
  for each row execute function set_updated_at();

-- Geocoding cache to avoid repeated photon API calls
create table geocode_cache (
  id          uuid primary key default gen_random_uuid(),
  query       text not null unique,
  lat         double precision,
  lng         double precision,
  result_json jsonb,
  created_at  timestamptz not null default now()
);

create index geocode_cache_query_idx on geocode_cache(query);
