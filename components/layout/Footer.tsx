"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, Mail, Leaf } from "lucide-react";

const navLinks = [
  { label: "About",         href: "#about" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "Amenities",     href: "#amenities" },
  { label: "Gallery",       href: "#gallery" },
  { label: "Location",      href: "#location" },
  { label: "Contact",       href: "#contact" },
];

const legalLinks = [
  { label: "Privacy Policy",     href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cancellation Policy",href: "#" },
];

export default function Footer() {
  const scroll = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer style={{ background: "#0d1a10", color: "#faf7f2", position: "relative", overflow: "hidden" }}>

      {/* Soft ambient glow */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 400, height: 400, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "rgba(26,58,42,.25)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 10 }}>

        {/* ── Top CTA strip ── */}
        <div style={{ borderBottom: "1px solid rgba(201,168,76,.1)", padding: "4rem 0" }}>
          <div className="container-luxury" style={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="label-tag" style={{ color: "#c9a84c", borderColor: "rgba(201,168,76,.35)" }}>
                Reserve Your Escape
              </span>
              <h2 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 400,
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "#faf7f2",
                marginTop: "1rem",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}>
                Begin Your Journey at Kambegi
              </h2>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                color: "rgba(250,247,242,.5)",
                maxWidth: 420,
                margin: "0 auto 2rem",
                lineHeight: 1.75,
              }}>
                Every moment here is designed to restore, inspire, and reconnect you with the natural world.
              </p>
              <button onClick={() => scroll("#contact")} className="btn-gold">
                Book Your Stay
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── Main footer columns ── */}
        <div className="container-luxury" style={{ paddingTop: "4rem", paddingBottom: "3.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(201,168,76,.1)", border: "1px solid rgba(201,168,76,.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Leaf className="w-4 h-4" style={{ color: "#c9a84c" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#faf7f2", fontSize: "1.1rem", letterSpacing: "0.1em", lineHeight: 1 }}>
                    KAMBEGI
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a84c", marginTop: 3 }}>
                    Resort & Retreat
                  </p>
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.42)", lineHeight: 1.8 }}>
                A nature-led luxury retreat nestled in the Western Ghats, near the pristine waters of Panshet Lake, Pune.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600, marginBottom: "1.25rem" }}>
                Explore
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scroll(l.href)}
                      style={{
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        fontFamily: "var(--font-inter)", fontSize: "0.85rem",
                        color: "rgba(250,247,242,.45)",
                        transition: "color .2s",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,247,242,.45)")}
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", fontWeight: 600, marginBottom: "1.25rem" }}>
                Contact
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: "#c9a84c", marginTop: 2 }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.45)", lineHeight: 1.65 }}>
                    Near Panshet Dam, Pune<br />Maharashtra 412108
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <Phone className="w-4 h-4 shrink-0" style={{ color: "#c9a84c" }} />
                  <a href="tel:+919876543210" style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.45)", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,247,242,.45)")}
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <Mail className="w-4 h-4 shrink-0" style={{ color: "#c9a84c" }} />
                  <a href="mailto:stay@kambegiresort.com" style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(250,247,242,.45)", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#faf7f2")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,247,242,.45)")}
                  >
                    stay@kambegiresort.com
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: "1px solid rgba(250,247,242,.07)", padding: "1.5rem 0" }}>
          <div className="container-luxury" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "rgba(250,247,242,.25)" }}>
              © {new Date().getFullYear()} Kambegi Resort. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {legalLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(250,247,242,.25)", textDecoration: "none", transition: "color .2s" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(250,247,242,.6)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(250,247,242,.25)")}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/admin"
                style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(201,168,76,.4)", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c9a84c")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(201,168,76,.4)")}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
