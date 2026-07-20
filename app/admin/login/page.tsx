"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, Eye, EyeOff, Leaf, ArrowRight } from "lucide-react";
import { authAPI } from "@/lib/api";
import { setToken, setUser, isAuthenticated, isAdmin } from "@/lib/auth";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated() && isAdmin()) router.push("/admin/dashboard");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.login(form);
      const { token, user } = res.data;
      if (user.role !== "admin") {
        toast.error("Access denied. Admin privileges required.");
        return;
      }
      setToken(token);
      setUser(user);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      // Hard redirect — guarantees fresh auth state read in layout
      window.location.href = "/admin/dashboard";
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.875rem 1rem 0.875rem 2.75rem",
    background: focusedField === field ? "rgba(201,168,76,.06)" : "rgba(255,255,255,.04)",
    border: `1px solid ${focusedField === field ? "rgba(201,168,76,.5)" : "rgba(255,255,255,.1)"}`,
    borderRadius: 8,
    color: "#e8f0e9",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color .2s, background .2s",
    boxSizing: "border-box",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#080e0a" }}>

      {/* ── Left panel — nature image ── */}
      <div
        className="hidden lg:block"
        style={{ flex: "0 0 52%", position: "relative", overflow: "hidden" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85"
          alt="Kambegi Forest"
          fill
          className="object-cover"
          sizes="52vw"
          priority
        />
        {/* Deep gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(8,14,10,.85) 0%, rgba(26,58,42,.55) 50%, rgba(8,14,10,.4) 100%)",
        }} />

        {/* Brand text on image */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(201,168,76,.15)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(201,168,76,.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Leaf className="w-5 h-5" style={{ color: "#c9a84c" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#faf7f2", fontSize: "1.1rem", letterSpacing: "0.1em", lineHeight: 1 }}>
                KAMBEGI
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#c9a84c", marginTop: 3 }}>
                Resort & Retreat
              </p>
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <p style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem,3.5vw,3rem)",
                fontWeight: 400, color: "#faf7f2",
                lineHeight: 1.2, marginBottom: "1rem",
              }}>
                Where Wilderness<br />Meets Wonder
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "rgba(250,247,242,.55)", lineHeight: 1.7, maxWidth: 380 }}>
                Manage your resort operations, bookings, and guest experiences from one elegant dashboard.
              </p>
              <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, #c9a84c, transparent)", marginTop: "1.5rem" }} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Right panel — login form ── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem", position: "relative", overflow: "hidden",
      }}>
        {/* Subtle glow */}
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 320, height: 320, borderRadius: "50%", background: "rgba(201,168,76,.04)", filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", left: "10%", width: 260, height: 260, borderRadius: "50%", background: "rgba(26,58,42,.2)", filter: "blur(80px)", pointerEvents: "none" }} />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 10 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Leaf className="w-5 h-5" style={{ color: "#c9a84c" }} />
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", color: "#e8f0e9", fontSize: "1.1rem", letterSpacing: "0.1em" }}>KAMBEGI</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Admin Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", fontWeight: 400, color: "#e8f0e9", lineHeight: 1.2, marginBottom: "0.5rem" }}>
              Welcome Back
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.875rem", color: "rgba(122,158,126,.8)" }}>
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Email */}
            <div style={{ position: "relative" }}>
              <Mail
                className="w-4 h-4"
                style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "email" ? "#c9a84c" : "#7a9e7e", transition: "color .2s" }}
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Email address"
                required
                style={inputStyle("email")}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative" }}>
              <Lock
                className="w-4 h-4"
                style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", color: focusedField === "password" ? "#c9a84c" : "#7a9e7e", transition: "color .2s" }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                placeholder="Password"
                required
                style={{ ...inputStyle("password"), paddingRight: "3rem" }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "0.9rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#7a9e7e", padding: 0, display: "flex", alignItems: "center" }}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.99 } : {}}
              style={{
                marginTop: "0.5rem",
                padding: "0.9rem 1.5rem",
                background: loading ? "rgba(201,168,76,.6)" : "#c9a84c",
                color: "#080e0a",
                border: "none",
                borderRadius: 8,
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                transition: "background .2s",
                width: "100%",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(8,14,10,.25)", borderTopColor: "#080e0a", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div style={{ margin: "1.75rem 0", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "rgba(122,158,126,.5)", letterSpacing: "0.1em" }}>DEMO</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.07)" }} />
          </div>

          {/* Demo credentials */}
          <div style={{
            padding: "1rem 1.2rem",
            background: "rgba(201,168,76,.05)",
            border: "1px solid rgba(201,168,76,.12)",
            borderRadius: 8,
            cursor: "pointer",
          }}
            onClick={() => setForm({ email: "admin@kambegiresort.com", password: "Admin@123" })}
          >
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "#c9a84c", fontWeight: 600, marginBottom: "0.4rem", letterSpacing: "0.08em" }}>
              Click to fill demo credentials
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(122,158,126,.75)", marginBottom: "0.15rem" }}>
              admin@kambegiresort.com
            </p>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: "rgba(122,158,126,.75)" }}>
              Admin@123
            </p>
          </div>

          {/* Back link */}
          <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
            <a
              href="/"
              style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "rgba(122,158,126,.6)", textDecoration: "none", transition: "color .2s" }}
            >
              ← Back to Resort Website
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
