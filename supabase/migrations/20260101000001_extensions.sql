-- Enable required Postgres extensions
-- (the pgvector project's extension is named "vector")
create extension if not exists "vector" with schema extensions;
create extension if not exists "postgis" with schema extensions;
create extension if not exists "pg_trgm" with schema extensions;
create extension if not exists "unaccent" with schema extensions;
