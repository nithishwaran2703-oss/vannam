"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

/**
 * OpeningAnimation — Professional, Creative & Child-Attractive Intro
 * 
 * Perfect balance:
 * - Professional: Luxury glassmorphic craftsmanship, refined typography, smooth easing.
 * - Creative & Child-Attractive: Rotating spectrum halo, floating origami glider,
 *   spinning pinwheel, floating STEAM tags, and glowing wonder sparkles.
 * - Clean & Harmonious: No clunky blocks, 100% polished UI elements.
 */
export default function OpeningAnimation() {
  const [mounted, setMounted] = useState(true);
  const [stage, setStage] = useState("enter"); // "enter" | "exit" | "done"
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock background scroll during intro
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Smooth counter from 0 to 100% over 1200ms
    const start = performance.now();
    const duration = 1200;
    let animId;

    const tick = (now) => {
      const elapsed = now - start;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(p);
      if (elapsed < duration) {
        animId = requestAnimationFrame(tick);
      }
    };
    animId = requestAnimationFrame(tick);

    // Smooth exit reveal at 1350ms (after reaching 100%)
    const exitTimer = setTimeout(() => {
      setStage("exit");
      document.body.style.overflow = prevOverflow;
    }, 1350);

    // Complete unmount at 1700ms
    const unmountTimer = setTimeout(() => {
      setStage("done");
      setMounted(false);
      document.body.style.overflow = prevOverflow;
    }, 1700);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted || stage === "done") return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-[100dvh] z-[999999] flex items-center justify-center select-none pointer-events-auto transition-all duration-500 ease-out overflow-hidden ${
        stage === "exit"
          ? "opacity-0 scale-105 filter blur-sm pointer-events-none"
          : "opacity-100 scale-100 filter blur-0"
      }`}
      style={{
        background: "radial-gradient(circle at center, #FFFDF8 0%, #FFF8EA 60%, #FEF1D4 100%)",
        willChange: "opacity, transform, filter",
      }}
      aria-hidden="true"
    >
      {/* ── BACKGROUND MAGICAL SPECTRUM AURA (Gentle Smooth Rotation) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[380px] h-[380px] sm:w-[620px] sm:h-[620px] rounded-full blur-3xl opacity-40 animate-vannam-aura"
          style={{
            background:
              "conic-gradient(from 0deg, #F43F5E 0deg, #F59E0B 60deg, #10B981 120deg, #00A8E8 180deg, #8B5CF6 240deg, #F97316 300deg, #F43F5E 360deg)",
          }}
        />
      </div>

      {/* ── AMBIENT FLOATING WHIMSICAL ELEMENTS (Orbiting Card) ── */}
      {/* Top Left: Origami Paper Plane */}
      <div className="absolute top-12 left-6 sm:top-20 sm:left-24 animate-vannam-gentle-float pointer-events-none">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/85 shadow-md border border-sky-200/80 flex items-center justify-center transform -rotate-12 backdrop-blur-xs">
          <svg width="24" height="24" viewBox="0 0 64 64" fill="none">
            <polygon points="8,32 56,12 36,48 28,36" fill="#38BDF8" />
            <polygon points="56,12 28,36 34,26" fill="#BAE6FD" />
            <polygon points="28,36 36,48 33,37" fill="#0284C7" />
          </svg>
        </div>
      </div>

      {/* Top Right: Colorful Pinwheel */}
      <div className="absolute top-12 right-6 sm:top-20 sm:right-24 animate-[vannam-float-gentle_3.5s_ease-in-out_infinite_reverse] pointer-events-none">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/85 shadow-md border border-rose-200/80 flex items-center justify-center transform rotate-12 backdrop-blur-xs">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" className="animate-[spin_4s_linear_infinite]">
            <path d="M20 20 C20 10, 10 10, 10 20 Z" fill="#F43F5E" />
            <path d="M20 20 C30 20, 30 10, 20 10 Z" fill="#F59E0B" />
            <path d="M20 20 C20 30, 30 30, 30 20 Z" fill="#10B981" />
            <path d="M20 20 C10 20, 10 30, 20 30 Z" fill="#00A8E8" />
            <circle cx="20" cy="20" r="3" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Bottom Left: Hot Air Balloon Motif */}
      <div className="absolute bottom-12 left-8 sm:bottom-20 sm:left-28 hidden xs:flex items-center gap-2 animate-[vannam-float-gentle_4s_ease-in-out_infinite] pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-white/85 shadow-sm border border-emerald-200/80 backdrop-blur-xs flex items-center gap-1.5 text-xs font-bold text-emerald-800">
          <span>🌱</span>
          <span className="text-[11px] font-extrabold uppercase tracking-wide">Nature Inquiry</span>
        </div>
      </div>

      {/* Bottom Right: STEAM & Arts Motif */}
      <div className="absolute bottom-12 right-8 sm:bottom-20 sm:right-28 hidden xs:flex items-center gap-2 animate-[vannam-float-gentle_3.2s_ease-in-out_infinite_reverse] pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-white/85 shadow-sm border border-purple-200/80 backdrop-blur-xs flex items-center gap-1.5 text-xs font-bold text-purple-800">
          <span>🎨</span>
          <span className="text-[11px] font-extrabold uppercase tracking-wide">Creative Arts</span>
        </div>
      </div>

      {/* ── LUXURY GLASSMORPHIC CENTER CARD ── */}
      <div className="relative z-10 w-[92%] max-w-sm sm:max-w-md p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-white shadow-[0_20px_50px_rgba(15,41,99,0.12)] flex flex-col items-center text-center animate-vannam-mascot">
        
        {/* Insignia with Radiant Glow & Silky Shimmer */}
        <div className="relative mb-3.5 group">
          {/* Prismatic Glow Halo */}
          <div 
            className="absolute -inset-2.5 rounded-3xl opacity-50 blur-md animate-pulse"
            style={{
              background: "linear-gradient(135deg, #F43F5E, #F59E0B, #10B981, #00A8E8)",
            }}
          />

          {/* Insignia Box */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-3xl bg-white border-2 border-amber-200/90 shadow-md flex items-center justify-center p-3 overflow-hidden">
            {/* Silky Light Glint */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none animate-vannam-gleam"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.85) 50%, transparent 100%)",
              }}
            />

            <Image
              src="/logo.png"
              alt="Vannam World Preschool Emblem"
              width={72}
              height={72}
              priority
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>

          {/* Sparkle Badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs shadow-sm font-bold animate-bounce">
            ✨
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-0.5 mb-3">
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0F2963] tracking-tight leading-tight">
            Vannam <span className="text-vannam-orange">World</span>
          </h1>
          <p className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-600">
            Preschool & Early STEAM
          </p>
        </div>

        {/* 3 Creative Curriculum Highlights */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-4">
          <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200/80 text-[10px] sm:text-[11px] font-extrabold">
            Montessori
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] sm:text-[11px] font-extrabold">
            STEAM
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-200/80 text-[10px] sm:text-[11px] font-extrabold">
            Daycare
          </span>
        </div>

        {/* ── DYNAMIC CREATIVE LOADING SYSTEM ── */}
        <div className="w-full space-y-1.5 mt-1">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500">
            <span className="flex items-center gap-1.5 text-vannam-orange">
              <span className="w-1.5 h-1.5 rounded-full bg-vannam-orange animate-ping" />
              <span>Preparing Experience</span>
            </span>
            <span className="font-heading font-black text-[#0F2963] tabular-nums text-xs">
              {progress}%
            </span>
          </div>

          {/* Smooth Rainbow Spectrum Loading Track */}
          <div className="relative w-full h-2 rounded-full bg-amber-100/70 overflow-hidden shadow-inner p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F43F5E] via-[#F59E0B] via-[#10B981] via-[#00A8E8] to-[#8B5CF6] transition-all duration-75 ease-out relative shadow-sm"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading light tip */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
