import Image from "next/image";

const links = {
  Leistungen: [
    { label: "Competitive Narrative", href: "#services" },
    { label: "Strategische Marktanalyse", href: "#services" },
    { label: "M&A Due Diligence Support", href: "#services" },
    { label: "Custom Mandate", href: "#services" },
  ],
  Unternehmen: [
    { label: "Über uns", href: "#about" },
    { label: "Prozess", href: "#process" },
    { label: "Preise", href: "#pricing" },
    { label: "Kontakt", href: "#contact" },
  ],
  Rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "AGB", href: "/agb" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/6 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Marke */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="text-white font-bold text-lg tracking-tight">
              Norvik Intelligence
            </a>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Spezialisierte Intelligence für Gründer, Investoren und Deal-Teams.
            </p>
          </div>
          {/* Link-Spalten */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/6 pt-8">
          <p className="text-xs text-slate-600">
            &copy; {year} Norvik Intelligence. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-slate-700">
            DACH-fokussiertes Intelligence Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
