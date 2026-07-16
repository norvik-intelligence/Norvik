import { createClient } from "@supabase/supabase-js";

const url = process.env["SUPABASE_URL"] ?? process.env["NEXT_PUBLIC_SUPABASE_URL"] ?? "";
const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";
const anonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] ?? "";

// Server-side admin client (bypasses RLS, server only)
export function adminClient() {
  if (!url || !serviceKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

// Browser-safe client (respects RLS)
export function browserClient() {
  if (!url || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set");
  }
  return createClient(url, anonKey);
}
