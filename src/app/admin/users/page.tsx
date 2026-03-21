"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USERS = [
  { id: "U001", name: "Isabella Laurent", email: "i.laurent@email.com", role: "user", status: "active", joined: "2024-01-15", bookings: 12, spent: 89400, location: "Paris, FR", avatar: "IL" },
  { id: "U002", name: "Marcus Chen", email: "m.chen@email.com", role: "user", status: "active", joined: "2024-03-20", bookings: 8, spent: 54200, location: "New York, US", avatar: "MC" },
  { id: "U003", name: "Sophia Williams", email: "s.williams@email.com", role: "user", status: "active", joined: "2023-11-08", bookings: 21, spent: 142800, location: "London, UK", avatar: "SW" },
  { id: "U004", name: "David Okafor", email: "d.okafor@email.com", role: "user", status: "active", joined: "2024-05-12", bookings: 4, spent: 38600, location: "Lagos, NG", avatar: "DO" },
  { id: "U005", name: "Elena Vasquez", email: "e.vasquez@email.com", role: "user", status: "suspended", joined: "2023-08-29", bookings: 3, spent: 12400, location: "Madrid, ES", avatar: "EV" },
  { id: "U006", name: "Thomas Bergmann", email: "t.bergmann@email.com", role: "user", status: "active", joined: "2024-02-14", bookings: 6, spent: 29800, location: "Berlin, DE", avatar: "TB" },
  { id: "U007", name: "Alexandra Chen", email: "admin@luxetravel.co", role: "admin", status: "active", joined: "2023-01-15", bookings: 0, spent: 0, location: "San Francisco, US", avatar: "AC" },
  { id: "U008", name: "Aisha Patel", email: "a.patel@email.com", role: "user", status: "active", joined: "2024-07-03", bookings: 5, spent: 67200, location: "Mumbai, IN", avatar: "AP" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = USERS.filter(u =>
    (roleFilter === "all" || u.role === roleFilter) &&
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Users</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{USERS.length} registered accounts</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium self-start"
          style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Add User
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", value: USERS.length, icon: "◉", color: "#c8920f" },
          { label: "Active", value: USERS.filter(u => u.status === "active").length, icon: "✓", color: "#10b981" },
          { label: "Admins", value: USERS.filter(u => u.role === "admin").length, icon: "⚡", color: "#7c3aed" },
          { label: "Suspended", value: USERS.filter(u => u.status === "suspended").length, icon: "✕", color: "#f09595" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="rounded-xl p-4" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color, fontSize: "14px" }}>{icon}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
            </div>
            <div className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)", color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="luxury-input w-full pl-10 py-2.5 rounded-xl text-sm" style={{ background: "rgba(14,14,30,0.8)" }} />
        </div>
        <div className="flex gap-2">
          {["all","user","admin"].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} className="px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all"
              style={{ background: roleFilter === r ? "linear-gradient(135deg,#c8920f,#e4b020)" : "rgba(200,146,15,0.05)", color: roleFilter === r ? "#02020a" : "var(--text-muted)", border: "1px solid rgba(200,146,15,0.1)" }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              onClick={() => setSelectedUser(selectedUser?.id === user.id ? null : user)}
              className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
              style={{ background: "var(--surface)", border: selectedUser?.id === user.id ? "1px solid rgba(200,146,15,0.4)" : "1px solid rgba(200,146,15,0.08)" }}
              onMouseEnter={e => { if (selectedUser?.id !== user.id) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.2)"; }}
              onMouseLeave={e => { if (selectedUser?.id !== user.id) (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,146,15,0.08)"; }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex-none flex items-center justify-center font-medium"
                  style={{ background: user.role === "admin" ? "linear-gradient(135deg,#7c3aed,#c8920f)" : "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-medium text-sm">{user.name}</div>
                    {user.role === "admin" && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>Admin</span>}
                    <span className={`text-xs px-2 py-0.5 rounded-full ml-auto`}
                      style={{ background: user.status === "active" ? "rgba(16,185,129,0.1)" : "rgba(226,75,74,0.1)", color: user.status === "active" ? "#10b981" : "#f09595" }}>
                      {user.status}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>{user.email}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>📍 {user.location}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-2 text-center" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
                <div>
                  <div className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold-light)" }}>{user.bookings}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Bookings</div>
                </div>
                <div>
                  <div className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)", color: "var(--gold-light)" }}>${(user.spent / 1000).toFixed(0)}K</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Spent</div>
                </div>
                <div>
                  <div className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {new Date(user.joined).getFullYear()}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Joined</div>
                </div>
              </div>

              {selectedUser?.id === user.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 flex gap-2">
                  <button className="flex-1 py-2 rounded-lg text-xs font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>Edit</button>
                  {user.status === "active"
                    ? <button className="flex-1 py-2 rounded-lg text-xs" style={{ border: "1px solid rgba(226,75,74,0.3)", color: "#f09595" }}>Suspend</button>
                    : <button className="flex-1 py-2 rounded-lg text-xs" style={{ border: "1px solid rgba(16,185,129,0.3)", color: "#10b981" }}>Activate</button>}
                  <button className="px-3 py-2 rounded-lg text-xs" style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}>✉</button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50" style={{ background: "rgba(2,2,10,0.8)" }} onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ ease: [0.16,1,0.3,1], duration: 0.4 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-2xl"
              style={{ background: "var(--surface-2)", border: "1px solid rgba(200,146,15,0.2)" }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Add New User</h3>
                <button onClick={() => setShowAddModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
              </div>
              <div className="space-y-4">
                {["Full Name","Email Address","Phone Number"].map(label => (
                  <div key={label}>
                    <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                    <input className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" placeholder={`Enter ${label.toLowerCase()}`} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs tracking-wider uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>Role</label>
                  <select className="luxury-input w-full px-4 py-2.5 rounded-xl text-sm" style={{ background: "rgba(20,20,40,0.8)" }}>
                    <option>User</option><option>Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>Create User</button>
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}>Cancel</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
