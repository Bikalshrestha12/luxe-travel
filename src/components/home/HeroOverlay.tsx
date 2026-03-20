"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function HeroOverlay() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(
      tagRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
    )
      .fromTo(
        titleRef.current?.querySelectorAll(".hero-line") ?? [],
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.4,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.4",
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6",
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.3",
      );
  }, []);

  return (
    <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 lg:px-20 pt-24">
      <div className="max-w-350 mx-auto w-full">
        <div ref={tagRef} className="mb-8 opacity-0">
          <span className="tag">
            <span
              className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse inline-block"
              style={{ background: "#10b981" }}
            />
            Redefining Luxury Travel
          </span>
        </div>

        <h1
          ref={titleRef}
          className="mb-8 leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 9vw, 10rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {["Journey", "Beyond", "Imagination"].map((word, i) => (
            <span
              key={i}
              className="block overflow-hidden"
              style={{ lineHeight: 1.05 }}
            >
              <span className="hero-line block">
                {i === 1 ? (
                  <em
                    className="text-gradient-gold"
                    style={{ fontStyle: "italic" }}
                  >
                    {word}
                  </em>
                ) : (
                  word
                )}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 max-w-xl text-lg leading-relaxed mb-12"
          style={{ color: "var(--text-secondary)", fontWeight: 300 }}
        >
          Discover extraordinary destinations through cinematic experiences.
          Luxury hotels, curated adventures, and AI-powered travel planning
          crafted for the discerning explorer.
        </p>

        <div
          ref={ctaRef}
          className="opacity-0 flex flex-wrap items-center gap-5"
        >
          <Link href="/destinations">
            <MagneticButton variant="gold" size="lg" strength={30}>
              Explore Destinations
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MagneticButton>
          </Link>
          <Link href="/booking">
            <MagneticButton variant="outline" size="lg" strength={30}>
              Book a Journey
            </MagneticButton>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-wrap gap-10 mt-20"
        >
          {[
            { number: "180+", label: "Destinations" },
            { number: "4,200+", label: "Luxury Hotels" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "12K+", label: "Happy Travelers" },
          ].map(({ number, label }) => (
            <div key={label}>
              <div
                className="text-3xl font-light text-gradient-gold"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {number}
              </div>
              <div
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-px h-16"
          style={{
            background:
              "linear-gradient(to bottom, rgba(200,146,15,0.6), transparent)",
          }}
        />
      </div>
    </div>
  );
}
