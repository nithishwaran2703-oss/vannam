"use client";

import React, { useState } from "react";
import { Eye, ShieldCheck, BookOpen, Sun, Sparkles } from "lucide-react";
import { TwinkleStarIcon } from "./ToyDecorations";

export default function VirtualTour() {
  const [selectedSpot, setSelectedSpot] = useState("playroom");

  const spots = {
    playroom: {
      title: "Interactive Sensory Playroom",
      icon: "🎨",
      bg: "from-amber-200/80 via-yellow-100/60 to-amber-50 border-vannam-yellow/30",
      accent: "text-vannam-orange",
      badge: "bg-vannam-yellow/10 text-vannam-orange border-vannam-yellow/30",
      description: "Equipped with non-toxic sensory touch walls, anti-injury soft foam flooring, building blocks, and alphabet stenciling tables.",
      highlights: ["Anti-Injury Soft Padding", "Daily UV Sanitization", "Biometric CCTV Monitored"]
    },
    steam: {
      title: "Montessori STEAM Science Corner",
      icon: "🔬",
      bg: "from-sky-200/80 via-cyan-100/60 to-sky-50 border-vannam-cyan/30",
      accent: "text-[#00A8E8]",
      badge: "bg-vannam-cyan/10 text-vannam-cyan border-vannam-cyan/30",
      description: "Hands-on exploration station featuring tactile counting rods, magnifying glasses, plant growth stations, and LEGO robotics.",
      highlights: ["Child-Safe Microscope Kits", "Tactile Wooden Math Blocks", "Teacher Guided Projects"]
    },
    lawn: {
      title: "Green Outdoor Adventure Lawn",
      icon: "🛝",
      bg: "from-emerald-200/80 via-green-100/60 to-emerald-50 border-vannam-green/30",
      accent: "text-vannam-green",
      badge: "bg-vannam-green/10 text-vannam-green border-vannam-green/30",
      description: "Spacious natural grass play lawn with certified safe slides, soft sandbox, mini tricycle track, and shade canopy.",
      highlights: ["Shock-Absorbing Rubber Turf", "Shaded Rest Cabanas", "Physical Agility Tracks"]
    },
    kitchen: {
      title: "Certified Organic Kitchen & Dining",
      icon: "🍎",
      bg: "from-rose-200/80 via-pink-100/60 to-rose-50 border-vannam-red/30",
      accent: "text-vannam-red",
      badge: "bg-vannam-red/10 text-vannam-red border-vannam-red/30",
      description: "Strictly hygienic kitchen preparing fresh organic fruit snacks, warm soups, and balanced nutritionist lunches daily.",
      highlights: ["100% Organic Farm Ingredients", "Allergy-Isolated Meal Prep", "Kid-Friendly Cutlery"]
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#CBD8F6] space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8EEFB] pb-4">
        <div>
          <span className="inline-flex items-center gap-1 bg-vannam-cyan/10 text-vannam-cyan text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-vannam-cyan/30">
            <TwinkleStarIcon color="sky" className="w-3.5 h-3.5" />
            <span>Explore Before You Visit</span>
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963] mt-1">Virtual 360° Campus Hotspots</h3>
        </div>

        {/* Spot Switcher */}
        <div className="flex flex-wrap gap-2">
          {Object.keys(spots).map((spotKey) => (
            <button
              key={spotKey}
              onClick={() => setSelectedSpot(spotKey)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition flex items-center gap-2 border ${
                selectedSpot === spotKey 
                  ? "bg-[#0F2963] text-white border-[#0F2963] shadow-md scale-[1.02]" 
                  : "bg-[#F0F4FC] text-[#1E293B] border-[#CBD8F6] hover:bg-[#E8EEFB]"
              }`}
            >
              <span>{spots[spotKey].icon}</span>
              <span>{spots[spotKey].title.split(" ")[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Canvas */}
      <div className={`bg-gradient-to-tr ${spots[selectedSpot].bg} rounded-3xl p-6 sm:p-10 border-2 shadow-inner flex flex-col md:flex-row items-center gap-8`}>
        
        <div className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-3xl flex items-center justify-center text-6xl shadow-xl shrink-0 border-4 border-white animate-bounce-gentle">
          {spots[selectedSpot].icon}
        </div>

        <div className="space-y-3 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-extrabold text-[#0F2963] shadow-2xs border border-[#E8EEFB]">
            <Eye className="w-4 h-4 text-[#00A8E8]" />
            <span>Interactive Campus Hotspot</span>
          </div>

          <h4 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">{spots[selectedSpot].title}</h4>
          <p className="text-xs sm:text-sm text-[#1E293B] font-medium leading-relaxed max-w-xl">
            {spots[selectedSpot].description}
          </p>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-2">
            {spots[selectedSpot].highlights.map((h, i) => (
              <span key={i} className="bg-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold text-[#0F2963] shadow-2xs border border-[#E8EEFB] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-vannam-yellow" />
                <span>{h}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

