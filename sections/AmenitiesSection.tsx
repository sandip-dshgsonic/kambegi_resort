"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Utensils, Sparkles, Waves, Mountain, Droplets, Flower2, Footprints, Caravan, MoonStar, Clock, ArrowUpRight } from "lucide-react";

const amenities = [
  {
    icon: MoonStar, category: "Signature",  accent: "#c9a84c",
    name: "Dinner Under the Stars",
    desc: "An open-air amphitheatre set for candlelit dinners beneath the night sky — envisioned as Kambegi's signature evening experience.",
    timings: "Evenings Only",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=85",
  },
  {
    icon: Utensils, category: "Dining",     accent: "#c9a84c",
    name: "The Lakeview Dining Room",
    desc: "Our signature restaurant and café overlook Panshet Lake and the surrounding peaks, flowing straight out to the infinity pool deck — a memorable, panoramic dining experience from sunrise to starlight.",
    timings: "All-Day Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
  },
  {
    icon: Sparkles, category: "Spa",        accent: "#a78bfa",
    name: "Panshet Spa & Wellness",
    desc: "Ayurvedic treatments and nature-inspired therapies overlooking the forest canopy.",
    timings: "8 AM – 8 PM",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=85",
  },
  {
    icon: Waves,    category: "Activities", accent: "#4ade80",
    name: "Lake Water Sports",
    desc: "Kayaking, paddle boarding, and sunrise boat rides on pristine Panshet Lake.",
    timings: "6 AM – 6 PM",
    image: "/Images/lakeview.jpg",
  },
  {
    icon: Mountain, category: "Activities", accent: "#4ade80",
    name: "Forest Trekking",
    desc: "Guided walks through ancient forests revealing hidden waterfalls and rare wildlife.",
    timings: "5:30 AM – 11 AM",
    image: "/Images/waterfallview.jpg",
  },
  {
    icon: Footprints, category: "Activities", accent: "#4ade80",
    name: "Horse-Riding Trails",
    desc: "Guided rides along scenic trails skirting the resort — a rare experience among nearby properties.",
    timings: "By Appointment",
    image: "/Images/horse-riding.png",
  },
  {
    icon: Droplets, category: "Wellness",   accent: "#60a5fa",
    name: "Infinity Pool",
    desc: "Continuing on from the restaurant and café area, our stunning infinity pool merges seamlessly with the forest horizon.",
    timings: "6 AM – 9 PM",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=85",
  },
  {
    icon: Caravan, category: "Facilities",  accent: "#f59e0b",
    name: "Caravan Parking",
    desc: "Dedicated parking for caravans and road-trip travellers — an amenity rarely available at nearby resorts.",
    timings: "24-Hour Access",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=900&q=85",
  },
  {
    icon: Flower2, category: "Wellness",    accent: "#60a5fa",
    name: "Wellness & Activity Studio",
    desc: "A flexible indoor-outdoor studio for yoga, meditation, dance, fitness, and art workshops — for leisure guests and retreat groups alike.",
    timings: "Coming Soon",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=85",
  },
];

// Grid positions: [col-start/col-end] for 3-col grid
const gridCols = ["1 / 3", "3 / 4", "1 / 2", "2 / 3", "3 / 4", "1 / 2", "2 / 3", "3 / 4", "1 / 4"];
// Which cards show content in base state (not only hover)
const alwaysShow = [true, true, false, false, false, false, false, false, true];

const extraTags = ["Bonfire Nights", "Bird Watching", "Cycling Trails", "Cooking Classes", "Astro Nights", "Campfire Stories", "Organic Farming"];

