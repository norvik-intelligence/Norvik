import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";
import { FeedView, type FeedSignal } from "./FeedView";

export const metadata: Metadata = { title: messages.portal.feedTitle };
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ trade?: string; phase?: string }>;

export default async function PortalFeedPage({ searchParams }: { searchParams: SearchParams }) {
  const auth = await getAuthContext();
  if (!auth?.companyId) redirect("/radar/registrieren");

  const { trade, phase } = await searchParams;
  const db = adminClient();

  // Active subscriptions → buyer categories + plan level
  const subsResp = await db
    .from("subscriptions")
    .select("buyer_category_id, plan, status, ends_at")
    .eq("company_id", auth.companyId)
    .eq("status", "active");

  const activeSubs = (subsResp.data ?? []).filter(
    (s) => !s.ends_at || new Date(s.ends_at) > new Date()
  );
  const catIds = activeSubs.map((s) => s.buyer_category_id).filter(Boolean) as string[];
  const hasPro = activeSubs.some((s) => s.plan === "signal_pro");

  let signals: FeedSignal[] = [];

  if (catIds.length > 0) {
    // Signals matching the company's buyer categories
    const sigBuyersResp = await db
      .from("signal_buyers")
      .select("signal_id")
      .in("buyer_category_id", catIds);
    const signalIds = [...new Set((sigBuyersResp.data ?? []).map((r) => r.signal_id))];

    if (signalIds.length > 0) {
      let query = db
        .from("signals")
        .select(
          `id, title, summary, address_text, postcode, municipality, lat, lng,
           project_phase, volume_estimate_band, hazmat_indicators, score,
           source_url, published_at,
           signal_trades(trades(slug, name))`
        )
        .eq("status", "published")
        .in("id", signalIds)
        .order("published_at", { ascending: false })
        .limit(100);

      if (phase) query = query.eq("project_phase", phase);

      const sigsResp = await query;
      let rows = sigsResp.data ?? [];

      if (trade) {
        rows = rows.filter((s) =>
          (s.signal_trades ?? []).some(
            (st) => (st.trades as unknown as { slug: string } | null)?.slug === trade
          )
        );
      }

      // Accepted leads unlock full address for those signals
      const acceptedLeadsResp = await db
        .from("leads")
        .select("mediation_id, mediations(signal_id)")
        .eq("company_id", auth.companyId)
        .in("status", ["accepted", "invoiced", "paid"]);
      const unlockedSignalIds = new Set(
        (acceptedLeadsResp.data ?? [])
          .map((l) => (l.mediations as unknown as { signal_id: string } | null)?.signal_id)
          .filter(Boolean)
      );

      signals = rows.map((s) => {
        const unlocked = hasPro || unlockedSignalIds.has(s.id);
        return {
          id: s.id,
          title: s.title,
          summary: s.summary,
          // Address gating: full address only for signal_pro or after lead acceptance
          address_text: unlocked ? s.address_text : null,
          addressLocked: !unlocked && Boolean(s.address_text),
          postcode: s.postcode ? `${s.postcode.slice(0, 3)}xx` : null,
          municipality: s.municipality,
          lat: s.lat,
          lng: s.lng,
          project_phase: s.project_phase,
          volume_estimate_band: s.volume_estimate_band,
          hazmat_indicators: s.hazmat_indicators,
          score: s.score,
          source_url: s.source_url,
          published_at: s.published_at,
          trades: (s.signal_trades ?? [])
            .map((st) => st.trades as unknown as { slug: string; name: string } | null)
            .filter((t): t is { slug: string; name: string } => Boolean(t)),
        };
      });
    }
  }

  return (
    <FeedView
      signals={signals}
      activeTrade={trade ?? null}
      activePhase={phase ?? null}
    />
  );
}
