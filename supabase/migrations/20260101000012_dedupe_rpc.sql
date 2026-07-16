-- RPC function for pgvector-based signal deduplication
-- Called by the Python dedupe stage

create or replace function find_similar_signals(
  signal_id uuid,
  similarity_threshold float default 0.88,
  time_window_days int default 90
)
returns table (
  id         uuid,
  title      text,
  lat        double precision,
  lng        double precision,
  score      int,
  similarity float
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    s2.id,
    s2.title,
    s2.lat,
    s2.lng,
    s2.score,
    1 - (s1.embedding <=> s2.embedding) as similarity
  from public.signals s1
  cross join public.signals s2
  where
    s1.id = signal_id
    and s2.id <> signal_id
    and s2.duplicate_of is null
    and s2.status not in ('rejected', 'published')
    and s2.created_at > now() - (time_window_days || ' days')::interval
    and s1.embedding is not null
    and s2.embedding is not null
    and 1 - (s1.embedding <=> s2.embedding) >= similarity_threshold
  order by similarity desc
  limit 20;
$$;
