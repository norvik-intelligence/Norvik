"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText, Target } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Spezialist, kein Generalist",
    desc: "Ausschließlich fokussiert auf Wettbewerbs-Narrativ-, Markt- und M&A-Intelligence — kein breiter Beratungsvertrag.",
  },
  {
    icon: FileText,
    title: "Schriftliche, entscheidungsreife Ergebnisse",
    desc: "Jedes Mandat liefert ein strukturiertes Dokument, das für C-Suite-Entscheidungen, Vorstandssitzungen oder Deal-Prozesse konzipiert ist.",
  },
  {
    icon: Clock,
    title: "Schnell ohne Tiefenverlust",
    desc: "Standardlieferung in 5–7 Werktagen. Express-Mandate in 48–72 Stunden. Keine sechswöchigen Engagements für fokussierte Fragen.",
  },
  {
    icon: ShieldCheck,
    title: "Zwischen Boutiquen und SaaS positioniert",
    desc: "Präziser als eine Datenplattform. Schneller und günstiger als eine klassische DD-Boutique. Entwickelt für DACH-Märkte.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#030812]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">
              Über Norvik
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Ihre externe{" "}
              <br />
              Intelligence-Abteilung.
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Norvik Intelligence ist ein spezialisiertes Research-Studio für Wettbewerbs-Narrativ-Intelligence, strategische Marktanalyse und M&A Due-Diligence-Unterstützung. Wir helfen Entscheidungsträgern, schneller mit strukturierter, schriftlicher Analyse voranzukommen — präzise, relevant und handlungsorientiert.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Wir arbeiten mit Gründern, PE-Investoren, Family Offices und Deal-Teams im DACH-Raum, die scharfe Außenanalysen ohne den Overhead eines klassischen Beratungsengagements benötigen.
            </p>
          </motion.div>

          {/* Rechts: Pfeiler-Karten */}
          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-white/6 bg-white/3 p-5 hover:border-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                    <Icon size={15} className="text-blue-400" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
