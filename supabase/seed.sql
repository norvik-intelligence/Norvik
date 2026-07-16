-- Seed data for RückbauRadar – deutschlandweite Abdeckung.
-- Signal-Abo: bundesweit (alle Bundesländer als Regionen).
-- Vermittlung: startet Rhein-Ruhr (is_brokerage_active = true).

-- ── Regionen: 16 Bundesländer + Metropolregion Rhein-Ruhr ────────────────────
insert into regions (name, slug, bundesland, is_brokerage_active) values
  ('Rhein-Ruhr',             'rhein-ruhr',          'Nordrhein-Westfalen',    true),
  ('Nordrhein-Westfalen',    'nordrhein-westfalen', 'Nordrhein-Westfalen',    false),
  ('Bayern',                 'bayern',              'Bayern',                 false),
  ('Baden-Württemberg',      'baden-wuerttemberg',  'Baden-Württemberg',      false),
  ('Niedersachsen',          'niedersachsen',       'Niedersachsen',          false),
  ('Hessen',                 'hessen',              'Hessen',                 false),
  ('Rheinland-Pfalz',        'rheinland-pfalz',     'Rheinland-Pfalz',        false),
  ('Sachsen',                'sachsen',             'Sachsen',                false),
  ('Berlin',                 'berlin',              'Berlin',                 false),
  ('Schleswig-Holstein',     'schleswig-holstein',  'Schleswig-Holstein',     false),
  ('Brandenburg',            'brandenburg',         'Brandenburg',            false),
  ('Sachsen-Anhalt',         'sachsen-anhalt',      'Sachsen-Anhalt',         false),
  ('Thüringen',              'thueringen',          'Thüringen',              false),
  ('Hamburg',                'hamburg',             'Hamburg',                false),
  ('Mecklenburg-Vorpommern', 'mecklenburg-vorpommern', 'Mecklenburg-Vorpommern', false),
  ('Saarland',               'saarland',            'Saarland',               false),
  ('Bremen',                 'bremen',              'Bremen',                 false);

-- ── Gewerke ──────────────────────────────────────────────────────────────────
insert into trades (slug, name) values
  ('rueckbau',    'Rückbau / Abbruch'),
  ('schadstoff',  'Schadstoffsanierung'),
  ('geruest',     'Gerüstbau'),
  ('abdichtung',  'Abdichtung / Bauwerksschutz'),
  ('entsorgung',  'Entsorgung / Transporte'),
  ('gutachten',   'Gutachten / Sachverständige');

-- ── Käufer-Kategorien ────────────────────────────────────────────────────────
insert into buyer_categories (slug, name) values
  ('sanierer',      'Sanierer / Generalunternehmer'),
  ('gutachter',     'Gutachter / Sachverständige'),
  ('entsorger',     'Entsorgungsfachbetriebe'),
  ('geruestbauer',  'Gerüstbauer'),
  ('entwickler',    'Projektentwickler / Wohnungswirtschaft');

-- ── Quellen ──────────────────────────────────────────────────────────────────
-- Hinweis: base_url/config sind Daten, keine Code-Konstanten – bei URL-Drift
-- einfach in der DB (Admin → Quellen) korrigieren. Fehler einer Quelle stoppen
-- nie den Lauf (per-source try/except).

-- 1. OParl (Ratsinformationssysteme, deutschlandweit wachsend)
insert into sources (type, name, base_url, adapter_key, schedule, is_active, config) values
  (
    'oparl',
    'Stadt Bonn (OParl)',
    'https://www.bonn.sitzung-online.de/public/oparl/system',
    'oparl',
    '30 5 * * *',
    true,
    '{"system_url": "https://www.bonn.sitzung-online.de/public/oparl/system"}'
  ),
  (
    'oparl',
    'Stadt Düsseldorf / ITK Rheinland (OParl)',
    'https://ris-oparl.itk-rheinland.de/Oparl/system',
    'oparl',
    '35 5 * * *',
    true,
    '{"system_url": "https://ris-oparl.itk-rheinland.de/Oparl/system"}'
  ),
  (
    'oparl',
    'Stadt Köln (OParl)',
    'https://ratsinformation.stadt-koeln.de/webservice/oparl/v1.0/system',
    'oparl',
    '40 5 * * *',
    true,
    '{"system_url": "https://ratsinformation.stadt-koeln.de/webservice/oparl/v1.0/system"}'
  ),
  (
    'oparl',
    'Stadt Münster (OParl)',
    'https://www.stadt-muenster.de/sessionnet/sessionnetbi/oparl/system',
    'oparl',
    '45 5 * * *',
    true,
    '{"system_url": "https://www.stadt-muenster.de/sessionnet/sessionnetbi/oparl/system"}'
  ),
  (
    'oparl',
    'Landeshauptstadt München (OParl)',
    'https://risi.muenchen.de/oparl/system',
    'oparl',
    '50 5 * * *',
    true,
    '{"system_url": "https://risi.muenchen.de/oparl/system"}'
  );

-- 2. TED (EU-Vergabeplattform, Land=DE → bundesweit)
insert into sources (type, name, base_url, adapter_key, schedule, is_active, config) values
  (
    'ted',
    'TED EU-Vergabeplattform (DE, Abbruch/Asbest/Sanierung)',
    'https://api.ted.europa.eu/v3',
    'ted',
    '55 5 * * *',
    true,
    '{"cpv_codes": ["45111000", "45111100", "45111200", "45111213", "45262660", "45262690", "90523000"], "country": "DE"}'
  );

-- 3. Vergabeportal-RSS (service.bund.de – bundesweite Ausschreibungen)
insert into sources (type, name, base_url, adapter_key, schedule, is_active, config) values
  (
    'rss',
    'service.bund.de Ausschreibungen (RSS)',
    'https://www.service.bund.de/Content/Globals/Functions/RSSFeed/RSSGenerator_Ausschreibungen.xml',
    'rss',
    '0 6 * * *',
    true,
    '{}'
  );

-- 4. ALLRIS-HTML (Beispiel Leipzig; nach URL-Verifikation aktivieren)
insert into sources (type, name, base_url, adapter_key, schedule, is_active, config) values
  (
    'scrape_html',
    'Stadt Leipzig Ratsinfo (ALLRIS)',
    'https://ratsinformation.leipzig.de/allris_leipzig_public/vo040',
    'allris',
    '10 6 * * *',
    false,
    '{"max_pages": 3, "note": "URL vor Aktivierung im Browser verifizieren"}'
  );

-- ── Gebietspartner-Slots: Rhein-Ruhr (Vermittlungs-Startregion) ──────────────
with rr as (select id from regions where slug = 'rhein-ruhr'),
     trades_list as (
       select id, slug from trades
       where slug in ('rueckbau', 'schadstoff', 'entsorgung')
     )
insert into territory_slots (region_id, trade_id, max_slots, price_monthly)
select
  rr.id,
  trades_list.id,
  case trades_list.slug
    when 'rueckbau'   then 4
    when 'schadstoff' then 3
    when 'entsorgung' then 3
  end,
  case trades_list.slug
    when 'rueckbau'   then 190000  -- 1.900 €/Monat
    when 'schadstoff' then 170000  -- 1.700 €/Monat
    when 'entsorgung' then 120000  -- 1.200 €/Monat
  end
from rr, trades_list;
