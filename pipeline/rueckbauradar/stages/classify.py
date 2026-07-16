"""
Classify stage: LLM-based relevance classification for raw documents.

Uses keyword pre-filter to avoid unnecessary LLM calls.
All outputs are schema-validated (pydantic). On validation failure: 1 retry,
then mark as parse_error — never crash the run.
"""

from __future__ import annotations

import json
import logging
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client
from rueckbauradar.keywords import passes_keyword_filter

logger = logging.getLogger(__name__)

# ── Output schema ────────────────────────────────────────────────────────────

ProjectPhase = Literal["idee", "beschluss", "planung", "vor_ausschreibung", "ausgeschrieben"]
VolumeBand = Literal["s", "m", "l", "xl"]
TradeSlug = Literal["rueckbau", "schadstoff", "geruest", "abdichtung", "entsorgung", "gutachten"]
BuyerSlug = Literal["sanierer", "gutachter", "entsorger", "geruestbauer", "entwickler"]


class ClassifyOutput(BaseModel):
    is_relevant: bool
    confidence: float = Field(ge=0.0, le=1.0)
    title: str = Field(max_length=200)
    summary_de: str = Field(max_length=300)
    address_candidates: list[str] = Field(default_factory=list)
    building_year_hint: int | None = Field(default=None, ge=1800, le=2100)
    project_phase: ProjectPhase | None = None
    trades: list[TradeSlug] = Field(default_factory=list)
    buyer_categories: list[BuyerSlug] = Field(default_factory=list)
    volume_band: VolumeBand | None = None
    hazmat_indicators: list[str] = Field(default_factory=list)

    @field_validator("summary_de")
    @classmethod
    def no_personal_names(cls, v: str) -> str:
        # Strip any "Herr/Frau <Name>" patterns as DSGVO measure
        import re
        v = re.sub(r"\b(Herr|Frau|Dr\.|Prof\.)\s+[A-ZÄÖÜ][a-zäöüß]+\b", "[Person]", v)
        return v


# ── LLM prompt ───────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """Du bist ein Spezialist für öffentliche Ausschreibungen und Baugenehmigungen in Deutschland.
Deine Aufgabe: Entscheide, ob ein Dokument ein konkretes bauliches Vorhaben mit Rückbau-, Sanierungs-
oder Schadstoffbezug beschreibt.

Antworte NUR mit einem JSON-Objekt, das exakt diesem Schema entspricht:
{
  "is_relevant": bool,
  "confidence": float (0.0-1.0),
  "title": string (max 200 Zeichen),
  "summary_de": string (max 300 Zeichen, KEINE Personennamen),
  "address_candidates": [string],
  "building_year_hint": int | null,
  "project_phase": "idee"|"beschluss"|"planung"|"vor_ausschreibung"|"ausgeschrieben"|null,
  "trades": [array of: "rueckbau"|"schadstoff"|"geruest"|"abdichtung"|"entsorgung"|"gutachten"],
  "buyer_categories": [array of: "sanierer"|"gutachter"|"entsorger"|"geruestbauer"|"entwickler"],
  "volume_band": "s"|"m"|"l"|"xl"|null,
  "hazmat_indicators": [string]
}

