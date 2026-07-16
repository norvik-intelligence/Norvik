"""
Parse stage: convert raw document content to structured text for LLM classification.

- PDFs (storage_path set): parse with Docling → structured Markdown
- HTML documents (base URL): convert with Crawl4AI → clean Markdown
- Documents already have raw_text from fetch: may need enrichment from attachments

This stage updates raw_documents.raw_text in place so classify can use it.
"""

from __future__ import annotations

import logging
import tempfile
from pathlib import Path

from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)


def run() -> dict[str, int]:
    """Parse raw_documents that have a storage_path but no/poor raw_text."""
    db = get_client()

    # Find docs with storage_path (PDFs) that need text extraction
    docs_resp = (
        db.table("raw_documents")
        .select("id, storage_path, url, raw_text")
        .eq("parse_status", "pending")
        .not_.is_("storage_path", "null")
        .limit(50)
        .execute()
    )
    docs = docs_resp.data or []

    stats = {"parsed_pdf": 0, "parsed_html": 0, "errors": 0}

    for doc in docs:
        if doc.get("storage_path"):
            success = _parse_pdf(doc, db)
            if success:
                stats["parsed_pdf"] += 1
            else:
                stats["errors"] += 1

    return stats


def _parse_pdf(doc: dict, db: object) -> bool:
    """Download PDF from Supabase Storage, parse with Docling, update raw_text."""
    try:
        from docling.document_converter import DocumentConverter

        storage_path = doc["storage_path"]
        client = db  # supabase client

        # Download file bytes
        file_bytes = client.storage.from_("documents").download(storage_path)

        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
            tmp.write(file_bytes)
            tmp_path = tmp.name

        converter = DocumentConverter()
        result = converter.convert(tmp_path)
        markdown_text = result.document.export_to_markdown()

        Path(tmp_path).unlink(missing_ok=True)

        if markdown_text.strip():
            client.table("raw_documents").update(
                {"raw_text": markdown_text[:50000]}  # cap at 50k chars
            ).eq("id", doc["id"]).execute()

        return True

    except ImportError:
        logger.warning("Docling not installed; PDF parsing skipped for %s", doc["id"])
        return False
    except Exception as exc:
        logger.error("PDF parse failed for %s: %s", doc["id"], exc)
        db.table("raw_documents").update({"parse_status": "error", "parse_error": str(exc)[:500]}).eq(
            "id", doc["id"]
        ).execute()
        return False


def parse_html_to_markdown(url: str) -> str:
    """Fetch a URL and convert to LLM-ready Markdown using Crawl4AI."""
    try:
        import asyncio
        from crawl4ai import AsyncWebCrawler

        async def _crawl() -> str:
            async with AsyncWebCrawler(
                verbose=False,
                user_agent="RückbauRadar/1.0 (+https://rueckbauradar.de)",
            ) as crawler:
                result = await crawler.arun(url=url)
                return result.markdown or ""

        return asyncio.run(_crawl())
    except ImportError:
        logger.warning("Crawl4AI not installed; HTML parsing unavailable")
        return ""
    except Exception as exc:
        logger.warning("Crawl4AI failed for %s: %s", url, exc)
        return ""
