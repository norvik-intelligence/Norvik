import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum – Norvik Intelligence",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#060E1D] text-slate-300">
      <header className="border-b border-white/6 py-4 px-6">
        <Link href="/" className="inline-flex items-center">
          <Image src="/norvik-logo-white.png" alt="Norvik Intelligence" width={100} height={34} className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold text-white mb-2">Impressum</h1>
        <p className="text-sm text-slate-600 mb-12">Angaben gemäß § 5 DDG</p>

        <div className="space-y-10 text-sm leading-relaxed">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Unternehmensangaben</h2>
            <div className="space-y-1 text-slate-400">
              <p className="font-semibold text-white">Norvik Intelligence</p>
              <p>[Vor- und Nachname / Unternehmensname]</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Vertreten durch</h2>
            <p className="text-slate-400">[Name der verantwortlichen Person]</p>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Anschrift</h2>
            <div className="space-y-1 text-slate-400">
              <p>[Straße und Hausnummer]</p>
              <p>[PLZ Ort]</p>
              <p>[Land]</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Kontakt</h2>
            <div className="space-y-1 text-slate-400">
              <p>Telefon: [Telefonnummer]</p>
              <p>E-Mail: [E-Mail-Adresse]</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Steuerliche Angaben</h2>
            <div className="space-y-1 text-slate-400">
              <p>Umsatzsteuer-ID: [USt-IdNr., falls vorhanden]</p>
              <p>Wirtschafts-Identifikationsnummer: [W-IdNr., falls vorhanden]</p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">Verantwortlich für den Inhalt</h2>
            <div className="space-y-1 text-slate-400">
              <p>gemäß § 18 Abs. 2 MStV:</p>
              <p>[Name], [Anschrift]</p>
            </div>
          </section>

          <section className="border-t border-white/6 pt-8">
            <p className="text-slate-600 text-xs leading-relaxed">
              Dieses Impressum gilt auch für verbundene Onlinepräsenzen und Social-Media-Profile
              von Norvik Intelligence, soweit zutreffend.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
