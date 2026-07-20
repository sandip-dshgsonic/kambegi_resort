"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, Users, BedDouble, X, ImageIcon } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ImageUpload from "@/components/admin/ImageUpload";
import { roomsAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface Room { _id: string; name: string; type: string; description: string; shortDescription: string; pricePerNight: number; maxGuests: number; bedrooms: number; images: { url: string }[]; isFeatured: boolean; isAvailable: boolean; rating: number; }
const EMPTY = { name:"", type:"villa", description:"", shortDescription:"", pricePerNight:"", maxGuests:"2", bedrooms:"1", imageUrl:"", isFeatured:false, isAvailable:true };
const TYPES = ["villa","suite","cottage","tent","glamping"];
const GOLD="#c9a84c"; const TEXT="#e8f0e9"; const MUTED="#6b8f71";
const BORDER="rgba(201,168,76,.1)"; const CARD="rgba(16,25,18,.9)";
const inp: React.CSSProperties = { width:"100%", boxSizing:"border-box" as const, background:"rgba(255,255,255,.04)", border:"1px solid rgba(201,168,76,.15)", borderRadius:8, padding:"0.65rem 0.85rem", fontFamily:"var(--font-inter)", fontSize:"0.83rem", color:TEXT, outline:"none" };
const lbl: React.CSSProperties = { fontFamily:"var(--font-inter)", fontSize:"0.7rem", color:MUTED, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"0.4rem", display:"block" };

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Room | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchRooms = async () => {
    try { const r = await roomsAPI.getAll(); setRooms(r.data.data); }
    catch { toast.error("Failed to load rooms"); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchRooms(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (r: Room) => {
    setEditing(r);
    setForm({ name:r.name, type:r.type, description:r.description, shortDescription:r.shortDescription||"", pricePerNight:String(r.pricePerNight), maxGuests:String(r.maxGuests), bedrooms:String(r.bedrooms), imageUrl:r.images?.[0]?.url||"", isFeatured:r.isFeatured, isAvailable:r.isAvailable });
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!form.name || !form.pricePerNight) return toast.error("Name and price required");
    setSaving(true);
    try {
      const payload = { ...form, price:Number(form.pricePerNight), pricePerNight:Number(form.pricePerNight), maxGuests:Number(form.maxGuests), bedrooms:Number(form.bedrooms), images: form.imageUrl ? [{ url:form.imageUrl, alt:form.name }] : [] };
      if (editing) { await roomsAPI.update(editing._id, payload); toast.success("Room updated"); }
      else { await roomsAPI.create(payload); toast.success("Room created"); }
      setShowModal(false); fetchRooms();
    } catch { toast.error("Failed to save"); } finally { setSaving(false); }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this room?")) return;
    try { await roomsAPI.delete(id); toast.success("Deleted"); fetchRooms(); } catch { toast.error("Failed"); }
  };
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#080d09" }}>
      <AdminTopbar title="Rooms & Suites" subtitle="Manage accommodation inventory" />
      <div style={{ flex:1, overflowY:"auto", padding:"1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem" }}>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}><span style={{ color:TEXT, fontWeight:600 }}>{rooms.length}</span> rooms configured</p>
          <button onClick={openCreate} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.1rem", background:GOLD, border:"none", borderRadius:8, color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:"pointer" }}>
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>
        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
            {[...Array(4)].map((_,i) => <div key={i} style={{ height:320, borderRadius:12, background:CARD, border:`1px solid ${BORDER}`, opacity:0.5 }} />)}
          </div>
        ) : rooms.length === 0 ? (
          <div style={{ padding:"4rem", textAlign:"center" }}>
            <BedDouble className="w-12 h-12 mx-auto mb-4" style={{ color:MUTED, opacity:0.3 }} />
            <p style={{ fontFamily:"var(--font-inter)", color:MUTED }}>No rooms yet — add your first room.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
            {rooms.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, overflow:"hidden" }}>
                <div style={{ position:"relative", height:180, background:"rgba(255,255,255,.04)" }}>
                  {r.images?.[0]?.url
                    ? <Image src={r.images[0].url} alt={r.name} fill className="object-cover" sizes="320px" />
                    : <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}><ImageIcon className="w-10 h-10" style={{ color:MUTED, opacity:0.3 }} /></div>
                  }
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,13,9,.8),transparent)" }} />
                  <div style={{ position:"absolute", top:10, left:10, display:"flex", gap:"0.35rem" }}>
                    <span style={{ padding:"0.18rem 0.6rem", background:"rgba(8,13,9,.75)", backdropFilter:"blur(8px)", border:`1px solid ${BORDER}`, borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", letterSpacing:"0.12em", textTransform:"uppercase", color:TEXT }}>{r.type}</span>
                    {r.isFeatured && <span style={{ padding:"0.18rem 0.6rem", background:"rgba(201,168,76,.2)", borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:GOLD }}>Featured</span>}
                  </div>
                  {!r.isAvailable && <div style={{ position:"absolute", top:10, right:10, padding:"0.18rem 0.6rem", background:"rgba(248,113,113,.2)", borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:"#f87171" }}>Unavailable</div>}
                </div>
                <div style={{ padding:"1.1rem 1.25rem" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"0.4rem" }}>
                    <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.1rem", fontWeight:400, color:TEXT }}>{r.name}</p>
                    <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1rem", color:GOLD }}>&#8377;{r.pricePerNight?.toLocaleString("en-IN")}</p>
                  </div>
                  <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.75rem", color:MUTED, lineHeight:1.6, marginBottom:"0.85rem" }}>
                    {(r.shortDescription||r.description||"").slice(0,90)}{(r.shortDescription||r.description||"").length>90?"…":""}
                  </p>
                  <div style={{ display:"flex", gap:"1rem", marginBottom:"1rem" }}>
                    <span style={{ display:"flex", gap:"0.3rem", alignItems:"center", fontFamily:"var(--font-inter)", fontSize:"0.72rem", color:MUTED }}><Users className="w-3.5 h-3.5" />{r.maxGuests}</span>
                    <span style={{ display:"flex", gap:"0.3rem", alignItems:"center", fontFamily:"var(--font-inter)", fontSize:"0.72rem", color:MUTED }}><BedDouble className="w-3.5 h-3.5" />{r.bedrooms}</span>
                    <span style={{ display:"flex", gap:"0.3rem", alignItems:"center", fontFamily:"var(--font-inter)", fontSize:"0.72rem", color:MUTED }}><Star className="w-3.5 h-3.5" style={{ fill:GOLD, color:GOLD }} />{r.rating||5}</span>
                  </div>
                  <div style={{ display:"flex", gap:"0.5rem", paddingTop:"0.85rem", borderTop:`1px solid ${BORDER}` }}>
                    <button onClick={() => openEdit(r)} style={{ flex:1, padding:"0.55rem", borderRadius:7, background:"rgba(201,168,76,.08)", border:"1px solid rgba(201,168,76,.18)", color:GOLD, fontFamily:"var(--font-inter)", fontSize:"0.78rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.35rem" }}><Pencil className="w-3.5 h-3.5" /> Edit</button>
                    <button onClick={() => handleDelete(r._id)} style={{ padding:"0.55rem 0.8rem", borderRadius:7, background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.15)", color:"#f87171", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale:0.93 }} animate={{ scale:1 }} exit={{ scale:0.93 }}
              style={{ background:"#0f1a12", border:`1px solid ${BORDER}`, borderRadius:14, width:"100%", maxWidth:540, maxHeight:"90vh", overflowY:"auto" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.5rem", borderBottom:`1px solid ${BORDER}`, position:"sticky", top:0, background:"#0f1a12", zIndex:1 }}>
                <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.1rem", color:TEXT }}>{editing?"Edit Room":"Add New Room"}</p>
                <button onClick={()=>setShowModal(false)} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><X className="w-4 h-4" style={{ color:MUTED }} /></button>
              </div>
              <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  <div><label style={lbl}>Name *</label><input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Forest Villa" style={inp} /></div>
                  <div><label style={lbl}>Type</label><select value={form.type} onChange={e=>set("type",e.target.value)} style={inp}>{TYPES.map(t=><option key={t} value={t} style={{background:"#0f1a12"}}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}</select></div>
                </div>
                <div><label style={lbl}>Short Description</label><input value={form.shortDescription} onChange={e=>set("shortDescription",e.target.value)} placeholder="One-line summary" style={inp} /></div>
                <div><label style={lbl}>Full Description</label><textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={3} style={{ ...inp, resize:"vertical" as const, lineHeight:1.6 }} /></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.75rem" }}>
                  <div><label style={lbl}>Price/Night *</label><input type="number" value={form.pricePerNight} onChange={e=>set("pricePerNight",e.target.value)} placeholder="15000" style={inp} /></div>
                  <div><label style={lbl}>Guests</label><input type="number" value={form.maxGuests} onChange={e=>set("maxGuests",e.target.value)} style={inp} /></div>
                  <div><label style={lbl}>Bedrooms</label><input type="number" value={form.bedrooms} onChange={e=>set("bedrooms",e.target.value)} style={inp} /></div>
                </div>
                <ImageUpload value={form.imageUrl} onChange={url => set("imageUrl", url)} label="Room Image" height={130} />
                <div style={{ display:"flex", gap:"1.5rem" }}>
                  {[{k:"isFeatured",l:"Featured"},{k:"isAvailable",l:"Available"}].map(({k,l}) => (
                    <label key={k} style={{ display:"flex", alignItems:"center", gap:"0.6rem", cursor:"pointer", fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}>
                      <div onClick={()=>set(k,!(form[k as keyof typeof form] as boolean))} style={{ width:40, height:22, borderRadius:11, background:form[k as keyof typeof form]?GOLD:"rgba(255,255,255,.1)", position:"relative", transition:"background .2s", cursor:"pointer", flexShrink:0 }}>
                        <div style={{ position:"absolute", top:3, left:form[k as keyof typeof form]?21:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
                      </div>{l}
                    </label>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"0.75rem", paddingTop:"0.5rem", borderTop:`1px solid ${BORDER}` }}>
                  <button onClick={()=>setShowModal(false)} style={{ flex:1, padding:"0.7rem", borderRadius:8, background:"rgba(255,255,255,.04)", border:`1px solid ${BORDER}`, color:MUTED, fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer" }}>Cancel</button>
                  <button onClick={handleSave} disabled={saving} style={{ flex:2, padding:"0.7rem", borderRadius:8, background:GOLD, border:"none", color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:saving?"not-allowed":"pointer", opacity:saving?0.7:1 }}>{saving?"Saving…":editing?"Update Room":"Create Room"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
