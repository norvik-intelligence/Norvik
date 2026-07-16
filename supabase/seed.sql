-- Seed data for RückbauRadar
-- Regions: Rhein-Ruhr focus (brokerage active), others inactive

insert into regions (name, slug, bundesland, is_brokerage_active) values
  ('Rhein-Ruhr', 'rhein-ruhr', 'Nordrhein-Westfalen', true),
  ('Köln/Bonn', 'koeln-bonn', 'Nordrhein-Westfalen', false),
  ('Düsseldorf', 'duesseldorf', 'Nordrhein-Westfalen', false),
  ('Münsterland', 'muensterland', 'Nordrhein-Westfalen', false),
  ('Rhein-Main', 'rhein-main', 'Hessen', false),
  ('Hamburg', 'hamburg', 'Hamburg', false),
  ('München', 'muenchen', 'Bayern', false),
  ('Berlin', 'berlin', 'Berlin', false),
  ('Bundesweit', 'bundesweit', 'Deutschland', false);

-- Trades: the six core trade categories
insert into trades (slug, name) values
  ('rueckbau',    'Rückbau / Abbruch'),
  ('schadstoff',  'Schadstoffsanierung'),
  ('geruest',     'Gerüstbau'),
  ('abdichtung',  'Abdichtung / Bauwerksschutz'),
  ('entsorgung',  'Entsorgung / Transporte'),
  ('gutachten',   'Gutachten / Sachverständige');

-- Buyer categories: who buys what
insert into buyer_categories (slug, name) values
  ('sanierer',      'Sanierer / Generalunternehmer'),
  ('gutachter',     'Gutachter / Sachverständige'),
  ('entsorger',     'Entsorgungsfachbetriebe'),
  ('geruestbauer',  'Gerüstbauer'),
  ('entwickler',    'Projektentwickler / Wohnungswirtschaft');

-- Seed sources: OParl APIs for Bonn and Düsseldorf (M1 adapters)
insert into sources (type, name, base_url, adapter_key, schedule, is_active, config) values
  (
    'oparl',
    'Stadtrat Bonn (OParl)',
    'https://oparl.bonn.de/oparl/v1.0/',
    'oparl',
    '30 5 * * *',
    true,
    '{"system_url": "https://oparl.bonn.de/oparl/v1.0/"}'
  ),
  (
    'oparl',
    'Stadtrat Düsseldorf (OParl / ITK Rheinland)',
    'https://oparl.duesseldorf.de/oparl/v1.0/',
    'oparl',
    '35 5 * * *',
    true,
    '{"system_url": "https://oparl.duesseldorf.de/oparl/v1.0/"}'
  ),
  (
    'ted',
    'TED EU-Vergabeplattform (DE, Abbruch/Asbest)',
    'https://api.ted.europa.eu/v3',
    'ted',
    '45 5 * * *',
    true,
    '{"cpv_codes": ["45111000", "45111100", "45111200", "45111213", "45262660"], "country": "DE"}'
  );

-- Territory slots for Rhein-Ruhr (brokerage active)
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
    when 'rueckbau'   then 190000  -- 1.900 €/month
    when 'schadstoff' then 170000  -- 1.700 €/month
    when 'entsorgung' then 120000  -- 1.200 €/month
  end
from rr, trades_list;
