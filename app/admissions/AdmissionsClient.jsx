"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Phone, Mail, MapPin, CheckCircle2, Clock, Sparkles, Send, FileCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { 
  TwinkleStarIcon, 
  AlphabetBlock, 
  TeddyBearIcon, 
  PuzzlePieceIcon, 
  RainbowIcon, 
  HappyCloudIcon, 
  PinwheelToy, 
  StorybookIcon 
} from "../../components/ToyDecorations";
import { getAcademicYear, getFullAcademicYear } from "../../lib/academicYear";

export default function AdmissionsClient() {
  const [submitted, setSubmitted] = useState(false);
  const [parentName, setParentName] = useState("");
  const [childInfo, setChildInfo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          childName: childInfo.split(',')[0]?.trim() || childInfo,
          childDob: childInfo.includes(',') ? childInfo.split(',')[1]?.trim() : '',
          phone,
          email,
          program: `Preschool Admission Inquiry ${getAcademicYear()}`
        })
      });
    } catch (err) {
      console.error("Error submitting admission:", err);
    }
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setSubmitted(true);
  };

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

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-vannam-red/10 border border-vannam-red/30 text-vannam-red text-[10px] sm:text-xs font-bold shadow-2xs truncate">
          <PinwheelToy className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
          <span className="truncate">Academic Year {getAcademicYear()}</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto relative">
        <span className="inline-flex items-center gap-1.5 bg-vannam-red/10 text-vannam-red text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-vannam-red/30">
          <TwinkleStarIcon color="rose" className="w-3.5 h-3.5 animate-pulse" />
          <span>Enrollment & Registration</span>
        </span>
        <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] leading-tight">
          Admissions & <span className="text-[#F43F5E] underline decoration-vannam-yellow underline-offset-8">Enrollment Flow</span>
        </h1>
        <p className="text-[#334155] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          We welcome families to Vannam World Preschool for Academic Year {getFullAcademicYear()}. Review our 4-step admission process and submit an inquiry below.
        </p>
      </div>

      {/* 4-Step Flow Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 relative z-10">
        
        <div className="bento-card card-amber p-6 sm:p-7 space-y-3 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <span className="w-12 h-12 bg-vannam-yellow text-[#0F2963] font-heading font-extrabold rounded-2xl flex items-center justify-center text-lg shadow-md border-2 border-white">
              1
            </span>
            <AlphabetBlock letter="1" color="amber" className="w-6 h-6 opacity-70" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F2963]">1. Inquiry & Visit</h3>
          <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
            Schedule a morning or afternoon tour slot to inspect our campus, sensory playrooms, and outdoor lawn.
          </p>
        </div>

        <div className="bento-card card-emerald p-6 sm:p-7 space-y-3 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <span className="w-12 h-12 bg-vannam-green text-white font-heading font-extrabold rounded-2xl flex items-center justify-center text-lg shadow-md border-2 border-white">
              2
            </span>
            <PuzzlePieceIcon color="emerald" className="w-6 h-6 opacity-80" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F2963]">2. Observation</h3>
          <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
            Informal child interaction session with caring educators and developmental dialogue with Principal Bennett.
          </p>
        </div>

        <div className="bento-card card-sky p-6 sm:p-7 space-y-3 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <span className="w-12 h-12 bg-[#00A8E8] text-white font-heading font-extrabold rounded-2xl flex items-center justify-center text-lg shadow-md border-2 border-white">
              3
            </span>
            <StorybookIcon className="w-6 h-6 opacity-80" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F2963]">3. Documents</h3>
          <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
            Submit birth certificate copy, pediatric health/vaccine record, 4 passport photos, and parent identification.
          </p>
        </div>

        <div className="bento-card card-rose p-6 sm:p-7 space-y-3 hover:-translate-y-2 transition-all duration-300 relative group">
          <div className="flex items-center justify-between">
            <span className="w-12 h-12 bg-vannam-red text-white font-heading font-extrabold rounded-2xl flex items-center justify-center text-lg shadow-md border-2 border-white">
              4
            </span>
            <TeddyBearIcon className="w-6 h-6 opacity-80" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F2963]">4. Confirmation</h3>
          <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed">
            Official admission letter, welcome learning kit, uniform pack, and secure Parent Portal login credentials.
          </p>
        </div>

      </div>

      {/* Inquiry Form Bento Container */}
      <div className="max-w-2xl mx-auto bento-card p-8 sm:p-10 border-2 border-vannam-yellow/20 shadow-xl space-y-6 relative z-10">
        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-20 h-20 bg-vannam-green/10 text-vannam-green border-2 border-vannam-green/30 rounded-full flex items-center justify-center mx-auto text-4xl shadow-md">
              ✓
            </div>
            <h3 className="font-heading text-3xl font-extrabold text-[#0F2963]">Admission Inquiry Submitted! 🎉</h3>
            <p className="text-sm text-[#334155] font-medium max-w-md mx-auto">
              Thank you for choosing Vannam World Preschool! Our admissions officer will call you within 2 business hours with prospectus details.
            </p>
            <div className="pt-3">
              <button
                onClick={() => setSubmitted(false)}
                className="btn-primary px-6 py-3 text-xs font-bold"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8EEFB] pb-4">
              <div>
                <h3 className="font-heading text-2xl font-extrabold text-[#0F2963]">Official Admission Inquiry</h3>
                <p className="text-xs text-[#64748B] font-semibold">Limited admissions open for Academic Year {getAcademicYear()}</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-vannam-yellow/10 text-vannam-orange flex items-center justify-center shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">Parent's Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Dr. Sarah Jenkins" 
                  className="w-full bg-[#F0F4FC]/80 border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-vannam-yellow focus:bg-white focus:outline-none transition shadow-2xs font-medium" 
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">Child's Name & Age *</label>
                <input 
                  type="text" 
                  required 
                  value={childInfo}
                  onChange={(e) => setChildInfo(e.target.value)}
                  placeholder="e.g. Leo, 2.5 Yrs" 
                  className="w-full bg-[#F0F4FC]/80 border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-vannam-yellow focus:bg-white focus:outline-none transition shadow-2xs font-medium" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">Mobile Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000" 
                  className="w-full bg-[#F0F4FC]/80 border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-vannam-yellow focus:bg-white focus:outline-none transition shadow-2xs font-medium" 
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com" 
                  className="w-full bg-[#F0F4FC]/80 border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs focus:ring-2 focus:ring-vannam-yellow focus:bg-white focus:outline-none transition shadow-2xs font-medium" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full btn-primary text-sm font-extrabold py-4 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Submit Admission Application</span>
              <Sparkles className="w-4 h-4 text-vannam-yellow" />
            </button>
          </form>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          ← Return To Main Homepage
        </Link>
        <Link href="/safety" className="btn-secondary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          <span>Explore Safety & Health</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
