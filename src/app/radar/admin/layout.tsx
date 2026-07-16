import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Radio, Building2, Inbox, BarChart2 } from "lucide-react";

const NAV = [
  { href: "/radar/admin/queue",     label: "Review-Queue",   icon: Inbox },
  { href: "/radar/admin/sources",   label: "Quellen",        icon: Radio },
  { href: "/radar/admin/companies", label: "Betriebe",       icon: Building2 },
  { href: "/radar/admin",           label: "Übersicht",      icon: LayoutDashboard },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
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
            <span className="font-bold text-sm text-white">RückbauRadar</span>
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
        <div className="px-4 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] text-white/30">Admin-Zugang · Vollzugriff</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
