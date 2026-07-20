"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, BedDouble, Image as ImageIcon,
  Sparkles, MessageSquare, Settings, LogOut, ChevronLeft,
  ChevronRight, Leaf,
} from "lucide-react";
import { authAPI } from "@/lib/api";
import { removeToken } from "@/lib/auth";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard",  href: "/admin/dashboard",  icon: LayoutDashboard },
  { label: "Bookings",   href: "/admin/bookings",   icon: Calendar },
  { label: "Rooms",      href: "/admin/rooms",      icon: BedDouble },
  { label: "Gallery",    href: "/admin/gallery",    icon: ImageIcon },
  { label: "Amenities",  href: "/admin/amenities",  icon: Sparkles },
  { label: "Inquiries",  href: "/admin/inquiries",  icon: MessageSquare },
  { label: "Settings",   href: "/admin/settings",   icon: Settings },
];

const gold = "#c9a84c";
const text = "#e8f0e9";
const muted  = "#7a9e7e";
const border = "rgba(201,168,76,.1)";

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = async () => {
    try { await authAPI.logout(); } catch {}
    removeToken();
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const W = collapsed ? 80 : 280;

  return (
    <motion.aside
      animate={{ width: W }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex", flexDirection: "column",
        height: "100vh",
        background: "#111a14",
        borderRight: `1px solid ${border}`,
        overflow: "hidden",
        flexShrink: 0,
        zIndex: 30,
        position: "relative",
      }}
    >
      {/* ── Logo ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1.25rem", borderBottom: `1px solid ${border}` }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(201,168,76,.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Leaf className="w-5 h-5" style={{ color: gold }} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            >
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: text, fontSize: "1.2rem", lineHeight: 1, letterSpacing: "0.08em" }}>
                KAMBEGI
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: gold, marginTop: "0.2rem" }}>
                Admin Portal
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "0.75rem 0.5rem", overflowY: "auto" }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.8rem 0.875rem",
                marginBottom: "0.15rem",
                borderRadius: 10,
                position: "relative",
                background: active ? "rgba(201,168,76,.1)" : "transparent",
                border: active ? `1px solid rgba(201,168,76,.2)` : "1px solid transparent",
                color: active ? gold : muted,
                textDecoration: "none",
                transition: "background .2s, color .2s, border-color .2s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              className="group hover:bg-white/5 hover:text-white"
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeNav"
                  style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 22, background: gold, borderRadius: 4 }}
                />
              )}

              <item.icon className="w-5 h-5 shrink-0" style={{ color: active ? gold : muted }} />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      fontWeight: active ? 500 : 400,
                      color: active ? gold : muted,
                      overflow: "hidden",
                    }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip when collapsed */}
              {collapsed && (
                <div style={{
                  position: "absolute", left: "100%", marginLeft: 10,
                  padding: "0.35rem 0.7rem",
                  background: "#1a3a2a", color: text,
                  fontSize: "0.8rem", fontFamily: "var(--font-inter)",
                  borderRadius: 6, whiteSpace: "nowrap",
                  border: `1px solid ${border}`,
                  opacity: 0, pointerEvents: "none",
                  transition: "opacity .2s",
                  zIndex: 50,
                }}
                className="group-hover:!opacity-100"
                >
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom ── */}
      <div style={{ padding: "0.75rem 0.5rem", borderTop: `1px solid ${border}` }}>
        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            width: "100%", padding: "0.75rem 0.875rem", borderRadius: 10,
            background: "transparent", color: "rgba(248,113,113,.7)",
            fontFamily: "var(--font-inter)", fontSize: "0.875rem",
            transition: "background .2s, color .2s",
            overflow: "hidden", whiteSpace: "nowrap",
          }}
          className="hover:bg-red-500/10 hover:!text-red-400"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            width: "100%", padding: "0.75rem 0.875rem", borderRadius: 10,
            background: "transparent", color: "rgba(232,240,233,.3)",
            fontFamily: "var(--font-inter)", fontSize: "0.8rem",
            transition: "background .2s, color .2s",
            overflow: "hidden", whiteSpace: "nowrap",
          }}
          className="hover:bg-white/5 hover:!text-white/60"
        >
          {collapsed
            ? <ChevronRight className="w-5 h-5 shrink-0" />
            : <ChevronLeft  className="w-5 h-5 shrink-0" />
          }
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}
