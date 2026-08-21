"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Star, Moon, Sun, Heart, Cloud, Flower2 } from "lucide-react";

const mobileElements = [
  { id: 1, Icon: Sparkles, color: "text-yellow-400", top: "8%", left: "4%", size: 24, speed: 0.1, delay: 0 },
  { id: 2, Icon: Star, color: "text-blue-300", top: "22%", right: "5%", size: 20, speed: -0.1, delay: 1.2 },
  { id: 3, Icon: Heart, color: "text-pink-300", top: "38%", left: "3%", size: 22, speed: 0.15, delay: 0.5 },
  { id: 4, Icon: Moon, color: "text-indigo-200", top: "55%", right: "4%", size: 26, speed: -0.15, delay: 2.1 },
  { id: 5, Icon: Sun, color: "text-orange-300", top: "72%", left: "5%", size: 28, speed: 0.1, delay: 0.8 },
  { id: 6, Icon: Cloud, color: "text-sky-200", top: "15%", right: "12%", size: 22, speed: 0.08, delay: 1.5 },
  { id: 7, Icon: Flower2, color: "text-rose-300", top: "48%", right: "8%", size: 20, speed: -0.12, delay: 0.3 },
  { id: 8, Icon: Star, color: "text-amber-300", top: "85%", right: "6%", size: 18, speed: 0.1, delay: 1.8 },
  { id: 9, Icon: Sparkles, color: "text-emerald-300", top: "65%", left: "8%", size: 18, speed: -0.08, delay: 2.5 },
];

export default function MobilePlayfulElements() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const scrollY = window.scrollY;
            const children = containerRef.current.children;
            for (let i = 0; i < children.length; i++) {
              const el = children[i];
              if (el.hasAttribute('data-speed')) {
                const speed = parseFloat(el.getAttribute("data-speed"));
                el.style.transform = `translateY(${scrollY * speed}px)`;
              }
            }
          }
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden block xl:hidden"
      aria-hidden="true"
    >
      <div ref={containerRef} className="absolute inset-0 h-screen w-full">
        {/* Soft Glowing Ambient Orbs for Mobile Background */}
        <div className="absolute top-[5%] left-[-8%] w-44 h-44 bg-blue-300/35 rounded-full blur-3xl animate-float" />
        <div className="absolute top-[25%] right-[-8%] w-36 h-36 bg-yellow-300/35 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-[50%] left-[-6%] w-40 h-40 bg-rose-300/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-[75%] right-[-10%] w-48 h-48 bg-pink-300/30 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-[90%] left-[-5%] w-32 h-32 bg-emerald-300/25 rounded-full blur-3xl animate-float" />

        {/* Floating Tiny Icons */}
        {mobileElements.map(({ id, Icon, color, top, left, right, size, speed, delay }) => (
          <div
            key={id}
            data-speed={speed}
            className={`absolute ${color} opacity-50`}
            style={{
              top,
              left,
              right,
              animation: `float-soft 6s ease-in-out infinite alternate`,
              animationDelay: `${delay}s`,
              willChange: "transform"
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
