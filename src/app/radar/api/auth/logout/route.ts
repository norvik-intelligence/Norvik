import { NextResponse, type NextRequest } from "next/server";
import { serverClient } from "@/lib/radar/supabase-server";

export async function GET(request: NextRequest) {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/radar", request.url));
}
