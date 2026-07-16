// Database types for RückbauRadar – mirror the Supabase schema

export type SourceType = "oparl" | "ted" | "rss" | "scrape_html" | "scrape_pdf";
export type ParseStatus = "pending" | "done" | "error" | "skipped";
export type ProjectPhase =
  | "idee"
  | "beschluss"
  | "planung"
  | "vor_ausschreibung"
  | "ausgeschrieben";
export type VolumeBand = "s" | "m" | "l" | "xl";
export type SignalStatus = "new" | "auto_flagged" | "approved" | "rejected" | "published";
export type VerificationStatus =
  | "unverified"
  | "docs_pending"
  | "verified"
  | "suspended";
export type CertType =
  | "trgs519"
  | "freistellung_48b"
  | "entsorgungsfachbetrieb"
  | "sonstige";
export type SubscriptionPlan = "free_trial" | "signal_basic" | "signal_pro";
export type SubscriptionStatus = "active" | "paused" | "cancelled" | "expired";
export type TerritoryPartnerStatus = "active" | "cancelled" | "ended";
export type DemandOrgType =
  | "kommune"
  | "wohnungswirtschaft"
  | "gu"
  | "privat_gewerblich";
export type MediationStatus =
  | "proposed"
  | "owner_interested"
  | "matching"
  | "contact_made"
  | "closed_won"
  | "closed_lost";
export type LeadStatus =
  | "offered"
  | "accepted"
  | "declined"
  | "invoiced"
  | "paid"
  | "refunded";
export type TradeSlug =
  | "rueckbau"
  | "schadstoff"
  | "geruest"
  | "abdichtung"
  | "entsorgung"
  | "gutachten";
export type BuyerSlug =
  | "sanierer"
  | "gutachter"
  | "entsorger"
  | "geruestbauer"
  | "entwickler";

// ── Core database rows ──────────────────────────────────────────────────────

export interface Region {
  id: string;
  name: string;
  slug: string;
  bundesland: string;
  is_brokerage_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  slug: TradeSlug;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BuyerCategory {
  id: string;
  slug: BuyerSlug;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Source {
  id: string;
  type: SourceType;
  name: string;
  base_url: string;
  adapter_key: string;
  region_id: string | null;
  schedule: string;
  is_active: boolean;
  last_run_at: string | null;
  last_status: string | null;
  config: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface RawDocument {
  id: string;
  source_id: string;
  external_id: string | null;
  url: string;
  fetched_at: string;
  content_hash: string;
  storage_path: string | null;
  parse_status: ParseStatus;
  created_at: string;
  updated_at: string;
}

export interface Signal {
  id: string;
  raw_document_id: string;
  title: string;
  summary: string | null;
  address_text: string | null;
  postcode: string | null;
  lat: number | null;
  lng: number | null;
  region_id: string | null;
  municipality: string | null;
  building_year_hint: number | null;
  hazmat_probability: number | null;
  hazmat_indicators: string[] | null;
  project_phase: ProjectPhase | null;
  volume_estimate_band: VolumeBand | null;
  score: number | null;
  status: SignalStatus;
  source_url: string;
  published_at: string | null;
  llm_model: string | null;
  llm_tokens_used: number | null;
  duplicate_of: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignalWithRelations extends Signal {
  trades?: Trade[];
  buyer_categories?: BuyerCategory[];
  region?: Region | null;
}

export interface Company {
  id: string;
  auth_user_id: string | null;
  name: string;
  legal_form: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  radius_km: number;
  website: string | null;
  phone: string | null;
  verification_status: VerificationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  company_id: string;
  buyer_category_id: string | null;
  region_id: string | null;
  radius_km: number | null;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  started_at: string;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  mediation_id: string;
  company_id: string;
  fee_cents: number | null;
  fee_band: string | null;
  status: LeadStatus;
  qualified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Mediation {
  id: string;
  signal_id: string;
  demand_contact_id: string;
  status: MediationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Capacity {
  id: string;
  company_id: string;
  from_date: string;
  to_date: string;
  team_size: number | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}
