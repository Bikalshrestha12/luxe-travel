"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  {
    section: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: "⊞", exact: true },
      { href: "/admin/analytics", label: "Analytics", icon: "◈" },
    ],
  },
  {
    section: "Management",
    items: [
      { href: "/admin/bookings", label: "Bookings", icon: "✈", badge: 12 },
      { href: "/admin/destinations", label: "Destinations", icon: "◎" },
      { href: "/admin/hotels", label: "Hotels", icon: "⬡" },
      { href: "/admin/users", label: "Users", icon: "◉", badge: 3 },
    ],
  },
  {
    section: "Communication",
    items: [
      { href: "/admin/messages", label: "Messages", icon: "✉", badge: 5 },
    ],
  },
];

function NavItem({
  href, label, icon, badge, exact, collapsed, onClick,
}: {
  href: string; label: string; icon: string; badge?: number;
  exact?: boolean; collapsed?: boolean; onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
      style={{
        background: active ? "rgba(200,146,15,0.12)" : "transparent",
        border: active ? "1px solid rgba(200,146,15,0.2)" : "1px solid transparent",
        color: active ? "var(--gold-light)" : "var(--text-secondary)",
      }}
      title={collapsed ? label : undefined}>
      <span className="text-base flex-none" style={{ color: active ? "var(--gold)" : "inherit" }}>{icon}</span>
      {!collapsed && (
        <span className="text-sm font-medium flex-1 whitespace-nowrap">{label}</span>
      )}
      {!collapsed && badge !== undefined && (
        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(200,146,15,0.15)", color: "var(--gold)", minWidth: "20px", textAlign: "center" }}>
          {badge}
        </span>
      )}
      {collapsed && badge !== undefined && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
          style={{ background: "var(--gold)", color: "#02020a", fontSize: "9px" }}>
          {badge}
        </span>
      )}
    </Link>
  );
}

function Sidebar({ collapsed, onCollapse, mobile, onClose }: {
  collapsed: boolean; onCollapse: () => void;
  mobile?: boolean; onClose?: () => void;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--surface)", borderRight: "1px solid rgba(200,146,15,0.08)" }}>
      {/* Logo / header */}
      <div className="flex items-center justify-between px-4 py-5 border-b" style={{ borderColor: "rgba(200,146,15,0.08)" }}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-none"
              style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)", fontSize: "16px" }}>LUXE</div>
              <div className="text-xs" style={{ color: "var(--text-muted)", fontSize: "9px", letterSpacing: "0.1em" }}>ADMIN PANEL</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto"
            style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" />
            </svg>
          </div>
        )}
        {!mobile && (
          <button onClick={onCollapse} className="p-1.5 rounded-lg transition-colors flex-none"
            style={{ color: "var(--text-muted)" }}
            title={collapsed ? "Expand" : "Collapse"}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d={collapsed ? "M5 2l4 5-4 5" : "M9 2L5 7l4 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {mobile && (
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: "var(--text-muted)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_ITEMS.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <div className="text-xs font-medium tracking-[0.15em] uppercase mb-2 px-3"
                style={{ color: "var(--text-muted)" }}>{section}</div>
            )}
            <div className="space-y-1">
              {items.map((item) => (
                <NavItem key={item.href} {...item} collapsed={collapsed && !mobile} onClick={onClose} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(200,146,15,0.08)" }}>
        <div className={`flex ${collapsed && !mobile ? "justify-center" : "items-center gap-3"} mb-3`}>
          <div className="w-9 h-9 rounded-full flex-none flex items-center justify-center text-sm font-medium"
            style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
            {user?.avatar || "?"}
          </div>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name}</div>
              <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                <span className="capitalize" style={{ color: user?.role === "admin" ? "var(--gold)" : "var(--text-muted)" }}>
                  {user?.role}
                </span>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${collapsed && !mobile ? "justify-center" : ""}`}
          style={{ color: "var(--text-muted)", border: "1px solid rgba(240,80,80,0.1)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(226,75,74,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#f09595"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M5 7h8M10 4l3 3-3 3M8 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {(!collapsed || mobile) && "Sign Out"}
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) { router.push("/login"); return; }
    if (user?.role !== "admin") { router.push("/"); return; }
  }, [isAuthenticated, user, router]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--obsidian)" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: "rgba(200,146,15,0.3)", borderTopColor: "#e4b020" }} />
          <p style={{ color: "var(--text-muted)" }}>Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--obsidian)", cursor: "default" }}>
      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block flex-none overflow-hidden"
        style={{ minHeight: "100vh" }}>
        <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
      </motion.div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden" style={{ background: "rgba(2,2,10,0.8)" }}
              onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
              <Sidebar collapsed={false} onCollapse={() => {}} mobile onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex-none flex items-center justify-between px-4 sm:px-6 py-4 border-b"
          style={{ borderColor: "rgba(200,146,15,0.08)", background: "rgba(14,14,30,0.8)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-colors" style={{ color: "var(--text-secondary)" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Page title */}
            <BreadcrumbTitle />
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
              style={{ background: "rgba(200,146,15,0.05)", border: "1px solid rgba(200,146,15,0.1)", color: "var(--text-muted)", minWidth: "180px" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span>Search...</span>
              <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(200,146,15,0.1)", color: "var(--gold)", fontSize: "9px" }}>⌘K</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl transition-colors"
              style={{ background: "rgba(200,146,15,0.05)", border: "1px solid rgba(200,146,15,0.1)", color: "var(--text-secondary)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2a5 5 0 0 0-5 5v3l-1.5 2h13L13 10V7a5 5 0 0 0-5-5z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6.5 13.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-xs flex items-center justify-center"
                style={{ background: "var(--gold)", color: "#02020a", fontSize: "8px" }}>5</span>
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
              {user?.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto" style={{ background: "var(--obsidian)" }}>
          <motion.div key={pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="h-full">
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function BreadcrumbTitle() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return (
    <div className="flex items-center gap-2 text-sm">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span style={{ color: "var(--text-muted)" }}>›</span>}
          <span className={i === segments.length - 1 ? "font-medium capitalize" : "capitalize"}
            style={{ color: i === segments.length - 1 ? "var(--text-primary)" : "var(--text-muted)" }}>
            {seg}
          </span>
        </span>
      ))}
    </div>
  );
}
