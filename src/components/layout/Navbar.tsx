"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/hotels", label: "Hotels" },
  { href: "/booking", label: "Booking" },
  { href: "/ai-planner", label: "AI Planner" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  // Don't render navbar on admin or login pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: "power4.out" });
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-90 transition-all duration-500 ${scrolled ? "py-3 glass border-b" : "py-5"}`}
        style={{ borderBottomColor: scrolled ? "rgba(200,146,15,0.1)" : "transparent" }}>
        <div className="max-w-350 mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" /></svg>
            </div>
            <span className="text-xl font-light tracking-[0.15em] text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)" }}>LUXE</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={`animated-underline text-sm tracking-wider transition-colors duration-300`}
                  style={{ color: pathname === href ? "#e4b020" : "rgba(240,240,242,0.6)", fontWeight: 300, letterSpacing: "0.08em" }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3 relative">
                {user.role === "admin" && (
                  <Link href="/admin" className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", color: "#a78bfa" }}>
                    ⚡ Admin Panel
                  </Link>
                )}
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-2 rounded-full transition-all"
                  style={{ background: "rgba(200,146,15,0.08)", border: "1px solid rgba(200,146,15,0.15)" }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
                    {user.avatar}
                  </div>
                  <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{user.name.split(" ")[0]}</span>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: "var(--text-muted)" }}>
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* User dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 z-20 rounded-2xl p-2 min-w-45"
                        style={{ background: "var(--surface-2)", border: "1px solid rgba(200,146,15,0.15)", boxShadow: "0 20px 40px rgba(2,2,10,0.6)" }}>
                        <div className="px-3 py-2 mb-1">
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{user.email}</div>
                        </div>
                        <div className="h-px mb-1" style={{ background: "rgba(200,146,15,0.08)" }} />
                        {[
                          { label: "My Bookings", href: "/booking" },
                          { label: "AI Planner", href: "/ai-planner" },
                          ...(user.role === "admin" ? [{ label: "Admin Panel", href: "/admin" }] : []),
                        ].map(({ label, href }) => (
                          <Link key={href} href={href} onClick={() => setUserMenuOpen(false)}
                            className="block px-3 py-2 rounded-xl text-sm transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(200,146,15,0.08)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}>
                            {label}
                          </Link>
                        ))}
                        <div className="h-px my-1" style={{ background: "rgba(200,146,15,0.08)" }} />
                        <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-xl text-sm transition-colors"
                          style={{ color: "#f09595" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(226,75,74,0.08)"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                          Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                    style={{ border: "1px solid rgba(200,146,15,0.3)", color: "var(--gold-light)", background: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(200,146,15,0.08)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                    Sign In
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-5 py-2 rounded-full text-sm font-medium" style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
                    Book Now
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-px" style={{ background: "#e4b020" }} />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px" style={{ background: "#e4b020" }} />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-px" style={{ background: "#e4b020" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-85 flex flex-col justify-center" style={{ background: "rgba(2, 2, 10, 0.97)" }}>
            <div className="px-8 pt-24">
              <ul className="flex flex-col gap-5 mb-10">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li key={href} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                    <Link href={href} onClick={() => setMenuOpen(false)} className="text-4xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)", color: pathname === href ? "#e4b020" : "rgba(240,240,242,0.7)" }}>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {isAuthenticated && user ? (
                <div className="space-y-3">
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMenuOpen(false)} className="block w-full text-center py-3 rounded-full text-sm font-medium"
                      style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", color: "#a78bfa" }}>
                      ⚡ Admin Panel
                    </Link>
                  )}
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-center py-3 rounded-full text-sm font-medium"
                    style={{ border: "1px solid rgba(226,75,74,0.2)", color: "#f09595" }}>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-3 rounded-full text-sm font-medium"
                    style={{ border: "1px solid rgba(200,146,15,0.3)", color: "var(--gold-light)" }}>
                    Sign In
                  </Link>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-3 rounded-full text-sm font-medium"
                    style={{ background: "linear-gradient(135deg,#c8920f,#e4b020)", color: "#02020a" }}>
                    Book Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
