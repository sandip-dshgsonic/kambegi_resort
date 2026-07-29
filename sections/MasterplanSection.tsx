"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const masterplanItems = [
  {
    number: "01",
    title: "The Forest Estate",
    description: "At the heart of Kambegi lies the untouched forest — 40 acres of ancient trees, wildlife corridors, and natural springs that feed the estate.",
    // image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    image: "/Images/waterfallview.jpg",
    detail: "Forest trails, bird watching towers, meditation circles.",
  },
  {
    number: "02",
    title: "The Living Quarters",
    description: "Our accommodations are designed as islands of calm — each villa and suite positioned to maximize privacy and natural views.",
    image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=800&q=80",
    detail: "2 villa types plus private couple's cabins, each with private outdoor spaces.",
  },
  {
    number: "03",
    title: "The Lake Experience",
    description: "Panshet Lake forms the scenic backdrop for water activities, lakeside dining, and sunrise yoga sessions on floating platforms.",
    image: "/Images/lakeview.jpg",
    detail: "Kayaking, paddle boarding, boat rides, jetty dining.",
  },
  {
    number: "04",
    title: "The Wellness Campus",
    description: "A holistic wellness sanctuary offering Ayurvedic treatments, yoga pavilions, meditation gardens, and a breathtaking infinity pool.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    detail: "8 treatment rooms, yoga hall, meditation garden.",
  },
];

export default function MasterplanSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section
      id="masterplan"
      ref={ref}
      style={{ backgroundColor: "#f5f0e8", padding: "6rem 0 7rem", position: "relative", overflow: "hidden" }}
    >
      {/* Parallax watermark */}
      <motion.div
        style={{ y, position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden" }}
      >
        <span style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(8rem,18vw,20rem)",
          fontWeight: 700,
          color: "rgba(26,58,42,.03)",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          KAMBEGI
        </span>
      </motion.div>

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="label-tag">The Masterplan</span>
          <h2
            className="mt-5 mb-5"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
              lineHeight: 1.15,
              color: "#1a3a2a",
            }}
          >
            Designed for Discovery
          </h2>
          <div className="divider-gold" />
          <p
            className="mt-6 mx-auto"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              color: "rgba(107,74,42,.7)",
              lineHeight: 1.8,
              maxWidth: 600,
            }}
          >
            Every inch of Kambegi has been thoughtfully planned — from the placement of each villa
            to the winding forest paths that connect nature to nurture.
          </p>
        </motion.div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
          {masterplanItems.map((item, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: "grid",
                  gap: "clamp(2rem,5vw,5rem)",
                  alignItems: "center",
                }}
                className="grid-cols-1 md:grid-cols-2"
              >
                {/* Image */}
                <div style={{ position: "relative", order: isReversed ? 2 : 1 }}>
                  <div style={{ position: "relative", height: "clamp(280px,40vh,420px)", borderRadius: 3, overflow: "hidden" }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ transition: "transform .7s ease" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,58,42,.3), transparent)" }} />
                  </div>

                  {/* Number badge */}
                  <div style={{
                    position: "absolute", top: 0, left: 0,
                    width: 56, height: 56,
                    background: "#1a3a2a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      fontSize: "1.4rem", fontWeight: 400, color: "#c9a84c",
                    }}>
                      {item.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ order: isReversed ? 1 : 2 }}>
                  <div style={{ width: 32, height: 1, background: "#c9a84c", marginBottom: "1.5rem" }} />

                  <h3 style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 400,
                    fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                    lineHeight: 1.2,
                    color: "#1a3a2a",
                    marginBottom: "1rem",
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.95rem",
                    color: "rgba(107,74,42,.7)",
                    lineHeight: 1.8,
                    marginBottom: "1.5rem",
                  }}>
                    {item.description}
                  </p>

                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.6rem 1rem",
                    background: "rgba(26,58,42,.05)",
                    border: "1px solid rgba(26,58,42,.1)",
                    borderRadius: 3,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a84c", flexShrink: 0 }} />
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: "rgba(107,74,42,.65)" }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
