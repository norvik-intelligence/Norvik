export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1D1D1F] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0066CC] flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="font-semibold tracking-tight text-white">
              Norvik
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {["Services", "Process", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-[#86868B] hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Legal */}
          <p className="text-sm text-[#86868B]">
            © {year} Norvik Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
