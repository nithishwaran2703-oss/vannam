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

// Alphabet / Building Blocks (A B C / 1 2 3)
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
      <polygon points="32,6 54,18 32,30 10,18" fill={theme.top} />
      <polygon points="10,18 32,30 32,54 10,42" fill={theme.face} />
      <polygon points="32,30 54,18 54,42 32,54" fill={theme.side} />
      <path d="M32 6L54 18L32 30L10 18Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.7" />
      <path d="M10 18V42L32 54V30L10 18Z" stroke="white" strokeWidth="1" strokeLinejoin="round" opacity="0.4" />
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
      <path d="M18 28C20 20 24 16 34 16H42C48 16 52 22 54 28H18Z" fill="#38BDF8" />
      <path d="M22 26C24 21 27 19 33 19V26H22Z" fill="#E0F2FE" />
      <path d="M36 19H42C46 19 48 22 50 26H36V19Z" fill="#E0F2FE" />
      <rect x="6" y="27" width="52" height="18" rx="8" fill="#F43F5E" />
      <circle cx="54" cy="34" r="3" fill="#FDE047" />
      <rect x="6" y="32" width="3" height="4" rx="1.5" fill="#FB923C" />
      <circle cx="18" cy="45" r="9" fill="#1E293B" />
      <circle cx="18" cy="45" r="5" fill="#E2E8F0" />
      <circle cx="18" cy="45" r="2" fill="#F43F5E" />
      <circle cx="46" cy="45" r="9" fill="#1E293B" />
      <circle cx="46" cy="45" r="5" fill="#E2E8F0" />
      <circle cx="46" cy="45" r="2" fill="#F43F5E" />
      <path d="M12 36H52" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Rainbow Illustration with Soft Cloud Bases
export function RainbowIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M6 34C6 19.64 17.64 8 32 8C46.36 8 58 19.64 58 34" stroke="#F43F5E" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M11 34C11 22.4 20.4 13 32 13C43.6 13 53 22.4 53 34" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M16 34C16 25.16 23.16 18 32 18C40.84 18 48 25.16 48 34" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M21 34C21 27.92 25.92 23 32 23C38.08 23 43 27.92 43 34" stroke="#00A8E8" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M26 34C26 30.68 28.68 28 32 28C35.32 28 38 30.68 38 34" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="8" cy="32" r="5" fill="#FFFFFF" stroke="#CBD8F6" strokeWidth="1" />
      <circle cx="13" cy="30" r="4" fill="#FFFFFF" />
      <circle cx="56" cy="32" r="5" fill="#FFFFFF" stroke="#CBD8F6" strokeWidth="1" />
      <circle cx="51" cy="30" r="4" fill="#FFFFFF" />
    </svg>
  );
}

// Cheerful Smiling Sun
export function SmilingSunIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Sun Rays */}
      <g stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" className="animate-[spin_20s_linear_infinite] origin-center">
        <line x1="32" y1="4" x2="32" y2="10" />
        <line x1="32" y1="54" x2="32" y2="60" />
        <line x1="4" y1="32" x2="10" y2="32" />
        <line x1="54" y1="32" x2="60" y2="32" />
        <line x1="12.2" y1="12.2" x2="16.5" y2="16.5" />
        <line x1="47.5" y1="47.5" x2="51.8" y2="51.8" />
        <line x1="12.2" y1="51.8" x2="16.5" y2="47.5" />
        <line x1="47.5" y1="16.5" x2="51.8" y2="12.2" />
      </g>
      {/* Sun Body */}
      <circle cx="32" cy="32" r="18" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2.5" />
      {/* Cute Face */}
      <circle cx="26" cy="29" r="2.2" fill="#78350F" />
      <circle cx="38" cy="29" r="2.2" fill="#78350F" />
      <circle cx="27" cy="28" r="0.8" fill="#FFFFFF" />
      <circle cx="39" cy="28" r="0.8" fill="#FFFFFF" />
      {/* Rosy Cheeks */}
      <ellipse cx="23" cy="33" rx="2.5" ry="1.5" fill="#F43F5E" opacity="0.6" />
      <ellipse cx="41" cy="33" rx="2.5" ry="1.5" fill="#F43F5E" opacity="0.6" />
      {/* Smile */}
      <path d="M28 35C29.5 38 34.5 38 36 35" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Playful Fluffy Cloud
