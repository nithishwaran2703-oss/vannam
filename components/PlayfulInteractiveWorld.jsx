"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  PartyPopper, 
  Palette, 
  Eye, 
  EyeOff, 
  Wand2, 
  X, 
  ChevronUp, 
  Check, 
  RefreshCw,
  CircleDot
} from "lucide-react";
import AnimatedMascotGuide from "./AnimatedMascotGuide";

// Pentatonic scale frequencies in Hz (always harmonious and joyful)
const CHIME_FREQUENCIES = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5, D5, E5, G5, A5, C6

const TRAIL_COLORS = [
  { id: "rainbow", name: "Rainbow", color: "linear-gradient(45deg, #F43F5E, #F59E0B, #10B981, #38BDF8, #8B5CF6)", hex: ["#F43F5E", "#F59E0B", "#10B981", "#38BDF8", "#8B5CF6"] },
  { id: "sunshine", name: "Sun Gold", color: "#F59E0B", hex: ["#F59E0B", "#FBBF24", "#FEF08A"] },
  { id: "ruby", name: "Ruby Rose", color: "#F43F5E", hex: ["#F43F5E", "#FB7185", "#FECDD3"] },
  { id: "ocean", name: "Ocean Sky", color: "#00A8E8", hex: ["#00A8E8", "#38BDF8", "#BAE6FD"] },
  { id: "emerald", name: "Mint Fresh", color: "#10B981", hex: ["#10B981", "#34D399", "#A7F3D0"] },
];

