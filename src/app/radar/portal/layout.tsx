import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Map, CalendarClock, Inbox, Building2, LogOut, Radar } from "lucide-react";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";

const m = messages.portal;

const NAV = [
  { href: "/radar/portal",            label: m.navFeed,       icon: Map },
  { href: "/radar/portal/capacities", label: m.navCapacities, icon: CalendarClock },
  { href: "/radar/portal/leads",      label: m.navLeads,      icon: Inbox },
  { href: "/radar/portal/profile",    label: m.navProfile,    icon: Building2 },
];

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const auth = await getAuthContext();
  if (!auth) redirect("/radar/login?next=/radar/portal");
  // Signed in but no company profile yet → finish registration first
  if (!auth.companyId) redirect("/radar/registrieren");

  return (
    <div className="min-h-screen" style={{ background: "#F5F4F2" }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "#1A3A2A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/radar/portal" className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-green-300" />
            <span className="font-bold text-sm text-white">{messages.common.appName}</span>
          </Link>
          <nav className="flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors"
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
            <a
              href="/radar/api/auth/logout"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/50 hover:text-white hover:bg-white/8 transition-colors"
              title={messages.common.logout}
            >
              <LogOut className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
