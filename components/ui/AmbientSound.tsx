"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VolumeX } from "lucide-react";

// ── All live Web Audio nodes bundled so we can stop cleanly ──
interface SoundEngine {
  ctx: AudioContext;
  master: GainNode;
  sources: AudioBufferSourceNode[];
  lfos: OscillatorNode[];
}

// Pink-ish noise buffer (1/f approximation — sounds like wind/leaves, not static)
function buildNoiseBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886*b0 + w*0.0555179;
    b1 = 0.99332*b1 + w*0.0750759;
    b2 = 0.96900*b2 + w*0.1538520;
    b3 = 0.86650*b3 + w*0.3104856;
    b4 = 0.55000*b4 + w*0.5329522;
    b5 = -0.7616*b5 - w*0.0168980;
    data[i] = (b0+b1+b2+b3+b4+b5+b6 + w*0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  return buf;
}

function spawnLayer(
  ctx: AudioContext,
  master: GainNode,
  sources: AudioBufferSourceNode[],
  lfos: OscillatorNode[],
  filterType: BiquadFilterType,
  freq: number,
  q: number,
  gain: number,
  lfoHz: number,
  lfoAmt: number,
) {
  const src = ctx.createBufferSource();
  src.buffer = buildNoiseBuffer(ctx, 6);
  src.loop = true;

  const filt = ctx.createBiquadFilter();
  filt.type = filterType;
  filt.frequency.value = freq;
  filt.Q.value = q;

  const gn = ctx.createGain();
  gn.gain.value = gain;

  // Slow LFO → organic wind swell / leaf rustle variation
  const lfo  = ctx.createOscillator();
  const lfoG = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.value = lfoHz;
  lfoG.gain.value = lfoAmt;
  lfo.connect(lfoG);
  lfoG.connect(gn.gain);
  lfo.start();
  lfos.push(lfo);

  src.connect(filt);
  filt.connect(gn);
  gn.connect(master);
  src.start();
  sources.push(src);
}

function buildEngine(): SoundEngine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ctx = window.AudioContext || (window as any).webkitAudioContext as typeof AudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const sources: AudioBufferSourceNode[] = [];
  const lfos: OscillatorNode[] = [];

  // Layer 1 — deep wind rumble
  spawnLayer(ctx, master, sources, lfos, "lowpass",   300,  0.9, 0.40, 0.06, 0.14);
  // Layer 2 — mid forest rustle
  spawnLayer(ctx, master, sources, lfos, "bandpass", 1600,  2.2, 0.28, 0.20, 0.10);
  // Layer 3 — high leaf shimmer
  spawnLayer(ctx, master, sources, lfos, "bandpass", 3400,  3.8, 0.12, 0.38, 0.05);
  // Layer 4 — stream / water undertone
  spawnLayer(ctx, master, sources, lfos, "bandpass",  650,  0.7, 0.22, 0.11, 0.07);

  // Soft fade-in over 3 s
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);

  return { ctx, master, sources, lfos };
}

// Bar heights for the animated equalizer icon
const BAR_SCALES = [0.55, 1.0, 0.72, 0.88, 0.60];

export default function AmbientSound() {
  const [visible,  setVisible]  = useState(false);
  const [playing,  setPlaying]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const engineRef = useRef<SoundEngine | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      engineRef.current?.ctx.close().catch(() => {});
    };
  }, []);

  const toggle = useCallback(async () => {
    if (loading) return;

    if (!playing) {
      setLoading(true);
      try {
        const engine = buildEngine();
        // Chrome / Safari require a resume after user gesture
        if (engine.ctx.state === "suspended") await engine.ctx.resume();
        engineRef.current = engine;
        setPlaying(true);
      } catch (err) {
        console.error("AmbientSound: failed to start →", err);
      } finally {
        setLoading(false);
      }
    } else {
      const engine = engineRef.current;
      if (engine) {
        // Fade out then close
        engine.master.gain.setValueAtTime(engine.master.gain.value, engine.ctx.currentTime);
        engine.master.gain.linearRampToValueAtTime(0, engine.ctx.currentTime + 1.4);
        setTimeout(() => {
          engine.sources.forEach(s => { try { s.stop(); } catch { /* already stopped */ } });
          engine.lfos.forEach(o    => { try { o.stop(); } catch { /* already stopped */ } });
          engine.ctx.close().catch(() => {});
          engineRef.current = null;
        }, 1500);
      }
      setPlaying(false);
    }
  }, [playing, loading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 40,
            display: "flex", alignItems: "center", gap: "0.6rem",
          }}
        >
          {/* Hover label */}
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: playing ? 1 : 0, x: playing ? 0 : 8 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: "var(--font-inter)", fontSize: "0.6rem",
              letterSpacing: "0.16em", textTransform: "uppercase" as const,
              color: "rgba(250,247,242,.5)", whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >Nature sounds on</motion.span>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={toggle}
            title={playing ? "Stop nature sounds" : "Play nature sounds"}
            style={{
              width: 46, height: 46, borderRadius: "50%",
              background: playing
                ? "rgba(201,168,76,.15)"
                : "rgba(8,13,9,.72)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${playing ? "rgba(201,168,76,.45)" : "rgba(250,247,242,.15)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: loading ? "wait" : "pointer",
              boxShadow: playing
                ? "0 0 20px rgba(201,168,76,.2), 0 4px 16px rgba(0,0,0,.3)"
                : "0 4px 16px rgba(0,0,0,.3)",
              transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
              position: "relative", overflow: "hidden",
            }}
          >
            {/* Pulse ring when playing */}
            {playing && (
              <motion.div
                animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  border: "1px solid rgba(201,168,76,.5)",
                  pointerEvents: "none",
                }}
              />
            )}

            <AnimatePresence mode="wait">
              {loading ? (
                /* Spinner */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{
                    width: 16, height: 16, borderRadius: "50%",
                    border: "2px solid rgba(250,247,242,.2)",
                    borderTopColor: "#c9a84c",
                    animation: "spin .7s linear infinite",
                  }}
                />
              ) : playing ? (
                /* Animated equalizer bars */
                <motion.div
                  key="playing"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  style={{ display: "flex", alignItems: "flex-end", gap: 2.5, height: 18 }}
                >
                  {BAR_SCALES.map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [h, 1.0, h * 0.6, 0.95, h] }}
                      transition={{
                        duration: 0.7 + i * 0.13,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.11,
                      }}
                      style={{
                        width: 3, height: 18,
                        background: "#c9a84c",
                        borderRadius: 2, transformOrigin: "bottom",
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                /* Muted icon */
                <motion.div
                  key="muted"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                >
                  <VolumeX style={{ width: 16, height: 16, color: "rgba(250,247,242,.55)" }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AnimatePresence>
  );
}
