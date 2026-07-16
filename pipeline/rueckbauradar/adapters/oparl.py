"""
OParl adapter: fetch Papers and Agendaitem content from OParl-compliant
council information systems (German: Ratsinformationssystem).

References:
  Spec: https://oparl.org/spezifikation/online-ansicht/
  Blueprinting: meine-stadt-transparent OParl importer (MIT)

Strategy:
  - Start from system endpoint → body → paper list (incremental via modified since last_run)
  - For each paper: fetch title, body text, attachments
  - Rate limit: 1 req/s per host
  - User-Agent: RückbauRadar/1.0 (+https://rueckbauradar.de)
"""

from __future__ import annotations

import logging
import time
from datetime import datetime, timezone
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

BLOCKED: list[str] = ["127.", "localhost", "10.", "192.168.", "0.", "::1", "169.254."]
USER_AGENT = "RückbauRadar/1.0 (+https://rueckbauradar.de)"
RATE_LIMIT_SEC = 1.0


def _is_blocked(url: str) -> bool:
    host = urlparse(url).hostname or ""
    return any(host.startswith(b) for b in BLOCKED)


def fetch(source: dict) -> list[dict]:
    """Fetch papers from an OParl system endpoint since last_run_at."""
    config = source.get("config") or {}
    system_url = config.get("system_url") or source["base_url"]

    if _is_blocked(system_url):
        raise ValueError(f"SSRF blocked: {system_url}")

    last_run = source.get("last_run_at")
    modified_since = last_run or "2024-01-01T00:00:00Z"

    documents: list[dict] = []
    host = urlparse(system_url).netloc

    with httpx.Client(
        timeout=30,
        headers={"User-Agent": USER_AGENT},
        follow_redirects=True,
    ) as client:
        try:
            system_resp = client.get(system_url)
            system_resp.raise_for_status()
            system_data = system_resp.json()
        except Exception as exc:
            logger.error("Failed to fetch OParl system %s: %s", system_url, exc)
            return []

        bodies = _get_list(client, system_data.get("body", ""), host)
        for body in bodies:
            papers_url = body.get("paper", "")
            if not papers_url:
                continue
            papers = _get_list(
                client,
                f"{papers_url}?modified_since={modified_since}",
                host,
            )
            for paper in papers:
                doc = _paper_to_doc(client, paper, system_url, host)
                if doc:
                    documents.append(doc)

    logger.info("OParl %s: fetched %d papers", system_url, len(documents))
    return documents


def _paper_to_doc(client: httpx.Client, paper: dict, system_url: str, host: str) -> dict | None:
    url = paper.get("web") or paper.get("id") or ""
    if not url:
        return None

    # Collect body text from paper body + attachments
    text_parts: list[str] = []
    title = paper.get("name") or paper.get("shortName") or ""
    text_parts.append(title)

    body_text = paper.get("body") or ""
    if body_text:
        text_parts.append(body_text)

    # Fetch auxiliary files (Vorlagen, Beschlüsse)
    for file_url in (paper.get("auxiliaryFile") or []):
        try:
            _rate_limit(host)
            file_resp = client.get(file_url)
            file_data = file_resp.json()
            text_parts.append(file_data.get("name", ""))
            # Actual file download (PDF parsing) happens in the parse stage
        except Exception:
            pass

    raw_text = "\n".join(filter(None, text_parts))
    if not raw_text.strip():
        return None

    return {
        "url": url,
        "external_id": paper.get("id"),
        "raw_text": raw_text,
        "storage_path": None,
    }


def _get_list(client: httpx.Client, url: str, host: str) -> list[dict]:
    """Paginate through an OParl list endpoint."""
    items: list[dict] = []
    next_url: str | None = url

    while next_url:
        if _is_blocked(next_url):
            break
        try:
            _rate_limit(host)
            resp = client.get(next_url)
            resp.raise_for_status()
            data = resp.json()
        except Exception as exc:
            logger.warning("OParl list fetch failed %s: %s", next_url, exc)
            break

        items.extend(data.get("data", []))
        links = data.get("links", {})
        next_url = links.get("next") if links.get("next") != next_url else None
        if len(items) > 2000:
            logger.warning("OParl list truncated at 2000 items")
            break

    return items


_last_request: dict[str, float] = {}


def _rate_limit(host: str) -> None:
    last = _last_request.get(host, 0)
    elapsed = time.monotonic() - last
    if elapsed < RATE_LIMIT_SEC:
        time.sleep(RATE_LIMIT_SEC - elapsed)
    _last_request[host] = time.monotonic()