export function HappyCloudIcon({ className = "w-6 h-6", withFace = true, ...props }) {
  return (
    <svg viewBox="0 0 64 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M18 36C11.37 36 6 30.63 6 24C6 17.8 10.7 12.7 16.8 12.1C18.6 5.8 24.3 1 31 1C39.3 1 46.2 7.1 47.7 15.1C52.4 15.8 56 19.9 56 24.8C56 31 51 36 44.8 36H18Z"
        fill="#FFFFFF"
        stroke="#BAE6FD"
        strokeWidth="2"
      />
      {withFace && (
        <>
          <circle cx="24" cy="22" r="2" fill="#0369A1" />
          <circle cx="36" cy="22" r="2" fill="#0369A1" />
          <path d="M28 26C29 28 31 28 32 26" stroke="#0369A1" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="20" cy="24" rx="2" ry="1.2" fill="#FDA4AF" />
          <ellipse cx="40" cy="24" rx="2" ry="1.2" fill="#FDA4AF" />
        </>
      )}
    </svg>
  );
}

// Delicate Colorful Butterfly
export function ButterflyIcon({ color = "sky", className = "w-6 h-6", ...props }) {
  const colorMap = {
    sky: { top: "#38BDF8", bottom: "#0284C7", spot: "#E0F2FE" },
    amber: { top: "#FBBF24", bottom: "#F59E0B", spot: "#FEF3C7" },
    rose: { top: "#FB7185", bottom: "#E11D48", spot: "#FFE4E6" },
    purple: { top: "#C084FC", bottom: "#9333EA", spot: "#F3E8FF" },
    emerald: { top: "#34D399", bottom: "#059669", spot: "#D1FAE5" },
  };
  const theme = colorMap[color] || colorMap.sky;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M22 14C20 8 16 8 15 10" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 14C28 8 32 8 33 10" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 20C18 8 6 12 10 24C12 28 20 25 24 24Z" fill={theme.top} />
      <path d="M24 20C30 8 42 12 38 24C36 28 28 25 24 24Z" fill={theme.top} />
      <path d="M24 24C18 28 10 34 16 40C20 44 24 32 24 26Z" fill={theme.bottom} />
      <path d="M24 24C30 28 38 34 32 40C28 44 24 32 24 26Z" fill={theme.bottom} />
      <circle cx="16" cy="19" r="2.5" fill={theme.spot} />
      <circle cx="32" cy="19" r="2.5" fill={theme.spot} />
      <circle cx="19" cy="33" r="1.8" fill={theme.spot} />
      <circle cx="29" cy="33" r="1.8" fill={theme.spot} />
      <ellipse cx="24" cy="24" rx="2.5" ry="9" fill="#0F2963" />
      <circle cx="24" cy="15" r="2.5" fill="#0F2963" />
    </svg>
  );
}

// Cheerful Blossom Flower
export function BlossomFlowerIcon({ color = "rose", className = "w-6 h-6", ...props }) {
  const colorMap = {
    rose: { petal: "#FB7185", center: "#FBBF24" },
    amber: { petal: "#FBBF24", center: "#F43F5E" },
    sky: { petal: "#38BDF8", center: "#FBBF24" },
    purple: { petal: "#C084FC", center: "#FDE047" },
  };
  const theme = colorMap[color] || colorMap.rose;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <circle cx="24" cy="12" r="7" fill={theme.petal} />
      <circle cx="36" cy="24" r="7" fill={theme.petal} />
      <circle cx="24" cy="36" r="7" fill={theme.petal} />
      <circle cx="12" cy="24" r="7" fill={theme.petal} />
      <circle cx="15" cy="15" r="7" fill={theme.petal} opacity="0.9" />
      <circle cx="33" cy="15" r="7" fill={theme.petal} opacity="0.9" />
      <circle cx="33" cy="33" r="7" fill={theme.petal} opacity="0.9" />
      <circle cx="15" cy="33" r="7" fill={theme.petal} opacity="0.9" />
      <circle cx="24" cy="24" r="7.5" fill={theme.center} stroke="#FFFFFF" strokeWidth="1.5" />
    </svg>
  );
}

// Green Sprout / Seedling for Growth & Nature
export function SproutPlantIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M12 42C18 39 30 39 36 42" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 40V22" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 26C16 26 10 18 12 12C18 10 24 18 24 26Z" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      <path d="M24 22C32 22 38 14 36 8C30 6 24 14 24 22Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
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
        <polygon points="32,4 27,16 37,16" fill={theme.tip} />
        <rect x="27" y="16" width="10" height="42" rx="2" fill={theme.body} />
        <rect x="27" y="24" width="10" height="26" fill={theme.band} />
        <line x1="27" y1="28" x2="37" y2="28" stroke={theme.body} strokeWidth="1.5" />
        <line x1="27" y1="46" x2="37" y2="46" stroke={theme.body} strokeWidth="1.5" />
        <circle cx="32" cy="37" r="2" fill={theme.label} />
        <rect x="27" y="55" width="10" height="3" rx="1" fill={theme.tip} />
      </g>
    </svg>
  );
}

