import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const url = process.env["NEXT_PUBLIC_SUPABASE_URL"] ?? "";
const anonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] ?? "";

/** Cookie-based server client for Server Components / Actions (respects RLS). */
export async function serverClient() {
  const cookieStore = await cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (
        toSet: Array<{ name: string; value: string; options?: CookieOptions }>
      ) => {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // called from a Server Component – session refresh handled by proxy
        }
      },
    },
  });
}

export type AuthContext = {
  userId: string;
  email: string | null;
  isAdmin: boolean;
  companyId: string | null;
};

/** Resolve the current user, admin claim, and company mapping. Null = not signed in. */
export async function getAuthContext(): Promise<AuthContext | null> {
  const supabase = await serverClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const isAdmin =
    (user.app_metadata as Record<string, unknown>)["role"] === "admin";

  const { data: company } = await supabase
    .from("companies")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return {
    userId: user.id,
    email: user.email ?? null,
    isAdmin,
    companyId: company?.id ?? null,
  };
}
