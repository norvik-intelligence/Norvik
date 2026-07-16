"""
Score stage: rule-based 0-100 scoring of signals. No LLM involved.

Scoring dimensions:
  phase     0-35  (earlier phase = higher score)
  volume    0-25
  hazmat    0-25  (hazmat_probability * 25)
  source    0-15  (source type quality)
"""

from __future__ import annotations

import logging

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)

PHASE_SCORES: dict[str | None, int] = {
    "idee": 35,
    "beschluss": 28,
    "planung": 21,
    "vor_ausschreibung": 10,
    "ausgeschrieben": 0,
    None: 15,  # unknown: mid-range
}

VOLUME_SCORES: dict[str | None, int] = {
    "xl": 25,
    "l": 20,
    "m": 12,
    "s": 5,
    None: 8,
}

SOURCE_TYPE_SCORES: dict[str, int] = {
    "oparl": 15,
    "ted": 12,
    "rss": 8,
    "scrape_html": 6,
    "scrape_pdf": 4,
}


def run() -> dict[str, int]:
    """Score all signals with status='new', auto-flag those above threshold."""
    db = get_client()
    settings = get_settings()

    sigs_resp = (
        db.table("signals")
        .select("id, project_phase, volume_estimate_band, hazmat_probability, raw_document_id, status")
        .eq("status", "new")
        .execute()
    )
    signals = sigs_resp.data or []
    scored = 0

    for sig in signals:
        score = _calculate_score(sig, db)
        new_status = "auto_flagged" if score >= settings.SCORE_AUTO_FLAG_THRESHOLD else "new"
        db.table("signals").update({"score": score, "status": new_status}).eq(
            "id", sig["id"]
        ).execute()
        scored += 1
        logger.debug("Signal %s scored %d → %s", sig["id"], score, new_status)

    return {"scored": scored}


def _calculate_score(signal: dict, db: object) -> int:
    phase_score = PHASE_SCORES.get(signal.get("project_phase"), 15)
    volume_score = VOLUME_SCORES.get(signal.get("volume_estimate_band"), 8)
    hazmat_prob = float(signal.get("hazmat_probability") or 0.1)
    hazmat_score = round(hazmat_prob * 25)

    source_type = _get_source_type(signal["raw_document_id"], db)
    source_score = SOURCE_TYPE_SCORES.get(source_type, 6)

    total = phase_score + volume_score + hazmat_score + source_score
    return min(100, total)


def _get_source_type(raw_doc_id: str, db: object) -> str:
    try:
        resp = (
            db.table("raw_documents")
            .select("source_id")
            .eq("id", raw_doc_id)
            .single()
            .execute()
        )
        source_id = resp.data.get("source_id") if resp.data else None
        if not source_id:
            return "rss"
        src_resp = (
            db.table("sources").select("type").eq("id", source_id).single().execute()
        )
        return src_resp.data.get("type", "rss") if src_resp.data else "rss"
    except Exception:
        return "rss"
