"use client";

import { useEffect, useRef } from "react";
import { Cloud, Star, Sparkles, Moon, Rocket, Plane, Palette, Sun, Heart, Music } from "lucide-react";

const elements = [
  // Left side
  { id: 1, Icon: Cloud, color: "text-blue-300", top: "10%", left: "3%", size: 48, speed: 0.1, delay: 0 },
  { id: 2, Icon: Star, color: "text-yellow-400", top: "25%", left: "5%", size: 32, speed: 0.25, delay: 1 },
  { id: 3, Icon: Sparkles, color: "text-purple-300", top: "40%", left: "2%", size: 24, speed: -0.15, delay: 2 },
  { id: 4, Icon: Moon, color: "text-indigo-200", top: "60%", left: "6%", size: 40, speed: 0.1, delay: 0.5 },
  { id: 5, Icon: Heart, color: "text-pink-300", top: "80%", left: "4%", size: 36, speed: -0.2, delay: 1.5 },
  
  // Right side
  { id: 6, Icon: Sun, color: "text-yellow-400", top: "15%", right: "4%", size: 54, speed: 0.15, delay: 0.2 },
  { id: 7, Icon: Rocket, color: "text-red-300", top: "35%", right: "6%", size: 42, speed: -0.25, delay: 1.2 },
  { id: 8, Icon: Plane, color: "text-green-300", top: "55%", right: "3%", size: 36, speed: 0.2, delay: 2.1 },
  { id: 9, Icon: Palette, color: "text-orange-300", top: "75%", right: "5%", size: 44, speed: -0.1, delay: 0.8 },
  { id: 10, Icon: Music, color: "text-cyan-300", top: "90%", right: "2%", size: 32, speed: 0.3, delay: 1.7 },
];

export default function FloatingParallaxElements() {
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
              const speed = parseFloat(el.getAttribute("data-speed"));
              el.style.transform = `translateY(${scrollY * speed}px)`;
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden xl:block"
      aria-hidden="true"
    >
      <div ref={containerRef} className="absolute inset-0 h-screen w-full">
        {elements.map(({ id, Icon, color, top, left, right, size, speed, delay }) => (
          <div
            key={id}
            data-speed={speed}
            className={`absolute ${color} opacity-40`}
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
