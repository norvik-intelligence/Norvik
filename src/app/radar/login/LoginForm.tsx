"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { browserClient } from "@/lib/radar/supabase-browser";
import { messages } from "@/lib/radar/messages";

const m = messages.auth;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = browserClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !data.user) {
      setError(m.invalidCredentials);
      setLoading(false);
      return;
    }

    const isAdmin =
      (data.user.app_metadata as Record<string, unknown>)["role"] === "admin";
    const next = searchParams.get("next");
    router.push(next ?? (isAdmin ? "/radar/admin" : "/radar/portal"));
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-xl">
      <Link href="/radar" className="text-xs text-gray-400 hover:text-gray-600">
        {messages.common.back}
      </Link>
      <h1 className="text-xl font-bold mt-3 mb-1" style={{ color: "#1A3A2A" }}>
        {m.loginTitle}
      </h1>
      <p className="text-sm text-gray-500 mb-6">{m.loginSubtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {m.email}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {m.password}
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg font-semibold text-sm text-white disabled:opacity-50 transition-opacity hover:opacity-90"
          style={{ background: "#1A3A2A" }}
        >
          {loading ? messages.common.loading : m.loginButton}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-6 text-center">
        {m.noAccount}{" "}
        <Link href="/radar/portal/onboarding" className="font-semibold hover:underline" style={{ color: "#2E6B4D" }}>
          {m.registerCta}
        </Link>
      </p>
    </div>
  );
}
