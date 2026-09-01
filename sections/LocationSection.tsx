"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Car, Train, Navigation } from "lucide-react";

const journeyStops = [
  { icon: Car,    label: "From Pune City",       distance: "60 km",  time: "~90 min",  via: "Via Sinhagad Road" },
  { icon: Car,    label: "From Mumbai",           distance: "180 km", time: "~3.5 hrs", via: "Via Pune Expressway" },
  { icon: Train,  label: "Pune Railway Station",  distance: "55 km",  time: "~85 min",  via: "Cab available on request" },
  { icon: MapPin, label: "Panshet Dam",           distance: "11 km",   time: "~30 min",   via: "Scenic lakeside route" },
];

export default function LocationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="location"
      ref={ref}
      style={{ backgroundColor: "#faf7f2", paddingTop: "clamp(3.5rem, 10vw, 7rem)", paddingBottom: "clamp(4rem, 11vw, 8rem)", position: "relative", overflow: "hidden" }}
    >
      {/* Background ambience */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: 520, height: 520, borderRadius: "50%", background: "rgba(26,58,42,.04)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(90px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(26,58,42,.05) 1px, transparent 1px)", backgroundSize: "44px 44px", pointerEvents: "none" }} />

      <div className="container-luxury" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(2rem, 6vw, 5.5rem)", alignItems: "center" }}>

          {/* ── Left: Content + Journey ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span style={{
              fontFamily: "var(--font-inter)", fontSize: "0.65rem",
              letterSpacing: "0.22em", textTransform: "uppercase" as const,
              color: "#c9a84c", border: "1px solid rgba(201,168,76,.35)",
              padding: "0.4rem 1.1rem", borderRadius: 2, display: "inline-block",
            }}>How to Reach</span>

            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontWeight: 400, fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
              lineHeight: 1.2, color: "#1a3a2a",
              marginTop: "1.25rem", marginBottom: "1.25rem",
            }}>
              Nestled in the Heart of the Western Ghats
            </h2>

            <div style={{ width: 48, height: 1, background: "linear-gradient(to right, #c9a84c, transparent)", marginBottom: "1.5rem" }} />

            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.95rem",
              color: "rgba(107,74,42,.7)", lineHeight: 1.85, marginBottom: "3rem",
            }}>
              Just 60 kilometers from Pune, Kambegi Resort is your escape from the urban rush —
              close enough for a weekend, yet far enough to feel a world away. The scenic drive
              through the Sahyadri mountains is itself an experience worth savoring.
            </p>

            {/* ── Journey Timeline ── */}
            <div style={{ position: "relative", paddingLeft: "1.75rem" }}>

              {/* Vertical connecting line */}
              <div style={{
                position: "absolute", left: "0.48rem",
                top: 10, bottom: 10, width: 1.5,
                background: "linear-gradient(to bottom, #c9a84c 0%, rgba(201,168,76,.25) 85%, transparent 100%)",
              }} />

              {journeyStops.map((stop, i) => (
                <motion.div
                  key={stop.label}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.12, duration: 0.6 }}
                  style={{
                    position: "relative",
                    marginBottom: i < journeyStops.length - 1 ? "1.75rem" : 0,
                  }}
                >
                  {/* Timeline node */}
                  <div style={{
                    position: "absolute", left: "-1.75rem", top: 6,
                    width: 12, height: 12, borderRadius: "50%",
                    background: i === 0 ? "#c9a84c" : i === journeyStops.length - 1 ? "#1a3a2a" : "#faf7f2",
                    border: `2px solid ${i === 0 ? "#c9a84c" : "#c9a84c"}`,
                    boxShadow: i === 0 ? "0 0 0 4px rgba(201,168,76,.15)" : "none",
                    zIndex: 1,
                  }} />

                  {/* Card */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem",
                      padding: "1rem 1.25rem",
                      background: i === 0 ? "rgba(26,58,42,.05)" : "rgba(255,255,255,.7)",
                      border: `1px solid ${i === 0 ? "rgba(201,168,76,.25)" : "rgba(201,168,76,.1)"}`,
                      borderRadius: 8, backdropFilter: "blur(8px)",
                      boxShadow: i === 0 ? "0 4px 24px rgba(26,58,42,.07)" : "0 2px 12px rgba(26,58,42,.04)",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      background: i === 0 ? "rgba(26,58,42,.08)" : "rgba(201,168,76,.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <stop.icon className="w-4 h-4" style={{ color: i === 0 ? "#1a3a2a" : "#c9a84c" }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", fontWeight: 500, color: "#1a3a2a" }}>{stop.label}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(107,74,42,.5)", marginTop: "0.1rem" }}>{stop.via}</p>
                    </div>

                    {/* Distance + time */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                        fontSize: "1.35rem", fontWeight: 400,
                        color: "#c9a84c", lineHeight: 1,
                      }}>{stop.distance}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", justifyContent: "flex-end", marginTop: "0.2rem" }}>
                        <Clock className="w-3 h-3" style={{ color: "rgba(107,74,42,.35)" }} />
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "rgba(107,74,42,.45)" }}>{stop.time}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <a
                href="https://maps.google.com/?q=Panshet,Pune,Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.6rem",
                  padding: "0.9rem 2rem",
                  background: "#1a3a2a", color: "#faf7f2",
                  borderRadius: 4, textDecoration: "none",
                  fontFamily: "var(--font-inter)", fontSize: "0.78rem",
                  letterSpacing: "0.12em", textTransform: "uppercase" as const,
                  fontWeight: 500, border: "none",
                }}
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </a>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(107,74,42,.4)", letterSpacing: "0.05em" }}>
                Panshet, Pune · 412108
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", height: "clamp(440px, 62vh, 640px)", borderRadius: 8, overflow: "hidden", boxShadow: "0 32px 80px rgba(26,58,42,.15)" }}>
              <Image
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85"
                alt="Panshet Lake - Kambegi Resort Location"
                fill className="object-cover"
                sizes="(max-width:768px)100vw,50vw"
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,58,42,.82) 0%, rgba(26,58,42,.25) 50%, transparent 100%)" }} />

              {/* GPS coordinates badge */}
              <div style={{
                position: "absolute", top: 20, right: 20,
                background: "rgba(250,247,242,.12)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(250,247,242,.2)",
                borderRadius: 6, padding: "0.6rem 0.9rem",
              }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#c9a84c", marginBottom: "0.2rem" }}>Coordinates</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: "rgba(250,247,242,.75)", fontWeight: 500 }}>18.3461° N, 73.7574° E</p>
              </div>

              {/* Animated location pin */}
              <div style={{ position: "absolute", top: "42%", left: "50%", transform: "translate(-50%, -50%)" }}>
                {/* Pulse rings */}
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 2.8], opacity: [0.45, 0] }}
                    transition={{ duration: 2.2, delay: i * 0.7, repeat: Infinity }}
                    style={{
                      position: "absolute", top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 52, height: 52, borderRadius: "50%",
                      border: "1px solid rgba(201,168,76,.45)",
                    }}
                  />
                ))}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: "rgba(26,58,42,.8)", backdropFilter: "blur(12px)",
                    border: "1.5px solid rgba(201,168,76,.6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(0,0,0,.3)",
                  }}>
                    <MapPin className="w-5 h-5" style={{ color: "#c9a84c" }} />
                  </div>
                  <div style={{ width: 2, height: 20, background: "linear-gradient(to bottom, #c9a84c, transparent)", marginTop: 4 }} />
                </motion.div>
              </div>

              {/* Location info card */}
              <div style={{
                position: "absolute", bottom: 24, left: 24, right: 24,
                background: "rgba(26,58,42,.88)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(201,168,76,.18)",
                borderRadius: 8, padding: "1.1rem 1.4rem",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c9a84c", marginBottom: "0.3rem" }}>Kambegi Resort</p>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.25rem", fontWeight: 400, color: "#faf7f2" }}>Panshet, Pune</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "rgba(250,247,242,.45)", marginTop: "0.15rem" }}>Maharashtra, India · 412108</p>
                </div>
                <div style={{ width: 1, height: 48, background: "rgba(201,168,76,.2)", margin: "0 1rem" }} />
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(250,247,242,.4)", marginBottom: "0.3rem" }}>Elevation</p>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", fontWeight: 400, color: "#faf7f2" }}>705 m</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "rgba(250,247,242,.4)" }}>Above sea level</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
