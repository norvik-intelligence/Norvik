import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum — Norvik Intelligence",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-[#060D1A] text-slate-300 px-6 py-24">
      <div className="max-w-2xl mx-auto">

        {/* Zurück-Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-12 uppercase tracking-widest"
        >
          ← Zurück zur Startseite
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">Impressum</h1>
        <p className="text-sm text-slate-500 mb-12">Angaben gemäß § 5 TMG</p>

        {/* Anbieter */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Anbieter</h2>
          <div className="space-y-1 text-sm">
            <p className="text-white font-medium">Norvik Intelligence</p>
            <p>Mohamed Jamai</p>
            <p>Lippestr. 9L</p>
            <p>47443 Moers</p>
            <p>Deutschland</p>
          </div>
        </section>

        {/* Kontakt */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Kontakt</h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-slate-500">Telefon:&nbsp;</span>
              <a href="tel:+4917674990984" className="hover:text-white transition-colors">
                +49 176 74990984
              </a>
            </p>
            <p>
              <span className="text-slate-500">E-Mail:&nbsp;</span>
              <a href="mailto:mohamed.jamai.norvik@gmail.com" className="hover:text-white transition-colors">
                mohamed.jamai.norvik@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Steuerliche Angaben */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Steuerliche Angaben</h2>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-slate-500">Steuernummer:&nbsp;</span>
              Wird nach Zuteilung durch das zuständige Finanzamt ergänzt.
            </p>
            <p>
              <span className="text-slate-500">Wirtschafts-Identifikationsnummer (§ 139c AO):&nbsp;</span>
              Noch nicht zugeteilt.
            </p>
          </div>
        </section>

        {/* Verantwortlich */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV</h2>
          <div className="space-y-1 text-sm">
            <p>Mohamed Jamai</p>
            <p>Lippestr. 9L</p>
            <p>47443 Moers</p>
          </div>
        </section>

        {/* Hinweis Kleinunternehmer */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Hinweis zur Umsatzsteuer</h2>
          <p className="text-sm leading-relaxed">
            Gemäß § 19 UStG wird keine Umsatzsteuer berechnet
            (Kleinunternehmerregelung). Es wird daher keine Umsatzsteuer-Identifikationsnummer
            ausgewiesen.
          </p>
        </section>

        {/* Haftungsausschluss */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Haftung für Inhalte</h2>
          <p className="text-sm leading-relaxed">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
        </section>

        {/* Urheberrecht */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Urheberrecht</h2>
          <p className="text-sm leading-relaxed">
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
            unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
            und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <p className="text-xs text-slate-600 pt-8 border-t border-white/6">
          Stand: April 2026
        </p>

      </div>
    </main>
  );
}
