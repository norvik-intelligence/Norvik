"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const findings = [
  {
    tag: "Kernbefund",
    color: "text-[#5865F2]",
    bg: "bg-[rgba(88,101,242,0.06)]",
    border: "border-[rgba(88,101,242,0.12)]",
    content:
      "Narrative Lücke identifiziert: 3 von 5 DACH-Wettbewerbern kommunizieren 'Compliance-First'. Kategorie-Begriff 'Workforce Intelligence' ist im Segment noch unbesetzt.",
  },
  {
    tag: "Wettbewerbssignal",
    color: "text-violet-400",
    bg: "bg-violet-500/[0.04]",
    border: "border-violet-500/10",
    content:
      "Platzhirsch-Messaging-Shift seit Q3: –38% Compliance-Referenzen, +62% Efficiency-Narrative. BambooHR DACH-Positionierung läuft mit 4 Monaten Verzögerung nach.",
  },
  {
    tag: "Strategische Empfehlung",
    color: "text-cyan-400",
    bg: "bg-cyan-500/[0.04]",
    border: "border-cyan-500/10",
    content:
      "Repositionierung auf 'Workforce Intelligence Infrastructure' vor Q4-Funding empfohlen — ohne Produktänderung, allein durch konsistentes Messaging.",
  },
];

const points = [
  "Strukturiert für C-Suite und Board-Präsentationen",
  "Fakten, Signale und Empfehlungen klar getrennt",
  "Quellenregister und Confidence-Level inklusive",
  "Deutsch oder Englisch — auf Wunsch beides",
];

export default function SampleOutput() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-[#09090F] relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-8 left-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">
        06
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-label">Beispiel Output</span>
            <div className="overflow-hidden mt-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease }}
                className="text-4xl sm:text-5xl font-black text-[#EFEDE8] leading-[1.06] tracking-tight"
              >
                Was Entscheider<br />von uns erhalten.
              </motion.h2>
            </div>
            <p className="mt-6 text-[rgba(239,237,232,0.45)] text-base leading-relaxed max-w-md">
              Kein Datendump. Kein generischer Marktbericht. Jedes Norvik-Mandat ist ein klares, schriftliches Dokument mit Kontext, Analyse und Handlungsempfehlungen.
            </p>

            <ul className="mt-8 space-y-3">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#5865F2] shrink-0" />
                  <span className="text-sm text-[rgba(239,237,232,0.55)] leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/6"
            >
              {[
                { n: "48h", l: "Express" },
                { n: "100%", l: "Schriftlich" },
                { n: "DACH", l: "Fokus" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-2xl font-black text-[#EFEDE8] tracking-tight">{n}</p>
                  <p className="text-[10px] text-[rgba(239,237,232,0.28)] tracking-wider uppercase mt-0.5">{l}</p>
                </div>
              ))}
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Mandat anfragen
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right column: mock document */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="mt-14 lg:mt-0"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-6 bg-[#5865F2]/6 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-2xl border border-white/8 bg-[#0A0B15] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/[0.015]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,95,87,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,189,46,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[rgba(40,200,64,0.5)]" />
                  <span className="ml-4 text-[10px] text-[rgba(239,237,232,0.18)] font-mono tracking-wide">
                    competitive-narrative-brief_HR-SaaS-DACH.pdf
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  {/* Document header */}
                  <div className="flex items-start justify-between mb-7 gap-4">
                    <div>
                      <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[rgba(239,237,232,0.28)]">
                        Norvik Intelligence
                      </span>
                      <h4 className="text-base sm:text-lg font-black text-[#EFEDE8] mt-1.5 leading-snug">
                        Competitive Narrative Brief
                      </h4>
                      <p className="text-sm text-[rgba(239,237,232,0.45)] mt-0.5">
                        B2B HR-Tech · DACH-Segment
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] px-2.5 py-1 rounded-full border border-[#5865F2]/30 bg-[rgba(88,101,242,0.08)] text-[#5865F2] font-bold whitespace-nowrap">
                      Premium Memo
                    </span>
                  </div>

                  {/* Findings */}
                  <div className="space-y-3">
                    {findings.map((block, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
                        className={`p-4 rounded-xl border ${block.bg} ${block.border}`}
                      >
                        <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 ${block.color}`}>
                          {block.tag}
                        </p>
                        <p className="text-xs text-[rgba(239,237,232,0.55)] leading-relaxed">
                          {block.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Modules included */}
                  <div className="mt-6 pt-5 border-t border-white/6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[rgba(239,237,232,0.22)] mb-3">
                      Enthaltene Module
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Executive Summary",
                        "Narrativanalyse",
                        "5 Wettbewerber",
                        "Signal-Map",
                        "Quellenregister",
                        "13 Seiten",
                        "5 Werktage",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-white/6 bg-white/[0.02] text-[9px] text-[rgba(239,237,232,0.3)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA strip */}
                  <a
                    href="#contact"
                    className="flex items-center justify-between mt-5 px-4 py-3 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/18 hover:bg-[#5865F2]/15 transition-colors duration-200 group"
                  >
                    <span className="text-xs font-semibold text-[#5865F2]">
                      Ähnliches Mandat anfragen
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-[#5865F2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    >
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
