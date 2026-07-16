"""
Geocode stage: resolve address_text → lat/lng via photon API.
Results are cached in geocode_cache to avoid repeated API calls.
Falls back to municipality centroid if photon returns nothing.
"""

from __future__ import annotations

import logging
import time

import httpx

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)

MUNICIPALITY_CENTROIDS: dict[str, tuple[float, float]] = {
    "bonn": (50.7374, 7.0982),
    "düsseldorf": (51.2217, 6.7762),
    "duesseldorf": (51.2217, 6.7762),
    "köln": (50.9333, 6.9500),
    "koeln": (50.9333, 6.9500),
    "münster": (51.9607, 7.6261),
    "muenster": (51.9607, 7.6261),
    "krefeld": (51.3388, 6.5853),
    "essen": (51.4566, 7.0116),
    "dortmund": (51.5136, 7.4653),
    "bochum": (51.4818, 7.2162),
    "wuppertal": (51.2562, 7.1508),
    "bielefeld": (52.0302, 8.5325),
    "berlin": (52.5200, 13.4050),
    "hamburg": (53.5753, 10.0153),
    "münchen": (48.1372, 11.5755),
    "muenchen": (48.1372, 11.5755),
    "frankfurt": (50.1109, 8.6821),
}


def run() -> dict[str, int]:
    db = get_client()

    sigs_resp = (
        db.table("signals")
        .select("id, address_text, municipality")
        .or_("status.eq.new,status.eq.auto_flagged")
        .is_("lat", "null")
        .limit(100)
        .execute()
    )
    signals = sigs_resp.data or []
    geocoded = 0

    for sig in signals:
        lat, lng = _resolve(sig)
        if lat is not None and lng is not None:
            db.table("signals").update({"lat": lat, "lng": lng}).eq("id", sig["id"]).execute()
            geocoded += 1
        time.sleep(0.3)  # photon fair-use rate limit

    return {"geocoded": geocoded}


def _resolve(sig: dict) -> tuple[float | None, float | None]:
    query = sig.get("address_text") or sig.get("municipality") or ""
    if not query.strip():
        return None, None

    # Check cache first
    db = get_client()
    cached = db.table("geocode_cache").select("lat, lng").eq("query", query).limit(1).execute()
    if cached.data:
        row = cached.data[0]
        return row.get("lat"), row.get("lng")

    # Call photon
    lat, lng = _call_photon(query)

    # Fall back to municipality centroid
    if lat is None:
        muni = (sig.get("municipality") or "").lower().strip()
        for key, coords in MUNICIPALITY_CENTROIDS.items():
            if key in muni or muni in key:
                lat, lng = coords
                break

    # Store in cache
    if lat is not None:
        try:
            db.table("geocode_cache").upsert(
                {"query": query, "lat": lat, "lng": lng}, on_conflict="query"
            ).execute()
        except Exception:
            pass

    return lat, lng


def _call_photon(query: str) -> tuple[float | None, float | None]:
    settings = get_settings()
    try:
        with httpx.Client(timeout=10) as client:
            resp = client.get(
                f"{settings.PHOTON_API_URL}/api",
                params={"q": query, "limit": 1, "lang": "de"},
                headers={"User-Agent": "RückbauRadar/1.0 (+https://rueckbauradar.de)"},
            )
            resp.raise_for_status()
            data = resp.json()
            features = data.get("features", [])
            if features:
                coords = features[0]["geometry"]["coordinates"]
                return float(coords[1]), float(coords[0])  # photon returns [lng, lat]
    except Exception as exc:
        logger.warning("Photon geocode failed for %r: %s", query, exc)
    return None, None
