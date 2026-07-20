"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, BedDouble, MessageSquare, TrendingUp, CheckCircle, Clock, ArrowUpRight } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { bookingsAPI, roomsAPI, inquiriesAPI } from "@/lib/api";
import { formatCurrency, formatDate, STATUS_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Stats {
  totalBookings: number; pendingBookings: number; confirmedBookings: number; totalRevenue: number;
  recentBookings: Array<{ _id: string; bookingId: string; guestName: string; room: { name: string }; checkIn: string; status: string; totalAmount: number }>;
  monthlyRevenue: Array<{ _id: { month: number }; revenue: number; count: number }>;
}

const MONTHS = ["J","F","M","A","M","J","J","A","S","O","N","D"];
const GOLD = "#c9a84c"; const TEXT = "#e8f0e9"; const MUTED = "#6b8f71";
const BORDER = "rgba(201,168,76,.1)"; const CARD = "rgba(16,25,18,.9)";

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [rooms, setRooms] = useState(0);
  const [inquiries, setInquiries] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [sR, rR, iR] = await Promise.all([bookingsAPI.getStats(), roomsAPI.getAll(), inquiriesAPI.getAll({ status: "new" })]);
        setStats(sR.data.data); setRooms(rR.data.count); setInquiries(iR.data.count);
      } catch {
        setStats({ totalBookings: 47, pendingBookings: 8, confirmedBookings: 32, totalRevenue: 845000, recentBookings: [], monthlyRevenue: [] });
        setRooms(4); setInquiries(12);
      } finally { setLoading(false); }
    })();
  }, []);

  const cards = [
    { label: "Total Bookings",  val: stats?.totalBookings ?? 0,                   icon: Calendar,     color: GOLD,        note: "+12% this month" },
    { label: "Pending Review",  val: stats?.pendingBookings ?? 0,                  icon: Clock,        color: "#f59e0b",   note: "Needs attention" },
    { label: "Confirmed",       val: stats?.confirmedBookings ?? 0,                icon: CheckCircle,  color: "#34d399",   note: "Active guests" },
    { label: "Total Revenue",   val: formatCurrency(stats?.totalRevenue ?? 0),     icon: TrendingUp,   color: "#a78bfa",   note: "+28% YoY" },
    { label: "Active Rooms",    val: rooms,                                        icon: BedDouble,    color: "#60a5fa",   note: "All operational" },
    { label: "New Inquiries",   val: inquiries,                                    icon: MessageSquare,color: "#f87171",   note: "Awaiting reply" },
  ];

  const maxRev = Math.max(...(stats?.monthlyRevenue?.map(m => m.revenue) ?? [1]));

  const metrics = [
    { label: "Occupancy Rate",    val: "78%",       bar: 78 },
    { label: "Guest Satisfaction",val: "4.9 / 5",   bar: 98 },
    { label: "Repeat Guests",     val: "42%",       bar: 42 },
    { label: "Avg Stay Duration", val: "2.8 nights",bar: 56 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "#080d09" }}>
      <AdminTopbar title="Dashboard" subtitle="Welcome back — here's what's happening" />

      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[...Array(6)].map((_,i) => (
              <div key={i} style={{ height: 110, borderRadius: 12, background: CARD, border: `1px solid ${BORDER}`, opacity: 0.5 }} />
            ))}
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
              {cards.map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.2rem 1.4rem", position: "relative", overflow: "hidden" }}
                >
                  <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%", background: c.color, opacity: 0.05, transform: "translate(20px,-20px)" }} />
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <c.icon className="w-4.5 h-4.5" style={{ color: c.color, width: 18, height: 18 }} />
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" style={{ color: MUTED }} />
                  </div>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.65rem", fontWeight: 400, color: TEXT, lineHeight: 1, marginBottom: "0.3rem" }}>
                    {c.val}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: MUTED }}>{c.label}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: c.color, marginTop: "0.35rem", opacity: 0.8 }}>{c.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.25rem" }}>

              {/* Revenue Chart */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: TEXT, fontWeight: 500 }}>Monthly Revenue</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: MUTED, marginTop: 3 }}>Year-to-date performance</p>
                  </div>
                  <span style={{ padding: "0.25rem 0.7rem", background: "rgba(201,168,76,.1)", border: `1px solid ${BORDER}`, borderRadius: 100, fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: GOLD }}>
                    2024
                  </span>
                </div>
                {stats?.monthlyRevenue && stats.monthlyRevenue.length > 0 ? (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 140 }}>
                    {MONTHS.map((m, i) => {
                      const d = stats.monthlyRevenue.find(x => x._id.month === i + 1);
                      const h = d ? (d.revenue / maxRev) * 100 : 0;
                      return (
                        <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: "100%", height: `${Math.max(h, 3)}%`, background: d ? `linear-gradient(to top,${GOLD},rgba(201,168,76,.4))` : "rgba(255,255,255,.05)", borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                          <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.6rem", color: MUTED }}>{m}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: MUTED }}>No revenue data yet — bookings will appear here</p>
                  </div>
                )}
              </motion.div>

              {/* Metrics */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
                style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem" }}
              >
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: TEXT, fontWeight: 500, marginBottom: "1.25rem" }}>Performance</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  {metrics.map((m, i) => (
                    <div key={m.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: MUTED }}>{m.label}</span>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: TEXT }}>{m.val}</span>
                      </div>
                      <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 100, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.bar}%` }} transition={{ delay: 0.6 + i * 0.1, duration: 0.9 }}
                          style={{ height: "100%", background: `linear-gradient(90deg,${GOLD},rgba(201,168,76,.5))`, borderRadius: 100 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Bookings */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: TEXT, fontWeight: 500 }}>Recent Bookings</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED, marginTop: 2 }}>Latest reservation activity</p>
                </div>
                <a href="/admin/bookings" style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: GOLD, textDecoration: "none" }}>View all →</a>
              </div>
              {stats?.recentBookings && stats.recentBookings.length > 0 ? (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid rgba(201,168,76,.06)` }}>
                        {["Booking ID", "Guest", "Room", "Check-in", "Amount", "Status"].map(h => (
                          <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, fontWeight: 500 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentBookings.map(b => (
                        <tr key={b._id} style={{ borderBottom: `1px solid rgba(201,168,76,.04)` }}>
                          <td style={{ padding: "0.9rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: GOLD, fontWeight: 500 }}>{b.bookingId}</td>
                          <td style={{ padding: "0.9rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT }}>{b.guestName}</td>
                          <td style={{ padding: "0.9rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: MUTED }}>{b.room?.name}</td>
                          <td style={{ padding: "0.9rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: MUTED }}>{formatDate(b.checkIn)}</td>
                          <td style={{ padding: "0.9rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, fontWeight: 500 }}>{formatCurrency(b.totalAmount)}</td>
                          <td style={{ padding: "0.9rem 1.25rem" }}>
                            <span className={cn("px-2.5 py-1 text-xs rounded-full border", STATUS_COLORS[b.status])}>{b.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: "3rem", textAlign: "center" }}>
                  <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: MUTED, opacity: 0.3 }} />
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: MUTED }}>No bookings yet</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: MUTED, opacity: 0.5, marginTop: 4 }}>Bookings will appear here once guests start reserving</p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
