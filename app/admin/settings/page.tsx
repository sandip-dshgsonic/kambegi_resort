"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Phone, Mail, MapPin, Clock, Shield, Bell, Check } from "lucide-react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import toast from "react-hot-toast";

const GOLD="#c9a84c"; const TEXT="#e8f0e9"; const MUTED="#6b8f71";
const BORDER="rgba(201,168,76,.1)"; const CARD="rgba(16,25,18,.9)";

const inp: React.CSSProperties = { width:"100%", boxSizing:"border-box" as const, background:"rgba(255,255,255,.04)", border:"1px solid rgba(201,168,76,.15)", borderRadius:8, padding:"0.65rem 0.85rem", fontFamily:"var(--font-inter)", fontSize:"0.83rem", color:TEXT, outline:"none" };
const lbl: React.CSSProperties = { fontFamily:"var(--font-inter)", fontSize:"0.7rem", color:MUTED, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"0.4rem", display:"block" };

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ width:44, height:24, borderRadius:12, background:on?GOLD:"rgba(255,255,255,.1)", position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:4, left:on?24:4, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
    </div>
  );
}

function Field({ label, icon: Icon, ...props }: { label: string; icon?: React.ComponentType<{className?:string;style?:React.CSSProperties}>; } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label style={lbl}>{label}</label>
      <div style={{ position:"relative" }}>
        {Icon && <Icon className="w-3.5 h-3.5" style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:MUTED }} />}
        <input {...props} style={{ ...inp, paddingLeft: Icon ? "2.2rem" : "0.85rem" }} />
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [info, setInfo] = useState({ name:"Kambegi Resort", email:"stay@kambegiresort.com", phone:"+91 98765 43210", address:"Near Panshet Dam, Pune, Maharashtra 412108", website:"www.kambegiresort.com", gst:"27XXXXX1234X1ZX" });
  const [policy, setPolicy] = useState({ checkIn:"14:00", checkOut:"11:00", minStay:"1", cancelHours:"48", advancePayment:"30" });
  const [notifs, setNotifs] = useState({ newBooking:true, newInquiry:true, cancellation:true, checkInReminder:false, reviewRequest:false });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false); setSaved(true);
    toast.success("Settings saved successfully");
    setTimeout(() => setSaved(false), 2500);
  };

  const sectionCard = (children: React.ReactNode) => (
    <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:12, padding:"1.5rem" }}>{children}</div>
  );

  const sectionHeader = (title: string, subtitle: string) => (
    <div style={{ marginBottom:"1.25rem" }}>
      <p style={{ fontFamily:"var(--font-playfair), Georgia, serif", fontSize:"1.05rem", color:TEXT }}>{title}</p>
      <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.75rem", color:MUTED, marginTop:3 }}>{subtitle}</p>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:"#080d09" }}>
      <AdminTopbar title="Settings" subtitle="Configure resort preferences and policies" />
      <div style={{ flex:1, overflowY:"auto", padding:"1.5rem", maxWidth:780 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>

          {/* Resort Info */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}>
            {sectionCard(<>
              {sectionHeader("Resort Information", "Basic details shown to guests on the website")}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                <Field label="Resort Name" icon={Globe} value={info.name} onChange={e=>setInfo(p=>({...p,name:e.target.value}))} />
                <Field label="Email" icon={Mail} type="email" value={info.email} onChange={e=>setInfo(p=>({...p,email:e.target.value}))} />
                <Field label="Phone" icon={Phone} value={info.phone} onChange={e=>setInfo(p=>({...p,phone:e.target.value}))} />
                <Field label="Website" icon={Globe} value={info.website} onChange={e=>setInfo(p=>({...p,website:e.target.value}))} />
                <div style={{ gridColumn:"span 2" }}>
                  <Field label="Address" icon={MapPin} value={info.address} onChange={e=>setInfo(p=>({...p,address:e.target.value}))} />
                </div>
                <Field label="GST Number" icon={Shield} value={info.gst} onChange={e=>setInfo(p=>({...p,gst:e.target.value}))} />
              </div>
            </>)}
          </motion.div>

          {/* Booking Policy */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
            {sectionCard(<>
              {sectionHeader("Booking Policies", "Rules applied to all reservations")}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1rem" }}>
                <Field label="Check-in Time" icon={Clock} type="time" value={policy.checkIn} onChange={e=>setPolicy(p=>({...p,checkIn:e.target.value}))} />
                <Field label="Check-out Time" icon={Clock} type="time" value={policy.checkOut} onChange={e=>setPolicy(p=>({...p,checkOut:e.target.value}))} />
                <Field label="Min Stay (nights)" type="number" value={policy.minStay} onChange={e=>setPolicy(p=>({...p,minStay:e.target.value}))} />
                <Field label="Free Cancel (hours)" type="number" value={policy.cancelHours} onChange={e=>setPolicy(p=>({...p,cancelHours:e.target.value}))} />
                <Field label="Advance Payment %" type="number" value={policy.advancePayment} onChange={e=>setPolicy(p=>({...p,advancePayment:e.target.value}))} />
              </div>
            </>)}
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
            {sectionCard(<>
              {sectionHeader("Notifications", "Choose which alerts you want to receive")}
              <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                {([
                  { k:"newBooking",      l:"New Booking",         d:"Email when a guest makes a reservation" },
                  { k:"newInquiry",      l:"New Inquiry",         d:"Email when a guest submits a contact form" },
                  { k:"cancellation",   l:"Cancellation Alert",  d:"Email when a booking is cancelled" },
                  { k:"checkInReminder",l:"Check-in Reminder",   d:"24-hour reminder before guest check-in" },
                  { k:"reviewRequest",  l:"Review Request",      d:"Auto-send review request after checkout" },
                ] as const).map(({ k, l, d }) => (
                  <div key={k} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.85rem 1rem", background:"rgba(255,255,255,.02)", border:`1px solid rgba(201,168,76,.07)`, borderRadius:10 }}>
                    <div>
                      <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.85rem", color:TEXT }}>{l}</p>
                      <p style={{ fontFamily:"var(--font-inter)", fontSize:"0.73rem", color:MUTED, marginTop:2 }}>{d}</p>
                    </div>
                    <Toggle on={notifs[k]} onToggle={() => setNotifs(p => ({ ...p, [k]: !p[k] }))} />
                  </div>
                ))}
              </div>
            </>)}
          </motion.div>

          {/* Save button */}
          <div style={{ paddingBottom:"1rem" }}>
            <button onClick={handleSave} disabled={saving} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.75rem 1.75rem", background:saved?"rgba(52,211,153,.15)":GOLD, border:saved?"1px solid rgba(52,211,153,.3)":"none", borderRadius:9, color:saved?"#34d399":"#080d09", fontFamily:"var(--font-inter)", fontSize:"0.85rem", fontWeight:600, cursor:saving?"not-allowed":"pointer", opacity:saving?0.8:1, transition:"all .25s" }}>
              {saving ? (
                <>
                  <span style={{ width:16, height:16, border:`2px solid rgba(8,13,9,.25)`, borderTopColor:"#080d09", borderRadius:"50%", display:"inline-block", animation:"spin .7s linear infinite" }} />
                  Saving…
                </>
              ) : saved ? (
                <><Check className="w-4 h-4" /> Saved!</>
              ) : (
                <><Save className="w-4 h-4" /> Save Settings</>
              )}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );
}
