"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in required fields");
      return;
    }
    setSubmitted(true);
    toast.success(
      "Message sent! Our specialists will contact you within 2 hours.",
    );
  };

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="min-h-screen pt-28 pb-32">
      <div className="max-w-350 mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <span className="tag mb-6 inline-flex">Get In Touch</span>
          <h1
            className="text-6xl lg:text-8xl font-light leading-none mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Let&apos;s Plan Your
            <br />
            <em className="text-gradient-gold" style={{ fontStyle: "italic" }}>
              Journey Together
            </em>
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ color: "var(--text-secondary)", fontWeight: 300 }}
          >
            Our expert travel specialists are available around the clock to help
            craft your perfect itinerary. From quick questions to complex
            multi-destination adventures.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              {
                icon: "✉",
                title: "Email Us",
                info: "hello@luxetravel.co",
                sub: "Response within 2 hours",
              },
              {
                icon: "☎",
                title: "Call Us",
                info: "+1 (800) LUXE-TRV",
                sub: "24/7 concierge line",
              },
              {
                icon: "◎",
                title: "Visit Us",
                info: "432 Madison Avenue, Suite 2400",
                sub: "New York, NY 10017",
              },
              {
                icon: "◈",
                title: "WhatsApp",
                info: "+1 (212) 555-0100",
                sub: "Instant response",
              },
            ].map(({ icon, title, info, sub }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="glass rounded-2xl p-6 flex gap-5 items-start"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-none"
                  style={{
                    background: "rgba(200,146,15,0.1)",
                    color: "var(--gold)",
                    fontSize: "16px",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <div className="font-medium mb-1">{title}</div>
                  <div
                    className="text-sm mb-0.5"
                    style={{ color: "var(--gold-light)" }}
                  >
                    {info}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-16 text-center"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #c8920f, #e4b020)",
                    color: "#02020a",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="text-4xl font-light mb-4"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Message Received
                </h3>
                <p
                  className="text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  A travel specialist will reach out to you within 2 hours to
                  begin planning your extraordinary journey.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-8 py-3 rounded-full text-sm"
                  style={{
                    border: "1px solid rgba(200,146,15,0.3)",
                    color: "var(--gold-light)",
                  }}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass rounded-3xl p-8 lg:p-10 space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="text-xs tracking-wider uppercase mb-2 block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Full Name *
                    </label>
                    <input
                      value={form.name}
                      onChange={update("name")}
                      className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs tracking-wider uppercase mb-2 block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="text-xs tracking-wider uppercase mb-2 block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Phone
                    </label>
                    <input
                      value={form.phone}
                      onChange={update("phone")}
                      className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs tracking-wider uppercase mb-2 block"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Travel Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={update("budget")}
                      className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
                      style={{ background: "rgba(20,20,40,0.6)" }}
                    >
                      <option value="">Select range</option>
                      {[
                        "$5K–$15K",
                        "$15K–$30K",
                        "$30K–$60K",
                        "$60K+",
                        "No limit",
                      ].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="text-xs tracking-wider uppercase mb-2 block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={update("subject")}
                    className="luxury-input w-full px-4 py-3 rounded-xl text-sm"
                    style={{ background: "rgba(20,20,40,0.6)" }}
                  >
                    <option value="">Select topic</option>
                    {[
                      "New Trip Planning",
                      "Hotel Inquiry",
                      "Flight Booking",
                      "Package Customisation",
                      "Corporate Travel",
                      "Other",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="text-xs tracking-wider uppercase mb-2 block"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Your Dream Journey *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={5}
                    className="luxury-input w-full px-4 py-3 rounded-xl text-sm resize-none"
                    placeholder="Tell us about your dream destinations, travel dates, special occasions, or any particular experiences you're hoping to have..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #c8920f, #e4b020)",
                    color: "#02020a",
                  }}
                >
                  Send Message — Our Specialists Will Respond Shortly
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
