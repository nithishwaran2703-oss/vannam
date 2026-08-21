"use client";

import { useEffect, useRef } from "react";
import {
  TwinkleStarIcon,
  ButterflyIcon,
  BlossomFlowerIcon,
  RainbowIcon,
  BalloonIcon,
  HappyCloudIcon,
  SparkleStarsGroup,
  CrayonIcon,
  SproutPlantIcon
} from "./ToyDecorations";

const mobileFloatingToys = [
  { id: 1, Component: TwinkleStarIcon, props: { color: "amber" }, top: "6%", left: "3%", sizeClass: "w-4 h-4", animation: "animate-twinkle", delay: "0s" },
  { id: 2, Component: ButterflyIcon, props: { color: "rose" }, top: "18%", right: "3%", sizeClass: "w-5 h-5", animation: "animate-flutter", delay: "0.8s" },
  { id: 3, Component: BalloonIcon, props: { color: "sky" }, top: "32%", left: "2%", sizeClass: "w-5 h-7", animation: "animate-float", delay: "1.2s" },
  { id: 4, Component: BlossomFlowerIcon, props: { color: "amber" }, top: "45%", right: "3%", sizeClass: "w-4.5 h-4.5", animation: "animate-wiggle", delay: "0.4s" },
  { id: 5, Component: RainbowIcon, props: {}, top: "58%", left: "3%", sizeClass: "w-7 h-4", animation: "animate-float-reverse", delay: "1.6s" },
  { id: 6, Component: SproutPlantIcon, props: {}, top: "70%", right: "3%", sizeClass: "w-4.5 h-4.5", animation: "animate-bounce-gentle", delay: "0.2s" },
  { id: 7, Component: SparkleStarsGroup, props: { color: "sky" }, top: "82%", left: "3%", sizeClass: "w-5 h-5", animation: "animate-twinkle", delay: "1.0s" },
  { id: 8, Component: ButterflyIcon, props: { color: "emerald" }, top: "93%", right: "3%", sizeClass: "w-5 h-5", animation: "animate-flutter", delay: "1.5s" },
];

export default function MobilePlayfulElements() {
  const containerRef = useRef(null);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden block lg:hidden"
      aria-hidden="true"
    >
      <div ref={containerRef} className="absolute inset-0 h-full w-full">
        {mobileFloatingToys.map(({ id, Component, props, top, left, right, sizeClass, animation, delay }) => (
          <div
            key={id}
            className={`absolute ${sizeClass} ${animation} opacity-80 drop-shadow-xs`}
            style={{
              top,
              left,
              right,
              animationDelay: delay,
              willChange: "transform"
            }}
          >
            <Component {...props} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
