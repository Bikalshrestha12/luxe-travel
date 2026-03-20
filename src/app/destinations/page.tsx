"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

const ALL_DESTINATIONS = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    tag: "Mediterranean",
    price: 2400,
    rating: 4.9,
    duration: "7 nights",
    description:
      "Volcanic caldera views, blue-domed churches, and sunsets that stop time.",
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    continent: "Asia",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    tag: "Cultural",
    price: 3100,
    rating: 4.8,
    duration: "10 nights",
    description:
      "Timeless temples, geisha districts, and ancient gardens in perfect harmony.",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Indian Ocean",
    continent: "Asia",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    tag: "Paradise",
    price: 5800,
    rating: 5.0,
    duration: "5 nights",
    description:
      "Crystal lagoons, overwater villas, and marine life beyond imagination.",
  },
  {
    id: 4,
    name: "Patagonia",
    country: "Argentina",
    continent: "South America",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    tag: "Adventure",
    price: 4200,
    rating: 4.7,
    duration: "14 nights",
    description:
      "Dramatic peaks, ancient glaciers, and wilderness that humbles the soul.",
  },
  {
    id: 5,
    name: "Amalfi Coast",
    country: "Italy",
    continent: "Europe",
    image:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80",
    tag: "Coastal",
    price: 2900,
    rating: 4.9,
    duration: "8 nights",
    description:
      "Pastel villages tumbling to turquoise seas, fragrant lemon groves.",
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    tag: "Spiritual",
    price: 1800,
    rating: 4.8,
    duration: "9 nights",
    description:
      "Sacred temples, terraced rice fields, and profound spiritual energy.",
  },
  {
    id: 7,
    name: "Iceland",
    country: "Iceland",
    continent: "Europe",
    image:
      "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
    tag: "Natural Wonders",
    price: 3600,
    rating: 4.7,
    duration: "7 nights",
    description:
      "Northern lights, volcanic landscapes, and midnight sun phenomena.",
  },
  {
    id: 8,
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    tag: "Heritage",
    price: 3400,
    rating: 4.9,
    duration: "10 nights",
    description:
      "Lost Incan citadel perched above the clouds in the Andes mountains.",
  },
  {
    id: 9,
    name: "Safari Kenya",
    country: "Kenya",
    continent: "Africa",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    tag: "Wildlife",
    price: 6200,
    rating: 5.0,
    duration: "12 nights",
    description:
      "Witness the Great Migration across the Maasai Mara in pure luxury.",
  },
];

const CONTINENTS = ["All", "Europe", "Asia", "South America", "Africa"];
const TAGS = [
  "All",
  "Cultural",
  "Paradise",
  "Adventure",
  "Coastal",
  "Wildlife",
  "Heritage",
];

export default function DestinationsPage() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"rating" | "price">("rating");
  const headerRef = useRef<HTMLDivElement>(null);

  const filtered = ALL_DESTINATIONS.filter(
    (d) => filter === "All" || d.continent === filter || d.tag === filter,
  ).sort((a, b) =>
    sortBy === "rating" ? b.rating - a.rating : a.price - b.price,
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
    );
  }, []);

  return (
    <div className="min-h-screen pt-28">
      {/* Hero Header */}
      <div ref={headerRef} className="max-w-350 mx-auto px-6 lg:px-12 mb-16">
        <span className="tag mb-6 inline-flex">
          180+ Destinations Worldwide
        </span>
        <h1
          className="text-6xl lg:text-8xl font-light leading-none mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Discover the
          <br />
          <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>
            World's Wonders
          </em>
        </h1>
        <p
          className="text-lg max-w-2xl"
          style={{ color: "var(--text-secondary)", fontWeight: 300 }}
        >
          From the volcanic caldera of Santorini to the ancient glaciers of
          Patagonia — every destination in our portfolio is chosen for its power
          to transform.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-350 mx-auto px-6 lg:px-12 mb-12 sticky top-20 z-20">
        <div className="glass rounded-2xl px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
          <div className="flex flex-wrap gap-2">
            {CONTINENTS.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                style={{
                  background:
                    filter === c
                      ? "linear-gradient(135deg, #c8920f, #e4b020)"
                      : "rgba(200,146,15,0.08)",
                  color: filter === c ? "#02020a" : "var(--text-secondary)",
                  border:
                    filter === c ? "none" : "1px solid rgba(200,146,15,0.15)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <div
            className="flex items-center gap-3 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <span>Sort:</span>
            {(["rating", "price"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="capitalize transition-colors"
                style={{
                  color:
                    sortBy === s ? "var(--gold-light)" : "var(--text-muted)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-350 mx-auto px-6 lg:px-12 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest, i) => (
            <motion.div
              key={dest.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-2xl overflow-hidden card-hover"
              style={{
                border: "1px solid var(--border)",
                background: "var(--surface)",
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,14,30,0.9) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <span className="tag">{dest.tag}</span>
                  <span className="glass rounded-full px-3 py-1 text-xs flex items-center gap-1">
                    <span style={{ color: "#e4b020" }}>★</span>
                    {dest.rating}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className="text-2xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {dest.name}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {dest.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      from
                    </div>
                    <div className="font-medium text-gradient-gold">
                      ${dest.price.toLocaleString()}
                    </div>
                  </div>
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {dest.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {dest.duration}
                  </span>
                  <Link
                    href="/booking"
                    className="px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(135deg, #c8920f, #e4b020)",
                      color: "#02020a",
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
