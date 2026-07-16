"""
Publish stage: for signals with status='approved', set published_at and
send a daily digest email to matching subscribers (max 1 email/day/subscription).
"""

from __future__ import annotations

import logging
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from rueckbauradar.config import get_settings
from rueckbauradar.db import get_client

logger = logging.getLogger(__name__)


def run() -> dict[str, int]:
    db = get_client()

    # 1. Publish all approved signals
    approved_resp = (
        db.table("signals")
        .select("id")
        .eq("status", "approved")
        .is_("published_at", "null")
        .execute()
    )
    approved = approved_resp.data or []
    published = 0

    for sig in approved:
        db.table("signals").update(
            {"status": "published", "published_at": datetime.now(timezone.utc).isoformat()}
        ).eq("id", sig["id"]).execute()
        published += 1

    # 2. Send daily digest to active subscriptions
    digests_sent = _send_digests()

    return {"published": published, "digests_sent": digests_sent}


def _send_digests() -> int:
    """Send at most 1 digest email per subscription with signals published today."""
    db = get_client()
    settings = get_settings()

    # Get signals published in the last 25 hours (covers timezone edge cases)
    new_sigs_resp = (
        db.table("signals")
        .select("id, title, summary, project_phase, volume_estimate_band, score, source_url, municipality, postcode")
        .eq("status", "published")
        .gte("published_at", "now() - interval '25 hours'")
        .order("score", desc=True)
        .execute()
    )
    new_signals = new_sigs_resp.data or []
    if not new_signals:
        return 0

    # Get active subscriptions with contact info
    subs_resp = (
        db.table("subscriptions")
        .select("id, company_id, buyer_category_id, region_id, radius_km, plan")
        .eq("status", "active")
        .execute()
    )
    subscriptions = subs_resp.data or []
    sent = 0

    for sub in subscriptions:
        matching = _match_signals(sub, new_signals, db)
        if not matching:
            continue
        contact_email = _get_contact_email(sub["company_id"], db)
        if not contact_email:
            continue
        try:
            _send_digest_email(contact_email, matching, settings)
            sent += 1
        except Exception as exc:
            logger.error("Failed to send digest to %s: %s", contact_email, exc)

    return sent


def _match_signals(sub: dict, signals: list[dict], db: object) -> list[dict]:
    """Filter signals to those matching the subscription's buyer category."""
    cat_id = sub.get("buyer_category_id")
    if not cat_id:
        return signals[:10]  # no filter = all signals, capped

    sig_ids = [s["id"] for s in signals]
    buyers_resp = (
        db.table("signal_buyers")
        .select("signal_id")
        .in_("signal_id", sig_ids)
        .eq("buyer_category_id", cat_id)
        .execute()
    )
    matched_ids = {r["signal_id"] for r in (buyers_resp.data or [])}
    return [s for s in signals if s["id"] in matched_ids][:10]


def _get_contact_email(company_id: str, db: object) -> str | None:
    resp = (
        db.table("contacts")
        .select("email")
        .eq("company_id", company_id)
        .eq("is_primary", True)
        .limit(1)
        .execute()
    )
    if resp.data:
        return resp.data[0].get("email")
    # Fall back to any contact email
    resp2 = (
        db.table("contacts")
        .select("email")
        .eq("company_id", company_id)
        .limit(1)
        .execute()
    )
    return resp2.data[0].get("email") if resp2.data else None


def _send_digest_email(to_email: str, signals: list[dict], settings: object) -> None:
    subject = f"RückbauRadar: {len(signals)} neue Signal{'e' if len(signals) != 1 else ''}"

    html_lines = [
        "<h2 style='color:#1a3a2a'>Ihre neuen Projekt-Signale</h2>",
        "<p>Guten Morgen! Hier sind Ihre neuen Frühsignale für heute:</p>",
        "<hr>",
    ]
    for sig in signals:
        phase_label = {
            "idee": "Idee / Planung",
            "beschluss": "Beschluss",
            "planung": "Planung",
            "vor_ausschreibung": "Vor Ausschreibung",
            "ausgeschrieben": "Ausgeschrieben",
        }.get(sig.get("project_phase", ""), "Unbekannt")

        html_lines.append(f"""
        <div style='margin:16px 0;padding:12px;border-left:3px solid #1a3a2a'>
          <strong>{sig['title']}</strong><br>
          <small>{sig.get('municipality','')}{' · ' + sig.get('postcode','') if sig.get('postcode') else ''}</small><br>
          <em>{sig.get('summary','')}</em><br>
          <span style='font-size:12px'>Phase: {phase_label} · Score: {sig.get('score','-')}</span><br>
          <a href='{sig.get("source_url","#")}'>Quelldokument →</a>
        </div>""")

    html_lines.append(
        "<p><small>RückbauRadar · <a href='https://rueckbauradar.de/abmelden'>Abmelden</a></small></p>"
    )
    html = "".join(html_lines)

    if settings.EMAIL_PROVIDER == "resend":
        import httpx
        httpx.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
            json={
                "from": settings.EMAIL_FROM,
                "to": [to_email],
                "subject": subject,
                "html": html,
            },
        ).raise_for_status()
    else:
        import smtplib
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = settings.EMAIL_FROM
        msg["To"] = to_email
        msg.attach(MIMEText(html, "html"))
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASS)
            server.sendmail(settings.EMAIL_FROM, to_email, msg.as_string())
