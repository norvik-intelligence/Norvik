"""
RSS/Atom adapter for German procurement portals (e.g. service.bund.de).

Fetches only publicly accessible feed/overview pages. Respects the
scraping-ethics rules: 1 req/s per host, contact User-Agent, public data only.

source.config:
  { "feed_url": "...optional override of base_url..." }
"""

from __future__ import annotations

import logging
import time
import xml.etree.ElementTree as ET
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

BLOCKED: list[str] = ["127.", "localhost", "10.", "192.168.", "0.", "::1", "169.254."]
USER_AGENT = "RückbauRadar/1.0 (+https://rueckbauradar.de)"
RATE_LIMIT_SEC = 1.0

_last_request: dict[str, float] = {}

# Atom + RSS namespaces
NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "content": "http://purl.org/rss/1.0/modules/content/",
    "dc": "http://purl.org/dc/elements/1.1/",
}


def _is_blocked(url: str) -> bool:
    host = urlparse(url).hostname or ""
    return any(host.startswith(b) for b in BLOCKED)


def _rate_limit(host: str) -> None:
    last = _last_request.get(host, 0)
    elapsed = time.monotonic() - last
    if elapsed < RATE_LIMIT_SEC:
        time.sleep(RATE_LIMIT_SEC - elapsed)
    _last_request[host] = time.monotonic()


def fetch(source: dict) -> list[dict]:
    config = source.get("config") or {}
    feed_url = config.get("feed_url") or source["base_url"]

    if _is_blocked(feed_url):
        raise ValueError(f"SSRF blocked: {feed_url}")

    host = urlparse(feed_url).netloc
    _rate_limit(host)

    with httpx.Client(
        timeout=30, headers={"User-Agent": USER_AGENT}, follow_redirects=True
    ) as client:
        resp = client.get(feed_url)
        resp.raise_for_status()
        xml_text = resp.text

    documents: list[dict] = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        logger.error("RSS parse failed for %s: %s", feed_url, exc)
        return []

    # RSS 2.0: <rss><channel><item>; Atom: <feed><entry>
    items = root.findall(".//item") or root.findall(".//atom:entry", NS)

    for item in items:
        doc = _item_to_doc(item)
        if doc:
            documents.append(doc)

    logger.info("RSS %s: fetched %d items", feed_url, len(documents))
    return documents


def _item_to_doc(item: ET.Element) -> dict | None:
    def text(tag: str) -> str:
        el = item.find(tag) or item.find(f"atom:{tag}", NS)
        return (el.text or "").strip() if el is not None else ""

    title = text("title")
    link = text("link")
    if not link:
        # Atom uses <link href="...">
        link_el = item.find("atom:link", NS)
        if link_el is not None:
            link = link_el.get("href", "")
    description = text("description") or text("summary")
    content_el = item.find("content:encoded", NS)
    content = (content_el.text or "").strip() if content_el is not None else ""
    pub_date = text("pubDate") or text("updated") or text("dc:date")
    guid = text("guid") or link

    if not title and not description:
        return None

    raw_text = "\n".join(filter(None, [
        f"Titel: {title}",
        f"Veröffentlicht: {pub_date}" if pub_date else "",
        description,
        content[:5000],
    ]))

    return {
        "url": link or guid,
        "external_id": guid or None,
        "raw_text": raw_text,
        "storage_path": None,
    }
