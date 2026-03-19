"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string; };

const QUICK_PROMPTS = [
  "Plan a 7-day luxury trip to Japan in cherry blossom season",
  "Honeymoon in the Maldives with overwater villa, $10k budget",
  "Adventure safari in Kenya with family, 12 nights",
  "Solo cultural tour of Morocco's imperial cities",
];

export default function AIPlannerPage() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Welcome to LUXE AI Planner. I'm your personal travel intelligence, trained on thousands of luxury itineraries and exclusive insider knowledge.\n\nDescribe your dream journey — destination, duration, budget, travel style, or simply a feeling you want to experience. I'll craft a bespoke itinerary worthy of your aspirations."
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are the LUXE Travel AI Planner — an elite travel intelligence with deep expertise in luxury travel, exclusive destinations, and bespoke experiences. You help ultra-high-net-worth individuals plan extraordinary journeys.

Your responses should:
- Be warm, sophisticated, and inspiring
- Provide specific, actionable day-by-day itineraries when requested
- Suggest ultra-luxury accommodation (Aman, Six Senses, Singita, etc.)
- Include insider tips and hidden gems
- Factor in seasonality and local events
- Format clearly with sections, but keep it conversational and evocative
- Use rich travel language that makes the reader yearn to go

Keep responses to 3-5 paragraphs or a structured itinerary. Be specific with hotel names, restaurants, and experiences.`,
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: text }
          ]
        })
      });

      const data = await response.json();
      const aiText = data.content?.[0]?.text ?? "I apologize, I encountered an issue. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: aiText }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please ensure your API key is configured and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col" style={{ background: "var(--obsidian)" }}>
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 flex flex-col flex-1" style={{ height: "calc(100vh - 80px)" }}>
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-8 border-b flex items-center justify-between" style={{ borderColor: "rgba(200,146,15,0.1)" }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #c8920f)" }}>
                <span className="text-sm">✦</span>
              </div>
              <h1 className="text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                LUXE <span className="text-gradient-aurora">AI Planner</span>
              </h1>
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Powered by Claude · Trained on elite travel expertise</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10b981" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>Online</span>
          </div>
        </motion.div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="py-6 flex flex-wrap gap-3">
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)} className="px-4 py-2.5 rounded-full text-xs transition-all duration-300 text-left"
                style={{ background: "rgba(200,146,15,0.06)", border: "1px solid rgba(200,146,15,0.15)", color: "var(--text-secondary)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,146,15,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--gold-light)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,146,15,0.15)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                {p}
              </button>
            ))}
          </motion.div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(200,146,15,0.3) transparent" }}>
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-full flex-none flex items-center justify-center text-xs font-medium ${msg.role === "user" ? "" : ""}`}
                  style={{ background: msg.role === "assistant" ? "linear-gradient(135deg, #7c3aed, #c8920f)" : "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
                  {msg.role === "assistant" ? "✦" : "Y"}
                </div>

                {/* Bubble */}
                <div className={`max-w-2xl ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  <div className={`px-6 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap`}
                    style={{
                      background: msg.role === "assistant" ? "rgba(14,14,30,0.8)" : "rgba(200,146,15,0.12)",
                      border: `1px solid ${msg.role === "assistant" ? "rgba(200,146,15,0.1)" : "rgba(200,146,15,0.25)"}`,
                      color: "var(--text-primary)",
                      borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    }}>
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs" style={{ background: "linear-gradient(135deg, #7c3aed, #c8920f)", color: "#02020a" }}>✦</div>
              <div className="px-6 py-4 rounded-2xl" style={{ background: "rgba(14,14,30,0.8)", border: "1px solid rgba(200,146,15,0.1)" }}>
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="py-6 border-t" style={{ borderColor: "rgba(200,146,15,0.1)" }}>
          <div className="flex gap-3 items-end glass rounded-2xl px-5 py-4">
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1}
              placeholder="Describe your dream journey... (Press Enter to send)"
              className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none"
              style={{ color: "var(--text-primary)", minHeight: "24px", maxHeight: "120px", fontFamily: "var(--font-outfit)" }}
              onInput={e => { const t = e.currentTarget; t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }} />
            <button onClick={() => sendMessage(input)} disabled={loading || !input.trim()} className="w-10 h-10 rounded-full flex items-center justify-center flex-none transition-all duration-300 disabled:opacity-40"
              style={{ background: input.trim() ? "linear-gradient(135deg, #c8920f, #e4b020)" : "rgba(200,146,15,0.1)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l4 6-4 6 12-6z" fill={input.trim() ? "#02020a" : "var(--gold)"} />
              </svg>
            </button>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: "var(--text-muted)" }}>AI responses are for inspiration. Confirm all bookings with our specialists.</p>
        </div>
      </div>
    </div>
  );
}
