"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Sparkles, Clock, X, Star } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { amenitiesAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface Amenity { _id: string; name: string; category: string; description: string; timings: string; price: number; isFeatured: boolean; isActive: boolean; icon: string; }
const EMPTY = { name:"", category:"dining", description:"", timings:"", price:"0", isFeatured:false, isActive:true };
const CATS = ["dining","spa","activities","wellness","recreation","services"];
const GOLD="#c9a84c"; const TEXT="#e8f0e9"; const MUTED="#6b8f71";
const BORDER="rgba(201,168,76,.1)"; const CARD="rgba(16,25,18,.9)";
const inp: React.CSSProperties = { width:"100%", boxSizing:"border-box" as const, background:"rgba(255,255,255,.04)", border:"1px solid rgba(201,168,76,.15)", borderRadius:8, padding:"0.65rem 0.85rem", fontFamily:"var(--font-inter)", fontSize:"0.83rem", color:TEXT, outline:"none" };
const lbl: React.CSSProperties = { fontFamily:"var(--font-inter)", fontSize:"0.7rem", color:MUTED, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"0.4rem", display:"block" };

const catColor: Record<string,string> = { dining:"#f59e0b", spa:"#a78bfa", activities:"#34d399", wellness:"#60a5fa", recreation:"#f87171", services:GOLD };

