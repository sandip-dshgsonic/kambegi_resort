"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Trash2, Mail, Check, Archive, Clock, User, Phone, X } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { inquiriesAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface Inquiry { _id: string; name: string; email: string; phone?: string; roomType?: string; checkIn?: string; checkOut?: string; guests?: number; message: string; status: string; createdAt: string; }
const STATUSES = ["all","new","read","replied","archived"];
const GOLD="#c9a84c"; const TEXT="#e8f0e9"; const MUTED="#6b8f71";
const BORDER="rgba(201,168,76,.1)"; const CARD="rgba(16,25,18,.9)";

const statusStyle: Record<string,{bg:string;color:string}> = {
  new:      { bg:"rgba(52,211,153,.12)",  color:"#34d399" },
  read:     { bg:"rgba(96,165,250,.12)",  color:"#60a5fa" },
  replied:  { bg:"rgba(201,168,76,.12)",  color:GOLD      },
  archived: { bg:"rgba(255,255,255,.07)", color:MUTED     },
};

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const h = Math.floor(diff/3600000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const params: Record<string,string> = {};
      if (filter !== "all") params.status = filter;
      const r = await inquiriesAPI.getAll(params);
      setInquiries(r.data.data);
    } catch { toast.error("Failed to load inquiries"); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchInquiries(); }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try { await inquiriesAPI.update(id, { status }); toast.success(`Marked as ${status}`); fetchInquiries(); if (selected?._id === id) setSelected(p => p ? { ...p, status } : null); }
    catch { toast.error("Failed to update"); }
  };
  const handleSelect = async (inq: Inquiry) => {
    setSelected(inq);
    if (inq.status === "new") await updateStatus(inq._id, "read");
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try { await inquiriesAPI.delete(id); toast.success("Deleted"); setSelected(null); fetchInquiries(); } catch { toast.error("Failed"); }
  };

  const filtered = inquiries;

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#080d09" }}>
      <AdminTopbar title="Inquiries" subtitle="Guest messages and booking requests" />

      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Left pane — list */}
        <div style={{ width:340, flexShrink:0, borderRight:`1px solid ${BORDER}`, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Filter tabs */}
          <div style={{ padding:"0.75rem", borderBottom:`1px solid ${BORDER}`, display:"flex", gap:"0.3rem", flexWrap:"wrap" }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{
                padding:"0.3rem 0.7rem", borderRadius:6, cursor:"pointer", fontFamily:"var(--font-inter)", fontSize:"0.68rem", letterSpacing:"0.06em", textTransform:"capitalize",
                background: filter===s ? GOLD : "rgba(255,255,255,.04)",
                color: filter===s ? "#080d09" : MUTED,
                border: `1px solid ${filter===s ? GOLD : BORDER}`,
                fontWeight: filter===s ? 600 : 400,
              }}>{s}</button>
            ))}
          </div>
          {/* List */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {loading ? (
              [...Array(5)].map((_,i) => <div key={i} style={{ height:80, margin:"0.5rem", borderRadius:8, background:CARD, opacity:0.5 }} />)
            ) : filtered.length === 0 ? (
              <div style={{ padding:"3rem", textAlign:"center" }}>
                <MessageSquare className="w-10 h-10 mx-auto mb-3" style={{ color:MUTED, opacity:0.3 }} />
                <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}>No inquiries found</p>
              </div>
            ) : filtered.map(inq => (
              <div key={inq._id} onClick={() => handleSelect(inq)}
                style={{ padding:"1rem 1.1rem", borderBottom:`1px solid rgba(201,168,76,.05)`, cursor:"pointer", background: selected?._id===inq._id ? "rgba(201,168,76,.06)" : "transparent", borderLeft: selected?._id===inq._id ? `2px solid ${GOLD}` : "2px solid transparent", transition:"background .15s" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"0.3rem" }}>
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.85rem", color: inq.status==="new" ? TEXT : MUTED, fontWeight: inq.status==="new" ? 600 : 400 }}>{inq.name}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", flexShrink:0 }}>
                    {inq.status === "new" && <span style={{ width:6, height:6, borderRadius:"50%", background:"#34d399", flexShrink:0 }} />}
                    <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", color:MUTED }}>{timeAgo(inq.createdAt)}</span>
                  </div>
                </div>
                <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.75rem", color:MUTED, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{inq.message}</p>
                <div style={{ marginTop:"0.4rem" }}>
                  <span style={{ padding:"0.12rem 0.5rem", borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", textTransform:"capitalize", background: statusStyle[inq.status]?.bg||"rgba(255,255,255,.07)", color: statusStyle[inq.status]?.color||MUTED }}>{inq.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right pane — detail */}
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {selected ? (
            <>
              <div style={{ padding:"1.25rem 1.5rem", borderBottom:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.15rem", color:TEXT }}>{selected.name}</p>
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.7rem", color:MUTED, marginTop:2 }}>{new Date(selected.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
                </div>
                <span style={{ padding:"0.25rem 0.75rem", borderRadius:100, fontFamily:"var(--font-inter)", fontSize:"0.72rem", textTransform:"capitalize", background: statusStyle[selected.status]?.bg||"rgba(255,255,255,.07)", color: statusStyle[selected.status]?.color||MUTED }}>{selected.status}</span>
              </div>
              <div style={{ flex:1, overflowY:"auto", padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                {/* Contact info */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"0.75rem" }}>
                  {[
                    { icon:User,  label:"Guest",  val:selected.name },
                    { icon:Mail,  label:"Email",  val:selected.email },
                    ...(selected.phone ? [{ icon:Phone, label:"Phone", val:selected.phone }] : []),
                    ...(selected.guests ? [{ icon:User, label:"Guests", val:`${selected.guests} persons` }] : []),
                    ...(selected.roomType ? [{ icon:MessageSquare, label:"Room Type", val:selected.roomType }] : []),
                    ...(selected.checkIn ? [{ icon:Clock, label:"Check-in", val:new Date(selected.checkIn).toLocaleDateString("en-IN") }] : []),
                    ...(selected.checkOut ? [{ icon:Clock, label:"Check-out", val:new Date(selected.checkOut).toLocaleDateString("en-IN") }] : []),
                  ].map((item,i) => (
                    <div key={i} style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:10, padding:"0.75rem 1rem", display:"flex", alignItems:"center", gap:"0.65rem" }}>
                      <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color:GOLD }} />
                      <div>
                        <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.62rem", color:MUTED, textTransform:"uppercase", letterSpacing:"0.08em" }}>{item.label}</p>
                        <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:TEXT, marginTop:2 }}>{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Message */}
                <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:"1.25rem 1.5rem" }}>
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase", color:MUTED, marginBottom:"0.75rem" }}>Message</p>
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.9rem", color:TEXT, lineHeight:1.75, whiteSpace:"pre-wrap" }}>{selected.message}</p>
                </div>
                {/* Actions */}
                <div style={{ display:"flex", gap:"0.65rem", flexWrap:"wrap" }}>
                  {selected.status !== "replied" && (
                    <button onClick={() => updateStatus(selected._id, "replied")} style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.65rem 1.1rem", borderRadius:8, background:"rgba(201,168,76,.1)", border:`1px solid rgba(201,168,76,.25)`, color:GOLD, fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer" }}>
                      <Check className="w-4 h-4" /> Mark Replied
                    </button>
                  )}
                  {selected.status !== "archived" && (
                    <button onClick={() => updateStatus(selected._id, "archived")} style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.65rem 1.1rem", borderRadius:8, background:"rgba(255,255,255,.04)", border:`1px solid ${BORDER}`, color:MUTED, fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer" }}>
                      <Archive className="w-4 h-4" /> Archive
                    </button>
                  )}
                  <a href={`mailto:${selected.email}?subject=Re: Your inquiry at Kambegi Resort`} style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.65rem 1.1rem", borderRadius:8, background:"rgba(96,165,250,.1)", border:"1px solid rgba(96,165,250,.2)", color:"#60a5fa", fontFamily:"var(--font-inter)", fontSize:"0.82rem", textDecoration:"none" }}>
                    <Mail className="w-4 h-4" /> Reply via Email
                  </a>
                  <button onClick={() => handleDelete(selected._id)} style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.65rem 1.1rem", borderRadius:8, background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.18)", color:"#f87171", fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer", marginLeft:"auto" }}>
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"0.75rem" }}>
              <MessageSquare className="w-12 h-12" style={{ color:MUTED, opacity:0.2 }} />
              <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.9rem", color:MUTED }}>Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
