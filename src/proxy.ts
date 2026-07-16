import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const PROTECTED_PREFIXES = ["/radar/admin", "/radar/portal"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsAuth = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const url = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const anonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  // Without Supabase config we cannot check sessions – fail closed on protected routes
  if (!url || !anonKey) {
    if (needsAuth) {
      return NextResponse.redirect(new URL("/radar/login", request.url));
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (
        toSet: Array<{ name: string; value: string; options?: CookieOptions }>
      ) => {
        toSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        toSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh the session (writes rotated tokens into cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (needsAuth && !user) {
    const login = new URL("/radar/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  // Optimistic admin gate (authoritative check happens in the admin layout)
  if (pathname.startsWith("/radar/admin") && user) {
    const role = (user.app_metadata as Record<string, unknown>)["role"];
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/radar/portal", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/radar/:path*"],
};
