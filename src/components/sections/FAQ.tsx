"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Für wen ist Norvik geeignet?",                              a: "Norvik arbeitet mit Gründern, Private-Equity-Investoren, Family Offices, M&A-Beratern, Deal-Teams und B2B-Entscheidern zusammen, die strukturierte, schriftliche Markt- und Wettbewerbsintelligenz benötigen. Unsere Kunden navigieren typischerweise eine Wachstumsentscheidung, eine Transaktion oder eine Positionierungsfrage, die einen klaren Außenblick erfordert." },
  { q: "Was erhalten Kunden?",                                      a: "Kunden erhalten schriftliche Intelligence-Ergebnisse in praxistauglichen Geschäftsformaten — Executive Briefings, Standard- oder Premium-Intelligence-Memos, Commercial/Market Due Diligence Support oder Deep Dive Mandate. Alle Deliverables sind auf Deutsch oder Englisch verfügbar, formatiert als PDF, Word oder PowerPoint." },
  { q: "Ersetzt Norvik einen vollständigen Due-Diligence-Anbieter?", a: "Nein. Norvik ergänzt Ihr Vorhaben um eine fokussierte externe Intelligence-Ebene zu Marktattraktivität, Wettbewerbsdynamik, Positionierung und Narrativrisiko. Wir sind kein Rechts-, Finanz- oder Wirtschaftsprüfungsunternehmen. Unser Commercial/Market DD Lite ergänzt — und ersetzt nicht — eine vollständige finanzielle und rechtliche Due Diligence." },
  { q: "Wie schnell kann ein Projekt starten und geliefert werden?", a: "Standard-Mandate werden typischerweise innerhalb von 5–7 Werktagen nach bestätigtem Scope geliefert. Express-Lieferung in 48–72 Stunden ist für Executive Briefings und Standard Memos gegen Aufpreis verfügbar. Zeitpläne werden bei der Scope-Definition bestätigt." },
  { q: "Welche Märkte und Branchen deckt Norvik ab?",               a: "Norvik hat besondere Tiefe in DACH-B2B-Märkten in den Bereichen Technologie, Industrie, Professional Services und Finanzdienstleistungen. Wir decken sowohl etablierte Kategorieführer als auch aufstrebende Herausforderer ab. Für Branchen außerhalb unserer Kernabdeckung teilen wir Ihnen dies klar in der Scope-Phase mit." },
  { q: "Wie sind Mandate kommerziell strukturiert?",                 a: "Alle Mandate basieren auf Festpreisen — 50 % zahlbar bei Auftragsbestätigung, 50 % bei Lieferung. Keine offene Stundenabrechnung. Retainer-Programme werden monatlich im Voraus abgerechnet." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
      className="border-b border-white/6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-[rgba(239,237,232,0.65)] group-hover:text-[#EFEDE8] transition-colors duration-200 leading-relaxed">
          {q}
        </span>
        <span className="mt-0.5 shrink-0 text-[rgba(239,237,232,0.3)] group-hover:text-[rgba(239,237,232,0.6)] transition-colors duration-200">
          {open ? <Minus size={15} /> : <Plus size={15} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[rgba(239,237,232,0.42)] pb-6 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-28 lg:py-36 bg-[#09090F] relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[clamp(100px,16vw,200px)] font-black text-white/[0.025] leading-none select-none pointer-events-none tracking-tighter">08</div>

      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <span className="section-label">FAQ</span>
          <div className="overflow-hidden mt-6">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
              className="text-4xl lg:text-5xl font-black text-[#EFEDE8] tracking-tight"
            >
              Häufige Fragen.
            </motion.h2>
          </div>
        </motion.div>
        <div>
          {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}
