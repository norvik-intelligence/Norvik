"""
TED (Tenders Electronic Daily) adapter.
Fetches tender notices from EU procurement platform via the official TED API v3.

API: https://api.ted.europa.eu/v3/notices/search
Docs: https://developer.ted.europa.eu/

CPV codes targeted:
  45111000 - Demolition, site preparation and clearance work
  45111100 - Demolition work
  45111200 - Site preparation and clearance work
  45111213 - Site clearance work
  45262660 - Asbestos removal work
"""

from __future__ import annotations

import logging
import time
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

TED_API_BASE = "https://api.ted.europa.eu/v3"
USER_AGENT = "RückbauRadar/1.0 (+https://rueckbauradar.de)"
RATE_LIMIT_SEC = 1.0

CPV_CODES = [
    "45111000",
    "45111100",
    "45111200",
    "45111213",
    "45262660",
    "45262690",  # renovation work
    "90523000",  # hazardous waste disposal
]

_last_ted_request: float = 0.0


def fetch(source: dict) -> list[dict]:
    """Fetch recent DE tenders matching demolition/hazmat CPV codes from TED API v3."""
    config = source.get("config") or {}
    api_key = config.get("api_key", "")  # Optional: set in source.config
    last_run = source.get("last_run_at") or "2024-01-01"

    # TED API v3 uses CQL-style query language
    cpv_filter = " OR ".join(f"cpv:{code}*" for code in CPV_CODES)
    query = f"({cpv_filter}) AND buyer-country:DEU AND publication-date>={_date_str(last_run)}"

    documents: list[dict] = []
    page = 1
    page_size = 25

    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"

    with httpx.Client(timeout=30, headers=headers, follow_redirects=True) as client:
        while True:
            _rate_limit()
            try:
                resp = client.post(
                    f"{TED_API_BASE}/notices/search",
                    json={
                        "query": query,
                        "page": page,
                        "limit": page_size,
                        "fields": [
                            "ND",
                            "notice-title",
                            "notice-text",
                            "buyer-name",
                            "place-of-performance",
                            "cpv",
                            "total-value",
                            "publication-date",
                            "deadline-for-submission",
                            "links",
                        ],
                    },
                )
                resp.raise_for_status()
                data = resp.json()
            except Exception as exc:
                logger.error("TED API request failed (page %d): %s", page, exc)
                break

            notices = data.get("notices") or data.get("results") or []
            for notice in notices:
                doc = _notice_to_doc(notice)
                if doc:
                    documents.append(doc)

            total = data.get("totalNoticeCount") or data.get("total") or 0
            if page * page_size >= total or not notices:
                break
            page += 1
            if page > 40:
                logger.warning("TED pagination truncated at 40 pages")
                break

    logger.info("TED: fetched %d notices", len(documents))
    return documents


def _notice_to_doc(notice: dict) -> dict | None:
    nd = notice.get("ND") or notice.get("id") or ""
    if not nd:
        return None

    url = f"https://ted.europa.eu/en/notice/-/detail/{nd}"
    title = _first(notice.get("notice-title") or {})
    text_raw = _first(notice.get("notice-text") or {}) or ""
    buyer = _first(notice.get("buyer-name") or {}) or ""
    place = _first(notice.get("place-of-performance") or {}) or ""
    cpvs = notice.get("cpv") or []
    pub_date = notice.get("publication-date") or ""
    total_value = notice.get("total-value") or {}

    # Build rich raw text for keyword filter + LLM classify
    parts = [
        f"Titel: {title}",
        f"Auftraggeber: {buyer}",
        f"Ort: {place}",
        f"CPV: {', '.join(str(c) for c in cpvs)}",
        f"Veröffentlicht: {pub_date}",
    ]
    if total_value:
        parts.append(f"Volumen: {total_value}")
    if text_raw:
        parts.append(text_raw[:5000])

    raw_text = "\n".join(filter(None, parts))
    if not raw_text.strip():
        return None

    return {
        "url": url,
        "external_id": nd,
        "raw_text": raw_text,
        "storage_path": None,
    }


def _first(obj: dict | list | str | None) -> str:
    """Extract first string from TED's multilingual structure."""
    if isinstance(obj, str):
        return obj
    if isinstance(obj, list) and obj:
        return _first(obj[0])
    if isinstance(obj, dict):
        for lang in ("DEU", "ENG", "FRA"):
            if lang in obj:
                return _first(obj[lang])
        vals = list(obj.values())
        return _first(vals[0]) if vals else ""
    return ""


def _date_str(iso: str) -> str:
    return iso[:10]


def _rate_limit() -> None:
    global _last_ted_request
    elapsed = time.monotonic() - _last_ted_request
    if elapsed < RATE_LIMIT_SEC:
        time.sleep(RATE_LIMIT_SEC - elapsed)
    _last_ted_request = time.monotonic()
