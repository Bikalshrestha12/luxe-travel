"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: 180, suffix: "+", label: "Destinations Worldwide", description: "Across 6 continents" },
  { value: 4200, suffix: "+", label: "Luxury Hotels", description: "Rigorously curated" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", description: "From verified guests" },
  { value: 12, suffix: "K+", label: "Happy Travelers", description: "And counting" },
];

function CountUp({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!trigger) return;
    gsap.fromTo({ val: 0 }, { val: value }, {
      duration: 2.2, ease: "power2.out",
      onUpdate: function () { if (numRef.current) numRef.current.textContent = Math.round(this.targets()[0].val).toLocaleString(); },
      onComplete: () => { if (numRef.current) numRef.current.textContent = value.toLocaleString(); },
    });
  }, [trigger, value]);
  return <><span ref={numRef}>0</span>{suffix}</>;
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const forceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => { triggered.current = true; forceRef.current?.setAttribute("data-triggered", "true"); },
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32">
      <div ref={forceRef} className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="rounded-3xl p-12 lg:p-20 relative overflow-hidden" style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.1)" }}>
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,146,15,0.08) 0%, transparent 70%)" }} />

          <div className="relative z-10 text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--gold)" }}>By The Numbers</p>
            <h2 className="text-5xl lg:text-6xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
              Trusted By <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>Explorers</em> Worldwide
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl lg:text-6xl font-light text-gradient-gold mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
                  <CountUp value={stat.value} suffix={stat.suffix} trigger={true} />
                </div>
                <div className="text-base font-medium mb-1">{stat.label}</div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
