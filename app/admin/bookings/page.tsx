"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, CheckCircle, XCircle, Calendar, Eye, X, Mail, Phone, Plus } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { bookingsAPI, roomsAPI } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

interface Booking {
  _id: string; bookingId: string; guestName: string; guestEmail: string; guestPhone: string;
  room: { _id: string; name: string; type: string; pricePerNight: number };
  checkIn: string; checkOut: string; nights: number;
  guests: { adults: number; children: number }; totalAmount: number; status: string;
  paymentStatus: string; specialRequests?: string; createdAt: string;
}
interface Room { _id: string; name: string; pricePerNight: number; }

const EMPTY_FORM = {
  guestName: "", guestEmail: "", guestPhone: "",
  roomId: "", checkIn: "", checkOut: "",
  adults: "2", children: "0",
  status: "pending", paymentStatus: "unpaid",
  specialRequests: "", source: "website",
};

const STATUS_OPTIONS = ["all", "pending", "confirmed", "cancelled", "completed", "no-show"];
const GOLD = "#c9a84c"; const TEXT = "#e8f0e9"; const MUTED = "#6b8f71";
const BORDER = "rgba(201,168,76,.1)"; const CARD = "rgba(16,25,18,.9)";
const inp: React.CSSProperties = {
  width: "100%", boxSizing: "border-box" as const,
  background: "rgba(255,255,255,.04)", border: `1px solid rgba(201,168,76,.15)`,
  borderRadius: 8, padding: "0.65rem 0.85rem",
  fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, outline: "none",
};
const lbl: React.CSSProperties = {
  fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED,
  letterSpacing: "0.08em", textTransform: "uppercase" as const,
  marginBottom: "0.4rem", display: "block",
};
const statusColor: Record<string, string> = {
  pending: "rgba(245,158,11,.15)", confirmed: "rgba(52,211,153,.15)",
  cancelled: "rgba(248,113,113,.15)", completed: "rgba(96,165,250,.15)", "no-show": "rgba(167,139,250,.15)",
};
const statusText: Record<string, string> = {
  pending: "#f59e0b", confirmed: "#34d399", cancelled: "#f87171", completed: "#60a5fa", "no-show": "#a78bfa",
};

function calcNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.ceil(diff / 86400000));
}

