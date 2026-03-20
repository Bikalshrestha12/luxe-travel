"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

type Tab = "flight" | "hotel" | "package";

const MOCK_FLIGHTS = [
  {
    id: 1,
    airline: "Emirates",
    from: "NYC",
    to: "DXB",
    dep: "22:15",
    arr: "19:30+1",
    duration: "13h 15m",
    stops: "Non-stop",
    price: 1840,
    class: "Business",
    logo: "✈",
  },
  {
    id: 2,
    airline: "Singapore Air",
    from: "NYC",
    to: "SIN",
    dep: "01:30",
    arr: "06:45+2",
    duration: "21h 15m",
    stops: "1 stop",
    price: 2200,
    class: "Business",
    logo: "✈",
  },
  {
    id: 3,
    airline: "Qatar Airways",
    from: "NYC",
    to: "DOH",
    dep: "21:55",
    arr: "19:00+1",
    duration: "13h 05m",
    stops: "Non-stop",
    price: 1960,
    class: "Business",
    logo: "✈",
  },
];

function FlightSearch() {
  const [from, setFrom] = useState("New York");
  const [to, setTo] = useState("");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Business");
  const [searched, setSearched] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  const handleSearch = () => {
    if (!to || !depDate) {
      toast.error("Please fill in destination and date");
      return;
    }
    setSearched(true);
    toast.success("Searching premium flights...");
  };

  const handleBook = (id: number) => {
    setSelectedFlight(id);
    toast.success("Flight selected! Proceeding to checkout...");
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="glass rounded-2xl p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="col-span-2 lg:col-span-1">
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              From
            </label>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
              placeholder="Origin city"
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              To
            </label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
              placeholder="Destination"
            />
          </div>
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Depart
            </label>
            <input
              type="date"
              value={depDate}
              onChange={(e) => setDepDate(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Return
            </label>
            <input
              type="date"
              value={retDate}
              onChange={(e) => setRetDate(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Travelers
            </label>
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {travelers}
              </span>
              <button
                onClick={() => setTravelers(Math.min(8, travelers + 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Cabin
            </label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="luxury-input px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(20,20,40,0.6)" }}
            >
              {["Economy", "Premium Economy", "Business", "First Class"].map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
          </div>
          <button
            onClick={handleSearch}
            className="px-10 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90 ml-auto"
            style={{
              background: "linear-gradient(135deg, #c8920f, #e4b020)",
              color: "#02020a",
            }}
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Showing {MOCK_FLIGHTS.length} premium results
            </p>
            {MOCK_FLIGHTS.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 flex flex-col lg:flex-row items-center justify-between gap-4 transition-all duration-300 cursor-pointer"
                style={{
                  border:
                    selectedFlight === f.id
                      ? "1px solid var(--gold)"
                      : "1px solid rgba(200,146,15,0.1)",
                }}
                onClick={() => setSelectedFlight(f.id)}
              >
                <div className="flex items-center gap-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                    style={{ background: "rgba(200,146,15,0.1)" }}
                  >
                    {f.logo}
                  </div>
                  <div>
                    <div className="font-medium">{f.airline}</div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.class} · {f.stops}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8 text-center">
                  <div>
                    <div
                      className="text-2xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {f.dep}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.from}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <div
                        className="w-8 h-px"
                        style={{ background: "var(--border-bright)" }}
                      />
                      <div className="text-xs" style={{ color: "var(--gold)" }}>
                        ✈
                      </div>
                      <div
                        className="w-8 h-px"
                        style={{ background: "var(--border-bright)" }}
                      />
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.stops}
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {f.arr}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {f.to}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className="text-2xl font-light text-gradient-gold"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      ${f.price.toLocaleString()}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      per person
                    </div>
                  </div>
                  <button
                    onClick={() => handleBook(f.id)}
                    className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      background:
                        selectedFlight === f.id
                          ? "linear-gradient(135deg, #c8920f, #e4b020)"
                          : "rgba(200,146,15,0.1)",
                      color:
                        selectedFlight === f.id
                          ? "#02020a"
                          : "var(--gold-light)",
                      border: "1px solid rgba(200,146,15,0.2)",
                    }}
                  >
                    {selectedFlight === f.id ? "Selected ✓" : "Select"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HotelBooking() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const handleSubmit = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    setSubmitted(true);
    toast.success("Checking availability...");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            />
          </div>
        </div>

        {nights > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-3 rounded-xl text-sm text-center"
            style={{
              background: "rgba(200,146,15,0.08)",
              color: "var(--gold-light)",
            }}
          >
            {nights} night{nights > 1 ? "s" : ""} selected
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Rooms
            </label>
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-medium">
                {rooms}
              </span>
              <button
                onClick={() => setRooms(Math.min(5, rooms + 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label
              className="text-xs tracking-wider uppercase mb-2 block"
              style={{ color: "var(--text-muted)" }}
            >
              Guests
            </label>
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                −
              </button>
              <span className="flex-1 text-center text-sm font-medium">
                {guests}
              </span>
              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: "rgba(200,146,15,0.2)",
                  color: "var(--gold)",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <label
            className="text-xs tracking-wider uppercase mb-2 block"
            style={{ color: "var(--text-muted)" }}
          >
            Destination / Hotel Name
          </label>
          <input
            className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            placeholder="e.g. Aman Venice, Maldives, Paris..."
          />
        </div>

        <div>
          <label
            className="text-xs tracking-wider uppercase mb-2 block"
            style={{ color: "var(--text-muted)" }}
          >
            Room Category
          </label>
          <select
            className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(20,20,40,0.6)" }}
          >
            {[
              "Deluxe Room",
              "Superior Suite",
              "Penthouse Suite",
              "Overwater Villa",
              "Private Villa",
            ].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="text-xs tracking-wider uppercase mb-2 block"
            style={{ color: "var(--text-muted)" }}
          >
            Special Requests
          </label>
          <textarea
            rows={3}
            className="luxury-input w-full px-4 py-3 rounded-xl text-sm resize-none"
            placeholder="Anniversary setup, dietary needs, early check-in..."
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #c8920f, #e4b020)",
            color: "#02020a",
          }}
        >
          Check Availability
        </button>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass rounded-2xl p-6 text-center"
        >
          <div className="text-3xl mb-3" style={{ color: "var(--gold)" }}>
            ✓
          </div>
          <div className="font-medium mb-2">Request Received</div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Our concierge will confirm availability within 2 hours.
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function BookingPage() {
  const [tab, setTab] = useState<Tab>("flight");

  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <span className="tag mb-6 inline-flex">
            Seamless Booking Experience
          </span>
          <h1
            className="text-6xl lg:text-7xl font-light leading-none mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Book Your
            <br />
            <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>
              Dream Journey
            </em>
          </h1>
        </motion.div>

        {/* Tab switcher */}
        <div className="gap-2 mb-10 glass rounded-2xl p-2 inline-flex">
          {(["flight", "hotel", "package"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-8 py-3 rounded-xl text-sm font-medium capitalize transition-all duration-300"
              style={{
                background:
                  tab === t
                    ? "linear-gradient(135deg, #c8920f, #e4b020)"
                    : "transparent",
                color: tab === t ? "#02020a" : "var(--text-secondary)",
              }}
            >
              {t === "package"
                ? "Full Package"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {tab === "flight" && <FlightSearch />}
            {tab === "hotel" && <HotelBooking />}
            {tab === "package" && (
              <div className="glass rounded-2xl p-10 text-center">
                <div
                  className="text-5xl mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--gold)",
                  }}
                >
                  ✦
                </div>
                <h3
                  className="text-3xl font-light mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Bespoke Package Curation
                </h3>
                <p
                  className="text-base max-w-xl mx-auto mb-8"
                  style={{ color: "var(--text-secondary)", fontWeight: 300 }}
                >
                  Let our travel specialists craft a complete package — flights,
                  hotels, transfers, and experiences — tailored to your exact
                  vision.
                </p>
                <button
                  onClick={() =>
                    toast.success("Connecting you with a travel specialist...")
                  }
                  className="px-10 py-4 rounded-full text-sm font-medium"
                  style={{
                    background: "linear-gradient(135deg, #c8920f, #e4b020)",
                    color: "#02020a",
                  }}
                >
                  Speak With a Specialist
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
