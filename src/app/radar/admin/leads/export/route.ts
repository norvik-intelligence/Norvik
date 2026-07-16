import { NextResponse } from "next/server";
import { adminClient } from "@/lib/radar/supabase";
import { getAuthContext } from "@/lib/radar/supabase-server";

export const dynamic = "force-dynamic";

function csvEscape(value: unknown): string {
  const str = value == null ? "" : String(value);
  if (/[";\n]/.test(str)) return `"${str.replaceAll('"', '""')}"`;
  return str;
}

export async function GET() {
  const auth = await getAuthContext();
  if (!auth?.isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const db = adminClient();
  const resp = await db
    .from("leads")
    .select(
      `id, fee_cents, fee_band, status, qualified_at, created_at,
       companies(name, address),
       mediations(signals(title, municipality))`
    )
    .order("created_at", { ascending: false });

  const rows = (resp.data ?? []).map((l) => {
    const company = l.companies as unknown as { name: string; address: string | null } | null;
    const signal = (l.mediations as unknown as {
      signals: { title: string; municipality: string | null } | null;
    } | null)?.signals;

    return [
      l.id,
      signal?.title ?? "",
      signal?.municipality ?? "",
      company?.name ?? "",
      company?.address ?? "",
      l.fee_cents != null ? (l.fee_cents / 100).toFixed(2) : "",
      l.fee_band ?? "",
      l.status,
      l.qualified_at ?? "",
      l.created_at,
    ];
  });

  const header = [
    "lead_id",
    "signal",
    "ort",
    "betrieb",
    "betrieb_adresse",
    "gebuehr_eur",
    "band",
    "status",
    "qualifiziert_am",
    "erstellt_am",
  ];

  // Semicolon separator + BOM for German Excel
  const csv =
    "﻿" +
    [header, ...rows].map((row) => row.map(csvEscape).join(";")).join("\r\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="rueckbauradar-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
