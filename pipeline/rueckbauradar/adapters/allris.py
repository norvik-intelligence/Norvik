"""
ALLRIS adapter: council information systems (Ratsinformationssysteme) running
CC e-gov ALLRIS WITHOUT an OParl interface. Scrapes the public "Sitzungsvorlagen"
(agenda papers) overview HTML pages.

Only public pages, no login, robots.txt respected upstream by page selection.
Rate limit 1 req/s per host; identifying User-Agent.

source.config:
  {
    "list_url": "https://allris.example.de/bi/vo021.asp",  # paper list page
    "max_pages": 5
  }
"""

from __future__ import annotations

import logging
import re
import time
import urllib.robotparser
from urllib.parse import urljoin, urlparse

import httpx

logger = logging.getLogger(__name__)

BLOCKED: list[str] = ["127.", "localhost", "10.", "192.168.", "0.", "::1", "169.254."]
USER_AGENT = "RückbauRadar/1.0 (+https://rueckbauradar.de)"
RATE_LIMIT_SEC = 1.0

_last_request: dict[str, float] = {}
_robots_cache: dict[str, urllib.robotparser.RobotFileParser] = {}


def _is_blocked(url: str) -> bool:
    host = urlparse(url).hostname or ""
    return any(host.startswith(b) for b in BLOCKED)


def _rate_limit(host: str) -> None:
    last = _last_request.get(host, 0)
    elapsed = time.monotonic() - last
    if elapsed < RATE_LIMIT_SEC:
        time.sleep(RATE_LIMIT_SEC - elapsed)
    _last_request[host] = time.monotonic()


def _robots_allowed(url: str) -> bool:
    parsed = urlparse(url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    if base not in _robots_cache:
        rp = urllib.robotparser.RobotFileParser()
        try:
            rp.set_url(f"{base}/robots.txt")
            rp.read()
        except Exception:
            rp = None  # type: ignore[assignment]
        _robots_cache[base] = rp
    rp = _robots_cache[base]
    if rp is None:
        return True  # no robots.txt reachable → public default
    return rp.can_fetch(USER_AGENT, url)


def fetch(source: dict) -> list[dict]:
    config = source.get("config") or {}
    list_url = config.get("list_url") or source["base_url"]
    max_pages = int(config.get("max_pages", 3))

    if _is_blocked(list_url):
        raise ValueError(f"SSRF blocked: {list_url}")
    if not _robots_allowed(list_url):
        logger.warning("robots.txt disallows %s – skipping source", list_url)
        return []

    host = urlparse(list_url).netloc
    documents: list[dict] = []
    seen_urls: set[str] = set()

    with httpx.Client(
        timeout=30, headers={"User-Agent": USER_AGENT}, follow_redirects=True
    ) as client:
        page_url: str | None = list_url
        for _ in range(max_pages):
            if not page_url:
                break
            _rate_limit(host)
            try:
                resp = client.get(page_url)
                resp.raise_for_status()
                html = resp.text
            except Exception as exc:
                logger.error("ALLRIS list fetch failed %s: %s", page_url, exc)
                break

            # Vorlagen detail links: ALLRIS uses vo020.asp?VOLFDNR=… (classic)
            # or /vo020/<id> (ALLRIS net 4)
            detail_paths = set(
                re.findall(r'href="([^"]*vo02\d[^"]*)"', html, flags=re.IGNORECASE)
            )
            for rel in detail_paths:
                detail_url = urljoin(page_url, rel.replace("&amp;", "&"))
                if detail_url in seen_urls or _is_blocked(detail_url):
                    continue
                if not _robots_allowed(detail_url):
                    continue
                seen_urls.add(detail_url)

                _rate_limit(host)
                try:
                    detail_resp = client.get(detail_url)
                    detail_resp.raise_for_status()
                    doc = _detail_to_doc(detail_url, detail_resp.text)
                    if doc:
                        documents.append(doc)
                except Exception as exc:
                    logger.warning("ALLRIS detail failed %s: %s", detail_url, exc)

                if len(documents) >= 100:
                    break

            # Next page link (classic ALLRIS pagination)
            next_match = re.search(
                r'href="([^"]*)"[^>]*>\s*(?:&gt;|›|nächste)', html, flags=re.IGNORECASE
            )
            page_url = urljoin(page_url, next_match.group(1)) if next_match else None
            if len(documents) >= 100:
                break

    logger.info("ALLRIS %s: fetched %d papers", list_url, len(documents))
    return documents


def _detail_to_doc(url: str, html: str) -> dict | None:
    text = _html_to_text(html)
    if len(text.strip()) < 50:
        return None

    title_match = re.search(r"<title>([^<]+)</title>", html, flags=re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else ""

    raw_text = f"{title}\n{text[:20000]}"
    return {
        "url": url,
        "external_id": url,
        "raw_text": raw_text,
        "storage_path": None,
    }


def _html_to_text(html: str) -> str:
    """Minimal HTML→text without extra dependencies."""
    # Strip scripts/styles
    html = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", html, flags=re.DOTALL | re.IGNORECASE)
    # Block-level tags → newlines
    html = re.sub(r"</?(p|div|br|tr|li|h[1-6]|table)[^>]*>", "\n", html, flags=re.IGNORECASE)
    # All remaining tags
    html = re.sub(r"<[^>]+>", " ", html)
    # Entities (most common)
    for entity, char in [
        ("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
        ("&quot;", '"'), ("&#39;", "'"), ("&auml;", "ä"), ("&ouml;", "ö"),
        ("&uuml;", "ü"), ("&Auml;", "Ä"), ("&Ouml;", "Ö"), ("&Uuml;", "Ü"),
        ("&szlig;", "ß"),
    ]:
        html = html.replace(entity, char)
    # Collapse whitespace
    html = re.sub(r"[ \t]+", " ", html)
    html = re.sub(r"\n\s*\n+", "\n", html)
    return html.strip()
