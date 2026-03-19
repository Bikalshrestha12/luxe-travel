"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

const HOTELS = [
  { id: 1, name: "Aman Venice", location: "Venice, Italy", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80", stars: 5, rating: 4.9, reviews: 328, price: 1200, perNight: true, category: "City Luxury", amenities: ["Private Pool", "Spa", "Michelin Dining", "Butler Service"], description: "A 16th-century palazzo on the Grand Canal, reimagined as the ultimate Venetian sanctuary." },
  { id: 2, name: "Niyama Maldives", location: "Maldives", image: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80", stars: 5, rating: 5.0, reviews: 214, price: 2400, perNight: true, category: "Overwater", amenities: ["Overwater Villa", "Reef Snorkeling", "Submarine Dive", "Infinity Pool"], description: "An island escape where the only footprints are yours, above the most vibrant reef on earth." },
  { id: 3, name: "Singita Sasakwa", location: "Serengeti, Tanzania", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80", stars: 5, rating: 4.9, reviews: 189, price: 3800, perNight: true, category: "Safari Lodge", amenities: ["Game Drives", "Bush Dining", "Infinity Pool", "Wildlife Expert"], description: "Edwardian grandeur on a hilltop overlooking the Great Migration plains of the Serengeti." },
  { id: 4, name: "Le Sirenuse", location: "Positano, Italy", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", stars: 5, rating: 4.8, reviews: 412, price: 890, perNight: true, category: "Coastal", amenities: ["Sea View Terrace", "Spa", "Boat Charter", "Rooftop Pool"], description: "The original Amalfi jewel, perched above Positano with unrivalled views of the sea." },
  { id: 5, name: "Icehotel Jukkasjärvi", location: "Swedish Lapland", image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", stars: 4, rating: 4.7, reviews: 156, price: 780, perNight: true, category: "Unique Experience", amenities: ["Ice Suite", "Aurora Viewing", "Ice Bar", "Reindeer Safari"], description: "The world's first ice hotel, rebuilt each winter from 5,000 tons of ice and snow." },
  { id: 6, name: "Capella Bangkok", location: "Bangkok, Thailand", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80", stars: 5, rating: 4.8, reviews: 267, price: 620, perNight: true, category: "City Luxury", amenities: ["Riverside Views", "Muay Thai Studio", "Spa", "3 Restaurants"], description: "A colonial riverside mansion reborn as Bangkok's most refined urban escape." },
];

const CATEGORIES = ["All", "City Luxury", "Overwater", "Safari Lodge", "Coastal", "Unique Experience"];

function HotelCard({ hotel, index }: { hotel: typeof HOTELS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, { rotateY: x * 8, rotateX: -y * 8, transformPerspective: 1000, ease: "power2.out", duration: 0.4 });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  return (
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseEnter={() => setHovered(true)} className="group rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "var(--surface)", transformStyle: "preserve-3d" }}>
      
      <div className="relative h-60 overflow-hidden">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(14,14,30,0.8) 0%, transparent 60%)" }} />
        <div className="absolute top-4 left-4">
          <span className="tag">{hotel.category}</span>
        </div>
        <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <span style={{ color: "#e4b020", fontSize: "11px" }}>★</span>
          <span className="text-xs font-medium">{hotel.rating}</span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>({hotel.reviews})</span>
        </div>
        <div className="absolute bottom-4 left-4 flex">
          {Array.from({ length: hotel.stars }).map((_, i) => (
            <span key={i} style={{ color: "#e4b020", fontSize: "10px" }}>★</span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant)" }}>{hotel.name}</h3>
            <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 0C3.07 0 1.5 1.57 1.5 3.5 1.5 6.13 5 10 5 10s3.5-3.87 3.5-6.5C8.5 1.57 6.93 0 5 0z" fill="currentColor"/></svg>
              {hotel.location}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xl font-medium text-gradient-gold">${hotel.price.toLocaleString()}</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>per night</div>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{hotel.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {hotel.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(200,146,15,0.08)", color: "var(--gold-light)", border: "1px solid rgba(200,146,15,0.12)" }}>{a}</span>
          ))}
          {hotel.amenities.length > 3 && <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(200,146,15,0.08)", color: "var(--text-muted)" }}>+{hotel.amenities.length - 3}</span>}
        </div>

        <div className="flex gap-3">
          <Link href="/booking" className="flex-1 text-center py-2.5 rounded-full text-sm font-medium transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #c8920f, #e4b020)", color: "#02020a" }}>
            Reserve Room
          </Link>
          <button className="px-4 py-2.5 rounded-full text-sm border transition-all duration-300 hover:border-gold-500"
            style={{ borderColor: "rgba(200,146,15,0.2)", color: "var(--text-secondary)" }}>
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HotelsPage() {
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);

  const filtered = HOTELS.filter(h => (category === "All" || h.category === category) && h.price <= priceRange);

  return (
    <div className="min-h-screen pt-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="tag mb-6 inline-flex">4,200+ Curated Properties</span>
          <h1 className="text-6xl lg:text-8xl font-light leading-none mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
            Extraordinary<br /><em className="text-gradient-gold" style={{ fontStyle: "italic" }}>Hotels</em>
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--text-secondary)", fontWeight: 300 }}>
            From Venetian palazzos to Serengeti lodges — every property is personally inspected and selected for exceptional quality, character, and soul.
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <div className="glass rounded-2xl p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300"
                style={{ background: category === c ? "linear-gradient(135deg, #c8920f, #e4b020)" : "rgba(200,146,15,0.08)", color: category === c ? "#02020a" : "var(--text-secondary)", border: category === c ? "none" : "1px solid rgba(200,146,15,0.15)" }}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 min-w-[220px]">
            <span className="text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>Max: ${priceRange.toLocaleString()}/night</span>
            <input type="range" min={500} max={5000} step={100} value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
              className="flex-1 accent-yellow-500" style={{ accentColor: "#c8920f" }} />
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32">
        <AnimatePresence>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((hotel, i) => <HotelCard key={hotel.id} hotel={hotel} index={i} />)}
          </div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
            <div className="text-5xl mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>No hotels found</div>
            <p>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
