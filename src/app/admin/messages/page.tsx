"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  { id: 1, from: "Isabella Laurent", email: "i.laurent@email.com", subject: "Honeymoon Package Inquiry", message: "We're planning our honeymoon for next June and would love a bespoke package covering the Maldives and possibly ending in Bali. Budget is around $25,000 for 14 nights. Could you help curate something magical?", time: "2 hours ago", status: "unread", priority: "high", avatar: "IL" },
  { id: 2, from: "Marcus Chen", email: "m.chen@email.com", subject: "Kyoto Booking Amendment", message: "I need to change my check-in date for the Aman Kyoto reservation BK-2840 from July 28 to August 3. Please let me know if this is possible and if there are any additional charges.", time: "4 hours ago", status: "read", priority: "medium", avatar: "MC" },
  { id: 3, from: "David Okafor", email: "d.okafor@email.com", subject: "Safari Group Booking", message: "We're a group of 8 colleagues looking to do a corporate safari retreat in Kenya. Would you be able to accommodate a private camp? Dates are flexible — November or December 2025.", time: "Yesterday", status: "replied", priority: "high", avatar: "DO" },
  { id: 4, from: "Sophie Wilson", email: "s.wilson@email.com", subject: "General Enquiry — New Member", message: "I've just signed up to LUXE and wanted to understand how the AI planner works. I have a vague idea of destinations but don't know where to start!", time: "Yesterday", status: "unread", priority: "low", avatar: "SW" },
  { id: 5, from: "Thomas Bergmann", email: "t.bergmann@email.com", subject: "Iceland Northern Lights Package", message: "I'm interested in your Iceland package for January 2026. Specifically, I want guaranteed aurora viewing nights with a private guide. What are the options?", time: "2 days ago", status: "read", priority: "medium", avatar: "TB" },
];

const PRIORITY_STYLE: Record<string, { color: string }> = {
  high: { color: "#f09595" },
  medium: { color: "#e4b020" },
  low: { color: "#10b981" },
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  unread: { bg: "rgba(0,212,255,0.1)", color: "#00d4ff" },
  read: { bg: "rgba(200,146,15,0.08)", color: "var(--text-muted)" },
  replied: { bg: "rgba(16,185,129,0.1)", color: "#10b981" },
};

export default function MessagesPage() {
  const [selected, setSelected] = useState<typeof MESSAGES[0] | null>(MESSAGES[0]);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const markRead = (id: number) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: "read" } : m));
  };

  const sendReply = () => {
    if (!reply.trim() || !selected) return;
    setMessages(prev => prev.map(m => m.id === selected.id ? { ...m, status: "replied" } : m));
    setReply("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>Messages</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{messages.filter(m => m.status === "unread").length} unread</p>
        </div>
      </div>

      <div className="flex gap-5 h-[calc(100vh-220px)]">
        {/* Message List */}
        <div className="w-full sm:w-80 flex-none rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
          <div className="p-3 border-b" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
            <div className="relative">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/><path d="M8 8l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input placeholder="Search messages..." className="luxury-input w-full pl-8 py-2 rounded-lg text-xs" style={{ background: "rgba(14,14,30,0.8)" }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} onClick={() => { setSelected(msg); markRead(msg.id); }}
                className="p-4 border-b cursor-pointer transition-colors"
                style={{ borderColor: "rgba(200,146,15,0.04)", background: selected?.id === msg.id ? "rgba(200,146,15,0.06)" : "transparent" }}
                onMouseEnter={e => { if (selected?.id !== msg.id) (e.currentTarget as HTMLDivElement).style.background = "rgba(200,146,15,0.02)"; }}
                onMouseLeave={e => { if (selected?.id !== msg.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex-none flex items-center justify-center text-xs font-medium"
                    style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>{msg.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={`text-xs font-medium truncate ${msg.status === "unread" ? "" : ""}`}>{msg.from}</span>
                      <span className="text-xs flex-none" style={{ color: "var(--text-muted)" }}>{msg.time}</span>
                    </div>
                    <div className="text-xs font-medium truncate mb-1" style={{ color: msg.status === "unread" ? "var(--text-primary)" : "var(--text-secondary)" }}>{msg.subject}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: STATUS_STYLE[msg.status].bg, color: STATUS_STYLE[msg.status].color, fontSize: "9px" }}>{msg.status}</span>
                      <span style={{ color: PRIORITY_STYLE[msg.priority].color, fontSize: "9px" }}>● {msg.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} className="flex-1 min-w-0 rounded-2xl flex flex-col overflow-hidden hidden sm:flex"
              style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
              {/* Header */}
              <div className="px-6 py-5 border-b flex items-start justify-between gap-4" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
                <div>
                  <h3 className="text-lg font-medium mb-1">{selected.subject}</h3>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>From: <span style={{ color: "var(--text-secondary)" }}>{selected.from}</span></span>
                    <span>·</span>
                    <span>{selected.email}</span>
                    <span>·</span>
                    <span>{selected.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-none">
                  <button className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-muted)" }}>Archive</button>
                  <button className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ border: "1px solid rgba(226,75,74,0.15)", color: "#f09595" }}>Delete</button>
                </div>
              </div>

              {/* Message body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full flex-none flex items-center justify-center font-medium"
                    style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>{selected.avatar}</div>
                  <div className="flex-1">
                    <div className="rounded-2xl p-5 text-sm leading-relaxed" style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.08)" }}>
                      {selected.message}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply box */}
              <div className="p-4 border-t" style={{ borderColor: "rgba(200,146,15,0.06)" }}>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,146,15,0.15)" }}>
                  <textarea value={reply} onChange={e => setReply(e.target.value)} rows={3} placeholder={`Reply to ${selected.from}...`}
                    className="w-full px-4 py-3 text-sm resize-none outline-none" style={{ background: "rgba(14,14,30,0.8)", color: "var(--text-primary)", fontFamily: "var(--font-outfit)" }} />
                  <div className="flex items-center justify-between px-4 py-3 border-t" style={{ borderColor: "rgba(200,146,15,0.08)", background: "rgba(14,14,30,0.4)" }}>
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>Reply as Alexandra Chen</span>
                    <button onClick={sendReply} disabled={!reply.trim()} className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-medium transition-all"
                      style={{ background: reply.trim() ? "linear-gradient(135deg,#c8920f,#e4b020)" : "rgba(200,146,15,0.15)", color: reply.trim() ? "#02020a" : "var(--text-muted)" }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M11 6H1M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 hidden sm:flex items-center justify-center rounded-2xl" style={{ background: "var(--surface)", border: "1px solid rgba(200,146,15,0.08)" }}>
              <div className="text-center" style={{ color: "var(--text-muted)" }}>
                <div className="text-4xl mb-3">✉</div>
                <p className="text-sm">Select a message to view</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
