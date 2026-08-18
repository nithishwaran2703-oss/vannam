import React from "react";

// Teddy Bear Illustration
export function TeddyBearIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Ears */}
      <circle cx="16" cy="18" r="9" fill="#F59E0B" />
      <circle cx="16" cy="18" r="5" fill="#FDE68A" />
      <circle cx="48" cy="18" r="9" fill="#F59E0B" />
      <circle cx="48" cy="18" r="5" fill="#FDE68A" />
      {/* Head */}
      <circle cx="32" cy="27" r="18" fill="#F59E0B" />
      {/* Muzzle */}
      <ellipse cx="32" cy="31" rx="9" ry="7" fill="#FEF3C7" />
      {/* Nose */}
      <ellipse cx="32" cy="28" rx="3.5" ry="2.5" fill="#78350F" />
      {/* Mouth */}
      <path d="M32 30.5V34M29 33C29.5 35 34.5 35 35 33" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="25" cy="23" r="2.5" fill="#1E293B" />
      <circle cx="26" cy="22" r="0.8" fill="#FFFFFF" />
      <circle cx="39" cy="23" r="2.5" fill="#1E293B" />
      <circle cx="40" cy="22" r="0.8" fill="#FFFFFF" />
      {/* Cheeks */}
      <ellipse cx="21" cy="28" rx="2.5" ry="1.5" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="43" cy="28" rx="2.5" ry="1.5" fill="#F43F5E" opacity="0.6" />
      {/* Body */}
      <path d="M18 42C18 36 46 36 46 42C48 48 48 56 46 60C44 63 20 63 18 60C16 56 16 48 18 42Z" fill="#F59E0B" />
      {/* Tummy */}
      <ellipse cx="32" cy="49" rx="10" ry="9" fill="#FEF3C7" />
      {/* Paws */}
      <circle cx="14" cy="42" r="5.5" fill="#F59E0B" />
      <circle cx="14" cy="42" r="3" fill="#FDE68A" />
      <circle cx="50" cy="42" r="5.5" fill="#F59E0B" />
      <circle cx="50" cy="42" r="3" fill="#FDE68A" />
      {/* Feet */}
      <circle cx="20" cy="58" r="6" fill="#F59E0B" />
      <circle cx="20" cy="58" r="3.5" fill="#FDE68A" />
      <circle cx="44" cy="58" r="6" fill="#F59E0B" />
      <circle cx="44" cy="58" r="3.5" fill="#FDE68A" />
      {/* Bowtie */}
      <path d="M28 37L36 41V37L28 41V37Z" fill="#EF4444" />
      <circle cx="32" cy="39" r="2" fill="#FDE047" />
    </svg>
  );
}

// Alphabet / Building Blocks (A B C)
export function AlphabetBlock({ letter = "A", color = "amber", className = "w-6 h-6", ...props }) {
  const colorMap = {
    amber: { face: "#FBBF24", top: "#FDE68A", side: "#F59E0B", text: "#78350F" },
    sky: { face: "#38BDF8", top: "#BAE6FD", side: "#0284C7", text: "#0C4A6E" },
    emerald: { face: "#34D399", top: "#A7F3D0", side: "#059669", text: "#064E3B" },
    rose: { face: "#FB7185", top: "#FECDD3", side: "#E11D48", text: "#881337" },
    purple: { face: "#C084FC", top: "#E9D5FF", side: "#9333EA", text: "#581C87" },
  };
  const theme = colorMap[color] || colorMap.amber;

  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Isometric 3D Block */}
      {/* Top Face */}
      <polygon points="32,6 54,18 32,30 10,18" fill={theme.top} />
      {/* Left Face */}
      <polygon points="10,18 32,30 32,54 10,42" fill={theme.face} />
      {/* Right Face */}
      <polygon points="32,30 54,18 54,42 32,54" fill={theme.side} />
      {/* Rounded border highlights */}
      <path d="M32 6L54 18L32 30L10 18Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
      <path d="M10 18V42L32 54V30L10 18Z" stroke="white" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
      {/* Letter text on Left Face */}
      <text
        x="20"
        y="42"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="900"
        fill={theme.text}
        textAnchor="middle"
        transform="skewY(18) scale(0.9, 1)"
      >
        {letter}
      </text>
    </svg>
  );
}

