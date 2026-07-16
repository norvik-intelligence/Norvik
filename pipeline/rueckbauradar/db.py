"""Supabase client singleton for the pipeline."""

from functools import lru_cache

from supabase import Client, create_client

from rueckbauradar.config import get_settings


@lru_cache(maxsize=1)
def get_client() -> Client:
    s = get_settings()
    return create_client(s.SUPABASE_URL, s.SUPABASE_SERVICE_ROLE_KEY)
