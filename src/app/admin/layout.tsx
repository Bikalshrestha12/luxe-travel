"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore"; // Ensure this path is correct
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * THEME CONSTANTS
 * (Replace these with your Tailwind config or CSS variables)
 */
const COLORS = {
  obsidian: "#02020a",
  surface: "#0e0e1e",
  gold: "#c8920f",
  goldLight: "#e4b020",
  textPrimary: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#71717a",
};

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

// --- Sub-Components ---

function NavItem({
  href,
  label,
  icon,
  badge,
  exact,
  collapsed,
  onClick,
}: {
  href: string;
  label: string;
  icon: string;
  badge?: number;
  exact?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Link
        href={href}
        onClick={onClick}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden border"
        style={{
          background: active ? "rgba(200,146,15,0.12)" : "transparent",
          borderColor: active ? "rgba(200,146,15,0.2)" : "transparent",
          color: active ? COLORS.goldLight : COLORS.textSecondary,
        }}
        title={collapsed ? label : undefined}
      >
        <motion.span
          className="text-base flex-none"
          style={{ color: active ? COLORS.gold : "inherit" }}
          animate={{ rotateY: active ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.span>

        {!collapsed && (
          <motion.span
            className="text-sm font-medium flex-1 whitespace-nowrap"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {label}
          </motion.span>
        )}

        {badge !== undefined && (
          <motion.span
            className={
              collapsed
                ? "absolute -top-1 -right-1 w-4 h-4 text-[9px]"
                : "text-xs px-1.5 py-0.5"
            }
            style={{
              background: collapsed ? COLORS.gold : "rgba(200,146,15,0.15)",
              color: collapsed ? COLORS.obsidian : COLORS.gold,
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: collapsed ? "16px" : "20px",
            }}
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
          >
            {badge}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}

function SidebarContent({
  collapsed,
  onCollapse,
  mobile,
  onClose,
}: {
  collapsed: boolean;
  onCollapse: () => void;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
    onClose?.();
  };
  useEffect(() => {
  document.documentElement.classList.remove("lenis");
}, []);

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: COLORS.surface,
        borderRight: `1px solid rgba(200,146,15,0.08)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-5 border-b"
        style={{ borderColor: "rgba(200,146,15,0.08)" }}
      >
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-none"
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill={COLORS.obsidian} />
            </svg>
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div
                className="text-sm font-bold tracking-tight"
                style={{ color: COLORS.goldLight }}
              >
                LUXE
              </div>
              <div
                className="text-[9px] tracking-widest uppercase"
                style={{ color: COLORS.textMuted }}
              >
                Admin Panel
              </div>
            </div>
          )}
        </Link>

        {!mobile && (
          <button
            onClick={onCollapse}
            className="p-1 hover:bg-white/5 rounded-md transition-colors"
            style={{ color: COLORS.textMuted }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              className={collapsed ? "rotate-180" : ""}
            >
              <path
                d="M9 2L5 7l4 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {NAV_ITEMS.map(({ section, items }, idx) => (
          <div key={section}>
            {!collapsed && (
              <div
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 px-3"
                style={{ color: COLORS.textMuted }}
              >
                {section}
              </div>
            )}
            <div className="space-y-1">
              {items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  collapsed={collapsed}
                  onClick={mobile ? onClose : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / User */}
      <div
        className="p-3 border-t"
        style={{ borderColor: "rgba(200,146,15,0.08)" }}
      >
        <div
          className={`flex items-center gap-3 p-2 mb-2 ${collapsed ? "justify-center" : ""}`}
        >
          <div
            className="w-9 h-9 rounded-full flex-none flex items-center justify-center text-xs font-bold"
            style={{
              background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldLight})`,
              color: COLORS.obsidian,
            }}
          >
            {user?.name?.charAt(0) || "A"}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div
                className="text-sm font-medium truncate"
                style={{ color: COLORS.textPrimary }}
              >
                {user?.name || "Admin"}
              </div>
              <div className="text-xs" style={{ color: COLORS.gold }}>
                {user?.role}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all hover:bg-red-500/10 hover:text-red-400 ${collapsed ? "justify-center" : ""}`}
          style={{
            color: COLORS.textMuted,
            border: "1px solid rgba(240,80,80,0.1)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M5 7h8M10 4l3 3-3 3M8 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
}

// --- Main Layout ---

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) router.push("/login");
    else if (user?.role !== "admin") router.push("/");
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!isMounted || !isAuthenticated || user?.role !== "admin") {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: COLORS.obsidian }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-t-transparent rounded-full"
          style={{ borderColor: COLORS.gold, borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: COLORS.obsidian }}
    >
      {/* Desktop Sidebar Container */}
      <motion.aside
        className="hidden lg:block h-full flex-none"
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SidebarContent
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 lg:hidden bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
            >
              <SidebarContent
                collapsed={false}
                onCollapse={() => {}}
                mobile
                onClose={() => setMobileOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header
          className="h-16 flex items-center justify-between px-6 border-b z-30"
          style={{
            borderColor: "rgba(200,146,15,0.08)",
            background: "rgba(14,14,30,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-zinc-400"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <BreadcrumbTitle />
          </div>
        </header>

        {/* Main View */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function BreadcrumbTitle() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span style={{ color: COLORS.textMuted }}>/</span>}
          <span
            style={{
              color:
                i === segments.length - 1 ? COLORS.goldLight : COLORS.textMuted,
            }}
          >
            {seg.replace(/-/g, " ")}
          </span>
        </span>
      ))}
    </div>
  );
}
