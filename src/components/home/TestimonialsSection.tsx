"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  { id: 1, name: "Alexandra Chen", role: "Travel Photographer", location: "San Francisco", text: "LUXE transformed my photography expedition to Patagonia into a transcendent experience. Every detail was flawlessly orchestrated — from the private jet transfer to the remote wilderness lodge.", avatar: "AC", rating: 5 },
  { id: 2, name: "Marcus Beaumont", role: "CEO, Beaumont & Co.", location: "London", text: "I've traveled with every premium agency, but LUXE's AI planner suggested destinations I never would have discovered. The Kyoto temple stay during cherry blossom season was otherworldly.", avatar: "MB", rating: 5 },
  { id: 3, name: "Isabelle Laurent", role: "Fashion Director", location: "Paris", text: "The Maldives overwater villa package was absolutely impeccable. LUXE anticipated every wish before I even voiced it. This is what true luxury travel should feel like.", avatar: "IL", rating: 5 },
  { id: 4, name: "David Okafor", role: "Architect", location: "New York", text: "The architectural tour through Santorini's lesser-known villages was a revelation. LUXE doesn't just book travel — they curate experiences that reshape how you see the world.", avatar: "DO", rating: 5 },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-[700px] h-[700px] -translate-y-1/2 translate-x-1/3" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="section-divider mx-auto mb-4" />
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>Guest Stories</p>
          <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
            Voices of <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>Experience</em>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-10 lg:p-14 text-center" style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.1)" }}>
              <div className="flex justify-center mb-6">
                {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                  <span key={i} style={{ color: "#e4b020", fontSize: "20px" }}>★</span>
                ))}
              </div>
              <p className="text-xl lg:text-2xl font-light leading-relaxed mb-10" style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-secondary)", fontStyle: "italic" }}>
                "{TESTIMONIALS[active].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
                  {TESTIMONIALS[active].avatar}
                </div>
                <div className="text-left">
                  <div className="font-medium">{TESTIMONIALS[active].name}</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>{TESTIMONIALS[active].role} · {TESTIMONIALS[active].location}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-300" style={{ width: i === active ? "28px" : "8px", height: "8px", background: i === active ? "var(--gold)" : "rgba(200,146,15,0.3)" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
