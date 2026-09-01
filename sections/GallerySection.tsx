"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const galleryImages = [
  { id: 1, src: "/Images/riverview.jpg", alt: "Panshet", category: "nature" },
  { id: 2, src: "/Images/mountainview.jpg", alt: "Heritage Villa", category: "accommodation" },
  { id: 3, src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85", alt: "Private Pool Cabin", category: "accommodation" },
  { id: 4, src: "/Images/lakeview2.jpg", alt: "Panshet Lake", category: "nature" },
  { id: 5, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85", alt: "Fine Dining", category: "dining" },
  { id: 6, src: "/Images/morningview.jpg", alt: "Infinity Pool", category: "amenities" },
  { id: 7, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=85", alt: "Spa Treatment", category: "amenities" },
  { id: 8, src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85", alt: "Forest Walk", category: "nature" },
  { id: 9, src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=85", alt: "Yoga at Dawn", category: "activities" },
];

const categories = ["all", "nature", "accommodation", "dining", "amenities", "activities"];

// Bento grid positions for "all" view (9 images)
const bentoPos: React.CSSProperties[] = [
  { gridColumn: "1 / 3", gridRow: "1 / 3" },  // hero large
  { gridColumn: "3",     gridRow: "1" },
  { gridColumn: "3",     gridRow: "2" },
  { gridColumn: "1",     gridRow: "3" },
  { gridColumn: "2",     gridRow: "3" },
  { gridColumn: "3",     gridRow: "3" },
  { gridColumn: "1",     gridRow: "4" },
  { gridColumn: "2 / 4", gridRow: "4" },        // wide
  { gridColumn: "1 / 4", gridRow: "5" },        // panoramic full-width
];

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const isBento = activeCategory === "all";

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  };
  const navigate = (dir: number) => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + filtered.length) % filtered.length);
  };

  const categoryCounts = (cat: string) =>
    cat === "all" ? galleryImages.length : galleryImages.filter(i => i.category === cat).length;

  return (
    <section
      id="gallery"
      ref={ref}
      style={{ backgroundColor: "#1a3a2a", paddingTop: "clamp(3.5rem, 10vw, 7rem)", paddingBottom: "clamp(4rem, 11vw, 8rem)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glows */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 500, height: 500, borderRadius: "50%", background: "rgba(201,168,76,.06)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 380, height: 380, borderRadius: "50%", background: "rgba(45,90,61,.15)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative" }}
        >
          {/* Background watermark */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -55%)",
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(4rem, 11vw, 10rem)", fontWeight: 700,
            color: "rgba(250,247,242,.03)", letterSpacing: "0.1em",
            whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none", lineHeight: 1,
          }}>JOURNAL</div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase" as const,
              color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
              padding: "0.4rem 1.1rem", borderRadius: 2,
            }}>Visual Journal</span>
            <span style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "var(--font-inter)", fontSize: "0.65rem",
              color: "rgba(250,247,242,.3)", letterSpacing: "0.1em",
            }}>
              <Camera className="w-3 h-3" />
              {galleryImages.length} Photos
            </span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15, color: "#faf7f2",
            marginBottom: "1.25rem",
          }}>
            Kambegi Through the Lens
          </h2>
          <div style={{ width: 56, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "0 auto" }} />
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "3.5rem" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                padding: "0.5rem 1.15rem",
                fontFamily: "var(--font-inter)", fontSize: "0.68rem",
                letterSpacing: "0.12em", textTransform: "capitalize" as const,
                borderRadius: 100,
                border: activeCategory === cat ? "1px solid #c9a84c" : "1px solid rgba(250,247,242,.15)",
                background: activeCategory === cat ? "#c9a84c" : "rgba(250,247,242,.04)",
                color: activeCategory === cat ? "#1a3a2a" : "rgba(250,247,242,.5)",
                fontWeight: activeCategory === cat ? 600 : 400,
                cursor: "pointer", transition: "all .25s ease",
              }}
            >
              {cat}
              <span style={{
                fontSize: "0.58rem",
                background: activeCategory === cat ? "rgba(26,58,42,.2)" : "rgba(250,247,242,.1)",
                borderRadius: 100, padding: "0.05rem 0.4rem",
                color: activeCategory === cat ? "#1a3a2a" : "rgba(250,247,242,.35)",
              }}>
                {categoryCounts(cat)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={isBento ? "bento-grid" : ""}
            style={isBento ? {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "260px 260px 260px 260px 240px",
              gap: "0.65rem",
            } : {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))",
              gap: "0.65rem",
            }}
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group"
                onClick={() => openLightbox(i)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  borderRadius: 4,
                  ...(isBento ? bentoPos[i] : {}),
                  ...(isBento ? {} : { height: 260 }),
                }}
              >
                <Image
                  src={img.src} alt={img.alt} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transition: "transform 0.7s ease" }}
                  sizes="(max-width:640px)50vw,33vw"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to top, rgba(26,58,42,.75) 0%, rgba(26,58,42,.2) 50%, transparent 100%)", opacity: 0.3 }}
                />

                {/* Hover content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-4 transition-opacity duration-400 group-hover:opacity-100"
                  style={{ opacity: 0 }}
                >
                  {/* Top: index + zoom */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "var(--font-inter)", fontSize: "0.6rem",
                      letterSpacing: "0.18em", textTransform: "uppercase" as const,
                      color: "rgba(250,247,242,.55)",
                      background: "rgba(26,58,42,.65)", backdropFilter: "blur(8px)",
                      padding: "0.2rem 0.55rem", borderRadius: 3,
                    }}>
                      {String(i + 1).padStart(2, "0")} · {img.category}
                    </span>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: "rgba(250,247,242,.15)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(250,247,242,.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <ZoomIn className="w-4 h-4" style={{ color: "#faf7f2" }} />
                    </div>
                  </div>

                  {/* Bottom: caption */}
                  <div>
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1rem", color: "#faf7f2", fontWeight: 400, marginBottom: "0.2rem" }}>{img.alt}</p>
                    <div style={{ width: 24, height: 1, background: "#c9a84c" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ textAlign: "center", marginTop: "3.5rem" }}
        >
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(250,247,242,.35)", letterSpacing: "0.08em", marginBottom: "1.25rem" }}>
            Every image tells a story of wilderness, warmth, and wonder
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.85rem 2rem",
              background: "transparent", color: "#c9a84c",
              border: "1px solid rgba(201,168,76,.4)",
              borderRadius: 4,
              fontFamily: "var(--font-inter)", fontSize: "0.78rem",
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              fontWeight: 500, cursor: "pointer", transition: "all .3s ease",
            }}
          >
            Plan Your Visit
            <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem" }}>→</span>
          </button>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(8,13,9,.97)", backdropFilter: "blur(12px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
            }}
          >
            {/* Counter */}
            <div style={{ position: "absolute", top: 24, left: 24, fontFamily: "var(--font-inter)", fontSize: "0.72rem", letterSpacing: "0.2em", color: "rgba(250,247,242,.35)" }}>
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute", top: 20, right: 20,
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(250,247,242,.08)",
                border: "1px solid rgba(250,247,242,.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#faf7f2",
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "88vw", maxWidth: 1100, aspectRatio: "16/10" }}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Caption */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#faf7f2", fontWeight: 400 }}>
                {filtered[lightboxIndex].alt}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.35)", marginTop: "0.35rem" }}>
                {filtered[lightboxIndex].category}
              </p>
            </div>

            {/* Prev/Next */}
            {[{ dir: -1, Icon: ChevronLeft, side: "left" as const }, { dir: 1, Icon: ChevronRight, side: "right" as const }].map(({ dir, Icon, side }) => (
              <button
                key={side}
                onClick={(e) => { e.stopPropagation(); navigate(dir); }}
                style={{
                  position: "absolute", [side]: 20, top: "50%", transform: "translateY(-50%)",
                  width: 48, height: 48, borderRadius: "50%",
                  background: "rgba(250,247,242,.08)", border: "1px solid rgba(250,247,242,.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#faf7f2",
                }}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
