"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";

const DESTINATIONS = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    tag: "Mediterranean",
    price: "From $2,400",
    rating: 4.9,
    duration: "7 nights",
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    tag: "Cultural",
    price: "From $3,100",
    rating: 4.8,
    duration: "10 nights",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Indian Ocean",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    tag: "Paradise",
    price: "From $5,800",
    rating: 5.0,
    duration: "5 nights",
  },
  {
    id: 4,
    name: "Patagonia",
    country: "Argentina",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    tag: "Adventure",
    price: "From $4,200",
    rating: 4.7,
    duration: "14 nights",
  },
  {
    id: 5,
    name: "Amalfi Coast",
    country: "Italy",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    tag: "Coastal",
    price: "From $2,900",
    rating: 4.9,
    duration: "8 nights",
  },
];

function DestCard({
  dest,
  index,
}: {
  dest: (typeof DESTINATIONS)[0];
  index: number;
}) {
  return (
    <motion.div
      className="relative flex-none w-85 lg:w-105 group"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="relative h-130 rounded-2xl overflow-hidden card-hover"
        style={{ border: "1px solid var(--border)" }}
      >
        <div className="absolute inset-0">
          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(2,2,10,0.95) 0%, rgba(2,2,10,0.3) 50%, transparent 100%)",
            }}
          />
        </div>
        <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
          <span className="tag">{dest.tag}</span>
          <div className="glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
            <span style={{ color: "#e4b020", fontSize: "12px" }}>★</span>
            <span className="text-xs font-medium">{dest.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mb-4">
            <h3
              className="text-3xl font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {dest.name}
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {dest.country}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Starting from
              </div>
              <div className="text-lg font-medium text-gradient-gold">
                {dest.price}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Duration
              </div>
              <div className="text-sm">{dest.duration}</div>
            </div>
          </div>
          <Link
            href="/destinations"
            className="mt-4 block w-full text-center py-3 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #c8920f, #e4b020)",
              color: "#02020a",
            }}
          >
            View Package →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedDestinations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      titleRef.current,
      { y: 0 },
      {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center top",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div
        className="absolute top-1/2 left-0 w-150 h-150 rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,146,15,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <div
          ref={titleRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="section-divider mb-4" />
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--gold)" }}
            >
              Curated Experiences
            </p>
            <h2
              className="text-5xl lg:text-7xl font-light"
              style={{ fontFamily: "var(--font-cormorant)", lineHeight: 0.95 }}
            >
              Featured
              <br />
              <em
                className="text-gradient-gold"
                style={{ fontStyle: "italic" }}
              >
                Destinations
              </em>
            </h2>
          </div>
          <div className="max-w-sm">
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", fontWeight: 300 }}
            >
              Hand-picked destinations that combine breathtaking scenery,
              world-class hospitality, and unforgettable cultural experiences.
            </p>
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 mt-6 text-sm animated-underline"
              style={{ color: "var(--gold-light)" }}
            >
              View all destinations →
            </Link>
          </div>
        </div>
        <div
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {DESTINATIONS.map((dest, i) => (
            <DestCard key={dest.id} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
