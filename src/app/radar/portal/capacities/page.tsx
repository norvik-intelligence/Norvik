import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";
import { CapacityForm } from "./CapacityForm";
import { DeleteCapacityButton } from "./DeleteCapacityButton";

export const metadata: Metadata = { title: messages.portal.capacitiesTitle };
export const dynamic = "force-dynamic";

const m = messages.portal;

export default async function CapacitiesPage() {
  const auth = await getAuthContext();
  if (!auth?.companyId) redirect("/radar/registrieren");

  const db = adminClient();
  const resp = await db
    .from("capacities")
    .select("id, from_date, to_date, team_size, note")
    .eq("company_id", auth.companyId)
    .order("from_date", { ascending: true });
  const capacities = resp.data ?? [];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "#1A3A2A" }}>
        {m.capacitiesTitle}
      </h1>
      <p className="text-sm text-gray-500 mb-8">{m.capacitiesHint}</p>

      <CapacityForm />

      <div className="mt-8 space-y-3">
        {capacities.length === 0 && (
          <p className="text-sm text-gray-400">{m.capacityEmpty}</p>
        )}
        {capacities.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(c.from_date).toLocaleDateString("de-DE")} –{" "}
                {new Date(c.to_date).toLocaleDateString("de-DE")}
                {c.team_size && (
                  <span className="font-normal text-gray-500"> · {c.team_size} Personen</span>
                )}
              </p>
              {c.note && <p className="text-xs text-gray-500 mt-0.5">{c.note}</p>}
            </div>
            <DeleteCapacityButton capacityId={c.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
