import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Radio, Building2, Inbox, BarChart2, Handshake, Receipt, LogOut } from "lucide-react";
import { getAuthContext } from "@/lib/radar/supabase-server";
import { messages } from "@/lib/radar/messages";

const m = messages.admin;

const NAV = [
  { href: "/radar/admin",            label: m.navOverview,   icon: LayoutDashboard },
  { href: "/radar/admin/queue",      label: m.navQueue,      icon: Inbox },
  { href: "/radar/admin/sources",    label: m.navSources,    icon: Radio },
  { href: "/radar/admin/companies",  label: m.navCompanies,  icon: Building2 },
  { href: "/radar/admin/mediations", label: m.navMediations, icon: Handshake },
  { href: "/radar/admin/leads",      label: m.navLeads,      icon: Receipt },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const auth = await getAuthContext();
  if (!auth) redirect("/radar/login?next=/radar/admin");
  if (!auth.isAdmin) redirect("/radar/portal");

  return (
    <div className="flex min-h-screen" style={{ background: "#F5F4F2" }}>
      {/* Sidebar */}
      <aside
        className="w-56 flex-shrink-0 flex flex-col border-r"
        style={{ background: "#1A3A2A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="px-4 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Link href="/radar/admin" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-green-300" />
            <span className="font-bold text-sm text-white">{messages.common.appName}</span>
          </Link>
          <p className="text-[10px] text-white/40 mt-0.5 pl-6">Admin</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors"
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-2 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] text-white/30 px-3 pb-2 truncate">{auth.email}</p>
          <a
            href="/radar/api/auth/logout"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {messages.common.logout}
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
