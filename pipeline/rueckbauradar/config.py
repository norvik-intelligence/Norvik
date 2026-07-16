from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Supabase
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # LLM provider: "anthropic" | "openai" | "gemini"
    LLM_PROVIDER: str = "anthropic"
    LLM_MODEL: str = "claude-haiku-4-5-20251001"
    ANTHROPIC_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    # Embeddings (for pgvector dedupe)
    EMBEDDING_PROVIDER: str = "openai"
    EMBEDDING_MODEL: str = "text-embedding-3-small"

    # Geocoding
    PHOTON_API_URL: str = "https://photon.komoot.io"

    # Email (Resend or SMTP)
    EMAIL_PROVIDER: str = "resend"  # "resend" | "smtp"
    RESEND_API_KEY: str = ""
    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASS: str = ""
    EMAIL_FROM: str = "signal@rueckbauradar.de"

    # Pipeline behaviour
    KEYWORD_FILTER_ENABLED: bool = True
    CLASSIFY_CONFIDENCE_THRESHOLD: float = 0.6
    SCORE_AUTO_FLAG_THRESHOLD: int = 65
    DEDUPE_SIMILARITY_THRESHOLD: float = 0.88
    DEDUPE_GEO_RADIUS_M: float = 300.0
    DEDUPE_TIME_WINDOW_DAYS: int = 90
    MAX_REQUESTS_PER_HOST_SEC: float = 1.0  # rate limit


_settings: Settings | None = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()  # type: ignore[call-arg]
    return _settings
