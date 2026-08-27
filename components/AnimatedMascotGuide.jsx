"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  X, 
  ChevronUp, 
  MessageCircle, 
  Smile, 
  BookOpen, 
  ShieldCheck, 
  PhoneCall, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Heart,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";

// Fun tips that Vannu shares depending on page sections
const MASCOT_MESSAGES = {
  default: [
    { text: "Hi! I'm Vannu! 👋 Welcome to Vannam World Preschool!", action: "wave" },
    { text: "Did you know? Our teacher ratio is 1:6 for personalized care! 🌟", action: "star" },
    { text: "Try popping the floating bubbles on your screen! 🫧", action: "bubble" },
    { text: "Need help scheduling a school visit? Click 'Book Tour'! 🏫", action: "tour" },
  ],
  hero: [
    { text: "Welcome to our joyful learning wonderland! 🎈", action: "wave" },
    { text: "Admissions for 2026-27 are now open with early-bird perks! 🚀", action: "star" },
  ],
  programs: [
    { text: "We blend Montessori method with hands-on STEAM activities! 🎨🔬", action: "book" },
    { text: "From Toddlers to Senior KG, every stage is filled with curiosity!", action: "star" },
  ],
  safety: [
    { text: "Your child's safety is our #1 priority with 4K encrypted live streaming! 🛡️", action: "shield" },
    { text: "100% background-verified teachers & pediatric first aid certified! 🩺", action: "heart" },
  ],
  admissions: [
    { text: "Hurry! Limited 18 seats per batch to ensure individual love & attention! 📝", action: "star" },
  ],
  tour: [
    { text: "Come visit our sensory playground & organic cafeteria! 🥪🌸", action: "tour" },
  ],
};