is_relevant=true NUR bei konkretem baulichen Vorhaben mit Rückbau-/Sanierungs-/Schadstoffbezug.
NICHT relevant: Haushaltspläne, politische Grundsatzdebatten, allgemeine Anfragen, Bericht ohne Projektbezug.
volume_band: s=<100k€, m=100-500k€, l=500k-2M€, xl=>2M€ (schätzen wenn nicht explizit genannt).
Personenbezogene Daten (Namen von Privatpersonen) im summary NICHT übernehmen."""


def run() -> dict[str, int]:
    """Classify all raw_documents with parse_status='pending' that pass the keyword filter."""
    settings = get_settings()
    db = get_client()

    docs_resp = (
        db.table("raw_documents")
        .select("id, raw_text, source_id")
        .eq("parse_status", "pending")
        .limit(200)  # batch per run to control LLM costs
        .execute()
    )
    docs = docs_resp.data or []

    stats = {"total": len(docs), "filtered": 0, "classified": 0, "errors": 0, "tokens": 0}

    for doc in docs:
        raw_text = doc.get("raw_text") or ""

        if settings.KEYWORD_FILTER_ENABLED and not passes_keyword_filter(raw_text):
            db.table("raw_documents").update({"parse_status": "skipped"}).eq(
                "id", doc["id"]
            ).execute()
            stats["filtered"] += 1
            continue

        result, tokens = _classify_with_retry(raw_text)
        stats["tokens"] += tokens

        if result is None:
            db.table("raw_documents").update({"parse_status": "error"}).eq(
                "id", doc["id"]
            ).execute()
            stats["errors"] += 1
            continue

        db.table("raw_documents").update({"parse_status": "done"}).eq(
            "id", doc["id"]
        ).execute()

        if result.is_relevant and result.confidence >= settings.CLASSIFY_CONFIDENCE_THRESHOLD:
            _create_signal(doc["id"], result, tokens)

        stats["classified"] += 1

    return stats


def _classify_with_retry(text: str, max_retries: int = 1) -> tuple[ClassifyOutput | None, int]:
    tokens = 0
    for attempt in range(max_retries + 1):
        try:
            raw, used = _call_llm(text)
            tokens += used
            parsed = ClassifyOutput.model_validate_json(raw)
            return parsed, tokens
        except Exception as exc:
            logger.warning("Classify attempt %d failed: %s", attempt + 1, exc)
    return None, tokens


def _call_llm(text: str) -> tuple[str, int]:
    settings = get_settings()
    truncated = text[:8000]  # keep context manageable

    if settings.LLM_PROVIDER == "anthropic":
        import anthropic
        client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        msg = client.messages.create(
            model=settings.LLM_MODEL,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": truncated}],
        )
        content = msg.content[0].text if msg.content else ""
        tokens = (msg.usage.input_tokens or 0) + (msg.usage.output_tokens or 0)
        return content, tokens

    if settings.LLM_PROVIDER == "openai":
        from openai import OpenAI
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        resp = client.chat.completions.create(
            model=settings.LLM_MODEL,
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": truncated},
            ],
            max_tokens=1024,
        )
        content = resp.choices[0].message.content or ""
        tokens = resp.usage.total_tokens if resp.usage else 0
        return content, tokens

    raise ValueError(f"Unknown LLM provider: {settings.LLM_PROVIDER}")


def _create_signal(raw_doc_id: str, result: ClassifyOutput, tokens: int) -> None:
    db = get_client()
    settings = get_settings()

    # Insert base signal
    signal_resp = (
        db.table("signals")
        .insert(
            {
                "raw_document_id": raw_doc_id,
                "title": result.title,
                "summary": result.summary_de,
                "address_text": result.address_candidates[0] if result.address_candidates else None,
                "building_year_hint": result.building_year_hint,
                "project_phase": result.project_phase,
                "volume_estimate_band": result.volume_band,
                "hazmat_indicators": result.hazmat_indicators,
                "hazmat_probability": _heuristic_hazmat_prob(result),
                "source_url": _get_source_url(raw_doc_id),
                "llm_model": settings.LLM_MODEL,
                "llm_tokens_used": tokens,
                "status": "new",
            }
        )
        .execute()
    )
    signal_id = signal_resp.data[0]["id"] if signal_resp.data else None
    if not signal_id:
        return

    # Link trades
    if result.trades:
        trade_rows = db.table("trades").select("id, slug").in_("slug", result.trades).execute()
        if trade_rows.data:
            db.table("signal_trades").insert(
                [{"signal_id": signal_id, "trade_id": t["id"]} for t in trade_rows.data]
            ).execute()

    # Link buyer categories
    if result.buyer_categories:
        cat_rows = (
            db.table("buyer_categories")
            .select("id, slug")
            .in_("slug", result.buyer_categories)
            .execute()
        )
        if cat_rows.data:
            db.table("signal_buyers").insert(
                [{"signal_id": signal_id, "buyer_category_id": c["id"]} for c in cat_rows.data]
            ).execute()


def _heuristic_hazmat_prob(result: ClassifyOutput) -> float:
    """Boost hazmat probability heuristically based on known indicators."""
    base = 0.1
    if result.hazmat_indicators:
        base += 0.15 * min(len(result.hazmat_indicators), 4)
    if result.building_year_hint and result.building_year_hint < 1994:
        base += 0.25
    high_risk = {"asbest", "pcb", "kmf", "kmi"}
    for ind in result.hazmat_indicators:
        if any(h in ind.lower() for h in high_risk):
            base += 0.15
            break
    return min(1.0, base)


def _get_source_url(raw_doc_id: str) -> str:
    db = get_client()
    resp = db.table("raw_documents").select("url").eq("id", raw_doc_id).single().execute()
    return resp.data.get("url", "") if resp.data else ""