export default function AmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="amenities"
      ref={ref}
      style={{ backgroundColor: "#faf7f2", paddingTop: "clamp(3.5rem, 10vw, 7rem)", paddingBottom: "clamp(4rem, 11vw, 8rem)", position: "relative", overflow: "hidden" }}
    >
      {/* Background */}
      <div style={{ position: "absolute", top: "5%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(26,58,42,.04)", filter: "blur(100px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 440, height: 440, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(26,58,42,.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem", position: "relative" }}
        >
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -55%)",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 700,
            color: "rgba(26,58,42,.04)", letterSpacing: "0.1em",
            whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", lineHeight: 1,
          }}>EXPERIENCES</div>

          <span style={{
            fontFamily: "var(--font-inter)", fontSize: "0.65rem",
            letterSpacing: "0.22em", textTransform: "uppercase" as const,
            color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
            padding: "0.4rem 1.1rem", borderRadius: 2, display: "inline-block",
          }}>Experiences</span>

          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15, color: "#1a3a2a",
            marginTop: "1.25rem", marginBottom: "1.25rem",
          }}>Life at Kambegi</h2>

          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "0 auto 1.75rem" }} />

          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "1rem",
            color: "rgba(107,74,42,.7)", lineHeight: 1.85,
            maxWidth: 560, margin: "0 auto",
          }}>
            Every moment at Kambegi is crafted to engage all your senses — from the first light
            through your window to the crackling fire under a moonlit sky.
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
            gridTemplateRows: "320px 280px 280px 240px",
            gap: "0.7rem",
          }}
        >
          {amenities.map((a, i) => (
            <motion.div
              key={a.name}
              className="group"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 8,
                gridColumn: gridCols[i],
                cursor: "default",
              }}
            >
              <Image
                src={a.image} alt={a.name} fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:640px)100vw,50vw"
              />

              {/* Base gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: alwaysShow[i]
                  ? "linear-gradient(to top, rgba(8,13,9,.85) 0%, rgba(8,13,9,.35) 55%, transparent 100%)"
                  : "linear-gradient(to top, rgba(8,13,9,.7) 0%, rgba(8,13,9,.2) 60%, transparent 100%)",
                transition: "opacity .4s ease",
              }} />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-400 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(8,13,9,.92) 0%, rgba(8,13,9,.5) 60%, transparent 100%)",
                  opacity: alwaysShow[i] ? 0 : 0,
                }}
              />

              {/* Top: category badge + icon */}
              <div style={{
                position: "absolute", top: 16, left: 16, right: 16,
                display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              }}>
                <span style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.25rem 0.65rem",
                  background: "rgba(8,13,9,.6)", backdropFilter: "blur(10px)",
                  border: `1px solid ${a.accent}40`,
                  borderRadius: 4,
                  fontFamily: "var(--font-inter)", fontSize: "0.6rem",
                  letterSpacing: "0.14em", textTransform: "uppercase" as const,
                  color: a.accent,
                }}>
                  <a.icon className="w-2.5 h-2.5" />
                  {a.category}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.3rem 0.6rem", background: "rgba(8,13,9,.5)", backdropFilter: "blur(8px)", borderRadius: 4, border: "1px solid rgba(250,247,242,.1)" }}>
                  <Clock className="w-2.5 h-2.5" style={{ color: "rgba(250,247,242,.5)" }} />
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: "rgba(250,247,242,.55)" }}>{a.timings}</span>
                </div>
              </div>

              {/* Bottom: name + desc + cta */}
              <div
                className={alwaysShow[i] ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-400"}
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "1.5rem",
                }}
              >
                {/* Accent line */}
                <div style={{ width: 32, height: 2, background: a.accent, marginBottom: "0.75rem", borderRadius: 1 }} />

                <h4 style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: i === 0 ? "1.6rem" : i === 8 ? "1.4rem" : "1.15rem",
                  fontWeight: 400, color: "#faf7f2", lineHeight: 1.2,
                  marginBottom: "0.5rem",
                }}>{a.name}</h4>

                <p
                  className={alwaysShow[i] ? "hidden md:block" : ""}
                  style={{
                    fontFamily: "var(--font-inter)", fontSize: "0.83rem",
                    color: "rgba(250,247,242,.65)", lineHeight: 1.65,
                    marginBottom: "0.85rem",
                    display: alwaysShow[i] ? undefined : "none",
                  }}
                >{a.desc}</p>

                <p
                  className={alwaysShow[i] ? "" : "group-hover:block hidden"}
                  style={{
                    fontFamily: "var(--font-inter)", fontSize: "0.83rem",
                    color: "rgba(250,247,242,.6)", lineHeight: 1.65,
                    marginBottom: "0.85rem",
                    display: alwaysShow[i] ? "none" : undefined,
                  }}
                >{a.desc}</p>

                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.45rem",
                    padding: "0.5rem 1rem",
                    background: "rgba(250,247,242,.08)", backdropFilter: "blur(8px)",
                    border: `1px solid ${a.accent}50`,
                    borderRadius: 4,
                    fontFamily: "var(--font-inter)", fontSize: "0.7rem",
                    letterSpacing: "0.1em", textTransform: "uppercase" as const,
                    color: a.accent, cursor: "pointer",
                  }}
                >
                  Book Now <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Also Available Tags ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ marginTop: "3.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,.2))" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(107,74,42,.4)", whiteSpace: "nowrap" }}>Also Available</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,.2))" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.65rem" }}>
            {extraTags.map((tag) => (
              <span key={tag} style={{
                padding: "0.5rem 1.25rem",
                fontFamily: "var(--font-inter)", fontSize: "0.72rem",
                letterSpacing: "0.14em", textTransform: "uppercase" as const,
                color: "rgba(107,74,42,.6)",
                border: "1px solid rgba(26,58,42,.12)",
                borderRadius: 100,
                background: "rgba(255,255,255,.65)", backdropFilter: "blur(4px)",
              }}>{tag}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
