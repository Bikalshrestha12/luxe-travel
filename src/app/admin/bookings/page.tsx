"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "all" | "confirmed" | "pending" | "processing" | "cancelled";

const BOOKINGS = [
  { id: "BK-2841", guest: "Isabella Laurent", email: "i.laurent@email.com", destination: "Maldives", hotel: "Niyama Maldives", checkIn: "2025-08-12", checkOut: "2025-08-19", nights: 7, guests: 2, total: 16800, status: "confirmed", room: "Overwater Villa", paid: true },
  { id: "BK-2840", guest: "Marcus Chen", email: "m.chen@email.com", destination: "Kyoto", hotel: "Aman Kyoto", checkIn: "2025-07-28", checkOut: "2025-08-07", nights: 10, guests: 1, total: 12500, status: "pending", room: "Imperial Suite", paid: false },
  { id: "BK-2839", guest: "Sophia Williams", email: "s.williams@email.com", destination: "Santorini", hotel: "Canaves Oia", checkIn: "2025-09-03", checkOut: "2025-09-10", nights: 7, guests: 2, total: 9200, status: "confirmed", room: "Cave Suite", paid: true },
  { id: "BK-2838", guest: "David Okafor", email: "d.okafor@email.com", destination: "Patagonia", hotel: "Awasi Patagonia", checkIn: "2025-11-15", checkOut: "2025-11-29", nights: 14, guests: 4, total: 28000, status: "processing", room: "Private Villa", paid: false },
  { id: "BK-2837", guest: "Elena Vasquez", email: "e.vasquez@email.com", destination: "Amalfi Coast", hotel: "Le Sirenuse", checkIn: "2025-08-22", checkOut: "2025-08-30", nights: 8, guests: 2, total: 7800, status: "cancelled", room: "Sea View Suite", paid: false },
  { id: "BK-2836", guest: "James Morrison", email: "j.morrison@email.com", destination: "Venice", hotel: "Aman Venice", checkIn: "2025-10-05", checkOut: "2025-10-10", nights: 5, guests: 2, total: 6000, status: "confirmed", room: "Grand Suite", paid: true },
  { id: "BK-2835", guest: "Aisha Patel", email: "a.patel@email.com", destination: "Serengeti", hotel: "Singita Sasakwa", checkIn: "2025-09-20", checkOut: "2025-10-02", nights: 12, guests: 3, total: 45600, status: "confirmed", room: "Safari Lodge", paid: true },
  { id: "BK-2834", guest: "Thomas Bergmann", email: "t.bergmann@email.com", destination: "Iceland", hotel: "Icehotel", checkIn: "2026-01-10", checkOut: "2026-01-17", nights: 7, guests: 2, total: 5460, status: "pending", room: "Ice Suite", paid: false },
];

const STATUS_MAP: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "rgba(16,185,129,0.1)", color: "#10b981", label: "Confirmed" },
  pending:   { bg: "rgba(228,176,32,0.12)", color: "#e4b020", label: "Pending" },
  processing:{ bg: "rgba(0,212,255,0.1)",  color: "#00d4ff", label: "Processing" },
  cancelled: { bg: "rgba(226,75,74,0.1)",  color: "#f09595", label: "Cancelled" },
};