export default function AnimatedMascotGuide({ playChime, soundEnabled }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentSection, setCurrentSection] = useState("default");
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const mascotRef = useRef(null);
  const speechTimeoutRef = useRef(null);

  // Track cursor position to make Vannu's eyes look at the mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      const distance = Math.hypot(deltaX, deltaY);
      const maxOffset = 3.5;

      if (distance > 0) {
        setPupilOffset({
          x: Math.min(Math.max((deltaX / distance) * maxOffset, -maxOffset), maxOffset),
          y: Math.min(Math.max((deltaY / distance) * maxOffset, -maxOffset), maxOffset),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Detect current scroll section to give contextual advice
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / (totalHeight || 1);

      if (scrollY < 600) {
        setCurrentSection("hero");
      } else if (scrollPercent > 0.15 && scrollPercent < 0.45) {
        setCurrentSection("programs");
      } else if (scrollPercent >= 0.45 && scrollPercent < 0.7) {
        setCurrentSection("safety");
      } else if (scrollPercent >= 0.7) {
        setCurrentSection("admissions");
      } else {
        setCurrentSection("default");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycle tips periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const messages = MASCOT_MESSAGES[currentSection] || MASCOT_MESSAGES.default;
      setMessageIndex((prev) => (prev + 1) % messages.length);
      setShowSpeechBubble(true);
    }, 9000);

    return () => clearInterval(interval);
  }, [currentSection]);

  const handleMascotClick = () => {
    setIsJumping(true);
    if (playChime) playChime(523.25); // C5 cheerful chime

    // Small star confetti burst
    try {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 24,
          spread: 60,
          origin: {
            x: 0.9,
            y: 0.88,
          },
          colors: ["#F59E0B", "#F43F5E", "#38BDF8", "#10B981", "#8B5CF6"],
          shapes: ["star", "circle"],
          ticks: 120,
        });
      }
    } catch {
      // safe fallback
    }

    const messages = MASCOT_MESSAGES[currentSection] || MASCOT_MESSAGES.default;
    setMessageIndex((prev) => (prev + 1) % messages.length);
    setShowSpeechBubble(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 800);
  };

  const activeMessages = MASCOT_MESSAGES[currentSection] || MASCOT_MESSAGES.default;
  const currentMsg = activeMessages[messageIndex % activeMessages.length];

  return (
    <div 
      ref={mascotRef}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 select-none ${
        isMinimized ? "translate-y-2" : ""
      }`}
      aria-label="Interactive Mascot Companion Vannu"
    >
      {/* Speech Bubble */}
      {!isMinimized && showSpeechBubble && (
        <div className="absolute -top-24 right-0 sm:right-2 w-64 sm:w-72 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-vannam-yellow/40 text-vannam-navy text-xs sm:text-sm font-medium animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 font-fredoka text-vannam-orange text-xs font-bold uppercase tracking-wider mb-1">
              <Smile className="w-3.5 h-3.5 text-vannam-yellow" />
              Vannu Says:
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeechBubble(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
              title="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="leading-snug text-slate-700 font-sans">
            {currentMsg?.text}
          </p>
          {/* Speech bubble pointy arrow */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-vannam-yellow/40 rotate-45" />
        </div>
      )}

      {/* Mascot Container */}
      <div className="relative flex flex-col items-end">
        {/* Minimized Toggle Pill */}
        {isMinimized ? (
          <button
            onClick={() => {
              setIsMinimized(false);
              setShowSpeechBubble(true);
              if (playChime) playChime(440);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-fredoka font-bold text-xs py-2 px-3.5 rounded-full shadow-lg border-2 border-white hover:scale-105 transition-all duration-200 group cursor-pointer"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <span>Say hi to Vannu 🧸</span>
            <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        ) : (
          <div className="relative group flex items-end gap-1">
            {/* Quick close/minimize button on hover */}
            <button
              onClick={() => setIsMinimized(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 left-0 bg-slate-800/80 hover:bg-slate-900 text-white p-1 rounded-full text-[10px] shadow z-10"
              title="Minimize mascot"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Interactive SVG Bear Body */}
            <button
              onClick={handleMascotClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`relative cursor-pointer transition-transform duration-300 focus:outline-none ${
                isJumping ? "animate-bounce" : isHovered ? "scale-110 -translate-y-1" : "hover:scale-105"
              }`}
              title="Click me for a playful surprise!"
            >
              <svg
                width="84"
                height="84"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-xl filter"
              >
                {/* Bear Glow Backdrop */}
                <circle cx="50" cy="50" r="46" fill="#FEF3C7" fillOpacity="0.4" />

                {/* Left Ear */}
                <circle cx="26" cy="24" r="14" fill="#F59E0B" />
                <circle cx="26" cy="24" r="8" fill="#FDE68A" />
                <circle cx="26" cy="24" r="4" fill="#F43F5E" fillOpacity="0.3" />

                {/* Right Ear (Wiggling) */}
                <g className={isHovered ? "animate-pulse" : ""}>
                  <circle cx="74" cy="24" r="14" fill="#F59E0B" />
                  <circle cx="74" cy="24" r="8" fill="#FDE68A" />
                  <circle cx="74" cy="24" r="4" fill="#F43F5E" fillOpacity="0.3" />
                </g>

                {/* Main Head */}
                <circle cx="50" cy="48" r="32" fill="#F59E0B" />

                {/* STEAM Painter Beret / Student Cap */}
                <path
                  d="M32 24C32 16 68 14 72 22C74 26 62 30 50 30C38 30 32 28 32 24Z"
                  fill="#F43F5E"
                />
                <circle cx="54" cy="15" r="3.5" fill="#FDE047" />

                {/* Muzzle */}
                <ellipse cx="50" cy="56" rx="16" ry="12" fill="#FEF3C7" />

                {/* Cute Nose */}
                <ellipse cx="50" cy="50" rx="5.5" ry="4" fill="#78350F" />
                <ellipse cx="48" cy="49" rx="1.5" ry="1" fill="#FFFFFF" fillOpacity="0.8" />

                {/* Cheerful Smile */}
                <path
                  d="M50 54V59M44 58C46 62 54 62 56 58"
                  stroke="#78350F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Rosy Cheeks */}
                <circle cx="31" cy="54" r="4.5" fill="#FB7185" fillOpacity="0.7" />
                <circle cx="69" cy="54" r="4.5" fill="#FB7185" fillOpacity="0.7" />

                {/* Left Eye White & Iris */}
                <circle cx="39" cy="40" r="6" fill="#FFFFFF" />
                <circle 
                  cx={39 + pupilOffset.x} 
                  cy={40 + pupilOffset.y} 
                  r="3.5" 
                  fill="#1E293B" 
                />
                <circle 
                  cx={38 + pupilOffset.x * 0.7} 
                  cy={39 + pupilOffset.y * 0.7} 
                  r="1.2" 
                  fill="#FFFFFF" 
                />

                {/* Right Eye White & Iris */}
                <circle cx="61" cy="40" r="6" fill="#FFFFFF" />
                <circle 
                  cx={61 + pupilOffset.x} 
                  cy={40 + pupilOffset.y} 
                  r="3.5" 
                  fill="#1E293B" 
                />
                <circle 
                  cx={60 + pupilOffset.x * 0.7} 
                  cy={39 + pupilOffset.y * 0.7} 
                  r="1.2" 
                  fill="#FFFFFF" 
                />

                {/* Bear Paws / Waving Arm */}
                <g className={isHovered ? "origin-bottom-left animate-bounce" : ""}>
                  <ellipse cx="22" cy="74" rx="8" ry="6" fill="#F59E0B" />
                  <ellipse cx="22" cy="74" rx="4" ry="3" fill="#FDE68A" />
                </g>

                <g className="animate-pulse">
                  <ellipse cx="78" cy="74" rx="8" ry="6" fill="#F59E0B" />
                  <ellipse cx="78" cy="74" rx="4" ry="3" fill="#FDE68A" />
                </g>

                {/* Cute Bowtie */}
                <path
                  d="M42 70L58 76V70L42 76V70Z"
                  fill="#38BDF8"
                />
                <circle cx="50" cy="73" r="3" fill="#FBBF24" />
              </svg>

              {/* Little Floating Badge */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-vannam-navy text-white text-[10px] font-fredoka font-bold px-2 py-0.5 rounded-full border border-white/80 shadow whitespace-nowrap flex items-center gap-1">
                <span>Vannu</span>
                <Heart className="w-2.5 h-2.5 text-vannam-red fill-vannam-red" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
