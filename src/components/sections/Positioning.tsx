"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const cols = [
  {
    label: "SaaS-Datenplattform",
    sub: "Bloomberg, Dealroom, Statista & Co.",
    icon: "◈",
    items: [
      "Breite Datenmenge, wenig Kontext",
      "Generische Insights ohne Synthese",
      "Selbstbedienung erforderlich",
      "Kein schriftlicher Memo-Output",
      "Kein DACH-spezifischer Fokus",
    ],
    verdict: "Zu generisch",
    highlight: false,
    dim: true,
  },
  {
    label: "Norvik Intelligence",
    sub: "Spezialisiertes DACH-Research-Studio",
    icon: "◆",
    badge: "Norvik",
    items: [
      "DACH-fokussiert, marktspezifisch",
      "Entscheidungsreife Memos & Reports",
      "48h Express · 5–7 Tage Standard",
      "Narrativ · Markt · M&A · Custom",
      "Boutique-Präzision, kein Overhead",
    ],
    verdict: "Präzise. Schnell.",
    highlight: true,
    dim: false,
  },
  {
    label: "Big-4 / DD-Boutique",
    sub: "McKinsey, EY, Deloitte & Co.",
    icon: "◇",
    items: [
      "Maximale Tiefe & Revisionssicherheit",
      "Formal, full-scope, komplex",
      "Wochen bis Monate Vorlauf",
      "Hohes Budget erforderlich",
      "Für Post-LOI-Phase konzipiert",
    ],
    verdict: "Zu langsam & teuer",
    highlight: false,
    dim: true,
  },
];

export default function Positioning() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-[#06070C] relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
        03
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] bg-[#5865F2]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 lg:mb-20"
        >
          <span className="section-label">Positionierung</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] leading-[1.06] tracking-tight max-w-2xl"
            >
              Schärfer als SaaS.<br />Schneller als Big 4.
            </motion.h2>
          </div>
          <p className="mt-5 text-[rgba(239,237,232,0.42)] max-w-xl text-base leading-relaxed">
            Norvik schließt die Lücke zwischen generischen Datenplattformen und vollständigen Due-Diligence-Mandaten — fokussiert, schriftlich, entscheidungsreif.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {cols.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease }}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                col.highlight
                  ? "border-[#5865F2]/35 bg-gradient-to-b from-[rgba(88,101,242,0.07)] to-[rgba(12,13,26,0.9)] border-glow"
                  : "border-white/6 bg-white/[0.015]"
              }`}
            >
              {col.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest bg-[#5865F2] text-white px-3.5 py-1 rounded-full">
                  Norvik Positionierung
                </div>
              )}

              {/* Icon + header */}
              <div className="mb-6">
                <span className={`text-xl block mb-3 ${col.dim ? "opacity-25" : "text-[#5865F2]"}`}>
                  {col.icon}
                </span>
                <h3 className={`text-base font-bold leading-snug mb-1 ${col.dim ? "text-[rgba(239,237,232,0.38)]" : "text-[#EFEDE8]"}`}>
                  {col.label}
                </h3>
                <p className={`text-[11px] leading-relaxed ${col.dim ? "text-[rgba(239,237,232,0.18)]" : "text-[rgba(239,237,232,0.35)]"}`}>
                  {col.sub}
                </p>
              </div>

              {/* Feature list */}
              <ul className="flex-1 space-y-2.5 mb-7">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                      col.dim ? "text-[rgba(239,237,232,0.22)]" : "text-[rgba(239,237,232,0.62)]"
                    }`}
                  >
                    <span
                      className={`mt-[7px] w-1 h-1 rounded-full shrink-0 ${
                        col.highlight ? "bg-[#5865F2]" : "bg-white/15"
                      }`}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Verdict pill */}
              <div
                className={`text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-2 rounded-full text-center ${
                  col.highlight
                    ? "bg-[#5865F2]/15 text-[#5865F2]"
                    : "bg-white/[0.03] text-[rgba(239,237,232,0.2)]"
                }`}
              >
                {col.verdict}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
