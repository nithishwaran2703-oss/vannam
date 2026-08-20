"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  X, 
  RotateCcw
} from "lucide-react";
import { 
  TeddyBearIcon, 
  PaperPlaneIcon,
  KiteIcon
} from "./ToyDecorations";

export default function PlayfulInteractiveWorld() {
  // Bubbles Interactive State
  const [bubbles, setBubbles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showMascotDialog, setShowMascotDialog] = useState(false);
  const [mascotTipIndex, setMascotTipIndex] = useState(0);
  const audioContextRef = useRef(null);

  const mascotTips = [
    "🎈 Tap floating bubbles to pop them with sparkles!",
    "☀️ Did you know? We have an organic in-house chef for healthy meals!",
    "🛡️ Parents can view live 4K classroom streams all day!",
    "🧩 Our Montessori STEAM labs build creativity through hands-on play!",
    "⭐ 1:6 Loving teacher ratio ensures personal care for every child!"
  ];

  // Play a soft organic bubble pop chime using Web Audio API
  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(450 + Math.random() * 300, now);
      osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, now + 0.08);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      // Audio not permitted yet
    }
  };

  // Generate & cycle floating bubbles across the screen (lightweight on mobile)
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const initialCount = isMobile ? 4 : 8;
    const maxCount = isMobile ? 6 : 12;

    const initialBubbles = Array.from({ length: initialCount }).map((_, i) => ({
      id: `init-${i}-${Date.now()}`,
      x: 6 + (i * (88 / initialCount)) + Math.random() * 4,
      size: isMobile ? 22 + Math.floor(Math.random() * 20) : 26 + Math.floor(Math.random() * 28),
      speed: 15 + Math.random() * 10,
      delay: Math.random() * 6,
      color: ["#00A8E8", "#F59E0B", "#F43F5E", "#10B981", "#8B5CF6", "#F97316"][i % 6],
      opacity: 0.5 + Math.random() * 0.3,
      wobble: 10 + Math.random() * 14,
    }));
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= maxCount) return prev;
        const newBubble = {
          id: `bubble-${Date.now()}-${Math.random()}`,
          x: 4 + Math.random() * 92,
          size: isMobile ? 20 + Math.floor(Math.random() * 22) : 24 + Math.floor(Math.random() * 32),
          speed: 13 + Math.random() * 9,
          delay: 0,
          color: ["#00A8E8", "#F59E0B", "#F43F5E", "#10B981", "#8B5CF6", "#F97316"][Math.floor(Math.random() * 6)],
          opacity: 0.55 + Math.random() * 0.25,
          wobble: 8 + Math.random() * 14,
        };
        return [...prev.slice(-(maxCount - 1)), newBubble];
      });
    }, isMobile ? 4500 : 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle Bubble Pop on Tap/Click
  const handlePopBubble = (e, bubbleId) => {
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 14,
      spread: 45,
      startVelocity: 15,
      origin: { x, y },
      colors: ["#F59E0B", "#00A8E8", "#F43F5E", "#10B981", "#8B5CF6"],
      disableForReducedMotion: true,
      ticks: 40,
    });

    playPopSound();
    setPoppedCount((prev) => prev + 1);

    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  };

  const nextTip = (e) => {
    e.stopPropagation();
    setMascotTipIndex((prev) => (prev + 1) % mascotTips.length);
  };

  return (
    <>
      {/* 1. LAYERED AMBIENT COLOR AURORA & STORYBOOK SKY GRADIENTS (Eliminates empty whitespace) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Soft Pastel Aura Blends */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-br from-amber-200/25 via-rose-100/20 to-transparent rounded-full blur-[100px] animate-pulse-subtle" />
        <div className="absolute top-[30%] -right-[15%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-gradient-to-bl from-sky-200/30 via-emerald-100/20 to-transparent rounded-full blur-[110px] animate-float-reverse" />
        <div className="absolute top-[60%] -left-[10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-gradient-to-tr from-purple-200/25 via-amber-100/20 to-transparent rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[5%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gradient-to-tl from-emerald-200/25 via-sky-100/20 to-transparent rounded-full blur-[90px] animate-pulse-subtle" />

        {/* Storybook Drifting Hot Air Balloon */}
        <div className="absolute top-24 -left-20 animate-drift opacity-75 hidden md:block">
          <div className="relative w-16 h-22 flex flex-col items-center">
            {/* Balloon Dome */}
            <div className="w-14 h-16 rounded-t-full rounded-b-3xl bg-gradient-to-b from-[#F43F5E] via-[#F59E0B] via-[#10B981] to-[#00A8E8] shadow-md relative overflow-hidden border border-white/60">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_6px,rgba(255,255,255,0.4)_6px,rgba(255,255,255,0.4)_12px)]" />
            </div>
            {/* Ropes */}
            <div className="w-6 h-3 border-x border-amber-800/60" />
            {/* Basket with waving teddy bear */}
            <div className="w-6 h-5 rounded-sm bg-amber-700 border border-amber-900 shadow-xs flex items-center justify-center -mt-0.5">
              <span className="text-[10px] leading-none animate-wiggle">🧸</span>
            </div>
          </div>
        </div>

        {/* Playful Paper Airplane with dotted flight trajectory */}
        <div className="absolute top-[45%] right-8 animate-float opacity-70 hidden sm:block">
          <div className="relative flex items-center gap-2">
            <svg className="w-16 h-8 -mr-1" viewBox="0 0 80 40" fill="none">
              <path d="M0,20 Q40,5 80,20" stroke="#00A8E8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            </svg>
            <PaperPlaneIcon className="w-7 h-7 text-[#00A8E8] rotate-[-10deg] animate-wiggle" />
          </div>
        </div>

        {/* Gentle Background Kites */}
        <div className="absolute bottom-[28%] left-6 animate-float-reverse opacity-60 hidden lg:block">
          <KiteIcon className="w-12 h-16 rotate-12" />
        </div>

      </div>

      {/* 2. INTERACTIVE FLOATING PASTEL SOAP BUBBLES LAYER (Tap-to-Pop for kids & parents) */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
        {bubbles.map((b) => (
          <div
            key={b.id}
            onClick={(e) => handlePopBubble(e, b.id)}
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.speed}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
            className="absolute bottom-[-60px] pointer-events-auto cursor-pointer rounded-full transition-transform active:scale-125 hover:scale-115 group"
            title="Tap to pop bubble! ✨"
          >
            {/* Organic Floating Animation Container */}
            <div className="w-full h-full animate-float rounded-full relative">
              {/* Bubble Body with iridescent gradient & sheen */}
              <div 
                className="w-full h-full rounded-full border border-white/80 shadow-[inset_-3px_-3px_8px_rgba(255,255,255,0.7),inset_3px_3px_8px_rgba(0,168,232,0.35),0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-[1px]"
                style={{
                  background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 30%, ${b.color}25 70%, ${b.color}50 100%)`,
                }}
              >
                {/* Glossy Reflection Highlight */}
                <div className="absolute top-[18%] left-[22%] w-[25%] h-[25%] bg-white rounded-full opacity-90 blur-[0.3px]" />
                <div className="absolute bottom-[20%] right-[22%] w-[12%] h-[12%] bg-white rounded-full opacity-70" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
