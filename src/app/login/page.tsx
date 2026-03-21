"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated, user } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"login" | "register">("login");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(user.role === "admin" ? "/admin" : "/");
    }
  }, [isAuthenticated, user, router]);

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }[] = [];

    const colors = ["rgba(200,146,15,", "rgba(228,176,32,", "rgba(243,220,133,", "rgba(0,212,255,"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ")";
        ctx.fill();
      });
      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(200,146,15,${0.06 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", handleResize); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email"); return; }

    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || "Login failed");
    }
  };

  const fillDemo = (role: "admin" | "user") => {
    if (role === "admin") { setEmail("admin@luxetravel.co"); setPassword("admin123"); }
    else { setEmail("user@luxetravel.co"); setPassword("user123"); }
    setError("");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: "var(--obsidian)" }}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Left Panel — Branding (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col justify-between w-[55%] relative p-14 overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-1/3 left-1/4 w-125 h-125 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(200,146,15,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-75 h-75 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)" }} />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" />
            </svg>
          </div>
          <span className="text-2xl font-light tracking-[0.15em] text-gradient-gold"
            style={{ fontFamily: "var(--font-cormorant)" }}>LUXE TRAVEL</span>
        </Link>

        {/* Hero text */}
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}>
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "var(--gold)" }}>
              Welcome Back
            </p>
            <h1 className="text-6xl xl:text-7xl font-light leading-none mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}>
              Every Journey<br />Begins with<br />
              <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>One Step</em>
            </h1>
            <p className="text-base leading-relaxed max-w-md" style={{ color: "var(--text-secondary)", fontWeight: 300 }}>
              Sign in to access your personalized travel dashboard, manage bookings,
              and unlock exclusive destinations curated just for you.
            </p>
          </motion.div>

          {/* Feature highlights */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-12 grid grid-cols-3 gap-6">
            {[
              { icon: "✦", label: "AI Planner", desc: "Bespoke itineraries" },
              { icon: "◈", label: "24/7 Support", desc: "Always available" },
              { icon: "⬡", label: "Exclusive Access", desc: "Members only" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="rounded-2xl p-4"
                style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.1)" }}>
                <div className="text-lg mb-2" style={{ color: "var(--gold)" }}>{icon}</div>
                <div className="text-sm font-medium mb-0.5">{label}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}
          className="relative z-10 rounded-2xl p-6" style={{ background: "rgba(200,146,15,0.04)", border: "1px solid rgba(200,146,15,0.1)" }}>
          <div className="flex gap-1 mb-3">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#e4b020", fontSize: "12px" }}>★</span>)}</div>
          <p className="text-sm leading-relaxed italic mb-4" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-cormorant)", fontSize: "16px" }}>
            "LUXE transformed how I experience travel. Every trip feels like a private expedition."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>IL</div>
            <div>
              <div className="text-sm font-medium">Isabelle Laurent</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Fashion Director, Paris</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Panel — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-3 lg:hidden mb-10">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" />
              </svg>
            </div>
            <span className="text-xl font-light tracking-[0.15em] text-gradient-gold"
              style={{ fontFamily: "var(--font-cormorant)" }}>LUXE TRAVEL</span>
          </Link>

          {/* Tab switcher */}
          <div className="flex rounded-xl p-1 mb-8 gap-1" style={{ background: "rgba(200,146,15,0.06)", border: "1px solid rgba(200,146,15,0.1)" }}>
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(""); }}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-300"
                style={{
                  background: tab === t ? "linear-gradient(135deg, #c8920f, #e4b020)" : "transparent",
                  color: tab === t ? "#02020a" : "var(--text-secondary)",
                }}>
                {t === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Demo credentials */}
          <div className="mb-6 rounded-xl p-4" style={{ background: "rgba(200,146,15,0.05)", border: "1px solid rgba(200,146,15,0.12)" }}>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "var(--gold)" }}>Demo credentials</span> — click to auto-fill:
            </p>
            <div className="flex gap-2">
              <button onClick={() => fillDemo("admin")} className="flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                style={{ background: "rgba(200,146,15,0.12)", border: "1px solid rgba(200,146,15,0.2)", color: "var(--gold-light)" }}>
                ⚡ Admin Login
              </button>
              <button onClick={() => fillDemo("user")} className="flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                style={{ background: "rgba(200,146,15,0.06)", border: "1px solid rgba(200,146,15,0.12)", color: "var(--text-secondary)" }}>
                👤 User Login
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {tab === "register" && (
                <motion.div key="name-field" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                  <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)" }}>Full Name</label>
                  <input type="text" placeholder="Your full name" className="luxury-input w-full px-4 py-3.5 rounded-xl text-sm"
                    style={{ background: focusedField === "name" ? "rgba(20,20,40,0.9)" : "rgba(14,14,30,0.6)" }}
                    onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs tracking-[0.15em] uppercase mb-2" style={{ color: "var(--text-muted)" }}>Email Address</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com" autoComplete="email"
                  className="luxury-input w-full px-4 py-3.5 rounded-xl text-sm pl-11"
                  style={{ background: focusedField === "email" ? "rgba(20,20,40,0.9)" : "rgba(14,14,30,0.6)" }}
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} />
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs tracking-[0.15em] uppercase" style={{ color: "var(--text-muted)" }}>Password</label>
                {tab === "login" && (
                  <button type="button" className="text-xs transition-colors"
                    style={{ color: "var(--gold-light)" }}>Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={tab === "login" ? "Enter your password" : "Create a strong password"}
                  autoComplete={tab === "login" ? "current-password" : "new-password"}
                  className="luxury-input w-full px-4 py-3.5 rounded-xl text-sm pl-11 pr-11"
                  style={{ background: focusedField === "password" ? "rgba(20,20,40,0.9)" : "rgba(14,14,30,0.6)" }}
                  onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)} />
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <circle cx="7" cy="9.5" r="1" fill="currentColor" />
                  </svg>
                </div>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: showPass ? "var(--gold)" : "var(--text-muted)" }}>
                  {showPass ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7S3.5 2.5 7 2.5 13 7 13 7s-2.5 4.5-6 4.5S1 7 1 7z" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M5.5 5.7A2 2 0 0 0 7 9a2 2 0 0 0 1.8-2.7M3 3.5C1.9 4.5 1 6 1 7c0 0 2.5 4.5 6 4.5 1.1 0 2.1-.3 3-.8M10.5 4C11.7 5 13 6.4 13 7c0 0-2.5 4.5-6 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {tab === "login" && (
              <div className="flex items-center gap-3">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-yellow-500" style={{ accentColor: "#c8920f" }} />
                <label htmlFor="remember" className="text-xs" style={{ color: "var(--text-muted)" }}>Remember me for 30 days</label>
              </div>
            )}

            {tab === "register" && (
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 rounded" style={{ accentColor: "#c8920f" }} />
                <label htmlFor="terms" className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  I agree to the <span style={{ color: "var(--gold-light)" }}>Terms of Service</span> and <span style={{ color: "var(--gold-light)" }}>Privacy Policy</span>
                </label>
              </div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="rounded-xl px-4 py-3 text-sm flex items-center gap-2"
                  style={{ background: "rgba(226,75,74,0.1)", border: "1px solid rgba(226,75,74,0.2)", color: "#f09595" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button type="submit" disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
              style={{ background: isLoading ? "rgba(200,146,15,0.4)" : "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-obsidian-900 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#02020a", borderTopColor: "transparent" }} />
                  Authenticating...
                </>
              ) : (
                <>
                  {tab === "login" ? "Sign In to LUXE" : "Create Account"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "rgba(200,146,15,0.1)" }} />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>or continue with</span>
            <div className="flex-1 h-px" style={{ background: "rgba(200,146,15,0.1)" }} />
          </div>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "G" },
              { label: "Apple", icon: "" },
            ].map(({ label, icon }) => (
              <button key={label} className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                style={{ background: "rgba(200,146,15,0.05)", border: "1px solid rgba(200,146,15,0.12)", color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,146,15,0.3)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,146,15,0.12)"; }}>
                <span className="font-bold text-base">{icon}</span>
                {label}
              </button>
            ))}
          </div>

          <p className="text-center text-xs mt-8" style={{ color: "var(--text-muted)" }}>
            {tab === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setTab(tab === "login" ? "register" : "login"); setError(""); }}
              className="transition-colors" style={{ color: "var(--gold-light)" }}>
              {tab === "login" ? "Create one" : "Sign in"}
            </button>
          </p>

          <p className="text-center text-xs mt-4" style={{ color: "var(--text-muted)" }}>
            <Link href="/" className="transition-colors" style={{ color: "var(--text-muted)" }}>
              ← Back to homepage
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
