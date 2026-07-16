-- Enum types for the signal pipeline

create type source_type as enum ('oparl', 'ted', 'rss', 'scrape_html', 'scrape_pdf');
create type parse_status_t as enum ('pending', 'done', 'error', 'skipped');

create type project_phase as enum (
  'idee',
  'beschluss',
  'planung',
  'vor_ausschreibung',
  'ausgeschrieben'
);

create type volume_band as enum ('s', 'm', 'l', 'xl');

create type signal_status as enum (
  'new',
  'auto_flagged',
  'approved',
  'rejected',
  'published'
);

create type verification_status as enum (
  'unverified',
  'docs_pending',
  'verified',
  'suspended'
);

create type cert_type as enum (
  'trgs519',
  'freistellung_48b',
  'entsorgungsfachbetrieb',
  'sonstige'
);

create type subscription_plan as enum ('free_trial', 'signal_basic', 'signal_pro');
create type subscription_status as enum ('active', 'paused', 'cancelled', 'expired');

create type territory_partner_status as enum ('active', 'cancelled', 'ended');

create type demand_org_type as enum (
  'kommune',
  'wohnungswirtschaft',
  'gu',
  'privat_gewerblich'
);

create type mediation_status as enum (
  'proposed',
  'owner_interested',
  'matching',
  'contact_made',
  'closed_won',
  'closed_lost'
);

create type lead_status as enum (
  'offered',
  'accepted',
  'declined',
  'invoiced',
  'paid',
  'refunded'
);
