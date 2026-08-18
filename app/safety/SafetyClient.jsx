"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Heart, CheckCircle2, Sparkles, Award } from "lucide-react";
import { 
  TwinkleStarIcon, 
  TeddyBearIcon,
  PuzzlePieceIcon,
  AlphabetBlock,
  RainbowIcon,
  HappyCloudIcon,
  PinwheelToy
} from "../../components/ToyDecorations";

export default function SafetyClient() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] bg-playful-dots font-sans text-[#0F2963] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 relative overflow-hidden">
      
      {/* Decorative Playful Floating Elements */}
      <div className="hidden lg:block absolute top-10 left-10 animate-float pointer-events-none opacity-80">
        <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
      </div>
      <div className="hidden lg:block absolute bottom-16 right-10 animate-float-reverse pointer-events-none opacity-80">
        <HappyCloudIcon className="w-14 h-10 drop-shadow-xs" />
      </div>

      {/* Navigation Return & Brand Tag */}
      <div className="flex items-center justify-between gap-2">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-extrabold text-[#0F2963] hover:text-vannam-navy transition bg-[#F0F4FC] border border-[#CBD8F6] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xs group shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition transform" />
          <span>Homepage</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-vannam-green/10 border border-vannam-green/30 text-vannam-green text-[10px] sm:text-xs font-bold shadow-2xs truncate">
          <PinwheelToy className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
          <span className="truncate">Child Safety Certified</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto relative">
        <span className="inline-flex items-center gap-1.5 bg-vannam-green/10 text-vannam-green text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-vannam-green/30">
          <TwinkleStarIcon color="emerald" className="w-3.5 h-3.5 animate-pulse" />
          <span>Zero Compromise Protocols</span>
        </span>
        <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] leading-tight">
          Safety & <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-8">Hygiene Standards</span>
        </h1>
        <p className="text-[#334155] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Every inch of Vannam World Preschool is engineered for absolute physical safety, hygiene, and emotional well-being.
        </p>
      </div>

      {/* Safety Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10">
        
        <div className="bento-card card-emerald p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-vannam-green text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            📹
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">4K Encrypted Live Streaming</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Bank-grade encrypted live video streaming accessible exclusively through the Parent Portal app from 8:00 AM - 6:00 PM.
          </p>
          <div className="pt-2 text-xs font-extrabold text-vannam-green flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Encrypted RTSP Video Feeds</span>
          </div>
        </div>

        <div className="bento-card card-sky p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-[#00A8E8] text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            🪪
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Biometric Gate Access</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Facial recognition and digital OTP pickup authorization ensuring only authorized guardians enter campus grounds.
          </p>
          <div className="pt-2 text-xs font-extrabold text-vannam-cyan flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Dual-Factor Verification</span>
          </div>
        </div>

        <div className="bento-card card-amber p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-vannam-yellow text-[#0F2963] rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            🩺
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Pediatric Nurse & Infirmary</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Full-time resident registered nurse on campus, daily wellness check-ins, and hospital emergency evacuation protocols.
          </p>
          <div className="pt-2 text-xs font-extrabold text-vannam-orange flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% CPR-Certified Teachers</span>
          </div>
        </div>

        <div className="bento-card card-rose p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-vannam-red text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            🧼
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Hospital-Grade Sanitization</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            UV-C toy sterilization chambers, HEPA air filtration in all classrooms, and 3x daily non-toxic deep surface cleaning.
          </p>
          <div className="pt-2 text-xs font-extrabold text-vannam-red flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Medical-Grade Air & Surface Clean</span>
          </div>
        </div>

        <div className="bento-card card-violet p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-vannam-purple text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            🛡️
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Baby-Proofed Architecture</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Rounded safety furniture edges, anti-pinch door dampers, non-slip shock-absorbent flooring, and gated stairways.
          </p>
          <div className="pt-2 text-xs font-extrabold text-vannam-purple flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Impact-Absorbing Play Zones</span>
          </div>
        </div>

        <div className="bento-card card-emerald p-8 space-y-4 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-md font-bold border-2 border-white">
            🥗
          </div>
          <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Allergy-Aware Nutrition</h3>
          <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
            Nut-free, 100% organic kitchen with strict cross-contamination prevention and custom dietary allergen tracking for each child.
          </p>
          <div className="pt-2 text-xs font-extrabold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Certified Nut-Free Kitchen</span>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          ← Return To Main Homepage
        </Link>
        <Link href="/admissions" className="btn-secondary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          <span>Apply For Admission</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