// Toy Car Illustration
export function ToyCarIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Car Roof & Windows */}
      <path d="M18 28C20 20 24 16 34 16H42C48 16 52 22 54 28H18Z" fill="#38BDF8" />
      <path d="M22 26C24 21 27 19 33 19V26H22Z" fill="#E0F2FE" />
      <path d="M36 19H42C46 19 48 22 50 26H36V19Z" fill="#E0F2FE" />
      {/* Main Body */}
      <rect x="6" y="27" width="52" height="18" rx="8" fill="#F43F5E" />
      {/* Headlight */}
      <circle cx="54" cy="34" r="3" fill="#FDE047" />
      <rect x="6" y="32" width="3" height="4" rx="1.5" fill="#FB923C" />
      {/* Wheel Wells & Wheels */}
      <circle cx="18" cy="45" r="9" fill="#1E293B" />
      <circle cx="18" cy="45" r="5" fill="#E2E8F0" />
      <circle cx="18" cy="45" r="2" fill="#F43F5E" />
      <circle cx="46" cy="45" r="9" fill="#1E293B" />
      <circle cx="46" cy="45" r="5" fill="#E2E8F0" />
      <circle cx="46" cy="45" r="2" fill="#F43F5E" />
      {/* Side stripe */}
      <path d="M12 36H52" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Rainbow Illustration
export function RainbowIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Rainbow Arcs */}
      <path d="M6 34C6 19.64 17.64 8 32 8C46.36 8 58 19.64 58 34" stroke="#F43F5E" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M11 34C11 22.4 20.4 13 32 13C43.6 13 53 22.4 53 34" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M16 34C16 25.16 23.16 18 32 18C40.84 18 48 25.16 48 34" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M21 34C21 27.92 25.92 23 32 23C38.08 23 43 27.92 43 34" stroke="#00A8E8" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M26 34C26 30.68 28.68 28 32 28C35.32 28 38 30.68 38 34" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
      {/* Clouds at ends */}
      <circle cx="8" cy="32" r="5" fill="#FFFFFF" />
      <circle cx="12" cy="30" r="4" fill="#FFFFFF" />
      <circle cx="56" cy="32" r="5" fill="#FFFFFF" />
      <circle cx="52" cy="30" r="4" fill="#FFFFFF" />
    </svg>
  );
}

// Playful Cloud
export function HappyCloudIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M18 36C11.37 36 6 30.63 6 24C6 17.8 10.7 12.7 16.8 12.1C18.6 5.8 24.3 1 31 1C39.3 1 46.2 7.1 47.7 15.1C52.4 15.8 56 19.9 56 24.8C56 31 51 36 44.8 36H18Z"
        fill="#E0F2FE"
        stroke="#38BDF8"
        strokeWidth="2"
      />
      {/* Cute face */}
      <circle cx="24" cy="22" r="2" fill="#0369A1" />
      <circle cx="36" cy="22" r="2" fill="#0369A1" />
      <path d="M28 26C29 28 31 28 32 26" stroke="#0369A1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cheeks */}
      <ellipse cx="20" cy="24" rx="2" ry="1.2" fill="#FDA4AF" />
      <ellipse cx="40" cy="24" rx="2" ry="1.2" fill="#FDA4AF" />
    </svg>
  );
}

// Crayon Pack / Single Crayon
export function CrayonIcon({ color = "rose", className = "w-6 h-6", ...props }) {
  const colorMap = {
    rose: { body: "#F43F5E", tip: "#E11D48", band: "#FFE4E6", label: "#881337" },
    amber: { body: "#F59E0B", tip: "#D97706", band: "#FEF3C7", label: "#78350F" },
    emerald: { body: "#10B981", tip: "#059669", band: "#D1FAE5", label: "#064E3B" },
    sky: { body: "#00A8E8", tip: "#0284C7", band: "#E0F2FE", label: "#0C4A6E" },
    purple: { body: "#8B5CF6", tip: "#7C3AED", band: "#F3E8FF", label: "#4C1D95" },
  };
  const theme = colorMap[color] || colorMap.rose;

  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <g transform="rotate(45 32 32)">
        {/* Crayon Tip */}
        <polygon points="32,4 27,16 37,16" fill={theme.tip} />
        {/* Main Body */}
        <rect x="27" y="16" width="10" height="42" rx="2" fill={theme.body} />
        {/* Wrapper */}
        <rect x="27" y="24" width="10" height="26" fill={theme.band} />
        {/* Stripes */}
        <line x1="27" y1="28" x2="37" y2="28" stroke={theme.body} strokeWidth="1.5" />
        <line x1="27" y1="46" x2="37" y2="46" stroke={theme.body} strokeWidth="1.5" />
        <circle cx="32" cy="37" r="2" fill={theme.label} />
        {/* Base */}
        <rect x="27" y="55" width="10" height="3" rx="1" fill={theme.tip} />
      </g>
    </svg>
  );
}

