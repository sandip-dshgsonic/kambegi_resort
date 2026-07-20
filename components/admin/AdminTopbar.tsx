"use client";

import { useState, useEffect } from "react";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { getUser } from "@/lib/auth";

interface AdminTopbarProps { title: string; subtitle?: string; }

const BG   = "#080d09";
const CARD = "rgba(16,25,18,.95)";
const GOLD = "#c9a84c";
const TEXT = "#e8f0e9";
const MUTED = "#6b8f71";
const BORDER = "rgba(201,168,76,.1)";

export default function AdminTopbar({ title, subtitle }: AdminTopbarProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  useEffect(() => { setUser(getUser()); }, []);

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 1.5rem", height: 64, flexShrink: 0,
      background: CARD, borderBottom: `1px solid ${BORDER}`,
      backdropFilter: "blur(12px)",
    }}>
      {/* Left */}
      <div>
        <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.35rem", fontWeight: 400, color: TEXT, lineHeight: 1 }}>
          {title}
        </h1>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED, marginTop: 3 }}>
          {subtitle || today}
        </p>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Search */}
        <div className="hidden md:flex" style={{
          alignItems: "center", gap: "0.5rem",
          padding: "0.45rem 0.9rem",
          background: "rgba(255,255,255,.03)",
          border: `1px solid ${BORDER}`,
          borderRadius: 8,
        }}>
          <Search className="w-3.5 h-3.5" style={{ color: MUTED }} />
          <input
            placeholder="Quick search..."
            style={{
              background: "none", border: "none", outline: "none",
              fontFamily: "var(--font-inter)", fontSize: "0.8rem",
              color: TEXT, width: 140,
            }}
          />
        </div>

        {/* Bell */}
        <button style={{
          position: "relative", width: 36, height: 36, borderRadius: 8,
          background: "rgba(255,255,255,.03)", border: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}>
          <Bell className="w-4 h-4" style={{ color: MUTED }} />
          <span style={{
            position: "absolute", top: 8, right: 8,
            width: 6, height: 6, borderRadius: "50%",
            background: GOLD,
          }} />
        </button>

        {/* User */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.6rem",
          padding: "0.4rem 0.75rem 0.4rem 0.5rem",
          background: "rgba(201,168,76,.07)",
          border: `1px solid rgba(201,168,76,.18)`,
          borderRadius: 8, cursor: "default",
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "rgba(201,168,76,.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <User className="w-3.5 h-3.5" style={{ color: GOLD }} />
          </div>
          <div className="hidden sm:block">
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: TEXT, fontWeight: 500, lineHeight: 1 }}>
              {user?.name?.split(" ")[0] || "Admin"}
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: MUTED, marginTop: 2 }}>
              Administrator
            </p>
          </div>
          <ChevronDown className="w-3 h-3" style={{ color: MUTED }} />
        </div>
      </div>
    </header>
  );
}
