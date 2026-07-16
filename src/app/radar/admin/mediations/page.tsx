import type { Metadata } from "next";
import { adminClient } from "@/lib/radar/supabase";
import { messages } from "@/lib/radar/messages";
import { MediationBoard, type BoardMediation } from "./MediationBoard";
import { NewMediationForm } from "./NewMediationForm";

export const metadata: Metadata = { title: messages.admin.mediationsTitle };
export const dynamic = "force-dynamic";

export default async function MediationsPage() {
  const db = adminClient();

  const [mediationsResp, signalsResp, demandResp] = await Promise.all([
    db
      .from("mediations")
      .select(
        `id, status, notes, created_at,
         signals(id, title, municipality),
         demand_contacts(id, name, org_type),
         leads(id, status, fee_cents, companies(name))`
      )
      .order("created_at", { ascending: false }),
    db
      .from("signals")
      .select("id, title, municipality")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(100),
    db.from("demand_contacts").select("id, name, org_type").order("name"),
  ]);

  const mediations: BoardMediation[] = (mediationsResp.data ?? []).map((med) => ({
    id: med.id,
    status: med.status,
    notes: med.notes,
    created_at: med.created_at,
    signal: (med.signals as unknown as { title: string; municipality: string | null } | null) ?? null,
    demandContact:
      (med.demand_contacts as unknown as { name: string; org_type: string } | null) ?? null,
    leads: ((med.leads ?? []) as unknown as Array<{
      id: string;
      status: string;
      fee_cents: number | null;
      companies: { name: string } | null;
    }>).map((l) => ({
      id: l.id,
      status: l.status,
      fee_cents: l.fee_cents,
      company_name: l.companies?.name ?? "?",
    })),
  }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "#1A3A2A" }}>
          {messages.admin.mediationsTitle}
        </h1>
      </div>

      <NewMediationForm
        signals={signalsResp.data ?? []}
        demandContacts={demandResp.data ?? []}
      />

      <MediationBoard mediations={mediations} />
    </div>
  );
}
