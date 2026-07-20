"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Link, ImageIcon } from "lucide-react";
import { uploadAPI } from "@/lib/api";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  height?: number;
}

const GOLD = "#c9a84c";
const TEXT = "#e8f0e9";
const MUTED = "#6b8f71";
const BORDER = "rgba(201,168,76,.1)";
const inp: React.CSSProperties = {
  width: "100%", boxSizing: "border-box" as const,
  background: "rgba(255,255,255,.04)", border: "1px solid rgba(201,168,76,.15)",
  borderRadius: 8, padding: "0.65rem 0.85rem",
  fontFamily: "var(--font-inter)", fontSize: "0.83rem", color: TEXT, outline: "none",
};
const lbl: React.CSSProperties = {
  fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: MUTED,
  letterSpacing: "0.08em", textTransform: "uppercase" as const,
  marginBottom: "0.4rem", display: "block",
};

export default function ImageUpload({ value, onChange, label = "Image", height = 160 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large — max 10 MB");
      return;
    }
    setUploading(true);
    try {
      const res = await uploadAPI.uploadImage(file);
      onChange(res.data.url);
      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed — check backend is running");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div>
      {label && <label style={lbl}>{label}</label>}

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.75rem" }}>
        {(["upload", "url"] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)} style={{
            padding: "0.3rem 0.85rem", borderRadius: 6, cursor: "pointer",
            fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.06em",
            background: tab === t ? GOLD : "rgba(255,255,255,.04)",
            color: tab === t ? "#080d09" : MUTED,
            border: `1px solid ${tab === t ? GOLD : BORDER}`,
            fontWeight: tab === t ? 600 : 400,
            display: "flex", alignItems: "center", gap: "0.35rem",
          }}>
            {t === "upload" ? <Upload style={{ width: 11, height: 11 }} /> : <Link style={{ width: 11, height: 11 }} />}
            {t === "upload" ? "Upload File" : "Paste URL"}
          </button>
        ))}
      </div>

      {tab === "upload" ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => !uploading && fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? GOLD : "rgba(201,168,76,.25)"}`,
            borderRadius: 10, padding: "1.5rem",
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "0.5rem",
            background: dragging ? "rgba(201,168,76,.06)" : "rgba(255,255,255,.02)",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "border-color .2s, background .2s",
            minHeight: 90,
          }}
        >
          {uploading ? (
            <>
              <div style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid rgba(201,168,76,.2)", borderTopColor: GOLD, animation: "spin .7s linear infinite" }} />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.78rem", color: MUTED }}>Uploading…</p>
            </>
          ) : (
            <>
              <Upload style={{ width: 22, height: 22, color: GOLD, opacity: 0.7 }} />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: TEXT, textAlign: "center" }}>
                Drag & drop or <span style={{ color: GOLD, textDecoration: "underline" }}>click to browse</span>
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.68rem", color: MUTED }}>JPG, PNG, WebP — max 10 MB</p>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={onPick} style={{ display: "none" }} />
        </div>
      ) : (
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/…"
          style={inp}
        />
      )}

      {/* Preview */}
      {value && (
        <div style={{ marginTop: "0.75rem", position: "relative", height, borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          <Image src={value} alt="Preview" fill className="object-cover" sizes="500px" />
          <button
            type="button"
            onClick={() => onChange("")}
            style={{
              position: "absolute", top: 8, right: 8, width: 28, height: 28,
              borderRadius: 6, background: "rgba(8,13,9,.8)", border: `1px solid ${BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <X style={{ width: 13, height: 13, color: "#f87171" }} />
          </button>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0.4rem 0.6rem", background: "rgba(0,0,0,.6)", backdropFilter: "blur(6px)" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.63rem", color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</p>
          </div>
        </div>
      )}

      {!value && (
        <div style={{ marginTop: "0.75rem", height, borderRadius: 8, border: `1px dashed ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ImageIcon style={{ width: 28, height: 28, color: MUTED, opacity: 0.3 }} />
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