export default function PlayfulInteractiveWorld() {
  // Feature states
  const [bubblesActive, setBubblesActive] = useState(true);
  const [trailActive, setTrailActive] = useState(true);
  const [trailColor, setTrailColor] = useState(TRAIL_COLORS[0]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mascotVisible, setMascotVisible] = useState(true);
  const [isDockOpen, setIsDockOpen] = useState(false);
  const [poppedCount, setPoppedCount] = useState(0);

  const audioContextRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const bubblesContainerRef = useRef(null);
  const bubbleIdCounter = useRef(0);
  const [bubbles, setBubbles] = useState([]);

  // Synthesize crystal chime sound
  const playChime = useCallback((customFreq) => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }

      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = customFreq || CHIME_FREQUENCIES[Math.floor(Math.random() * CHIME_FREQUENCIES.length)];

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      // Subtle pitch bend up
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch {
      // safe fallback
    }
  }, [soundEnabled]);

  // Magic Sparkle Cursor Trail Canvas
  useEffect(() => {
    if (!trailActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse / Touch movement handler
    const addParticles = (x, y) => {
      const palette = trailColor.hex;
      const count = Math.min(3, 4);
      for (let i = 0; i < count; i++) {
        const selectedColor = palette[Math.floor(Math.random() * palette.length)];
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.5,
          size: Math.random() * 6 + 3,
          color: selectedColor,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.02,
          isStar: Math.random() > 0.4,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    const handleMouseMove = (e) => {
      addParticles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        addParticles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Draw 4-point sparkle star
    const drawSparkle = (cx, cy, spikes, outerRadius, innerRadius, color, alpha, rotation) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      let step = Math.PI / spikes;
      let rot = (Math.PI / 2) * 3;

      ctx.moveTo(0, 0 - outerRadius);
      for (let i = 0; i < spikes; i++) {
        let x = Math.cos(rot) * outerRadius;
        let y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, 0 - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size < 0.5) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        if (p.isStar) {
          drawSparkle(p.x, p.y, 4, p.size, p.size * 0.4, p.color, p.alpha, p.rotation);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [trailActive, trailColor]);

  // Ambient Bubble Generator
  useEffect(() => {
    if (!bubblesActive) {
      setBubbles([]);
      return;
    }

    // Spawn a gentle floating bubble periodically
    const spawnBubble = () => {
      if (typeof window === "undefined") return;
      const size = Math.floor(Math.random() * 38) + 24; // 24px - 62px
      const left = Math.random() * 92 + 4; // 4% - 96%
      const duration = Math.random() * 8 + 9; // 9s - 17s float time
      const delay = Math.random() * 2;
      const swayDuration = Math.random() * 3 + 2.5;

      const newBubble = {
        id: bubbleIdCounter.current++,
        size,
        left,
        duration,
        delay,
        swayDuration,
        hue: Math.floor(Math.random() * 360),
      };

      setBubbles((prev) => [...prev.slice(-14), newBubble]);
    };

    // Initial batch
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnBubble, i * 800);
    }

    const interval = setInterval(spawnBubble, 2400);
    return () => clearInterval(interval);
  }, [bubblesActive]);

  // Pop bubble handler
  const handlePopBubble = (bubbleId, e) => {
    e.stopPropagation();
    playChime();
    setPoppedCount((prev) => prev + 1);

    // Create burst particle effect at the bubble center
    if (trailActive && canvasRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const colors = ["#F43F5E", "#F59E0B", "#10B981", "#38BDF8", "#8B5CF6", "#FFFFFF"];
      for (let i = 0; i < 14; i++) {
        const angle = (Math.PI * 2 * i) / 14;
        const speed = Math.random() * 4 + 2;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 5 + 3,
          color: colors[i % colors.length],
          alpha: 1,
          decay: 0.04,
          isStar: true,
          rotation: Math.random() * Math.PI,
          vRot: 0.1,
        });
      }
    }

    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  };

  // Launch celebratory confetti shower
  const triggerConfettiShower = () => {
    playChime(659.25);
    try {
      if (typeof confetti === "function") {
        // Left blast
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.8 },
          colors: ["#F59E0B", "#F43F5E", "#38BDF8", "#10B981", "#8B5CF6"],
        });
        // Right blast
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.8 },
          colors: ["#F59E0B", "#F43F5E", "#38BDF8", "#10B981", "#8B5CF6"],
        });
      }
    } catch {
      // fallback
    }
  };

  // Spawn a rapid bubble shower
  const triggerBubbleShower = () => {
    playChime(783.99);
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const size = Math.floor(Math.random() * 32) + 26;
        const left = Math.random() * 88 + 6;
        const duration = Math.random() * 5 + 7;
        const newBubble = {
          id: bubbleIdCounter.current++,
          size,
          left,
          duration,
          delay: 0,
          swayDuration: 2.2,
          hue: Math.floor(Math.random() * 360),
        };
        setBubbles((prev) => [...prev, newBubble]);
      }, i * 180);
    }
  };

  return (
    <>
      {/* Canvas Layer for Magic Crayon Sparkles (Pass-through pointer events) */}
      {trailActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 select-none"
          style={{ width: "100vw", height: "100vh" }}
          aria-hidden="true"
        />
      )}

      {/* Ambient Floating Soap Bubbles */}
      {bubblesActive && (
        <div 
          ref={bubblesContainerRef} 
          className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
          aria-hidden="true"
        >
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              onClick={(e) => handlePopBubble(bubble.id, e)}
              onMouseEnter={(e) => handlePopBubble(bubble.id, e)}
              style={{
                left: `${bubble.left}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDuration: `${bubble.duration}s`,
                animationDelay: `${bubble.delay}s`,
              }}
              className="absolute -bottom-16 pointer-events-auto cursor-pointer animate-float-bubble hover:scale-125 transition-transform duration-100 group"
              title="Pop me! 🫧"
            >
              {/* Iridescent Bubble Body */}
              <div 
                className="w-full h-full rounded-full border border-white/60 relative overflow-hidden backdrop-blur-[0.5px] shadow-sm animate-bubble-wobble"
                style={{
                  background: `radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 25%, hsla(${bubble.hue}, 80%, 75%, 0.35) 60%, hsla(${(bubble.hue + 60) % 360}, 85%, 65%, 0.45) 100%)`,
                  boxShadow: `inset 0 0 10px rgba(255, 255, 255, 0.6), 0 4px 12px rgba(15, 41, 99, 0.08)`,
                }}
              >
                {/* Gloss Specular Highlights */}
                <div className="absolute top-1 left-2 w-2 h-1.5 bg-white rounded-full rotate-[-30deg] opacity-90" />
                <div className="absolute bottom-1.5 right-2 w-1.5 h-1 bg-white rounded-full opacity-60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Mascot Guide ("Vannu the Bear") */}
      {mascotVisible && (
        <AnimatedMascotGuide 
          playChime={playChime} 
          soundEnabled={soundEnabled} 
        />
      )}

      {/* Floating Delight Dock (Bottom Left) */}
      <aside 
        aria-label="Playful Interactive Delight Controls"
        className="fixed bottom-4 left-4 z-40 select-none print:hidden"
      >
        {isDockOpen ? (
          <div className="bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border-2 border-vannam-navy-border/60 text-vannam-navy w-72 animate-in fade-in slide-in-from-bottom-4 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5 font-fredoka font-bold text-sm text-vannam-navy">
                <Wand2 className="w-4 h-4 text-vannam-orange animate-spin" style={{ animationDuration: '6s' }} />
                <span>Magic Playground</span>
              </div>
              <button
                onClick={() => setIsDockOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                title="Minimize panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {/* Confetti Blast */}
              <button
                onClick={triggerConfettiShower}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl text-xs font-fredoka font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <PartyPopper className="w-3.5 h-3.5" />
                <span>Confetti!</span>
              </button>

              {/* Bubble Shower */}
              <button
                onClick={triggerBubbleShower}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white rounded-xl text-xs font-fredoka font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bubble Rain</span>
              </button>
            </div>

            {/* Interactive Feature Toggles */}
            <div className="space-y-2 text-xs font-medium text-slate-700">
              {/* Magic Crayon Sparkle Trail Toggle & Color Picker */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-vannam-yellow" />
                    <span>Magic Crayon Trail</span>
                  </span>
                  <button
                    onClick={() => {
                      setTrailActive(!trailActive);
                      playChime(trailActive ? 440 : 659.25);
                    }}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      trailActive ? "bg-vannam-green" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        trailActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                {/* Trail Color Swatches */}
                {trailActive && (
                  <div className="flex items-center gap-1.5 pt-1">
                    {TRAIL_COLORS.map((tc) => (
                      <button
                        key={tc.id}
                        onClick={() => {
                          setTrailColor(tc);
                          playChime(523.25);
                        }}
                        style={{
                          background: tc.color,
                        }}
                        className={`w-5 h-5 rounded-full border-2 transition-transform ${
                          trailColor.id === tc.id ? "border-vannam-navy scale-110 shadow-md" : "border-white hover:scale-105"
                        }`}
                        title={tc.name}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Floating Soap Bubbles Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">🫧</span>
                  <span className="font-semibold text-slate-800">Floating Bubbles</span>
                  {poppedCount > 0 && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {poppedCount} popped!
                    </span>
                  )}
                </span>
                <button
                  onClick={() => {
                    setBubblesActive(!bubblesActive);
                    playChime(bubblesActive ? 440 : 659.25);
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    bubblesActive ? "bg-vannam-green" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      bubblesActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Sound Chimes Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-vannam-cyan" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>Playful Sound Chimes</span>
                </span>
                <button
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) playChime(659.25);
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    soundEnabled ? "bg-vannam-cyan" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      soundEnabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Mascot Companion Toggle */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <span className="text-sm">🧸</span>
                  <span>Vannu Mascot Buddy</span>
                </span>
                <button
                  onClick={() => setMascotVisible(!mascotVisible)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    mascotVisible ? "bg-vannam-green" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      mascotVisible ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized Play-Bar Pill */
          <button
            onClick={() => {
              setIsDockOpen(true);
              playChime(523.25);
            }}
            className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-md text-vannam-navy font-fredoka font-bold text-xs py-2 px-3 rounded-full shadow-lg border-2 border-vannam-navy-border hover:scale-105 transition-all duration-200 group cursor-pointer"
            title="Open Magic Playground animations dock"
          >
            <span className="w-2 h-2 rounded-full bg-vannam-green animate-pulse" />
            <Wand2 className="w-3.5 h-3.5 text-vannam-orange group-hover:rotate-12 transition-transform" />
            <span>Magic Play-Bar 🪄</span>
            <ChevronUp className="w-3 h-3 text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        )}
      </aside>
    </>
  );
}
