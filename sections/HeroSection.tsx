"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Star, Leaf, Wind } from "lucide-react";

const stats = [
  { value: "3",    label: "Unique Stays" },
  { value: "60+",  label: "Acres of Nature" },
  { value: "2 hrs",label: "From Pune" },
  { value: "5 ★",  label: "Rating" },
];

const headlineLines = [
  { text: "A Nature-Led",   gold: false },
  { text: "Luxury Retreat", gold: true  },
  { text: "Near Pune",      gold: false },
];

// Bottom stats strip height ≈ 80px  →  paddingBottom keeps content above it
// Navbar height            ≈ 76px  →  paddingTop keeps content below it
const PT = "clamp(5.5rem, 11vh, 7.5rem)"; // top — clears navbar (~76px) with breathing room
const PB = "clamp(5rem,  10vh, 7rem)";    // bottom — clears stats strip (~80px)
const PX = "clamp(2.5rem, 9vw, 8rem)";    // horizontal — matches other sections

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{ position: "relative", width: "100%", overflow: "hidden", height: "100svh", minHeight: 660 }}
    >

      {/* ── Background: Ken-Burns zoom ── */}
      <motion.div
        initial={{ scale: 1.16 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <Image
          src="/Images/natureview2.jpg"
          alt="Kambegi Resort — Western Ghats"
          fill priority quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* ── Cinematic overlay layers ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(4,10,6,.50)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(105deg, rgba(4,10,6,.78) 0%, rgba(4,10,6,.38) 48%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(4,10,6,.52) 0%, transparent 25%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(4,10,6,.98) 0%, rgba(4,10,6,.55) 18%, transparent 36%)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "55%", zIndex: 1, background: "radial-gradient(ellipse at 0% 0%, rgba(201,168,76,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* ── KAMBEGI watermark ── */}
      <div style={{
        position: "absolute", bottom: "12%", right: "-2%", zIndex: 2,
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "clamp(6rem, 18vw, 20rem)", fontWeight: 700,
        color: "rgba(250,247,242,.022)", letterSpacing: "0.06em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap",
      }}>KAMBEGI</div>

      {/* ── Left vertical gold accent ── */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", left: "clamp(1rem, 2.5vw, 2.5rem)",
          top: "25%", height: "42%", width: 1.5,
          background: "linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)",
          zIndex: 10, transformOrigin: "top",
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        style={{
          position: "absolute", left: "clamp(0.6rem, 2.1vw, 2.1rem)",
          top: "45%", width: 8, height: 8, borderRadius: "50%",
          background: "#c9a84c", boxShadow: "0 0 12px rgba(201,168,76,.6)", zIndex: 11,
        }}
      />

      {/* ── Main content wrapper ──
           paddingTop  clears the fixed navbar (~76px)
           paddingBottom clears the bottom stats strip (~80px)
           alignItems: center = vertically centers within the remaining space  ── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${PT} ${PX} ${PB}`,
          gap: "2rem",
        }}
      >

        {/* ── Left: main text content ── */}
        <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: 680 }}>

          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.75rem" }}
          >
            <MapPin style={{ width: 13, height: 13, color: "#c9a84c", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "0.62rem",
              letterSpacing: "0.25em", textTransform: "uppercase" as const,
              color: "#c9a84c", border: "1px solid rgba(201,168,76,.3)",
              borderRadius: 100, padding: "0.26rem 1rem",
            }}>Near Panshet · Pune · Western Ghats</span>
          </motion.div>

          {/* Headline — line-by-line curtain reveal */}
          <div style={{ marginBottom: "1.4rem" }}>
            {headlineLines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "98%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.65 + i * 0.18, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 300,
                    fontSize: "clamp(2.0rem, 5vw, 5.4rem)",
                    lineHeight: 1.06,
                    color: line.gold ? "#c9a84c" : "#faf7f2",
                    fontStyle: line.gold ? "italic" : "normal",
                    display: "block",
                  }}
                >{line.text}</motion.h1>
              </div>
            ))}
          </div>

          {/* Gold signature line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 80, height: 1.5,
              background: "linear-gradient(to right, #c9a84c, rgba(201,168,76,.2))",
              marginBottom: "1.4rem", transformOrigin: "left",
            }}
          />

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
              color: "rgba(250,247,242,.62)", lineHeight: 1.82,
              maxWidth: 500, marginBottom: "2.5rem",
            }}
          >
            Where the ancient forests of the Western Ghats meet world‑class luxury.
            Reconnect with nature. Rediscover yourself.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", alignItems: "center" }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(201,168,76,.38)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("#contact")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                padding: "0.9rem 2.1rem",
                background: "#c9a84c", color: "#080d09",
                border: "none", borderRadius: 4,
                fontFamily: "var(--font-inter)", fontSize: "0.78rem",
                letterSpacing: "0.12em", textTransform: "uppercase" as const,
                fontWeight: 600, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201,168,76,.25)",
              }}
            >
              Reserve Your Stay
              <ArrowRight style={{ width: 14, height: 14 }} />
            </motion.button>

            <motion.button
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => scrollTo("#about")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.55rem",
                padding: "0.9rem 1.65rem",
                background: "rgba(250,247,242,.07)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(250,247,242,.18)", borderRadius: 4,
                color: "#faf7f2",
                fontFamily: "var(--font-inter)", fontSize: "0.78rem",
                letterSpacing: "0.1em", textTransform: "uppercase" as const,
                cursor: "pointer",
              }}
            >
              Explore Resort
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem" }}>→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right: floating info cards (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex"
          style={{ flexDirection: "column", gap: "0.8rem", flexShrink: 0, width: 158 }}
        >
          {/* Rating */}
          <div style={{
            background: "rgba(8,13,9,.68)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(201,168,76,.2)", borderRadius: 12,
            padding: "1.35rem 1.6rem", textAlign: "center", position: "relative",
            boxShadow: "0 16px 48px rgba(0,0,0,.35)",
          }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 2, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", borderRadius: 1 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.2rem", marginBottom: "0.65rem" }}>
              {[1,2,3,4,5].map(i => <Star key={i} style={{ width: 11, height: 11, fill: "#c9a84c", color: "#c9a84c" }} />)}
            </div>
            <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.1rem", fontWeight: 400, color: "#faf7f2", lineHeight: 1 }}>5.0</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.42)", marginTop: "0.38rem" }}>Guest Rating</p>
            <div style={{ height: 1, background: "rgba(250,247,242,.07)", margin: "0.7rem 0" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "rgba(250,247,242,.32)" }}>100+ Reviews</p>
          </div>

          {/* Eco certified */}
          <div style={{
            background: "rgba(8,13,9,.55)", backdropFilter: "blur(24px)",
            border: "1px solid rgba(74,124,89,.28)", borderRadius: 12,
            padding: "1rem 1.35rem", textAlign: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,.22)",
          }}>
            <Leaf style={{ width: 19, height: 19, color: "#4ade80", margin: "0 auto 0.45rem" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.64rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.62)", fontWeight: 500 }}>Eco Certified</p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", color: "rgba(250,247,242,.32)", marginTop: "0.18rem" }}>100% Sustainable</p>
          </div>

          {/* Altitude */}
          <div style={{
            background: "rgba(8,13,9,.42)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(250,247,242,.09)", borderRadius: 12,
            padding: "0.85rem 1.1rem",
            display: "flex", alignItems: "center", gap: "0.65rem",
          }}>
            <Wind style={{ width: 17, height: 17, color: "#60a5fa", flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.64rem", color: "#faf7f2", fontWeight: 500 }}>705 m altitude</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.57rem", color: "rgba(250,247,242,.32)", marginTop: "0.1rem" }}>Fresh mountain air</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Bottom stats + scroll strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.65, duration: 0.8 }}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10,
          background: "rgba(4,10,6,.84)", backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(250,247,242,.07)",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: `1rem ${PX}`,
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(1.25rem, 3.5vw, 3rem)", flexWrap: "wrap", alignItems: "center" }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.75 + i * 0.08, duration: 0.55 }}
                style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}
              >
                {i > 0 && <div style={{ width: 1, height: 26, background: "rgba(250,247,242,.08)" }} />}
                <div>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.55rem", fontWeight: 400, color: "#c9a84c", lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.36)", marginTop: "0.22rem" }}>{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo("#about")}
            style={{
              display: "flex", alignItems: "center", gap: "0.85rem",
              background: "none", border: "none", cursor: "pointer", padding: "0.2rem 0",
            }}
          >
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.56rem", letterSpacing: "0.28em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.32)" }}>
              Scroll
            </span>
            <div style={{ position: "relative", width: 48, height: 1.5, background: "rgba(250,247,242,.14)", overflow: "hidden" }}>
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0, background: "#c9a84c" }}
              />
            </div>
          </button>
        </div>
      </motion.div>

    </section>
  );
}
