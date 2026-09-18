"use client";

import React, { useState } from "react";
import { 
  Clock, 
  Sun, 
  Cloud, 
  Moon, 
  Sparkles, 
  Apple, 
  MoonStar,
  CheckCircle2
} from "lucide-react";
import { 
  TeddyBearIcon, 
  PinwheelToy, 
  CreativitySceneGroup,
  CrayonIcon,
  StorybookIcon,
  RainbowIcon,
  HappyCloudIcon,
  PuzzlePieceIcon,
  ToyCarIcon,
  KiteIcon
} from "./ToyDecorations";

const COMPACT_STATIONS = [
  {
    id: "station-art",
    number: "01",
    phase: "morning",
    title: "Art & Craft Studio",
    time: "8:30 – 9:30 AM",
    themeColor: "rose",
    bgGradient: "from-rose-50/90 via-white to-amber-50/40",
    badgeBg: "bg-rose-100 text-rose-700 border-rose-200",
    cardBorder: "border-rose-200/80 hover:border-rose-300",
    Icon: CrayonIcon,
    childText: "Finger painting, soft dough sculpting, and vibrant rainbow crafts with organic colors.",
    parentText: "Builds fine-motor pincer grip, bilateral hand control, and sensory regulation.",
    tag: "Fine-Motor & Creativity"
  },
  {
    id: "station-story",
    number: "02",
    phase: "morning",
    title: "Phonics & Story Theater",
    time: "9:30 – 10:15 AM",
    themeColor: "purple",
    bgGradient: "from-purple-50/90 via-white to-indigo-50/40",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
    cardBorder: "border-purple-200/80 hover:border-purple-300",
    Icon: StorybookIcon,
    childText: "Living puppet stories, funny animal sounds, and tactile pop-up picture books.",
    parentText: "Develops phonemic awareness, vocabulary recall, and narrative listening skills.",
    tag: "Language & Phonics"
  },
  {
    id: "station-dining",
    number: "03",
    phase: "morning",
    title: "Social Dining & Fruit Circle",
    time: "10:15 – 11:00 AM",
    themeColor: "amber",
    bgGradient: "from-amber-50/90 via-white to-orange-50/40",
    badgeBg: "bg-amber-100 text-amber-700 border-amber-200",
    cardBorder: "border-amber-200/80 hover:border-amber-300",
    Icon: TeddyBearIcon,
    childText: "Peeling sweet mandarin oranges, setting mini placemats, and dining with friends.",
    parentText: "Encourages self-help independence, table manners, and social sharing habits.",
    tag: "Self-Help & Nutrition"
  },
  {
    id: "station-music",
    number: "04",
    phase: "mid-day",
    title: "Music & Movement",
    time: "11:00 – 11:45 AM",
    themeColor: "sky",
    bgGradient: "from-sky-50/90 via-white to-cyan-50/40",
    badgeBg: "bg-sky-100 text-sky-700 border-sky-200",
    cardBorder: "border-sky-200/80 hover:border-sky-300",
    Icon: RainbowIcon,
    childText: "Tapping wooden marimbas, waving silk streamers, and joyful dance routines.",
    parentText: "Enhances vestibular balance, auditory cadence, and gross-motor coordination.",
    tag: "Rhythm & Balance"
  },
  {
    id: "station-nature",
    number: "05",
    phase: "mid-day",
    title: "Nature & Garden Lab",
    time: "11:45 AM – 12:30 PM",
    themeColor: "emerald",
    bgGradient: "from-emerald-50/90 via-white to-teal-50/40",
    badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    cardBorder: "border-emerald-200/80 hover:border-emerald-300",
    Icon: HappyCloudIcon,
    childText: "Planting seeds in rich garden soil, butterfly tracing, and smelling fragrant herbs.",
    parentText: "Promotes early scientific inquiry, microbiome health, and environmental care.",
    tag: "Scientific Inquiry"
  },
  {
    id: "station-steam",
    number: "06",
    phase: "afternoon",
    title: "Montessori STEAM Puzzles",
    time: "1:30 – 2:30 PM",
    themeColor: "indigo",
    bgGradient: "from-indigo-50/90 via-white to-violet-50/40",
    badgeBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
    cardBorder: "border-indigo-200/80 hover:border-indigo-300",
    Icon: PuzzlePieceIcon,
    childText: "Connecting spinning wooden cogs, building magnet towers, and solving mazes.",
    parentText: "Builds spatial logic, causal reasoning, and persistence through trial and error.",
    tag: "Spatial Reasoning"
  },
  {
    id: "station-agility",
    number: "07",
    phase: "afternoon",
    title: "Outdoor Agility & Sandbox",
    time: "2:30 – 3:15 PM",
    themeColor: "orange",
    bgGradient: "from-orange-50/90 via-white to-amber-50/40",
    badgeBg: "bg-orange-100 text-orange-700 border-orange-200",
    cardBorder: "border-orange-200/80 hover:border-orange-300",
    Icon: ToyCarIcon,
    childText: "Tricycles on smooth tracks, sensory sand castles, and wooden balance logs.",
    parentText: "Strengthens core stability, leg motor agility, and proprioceptive muscle tone.",
    tag: "Gross-Motor Play"
  },
  {
    id: "station-rest",
    number: "08",
    phase: "afternoon",
    title: "Quiet Wind-Down & Rest",
    time: "3:15 – 4:00 PM",
    themeColor: "violet",
    bgGradient: "from-violet-50/90 via-white to-purple-50/40",
    badgeBg: "bg-violet-100 text-violet-700 border-violet-200",
    cardBorder: "border-violet-200/80 hover:border-violet-300",
    Icon: KiteIcon,
    childText: "Cozy muslin blankets, soft soothing melodies, and gentle daydream story time.",
    parentText: "Lowers cortisol, consolidates memory pathways, and restores emotional energy.",
    tag: "Restful Restoration"
  }
];

