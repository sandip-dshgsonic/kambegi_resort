"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Users, BedDouble, ArrowRight, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const rooms = [
  {
    id: 1, name: "Heritage Villa", type: "5-Bedroom Villa", price: "On Request",
    desc: "Inspired by traditional architecture, this 2,600 sq. ft. villa wraps warm wooden interiors around a double-height dining space crowned by a skylight that fills the home with natural light. Unwind on the handcrafted wooden swing framing a sweeping 180° panoramic view, or slip into the temperature-controlled private plunge pool tucked within one of the five bedrooms.",
    guests: 10, bedrooms: 5, size: "2,600 sq.ft", rating: 5,
    badges: ["Skylight Dining Hall", "Wooden Swing · 180° View", "Private Plunge Pool"],
    accent: "#c9a84c",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=900&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80",
    ],
  },
  {
    id: 2, name: "Horizon Villa", type: "3-Bedroom Villa", price: "On Request",
    desc: "A study in contemporary elegance, this 1,800 sq. ft. villa is built around a soaring 24-foot double-height living room that opens to panoramic lake views and spectacular sunrise colours each morning. A pool table, generous seating area, and a separate TV/lounge room make it the ideal base for families and groups to gather.",
    guests: 6, bedrooms: 3, size: "1,800 sq.ft", rating: 5,
    accent: "#60a5fa",
    badges: ["24-ft Double-Height Living Room", "Lake Sunrise Views", "Pool Table & Lounge"],
    images: [
      "/Images/lakeview.jpg",
      "/Images/lakeview2.jpg",
    ],
  },
  {
    id: 3, name: "Private Pool Cabin", type: "Couple's Retreat", price: "On Request",
    desc: "An exclusive romantic escape for two — our luxury private cabins each come with their own private plunge pool, designed as an intimate retreat away from it all.",
    guests: 2, bedrooms: 1, size: "Private Suite", rating: 5,
    accent: "#f472b6",
    badges: ["Private Plunge Pool", "Couples Only", "Total Privacy"],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
    ],
  },
];

