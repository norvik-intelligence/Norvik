"""
Dedupe stage: merge near-duplicate signals using pgvector cosine similarity
+ geo proximity (<300m) + time window (90 days).
"""

from __future__ import annotations

import logging
import math

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)


def run() -> dict[str, int]:
    """Find and mark duplicate signals. Keeps the highest-scored version."""
    db = get_client()
    settings = get_settings()

    # Only consider signals that have an embedding and are not already duplicates
    sigs_resp = (
        db.table("signals")
        .select("id, title, summary, lat, lng, published_at, score, embedding")
        .or_("status.eq.new,status.eq.auto_flagged,status.eq.approved")
        .is_("duplicate_of", "null")
        .not_.is_("embedding", "null")
        .order("created_at", desc=True)
        .limit(500)
        .execute()
    )
    signals = sigs_resp.data or []
    merged = 0

    threshold = settings.DEDUPE_SIMILARITY_THRESHOLD
    geo_m = settings.DEDUPE_GEO_RADIUS_M
    days = settings.DEDUPE_TIME_WINDOW_DAYS

    for i, sig in enumerate(signals):
        if not sig.get("embedding"):
            continue
        # Use pgvector cosine similarity via RPC
        candidates_resp = db.rpc(
            "find_similar_signals",
            {
                "signal_id": sig["id"],
                "similarity_threshold": threshold,
                "time_window_days": days,
            },
        ).execute()
        candidates = candidates_resp.data or []

        for cand in candidates:
            if cand["id"] == sig["id"]:
                continue
            # Also check geo proximity
            if sig.get("lat") and cand.get("lat"):
                dist_m = _haversine_m(
                    sig["lat"], sig["lng"], cand["lat"], cand["lng"]
                )
                if dist_m > geo_m:
                    continue

            # Mark the lower-scored signal as duplicate
            keep_id = sig["id"] if (sig.get("score") or 0) >= (cand.get("score") or 0) else cand["id"]
            dup_id = cand["id"] if keep_id == sig["id"] else sig["id"]

            db.table("signals").update({"duplicate_of": keep_id, "status": "rejected"}).eq(
                "id", dup_id
            ).execute()
            merged += 1

    return {"merged": merged}


def _haversine_m(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6_371_000  # Earth radius in metres
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return 2 * R * math.asin(math.sqrt(a))
