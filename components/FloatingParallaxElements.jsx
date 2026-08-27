"use client";

import React, { useState, useEffect } from "react";

/**
 * FloatingParallaxElements
 * Ambient background floating elements: origami paper planes, hot air balloons,
 * friendly twinkling stars, and smiling clouds that add magical depth without distracting.
 */
export default function FloatingParallaxElements() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none" 
      aria-hidden="true"
    >
      {/* Gliding Origami Paper Plane 1 (Top Left to Right) */}
      <div 
        style={{
          transform: `translate3d(${Math.sin(scrollY * 0.0015) * 60}px, ${scrollY * -0.08}px, 0)`,
          transition: "transform 0.1s linear",
        }}
        className="absolute top-28 left-[6%] opacity-60 hidden md:block animate-paper-plane-glide"
      >
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
          <polygon points="8,32 56,12 36,48 28,36" fill="#38BDF8" />
          <polygon points="56,12 28,36 34,26" fill="#BAE6FD" />
          <polygon points="28,36 36,48 33,37" fill="#0284C7" />
        </svg>
      </div>

      {/* Floating Hot Air Balloon (Right side) */}
      <div
        style={{
          transform: `translate3d(0, ${scrollY * -0.05}px, 0)`,
          transition: "transform 0.1s linear",
        }}
        className="absolute top-[35vh] right-[4%] opacity-50 hidden lg:block animate-float-slow"
      >
        <svg width="60" height="74" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
          {/* Balloon envelope stripes */}
          <path d="M32 4C16 4 6 18 6 34C6 48 24 58 28 62H36C40 58 58 48 58 34C58 18 48 4 32 4Z" fill="#F43F5E" />
          <path d="M32 4C24 4 18 18 18 34C18 48 27 58 30 62H34C37 58 46 48 46 34C46 18 40 4 32 4Z" fill="#FBBF24" />
          <path d="M32 4C28 4 25 18 25 34C25 48 29 58 31 62H33C35 58 39 48 39 34C39 18 36 4 32 4Z" fill="#38BDF8" />
          {/* Basket ropes */}
          <line x1="28" y1="62" x2="26" y2="70" stroke="#78350F" strokeWidth="1.2" />
          <line x1="36" y1="62" x2="38" y2="70" stroke="#78350F" strokeWidth="1.2" />
          {/* Woven basket */}
          <rect x="25" y="70" width="14" height="8" rx="2" fill="#D97706" />
        </svg>
      </div>

      {/* Floating Sparkle Star (Bottom Left) */}
      <div 
        style={{
          transform: `translate3d(0, ${scrollY * -0.04}px, 0)`,
        }}
        className="absolute bottom-[20vh] left-[5%] opacity-40 animate-pulse"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>
  );
}
