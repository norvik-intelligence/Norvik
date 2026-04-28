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
    <footer className="relative border-t border-white/6 py-16 px-6 bg-[#07080F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="Norvik Intelligence"
                width={110}
                height={36}
              />
            </a>
            <p className="text-sm text-[rgba(239,237,232,0.32)] mt-3 leading-relaxed max-w-[200px]">
              Spezialisierte Intelligence für Gründer, Investoren und Deal-Teams.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[rgba(239,237,232,0.25)] mb-4">
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-[rgba(239,237,232,0.38)] hover:text-[#EFEDE8] transition-colors duration-200"
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
          <p className="text-xs text-[rgba(239,237,232,0.22)]">
            &copy; {year} Norvik Intelligence. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-[rgba(239,237,232,0.16)]">
            DACH-fokussiertes Intelligence Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