// Single Balloon
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
      <path d="M24 45C22 51 26 56 24 62" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <polygon points="21,45 27,45 24,42" fill={fill} />
      <path
        d="M24 42C12 42 6 32 6 22C6 10 14 4 24 4C34 4 42 10 42 22C42 32 36 42 24 42Z"
        fill={fill}
      />
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

// Floating Balloon Cluster (Multi-Color)
export function FloatingBalloonsGroup({ className = "w-16 h-20", ...props }) {
  return (
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M25 45C35 60 40 75 40 95" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M55 45C45 60 40 75 40 95" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M40 38C40 55 40 75 40 95" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="25" cy="30" rx="16" ry="20" fill="#FB7185" />
      <path d="M18 20C20 16 24 16 26 17" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="55" cy="30" rx="16" ry="20" fill="#38BDF8" />
      <path d="M48 20C50 16 54 16 56 17" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="40" cy="22" rx="17" ry="22" fill="#FBBF24" />
      <path d="M33 12C35 8 39 8 41 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

// Kite Illustration
export function KiteIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <polygon points="32,4 52,24 32,24" fill="#F43F5E" />
      <polygon points="32,4 12,24 32,24" fill="#F59E0B" />
      <polygon points="12,24 32,50 32,24" fill="#00A8E8" />
      <polygon points="52,24 32,50 32,24" fill="#10B981" />
      <line x1="32" y1="4" x2="32" y2="50" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="white" strokeWidth="1.5" />
      <path d="M32 50C28 54 36 57 32 62" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
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

// Sparkle Stars Group / Twinkles
export function SparkleStarsGroup({ className = "w-6 h-6", color = "amber", ...props }) {
  const colorMap = {
    amber: { main: "#FBBF24", secondary: "#F59E0B", accent: "#F43F5E" },
    sky: { main: "#38BDF8", secondary: "#00A8E8", accent: "#8B5CF6" },
    rose: { main: "#FB7185", secondary: "#F43F5E", accent: "#FBBF24" },
    emerald: { main: "#34D399", secondary: "#10B981", accent: "#38BDF8" },
  };
  const theme = colorMap[color] || colorMap.amber;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M20 2C20 11.9 28.1 20 38 20C28.1 20 20 28.1 20 38C20 28.1 11.9 20 2 20C11.9 20 20 11.9 20 2Z"
        fill={theme.main}
      />
      <circle cx="20" cy="20" r="3.5" fill="#FFFFFF" opacity="0.9" />
      <path
        d="M38 28C38 32.4 41.6 36 46 36C41.6 36 38 39.6 38 44C38 39.6 34.4 36 30 36C34.4 36 38 32.4 38 28Z"
        fill={theme.secondary}
      />
      <circle cx="10" cy="38" r="2" fill={theme.accent} />
      <circle cx="36" cy="8" r="1.8" fill={theme.accent} />
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
      <path d="M6 38C12 36 20 36 24 38C28 36 36 36 42 38V10C36 8 28 8 24 10C20 8 12 8 6 10V38Z" fill="#8B5CF6" />
      <path d="M8 36C14 34 20 34 24 36C28 34 34 34 40 36V8C34 6 28 6 24 8C20 6 14 6 8 8V36Z" fill="#FFFDF8" />
      <path d="M22 6V20L25 18L28 20V6H22Z" fill="#F43F5E" />
      <line x1="24" y1="8" x2="24" y2="36" stroke="#C4B5FD" strokeWidth="1.5" />
    </svg>
  );
}

// Playful School Castle / Building
export function SchoolCastleIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <rect x="14" y="28" width="36" height="30" rx="3" fill="#F0F4FC" stroke="#0F2963" strokeWidth="2.5" />
      <polygon points="32,6 18,22 46,22" fill="#F43F5E" stroke="#0F2963" strokeWidth="2" />
      <circle cx="32" cy="34" r="6" fill="#FBBF24" stroke="#0F2963" strokeWidth="1.5" />
      <path d="M32 31V34H35" stroke="#0F2963" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 58V46C26 42.7 28.7 40 32 40C35.3 40 38 42.7 38 46V58" fill="#F59E0B" stroke="#0F2963" strokeWidth="2" />
      <rect x="6" y="32" width="10" height="26" rx="2" fill="#BAE6FD" stroke="#0F2963" strokeWidth="2" />
      <polygon points="11,20 4,32 18,32" fill="#00A8E8" stroke="#0F2963" strokeWidth="1.5" />
      <circle cx="11" cy="40" r="2" fill="#FFFFFF" />
      <rect x="48" y="32" width="10" height="26" rx="2" fill="#A7F3D0" stroke="#0F2963" strokeWidth="2" />
      <polygon points="53,20 46,32 60,32" fill="#10B981" stroke="#0F2963" strokeWidth="1.5" />
      <circle cx="53" cy="40" r="2" fill="#FFFFFF" />
      <path d="M32 6V1M32 1L40 3.5L32 6" stroke="#0F2963" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#FDE047" />
    </svg>
  );
}

