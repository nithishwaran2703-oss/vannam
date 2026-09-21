"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Camera, 
  Sparkles, 
  X, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Filter,
  CheckCircle2,
  Users
} from "lucide-react";
import { HangingToyCanopy } from "../../components/VannamChildSystem";
import { 
  TwinkleStarIcon, 
  HappyCloudIcon, 
  PinwheelToy, 
  RainbowIcon,
  CreativitySceneGroup
} from "../../components/ToyDecorations";

const fallbackGallery = [
  { id: "1", title: "Montessori Math Exploration", category: "classroom", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", caption: "Sensory bead chains and tactile math rods encouraging self-directed counting." },
  { id: "2", title: "Outdoor Agility Race", category: "sports", src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80", caption: "Joyful balance obstacle runs on the soft rubberized safety turf." },
  { id: "3", title: "Annual Cultural Dance", category: "celebrations", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80", caption: "Celebrating community diversity, traditional rhythm, and stage confidence." },
  { id: "4", title: "Botany Garden Walk", category: "outdoor", src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80", caption: "Tending to sensory herb plants and observing butterfly life cycles in our botanical garden." },
  { id: "5", title: "Finger Painting Workshop", category: "activities", src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80", caption: "Non-toxic organic color pigments unlocking unrestricted creative expression." },
  { id: "6", title: "Grandparents Day Tea", category: "events", src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80", caption: "Heartwarming cross-generational storytelling and handcrafted origami cards." },
  { id: "7", title: "Story Corner Reading", category: "classroom", src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", caption: "Cozy library circle with interactive giant picture books and phonics puppets." },
  { id: "8", title: "Little Scientists Lab", category: "activities", src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80", caption: "Safe bubbling volcano reactions and light prism discoveries." },
  { id: "9", title: "Water Splash & Sensory Sand", category: "outdoor", src: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80", caption: "Tactile fine motor skills through warm water scooping and sand sculpting." },
  { id: "10", title: "Music & Rhythmic Percussion", category: "activities", src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80", caption: "Xylophones, hand maracas, and movement coordination games." },
  { id: "11", title: "Harvest Autumn Fest", category: "celebrations", src: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=800&q=80", caption: "Pumpkin patch sensory digging and seasonal gratitude songs." },
  { id: "12", title: "STEAM Robotics First Steps", category: "classroom", src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", caption: "Coding bumblebee floor robots to follow colorful maze lines." }
];

export default function GalleryClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [items, setItems] = useState(fallbackGallery);
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/admin/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data.gallery && data.gallery.length > 0) {
            const mapped = data.gallery.map(g => ({
              id: g.id,
              title: g.title,
              category: (g.category || "activities").toLowerCase(),
              src: g.url || g.src || fallbackGallery[0].src,
              caption: g.caption || ""
            }));
            // Merge admin uploaded images with default gallery
            setItems([...mapped, ...fallbackGallery]);
          }
        }
      } catch (err) {
        console.error("Error loading gallery:", err);
      }
    }
    loadGallery();
  }, []);

  const categories = [
    { id: "all", label: "All Memories", icon: "✨" },
    { id: "classroom", label: "Classroom", icon: "📚" },
    { id: "activities", label: "Creative Art", icon: "🎨" },
    { id: "celebrations", label: "Celebrations", icon: "🎉" },
    { id: "events", label: "Events", icon: "🌟" },
    { id: "sports", label: "Sports & Agility", icon: "🏃" },
    { id: "outdoor", label: "Nature & Garden", icon: "🌱" }
  ];

  const filteredItems = selectedCategory === "all" 
    ? items 
    : items.filter(item => item.category === selectedCategory || (selectedCategory === "events" && item.category === "celebrations"));

  const openLightbox = (item, idx) => {
    setActiveLightbox(item);
    setActiveIdx(idx);
  };

  const nextLightbox = (e) => {
    e?.stopPropagation();
    const next = (activeIdx + 1) % filteredItems.length;
    setActiveIdx(next);
    setActiveLightbox(filteredItems[next]);
  };

  const prevLightbox = (e) => {
    e?.stopPropagation();
    const prev = (activeIdx - 1 + filteredItems.length) % filteredItems.length;
    setActiveIdx(prev);
    setActiveLightbox(filteredItems[prev]);
  };

  return (
    <div className="min-h-screen bg-section-gallery font-sans text-[#0F2963] relative overflow-hidden flex flex-col justify-between">
      {/* HANGING TOYS CANOPY */}
      <HangingToyCanopy theme="gallery" ropeColor="#0284C7" />

      {/* Main Content Area */}
      <div className="relative z-20 py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
        
        {/* Top Return Navigation Bar */}
        <div className="flex items-center justify-between gap-3">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-extrabold text-[#0F2963] hover:text-vannam-orange transition bg-white/90 backdrop-blur-md border border-[#CBD8F6] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-2xs group shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition transform" />
            <span>Back to Homepage</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-vannam-yellow/40 text-vannam-orange text-[10px] sm:text-xs font-bold shadow-2xs truncate">
            <PinwheelToy className="w-3.5 h-3.5 animate-spin-slow shrink-0" />
            <span className="truncate">Vannam World Notice Board</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto relative">
          <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] sm:text-xs font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full uppercase tracking-wider shadow-2xs border border-emerald-300/80">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campus Scrapbook • Moments of Joy & Discovery</span>
          </div>

          <h1 className="font-heading text-3xl xs:text-4xl sm:text-5xl font-extrabold text-[#0F2963] leading-tight">
            Explore Campus <span className="text-vannam-cyan underline decoration-vannam-yellow underline-offset-6">Moments</span>
          </h1>

          <p className="text-[#334155] text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            From hands-on Montessori sensory milestones to vibrant annual celebrations, take a visual journey through daily life at Vannam World Preschool.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none snap-x justify-start sm:justify-center px-1 sm:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === "all"
              ? items.length
              : items.filter(i => i.category === cat.id || (cat.id === "events" && i.category === "celebrations")).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition shrink-0 snap-center flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                  isSelected
                    ? "bg-[#0F2963] text-white border border-[#1D4ED8] shadow-xs scale-105"
                    : "bg-white/90 backdrop-blur-md text-[#0F2963] hover:bg-[#E8EEFB] border border-[#CBD8F6]/80"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? "bg-white/20 text-vannam-yellow" : "bg-slate-100 text-[#64748B]"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* AUTHENTIC CAMPUS NOTICE BOARD CONTAINER */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF8]/95 via-[#FEF9ED]/95 to-[#FAF5E6]/95 backdrop-blur-md shadow-xl border-2 border-dashed border-amber-300/80 p-4 sm:p-6 lg:p-8 overflow-hidden">
          
          {/* Subtle Pinboard Dots Texture Overlay */}
          <div className="absolute inset-0 bg-playful-dots opacity-40 pointer-events-none" />

          {/* Notice Board Header Bar */}
          <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6 pb-3 border-b-2 border-dashed border-amber-300/80">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="text-xl sm:text-2xl animate-bounce-gentle">📌</span>
              <span className="font-heading font-black text-xs sm:text-sm md:text-base text-[#0F2963] uppercase tracking-wider">
                Campus Notice Board • Photo Wall
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-900 text-[10px] sm:text-xs font-black shadow-2xs">
              <span>✨</span>
              <span>{filteredItems.length} Pinned Memories</span>
            </div>
          </div>

          {/* Photo Grid — Edge-to-Edge Cards (No Box-in-Box) */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4.5">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id || idx}
                onClick={() => openLightbox(item, idx)}
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/90 hover:border-amber-400/80 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Edge-to-Edge Flush Photo */}
                <div className="relative w-full h-36 xs:h-44 sm:h-52 lg:h-56 overflow-hidden bg-slate-100">
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out" 
                  />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="text-[8.5px] sm:text-[9.5px] font-black uppercase tracking-wider text-white bg-[#0F2963]/85 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Notice Board Pin Accent */}
                  <div className="absolute top-2 right-2 z-10 text-sm drop-shadow-xs pointer-events-none opacity-90 group-hover:scale-110 transition-transform">
                    📌
                  </div>

                  {/* Lightbox Expand Icon */}
                  <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs text-[#0F2963] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-75 group-hover:scale-100 shadow-xs z-10">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Caption Area */}
                <div className="p-3 sm:p-3.5 space-y-1 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-snug line-clamp-2 group-hover:text-vannam-orange transition-colors">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-1.5 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-semibold border-t border-slate-100">
                    <span className="capitalize">{item.category}</span>
                    <span className="text-vannam-orange font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      <span>View</span>
                      <span>↗</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div 
          className="fixed inset-0 z-50 bg-[#091A42]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-200 flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-vannam-orange bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                  {activeLightbox.category}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {activeIdx + 1} of {filteredItems.length}
                </span>
              </div>
              <button 
                onClick={() => setActiveLightbox(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Container */}
            <div className="relative w-full h-[45vh] sm:h-[60vh] bg-slate-900 flex items-center justify-center">
              <Image 
                src={activeLightbox.src} 
                alt={activeLightbox.title} 
                fill 
                sizes="100vw"
                className="object-contain" 
              />

              {/* Prev / Next Navigation Arrows */}
              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition shadow-md cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition shadow-md cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Bottom Caption */}
            <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-black text-base sm:text-lg text-[#0F2963]">
                  {activeLightbox.title}
                </h3>
                {activeLightbox.caption && (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    {activeLightbox.caption}
                  </p>
                )}
              </div>

              <Link
                href="/contact"
                className="px-4 py-2 rounded-full bg-[#0F2963] hover:bg-vannam-orange text-white font-heading font-black text-xs transition shadow-sm shrink-0"
              >
                Visit Our Campus →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
