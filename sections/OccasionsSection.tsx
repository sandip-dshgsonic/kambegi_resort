"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Heart, Home, Camera, Briefcase, Users, ArrowUpRight } from "lucide-react";

const occasions = [
  {
    icon: Heart, accent: "#c9a84c", tag: "Up to 150 Guests",
    name: "Weddings & Celebrations",
    desc: "From intimate ceremonies to grand receptions — our lakeside lawns and forest clearings set the stage for unforgettable celebrations.",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=85",
  },
  {
    icon: Home, accent: "#4ade80", tag: "2 Villas Available",
    name: "Private Villas",
    desc: "Exclusive standalone villas with private pools — total privacy for families and close friends.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85",
  },
  {
    icon: Camera, accent: "#f472b6", tag: "Full-Day Access",
    name: "Pre-Wedding Shoots",
    desc: "Golden-hour forest trails, misty viewpoints, and lakeside decks — a dream canvas for your pre-wedding story.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85",
  },
  {
    icon: Briefcase, accent: "#60a5fa", tag: "Up to 40 Pax",
    name: "Corporate Offsites",
    desc: "Distraction-free meeting spaces and team-building experiences set against the Western Ghats.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85",
  },
  {
    icon: Users, accent: "#a78bfa", tag: "2–3 Rooms Together",
    name: "Group Getaways",
    desc: "Book interconnected rooms or villas for family reunions and friend getaways, with shared common spaces to gather.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&q=85",
  },
];

// Grid positions: [col-start/col-end] for 3-col grid — first card featured, spans 2 columns
const gridCols = ["1 / 3", "3 / 4", "1 / 2", "2 / 3", "3 / 4"];

export default function OccasionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="occasions"
      ref={ref}
      style={{ backgroundColor: "#1a3a2a", padding: "7rem 0 8rem", position: "relative", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", top: "8%", right: "-8%", width: 480, height: 480, borderRadius: "50%", background: "rgba(201,168,76,.08)", filter: "blur(110px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-8%", width: 420, height: 420, borderRadius: "50%", background: "rgba(122,158,126,.1)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(250,247,242,.04) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: "0.65rem",
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
            padding: "0.4rem 1.1rem", borderRadius: 2, display: "inline-block",
          }}>Celebrate With Us</span>

          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15, color: "#faf7f2",
            marginTop: "1.25rem", marginBottom: "1.25rem",
          }}>Perfect For Every Occasion</h2>

          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "0 auto 1.75rem" }} />

          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "1rem",
            color: "rgba(250,247,242,.58)", lineHeight: 1.85,
            maxWidth: 580, margin: "0 auto",
          }}>
            Whether it&apos;s an intimate wedding, a pre-wedding shoot, a corporate offsite, or a getaway
            with friends — Kambegi shapes itself around your moment.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "320px 260px",
            gap: "0.7rem",
          }}
        >
          {occasions.map((o, i) => (
            <motion.div
              key={o.name}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 8,
                gridColumn: gridCols[i],
              }}
            >
              <Image
                src={o.image} alt={o.name} fill
                className="object-cover"
                sizes="(max-width:640px)100vw,50vw"
              />

              {/* Gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(4,10,6,.92) 0%, rgba(4,10,6,.4) 55%, rgba(4,10,6,.1) 100%)",
              }} />

              {/* Top: icon + tag */}
              <div style={{
                position: "absolute", top: 16, left: 16, right: 16,
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "rgba(8,13,9,.6)", backdropFilter: "blur(10px)",
                  border: `1px solid ${o.accent}50`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <o.icon className="w-3.5 h-3.5" style={{ color: o.accent }} />
                </div>
                <span style={{
                  padding: "0.26rem 0.75rem",
                  background: "rgba(8,13,9,.55)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(250,247,242,.14)", borderRadius: 100,
                  fontFamily: "var(--font-inter)", fontSize: "0.6rem",
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: "rgba(250,247,242,.75)", whiteSpace: "nowrap",
                }}>{o.tag}</span>
              </div>

              {/* Bottom: name + desc + cta */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
                <div style={{ width: 32, height: 2, background: o.accent, marginBottom: "0.75rem", borderRadius: 1 }} />

                <h4 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: i === 0 ? "1.75rem" : "1.2rem",
                  fontWeight: 400, color: "#faf7f2", lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}>{o.name}</h4>

                <p className="hidden lg:block" style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.83rem",
                  color: "rgba(250,247,242,.65)", lineHeight: 1.65,
                  marginBottom: "0.9rem", maxWidth: i === 0 ? 440 : "100%",
                }}>{o.desc}</p>

                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.45rem",
                    padding: "0.5rem 1rem",
                    background: "rgba(250,247,242,.08)", backdropFilter: "blur(8px)",
                    border: `1px solid ${o.accent}50`,
                    borderRadius: 4,
                    fontFamily: "var(--font-inter)", fontSize: "0.7rem",
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: o.accent, cursor: "pointer",
                  }}
                >
                  Enquire Now <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
