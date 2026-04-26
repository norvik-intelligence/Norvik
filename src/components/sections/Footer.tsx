import Image from "next/image";

const links = {
  Services: [
    { label: "Competitive Narrative", href: "#services" },
    { label: "Strategic Market Insight", href: "#services" },
    { label: "M&A Due Diligence Support", href: "#services" },
    { label: "Custom Mandates", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Impressum",      href: "/impressum" },
    { label: "Datenschutz",    href: "/datenschutz" },
    { label: "AGB",            href: "/agb" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#030812] border-t border-white/4 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center mb-4">
              <Image
                src="/norvik-logo-white.png"
                alt="Norvik Intelligence"
                width={110}
                height={36}
                className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[200px]">
              Specialist intelligence for founders, investors and deal teams.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-4">
                {category}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-600 hover:text-slate-300 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            © {year} Norvik Intelligence. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            DACH-focused Intelligence Studio
          </p>
        </div>
      </div>
    </footer>
  );
}
