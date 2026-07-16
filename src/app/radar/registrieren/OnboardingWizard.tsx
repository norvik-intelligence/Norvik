"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { browserClient } from "@/lib/radar/supabase-browser";
import { completeOnboarding } from "./actions";
import { messages } from "@/lib/radar/messages";

const m = messages.onboarding;
const a = messages.auth;

const TRADES = [
  { slug: "rueckbau",   name: "Rückbau / Abbruch" },
  { slug: "schadstoff", name: "Schadstoffsanierung" },
  { slug: "geruest",    name: "Gerüstbau" },
  { slug: "abdichtung", name: "Abdichtung" },
  { slug: "entsorgung", name: "Entsorgung / Transporte" },
  { slug: "gutachten",  name: "Gutachten / SV" },
];

const BUYERS = [
  { slug: "sanierer",     name: "Sanierer / GU" },
  { slug: "gutachter",    name: "Gutachter" },
  { slug: "entsorger",    name: "Entsorger" },
  { slug: "geruestbauer", name: "Gerüstbauer" },
  { slug: "entwickler",   name: "Entwickler / Wohnungswirtschaft" },
];

export function OnboardingWizard({ hasSession }: { hasSession: boolean }) {
  const router = useRouter();
  const [step, setStep] = useState<"account" | "profile">(hasSession ? "profile" : "account");
  const [emailSent, setEmailSent] = useState(false);

  // Account
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile
  const [name, setName] = useState("");
  const [legalForm, setLegalForm] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [radiusKm, setRadiusKm] = useState(50);
  const [trades, setTrades] = useState<string[]>([]);
  const [buyers, setBuyers] = useState<string[]>([]);
  const [accepted, setAccepted] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAccount(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError(a.passwordMin);
      return;
    }
    setLoading(true);
    setError(null);

    const supabase = browserClient();
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    if (data.session) {
      setStep("profile");
    } else {
      // Email confirmation required – user signs in afterwards and lands back here
      setEmailSent(true);
    }
    setLoading(false);
  }

  async function handleProfile(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await completeOnboarding({
      name,
      legal_form: legalForm || undefined,
      address,
      website: website || "",
      phone: phone || undefined,
      radius_km: radiusKm,
      trade_slugs: trades as never,
      buyer_category_slugs: buyers as never,
      accepts_lead_terms: accepted as true,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }
    router.push("/radar/portal");
    router.refresh();
  }

  if (emailSent) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
        <p className="text-3xl mb-3">📬</p>
        <p className="text-sm text-gray-700">{a.confirmEmailSent}</p>
        <Link
          href="/radar/login"
          className="inline-block mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
          style={{ background: "#1A3A2A" }}
        >
          {a.loginCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <Link href="/radar" className="text-xs text-gray-400 hover:text-gray-600">
        {messages.common.back}
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-1" style={{ color: "#1A3A2A" }}>
        {m.title}
      </h1>
      <p className="text-sm text-gray-500 mb-6">{m.subtitle}</p>

      {step === "account" ? (
        <form onSubmit={handleAccount} className="space-y-4">
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-gray-700 mb-1">
              {a.email}
            </label>
            <input
              id="reg-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div>
            <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
              {a.password}
            </label>
            <input
              id="reg-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg font-semibold text-sm text-white disabled:opacity-50"
            style={{ background: "#1A3A2A" }}
          >
            {loading ? messages.common.loading : a.registerButton}
          </button>
          <p className="text-xs text-gray-500 text-center">
            {a.hasAccount}{" "}
            <Link href="/radar/login" className="font-semibold hover:underline" style={{ color: "#2E6B4D" }}>
              {a.loginCta}
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleProfile} className="space-y-5">
          {/* Firmendaten */}
          <fieldset className="space-y-3">
            <legend className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2E6B4D" }}>
              1 · {m.step1}
            </legend>
            <input
              required
              placeholder={m.companyName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder={m.legalForm}
                value={legalForm}
                onChange={(e) => setLegalForm(e.target.value)}
                className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              />
              <input
                placeholder={m.phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <input
              required
              placeholder={m.address}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <input
              type="url"
              placeholder={m.website}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </fieldset>

          {/* Gewerke */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2E6B4D" }}>
              2 · {m.step2}
            </legend>
            <p className="text-xs text-gray-500 mb-2">{m.tradesLabel}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {TRADES.map((t) => (
                <label
                  key={t.slug}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors ${
                    trades.includes(t.slug)
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white text-gray-600 border-gray-300 hover:border-green-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={trades.includes(t.slug)}
                    onChange={(e) =>
                      setTrades((prev) =>
                        e.target.checked ? [...prev, t.slug] : prev.filter((s) => s !== t.slug)
                      )
                    }
                  />
                  {t.name}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mb-2">{m.buyersLabel}</p>
            <div className="flex flex-wrap gap-2">
              {BUYERS.map((b) => (
                <label
                  key={b.slug}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border transition-colors ${
                    buyers.includes(b.slug)
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white text-gray-600 border-gray-300 hover:border-green-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={buyers.includes(b.slug)}
                    onChange={(e) =>
                      setBuyers((prev) =>
                        e.target.checked ? [...prev, b.slug] : prev.filter((s) => s !== b.slug)
                      )
                    }
                  />
                  {b.name}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Radius */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2E6B4D" }}>
              3 · {m.step3}
            </legend>
            <label className="block text-sm text-gray-700">
              {m.radiusLabel}: <strong>{radiusKm} km</strong>
              <input
                type="range"
                min={10}
                max={300}
                step={10}
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-full mt-2 accent-green-800"
              />
            </label>
          </fieldset>

          {/* Erfolgsvereinbarung */}
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#2E6B4D" }}>
              4 · {m.step4}
            </legend>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-600 leading-relaxed mb-3">
              {m.agreementText}
            </div>
            <label className="flex items-start gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-0.5 accent-green-800"
              />
              {m.agreementCheckbox}
            </label>
          </fieldset>

          <p className="text-xs text-gray-400">{m.certsHint}</p>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || trades.length === 0 || buyers.length === 0 || !accepted}
            className="w-full h-11 rounded-lg font-semibold text-sm text-white disabled:opacity-50"
            style={{ background: "#1A3A2A" }}
          >
            {loading ? messages.common.loading : m.submit}
          </button>
        </form>
      )}
    </div>
  );
}
