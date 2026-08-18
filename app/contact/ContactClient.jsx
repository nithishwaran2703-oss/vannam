"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Calendar, Sparkles, Navigation } from "lucide-react";
import { 
  TwinkleStarIcon, 
  TeddyBearIcon,
  AlphabetBlock,
  RainbowIcon,
  HappyCloudIcon,
  PinwheelToy,
  StorybookIcon
} from "../../components/ToyDecorations";

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] bg-playful-dots font-sans text-[#0F2963] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 relative overflow-hidden">
      
      {/* Decorative Playful Floating Elements */}
      <div className="hidden lg:block absolute top-10 right-10 animate-float pointer-events-none opacity-80">
        <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
      </div>
      <div className="hidden lg:block absolute bottom-16 left-10 animate-float-reverse pointer-events-none opacity-80">
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

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-vannam-yellow/10 border border-vannam-yellow/30 text-vannam-orange text-[10px] sm:text-xs font-bold shadow-2xs truncate">
          <PinwheelToy className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
          <span className="truncate">Campus Visit Booking</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto relative">
        <span className="inline-flex items-center gap-1.5 bg-vannam-yellow/10 text-vannam-orange text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-vannam-yellow/30">
          <TwinkleStarIcon color="amber" className="w-3.5 h-3.5 animate-pulse" />
          <span>Reach Out To Us</span>
        </span>
        <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] leading-tight">
          Contact <span className="text-vannam-yellow underline decoration-[#0F2963] underline-offset-8">Vannam World</span>
        </h1>
        <p className="text-[#334155] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          We would love to welcome you for a guided tour! Contact our admissions hotline or visit our campus branches below.
        </p>
      </div>

      {/* Campus Locations & Hotlines Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10">
        
        {/* Main Campus */}
        <div className="bento-card card-amber p-8 text-center space-y-4 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-vannam-yellow text-[#0F2963] rounded-3xl flex items-center justify-center text-3xl mx-auto font-bold shadow-md border-2 border-white">
              📍
            </div>
            <span className="inline-block bg-vannam-yellow/20/90 text-vannam-orange text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Main Flagship Branch
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Rainbow Gardens Campus</h3>
            <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
              124 Rainbow Gardens Drive, Sector 4, North Academic Zone
            </p>
          </div>
          <div className="pt-4 border-t border-vannam-yellow/20/80 text-xs text-vannam-orange font-bold flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-vannam-orange" />
            <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
          </div>
        </div>

        {/* East Wing Campus */}
        <div className="bento-card card-sky p-8 text-center space-y-4 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-[#00A8E8] text-white rounded-3xl flex items-center justify-center text-3xl mx-auto font-bold shadow-md border-2 border-white">
              🌿
            </div>
            <span className="inline-block bg-[#00A8E8]/20 text-[#00A8E8] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              East Wing STEAM Hub
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Meadow Green Campus</h3>
            <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
              88 Meadow Lane, Tech Park District, East City
            </p>
          </div>
          <div className="pt-4 border-t border-sky-200 text-xs text-vannam-cyan font-bold flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-vannam-cyan" />
            <span>Mon - Fri: 7:30 AM - 6:30 PM</span>
          </div>
        </div>

        {/* South Bay Infant Center */}
        <div className="bento-card card-emerald p-8 text-center space-y-4 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-vannam-green text-white rounded-3xl flex items-center justify-center text-3xl mx-auto font-bold shadow-md border-2 border-white">
              🧸
            </div>
            <span className="inline-block bg-vannam-green/20 text-vannam-green text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Infant & Toddler Studio
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0F2963]">Sunbeam Bay Campus</h3>
            <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
              15 Ocean View Boulevard, South Bay District
            </p>
          </div>
          <div className="pt-4 border-t border-emerald-200 text-xs text-vannam-green font-bold flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-vannam-green" />
            <span>Mon - Sat: 8:00 AM - 5:00 PM</span>
          </div>
        </div>

      </div>

      {/* Direct Contact Bento Card */}
      <div className="bento-card p-5 sm:p-8 md:p-10 border-2 border-vannam-navy/10 bg-white max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10 shadow-lg">
        
        <div className="space-y-6">
          <div>
            <span className="text-xs font-extrabold uppercase text-vannam-orange tracking-wider">Instant Assistance</span>
            <h3 className="font-heading text-3xl font-extrabold text-[#0F2963]">Direct Admissions Hotline</h3>
          </div>
          <p className="text-sm text-[#334155] font-medium leading-relaxed">
            Our parent coordinators are ready to answer curriculum inquiries, fee structures, and bus route arrangements.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-[#1E293B] font-bold">
              <div className="w-9 h-9 rounded-xl bg-vannam-yellow/10 text-vannam-orange flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>+1 (800) 826-6261 (Toll-Free)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#1E293B] font-bold">
              <div className="w-9 h-9 rounded-xl bg-[#00A8E8]/10 text-[#00A8E8] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <span className="break-all">admissions@vannamworldpreschool.com</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F0F4FC] p-6 rounded-3xl space-y-4 border border-[#CBD8F6] flex flex-col justify-between">
          <div className="space-y-2">
            <h4 className="font-heading text-xl font-bold text-[#0F2963]">Book a Personal Guided Tour</h4>
            <p className="text-xs text-[#334155] font-medium leading-relaxed">
              Experience the joy firsthand. Bring your little one along for a 45-minute guided interactive campus walkthrough.
            </p>
          </div>
          <Link 
            href="/admissions" 
            className="w-full btn-primary py-3.5 text-center text-xs font-extrabold flex items-center justify-center gap-2 shadow-md"
          >
            <span>Book Tour Slot Online</span>
            <Sparkles className="w-3.5 h-3.5 text-vannam-yellow" />
          </Link>
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