// Paint Splatter / Art Element
export function PaintSplatterIcon({ color = "rose", className = "w-6 h-6", ...props }) {
  const colorMap = {
    rose: "#FB7185",
    amber: "#FBBF24",
    cyan: "#38BDF8",
    emerald: "#34D399",
    purple: "#C084FC",
  };
  const fill = colorMap[color] || colorMap.rose;

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path
        d="M24 8C20 6 15 12 18 17C14 18 10 24 14 29C8 33 13 40 20 37C22 42 30 42 32 38C38 41 42 33 38 27C44 22 39 14 34 16C33 10 27 9 24 8Z"
        fill={fill}
      />
      <circle cx="8" cy="18" r="2" fill={fill} />
      <circle cx="41" cy="14" r="2.5" fill={fill} />
      <circle cx="39" cy="40" r="1.8" fill={fill} />
      <circle cx="12" cy="42" r="1.5" fill={fill} />
    </svg>
  );
}

// Whimsical Music Notes
export function MusicNotesCluster({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <ellipse cx="14" cy="36" rx="5" ry="3.5" fill="#8B5CF6" transform="rotate(-15 14 36)" />
      <line x1="18" y1="34" x2="18" y2="12" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="34" cy="28" rx="5" ry="3.5" fill="#F43F5E" transform="rotate(-15 34 28)" />
      <line x1="38" y1="26" x2="38" y2="6" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 12C26 8 30 10 38 6" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="28" cy="20" r="2" fill="#FBBF24" />
    </svg>
  );
}

// Paper Plane
export function PaperPlaneIcon({ className = "w-6 h-6", ...props }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <path d="M6 22L42 6L28 42L22 28L6 22Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
      <path d="M42 6L22 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 36C8 38 4 36 6 42" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
    </svg>
  );
}

// Organic Playful Wave Divider between sections (Crisp & clearly visible on Mobile & Desktop)
export function PlayfulWaveDivider({ variant = "cloud", className = "w-full", fillColor = "#FFFDF8", strokeColor = "#CBD8F6", flip = false }) {
  if (variant === "wave") {
    return (
      <div className={`overflow-hidden leading-none pointer-events-none ${flip ? "rotate-180" : ""} ${className}`}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 xs:h-10 sm:h-12 md:h-16" preserveAspectRatio="none">
          {/* Secondary Ripple Under-layer */}
          <path
            d="M0,45 C280,75 520,15 800,45 C1080,75 1320,15 1440,45 L1440,80 L0,80 Z"
            fill="#E8EEFB"
            opacity="0.6"
          />
          {/* Main Wave Solid Fill */}
          <path
            d="M0,36 C240,68 480,4 720,36 C960,68 1200,4 1440,36 L1440,80 L0,80 Z"
            fill={fillColor}
          />
          {/* High-Visibility Crisp Wave Contour Stroke */}
          <path
            d="M0,36 C240,68 480,4 720,36 C960,68 1200,4 1440,36"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </div>
    );
  }

  // Default: Scalloped / Cloud-shaped playful wave with clearly visible curves on mobile
  return (
    <div className={`overflow-hidden leading-none pointer-events-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg viewBox="0 0 1200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 xs:h-10 sm:h-12 md:h-16" preserveAspectRatio="none">
        {/* Soft Secondary Depth Layer */}
        <path
          d="M0,32 C60,12 120,12 180,32 C240,52 300,52 360,32 C420,12 480,12 540,32 C600,52 660,52 720,32 C780,12 840,12 900,32 C960,52 1020,52 1080,32 C1140,12 1200,12 1200,32 L1200,60 L0,60 Z"
          fill="#E8EEFB"
          opacity="0.6"
        />
        {/* Main Scalloped Wave Solid Fill */}
        <path
          d="M0,26 C60,6 120,6 180,26 C240,46 300,46 360,26 C420,6 480,6 540,26 C600,46 660,46 720,26 C780,6 840,6 900,26 C960,46 1020,46 1080,26 C1140,6 1200,6 1200,26 L1200,60 L0,60 Z"
          fill={fillColor}
        />
        {/* Bold, Crisp Wave Contour Line (3px stroke for high mobile clarity) */}
        <path
          d="M0,26 C60,6 120,6 180,26 C240,46 300,46 360,26 C420,6 480,6 540,26 C600,46 660,46 720,26 C780,6 840,6 900,26 C960,46 1020,46 1080,26 C1140,6 1200,6 1200,26"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}

// Mobile Playful Scene Connector Badge
export function MobileSceneBadge({ icon: Icon, label, color = "amber" }) {
  const colorMap = {
    amber: "bg-amber-50 text-[#C2410C] border-amber-200",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    sky: "bg-sky-50 text-[#0284C7] border-sky-200",
    rose: "bg-rose-50 text-[#BE123C] border-rose-200",
    purple: "bg-purple-50 text-[#6D28D9] border-purple-200",
  };
  const theme = colorMap[color] || colorMap.amber;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-black uppercase tracking-wider border shadow-2xs ${theme}`}>
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{label}</span>
    </div>
  );
}

