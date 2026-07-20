"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Calendar, Users, Mail, Phone, User,
  MessageSquare, Send, CheckCircle, MapPin, Clock, Shield,
} from "lucide-react";
import { inquiriesAPI } from "@/lib/api";
import toast from "react-hot-toast";

const roomOptions = [
  { value: "Forest Villa",         label: "Forest Villa — ₹25,000 / night" },
  { value: "Panshet Lake Suite",   label: "Panshet Lake Suite — ₹18,000 / night" },
  { value: "Treehouse Cottage",    label: "Treehouse Cottage — ₹15,000 / night" },
  { value: "Luxury Glamping Tent", label: "Luxury Glamping Tent — ₹12,000 / night" },
];

const policies = [
  { icon: Clock,   text: "Check-in 2 PM · Check-out 11 AM" },
  { icon: Shield,  text: "Free cancellation up to 72 hours" },
  { icon: Users,   text: "Pets welcome with prior notice" },
  { icon: MapPin,  text: "Complimentary airport transfers" },
];

function InputField({
  icon: Icon, placeholder, type = "text", value, onChange, required,
  as, rows, children, focused, onFocus, onBlur,
}: {
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  placeholder?: string; type?: string; value?: string;
  onChange?: (v: string) => void; required?: boolean;
  as?: "textarea" | "select"; rows?: number; children?: React.ReactNode;
  focused?: boolean; onFocus?: () => void; onBlur?: () => void;
}) {
  const base: React.CSSProperties = {
    width: "100%", boxSizing: "border-box",
    padding: Icon ? "0.9rem 1rem 0.9rem 2.8rem" : "0.9rem 1rem",
    background: "rgba(255,255,255,.05)",
    border: focused ? "1px solid rgba(201,168,76,.6)" : "1px solid rgba(250,247,242,.12)",
    borderRadius: 6, color: "#faf7f2", outline: "none",
    fontFamily: "var(--font-inter)", fontSize: "0.88rem",
    transition: "border-color .2s, background .2s",
    boxShadow: focused ? "0 0 0 3px rgba(201,168,76,.08)" : "none",
  };

  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon className="w-4 h-4" style={{
          position: "absolute", left: "0.9rem", top: as === "textarea" ? "1rem" : "50%",
          transform: as === "textarea" ? "none" : "translateY(-50%)",
          color: focused ? "#c9a84c" : "rgba(250,247,242,.3)",
          pointerEvents: "none", transition: "color .2s",
        }} />
      )}
      {as === "textarea" ? (
        <textarea value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}
          required={required} rows={rows || 4} onFocus={onFocus} onBlur={onBlur}
          style={{ ...base, resize: "none", lineHeight: 1.7, paddingLeft: Icon ? "2.8rem" : "1rem" }} />
      ) : as === "select" ? (
        <select value={value} onChange={e => onChange?.(e.target.value)} onFocus={onFocus} onBlur={onBlur}
          style={{ ...base, appearance: "none", cursor: "pointer", paddingLeft: Icon ? "2.8rem" : "1rem",
            color: value ? "#faf7f2" : "rgba(250,247,242,.35)" }}>
          {children}
        </select>
      ) : (
        <input type={type} placeholder={placeholder} value={value}
          onChange={e => onChange?.(e.target.value)} required={required}
          onFocus={onFocus} onBlur={onBlur} style={base} />
      )}
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", checkIn: "", checkOut: "", guests: "2", roomType: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [key]: v }));
  const isFocused = (k: string) => focused === k;
  const focus = (k: string) => () => setFocused(k);
  const blur = () => setFocused(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill required fields"); return; }
    setLoading(true);
    try {
      await inquiriesAPI.create({
        name: form.name, email: form.email, phone: form.phone,
        type: "booking",
        subject: form.roomType ? `Booking Inquiry: ${form.roomType}` : "General Inquiry",
        message: `${form.message}${form.checkIn ? `\n\nCheck-in: ${form.checkIn}` : ""}${form.checkOut ? `\nCheck-out: ${form.checkOut}` : ""}${form.guests ? `\nGuests: ${form.guests}` : ""}${form.roomType ? `\nRoom: ${form.roomType}` : ""}`,
      });
      setSubmitted(true);
      toast.success("We'll be in touch within 24 hours!");
    } catch { toast.error("Something went wrong. Please call us directly."); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact" ref={ref} style={{ backgroundColor: "#1a3a2a", padding: "0", position: "relative", overflow: "hidden" }}>

      {/* Full-section grid: image left, form right */}
      <div style={{ display: "grid", minHeight: "90vh" }} className="grid-cols-1 md:grid-cols-2">

        {/* ── Left — Hero image panel ── */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 500 }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85"
            alt="Kambegi Resort — Reserve Your Stay"
            fill className="object-cover"
            sizes="(max-width:768px)100vw,50vw"
            style={{ transition: "transform 12s ease", transform: "scale(1.06)" }}
          />
          {/* Gradient overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,58,42,.92) 0%, rgba(26,58,42,.6) 50%, rgba(26,58,42,.3) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, #1a3a2a 100%)" }} />

          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(2rem,5vw,4rem)" }}>
            {/* Top label */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <span className="label-tag" style={{ color: "#c9a84c", borderColor: "rgba(201,168,76,.35)" }}>Reserve Your Stay</span>
            </motion.div>

            {/* Main text */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.2 }}>
              <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1.15, color: "#faf7f2", marginBottom: "1.25rem" }}>
                Begin Your<br />Kambegi Journey
              </h2>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)", marginBottom: "1.5rem" }} />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "rgba(250,247,242,.62)", lineHeight: 1.8, maxWidth: 380 }}>
                Share your details and our concierge team will craft a bespoke experience — just for you. Responses within 24 hours.
              </p>

              {/* Policy chips */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "2rem" }}>
                {policies.map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />
                    </div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.65)" }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginTop: "2rem", padding: "0.85rem 1.1rem", background: "rgba(250,247,242,.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(250,247,242,.1)", borderRadius: 8 }}>
                <div style={{ display: "flex" }}>
                  {["A","R","S","M","P"].map((l, i) => (
                    <div key={l} style={{ width: 30, height: 30, borderRadius: "50%", background: `rgba(201,168,76,${0.15 + i * 0.05})`, border: "2px solid rgba(26,58,42,.8)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: i ? -8 : 0, fontFamily: "var(--font-inter)", fontSize: "0.68rem", fontWeight: 700, color: "#faf7f2" }}>
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#faf7f2", fontWeight: 600 }}>200+ happy guests</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "rgba(250,247,242,.5)", marginTop: 1 }}>loved their stay this month</p>
                </div>
              </div>
            </motion.div>

            {/* Contact links */}
            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.7 }}
              style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <a href="tel:+919876543210" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.6)", textDecoration: "none", transition: "color .2s" }}>
                <Phone className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />+91 98765 43210
              </a>
              <a href="mailto:stay@kambegiresort.com" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.6)", textDecoration: "none" }}>
                <Mail className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />stay@kambegiresort.com
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Right — Form panel ── */}
        <div style={{ background: "#0f2018", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(2rem,5vw,4rem)" }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{ width: "100%", maxWidth: 480 }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <CheckCircle className="w-9 h-9" style={{ color: "#c9a84c" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "2rem", color: "#faf7f2", marginBottom: "0.75rem" }}>Thank You!</h3>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.92rem", color: "rgba(250,247,242,.55)", lineHeight: 1.8, maxWidth: 340, margin: "0 auto 2rem" }}>
                  Your inquiry has been received. Our concierge will reach out within 24 hours to plan your stay.
                </p>
                <button onClick={() => setSubmitted(false)} style={{ padding: "0.75rem 1.75rem", background: "#c9a84c", color: "#0f2018", border: "none", borderRadius: 4, fontFamily: "var(--font-inter)", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer" }}>
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "1.75rem", color: "#faf7f2", marginBottom: "0.4rem" }}>
                    Book Your Stay
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.4)" }}>
                    Fill in the details below and we&apos;ll get back to you shortly
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>

                  {/* Name + Email */}
                  <div style={{ display: "grid", gap: "0.75rem" }} className="grid-cols-1 sm:grid-cols-2">
                    <InputField icon={User} placeholder="Full Name *" value={form.name} onChange={set("name")} required focused={isFocused("name")} onFocus={focus("name")} onBlur={blur} />
                    <InputField icon={Mail} placeholder="Email *" type="email" value={form.email} onChange={set("email")} required focused={isFocused("email")} onFocus={focus("email")} onBlur={blur} />
                  </div>

                  {/* Phone */}
                  <InputField icon={Phone} placeholder="Phone Number" type="tel" value={form.phone} onChange={set("phone")} focused={isFocused("phone")} onFocus={focus("phone")} onBlur={blur} />

                  {/* Room select */}
                  <InputField as="select" value={form.roomType} onChange={set("roomType")} focused={isFocused("room")} onFocus={focus("room")} onBlur={blur}>
                    <option value="" style={{ background: "#0f2018" }}>Preferred Accommodation</option>
                    {roomOptions.map(o => <option key={o.value} value={o.value} style={{ background: "#0f2018" }}>{o.label}</option>)}
                  </InputField>

                  {/* Dates + guests */}
                  <div style={{ display: "grid", gap: "0.75rem" }} className="grid-cols-1 sm:grid-cols-3">
                    <InputField icon={Calendar} type="date" value={form.checkIn} onChange={set("checkIn")}
                      focused={isFocused("checkIn")} onFocus={focus("checkIn")} onBlur={blur} />
                    <InputField icon={Calendar} type="date" value={form.checkOut} onChange={set("checkOut")}
                      focused={isFocused("checkOut")} onFocus={focus("checkOut")} onBlur={blur} />
                    <InputField icon={Users} as="select" value={form.guests} onChange={set("guests")}
                      focused={isFocused("guests")} onFocus={focus("guests")} onBlur={blur}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: "#0f2018" }}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                    </InputField>
                  </div>

                  {/* Message */}
                  <InputField as="textarea" icon={MessageSquare} placeholder="Tell us about your ideal stay, special occasions, or requirements… *"
                    value={form.message} onChange={set("message")} required rows={4}
                    focused={isFocused("message")} onFocus={focus("message")} onBlur={blur} />

                  {/* Submit */}
                  <motion.button
                    type="submit" disabled={loading}
                    whileHover={!loading ? { scale: 1.01 } : {}}
                    whileTap={!loading ? { scale: 0.99 } : {}}
                    style={{
                      marginTop: "0.25rem",
                      padding: "1rem 1.5rem",
                      background: loading ? "rgba(201,168,76,.6)" : "#c9a84c",
                      color: "#0f2018",
                      border: "none", borderRadius: 5, cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: "var(--font-inter)", fontSize: "0.8rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                      transition: "background .2s",
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 16, height: 16, border: "2px solid rgba(15,32,24,.3)", borderTopColor: "#0f2018", borderRadius: "50%", display: "inline-block", animation: "spin .7s linear infinite" }} />
                        Sending…
                      </>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Inquiry</>
                    )}
                  </motion.button>

                  <p style={{ textAlign: "center", fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "rgba(250,247,242,.25)", marginTop: "0.25rem" }}>
                    Your data is safe. We never share personal information.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
