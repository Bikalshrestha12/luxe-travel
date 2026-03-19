"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const FOOTER_LINKS = {
  Explore: [
    { href: "/destinations", label: "Destinations" },
    { href: "/hotels", label: "Hotels" },
    { href: "/booking", label: "Flights" },
    { href: "/ai-planner", label: "AI Planner" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
};

export function Footer() {
  return (
    <footer
      className="relative mt-32 border-t"
      style={{
        borderTopColor: "rgba(200, 146, 15, 0.1)",
        background: "linear-gradient(to bottom, transparent, rgba(2,2,10,0.8))",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="#02020a" />
                </svg>
              </div>
              <span
                className="text-2xl font-light tracking-[0.15em] text-gradient-gold"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                LUXE TRAVEL
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Crafting cinematic journeys to the world's most extraordinary
              destinations. Where luxury meets adventure, and every trip becomes
              a story worth telling.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-xs transition-all duration-300 hover:border-gold-500"
                  style={{ color: "var(--text-muted)" }}
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-xs font-medium tracking-[0.2em] uppercase mb-6"
                style={{ color: "var(--gold)" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm animated-underline transition-colors duration-300 hover:text-text-primary"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-8 mb-12 border"
          style={{
            background: "rgba(200, 146, 15, 0.04)",
            borderColor: "rgba(200, 146, 15, 0.1)",
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl font-light mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Subscribe to our{" "}
                <span className="text-gradient-gold">Newsletter</span>
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Exclusive deals, hidden destinations, and travel inspiration.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="luxury-input flex-1 lg:w-72 px-5 py-3 rounded-full text-sm"
              />
              <button
                className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #c8920f, #e4b020)",
                  color: "#02020a",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderTopColor: "rgba(200, 146, 15, 0.08)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2025 LUXE TRAVEL. All rights reserved. Crafted with passion.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "#10b981" }}
            />
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
