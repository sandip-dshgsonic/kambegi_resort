"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

const navLinks = [
  { num: "01", label: "About",       href: "#about" },
  { num: "02", label: "Stays",       href: "#accommodation" },
  { num: "03", label: "Occasions",   href: "#occasions" },
  { num: "04", label: "Experiences", href: "#amenities" },
  { num: "05", label: "Gallery",     href: "#gallery" },
  { num: "06", label: "Location",    href: "#location" },
  { num: "07", label: "Contact",     href: "#contact" },
];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
      <span style={{
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: small ? "1.25rem" : "1.45rem",
        fontWeight: 400, letterSpacing: "0.32em",
        color: "#faf7f2", lineHeight: 1, display: "block",
        whiteSpace: "nowrap",
      }}>KAMBEGI</span>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ height: 1, width: 14, background: "#c9a84c", flexShrink: 0 }} />
        <span style={{
          fontFamily: "var(--font-inter)", fontSize: "0.46rem",
          letterSpacing: "0.36em", textTransform: "uppercase" as const,
          color: "#c9a84c", whiteSpace: "nowrap",
        }}>Resort & Retreat</span>
        <div style={{ height: 1, width: 14, background: "rgba(201,168,76,.3)", flexShrink: 0 }} />
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [hovered,   setHovered]   = useState<string | null>(null);
  const [active,    setActive]    = useState<string>("home");
  const [progress,  setProgress]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 70);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-35% 0px -60% 0px" }
    );
    navLinks.forEach(l => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navTo = (href: string) => {
    const wasOpen = menuOpen;
    setMenuOpen(false);
    setTimeout(
      () => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }),
      wasOpen ? 620 : 0
    );
  };

  const isActive = (href: string) => active === href.slice(1);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60, pointerEvents: "none" }}>
        <motion.div
          style={{ height: "100%", background: "linear-gradient(to right, #c9a84c, #d4b86a, rgba(201,168,76,.35))" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(8,16,10,.94)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(28px)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,.14)" : "1px solid transparent",
          padding: scrolled ? "0.75rem 0" : "1.4rem 0",
          transition: "background .4s ease, border-color .4s ease, padding .4s ease, backdrop-filter .4s ease",
        }}
      >
        <div
          className="container-luxury"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); navTo("#home"); }}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Logo />
          </a>

          {/* Desktop nav links — auto column keeps links at true center */}
          <nav
            className="hidden lg:flex"
            style={{ alignItems: "center", gap: "1.75rem", justifyContent: "center" }}
          >
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => navTo(link.href)}
                onMouseEnter={() => setHovered(link.label)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-inter)", fontSize: "0.67rem",
                  letterSpacing: "0.15em", textTransform: "uppercase" as const,
                  color: isActive(link.href)
                    ? "#c9a84c"
                    : hovered === link.label
                      ? "#faf7f2"
                      : "rgba(250,247,242,.68)",
                  paddingBottom: "0.35rem",
                  transition: "color .25s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
                <motion.div
                  animate={{ scaleX: hovered === link.label || isActive(link.href) ? 1 : 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                    background: isActive(link.href) ? "#c9a84c" : "rgba(201,168,76,.6)",
                    transformOrigin: "left",
                  }}
                />
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", justifyContent: "flex-end" }}>

            {/* Phone — tablet+ */}
            <a
              href="tel:+919876543210"
              className="hidden md:flex"
              style={{
                alignItems: "center", gap: "0.38rem",
                textDecoration: "none",
                fontFamily: "var(--font-inter)", fontSize: "0.62rem",
                letterSpacing: "0.07em",
                color: scrolled ? "#c9a84c" : "rgba(250,247,242,.5)",
                transition: "color .3s ease",
                whiteSpace: "nowrap",
              }}
            >
              <Phone style={{ width: 11, height: 11, flexShrink: 0 }} />
              +91 98765 43210
            </a>

            {/* Separator */}
            <div
              className="hidden lg:block"
              style={{ width: 1, height: 20, background: "rgba(201,168,76,.18)", flexShrink: 0 }}
            />

            {/* Book Now — desktop */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:inline-flex"
              onClick={() => navTo("#contact")}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.42rem",
                padding: "0.58rem 1.3rem",
                background: scrolled ? "#c9a84c" : "rgba(201,168,76,.1)",
                border: `1px solid ${scrolled ? "#c9a84c" : "rgba(201,168,76,.38)"}`,
                borderRadius: 3, cursor: "pointer",
                fontFamily: "var(--font-inter)", fontSize: "0.63rem",
                letterSpacing: "0.15em", textTransform: "uppercase" as const,
                fontWeight: scrolled ? 600 : 400,
                color: scrolled ? "#080d09" : "#c9a84c",
                transition: "all .3s ease",
                boxShadow: scrolled ? "0 4px 16px rgba(201,168,76,.22)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              Book Now
              <ArrowRight style={{ width: 10, height: 10 }} />
            </motion.button>

            {/* Hamburger — mobile/tablet */}
            <button
              className="flex lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: menuOpen ? "rgba(250,247,242,.07)" : "none",
                border: menuOpen ? "1px solid rgba(250,247,242,.12)" : "1px solid transparent",
                borderRadius: 6, cursor: "pointer",
                width: 38, height: 38, flexShrink: 0,
                alignItems: "center", justifyContent: "center",
                color: "#faf7f2", transition: "all .2s ease",
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:  90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X    style={{ width: 18, height: 18 }} />
                    </motion.span>
                  : <motion.span key="menu" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu style={{ width: 18, height: 18 }} />
                    </motion.span>
                }
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "#080f0a",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Faint watermark */}
            <div style={{
              position: "absolute", bottom: "-5%", right: "-8%",
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "55vw", fontWeight: 700, lineHeight: 1,
              color: "rgba(201,168,76,.025)",
              userSelect: "none", pointerEvents: "none",
            }}>K</div>

            <div style={{
              position: "absolute", top: "20%", left: "-10%",
              width: 400, height: 400, borderRadius: "50%",
              background: "rgba(26,58,42,.12)", filter: "blur(80px)", pointerEvents: "none",
            }} />

            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.35rem clamp(1.25rem, 6vw, 3rem)",
              borderBottom: "1px solid rgba(201,168,76,.1)", flexShrink: 0,
            }}>
              <Logo small />
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  width: 42, height: 42, borderRadius: 8,
                  background: "rgba(250,247,242,.06)",
                  border: "1px solid rgba(250,247,242,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#faf7f2", flexShrink: 0,
                }}
              >
                <X style={{ width: 17, height: 17 }} />
              </button>
            </div>

            {/* Nav items */}
            <div style={{
              flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "1rem clamp(1.25rem, 6vw, 3rem)",
              position: "relative", zIndex: 1, overflowY: "auto",
            }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: i * 0.065 + 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => navTo(link.href)}
                  style={{
                    display: "flex", alignItems: "center", gap: "1.25rem",
                    padding: "0.9rem 0",
                    background: "none", border: "none",
                    borderBottom: "1px solid rgba(250,247,242,.05)",
                    cursor: "pointer", width: "100%", textAlign: "left",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-inter)", fontSize: "0.57rem",
                    letterSpacing: "0.2em", color: "#c9a84c",
                    minWidth: 20, flexShrink: 0,
                  }}>{link.num}</span>

                  <span style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(1.4rem, 5.5vw, 2.2rem)", fontWeight: 400,
                    color: isActive(link.href) ? "#c9a84c" : "#faf7f2",
                    lineHeight: 1, flex: 1,
                    transition: "color .2s ease",
                  }}>{link.label}</span>

                  <motion.div
                    animate={{ x: isActive(link.href) ? 0 : -4, opacity: isActive(link.href) ? 1 : 0.2 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ArrowRight style={{ width: 15, height: 15, color: isActive(link.href) ? "#c9a84c" : "rgba(250,247,242,.22)" }} />
                  </motion.div>
                </motion.button>
              ))}
            </div>

            {/* Bottom bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.48, duration: 0.45 }}
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", flexWrap: "wrap",
                gap: "0.85rem",
                padding: "1.2rem clamp(1.25rem, 6vw, 3rem)",
                borderTop: "1px solid rgba(250,247,242,.06)",
                position: "relative", zIndex: 1,
              }}
            >
              <a
                href="tel:+919876543210"
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  textDecoration: "none",
                  fontFamily: "var(--font-inter)", fontSize: "0.75rem",
                  letterSpacing: "0.06em", color: "rgba(250,247,242,.42)",
                }}
              >
                <Phone style={{ width: 13, height: 13 }} />
                +91 98765 43210
              </a>

              <button
                onClick={() => navTo("#contact")}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.78rem 1.75rem",
                  background: "#c9a84c", color: "#080d09",
                  border: "none", borderRadius: 4, cursor: "pointer",
                  fontFamily: "var(--font-inter)", fontSize: "0.74rem",
                  letterSpacing: "0.14em", textTransform: "uppercase" as const,
                  fontWeight: 600,
                  boxShadow: "0 4px 20px rgba(201,168,76,.28)",
                  whiteSpace: "nowrap",
                }}
              >
                Book Your Stay
                <ArrowRight style={{ width: 13, height: 13 }} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
