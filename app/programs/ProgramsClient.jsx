"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Award, BookOpen, Clock, Sparkles } from "lucide-react";
import FeeCalculator from "../../components/FeeCalculator";
import {
  TeddyBearIcon,
  AlphabetBlock,
  PuzzlePieceIcon,
  CrayonIcon,
  StorybookIcon,
  TwinkleStarIcon,
  RainbowIcon,
  HappyCloudIcon,
  PinwheelToy
} from "../../components/ToyDecorations";

export default function ProgramsClient() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] bg-playful-dots font-sans text-[#0F2963] py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 relative overflow-hidden">
      
      {/* Decorative Playful Elements */}
      <div className="hidden lg:block absolute top-10 left-10 animate-float pointer-events-none opacity-80">
        <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
      </div>
      <div className="hidden lg:block absolute top-16 right-12 animate-float-reverse pointer-events-none opacity-80">
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
          <span className="truncate">Montessori STEAM Curriculum</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto relative">
        <span className="inline-flex items-center gap-1.5 bg-vannam-yellow/10 text-vannam-orange text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-vannam-yellow/30">
          <TwinkleStarIcon color="amber" className="w-3.5 h-3.5 animate-pulse" />
          <span>Age-Tailored Learning Paths</span>
        </span>
        <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] leading-tight">
          Early Learning <span className="text-vannam-yellow underline decoration-[#0F2963] underline-offset-8">Programs</span>
        </h1>
        <p className="text-[#334155] text-sm sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          Every developmental milestone is celebrated with an enriching blend of self-discovery, hands-on STEAM challenges, and joyful social play.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Toddler Discovery */}
        <div className="bento-card card-amber p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-vannam-yellow/20/90 text-vannam-orange text-xs font-black uppercase tracking-wider">
                Ages 1.5 - 2.5 Years
              </span>
              <TeddyBearIcon className="w-8 h-8 opacity-70 group-hover:scale-110 transition transform" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">Toddler Discovery</h3>
            <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
              Focusing on sensory development, gross motor coordination, emotional bonding, and supported potty-training routines.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-[#1E293B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-yellow shrink-0" />
                <span>1:4 Educator to Child Ratio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-yellow shrink-0" />
                <span>Sensory Play & Water Tables</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-yellow shrink-0" />
                <span>Music, Movement & Rhyme Immersion</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-vannam-yellow/20/80 flex items-center justify-between text-xs font-extrabold text-[#0F2963]">
            <span>Half-Day / Full-Day Options</span>
            <span className="text-vannam-orange">From $350/mo</span>
          </div>
        </div>

        {/* Playgroup Explorer */}
        <div className="bento-card card-emerald p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-vannam-green/20/90 text-vannam-green text-xs font-black uppercase tracking-wider">
                Ages 2.5 - 3.5 Years
              </span>
              <AlphabetBlock letter="P" color="emerald" className="w-8 h-8 opacity-80 group-hover:scale-110 transition transform" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">Playgroup Explorer</h3>
            <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
              Stimulating language explosion, vocabulary building, interactive circle time, and cooperative socialization games.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-[#1E293B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-green shrink-0" />
                <span>1:6 Educator to Child Ratio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-green shrink-0" />
                <span>Montessori Self-Correction Trays</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-green shrink-0" />
                <span>Bilingual Phonics & Story Circles</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-vannam-green/20/80 flex items-center justify-between text-xs font-extrabold text-[#0F2963]">
            <span>Flexible 3 or 5 Days/Week</span>
            <span className="text-vannam-green">From $420/mo</span>
          </div>
        </div>

        {/* Nursery Innovators */}
        <div className="bento-card card-sky p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-[#00A8E8]/20 text-[#00A8E8] text-xs font-black uppercase tracking-wider">
                Ages 3.5 - 4.5 Years
              </span>
              <PuzzlePieceIcon color="sky" className="w-8 h-8 opacity-80 group-hover:scale-110 transition transform" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">Nursery Innovators</h3>
            <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
              Hands-on introduction to early numeracy, pre-writing pencil grip mastery, junior science experiments, and nature labs.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-[#1E293B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-cyan shrink-0" />
                <span>1:8 Educator to Child Ratio</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-cyan shrink-0" />
                <span>Junior STEAM Lab Experiments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-cyan shrink-0" />
                <span>Maths Tactile Bead Sets & Phonics</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-sky-200 flex items-center justify-between text-xs font-extrabold text-[#0F2963]">
            <span>Full Academic Syllabus</span>
            <span className="text-vannam-cyan">From $490/mo</span>
          </div>
        </div>

        {/* Kindergarten Preparatory */}
        <div className="bento-card card-rose p-8 space-y-6 hover:-translate-y-2 transition-all duration-300 relative group flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-vannam-red/20/90 text-vannam-red text-xs font-black uppercase tracking-wider">
                Ages 4.5 - 6.0 Years
              </span>
              <StorybookIcon className="w-8 h-8 opacity-80 group-hover:scale-110 transition transform" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">Kindergarten Preparatory</h3>
            <p className="text-sm text-[#1E293B] font-medium leading-relaxed">
              Complete readiness for elementary school with confident reading, addition/subtraction, public speaking, and digital literacy.
            </p>
            <ul className="space-y-2 pt-2 text-xs font-bold text-[#1E293B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-red shrink-0" />
                <span>1:10 Ratio + Assistant Specialist</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-red shrink-0" />
                <span>Robotics & Coding Logic Kits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vannam-red shrink-0" />
                <span>Public Speaking & Drama Theater</span>
              </li>
            </ul>
          </div>
          <div className="pt-4 border-t border-rose-200 flex items-center justify-between text-xs font-extrabold text-[#0F2963]">
            <span>Elementary School Prepared</span>
            <span className="text-vannam-red">From $550/mo</span>
          </div>
        </div>

      </div>

      {/* Interactive Fee Estimator */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-vannam-orange uppercase tracking-wider">Transparent Pricing</span>
          <h2 className="font-heading text-3xl font-extrabold text-[#0F2963]">Estimate Your Child&apos;s Tuition</h2>
        </div>
        <FeeCalculator />
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/" className="btn-primary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          ← Return To Main Homepage
        </Link>
        <Link href="/admissions" className="btn-secondary px-8 py-3.5 text-xs font-bold inline-flex items-center gap-2">
          <span>Apply For Admissions</span>
          <Sparkles className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
