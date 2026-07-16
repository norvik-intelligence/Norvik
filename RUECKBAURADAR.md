# RückbauRadar

**Deutschlands Frühwarnsystem für Rückbau- & Sanierungsprojekte.**
Erkennt Abbruch-, Rückbau- und Schadstoffsanierungsprojekte aus öffentlichen Quellen,
BEVOR sie ausgeschrieben sind – und vermittelt qualifizierte Betriebe an diese Aufträge.

## Architektur

| Ebene | Technologie | Ort |
|---|---|---|
| Frontend + API | Next.js 16 (App Router), Deployment auf Vercel | `src/app/radar/` |
| Datenbank/Auth/Storage | Supabase (Postgres, RLS, pgvector, Storage) | `supabase/` |
| Pipeline | Python 3.11, läuft in GitHub Actions (Cron 05:30 UTC) | `pipeline/` |
| Geteilte Typen | TypeScript-Interfaces + Zod-Schemas | `packages/shared/` |

Kein eigener Server. Kein Docker-Hosting. Alles Free-Tier-tauglich.

## Flächen

- **`/radar`** – Öffentliche Landingpage (dunkelgrün/anthrazit, Zielgruppe Bauunternehmer)
- **`/radar/login` + `/radar/registrieren`** – Auth + Betriebe-Onboarding
  (Firmendaten → Gewerke → Radius → Erfolgsvereinbarung mit audit_log-Zeitstempel)
- **`/radar/portal`** – Betriebe-Portal: Signal-Feed (Liste + MapLibre-Karte, Filter
  Gewerk/Phase), Kapazitäten melden, Lead-Inbox (annehmen = Kontaktdaten sichtbar +
  Fee fällig), Firmenprofil mit Zertifikats-Upload
- **`/radar/admin`** – Admin-Dashboard (nur `role=admin`): Review-Queue,
  Quellen-Monitor, Betriebe-Verifizierung, Vermittlungs-Board (Kanban),
  Lead-Verwaltung mit CSV-Export

## Pipeline-Stages

```
fetch → parse → classify → score → geocode → embed → dedupe → publish
```

- **fetch:** Adapter je Quelle (`oparl`, `ted`, `rss`, `allris`), Dedupe via content_hash,
  Fehler einer Quelle stoppen nie den Lauf
- **parse:** PDFs mit Docling, HTML mit Crawl4AI (beide optional installierbar)
- **classify:** LLM (Anthropic/OpenAI per ENV) mit striktem Pydantic-Schema,
  Keyword-Vorfilter VOR jedem LLM-Call, 1 Retry, DSGVO-Namensfilter im Summary
- **score:** Regelbasiert 0–100 (Phase-Frühe + Volumen + Schadstoff-Wkt. + Quellgüte)
- **geocode:** photon-API, gecacht in `geocode_cache`, Fallback Gemeinde-Zentroid
- **dedupe:** pgvector-Cosine + Geo-Nähe (<300 m) + Zeitfenster (90 Tage)
- **publish:** approved → published + täglicher E-Mail-Digest (max. 1 Mail/Tag/Abo)

**Wichtig:** KEIN Auto-Publish. Jedes Signal durchläuft das manuelle Admin-Review.

## Setup (einmalig)

### 1. Supabase