function RoomCard({ room, index }: { room: typeof rooms[0]; index: number }) {
  const [img, setImg] = useState(0);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "grid",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid rgba(196,168,130,.15)",
        boxShadow: "0 8px 48px rgba(26,58,42,.08)",
        background: "#fff",
        direction: isEven ? "ltr" : "rtl",
      }}
      className="grid-cols-1 md:grid-cols-2"
    >
      {/* Image half */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: "clamp(260px, 50vw, 480px)", direction: "ltr" }}>
        <AnimatePresence mode="wait">
          <motion.div key={img} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} style={{ position: "absolute", inset: 0 }}>
            <Image src={room.images[img]} alt={room.name} fill className="object-cover"
              sizes="(max-width:768px)100vw,50vw"
              style={{ transition: "transform 8s ease", transform: "scale(1.04)" }} />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,58,42,.6) 0%, rgba(26,58,42,.1) 50%, transparent 100%)" }} />

        {/* Type badge */}
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <span style={{
            padding: "0.25rem 0.85rem", borderRadius: 3,
            fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
            background: "rgba(26,58,42,.75)", backdropFilter: "blur(8px)",
            color: "#faf7f2", border: "1px solid rgba(250,247,242,.15)",
          }}>{room.type}</span>
        </div>

        {/* Rating */}
        <div style={{ position: "absolute", top: 20, right: 20, display: "flex", alignItems: "center", gap: 4, padding: "0.22rem 0.6rem", background: "rgba(250,247,242,.12)", backdropFilter: "blur(10px)", borderRadius: 3, border: "1px solid rgba(250,247,242,.2)" }}>
          <Star className="w-3 h-3" style={{ color: "#c9a84c", fill: "#c9a84c" }} />
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#faf7f2", fontWeight: 600 }}>{room.rating}.0</span>
        </div>

        {/* Image dots */}
        {room.images.length > 1 && (
          <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
            {room.images.map((_, i) => (
              <button key={i} onClick={() => setImg(i)} style={{ width: i === img ? 20 : 6, height: 6, borderRadius: 3, background: i === img ? "#faf7f2" : "rgba(250,247,242,.4)", border: "none", cursor: "pointer", transition: "all .3s", padding: 0 }} />
            ))}
          </div>
        )}

        {/* Nav arrows */}
        {room.images.length > 1 && (
          <>
            <button onClick={() => setImg((img - 1 + room.images.length) % room.images.length)}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(250,247,242,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(250,247,242,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronLeft className="w-4 h-4" style={{ color: "#faf7f2" }} />
            </button>
            <button onClick={() => setImg((img + 1) % room.images.length)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "rgba(250,247,242,.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(250,247,242,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <ChevronRight className="w-4 h-4" style={{ color: "#faf7f2" }} />
            </button>
          </>
        )}

        {/* Expand icon */}
        <div style={{ position: "absolute", bottom: 16, right: 16 }}>
          <Maximize2 className="w-4 h-4" style={{ color: "rgba(250,247,242,.5)" }} />
        </div>
      </div>

      {/* Content half */}
      <div style={{ padding: "clamp(2rem,5vw,3.5rem)", display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr", background: "#faf7f2" }}>

        {/* Accent line */}
        <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${room.accent}, transparent)`, marginBottom: "1.5rem", borderRadius: 2 }} />

        {/* Name + price */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(1.6rem,2.5vw,2.2rem)", color: "#1a3a2a", lineHeight: 1.15 }}>
            {room.name}
          </h3>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.3rem,2vw,1.75rem)", fontWeight: 400, color: "#1a3a2a" }}>
              {room.price}
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: "rgba(107,74,42,.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>Contact for Rates</p>
          </div>
        </div>

        {/* Desc */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "rgba(107,74,42,.7)", lineHeight: 1.85, marginBottom: "1.5rem" }}>
          {room.desc}
        </p>

        {/* Specs */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[
            { Icon: Users,     val: `${room.guests} Guests` },
            { Icon: BedDouble, val: `${room.bedrooms} Bed` },
            { Icon: Maximize2, val: room.size },
          ].map(({ Icon, val }) => (
            <span key={val} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(107,74,42,.65)" }}>
              <Icon className="w-3.5 h-3.5" style={{ color: "#c9a84c" }} />{val}
            </span>
          ))}
        </div>

        {/* Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {room.badges.map(b => (
            <span key={b} style={{
              padding: "0.28rem 0.85rem",
              fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.1em",
              color: "rgba(107,74,42,.75)", background: "rgba(26,58,42,.06)",
              border: "1px solid rgba(26,58,42,.1)", borderRadius: 100,
            }}>{b}</span>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ x: 4 }}
          style={{
            alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "0.6rem",
            padding: "0.85rem 1.75rem",
            background: "#1a3a2a", color: "#faf7f2",
            border: "none", borderRadius: 3, cursor: "pointer",
            fontFamily: "var(--font-inter)", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500,
          }}
        >
          Book This Stay <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function AccommodationSection() {
  return (
    <section id="accommodation" style={{ backgroundColor: "#f5f0e8", padding: "6rem 0 7rem", position: "relative", overflow: "hidden" }}>

      {/* Ambient blob */}
      <div style={{ position: "absolute", top: "30%", right: 0, width: 500, height: 500, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div className="container-luxury">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="label-tag">Our Stays</span>
          <h2
            className="mt-5 mb-5"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem,4.5vw,3.75rem)", lineHeight: 1.15, color: "#1a3a2a" }}
          >
            Choose Your Sanctuary
          </h2>
          <div className="divider-gold" />
          <p
            className="mt-6 mx-auto"
            style={{ fontFamily: "var(--font-inter)", fontSize: "1rem", color: "rgba(107,74,42,.68)", lineHeight: 1.8, maxWidth: 560 }}
          >
            From the wood-panelled warmth of our Heritage Villa to the sleek, lake-facing Horizon Villa and our private couple&apos;s pool cabins — each stay is a distinct encounter with luxury and nature.
          </p>
        </motion.div>

        {/* Room cards — alternating layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {rooms.map((r, i) => (
            <div key={r.id}>
              {/* Mobile: stacked. Desktop: alternating split */}
              <div className="hidden md:block">
                <RoomCard room={r} index={i} />
              </div>
              {/* Mobile card */}
              <motion.div
                className="md:hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ background: "#fff", borderRadius: 6, overflow: "hidden", border: "1px solid rgba(196,168,130,.15)", boxShadow: "0 4px 24px rgba(26,58,42,.07)" }}
              >
                <div style={{ position: "relative", height: 240 }}>
                  <Image src={r.images[0]} alt={r.name} fill className="object-cover" sizes="100vw" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,58,42,.6), transparent)" }} />
                  <div style={{ position: "absolute", top: 14, left: 14 }}>
                    <span style={{ padding: "0.22rem 0.7rem", background: "rgba(26,58,42,.75)", backdropFilter: "blur(8px)", borderRadius: 3, fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#faf7f2" }}>{r.type}</span>
                  </div>
                  <div style={{ position: "absolute", bottom: 14, left: 16, right: 16, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.4rem", fontWeight: 400, color: "#faf7f2" }}>{r.name}</p>
                    <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: "#c9a84c" }}>{r.price}</p>
                  </div>
                </div>
                <div style={{ padding: "1.25rem 1.4rem 1.6rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "rgba(107,74,42,.7)", lineHeight: 1.75, marginBottom: "1rem" }}>{r.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
                    {r.badges.map(b => <span key={b} style={{ padding: "0.22rem 0.7rem", fontFamily: "var(--font-inter)", fontSize: "0.62rem", letterSpacing: "0.08em", color: "rgba(107,74,42,.7)", background: "rgba(26,58,42,.05)", border: "1px solid rgba(26,58,42,.1)", borderRadius: 100 }}>{b}</span>)}
                  </div>
                  <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                    style={{ width: "100%", padding: "0.8rem", background: "#1a3a2a", color: "#faf7f2", border: "none", borderRadius: 3, fontFamily: "var(--font-inter)", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
                    Book This Stay
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: "relative", overflow: "hidden", marginTop: "3.5rem", borderRadius: 6, background: "#1a3a2a", padding: "clamp(2.5rem,6vw,4.5rem)", textAlign: "center" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(45,90,61,.5) 0%, transparent 60%)" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "rgba(201,168,76,.06)", filter: "blur(60px)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="label-tag" style={{ color: "#c9a84c", borderColor: "rgba(201,168,76,.35)" }}>Bespoke Experiences</span>
            <h3 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(1.6rem,3vw,2.6rem)", color: "#faf7f2", lineHeight: 1.2, marginTop: "1rem", marginBottom: "0.85rem" }}>
              Can&apos;t Decide? Let Us Curate Your Stay
            </h3>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.92rem", color: "rgba(250,247,242,.58)", maxWidth: 420, margin: "0 auto 2rem", lineHeight: 1.8 }}>
              Our concierge will craft the perfect package tailored to your preferences, celebrations, or wellness goals.
            </p>
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn-gold">
              Speak to Concierge
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
