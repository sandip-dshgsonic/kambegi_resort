"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Leaf, Mountain, Droplets, Sun } from "lucide-react";

const pillars = [
  { num: "01", icon: Leaf,     title: "Eco‑Conscious",   desc: "Zero-waste philosophy. Every element is sustainably sourced and locally crafted." },
  { num: "02", icon: Mountain, title: "Wild & Untamed",   desc: "60+ acres of pristine forest, hidden trails, and cascading waterfalls await." },
  { num: "03", icon: Droplets, title: "Water & Serenity", desc: "Set beside Panshet Lake with panoramic views of shimmering blue waters." },
  { num: "04", icon: Sun,      title: "Soulful Luxury",   desc: "Ayurvedic wellness, farm‑to‑table dining, and bespoke curated experiences." },
];

const counters = [
  { num: "4",    text: "Unique Stays" },
  { num: "12+",  text: "Curated Experiences" },
  { num: "3",    text: "Dining Venues" },
  { num: "100%", text: "Organic Sourced" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={{ backgroundColor: "#faf7f2", padding: "7rem 0 8rem", position: "relative", overflow: "hidden" }}>

      {/* Background ambience */}
      <div style={{ position: "absolute", top: "5%", right: "-8%", width: 640, height: 640, borderRadius: "50%", background: "rgba(26,58,42,.04)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-6%", width: 440, height: 440, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(90px)", pointerEvents: "none" }} />
      {/* Subtle dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(26,58,42,.055) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "5.5rem", position: "relative" }}
        >
          {/* Large background watermark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -55%)",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 700,
            color: "rgba(26,58,42,.04)", letterSpacing: "0.1em",
            whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", lineHeight: 1,
          }}>EXPERTISE</div>

          <span style={{
            fontFamily: "var(--font-inter)", fontSize: "0.65rem",
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
            padding: "0.4rem 1.1rem", borderRadius: 2, display: "inline-block",
          }}>Our Expertise</span>

          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15, color: "#1a3a2a",
            marginTop: "1.25rem", marginBottom: "1.25rem",
          }}>
            Where Wilderness Meets Wonder
          </h2>

          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "0 auto 1.75rem" }} />

          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "1rem",
            color: "rgba(107,74,42,.7)", lineHeight: 1.85,
            maxWidth: 580, margin: "0 auto",
          }}>
            Kambegi is not just a resort — it is a living sanctuary. Conceived as a conversation
            between luxury and nature, every corner of this estate tells a story of the land it grew from.
          </p>
        </motion.div>

        {/* ── Split Layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(2rem, 6vw, 5.5rem)", alignItems: "center", marginBottom: "6.5rem" }}>

          {/* Left — Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative" }}
          >
            {/* Main image */}
            <div style={{ position: "relative", overflow: "hidden", height: "clamp(360px, 55vh, 560px)", borderRadius: 6 }}>
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=900&q=85"
                alt="Kambegi Resort forest" fill className="object-cover"
                sizes="(max-width:768px)100vw,50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,58,42,.45) 0%, transparent 60%)" }} />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                position: "absolute", bottom: -32, right: -16,
                background: "rgba(250,247,242,.97)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(201,168,76,.25)",
                borderRadius: 6, padding: "1.5rem 1.75rem",
                boxShadow: "0 24px 60px rgba(26,58,42,.12)", minWidth: 180,
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #c9a84c, transparent)", borderRadius: "6px 6px 0 0" }} />
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "3.25rem", fontWeight: 400, color: "#1a3a2a", lineHeight: 1 }}>60+</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(107,74,42,.5)", marginTop: "0.4rem" }}>Acres of pristine nature</p>
              <div style={{ width: 32, height: 1.5, background: "#c9a84c", marginTop: "1rem" }} />
            </motion.div>

            {/* Small accent image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                position: "absolute", top: -28, left: -16,
                width: "clamp(130px, 14vw, 200px)", height: "clamp(160px, 18vw, 240px)",
                borderRadius: 6, overflow: "hidden",
                border: "3px solid #faf7f2",
                boxShadow: "0 12px 40px rgba(26,58,42,.15)",
              }}
            >
              <Image src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80"
                alt="Luxury interiors" fill className="object-cover" sizes="200px" />
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase" as const,
              color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
              padding: "0.4rem 1.1rem", borderRadius: 2, display: "inline-block",
            }}>Est. 2020 · Panshet, Pune</span>

            <h3 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 400, fontSize: "clamp(1.7rem, 2.8vw, 2.6rem)",
              lineHeight: 1.2, color: "#1a3a2a",
              marginTop: "1.25rem", marginBottom: "1.25rem",
            }}>
              A Sanctuary Designed for the Mindful Traveler
            </h3>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "rgba(107,74,42,.7)", lineHeight: 1.85, marginBottom: "1rem" }}>
              Perched at the edge of the Western Ghats, Kambegi Resort was born from a singular
              vision: to create a place where luxury does not come at nature's expense, but because of it.
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "rgba(107,74,42,.7)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
              Each villa, cottage, and suite has been thoughtfully positioned to preserve the natural
              landscape — offering unobstructed views of the forest canopy, the lake, and rolling hills.
            </p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginBottom: "2.25rem" }}>
              {counters.map((c, i) => (
                <motion.div
                  key={c.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  style={{
                    padding: "1.1rem 1.25rem",
                    border: "1px solid rgba(201,168,76,.18)",
                    borderRadius: 6, background: "rgba(255,255,255,.75)",
                    backdropFilter: "blur(8px)", position: "relative", overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #c9a84c, transparent)", borderRadius: "6px 6px 0 0" }} />
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.25rem", fontWeight: 400, color: "#1a3a2a", lineHeight: 1 }}>{c.num}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(107,74,42,.5)", marginTop: "0.4rem" }}>{c.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => document.querySelector("#accommodation")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.65rem",
                padding: "0.9rem 2rem", background: "#1a3a2a", color: "#faf7f2",
                border: "none", borderRadius: 4,
                fontFamily: "var(--font-inter)", fontSize: "0.78rem",
                letterSpacing: "0.12em", textTransform: "uppercase" as const,
                fontWeight: 500, cursor: "pointer",
              }}
            >
              Discover Our Stays
              <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.15rem" }}>→</span>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Four Pillars ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,.25))" }} />
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(107,74,42,.45)", whiteSpace: "nowrap" }}>Our Four Pillars</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,.25))" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.7 }}
              whileHover={{ y: -6, boxShadow: "0 22px 55px rgba(26,58,42,.1)" }}
              style={{
                background: "#fff",
                border: "1px solid rgba(201,168,76,.15)",
                borderRadius: 8, padding: "2rem 1.75rem",
                position: "relative", overflow: "hidden",
                boxShadow: "0 2px 16px rgba(26,58,42,.04)",
                transition: "box-shadow .4s ease",
                cursor: "default",
              }}
            >
              {/* Gold top accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #c9a84c, rgba(201,168,76,.2))", borderRadius: "8px 8px 0 0" }} />
              {/* Number watermark */}
              <div style={{
                position: "absolute", top: -4, right: 14,
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "5.5rem", fontWeight: 700,
                color: "rgba(26,58,42,.05)", lineHeight: 1,
                userSelect: "none", pointerEvents: "none",
              }}>{p.num}</div>

              {/* Icon badge */}
              <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(26,58,42,.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <p.icon className="w-5 h-5" style={{ color: "#1a3a2a" }} />
              </div>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#c9a84c", marginBottom: "0.55rem" }}>{p.num}</p>

              <h4 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.2rem", fontWeight: 400, color: "#1a3a2a", marginBottom: "0.8rem" }}>{p.title}</h4>

              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.855rem", color: "rgba(107,74,42,.65)", lineHeight: 1.8 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
