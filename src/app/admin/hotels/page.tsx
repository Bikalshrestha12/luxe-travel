"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const HOTELS = [
  { id: 1, name: "Aman Venice", location: "Venice, Italy", stars: 5, status: "active", rooms: 24, occupancy: 78, revenue: 412800, pricePerNight: 1200, rating: 4.9 },
  { id: 2, name: "Niyama Maldives", location: "Maldives", stars: 5, status: "active", rooms: 86, occupancy: 92, revenue: 892000, pricePerNight: 2400, rating: 5.0 },
  { id: 3, name: "Singita Sasakwa", location: "Serengeti, Tanzania", stars: 5, status: "active", rooms: 12, occupancy: 65, revenue: 324000, pricePerNight: 3800, rating: 4.9 },
  { id: 4, name: "Le Sirenuse", location: "Positano, Italy", stars: 5, status: "active", rooms: 58, occupancy: 85, revenue: 286000, pricePerNight: 890, rating: 4.8 },
  { id: 5, name: "Icehotel", location: "Swedish Lapland", stars: 4, status: "seasonal", rooms: 20, occupancy: 44, revenue: 124000, pricePerNight: 780, rating: 4.7 },
  { id: 6, name: "Capella Bangkok", location: "Bangkok, Thailand", stars: 5, status: "active", rooms: 101, occupancy: 71, revenue: 198000, pricePerNight: 620, rating: 4.8 },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  active: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
  seasonal: { bg: "rgba(228,176,32,0.12)", color: "#e4b020" },
  inactive: { bg: "rgba(240,80,80,0.1)", color: "#f09595" },
};

export default function HotelsAdminPage() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const filtered = HOTELS.filter(h => !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Hotels</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{HOTELS.length} properties · {HOTELS.filter(h => h.status === "active").length} active</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium self-start"
          style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Hotel
        </button>
      </div>

      <div className="relative mb-6">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
          <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hotels..." className="luxury-input w-full pl-10 py-2.5 rounded-xl text-sm max-w-sm" style={{ background: "rgba(14,14,30,0.8)" }} />
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: "700px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(200,146,15,0.06)" }}>
                {["Hotel","Location","Stars","Status","Rooms","Occupancy","Revenue/Mo","Rate","Actions"].map(h => (
                  <th key={h} className="px-4 sm:px-5 py-3.5 text-left text-xs font-medium tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((hotel, i) => (
                <motion.tr key={hotel.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                  style={{ borderBottom: "1px solid rgba(200,146,15,0.04)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(200,146,15,0.02)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                  <td className="px-4 sm:px-5 py-4">
                    <div className="text-sm font-medium">{hotel.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>★ {hotel.rating}</div>
                  </td>
                  <td className="px-4 sm:px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>{hotel.location}</td>
                  <td className="px-4 sm:px-5 py-4 text-sm" style={{ color: "#e4b020" }}>{"★".repeat(hotel.stars)}</td>
                  <td className="px-4 sm:px-5 py-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize"
                      style={{ background: STATUS_STYLE[hotel.status].bg, color: STATUS_STYLE[hotel.status].color }}>
                      {hotel.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-4 text-sm text-center">{hotel.rooms}</td>
                  <td className="px-4 sm:px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(200,146,15,0.1)" }}>
                        <div className="h-full rounded-full" style={{ width: `${hotel.occupancy}%`, background: hotel.occupancy > 80 ? "#10b981" : hotel.occupancy > 60 ? "#e4b020" : "#f09595" }} />
                      </div>
                      <span className="text-xs">{hotel.occupancy}%</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-4 text-sm font-medium" style={{ color: "var(--gold-light)" }}>${hotel.revenue.toLocaleString()}</td>
                  <td className="px-4 sm:px-5 py-4 text-sm" style={{ color: "var(--text-secondary)" }}>${hotel.pricePerNight}/n</td>
                  <td className="px-4 sm:px-5 py-4">
                    <div className="flex gap-1.5">
                      <button className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                        style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--gold-light)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"; }}>
                        Edit
                      </button>
                      <button className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                        style={{ border: "1px solid rgba(226,75,74,0.12)", color: "rgba(240,149,149,0.6)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#f09595"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,149,149,0.6)"; }}>
                        Remove
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Hotel Modal */}
      {showAdd && (
        <>
          <div className="fixed inset-0 z-50" style={{ background: "rgba(2,2,10,0.85)" }} onClick={() => setShowAdd(false)} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ ease: [0.16,1,0.3,1], duration: 0.4 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 rounded-2xl overflow-y-auto"
            style={{ background: "var(--surface-2)", border: "1px solid rgba(200,146,15,0.2)", maxHeight: "90vh" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Add Hotel</h3>
              <button onClick={() => setShowAdd(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              {["Hotel Name","Location","Price Per Night ($)","Total Rooms"].map(label => (
                <div key={label}>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" placeholder={`Enter ${label.toLowerCase()}`} />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Stars</label>
                  <select className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(20,20,40,0.8)" }}>
                    {[3,4,5].map(s => <option key={s}>{s} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Status</label>
                  <select className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(20,20,40,0.8)" }}>
                    <option>Active</option><option>Seasonal</option><option>Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Amenities (comma separated)</label>
                <input className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" placeholder="Pool, Spa, Fine Dining, Butler..." />
              </div>
              <div className="flex gap-3 pt-2">
                <button className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>Add Hotel</button>
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}>Cancel</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
