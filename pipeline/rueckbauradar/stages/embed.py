"""
Embed stage: generate pgvector embeddings for signals (title + summary).
Used by the dedupe stage for cosine similarity matching.
"""

from __future__ import annotations

import logging

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)


def run() -> dict[str, int]:
    db = get_client()

    sigs_resp = (
        db.table("signals")
        .select("id, title, summary")
        .or_("status.eq.new,status.eq.auto_flagged")
        .is_("embedding", "null")
        .limit(100)
        .execute()
    )
    signals = sigs_resp.data or []
    embedded = 0

    for sig in signals:
        text = f"{sig.get('title', '')} {sig.get('summary', '')}".strip()
        if not text:
            continue
        try:
            vec = _embed(text)
            db.table("signals").update({"embedding": vec}).eq("id", sig["id"]).execute()
            embedded += 1
        except Exception as exc:
            logger.warning("Embedding failed for signal %s: %s", sig["id"], exc)

    return {"embedded": embedded}


def _embed(text: str) -> list[float]:
    settings = get_settings()
    if settings.EMBEDDING_PROVIDER == "openai":
        from openai import OpenAI
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        resp = client.embeddings.create(model=settings.EMBEDDING_MODEL, input=text)
        return resp.data[0].embedding
    raise ValueError(f"Unknown embedding provider: {settings.EMBEDDING_PROVIDER}")
