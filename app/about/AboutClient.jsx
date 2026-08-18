"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Award, Sparkles, Sun, ArrowLeft, CheckCircle2, Star, BookOpen } from "lucide-react";
import { 
  TwinkleStarIcon, 
  TeddyBearIcon, 
  PuzzlePieceIcon, 
  RainbowIcon, 
  HappyCloudIcon, 
  AlphabetBlock, 
  PinwheelToy, 
  StorybookIcon 
} from "../../components/ToyDecorations";

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] bg-playful-dots font-sans text-[#0F2963] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 relative overflow-hidden">
      
      {/* Decorative Playful Floating Elements */}
      <div className="hidden lg:block absolute top-6 right-12 animate-float pointer-events-none opacity-80">
        <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
      </div>
      <div className="hidden lg:block absolute bottom-12 left-10 animate-float-reverse pointer-events-none opacity-80">
        <HappyCloudIcon className="w-14 h-10 drop-shadow-xs" />
      </div>

      {/* Navigation Return */}
      <div className="flex items-center justify-between gap-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-extrabold text-[#0F2963] hover:text-vannam-navy transition bg-[#F0F4FC] border border-[#CBD8F6] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xs group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition transform" />
          <span>Homepage</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-vannam-yellow/10 border border-vannam-yellow/30 text-vannam-orange text-[10px] sm:text-xs font-bold shadow-2xs truncate">
          <PinwheelToy className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
          <span className="truncate">Vannam World Preschool</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto relative">
        <span className="inline-flex items-center gap-1.5 bg-vannam-yellow/10 text-vannam-orange text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-vannam-yellow/30">
          <TwinkleStarIcon color="amber" className="w-3.5 h-3.5 animate-pulse" />
          <span>Our Story & Philosophy</span>
        </span>
        <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] leading-tight">
          About <span className="text-vannam-yellow underline decoration-[#0F2963] underline-offset-8">Vannam World</span>
        </h1>
        <p className="text-[#334155] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Founded on the core belief that early childhood is the most crucial foundation of life. We blend Montessori freedom with structured STEAM exploration to raise happy, confident learners.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        <div className="bento-card card-amber p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-vannam-yellow text-[#0F2963] rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
              🌱
            </div>
            <TeddyBearIcon className="w-8 h-8 opacity-70 group-hover:scale-110 transition transform" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Our Mission</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            To provide a warm, secure, and stimulating second home where curiosity is celebrated and every child blooms at their unique pace.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-vannam-orange">
            <TwinkleStarIcon color="amber" className="w-3.5 h-3.5" />
            <span>Child-Centric Learning Environment</span>
          </div>
        </div>

        <div className="bento-card card-emerald p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-vannam-green text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
              🧩
            </div>
            <PuzzlePieceIcon color="emerald" className="w-8 h-8 opacity-80 group-hover:scale-110 transition transform" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Montessori STEAM Methodology</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Combining self-directed tactile learning tools with hands-on science, phonics rhymes, and LEGO building blocks.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-vannam-green">
            <CheckCircle2 className="w-3.5 h-3.5 text-vannam-green" />
            <span>Hands-On Tactile Exploration</span>
          </div>
        </div>

        <div className="bento-card card-sky p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <div className="w-14 h-14 bg-[#00A8E8] text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
              🛡️
            </div>
            <AlphabetBlock letter="A" color="sky" className="w-8 h-8 opacity-80 group-hover:scale-110 transition transform" />
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Licensed Safety Compliance</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Full CCTV coverage, 100% background-checked staff, pediatric CPR certified caregivers, and biometric pickup verification.
          </p>
          <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-vannam-cyan">
            <ShieldCheck className="w-3.5 h-3.5 text-vannam-cyan" />
            <span>Zero Compromise Security</span>
          </div>
        </div>

      </div>

      {/* Leadership Note */}
      <div className="bento-card p-8 sm:p-10 border-2 border-vannam-yellow/20/80 bg-gradient-to-r from-vannam-yellow/10 via-white to-vannam-cyan/10 space-y-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-tr from-amber-300 to-amber-400 rounded-3xl flex items-center justify-center text-5xl shrink-0 border-4 border-white shadow-lg">
            👩‍🏫
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">Message From Principal Clara Bennett</h3>
            <p className="text-xs text-vannam-orange font-extrabold uppercase tracking-wider">M.Ed. Early Childhood Education • 14+ Years Leadership</p>
            <p className="text-sm sm:text-base text-[#334155] font-medium leading-relaxed">
              &quot;At Vannam World Preschool, we don&apos;t just teach lessons; we cultivate a lifelong love for learning, kindness, and discovery. We invite you to visit our campus and experience the warmth of our community.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Awards & Recognition Showcase */}
      <div className="bento-card p-8 bg-[#091A42] text-white border-2 border-amber-400/40 space-y-6 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>Honors & Recognitions</span>
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">Award-Winning Excellence in Early Education</h3>
          <p className="text-xs sm:text-sm text-blue-100/80">Proud recipient of national accolades for safety, curriculum design, and family satisfaction.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-2xl">🏆</span>
            <h4 className="font-heading font-extrabold text-sm text-amber-300">Best International Preschool</h4>
            <p className="text-[11px] text-blue-100/70">Global Early Childhood Summit 2025</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-2xl">🛡️</span>
            <h4 className="font-heading font-extrabold text-sm text-emerald-300">5-Star Safety Benchmark</h4>
            <p className="text-[11px] text-blue-100/70">SafeCare Schools Council</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-2xl">🧩</span>
            <h4 className="font-heading font-extrabold text-sm text-sky-300">STEAM Curriculum Leader</h4>
            <p className="text-[11px] text-blue-100/70">Early Pedagogy Forum</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-2xl">❤️</span>
            <h4 className="font-heading font-extrabold text-sm text-rose-300">99.4% Parent Approval</h4>
            <p className="text-[11px] text-blue-100/70">ParentChoice Community (1,200+)</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          ← Return To Main Homepage
        </Link>
        <Link href="/programs" className="btn-secondary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          <span>Explore Academic Programs</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
