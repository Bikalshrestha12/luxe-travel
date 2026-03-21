"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DESTINATIONS = [
  { id: 1, name: "Santorini", country: "Greece", continent: "Europe", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=70", status: "active", bookings: 42, revenue: 188600, rating: 4.9, featured: true },
  { id: 2, name: "Kyoto", country: "Japan", continent: "Asia", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=70", status: "active", bookings: 38, revenue: 176200, rating: 4.8, featured: true },
  { id: 3, name: "Maldives", country: "Indian Ocean", continent: "Asia", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=70", status: "active", bookings: 48, revenue: 278400, rating: 5.0, featured: true },
  { id: 4, name: "Patagonia", country: "Argentina", continent: "South America", image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=70", status: "active", bookings: 29, revenue: 243800, rating: 4.7, featured: false },
  { id: 5, name: "Amalfi Coast", country: "Italy", continent: "Europe", image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=70", status: "active", bookings: 35, revenue: 154000, rating: 4.9, featured: false },
  { id: 6, name: "Bali", country: "Indonesia", continent: "Asia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70", status: "draft", bookings: 0, revenue: 0, rating: 0, featured: false },
];

export default function DestinationsAdminPage() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [destinations, setDestinations] = useState(DESTINATIONS);

  const filtered = destinations.filter(d =>
    !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFeatured = (id: number) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, featured: !d.featured } : d));
  };

  const toggleStatus = (id: number) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, status: d.status === "active" ? "draft" : "active" } : d));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Destinations</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{destinations.length} destinations · {destinations.filter(d => d.featured).length} featured</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium self-start"
          style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add Destination
        </button>
      </div>

      <div className="relative mb-6">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
          <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search destinations..." className="luxury-input w-full pl-10 py-2.5 rounded-xl text-sm max-w-sm" style={{ background: "rgba(14,14,30,0.8)" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <AnimatePresence>
          {filtered.map((dest, i) => (
            <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden group" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
              <div className="relative h-44 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(14,14,30,0.8) 0%,transparent 60%)" }} />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium`}
                    style={{ background: dest.status === "active" ? "rgba(16,185,129,0.2)" : "rgba(240,240,242,0.1)", color: dest.status === "active" ? "#10b981" : "var(--text-muted)", backdropFilter: "blur(10px)" }}>
                    {dest.status}
                  </span>
                  {dest.featured && <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(200,146,15,0.3)", color: "#e4b020", backdropFilter: "blur(10px)" }}>★ Featured</span>}
                </div>
                {dest.rating > 0 && (
                  <div className="absolute bottom-3 right-3 glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
                    <span style={{ color: "#e4b020", fontSize: "10px" }}>★</span>
                    <span className="text-xs font-medium">{dest.rating}</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)" }}>{dest.name}</h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{dest.country} · {dest.continent}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => toggleFeatured(dest.id)} title={dest.featured ? "Remove from featured" : "Add to featured"}
                      className="p-1.5 rounded-lg transition-colors" style={{ color: dest.featured ? "#e4b020" : "var(--text-muted)", background: dest.featured ? "rgba(200,146,15,0.1)" : "transparent" }}>★</button>
                    <button className="p-1.5 rounded-lg transition-colors" style={{ color: "var(--text-muted)" }}>✏</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center pt-3 border-t" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
                  <div>
                    <div className="text-base font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold-light)" }}>{dest.bookings}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Bookings</div>
                  </div>
                  <div>
                    <div className="text-base font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold-light)" }}>
                      {dest.revenue > 0 ? `$${(dest.revenue/1000).toFixed(0)}K` : "—"}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>Revenue</div>
                  </div>
                </div>
                <button onClick={() => toggleStatus(dest.id)} className="w-full mt-3 py-2 rounded-lg text-xs transition-all duration-200"
                  style={{ border: `1px solid ${dest.status === "active" ? "rgba(226,75,74,0.2)" : "rgba(16,185,129,0.2)"}`, color: dest.status === "active" ? "#f09595" : "#10b981" }}>
                  {dest.status === "active" ? "Deactivate" : "Activate"}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ background: "rgba(2,2,10,0.85)" }} onClick={() => setShowAdd(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ ease: [0.16,1,0.3,1], duration: 0.4 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6 rounded-2xl overflow-y-auto"
              style={{ background: "var(--surface-2)", border: "1px solid rgba(200,146,15,0.2)", maxHeight: "90vh" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Add Destination</h3>
                <button onClick={() => setShowAdd(false)} style={{ color: "var(--text-muted)" }}>✕</button>
              </div>
              <div className="space-y-4">
                {["Destination Name","Country","Continent","Starting Price ($)","Description"].map(label => (
                  <div key={label}>
                    <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                    {label === "Description" ? (
                      <textarea rows={3} className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm resize-none" placeholder={`Enter ${label.toLowerCase()}`} />
                    ) : (
                      <input className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" placeholder={`Enter ${label.toLowerCase()}`} />
                    )}
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Status</label>
                  <select className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(20,20,40,0.8)" }}>
                    <option>Active</option><option>Draft</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="feat" style={{ accentColor: "#c8920f" }} />
                  <label htmlFor="feat" className="text-sm" style={{ color: "var(--text-secondary)" }}>Feature on homepage</label>
                </div>
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>Add Destination</button>
                  <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}>Cancel</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