1. Projekt auf [supabase.com](https://supabase.com) anlegen (Region: Frankfurt/EU)
2. Lokal: `supabase link --project-ref <ref>` dann `supabase db push`
   (oder alle Dateien aus `supabase/migrations/` im SQL-Editor ausführen)
3. Seed einspielen: `supabase/seed.sql` im SQL-Editor ausführen
4. **Admin-Rolle setzen** (nach eigener Registrierung über die App):
   ```sql
   update auth.users
   set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
   where email = 'deine@email.de';
   ```
5. Lokale Tests: `supabase db start && supabase db reset && supabase test db`

### 2. Vercel (Web-App)

Environment-Variablen setzen (Project → Settings → Environment Variables):

| Variable | Wert |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon-Key aus Supabase |
| `SUPABASE_URL` | wie oben |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-Role-Key (NIE im Client!) |

### 3. GitHub Actions (Pipeline)

Repository-Secrets setzen (Settings → Secrets and variables → Actions):

| Secret | Zweck |
|---|---|
| `SUPABASE_URL` | Pipeline-DB-Zugriff |
| `SUPABASE_SERVICE_ROLE_KEY` | Pipeline-DB-Zugriff (bypasst RLS) |
| `ANTHROPIC_API_KEY` | LLM-Classify (Standard-Provider) |
| `OPENAI_API_KEY` | Embeddings für Dedupe (+ optionaler LLM-Fallback) |
| `RESEND_API_KEY` | E-Mail-Digest |

Optionale Variables: `LLM_PROVIDER`, `LLM_MODEL`, `EMAIL_FROM`.

Pipeline manuell starten: Actions → „Signal Pipeline" → Run workflow.

### 4. Quellen verwalten

Quellen sind **Daten, kein Code**: Admin → Quellen zeigt Status/letzten Lauf.
Neue Quelle = neue Zeile in `sources` (type + adapter_key + base_url + config).
Bei URL-Drift einer Kommune: `base_url`/`config` in der DB korrigieren – kein Deploy nötig.

Aktuell geseedet: OParl (Bonn, Düsseldorf/ITK Rheinland, Köln, Münster, München),
TED (bundesweit, CPV 45111xxx/45262660/90523000), service.bund.de-RSS,
ALLRIS-Beispiel (Leipzig, `is_active=false` bis URL verifiziert).

## Rechtliches / DSGVO

- Jedes Signal trägt Quellen-URL + Abrufzeitpunkt; Quelle wird im Feed verlinkt
- Personennamen werden im Summary automatisch entfernt (`classify.py` Validator)
- Lösch-Routine: `cleanup_old_raw_documents()` löscht Rohdokumente > 24 Monate
  (monatlich via Actions-Job `gdpr-cleanup`)
- **AV-Verträge:** Supabase (EU-Region wählen) und Vercel bieten DPAs –
  in den jeweiligen Dashboards abschließen und in der Datenschutzerklärung nennen
- Scraping-Ethik: robots.txt respektiert, max. 1 Request/Sek/Host,
  User-Agent `RückbauRadar/1.0 (+https://rueckbauradar.de)`, nur öffentliche Daten

## Bewusst NICHT gebaut (v1)

Kein Auto-Publish. Kein automatisches Matching ohne Admin-Freigabe. Kein Chat.
Keine native App. **Keine Payment-Integration** (Stripe erst ab >20 zahlende Kunden;
Datenstruktur `leads.fee_cents` + Status `invoiced/paid` existiert bereits).
Abrechnung: manuell (CSV-Export → Rechnung → Überweisung).

## Offene Punkte vor Launch

1. **Impressum** vervollständigen (`/radar/impressum` – § 5 TMG-Angaben eintragen)
2. **Datenschutzerklärung + AGB** anwaltlich erstellen lassen (Platzhalter vorhanden)
3. OParl-/RSS-Quell-URLs einmal im Browser verifizieren (Quellen-Monitor zeigt Fehler)
4. TED-API-Key auf developer.ted.europa.eu beantragen und in `sources.config`
   der TED-Quelle als `api_key` eintragen (ohne Key drosselt die API stärker)
5. Eigene Domain auf Vercel verbinden (`rueckbauradar.de`)
6. Karten-Tiles: aktuell OSM-Raster (fair use) – bei Wachstum auf MapTiler
   Free-Tier oder Self-Hosting wechseln

## Offene Risiken

- OParl-Endpunkte einzelner Kommunen ändern sich gelegentlich → Quellen-Monitor beobachten
- photon-API ist fair use → bei hohem Volumen self-hosten (Geocode-Cache mildert)
- LLM-Kosten skalieren mit Quellenzahl → Keyword-Vorfilter + Token-Logging beobachten
- E-Mail-Zustellbarkeit (Resend Free Tier): eigene Domain + SPF/DKIM konfigurieren