export default function AdminAmenitiesPage() {
  const [items, setItems] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Amenity | null>(null);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    try { const r = await amenitiesAPI.getAllAdmin(); setItems(r.data.data); }
    catch { toast.error("Failed to load amenities"); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (a: Amenity) => {
    setEditing(a);
    setForm({ name:a.name, category:a.category, description:a.description, timings:a.timings||"", price:String(a.price||0), isFeatured:a.isFeatured, isActive:a.isActive });
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!form.name) return toast.error("Name is required");
    setSaving(true);
    try {
      const payload = { ...form, price:Number(form.price) };
      if (editing) { await amenitiesAPI.update(editing._id, payload); toast.success("Updated"); }
      else { await amenitiesAPI.create(payload); toast.success("Created"); }
      setShowModal(false); fetchItems();
    } catch { toast.error("Failed to save"); } finally { setSaving(false); }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this amenity?")) return;
    try { await amenitiesAPI.delete(id); toast.success("Deleted"); fetchItems(); } catch { toast.error("Failed"); }
  };
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#080d09" }}>
      <AdminTopbar title="Amenities" subtitle="Manage resort experiences and facilities" />
      <div style={{ flex:1, overflowY:"auto", padding:"1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem" }}>
          <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}><span style={{ color:TEXT, fontWeight:600 }}>{items.length}</span> amenities listed</p>
          <button onClick={openCreate} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.1rem", background:GOLD, border:"none", borderRadius:8, color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:"pointer" }}>
            <Plus className="w-4 h-4" /> Add Amenity
          </button>
        </div>
        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
            {[...Array(6)].map((_,i) => <div key={i} style={{ height:200, borderRadius:12, background:CARD, border:`1px solid ${BORDER}`, opacity:0.5 }} />)}
          </div>
        ) : items.length === 0 ? (
          <div style={{ padding:"4rem", textAlign:"center" }}>
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color:MUTED, opacity:0.3 }} />
            <p style={{ fontFamily:"var(--font-inter)", color:MUTED }}>No amenities yet.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
            {items.map((a, i) => (
              <motion.div key={a._id} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
                style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:"1.25rem", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, right:0, width:80, height:80, borderRadius:"50%", background:catColor[a.category]||GOLD, opacity:0.05, transform:"translate(20px,-20px)" }} />
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"0.85rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"0.7rem" }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:`${catColor[a.category]||GOLD}18`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Sparkles className="w-5 h-5" style={{ color:catColor[a.category]||GOLD }} />
                    </div>
                    <div>
                      <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1rem", color:TEXT, lineHeight:1.2 }}>{a.name}</p>
                      <span style={{ padding:"0.12rem 0.5rem", background:`${catColor[a.category]||GOLD}15`, borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:catColor[a.category]||GOLD }}>{a.category}</span>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"0.3rem", flexShrink:0 }}>
                    {a.isFeatured && <Star className="w-3.5 h-3.5" style={{ fill:GOLD, color:GOLD }} />}
                    {!a.isActive && <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.6rem", color:"#f87171", background:"rgba(248,113,113,.1)", padding:"0.1rem 0.4rem", borderRadius:4 }}>Off</span>}
                  </div>
                </div>
                <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.78rem", color:MUTED, lineHeight:1.65, marginBottom:"0.75rem" }}>
                  {(a.description||"").slice(0,100)}{(a.description||"").length>100?"…":""}
                </p>
                {a.timings && (
                  <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", marginBottom:"0.85rem" }}>
                    <Clock className="w-3.5 h-3.5" style={{ color:GOLD, opacity:0.7 }} />
                    <span style={{ fontFamily:"var(--font-inter)", fontSize:"0.72rem", color:MUTED }}>{a.timings}</span>
                  </div>
                )}
                <div style={{ display:"flex", gap:"0.5rem", paddingTop:"0.85rem", borderTop:`1px solid ${BORDER}` }}>
                  <button onClick={() => openEdit(a)} style={{ flex:1, padding:"0.5rem", borderRadius:7, background:"rgba(201,168,76,.08)", border:"1px solid rgba(201,168,76,.18)", color:GOLD, fontFamily:"var(--font-inter)", fontSize:"0.78rem", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.35rem" }}><Pencil className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDelete(a._id)} style={{ padding:"0.5rem 0.8rem", borderRadius:7, background:"rgba(248,113,113,.08)", border:"1px solid rgba(248,113,113,.15)", color:"#f87171", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><Trash2 className="w-3.5 h-3.5" /></button>
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
              style={{ background:"#0f1a12", border:`1px solid ${BORDER}`, borderRadius:14, width:"100%", maxWidth:500, maxHeight:"90vh", overflowY:"auto" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.5rem", borderBottom:`1px solid ${BORDER}`, position:"sticky", top:0, background:"#0f1a12", zIndex:1 }}>
                <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.1rem", color:TEXT }}>{editing?"Edit Amenity":"Add Amenity"}</p>
                <button onClick={()=>setShowModal(false)} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><X className="w-4 h-4" style={{ color:MUTED }} /></button>
              </div>
              <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  <div><label style={lbl}>Name *</label><input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="e.g. Infinity Pool" style={inp} /></div>
                  <div><label style={lbl}>Category</label>
                    <select value={form.category} onChange={e=>set("category",e.target.value)} style={inp}>
                      {CATS.map(c=><option key={c} value={c} style={{background:"#0f1a12"}}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div><label style={lbl}>Description</label><textarea value={form.description} onChange={e=>set("description",e.target.value)} rows={3} style={{ ...inp, resize:"vertical" as const, lineHeight:1.6 }} /></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                  <div><label style={lbl}>Timings</label><input value={form.timings} onChange={e=>set("timings",e.target.value)} placeholder="6 AM – 9 PM" style={inp} /></div>
                  <div><label style={lbl}>Price (0 = free)</label><input type="number" value={form.price} onChange={e=>set("price",e.target.value)} style={inp} /></div>
                </div>
                <div style={{ display:"flex", gap:"1.5rem" }}>
                  {[{k:"isFeatured",l:"Featured"},{k:"isActive",l:"Active"}].map(({k,l}) => (
                    <label key={k} style={{ display:"flex", alignItems:"center", gap:"0.6rem", cursor:"pointer", fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}>
                      <div onClick={()=>set(k,!(form[k as keyof typeof form] as boolean))} style={{ width:40, height:22, borderRadius:11, background:form[k as keyof typeof form]?GOLD:"rgba(255,255,255,.1)", position:"relative", transition:"background .2s", cursor:"pointer", flexShrink:0 }}>
                        <div style={{ position:"absolute", top:3, left:form[k as keyof typeof form]?21:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
                      </div>{l}
                    </label>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"0.75rem", paddingTop:"0.5rem", borderTop:`1px solid ${BORDER}` }}>
                  <button onClick={()=>setShowModal(false)} style={{ flex:1, padding:"0.7rem", borderRadius:8, background:"rgba(255,255,255,.04)", border:`1px solid ${BORDER}`, color:MUTED, fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer" }}>Cancel</button>
                  <button onClick={handleSave} disabled={saving} style={{ flex:2, padding:"0.7rem", borderRadius:8, background:GOLD, border:"none", color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:saving?"not-allowed":"pointer", opacity:saving?0.7:1 }}>{saving?"Saving…":editing?"Update":"Create Amenity"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