// Balloon Cluster / Single Balloon
export function BalloonIcon({ color = "sky", className = "w-6 h-6", ...props }) {
  const colorMap = {
    rose: "#F43F5E",
    amber: "#F59E0B",
    emerald: "#10B981",
    sky: "#00A8E8",
    purple: "#8B5CF6",
  };
  const fill = colorMap[color] || colorMap.sky;

  return (
    <svg viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Balloon string */}
      <path d="M24 45C22 51 26 56 24 62" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      {/* Knot */}
      <polygon points="21,45 27,45 24,42" fill={fill} />
      {/* Balloon Egg Shape */}
      <path
        d="M24 42C12 42 6 32 6 22C6 10 14 4 24 4C34 4 42 10 42 22C42 32 36 42 24 42Z"
        fill={fill}
      />
      {/* Highlight reflection */}
      <path
        d="M15 12C18 8 23 8 26 9"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// Kite Illustration
export function KiteIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Kite Diamond Quarters */}
      <polygon points="32,4 52,24 32,24" fill="#F43F5E" />
      <polygon points="32,4 12,24 32,24" fill="#F59E0B" />
      <polygon points="12,24 32,50 32,24" fill="#00A8E8" />
      <polygon points="52,24 32,50 32,24" fill="#10B981" />
      {/* Cross Spines */}
      <line x1="32" y1="4" x2="32" y2="50" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="white" strokeWidth="1.5" />
      {/* Tail line */}
      <path d="M32 50C28 54 36 57 32 62" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      {/* Bows on tail */}
      <circle cx="30" cy="54" r="2" fill="#F43F5E" />
      <circle cx="34" cy="58" r="2" fill="#FBBF24" />
    </svg>
  );
}

// Colorful Twinkling Star
export function TwinkleStarIcon({ color = "amber", className = "w-5 h-5", ...props }) {
  const colorMap = {
    amber: "#FBBF24",
    rose: "#FB7185",
    sky: "#38BDF8",
    emerald: "#34D399",
    purple: "#C084FC",
  };
  const fill = colorMap[color] || colorMap.amber;

  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M16 2C16 9.73 22.27 16 30 16C22.27 16 16 22.27 16 30C16 22.27 9.73 16 2 16C9.73 16 16 9.73 16 2Z"
        fill={fill}
      />
      <circle cx="16" cy="16" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// Puzzle Piece
export function PuzzlePieceIcon({ color = "emerald", className = "w-6 h-6", ...props }) {
  const colorMap = {
    emerald: "#10B981",
    amber: "#F59E0B",
    sky: "#00A8E8",
    rose: "#F43F5E",
    purple: "#8B5CF6",
  };
  const fill = colorMap[color] || colorMap.emerald;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M10 10H19C19 6 22 4 24 4C26 4 29 6 29 10H38V19C42 19 44 22 44 24C44 26 42 29 38 29V38H29C29 34 26 32 24 32C22 32 19 34 19 38H10V29C14 29 16 26 16 24C16 22 14 19 10 19V10Z"
        fill={fill}
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

// Storybook Icon
export function StorybookIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Book cover base */}
      <path d="M6 38C12 36 20 36 24 38C28 36 36 36 42 38V10C36 8 28 8 24 10C20 8 12 8 6 10V38Z" fill="#8B5CF6" />
      {/* Pages */}
      <path d="M8 36C14 34 20 34 24 36C28 34 34 34 40 36V8C34 6 28 6 24 8C20 6 14 6 8 8V36Z" fill="#FFFDF8" />
      {/* Bookmark */}
      <path d="M22 6V20L25 18L28 20V6H22Z" fill="#F43F5E" />
      {/* Spine */}
      <line x1="24" y1="8" x2="24" y2="36" stroke="#C4B5FD" strokeWidth="1.5" />
    </svg>
  );
}

// Spinning Pinwheel Toy
export function PinwheelToy({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Stick */}
      <line x1="32" y1="32" x2="32" y2="60" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      {/* 4 Blades */}
      <path d="M32 32L32 10C24 10 20 18 32 32Z" fill="#F43F5E" />
      <path d="M32 32L54 32C54 24 46 20 32 32Z" fill="#F59E0B" />
      <path d="M32 32L32 54C40 54 44 46 32 32Z" fill="#10B981" />
      <path d="M32 32L10 32C10 40 18 44 32 32Z" fill="#00A8E8" />
      {/* Center pin */}
      <circle cx="32" cy="32" r="3.5" fill="#FEF08A" stroke="#78350F" strokeWidth="1.5" />
    </svg>
  );
}