export function JoyfulDailyActivities() {
  const [activePhase, setActivePhase] = useState("morning");
  const [lensMode, setLensMode] = useState("child"); // "child" | "parent"

  const filteredStations = COMPACT_STATIONS.filter((st) => st.phase === activePhase);

  return (
    <div className="w-full relative">
      {/* ── 1. CLEAN SECTION HEADER (NO LIVE TICKERS, NO SOUNDS) ── */}
      <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7 space-y-2">
        
        {/* Playful Toy Mascot Scene */}
        <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 mb-1">
          <TeddyBearIcon className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce-gentle" />
          <CreativitySceneGroup className="opacity-95 scale-90 sm:scale-100" />
          <PinwheelToy className="w-6 h-6 sm:w-7 sm:h-7 animate-float" />
        </div>

        {/* Clean Static Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-red bg-rose-100 border border-rose-300 px-3.5 py-1 rounded-full shadow-2xs">
          <Clock className="w-3.5 h-3.5 text-vannam-red" />
          <span>A Day at Vannam World Preschool</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight mobile-text-shadow">
          Joyful <span className="text-vannam-red underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Daily Activities</span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-[#334155] font-semibold leading-relaxed max-w-xl mx-auto mobile-readable-text">
          Every hour is balanced between structured learning, free play, organic dining, and restful quiet time.
        </p>
      </div>

      {/* ── 2. DUAL PERSPECTIVE LENS SWITCHER (COMPACT) ── */}
      <div className="max-w-md mx-auto mb-5 sm:mb-6">
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-2xl sm:rounded-full border border-amber-200/90 shadow-2xs flex items-center gap-1">
          <button
            onClick={() => setLensMode("child")}
            className={`flex-1 py-1.5 px-3 rounded-xl sm:rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              lensMode === "child"
                ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2963]"
            }`}
          >
            <span>🧸</span>
            <span>Child&apos;s Perspective</span>
          </button>

          <button
            onClick={() => setLensMode("parent")}
            className={`flex-1 py-1.5 px-3 rounded-xl sm:rounded-full font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              lensMode === "parent"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:text-[#0F2963]"
            }`}
          >
            <span>🧠</span>
            <span>Montessori Milestone</span>
          </button>
        </div>
      </div>

      {/* ── 3. HORIZON TIME TABS (COMPACT) ── */}
      <div className="mb-5 sm:mb-6">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 p-1.5 rounded-2xl sm:rounded-3xl bg-white/85 backdrop-blur-md border border-amber-200/80 shadow-2xs max-w-4xl mx-auto">
          {[
            {
              id: "morning",
              label: "Morning",
              time: "8:00 – 11:00 AM",
              icon: Sun,
              activeBg: "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-xs border-amber-400",
              inactiveBg: "bg-amber-50/60 hover:bg-amber-100/70 text-[#0F2963]",
              iconColor: "text-amber-500"
            },
            {
              id: "mid-day",
              label: "Mid-Day",
              time: "11:00 AM – 1:30 PM",
              icon: Cloud,
              activeBg: "bg-gradient-to-br from-orange-500 to-rose-500 text-white shadow-xs border-orange-400",
              inactiveBg: "bg-orange-50/60 hover:bg-orange-100/70 text-[#0F2963]",
              iconColor: "text-orange-500"
            },
            {
              id: "afternoon",
              label: "Afternoon",
              time: "1:30 – 4:00 PM",
              icon: Moon,
              activeBg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xs border-purple-400",
              inactiveBg: "bg-purple-50/60 hover:bg-purple-100/70 text-[#0F2963]",
              iconColor: "text-purple-500"
            }
          ].map((tab) => {
            const isActive = activePhase === tab.id;
            const TabIcon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActivePhase(tab.id)}
                className={`py-2 px-2 sm:px-3 rounded-xl transition-all duration-200 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 text-center sm:text-left border cursor-pointer ${
                  isActive ? tab.activeBg : tab.inactiveBg
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? "bg-white/20 text-white" : "bg-white shadow-2xs " + tab.iconColor
                }`}>
                  <TabIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className={`block font-heading font-black text-xs leading-tight truncate ${
                    isActive ? "text-white" : "text-[#0F2963]"
                  }`}>
                    {tab.label}
                  </span>
                  <span className={`block text-[10px] font-semibold leading-tight mt-0.5 truncate ${
                    isActive ? "text-amber-100" : "text-slate-500"
                  }`}>
                    {tab.time}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. COMPACT & CLEAN ACTIVITY CARDS: Horizontal Swipeable on Mobile, Grid on Desktop ── */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:overflow-visible mb-6">
        {filteredStations.map((station) => {
          const CardIcon = station.Icon;

          return (
            <div
              key={station.id}
              className={`w-[82vw] xs:w-[285px] shrink-0 snap-center md:w-auto rounded-2xl border ${station.cardBorder} bg-gradient-to-br ${station.bgGradient} p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
            >
              {/* Top Row: Station Pill + Clock Time */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider border shadow-2xs ${station.badgeBg}`}>
                  Station {station.number}
                </span>

                <span className="inline-flex items-center gap-1 text-[10.5px] font-black text-slate-500 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200/80">
                  <Clock className="w-3 h-3 text-vannam-orange" />
                  <span>{station.time}</span>
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-amber-200/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CardIcon className="w-5 h-5" color={station.themeColor} />
                </div>
                <h3 className="font-heading font-black text-sm sm:text-base text-[#0F2963] leading-snug group-hover:text-vannam-orange transition-colors">
                  {station.title}
                </h3>
              </div>

              {/* Crisp Description (Lens Switched) */}
              <p className="text-xs text-[#334155] font-semibold leading-relaxed mb-3">
                {lensMode === "child" ? station.childText : station.parentText}
              </p>

              {/* Bottom Tag */}
              <div className="pt-2 border-t border-amber-100/90 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Focus:
                </span>
                <span className="text-[10px] font-extrabold text-[#0F2963] bg-white/90 px-2 py-0.5 rounded-md border border-slate-200/70 shadow-2xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{station.tag}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 5. PARENT REASSURANCE WELLNESS STATS BAR (COMPACT) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-200/80 shadow-2xs">
        <div className="flex items-center gap-2.5 p-1.5">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold shrink-0 shadow-2xs">
            <Apple className="w-4 h-4 text-rose-500" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-[#0F2963]">100% Organic Chef Meals</h4>
            <p className="text-[10px] text-slate-500 font-medium">Fresh fruits, warm grain bowls, allergy-monitored</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-1.5 border-y sm:border-y-0 sm:border-x border-amber-100">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-[#0F2963]">1:6 Individual Attention</h4>
            <p className="text-[10px] text-slate-500 font-medium">Nurturing comfort & personalized guidance</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 p-1.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0 shadow-2xs">
            <MoonStar className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h4 className="font-heading font-black text-xs text-[#0F2963]">UV-Sterilized Nap Cots</h4>
            <p className="text-[10px] text-slate-500 font-medium">Calm soothing soundscapes & ergonomic bedding</p>
          </div>
        </div>
      </div>
    </div>
  );
}
