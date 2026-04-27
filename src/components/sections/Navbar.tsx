"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Leistungen",  href: "#services" },
  { label: "Prozess",     href: "#process" },
  { label: "Preise",      href: "#pricing" },
  { label: "Über uns",    href: "#about" },
  { label: "Kontakt",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#060E1D]/85 backdrop-blur-2xl border-b border-white/6 shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Image
              src="/norvik-logo-white.png"
              alt="Norvik Intelligence"
              width={180}
              height={50}
              className="object-contain"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild size="sm" className="text-sm">
              <a
                href="mailto:mohamed.jamai.norvik@gmail.com?subject=Book%20a%20Strategic%20Call%20%E2%80%94%20Norvik%20Intelligence"
              >
                Gespräch buchen
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü öffnen"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-[#060E1D]/95 backdrop-blur-2xl border-b border-white/6 px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/6 rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild size="sm" className="mt-3 w-full">
                <a
                  href="mailto:mohamed.jamai.norvik@gmail.com?subject=Book%20a%20Strategic%20Call%20%E2%80%94%20Norvik%20Intelligence"
                  onClick={() => setMobileOpen(false)}
                >
                  Gespräch buchen
                </a>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
