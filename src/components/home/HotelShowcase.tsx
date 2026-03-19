"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hotels } from "@/lib/mockData";

export function HotelShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  const featured = hotels.filter((h) => h.featured).slice(0, 4);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = sectionRef.current?.querySelectorAll(".hotel-card");
    if (!cards) return;

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span
              className="text-xs tracking-[0.4em] uppercase block mb-4"
              style={{ color: "var(--gold)" }}
            >
              ✦ Handpicked Properties
            </span>
            <h2
              className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Extraordinary
              <br />
              <span className="text-gradient-gold italic">Hotels & Resorts</span>
            </h2>
          </div>
          <Link
            href="/hotels"
            className="hidden lg:flex items-center gap-2 text-sm animated-underline"
            style={{ color: "var(--text-secondary)" }}
          >
            View all hotels
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Grid layout — 2 large + 2 small */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Large card */}
          {featured[0] && (
            <Link
              href={`/hotels/${featured[0].id}`}
              className="hotel-card lg:col-span-7 group relative rounded-3xl overflow-hidden cursor-none"
              style={{ height: "520px" }}
            >
              <Image
                src={featured[0].image}
                alt={featured[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(2,2,10,0.85) 0%, transparent 60%)" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "rgba(200,146,15,0.05)" }}
              />
              <div className="absolute top-5 left-5 flex gap-2">
                <span className="tag">{featured[0].category}</span>
              </div>
              <div className="absolute bottom-0 p-8">
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--gold)" }}>
                  {featured[0].destination}, {featured[0].country}
                </p>
                <h3
                  className="text-4xl font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {featured[0].name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {featured[0].amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-xs" style={{ color: "var(--text-muted)" }}>
                        · {a}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="text-2xl font-light text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)" }}>
                      ${featured[0].pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-xs ml-1" style={{ color: "var(--text-muted)" }}>/night</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Right column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {featured.slice(1, 3).map((hotel) => (
              <Link
                key={hotel.id}
                href={`/hotels/${hotel.id}`}
                className="hotel-card group relative rounded-3xl overflow-hidden cursor-none flex-1"
                style={{ height: "246px" }}
              >
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(2,2,10,0.8) 0%, transparent 60%)" }}
                />
                <div className="absolute top-4 left-4">
                  <span className="tag text-[10px]">{hotel.category}</span>
                </div>
                <div className="absolute bottom-0 p-5">
                  <h3
                    className="text-xl font-light mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {hotel.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {hotel.destination}
                    </p>
                    <span className="text-lg font-light text-gradient-gold" style={{ fontFamily: "var(--font-cormorant)" }}>
                      ${hotel.pricePerNight.toLocaleString()}<span className="text-xs text-gray-500 ml-1">/night</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
