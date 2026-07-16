-- Signal processing tables

create table signals (
  id                  uuid primary key default gen_random_uuid(),
  raw_document_id     uuid not null references raw_documents(id) on delete restrict,
  title               text not null,
  summary             text,          -- max 300 chars, no personal data
  address_text        text,          -- full address (restricted by RLS below signal_pro)
  postcode            text,          -- extracted for RLS filtering
  lat                 double precision,
  lng                 double precision,
  region_id           uuid references regions(id) on delete set null,
  municipality        text,
  building_year_hint  int,           -- LLM-extracted construction year hint
  hazmat_probability  double precision check (hazmat_probability between 0 and 1),
  hazmat_indicators   text[],        -- e.g. ['asbest', 'kmf', 'pcb']
  project_phase       project_phase,
  volume_estimate_band volume_band,
  score               int check (score between 0 and 100),
  status              signal_status not null default 'new',
  source_url          text not null, -- original document URL (always preserved)
  fetched_at          timestamptz,   -- when the source was fetched
  published_at        timestamptz,
  llm_model           text,          -- which LLM model was used for classify
  llm_tokens_used     int,
  embedding           extensions.vector(1536),  -- pgvector for dedup
  duplicate_of        uuid references signals(id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index signals_status_idx on signals(status);
create index signals_region_id_idx on signals(region_id);
create index signals_score_idx on signals(score desc);
create index signals_published_at_idx on signals(published_at desc) where published_at is not null;
create index signals_embedding_idx on signals using ivfflat (embedding extensions.vector_cosine_ops)
  with (lists = 100);

create trigger signals_updated_at before update on signals
  for each row execute function set_updated_at();

-- n:m: signal ↔ trade
create table signal_trades (
  signal_id uuid not null references signals(id) on delete cascade,
  trade_id  uuid not null references trades(id) on delete cascade,
  primary key (signal_id, trade_id)
);

-- n:m: signal ↔ buyer_category
create table signal_buyers (
  signal_id        uuid not null references signals(id) on delete cascade,
  buyer_category_id uuid not null references buyer_categories(id) on delete cascade,
  primary key (signal_id, buyer_category_id)
);