// Playful Spinning Pinwheel Toy
export function PinwheelToy({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Stick */}
      <line x1="32" y1="32" x2="32" y2="60" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      {/* Pinwheel Blades */}
      <g className="origin-center animate-spin-slow">
        {/* Top Blade - Cyan */}
        <path d="M32 32L32 10C38 10 44 16 44 22L32 32Z" fill="#00A8E8" />
        {/* Right Blade - Yellow */}
        <path d="M32 32L54 32C54 38 48 44 42 44L32 32Z" fill="#F59E0B" />
        {/* Bottom Blade - Rose */}
        <path d="M32 32L32 54C26 54 20 48 20 42L32 32Z" fill="#F43F5E" />
        {/* Left Blade - Green */}
        <path d="M32 32L10 32C10 26 16 20 22 20L32 32Z" fill="#10B981" />
        {/* Center Pin */}
        <circle cx="32" cy="32" r="3.5" fill="#FFFFFF" stroke="#0F2963" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// Artist Paint Palette Icon
export function ArtPaletteIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Palette Wooden Base */}
      <path
        d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C36.4 56 40 52.4 40 48C40 46 39.2 44.2 37.8 42.8C36.5 41.5 35.6 39.7 35.6 37.6C35.6 33.2 39.2 29.6 43.6 29.6H48C52.4 29.6 56 26 56 21.6C56 14.1 45.3 8 32 8Z"
        fill="#FDE68A"
        stroke="#D97706"
        strokeWidth="2.5"
      />
      {/* Thumb Hole */}
      <ellipse cx="44" cy="46" rx="4" ry="5" fill="#FFFDF8" stroke="#D97706" strokeWidth="2" />
      {/* Paint Color Spots */}
      <circle cx="20" cy="22" r="4.5" fill="#F43F5E" />
      <circle cx="30" cy="18" r="4.5" fill="#F59E0B" />
      <circle cx="42" cy="20" r="4.5" fill="#00A8E8" />
      <circle cx="22" cy="36" r="4.5" fill="#10B981" />
      <circle cx="28" cy="46" r="4.5" fill="#8B5CF6" />
    </svg>
  );
}

