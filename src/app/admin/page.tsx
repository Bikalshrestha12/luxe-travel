"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

// ── Stat Card ──────────────────────────────────────────────
function StatCard({ icon, label, value, change, trend, color, delay }: {
  icon: string; label: string; value: string; change: string;
  trend: "up" | "down" | "neutral"; color: string; delay: number;
}) {
  const trendColor = trend === "up" ? "#10b981" : trend === "down" ? "#f09595" : "var(--text-muted)";
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.7 }}
      className="rounded-2xl p-5 sm:p-6 relative overflow-hidden group transition-all duration-300"
      style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.2)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.08)"; }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 pointer-events-none -translate-y-6 translate-x-6"
        style={{ background: `radial-gradient(circle, ${color}, transparent)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>{icon}</div>
        <span className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1"
          style={{ background: `${trendColor}15`, color: trendColor }}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "–"} {change}
        </span>
      </div>
      <div className="text-2xl sm:text-3xl font-light mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>{value}</div>
      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
    </motion.div>
  );
}

// ── Mini Sparkline ─────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 120, h = 40;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={color} fillOpacity="0.08" stroke="none" />
    </svg>
  );
}

// ── Donut Chart ────────────────────────────────────────────
function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const r = 50, cx = 60, cy = 60, strokeW = 16;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {data.map((d, i) => {
          const pct = d.value / total;
          const offset = circ * (1 - cumulative);
          const dash = circ * pct;
          cumulative += pct;
          return (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={d.color}
              strokeWidth={strokeW} strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={offset} transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="round" style={{ transition: "stroke-dasharray 0.8s ease" }} />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontSize: "14px", fill: "var(--text-primary)", fontFamily: "var(--font-cormorant)" }}>
          {total}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" style={{ fontSize: "8px", fill: "var(--text-muted)" }}>Total</text>
      </svg>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: d.color }} />
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{d.label}</div>
            <div className="text-xs font-medium ml-auto">{Math.round((d.value / total) * 100)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Revenue Bar Chart ──────────────────────────────────────
function BarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-1.5 h-24 w-full">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
          <div className="w-full rounded-t-sm transition-all duration-700 relative overflow-hidden"
            style={{ height: `${(d.value / max) * 96}px`, background: `rgba(200,146,15,${0.2 + (d.value / max) * 0.6})`, minHeight: "4px" }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "linear-gradient(to top, #c8920f, #e4b020)" }} />
          </div>
          <div className="text-xs" style={{ color: "var(--text-muted)", fontSize: "8px" }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
}

// ── Recent Bookings Table ──────────────────────────────────
const RECENT_BOOKINGS = [
  { id: "BK-2841", guest: "Isabella Laurent", destination: "Maldives", hotel: "Niyama Maldives", checkIn: "2025-08-12", nights: 7, total: 16800, status: "confirmed" },
  { id: "BK-2840", guest: "Marcus Chen", destination: "Kyoto", hotel: "Aman Kyoto", checkIn: "2025-07-28", nights: 10, total: 12500, status: "pending" },
  { id: "BK-2839", guest: "Sophia Williams", destination: "Santorini", hotel: "Canaves Oia", checkIn: "2025-09-03", nights: 7, total: 9200, status: "confirmed" },
  { id: "BK-2838", guest: "David Okafor", destination: "Patagonia", hotel: "Awasi Patagonia", checkIn: "2025-11-15", nights: 14, total: 28000, status: "processing" },
  { id: "BK-2837", guest: "Elena Vasquez", destination: "Amalfi Coast", hotel: "Le Sirenuse", checkIn: "2025-08-22", nights: 8, total: 7800, status: "cancelled" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "rgba(16,185,129,0.1)", color: "#10b981", label: "Confirmed" },
  pending: { bg: "rgba(228,176,32,0.12)", color: "#e4b020", label: "Pending" },
  processing: { bg: "rgba(0,212,255,0.1)", color: "#00d4ff", label: "Processing" },
  cancelled: { bg: "rgba(226,75,74,0.1)", color: "#f09595", label: "Cancelled" },
};

// ── Main Dashboard ─────────────────────────────────────────
export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const STATS = [
    { icon: "✈", label: "Total Bookings This Month", value: "284", change: "12%", trend: "up" as const, color: "#c8920f", delay: 0.1 },
    { icon: "💰", label: "Revenue This Month", value: "$1.24M", change: "8.3%", trend: "up" as const, color: "#10b981", delay: 0.2 },
    { icon: "◉", label: "Active Users", value: "3,841", change: "5.1%", trend: "up" as const, color: "#00d4ff", delay: 0.3 },
    { icon: "⬡", label: "Hotels Available", value: "4,218", change: "2", trend: "up" as const, color: "#7c3aed", delay: 0.4 },
  ];

  const MONTHLY_REVENUE = [
    { month: "Jan", value: 820000 }, { month: "Feb", value: 940000 },
    { month: "Mar", value: 1100000 }, { month: "Apr", value: 980000 },
    { month: "May", value: 1250000 }, { month: "Jun", value: 1380000 },
    { month: "Jul", value: 1240000 }, { month: "Aug", value: 1580000 },
    { month: "Sep", value: 1420000 }, { month: "Oct", value: 1190000 },
    { month: "Nov", value: 1050000 }, { month: "Dec", value: 1350000 },
  ];

  const BOOKING_STATUS = [
    { label: "Confirmed", value: 156, color: "#10b981" },
    { label: "Pending", value: 48, color: "#e4b020" },
    { label: "Processing", value: 62, color: "#00d4ff" },
    { label: "Cancelled", value: 18, color: "#f09595" },
  ];

  const REVENUE_SPARKS = [820, 940, 1100, 980, 1250, 1380, 1240];
  const USER_SPARKS = [2800, 2950, 3100, 3250, 3400, 3600, 3841];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8 max-w-400">

      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
            Good {time.getHours() < 12 ? "morning" : time.getHours() < 17 ? "afternoon" : "evening"},{" "}
            <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>{user?.name?.split(" ")[0]}</em>
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            {time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            {" · "}
            {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/bookings">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
              style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              New Booking
            </motion.button>
          </Link>
          <button className="px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
            style={{ background: "rgba(200,146,15,0.08)", border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-secondary)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 10H2M12 7H2M12 4H2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
            Export
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl p-5 sm:p-6"
          style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium">Revenue Overview</h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Monthly revenue for 2025</p>
            </div>
            <select className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(200,146,15,0.08)", border: "1px solid rgba(200,146,15,0.12)", color: "var(--text-secondary)", outline: "none" }}>
              <option>2025</option><option>2024</option>
            </select>
          </div>
          <BarChart data={MONTHLY_REVENUE} />
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
            <div>
              <div className="text-xl font-light text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)" }}>$14.3M</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Total 2025 Revenue</div>
            </div>
            <div>
              <div className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)", color: "#10b981" }}>↑ 18.4%</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>vs Last Year</div>
            </div>
          </div>
        </div>

        {/* Booking Status Donut */}
        <div className="rounded-2xl p-5 sm:p-6" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <h3 className="text-lg font-medium mb-1">Booking Status</h3>
          <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Current month breakdown</p>
          <DonutChart data={BOOKING_STATUS} />
          <div className="mt-5 pt-4 border-t grid grid-cols-2 gap-3" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
            {[
              { label: "Avg. Stay", value: "8.2 nights" },
              { label: "Avg. Value", value: "$4,370" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-base font-light text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)" }}>{value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Revenue Trend", value: "$1.24M", sub: "This month", data: REVENUE_SPARKS, color: "#c8920f" },
          { label: "User Growth", value: "3,841", sub: "Active users", data: USER_SPARKS, color: "#00d4ff" },
        ].map(({ label, value, sub, data, color }) => (
          <div key={label} className="rounded-2xl p-5 flex items-center justify-between"
            style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</div>
              <div className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)", color }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{sub}</div>
            </div>
            <Sparkline data={data} color={color} />
          </div>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
        className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
        <div className="flex items-center justify-between px-5 sm:px-6 py-5 border-b" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
          <div>
            <h3 className="text-lg font-medium">Recent Bookings</h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Latest 5 reservations</p>
          </div>
          <Link href="/admin/bookings" className="text-xs px-4 py-2 rounded-lg transition-colors"
            style={{ color: "var(--gold-light)", border: "1px solid rgba(200,146,15,0.2)" }}>
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "640px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,146,15,0.06)" }}>
                {["Booking ID", "Guest", "Destination", "Check-in", "Nights", "Total", "Status", ""].map((h) => (
                  <th key={h} className="px-4 sm:px-6 py-3.5 text-left text-xs font-medium tracking-wider uppercase"
                    style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((b, i) => (
                <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.06 }}
                  className="transition-colors"
                  style={{ borderBottom: "1px solid rgba(200,146,15,0.04)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "rgba(200,146,15,0.03)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = "transparent"; }}>
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium" style={{ color: "var(--gold-light)" }}>{b.id}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm">{b.guest}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{b.destination}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm" style={{ color: "var(--text-muted)" }}>{b.checkIn}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-center">{b.nights}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gradient-gold">${b.total.toLocaleString()}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: STATUS_STYLES[b.status].bg, color: STATUS_STYLES[b.status].color }}>
                      {STATUS_STYLES[b.status].label}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                      style={{ color: "var(--text-muted)", border: "1px solid rgba(200,146,15,0.1)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-light)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,146,15,0.3)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,146,15,0.1)"; }}>
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Add Destination", icon: "◎", href: "/admin/destinations" },
          { label: "Add Hotel", icon: "⬡", href: "/admin/hotels" },
          { label: "View Messages", icon: "✉", href: "/admin/messages" },
          { label: "User Management", icon: "◉", href: "/admin/users" },
        ].map(({ label, icon, href }) => (
          <Link key={label} href={href}>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}
              className="rounded-2xl p-5 text-center cursor-pointer transition-all duration-200"
              style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.25)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.08)"; }}>
              <div className="text-2xl mb-2" style={{ color: "var(--gold)" }}>{icon}</div>
              <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
