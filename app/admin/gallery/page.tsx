"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, Trash2, Star, X, ImageIcon } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import ImageUpload from "@/components/admin/ImageUpload";
import { galleryAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface GalleryItem { _id: string; title: string; url: string; category: string; isFeatured: boolean; }
const CATS = ["all","nature","accommodation","dining","amenities","activities"];
const EMPTY = { title:"", url:"", category:"nature", isFeatured:false };
const GOLD="#c9a84c"; const TEXT="#e8f0e9"; const MUTED="#6b8f71";
const BORDER="rgba(201,168,76,.1)"; const CARD="rgba(16,25,18,.9)";
const inp: React.CSSProperties = { width:"100%", boxSizing:"border-box" as const, background:"rgba(255,255,255,.04)", border:"1px solid rgba(201,168,76,.15)", borderRadius:8, padding:"0.65rem 0.85rem", fontFamily:"var(--font-inter)", fontSize:"0.83rem", color:TEXT, outline:"none" };
const lbl: React.CSSProperties = { fontFamily:"var(--font-inter)", fontSize:"0.7rem", color:MUTED, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"0.4rem", display:"block" };

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    try { const r = await galleryAPI.getAll(); setImages(r.data.data); }
    catch { toast.error("Failed to load gallery"); }
    finally { setLoading(false); }
  };
  useEffect(() => { fetchImages(); }, []);

  const handleAdd = async () => {
    if (!form.url) return toast.error("Image URL is required");
    setSaving(true);
    try { await galleryAPI.add(form); toast.success("Image added"); setShowModal(false); setForm(EMPTY); fetchImages(); }
    catch { toast.error("Failed to add"); } finally { setSaving(false); }
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    try { await galleryAPI.delete(id); toast.success("Removed"); fetchImages(); } catch { toast.error("Failed"); }
  };
  const toggleFeatured = async (item: GalleryItem) => {
    try { await galleryAPI.update(item._id, { isFeatured:!item.isFeatured }); fetchImages(); } catch { toast.error("Failed"); }
  };

  const filtered = filter === "all" ? images : images.filter(i => i.category === filter);
  const set = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#080d09" }}>
      <AdminTopbar title="Gallery" subtitle="Manage resort photo library" />
      <div style={{ flex:1, overflowY:"auto", padding:"1.5rem" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem", flexWrap:"wrap", gap:"0.75rem" }}>
          <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{ padding:"0.35rem 0.8rem", borderRadius:6, cursor:"pointer", fontFamily:"var(--font-inter)", fontSize:"0.72rem", letterSpacing:"0.06em", textTransform:"capitalize", background:filter===c?GOLD:"rgba(255,255,255,.04)", color:filter===c?"#080d09":MUTED, border:`1px solid ${filter===c?GOLD:BORDER}`, fontWeight:filter===c?600:400 }}>{c}</button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.1rem", background:GOLD, border:"none", borderRadius:8, color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:"pointer" }}>
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </div>

        {loading ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"0.75rem" }}>
            {[...Array(8)].map((_,i) => <div key={i} style={{ height:180, borderRadius:10, background:CARD, border:`1px solid ${BORDER}`, opacity:0.5 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:"4rem", textAlign:"center" }}>
            <ImageIcon className="w-12 h-12 mx-auto mb-4" style={{ color:MUTED, opacity:0.3 }} />
            <p style={{ fontFamily:"var(--font-inter)", color:MUTED }}>No photos yet in this category.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"0.75rem" }}>
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div key={img._id} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }} transition={{ delay:i*0.04 }}
                  className="group" style={{ position:"relative", height:180, borderRadius:10, overflow:"hidden", border:`1px solid ${BORDER}` }}>
                  <Image src={img.url} alt={img.title||"Gallery"} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="220px" />
                  <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background:"rgba(8,13,9,.6)", opacity:0 }} />
                  <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span style={{ padding:"0.15rem 0.5rem", background:"rgba(8,13,9,.75)", backdropFilter:"blur(8px)", borderRadius:4, fontFamily:"var(--font-inter)", fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"capitalize", color:TEXT }}>{img.category}</span>
                      <div style={{ display:"flex", gap:"0.3rem" }}>
                        <button onClick={() => toggleFeatured(img)} style={{ width:28, height:28, borderRadius:6, background:"rgba(0,0,0,.5)", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                          <Star className="w-3.5 h-3.5" style={{ color:img.isFeatured?GOLD:MUTED, fill:img.isFeatured?GOLD:"transparent" }} />
                        </button>
                        <button onClick={() => handleDelete(img._id)} style={{ width:28, height:28, borderRadius:6, background:"rgba(248,113,113,.2)", border:"1px solid rgba(248,113,113,.3)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                          <Trash2 className="w-3.5 h-3.5" style={{ color:"#f87171" }} />
                        </button>
                      </div>
                    </div>
                    <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.8rem", color:TEXT, fontWeight:500 }}>{img.title}</p>
                  </div>
                  {img.isFeatured && (
                    <div style={{ position:"absolute", top:8, left:8 }}>
                      <Star className="w-3.5 h-3.5" style={{ fill:GOLD, color:GOLD }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,.75)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale:0.93 }} animate={{ scale:1 }} exit={{ scale:0.93 }}
              style={{ background:"#0f1a12", border:`1px solid ${BORDER}`, borderRadius:14, width:"100%", maxWidth:460 }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.5rem", borderBottom:`1px solid ${BORDER}` }}>
                <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.1rem", color:TEXT }}>Add Photo</p>
                <button onClick={()=>setShowModal(false)} style={{ width:32, height:32, borderRadius:8, background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><X className="w-4 h-4" style={{ color:MUTED }} /></button>
              </div>
              <div style={{ padding:"1.5rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
                <div><label style={lbl}>Title</label><input value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Infinity Pool at Dusk" style={inp} /></div>
                <ImageUpload value={form.url} onChange={url => set("url", url)} label="Photo *" height={150} />
                <div><label style={lbl}>Category</label>
                  <select value={form.category} onChange={e=>set("category",e.target.value)} style={inp}>
                    {CATS.filter(c=>c!=="all").map(c=><option key={c} value={c} style={{background:"#0f1a12"}}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
                  </select>
                </div>
                <label style={{ display:"flex", alignItems:"center", gap:"0.6rem", cursor:"pointer", fontFamily:"var(--font-inter)", fontSize:"0.82rem", color:MUTED }}>
                  <div onClick={()=>set("isFeatured",!form.isFeatured)} style={{ width:40, height:22, borderRadius:11, background:form.isFeatured?GOLD:"rgba(255,255,255,.1)", position:"relative", transition:"background .2s", cursor:"pointer", flexShrink:0 }}>
                    <div style={{ position:"absolute", top:3, left:form.isFeatured?21:3, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
                  </div>Feature this photo
                </label>
                <div style={{ display:"flex", gap:"0.75rem", paddingTop:"0.5rem", borderTop:`1px solid ${BORDER}` }}>
                  <button onClick={()=>setShowModal(false)} style={{ flex:1, padding:"0.7rem", borderRadius:8, background:"rgba(255,255,255,.04)", border:`1px solid ${BORDER}`, color:MUTED, fontFamily:"var(--font-inter)", fontSize:"0.82rem", cursor:"pointer" }}>Cancel</button>
                  <button onClick={handleAdd} disabled={saving} style={{ flex:2, padding:"0.7rem", borderRadius:8, background:GOLD, border:"none", color:"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.82rem", fontWeight:600, cursor:saving?"not-allowed":"pointer", opacity:saving?0.7:1 }}>{saving?"Adding…":"Add to Gallery"}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