export default function AdminBookingsPage() {
  const [bookings,      setBookings]      = useState<Booking[]>([]);
  const [rooms,         setRooms]         = useState<Room[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [statusFilter,  setStatusFilter]  = useState("all");
  const [search,        setSearch]        = useState("");
  const [selected,      setSelected]      = useState<Booking | null>(null);
  const [showCreate,    setShowCreate]    = useState(false);
  const [form,          setForm]          = useState(EMPTY_FORM);
  const [saving,        setSaving]        = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (statusFilter !== "all") params.status = statusFilter;
      const res = await bookingsAPI.getAll(params);
      setBookings(res.data.data);
    } catch { toast.error("Failed to load bookings"); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  useEffect(() => {
    roomsAPI.getAll().then(r => setRooms(r.data.data)).catch(() => {});
  }, []);

  const set = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const selectedRoom = rooms.find(r => r._id === form.roomId);
  const nights = calcNights(form.checkIn, form.checkOut);
  const totalAmount = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  const handleCreate = async () => {
    if (!form.guestName || !form.guestEmail || !form.guestPhone)
      return toast.error("Guest name, email and phone are required");
    if (!form.roomId) return toast.error("Please select a room");
    if (!form.checkIn || !form.checkOut) return toast.error("Check-in and check-out dates required");
    if (nights <= 0) return toast.error("Check-out must be after check-in");

    setSaving(true);
    try {
      await bookingsAPI.create({
        guestName: form.guestName,
        guestEmail: form.guestEmail,
        guestPhone: form.guestPhone,
        room: form.roomId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: { adults: Number(form.adults), children: Number(form.children) },
        pricePerNight: selectedRoom?.pricePerNight || 0,
        totalAmount,
        status: form.status,
        paymentStatus: form.paymentStatus,
        specialRequests: form.specialRequests,
        source: form.source,
      });
      toast.success("Booking created successfully");
      setShowCreate(false);
      setForm(EMPTY_FORM);
      fetchBookings();
    } catch { toast.error("Failed to create booking"); }
    finally { setSaving(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await bookingsAPI.updateStatus(id, { status });
      toast.success(`Booking ${status}`);
      fetchBookings();
      setSelected(null);
    } catch { toast.error("Failed to update"); }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking permanently?")) return;
    try {
      await bookingsAPI.delete(id);
      toast.success("Deleted");
      fetchBookings();
      setSelected(null);
    } catch { toast.error("Failed to delete"); }
  };

  const filtered = bookings.filter(b =>
    b.guestName?.toLowerCase().includes(search.toLowerCase()) ||
    b.bookingId?.toLowerCase().includes(search.toLowerCase()) ||
    b.guestEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, borderRadius: 8,
    padding: "0.5rem 0.9rem", fontFamily: "var(--font-inter)", fontSize: "0.82rem",
    color: TEXT, outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: "#080d09" }}>
      <AdminTopbar title="Bookings" subtitle="Manage guest reservations" />

      <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

        {/* Toolbar */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <Search className="w-4 h-4" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: MUTED }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, ID or email…"
              style={{ ...inputStyle, paddingLeft: "2.25rem", width: "100%", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: "0.45rem 0.85rem", borderRadius: 6, cursor: "pointer",
                fontFamily: "var(--font-inter)", fontSize: "0.72rem",
                letterSpacing: "0.06em", fontWeight: statusFilter === s ? 600 : 400,
                background: statusFilter === s ? GOLD : "rgba(255,255,255,.04)",
                color: statusFilter === s ? "#080d09" : MUTED,
                border: `1px solid ${statusFilter === s ? GOLD : BORDER}`,
                textTransform: "capitalize",
              }}>{s}</button>
            ))}
          </div>
          {/* ── Add Booking ── */}
          <button
            onClick={() => setShowCreate(true)}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.6rem 1.1rem", background: GOLD, border: "none",
              borderRadius: 8, color: "#080d09", fontFamily: "var(--font-inter)",
              fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            <Plus className="w-4 h-4" /> Add Booking
          </button>
        </div>

        {/* Table */}
        <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.5rem", borderBottom: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", color: MUTED }}>
              <span style={{ color: TEXT, fontWeight: 600 }}>{filtered.length}</span> bookings found
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid rgba(201,168,76,.07)` }}>
                  {["Booking ID", "Guest", "Room", "Dates", "Amount", "Status", "Actions"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "0.75rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={7} style={{ padding: "0.9rem 1.25rem" }}>
                      <div style={{ height: 16, background: "rgba(255,255,255,.04)", borderRadius: 4, opacity: 0.6 }} />
                    </td></tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7}>
                    <div style={{ padding: "3rem", textAlign: "center" }}>
                      <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: MUTED, opacity: 0.3 }} />
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: MUTED, marginBottom: "1rem" }}>No bookings found</p>
                      <button onClick={() => setShowCreate(true)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem", background: GOLD, border: "none", borderRadius: 8, color: "#080d09", fontFamily: "var(--font-inter)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                        <Plus className="w-4 h-4" /> Create First Booking
                      </button>
                    </div>
                  </td></tr>
                ) : filtered.map(b => (
                  <tr key={b._id} style={{ borderBottom: `1px solid rgba(201,168,76,.04)`, cursor: "pointer" }}
                    onClick={() => setSelected(b)}>
                    <td style={{ padding: "1rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: GOLD, fontWeight: 600 }}>{b.bookingId}</td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, fontWeight: 500 }}>{b.guestName}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED, marginTop: 2 }}>{b.guestEmail}</p>
                    </td>
                    <td style={{ padding: "1rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: MUTED }}>{b.room?.name}</td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: TEXT }}>{formatDate(b.checkIn)}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED, marginTop: 2 }}>{b.nights} nights</p>
                    </td>
                    <td style={{ padding: "1rem 1.25rem", fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, fontWeight: 600 }}>{formatCurrency(b.totalAmount)}</td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <span style={{ padding: "0.25rem 0.7rem", borderRadius: 100, fontFamily: "var(--font-inter)", fontSize: "0.7rem", textTransform: "capitalize", fontWeight: 500, background: statusColor[b.status] || "rgba(255,255,255,.07)", color: statusText[b.status] || TEXT }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelected(b)} title="View" style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <Eye className="w-3.5 h-3.5" style={{ color: MUTED }} />
                        </button>
                        {b.status === "pending" && (
                          <button onClick={() => updateStatus(b._id, "confirmed")} title="Confirm" style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(52,211,153,.1)", border: "1px solid rgba(52,211,153,.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <CheckCircle className="w-3.5 h-3.5" style={{ color: "#34d399" }} />
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b._id)} title="Delete" style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                          <Trash2 className="w-3.5 h-3.5" style={{ color: "#f87171" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Create Booking Modal ── */}
      <AnimatePresence>
        {showCreate && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
            onClick={() => setShowCreate(false)}>
            <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }}
              style={{ background: "#0f1a12", border: `1px solid ${BORDER}`, borderRadius: 14, width: "100%", maxWidth: 580, maxHeight: "92vh", overflowY: "auto" }}
              onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${BORDER}`, position: "sticky", top: 0, background: "#0f1a12", zIndex: 1 }}>
                <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.15rem", color: TEXT }}>Create New Booking</p>
                <button onClick={() => setShowCreate(false)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <X className="w-4 h-4" style={{ color: MUTED }} />
                </button>
              </div>

              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>

                {/* Guest Info */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD }}>Guest Information</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={lbl}>Full Name *</label><input value={form.guestName} onChange={e => set("guestName")(e.target.value)} placeholder="e.g. Arjun Sharma" style={inp} /></div>
                  <div><label style={lbl}>Phone *</label><input value={form.guestPhone} onChange={e => set("guestPhone")(e.target.value)} placeholder="+91 98765 43210" style={inp} /></div>
                </div>
                <div><label style={lbl}>Email *</label><input value={form.guestEmail} onChange={e => set("guestEmail")(e.target.value)} placeholder="guest@email.com" style={inp} /></div>

                {/* Stay Details */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginTop: "0.25rem" }}>Stay Details</p>
                <div>
                  <label style={lbl}>Room *</label>
                  <select value={form.roomId} onChange={e => set("roomId")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                    <option value="" style={{ background: "#0f1a12" }}>— Select a room —</option>
                    {rooms.map(r => (
                      <option key={r._id} value={r._id} style={{ background: "#0f1a12" }}>
                        {r.name} — ₹{r.pricePerNight?.toLocaleString("en-IN")}/night
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={lbl}>Check-in *</label><input type="date" value={form.checkIn} onChange={e => set("checkIn")(e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Check-out *</label><input type="date" value={form.checkOut} onChange={e => set("checkOut")(e.target.value)} style={inp} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={lbl}>Adults</label>
                    <select value={form.adults} onChange={e => set("adults")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: "#0f1a12" }}>{n} Adult{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Children</label>
                    <select value={form.children} onChange={e => set("children")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                      {[0,1,2,3,4].map(n => <option key={n} value={n} style={{ background: "#0f1a12" }}>{n} Child{n !== 1 ? "ren" : ""}</option>)}
                    </select>
                  </div>
                </div>

                {/* Amount preview */}
                {nights > 0 && selectedRoom && (
                  <div style={{ background: "rgba(201,168,76,.07)", border: `1px solid rgba(201,168,76,.2)`, borderRadius: 8, padding: "0.85rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: MUTED }}>
                      {nights} night{nights > 1 ? "s" : ""} × ₹{selectedRoom.pricePerNight?.toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.15rem", color: GOLD }}>
                      ₹{totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Status */}
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginTop: "0.25rem" }}>Status & Source</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem" }}>
                  <div><label style={lbl}>Booking Status</label>
                    <select value={form.status} onChange={e => set("status")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                      {["pending","confirmed","completed","cancelled"].map(s => <option key={s} value={s} style={{ background: "#0f1a12", textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Payment</label>
                    <select value={form.paymentStatus} onChange={e => set("paymentStatus")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                      {["unpaid","partial","paid","refunded"].map(s => <option key={s} value={s} style={{ background: "#0f1a12", textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Source</label>
                    <select value={form.source} onChange={e => set("source")(e.target.value)} style={{ ...inp, appearance: "none", cursor: "pointer" }}>
                      {["website","phone","email","walk-in"].map(s => <option key={s} value={s} style={{ background: "#0f1a12" }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div><label style={lbl}>Special Requests</label>
                  <textarea value={form.specialRequests} onChange={e => set("specialRequests")(e.target.value)}
                    rows={3} placeholder="Any special requirements or notes…"
                    style={{ ...inp, resize: "vertical" as const, lineHeight: 1.6 }} />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem", borderTop: `1px solid ${BORDER}` }}>
                  <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: "0.7rem", borderRadius: 8, background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-inter)", fontSize: "0.82rem", cursor: "pointer" }}>Cancel</button>
                  <button onClick={handleCreate} disabled={saving} style={{ flex: 2, padding: "0.7rem", borderRadius: 8, background: GOLD, border: "none", color: "#080d09", fontFamily: "var(--font-inter)", fontSize: "0.82rem", fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>
                    {saving ? "Creating…" : "Create Booking"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.93, opacity: 0 }}
              style={{ background: "#0f1a12", border: `1px solid ${BORDER}`, borderRadius: 14, width: "100%", maxWidth: 520, overflow: "hidden" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", borderBottom: `1px solid ${BORDER}` }}>
                <div>
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem", color: TEXT }}>Booking Detail</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: GOLD, marginTop: 2 }}>{selected.bookingId}</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.05)", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <X className="w-4 h-4" style={{ color: MUTED }} />
                </button>
              </div>
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div style={{ background: "rgba(255,255,255,.03)", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "1rem 1.2rem" }}>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.63rem", letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "0.65rem" }}>Guest</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: TEXT, fontWeight: 600, marginBottom: "0.4rem" }}>{selected.guestName}</p>
                  <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: MUTED }}>
                      <Mail className="w-3.5 h-3.5" style={{ color: GOLD }} />{selected.guestEmail}
                    </span>
                    <span style={{ display: "flex", gap: "0.4rem", alignItems: "center", fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: MUTED }}>
                      <Phone className="w-3.5 h-3.5" style={{ color: GOLD }} />{selected.guestPhone}
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { label: "Room",      val: selected.room?.name },
                    { label: "Nights",    val: `${selected.nights} nights` },
                    { label: "Check-in",  val: formatDate(selected.checkIn) },
                    { label: "Check-out", val: formatDate(selected.checkOut) },
                    { label: "Amount",    val: formatCurrency(selected.totalAmount) },
                    { label: "Guests",    val: `${selected.guests?.adults || 0}A ${selected.guests?.children || 0}C` },
                  ].map(item => (
                    <div key={item.label} style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "0.75rem 1rem" }}>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.63rem", color: MUTED, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: TEXT, fontWeight: 500 }}>{item.val}</p>
                    </div>
                  ))}
                </div>
                {selected.specialRequests && (
                  <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 8, padding: "0.75rem 1rem" }}>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.63rem", color: MUTED, marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Special Requests</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, lineHeight: 1.6 }}>{selected.specialRequests}</p>
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{ padding: "0.3rem 0.85rem", borderRadius: 100, fontFamily: "var(--font-inter)", fontSize: "0.75rem", textTransform: "capitalize", fontWeight: 500, background: statusColor[selected.status] || "rgba(255,255,255,.07)", color: statusText[selected.status] || TEXT }}>
                    {selected.status}
                  </span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: MUTED }}>Payment: {selected.paymentStatus}</span>
                </div>
                <div style={{ display: "flex", gap: "0.6rem", paddingTop: "0.5rem", borderTop: `1px solid ${BORDER}` }}>
                  {selected.status === "pending" && (
                    <button onClick={() => updateStatus(selected._id, "confirmed")} style={{ flex: 1, padding: "0.65rem", borderRadius: 8, background: "rgba(52,211,153,.12)", border: "1px solid rgba(52,211,153,.25)", color: "#34d399", fontFamily: "var(--font-inter)", fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                      <CheckCircle className="w-4 h-4" /> Confirm
                    </button>
                  )}
                  {!["cancelled", "completed"].includes(selected.status) && (
                    <button onClick={() => updateStatus(selected._id, "cancelled")} style={{ flex: 1, padding: "0.65rem", borderRadius: 8, background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.2)", color: "#f87171", fontFamily: "var(--font-inter)", fontSize: "0.8rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  )}
                  <button onClick={() => deleteBooking(selected._id)} style={{ padding: "0.65rem 1rem", borderRadius: 8, background: "rgba(255,255,255,.04)", border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-inter)", fontSize: "0.8rem", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
