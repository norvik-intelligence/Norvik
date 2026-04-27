"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Für wen ist Norvik geeignet?",
    a: "Norvik arbeitet mit Gründern, Private-Equity-Investoren, Family Offices, M&A-Beratern, Deal-Teams und B2B-Entscheidern zusammen, die strukturierte, schriftliche Markt- und Wettbewerbsintelligenz benötigen. Unsere Kunden navigieren typischerweise eine Wachstumsentscheidung, eine Transaktion oder eine Positionierungsfrage, die einen klaren Außenblick erfordert.",
  },
  {
    q: "Was erhalten Kunden?",
    a: "Kunden erhalten schriftliche Intelligence-Ergebnisse in praxistauglichen Geschäftsformaten — Executive Briefings, Standard- oder Premium-Intelligence-Memos, Commercial/Market Due Diligence Support oder Deep Dive Mandate. Alle Deliverables sind auf Deutsch oder Englisch verfügbar, formatiert als PDF, Word oder PowerPoint.",
  },
  {
    q: "Ersetzt Norvik einen vollständigen Due-Diligence-Anbieter?",
    a: "Nein. Norvik ergänzt Ihr Vorhaben um eine fokussierte externe Intelligence-Ebene zu Marktattraktivität, Wettbewerbsdynamik, Positionierung und Narrativrisiko. Wir sind kein Rechts-, Finanz- oder Wirtschaftsprüfungsunternehmen. Unser Commercial/Market DD Lite ergänzt — und ersetzt nicht — eine vollständige finanzielle und rechtliche Due Diligence.",
  },
  {
    q: "Wie schnell kann ein Projekt starten und geliefert werden?",
    a: "Standard-Mandate werden typischerweise innerhalb von 5–7 Werktagen nach bestätigtem Scope geliefert. Express-Lieferung in 48–72 Stunden ist für Executive Briefings und Standard Memos gegen Aufpreis verfügbar. Zeitpläne werden bei der Scope-Definition bestätigt.",
  },
  {
    q: "Welche Märkte und Branchen deckt Norvik ab?",
    a: "Norvik hat besondere Tiefe in DACH-B2B-Märkten in den Bereichen Technologie, Industrie, Professional Services und Finanzdienstleistungen. Wir decken sowohl etablierte Kategorieführer als auch aufstrebende Herausforderer ab. Für Branchen außerhalb unserer Kernabdeckung teilen wir Ihnen dies klar in der Scope-Phase mit.",
  },
  {
    q: "Wie sind Mandate kommerziell strukturiert?",
    a: "Alle Mandate basieren auf Festpreisen — 50 % zahlbar bei Auftragsbestätigung, 50 % bei Lieferung. Keine offene Stundenabrechnung. Retainer-Programme werden monatlich im Voraus abgerechnet.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b border-white/6"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
          {q}
        </span>
        <span className="mt-0.5 shrink-0 text-slate-500">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-400 pb-6 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-blue-400 uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Häufige Fragen.
          </h2>
        </motion.div>
        <div>
          {faqs.map((f, i) => (
            <FAQItem key={i} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