// Purposeful Storybook Scene Transition Bridge (Between Hero & Sections)
export function StorybookTransitionBridge({ 
  quote = "Where little minds love to explore",
  badge = "Joyful Learning",
  icon: Icon = SparkleStarsGroup,
  className = "" 
}) {
  return (
    <div className={`relative py-4 sm:py-6 overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Soft Background Cloud Curves */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Floating Mini Elements */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-2">
          <div className="animate-drift">
            <HappyCloudIcon className="w-8 h-5 sm:w-12 sm:h-7 opacity-80" />
          </div>
          <div className="animate-float">
            <RainbowIcon className="w-10 h-6 sm:w-14 sm:h-9 drop-shadow-2xs" />
          </div>
          <div className="animate-flutter">
            <ButterflyIcon color="rose" className="w-5 h-5 sm:w-7 sm:h-7 opacity-85" />
          </div>
        </div>

        {/* Storybook Quote Pill */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 via-white to-sky-50 px-3.5 sm:px-5 py-1.5 rounded-full border border-amber-200/80 shadow-xs pointer-events-auto">
          <span className="text-[11px] sm:text-xs font-black text-[#0F2963] tracking-wide">
            &ldquo;{quote}&rdquo;
          </span>
          <span className="text-xs">✨</span>
        </div>

        {/* Botanical Sprouts Accent */}
        <div className="flex items-center gap-4 mt-2 opacity-70">
          <SproutPlantIcon className="w-4 h-4 text-vannam-green" />
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <BlossomFlowerIcon color="amber" className="w-4 h-4" />
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
          <SproutPlantIcon className="w-4 h-4 text-vannam-green" />
        </div>

      </div>
    </div>
  );
}

// Scene Element Group A: Nature (Cloud + Butterfly + Sprout + Blossom)
export function NatureSceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <HappyCloudIcon className="w-7 h-5 animate-drift opacity-75" />
      <ButterflyIcon color="emerald" className="w-5 h-5 animate-flutter" />
      <BlossomFlowerIcon color="rose" className="w-5 h-5 animate-wiggle" />
      <SproutPlantIcon className="w-5 h-5 opacity-80" />
    </div>
  );
}

// Scene Element Group B: Creativity (Art Palette + Crayon + Star)
export function CreativitySceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <ArtPaletteIcon className="w-6 h-6 animate-float" />
      <CrayonIcon color="rose" className="w-6 h-6 animate-wiggle" />
      <TwinkleStarIcon color="amber" className="w-4 h-4 animate-twinkle" />
    </div>
  );
}

// Scene Element Group C: Learning (Storybook + Puzzle + Alphabet Block)
export function LearningSceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <StorybookIcon className="w-6 h-6 animate-float" />
      <PuzzlePieceIcon color="emerald" className="w-6 h-6 animate-float-reverse" />
      <AlphabetBlock letter="A" color="amber" className="w-5 h-5 animate-wiggle" />
    </div>
  );
}

// Scene Element Group D: Play (Balloon + Teddy Bear + Star)
export function PlaySceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <BalloonIcon color="sky" className="w-6 h-8 animate-float" />
      <TeddyBearIcon className="w-6 h-6 animate-wiggle" />
      <TwinkleStarIcon color="amber" className="w-4 h-4 animate-twinkle" />
    </div>
  );
}

// Scene Element Group E: STEM & Science (Rocket + Microscope / Flask + Gear / Star)
export function StemSceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <span className="text-base sm:text-lg animate-float">🚀</span>
      <span className="text-sm sm:text-base animate-wiggle">🔬</span>
      <span className="text-xs sm:text-sm animate-twinkle">✨</span>
    </div>
  );
}

// Scene Element Group F: Safety & Trust (Shield + Heart + Care)
export function SafetySceneGroup({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 pointer-events-none select-none ${className}`}>
      <span className="text-base sm:text-lg animate-pulse-subtle">🛡️</span>
      <span className="text-sm sm:text-base text-rose-500 animate-bounce-gentle">❤️</span>
      <span className="text-xs sm:text-sm animate-twinkle">⭐</span>
    </div>
  );
}

// COMPACT MOBILE SECTION BRIDGES

// 1. Cloud & Star Bridge (Gentle Sky Transition)
export function CloudBridge({ label = "", className = "" }) {
  return (
    <div className={`section-bridge py-3 sm:py-5 ${className}`}>
      <HappyCloudIcon className="w-8 h-5 sm:w-12 sm:h-7 opacity-80 animate-float" />
      <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      {label ? (
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-vannam-navy/60 px-2.5 py-0.5 rounded-full bg-white/80 border border-amber-200 shadow-2xs">
          {label}
        </span>
      ) : (
        <TwinkleStarIcon color="amber" className="w-4 h-4 animate-twinkle" />
      )}
      <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
      <HappyCloudIcon className="w-7 h-4.5 sm:w-10 sm:h-6 opacity-75 animate-float-reverse" />
    </div>
  );
}

// 2. Rainbow Arc Bridge (Storybook Color Transition)
export function RainbowArcBridge({ className = "" }) {
  return (
    <div className={`section-bridge py-2.5 sm:py-4 ${className}`}>
      <div className="relative flex items-center justify-center">
        <RainbowIcon className="w-12 h-7 sm:w-18 sm:h-10 drop-shadow-xs animate-float" />
        <ButterflyIcon color="rose" className="w-4 h-4 absolute -top-1 -right-3 animate-flutter" />
      </div>
    </div>
  );
}

// 3. Nature Bridge (Sprouts + Flora Transition)
export function NatureBridge({ className = "" }) {
  return (
    <div className={`section-bridge py-2.5 sm:py-4 ${className}`}>
      <BlossomFlowerIcon color="rose" className="w-5 h-5 animate-wiggle" />
      <span className="w-6 sm:w-12 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
      <SproutPlantIcon className="w-6 h-6 animate-bounce-gentle" />
      <span className="w-6 sm:w-12 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
      <ButterflyIcon color="emerald" className="w-4 h-4 animate-flutter" />
    </div>
  );
}

