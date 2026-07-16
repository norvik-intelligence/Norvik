import { z } from "zod";

// Zod schemas matching the DB enums – shared between API routes and frontend

export const ProjectPhaseSchema = z.enum([
  "idee",
  "beschluss",
  "planung",
  "vor_ausschreibung",
  "ausgeschrieben",
]);

export const VolumeBandSchema = z.enum(["s", "m", "l", "xl"]);
export const SignalStatusSchema = z.enum([
  "new",
  "auto_flagged",
  "approved",
  "rejected",
  "published",
]);
export const TradeSlugSchema = z.enum([
  "rueckbau",
  "schadstoff",
  "geruest",
  "abdichtung",
  "entsorgung",
  "gutachten",
]);
export const BuyerSlugSchema = z.enum([
  "sanierer",
  "gutachter",
  "entsorger",
  "geruestbauer",
  "entwickler",
]);
export const SubscriptionPlanSchema = z.enum([
  "free_trial",
  "signal_basic",
  "signal_pro",
]);

// Signal list filter params (for the company portal feed)
export const SignalFilterSchema = z.object({
  trade: TradeSlugSchema.optional(),
  phase: ProjectPhaseSchema.optional(),
  region_id: z.string().uuid().optional(),
  radius_km: z.coerce.number().min(5).max(300).optional(),
  min_score: z.coerce.number().min(0).max(100).optional(),
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(50).default(20),
});
export type SignalFilter = z.infer<typeof SignalFilterSchema>;

// Admin signal review action
export const SignalReviewSchema = z.object({
  signal_id: z.string().uuid(),
  action: z.enum(["approve", "reject"]),
  notes: z.string().max(1000).optional(),
  // Correctable fields
  title: z.string().max(200).optional(),
  summary: z.string().max(300).optional(),
  project_phase: ProjectPhaseSchema.optional(),
  volume_estimate_band: VolumeBandSchema.optional(),
  region_id: z.string().uuid().optional(),
});
export type SignalReview = z.infer<typeof SignalReviewSchema>;

// Company onboarding form
export const CompanyOnboardingSchema = z.object({
  name: z.string().min(2).max(200),
  legal_form: z.string().max(50).optional(),
  address: z.string().min(5).max(500),
  website: z.string().url().optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  radius_km: z.coerce.number().min(10).max(300).default(50),
  trade_slugs: z.array(TradeSlugSchema).min(1),
  buyer_category_slugs: z.array(BuyerSlugSchema).min(1),
  // Success agreement acceptance
  accepts_lead_terms: z.literal(true, {
    errorMap: () => ({ message: "Erfolgsvereinbarung muss akzeptiert werden." }),
  }),
});
export type CompanyOnboarding = z.infer<typeof CompanyOnboardingSchema>;

// Capacity declaration
export const CapacitySchema = z.object({
  from_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  to_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  team_size: z.coerce.number().min(1).max(500).optional(),
  note: z.string().max(500).optional(),
});
export type CapacityInput = z.infer<typeof CapacitySchema>;
