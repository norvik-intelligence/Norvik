"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const navLinks = [
  { label: "Leistungen", href: "#services" },
  { label: "Prozess",    href: "#process"  },
  { label: "Preise",     href: "#pricing"  },
  { label: "Kontakt",    href: "#contact"  },
];

function FadeIn({ children, delay, duration = 1000 }: { children: ReactNode; delay: number; duration?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className="transition-opacity" style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}

function AnimatedHeading({ lines, className }: { lines: string[]; className?: string }) {
  const [started, setStarted] = useState(false);
  const CHAR_DELAY = 30;
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);
  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.split("").map((char, charIndex) => {
            const delay = lineIndex * line.length * CHAR_DELAY + charIndex * CHAR_DELAY;
            return (
              <span
                key={charIndex}
                className="inline-block transition-all duration-500"
                style={{
                  opacity: started ? 1 : 0,
                  transform: started ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 liquid-glass flex flex-col pt-20 pb-8 px-7 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          aria-label="Menü schließen"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base text-white/70 hover:text-white py-3 border-b border-white/8 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="bg-white text-black py-3 rounded-xl text-sm font-semibold text-center hover:bg-gray-100 transition-colors"
        >
          Mandat anfragen
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-4 sm:px-6 md:px-12 lg:px-16">
        {/* Navbar */}
        <div className="pt-5 sm:pt-6">
          <nav className="liquid-glass rounded-xl px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
            <a href="#" className="flex items-center shrink-0">
              <Image src="/logo.png" alt="Norvik Intelligence" width={110} height={36} priority className="w-[90px] sm:w-[110px] h-auto" />
            </a>
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex bg-white text-black px-5 lg:px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Mandat anfragen
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg border border-white/15 hover:border-white/30 transition-colors shrink-0"
              aria-label="Menü öffnen"
            >
              <span className="w-4 h-px bg-white/80 block" />
              <span className="w-4 h-px bg-white/80 block" />
              <span className="w-2.5 h-px bg-white/80 block self-start ml-[4px]" />
            </button>
          </nav>
        </div>

        {/* Hero content */}
        <div className="flex-1 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            <div>
              <AnimatedHeading
                lines={["Strategische Intelligence,", "die entscheidet."]}
                className="text-[2.35rem] sm:text-5xl lg:text-6xl xl:text-7xl font-normal mb-3 sm:mb-4 text-white"
              />
              <FadeIn delay={800} duration={1000}>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-5 max-w-lg leading-relaxed">
                  Fokussierte Markt-, Wettbewerbs- und Narrativ-Intelligence für
                  Gründer, Investoren und Deal-Teams im DACH-Raum.
                </p>
              </FadeIn>
              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="#contact"
                    className="bg-white text-black px-7 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 text-center text-sm sm:text-base"
                  >
                    Mandat anfragen
                  </a>
                  <a
                    href="#services"
                    className="liquid-glass border border-white/20 text-white px-7 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200 text-center text-sm sm:text-base"
                  >
                    Leistungen erkunden
                  </a>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={1400} duration={1000}>
              <div className="hidden sm:flex items-end justify-start lg:justify-end mt-6 lg:mt-0">
                <div className="liquid-glass border border-white/20 px-5 py-3 rounded-xl">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white">
                    Analyse. Strategie. Klarheit.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