// 4. Doodle Divider (Crayon & Creative Play Transition)
export function DoodleDivider({ className = "" }) {
  return (
    <div className={`section-bridge py-2.5 sm:py-4 ${className}`}>
      <CrayonIcon color="amber" className="w-5 h-5 rotate-45 animate-wiggle" />
      <svg className="w-20 sm:w-32 h-3 text-amber-300/80" viewBox="0 0 120 12" fill="none">
        <path d="M0,6 Q30,0 60,6 T120,6" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      </svg>
      <ArtPaletteIcon className="w-5 h-5 animate-float" />
    </div>
  );
}

// 5. Stack of Storybooks with Glowing Star (About Section / Learning Foundations)
export function StorybookStackIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Bottom Book - Red */}
      <path d="M12 48C16 45 28 45 32 48C36 45 48 45 52 48V56C48 53 36 53 32 56C28 53 16 53 12 56V48Z" fill="#F43F5E" />
      <path d="M14 50C18 47 28 47 32 50C36 47 46 47 50 50V54C46 51 36 51 32 54C28 51 18 51 14 54V50Z" fill="#FFFBEB" />
      {/* Middle Book - Yellow */}
      <path d="M14 36C18 33 28 33 32 36C36 33 46 33 50 36V44C46 41 36 41 32 44C28 41 18 41 14 44V36Z" fill="#F59E0B" />
      <path d="M16 38C20 35 28 35 32 38C36 35 44 35 48 38V42C44 39 36 39 32 42C28 39 20 39 16 42V38Z" fill="#FFFBEB" />
      {/* Top Open Book - Sky Cyan */}
      <path d="M16 24C20 21 28 21 32 24C36 21 44 21 48 24V32C44 29 36 29 32 32C28 29 20 29 16 32V24Z" fill="#00A8E8" />
      <path d="M18 26C22 23 28 23 32 26C36 23 42 23 46 26V30C42 27 36 27 32 30C28 27 22 27 18 30V26Z" fill="#FFFFFF" />
      {/* Bookmark Ribbon */}
      <path d="M30 18V32L32 30L34 32V18H30Z" fill="#10B981" />
      {/* Floating Sparkle Star on Top */}
      <polygon points="32,6 34,11 39,11 35,14 37,19 32,16 27,19 29,14 25,11 30,11" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
    </svg>
  );
}

// 6. Sprouting Plant in Terracotta Pot (About Section / Growth & Discovery)
export function PlantInPotIcon({ className = "w-8 h-8", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Terracotta Pot */}
      <path d="M20 36H44L41 56H23L20 36Z" fill="#EA580C" />
      <rect x="18" y="32" width="28" height="6" rx="2" fill="#FB923C" />
      {/* Soil */}
      <ellipse cx="32" cy="34" rx="11" ry="2" fill="#78350F" />
      {/* Stem */}
      <path d="M32 34V16" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M32 26C24 26 22 18 22 18C22 18 30 18 32 26Z" fill="#34D399" />
      <path d="M32 20C40 20 42 12 42 12C42 12 34 12 32 20Z" fill="#10B981" />
      {/* Cute Little Flower Bud */}
      <circle cx="32" cy="14" r="5" fill="#F43F5E" />
      <circle cx="32" cy="14" r="2" fill="#FDE047" />
      {/* Smiling Pot Face */}
      <circle cx="28" cy="44" r="1.5" fill="#78350F" />
      <circle cx="36" cy="44" r="1.5" fill="#78350F" />
      <path d="M30 47C31 49 33 49 34 47" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 7. Preschool Yellow Bus (Transportation / Admissions & Campus Tour)
export function SchoolBusToyIcon({ className = "w-10 h-10", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Bus Body */}
      <rect x="8" y="16" width="48" height="28" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <rect x="8" y="32" width="48" height="4" fill="#1E293B" />
      {/* Windows with cute silhouettes */}
      <rect x="12" y="20" width="8" height="9" rx="2" fill="#E0F2FE" />
      <rect x="23" y="20" width="8" height="9" rx="2" fill="#E0F2FE" />
      <rect x="34" y="20" width="8" height="9" rx="2" fill="#E0F2FE" />
      <rect x="45" y="20" width="8" height="9" rx="2" fill="#E0F2FE" />
      {/* Smiley Faces in Windows */}
      <circle cx="16" cy="24" r="2" fill="#F43F5E" />
      <circle cx="27" cy="24" r="2" fill="#00A8E8" />
      <circle cx="38" cy="24" r="2" fill="#10B981" />
      {/* Headlights & Tail Lights */}
      <rect x="54" y="34" width="3" height="4" rx="1" fill="#FDE047" />
      <rect x="7" y="34" width="3" height="4" rx="1" fill="#EF4444" />
      {/* Wheels */}
      <circle cx="18" cy="45" r="7" fill="#1E293B" />
      <circle cx="18" cy="45" r="3" fill="#E2E8F0" />
      <circle cx="46" cy="45" r="7" fill="#1E293B" />
      <circle cx="46" cy="45" r="3" fill="#E2E8F0" />
      {/* Front Smile */}
      <path d="M48 38C50 40 52 40 53 38" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 8. Playground Slide & Castle (Facilities Section)
export function PlaygroundSlideIcon({ className = "w-10 h-10", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Tower Platform */}
      <rect x="10" y="22" width="16" height="34" rx="3" fill="#00A8E8" />
      <polygon points="18,10 8,22 28,22" fill="#F43F5E" />
      <rect x="14" y="26" width="8" height="12" rx="4" fill="#FFFBEB" />
      {/* Slide Curve */}
      <path d="M26 30C36 30 38 48 54 52" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
      <path d="M26 30C36 30 38 48 54 52" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
      {/* Ladder Steps */}
      <line x1="8" y1="30" x2="10" y2="30" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="38" x2="10" y2="38" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <line x1="8" y1="46" x2="10" y2="46" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Star on top */}
      <circle cx="18" cy="8" r="2.5" fill="#FBBF24" />
    </svg>
  );
}