export default function BookingsPage() {
  const [status, setStatus] = useState<Status>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"checkIn" | "total">("checkIn");

  const filtered = BOOKINGS
    .filter(b => status === "all" || b.status === status)
    .filter(b => !search || b.guest.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.destination.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortKey === "total" ? b.total - a.total : a.checkIn.localeCompare(b.checkIn));

  const selectedBooking = BOOKINGS.find(b => b.id === selected);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Bookings</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{BOOKINGS.length} total reservations</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium self-start sm:self-auto"
          style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by guest, ID, destination..."
            className="luxury-input w-full pl-10 pr-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(14,14,30,0.8)" }} />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all","confirmed","pending","processing","cancelled"] as Status[]).map(s => (
            <button key={s} onClick={() => setStatus(s)} className="px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all duration-200"
              style={{ background: status === s ? (s === "all" ? "linear-gradient(135deg,#c8920f,#e4b020)" : STATUS_MAP[s]?.bg || "rgba(200,146,15,0.1)") : "rgba(200,146,15,0.05)", color: status === s ? (s === "all" ? "#02020a" : STATUS_MAP[s]?.color || "var(--gold)") : "var(--text-muted)", border: "1px solid rgba(200,146,15,0.1)" }}>
              {s}
            </button>
          ))}
        </div>
        <select value={sortKey} onChange={e => setSortKey(e.target.value as any)} className="px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(14,14,30,0.8)", border: "1px solid rgba(200,146,15,0.1)", color: "var(--text-secondary)", outline: "none" }}>
          <option value="checkIn">Sort: Date</option>
          <option value="total">Sort: Value</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 min-w-0 rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "680px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(200,146,15,0.06)" }}>
                  {["ID","Guest","Destination","Check-in","Nights","Total","Status",""].map(h => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-medium tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((b, i) => (
                    <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => setSelected(selected === b.id ? null : b.id)}
                      className="cursor-pointer transition-colors"
                      style={{ borderBottom: "1px solid rgba(200,146,15,0.04)", background: selected === b.id ? "rgba(200,146,15,0.06)" : "transparent" }}
                      onMouseEnter={e => { if (selected !== b.id) (e.currentTarget as HTMLElement).style.background = "rgba(200,146,15,0.02)"; }}
                      onMouseLeave={e => { if (selected !== b.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <td className="px-4 py-3.5 text-xs font-medium" style={{ color: "var(--gold-light)" }}>{b.id}</td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm font-medium">{b.guest}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{b.guests} guest{b.guests > 1 ? "s" : ""}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="text-sm">{b.destination}</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{b.hotel}</div>
                      </td>
                      <td className="px-4 py-3.5 text-sm" style={{ color: "var(--text-secondary)" }}>{b.checkIn}</td>
                      <td className="px-4 py-3.5 text-sm text-center">{b.nights}n</td>
                      <td className="px-4 py-3.5 text-sm font-medium" style={{ color: "var(--gold-light)" }}>${b.total.toLocaleString()}</td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: STATUS_MAP[b.status].bg, color: STATUS_MAP[b.status].color }}>
                          {STATUS_MAP[b.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="3" cy="7" r="1" fill="currentColor"/><circle cx="7" cy="7" r="1" fill="currentColor"/><circle cx="11" cy="7" r="1" fill="currentColor"/></svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-6 py-16 text-center text-sm" style={{ color: "var(--text-muted)" }}>No bookings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div initial={{ opacity: 0, x: 20, width: 0 }} animate={{ opacity: 1, x: 0, width: 300 }} exit={{ opacity: 0, x: 20, width: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex-none rounded-2xl p-5 overflow-hidden" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.12)", width: 300 }}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-medium">{selectedBooking.id}</h3>
                <button onClick={() => setSelected(null)} style={{ color: "var(--text-muted)" }}>✕</button>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl p-4" style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.08)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
                      {selectedBooking.guest.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div><div className="text-sm font-medium">{selectedBooking.guest}</div><div className="text-xs" style={{ color: "var(--text-muted)" }}>{selectedBooking.email}</div></div>
                  </div>
                </div>
                {[
                  { label: "Destination", value: selectedBooking.destination },
                  { label: "Hotel", value: selectedBooking.hotel },
                  { label: "Room", value: selectedBooking.room },
                  { label: "Check-in", value: selectedBooking.checkIn },
                  { label: "Check-out", value: selectedBooking.checkOut },
                  { label: "Duration", value: `${selectedBooking.nights} nights` },
                  { label: "Guests", value: selectedBooking.guests.toString() },
                  { label: "Total", value: `$${selectedBooking.total.toLocaleString()}` },
                  { label: "Payment", value: selectedBooking.paid ? "Paid ✓" : "Pending" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span style={{ color: label === "Total" ? "var(--gold-light)" : label === "Payment" && selectedBooking.paid ? "#10b981" : "var(--text-primary)" }} className="font-medium">{value}</span>
                  </div>
                ))}
                <span className="w-full block text-center px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: STATUS_MAP[selectedBooking.status].bg, color: STATUS_MAP[selectedBooking.status].color }}>
                  {STATUS_MAP[selectedBooking.status].label}
                </span>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>Edit</button>
                  <button className="flex-1 py-2 rounded-lg text-xs" style={{ border: "1px solid rgba(226,75,74,0.3)", color: "#f09595" }}>Cancel</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
