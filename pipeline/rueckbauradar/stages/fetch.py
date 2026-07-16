"""
Fetch stage: pull documents from all active sources.

Each source adapter is called independently; errors are caught per-source so
a single failing source never aborts the entire run.
"""

from __future__ import annotations

import hashlib
import importlib
import logging
from dataclasses import dataclass
from datetime import UTC, datetime

from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)


@dataclass
class FetchResult:
    source_id: str
    new_docs: int
    errors: int


def run() -> list[FetchResult]:
    """Fetch all active sources and upsert raw_documents."""
    db = get_client()
    sources_resp = db.table("sources").select("*").eq("is_active", True).execute()
    sources = sources_resp.data or []

    results: list[FetchResult] = []
    for source in sources:
        result = _fetch_source(source)
        results.append(result)
        db.table("sources").update(
            {
                "last_run_at": datetime.now(UTC).isoformat(),
                "last_status": f"ok: {result.new_docs} new" if result.errors == 0
                else f"error: {result.errors} failed",
            }
        ).eq("id", source["id"]).execute()

    return results


def _fetch_source(source: dict) -> FetchResult:
    source_id = source["id"]
    adapter_key = source["adapter_key"]
    new_docs = 0
    errors = 0

    try:
        module = importlib.import_module(f"rueckbauradar.adapters.{adapter_key}")
        documents = module.fetch(source)
    except Exception as exc:
        logger.error("Adapter %s failed for source %s: %s", adapter_key, source_id, exc)
        return FetchResult(source_id=source_id, new_docs=0, errors=1)

    db = get_client()
    for doc in documents:
        try:
            content_hash = hashlib.sha256(doc["raw_text"].encode()).hexdigest()
            db.table("raw_documents").upsert(
                {
                    "source_id": source_id,
                    "external_id": doc.get("external_id"),
                    "url": doc["url"],
                    "content_hash": content_hash,
                    "raw_text": doc["raw_text"],
                    "storage_path": doc.get("storage_path"),
                    "parse_status": "pending",
                },
                on_conflict="content_hash",
                ignore_duplicates=True,
            ).execute()
            new_docs += 1
        except Exception as exc:
            logger.error("Failed to upsert doc %s: %s", doc.get("url"), exc)
            errors += 1

    return FetchResult(source_id=source_id, new_docs=new_docs, errors=errors)