// 9. Shield & Security Badge (Safety Section)
export function ShieldSecurityBadge({ className = "w-9 h-9", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Shield Body */}
      <path d="M32 8L50 14V32C50 44 42 54 32 58C22 54 14 44 14 32V14L32 8Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M32 12L46 17V32C46 42 39 50 32 54C25 50 18 42 18 32V17L32 12Z" fill="#ECFDF5" />
      {/* Friendly Padlock / Heart */}
      <circle cx="32" cy="30" r="7" fill="#047857" />
      <rect x="27" y="30" width="10" height="9" rx="2" fill="#F59E0B" />
      <path d="M29 30V26C29 24.3 30.3 23 32 23C33.7 23 35 24.3 35 26V30" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="34" r="1.5" fill="#78350F" />
      {/* Sparkles */}
      <polygon points="46,18 47.5,21 50.5,21 48,23 49,26 46,24 43,26 44,23 41.5,21 44.5,21" fill="#FBBF24" />
    </svg>
  );
}

// 10. Teacher Apple & Heart Trophy (Teachers Section)
export function TeacherApplesTrophy({ className = "w-9 h-9", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Red Juicy Apple */}
      <path d="M32 24C28 18 16 18 16 28C16 42 30 52 32 54C34 52 48 42 48 28C48 18 36 18 32 24Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
      {/* Apple Leaf & Stem */}
      <path d="M32 24V14" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 16C36 12 44 14 44 14C44 14 44 20 36 18" fill="#10B981" />
      {/* Cheerful Smile */}
      <circle cx="26" cy="32" r="2" fill="#78350F" />
      <circle cx="38" cy="32" r="2" fill="#78350F" />
      <path d="M29 36C30.5 39 33.5 39 35 36" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="23" cy="36" rx="2" ry="1" fill="#FDA4AF" />
      <ellipse cx="41" cy="36" rx="2" ry="1" fill="#FDA4AF" />
    </svg>
  );
}

// 11. Parent Love Envelope (Testimonials Section)
export function ParentLoveBadge({ className = "w-9 h-9", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Envelope Base */}
      <rect x="10" y="24" width="44" height="28" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Envelope Flap Open */}
      <polygon points="10,24 32,40 54,24" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
      {/* Floating Big Red Heart */}
      <path d="M32 18C30 14 24 14 24 19C24 25 32 30 32 30C32 30 40 25 40 19C40 14 34 14 32 18Z" fill="#F43F5E" />
      <circle cx="22" cy="14" r="2" fill="#F43F5E" opacity="0.6" />
      <circle cx="42" cy="12" r="2.5" fill="#F43F5E" opacity="0.8" />
    </svg>
  );
}

// 12. Party Celebration Hat & Popper (Events / Calendar Section)
export function PartyCelebrationIcon({ className = "w-9 h-9", ...props }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      {/* Party Hat */}
      <polygon points="32,10 16,50 48,50" fill="#8B5CF6" />
      <polygon points="32,10 24,50 40,50" fill="#F59E0B" />
      {/* Stripes */}
      <path d="M22 36L42 36" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M26 26L38 26" stroke="#00A8E8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Pompom on Top */}
      <circle cx="32" cy="10" r="3.5" fill="#F43F5E" />
      {/* Confetti Sparkles */}
      <circle cx="12" cy="20" r="2" fill="#F59E0B" />
      <circle cx="50" cy="22" r="2" fill="#10B981" />
      <circle cx="48" cy="12" r="1.5" fill="#00A8E8" />
      <circle cx="16" cy="30" r="1.5" fill="#F43F5E" />
    </svg>
  );
}



