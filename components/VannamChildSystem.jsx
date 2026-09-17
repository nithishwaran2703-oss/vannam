"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  TeddyBearIcon,
  AlphabetBlock,
  ToyCarIcon,
  PinwheelToy,
  SchoolBusToyIcon,
} from "./ToyDecorations";

// ============================================================================
// 1. VANNAM CONSISTENT CHILD CHARACTERS (High-End Vector Storybook Family)
// ============================================================================

export function VannamChildCharacter({
  type = "reading",
  className = "w-20 h-20",
  ...props
}) {
  switch (type) {
    case "reading":
      // Child sitting comfortably reading an open colorful storybook
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Hair back */}
          <circle cx="60" cy="40" r="22" fill="#7c2d12ff" />
          {/* Head */}
          <circle cx="60" cy="44" r="18" fill="#FDE68A" />
          {/* Hair front / bangs */}
          <path d="M42 42C44 30 52 24 60 24C68 24 76 30 78 42C72 36 65 36 60 38C55 36 48 36 42 42Z" fill="#7C2D12" />
          {/* Eyes - Happy curved */}
          <path d="M52 44C53.5 42 56.5 42 58 44" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 44C63.5 42 66.5 42 68 44" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="50" cy="48" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="70" cy="48" r="3" fill="#F43F5E" opacity="0.6" />
          {/* Sweet Smile */}
          <path d="M56 50C58 53 62 53 64 50" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
          {/* Body / Shirt (Teal / Sky Blue) */}
          <path d="M46 62C44 68 43 78 43 86H77C77 78 76 68 74 62C71 58 49 58 46 62Z" fill="#0284C7" />
          {/* Collar */}
          <path d="M54 62L60 68L66 62" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Crossed Legs (Preschool rug sitting) */}
          <path d="M38 86C38 82 46 80 60 80C74 80 82 82 82 86C82 92 74 96 60 96C46 96 38 92 38 86Z" fill="#F59E0B" />
          {/* Shoes */}
          <ellipse cx="44" cy="88" rx="6" ry="4" fill="#E11D48" />
          <ellipse cx="76" cy="88" rx="6" ry="4" fill="#E11D48" />
          {/* Open Storybook held in hands */}
          <g transform="translate(36, 64)">
            {/* Book Pages */}
            <path d="M24 8C17 5 6 5 2 7V24C6 22 17 22 24 25V8Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M24 8C31 5 42 5 46 7V24C42 22 31 22 24 25V8Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Book Cover */}
            <path d="M1 7.5L24 26L47 7.5" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
            {/* Little Illustrations on Book */}
            <circle cx="12" cy="14" r="3" fill="#F59E0B" />
            <path d="M10 19H18M30 13H40M30 17H38" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Hands holding book */}
          <circle cx="39" cy="74" r="4" fill="#FDE68A" />
          <circle cx="81" cy="74" r="4" fill="#FDE68A" />
        </svg>
      );

    case "painting":
      // Child holding paintbrush and artist palette
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Hair buns */}
          <circle cx="44" cy="32" r="10" fill="#92400E" />
          <circle cx="76" cy="32" r="10" fill="#92400E" />
          <circle cx="44" cy="32" r="4" fill="#FDE68A" />
          <circle cx="76" cy="32" r="4" fill="#FDE68A" />
          {/* Head */}
          <circle cx="60" cy="44" r="18" fill="#FDE68A" />
          {/* Bangs */}
          <path d="M44 42C48 30 72 30 76 42C70 38 64 38 60 40C56 38 50 38 44 42Z" fill="#92400E" />
          {/* Bright Curious Eyes */}
          <circle cx="53" cy="44" r="2.5" fill="#451A03" />
          <circle cx="67" cy="44" r="2.5" fill="#451A03" />
          <circle cx="54" cy="43" r="0.9" fill="#FFFFFF" />
          <circle cx="68" cy="43" r="0.9" fill="#FFFFFF" />
          {/* Cheeks */}
          <circle cx="49" cy="48" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="71" cy="48" r="3" fill="#F43F5E" opacity="0.6" />
          {/* Cheerful O-mouth */}
          <ellipse cx="60" cy="51" rx="2.5" ry="2" fill="#E11D48" />
          {/* Art Apron (Bright Yellow with paint splashes) */}
          <path d="M46 62C44 68 42 80 42 90H78C78 80 76 68 74 62C70 58 50 58 46 62Z" fill="#F59E0B" />
          {/* Paint Splatters on Apron */}
          <circle cx="52" cy="72" r="2.5" fill="#00A8E8" />
          <circle cx="68" cy="78" r="3" fill="#F43F5E" />
          <circle cx="58" cy="84" r="2" fill="#10B981" />
          {/* Little Legs */}
          <rect x="50" y="90" width="6" height="14" rx="3" fill="#3B82F6" />
          <rect x="64" y="90" width="6" height="14" rx="3" fill="#3B82F6" />
          <ellipse cx="53" cy="104" rx="5" ry="3" fill="#EF4444" />
          <ellipse cx="67" cy="104" rx="5" ry="3" fill="#EF4444" />
          {/* Left Hand holding Painter's Palette */}
          <circle cx="38" cy="68" r="4" fill="#FDE68A" />
          <g transform="translate(20, 60)">
            <ellipse cx="14" cy="14" rx="14" ry="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="8" cy="12" r="2" fill="#EF4444" />
            <circle cx="14" cy="9" r="2" fill="#3B82F6" />
            <circle cx="20" cy="11" r="2" fill="#10B981" />
            <circle cx="15" cy="16" r="2" fill="#F59E0B" />
            <circle cx="22" cy="17" r="2.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          </g>
          {/* Right Hand raised with Paintbrush */}
          <circle cx="82" cy="64" r="4" fill="#FDE68A" />
          <line x1="82" y1="64" x2="98" y2="44" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M98 44L104 38C105 40 102 44 98 44Z" fill="#F43F5E" />
        </svg>
      );

    case "blocks":
      // Child playing with wooden alphabet blocks
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Head & Hair */}
          <circle cx="50" cy="40" r="20" fill="#312E81" />
          <circle cx="50" cy="44" r="17" fill="#FED7AA" />
          <path d="M34 40C36 28 62 28 66 40C60 36 54 36 50 38C46 36 40 36 34 40Z" fill="#312E81" />
          {/* Eyes smiling */}
          <path d="M43 45C44.5 43 47.5 43 49 45" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
          <path d="M53 45C54.5 43 57.5 43 59 45" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />
          <circle cx="41" cy="49" r="2.5" fill="#F43F5E" opacity="0.6" />
          <circle cx="61" cy="49" r="2.5" fill="#F43F5E" opacity="0.6" />
          <path d="M48 51C49.5 53 53.5 53 55 51" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
          {/* Body */}
          <path d="M38 62C36 68 35 78 35 86H67C67 78 66 68 64 62C61 58 41 58 38 62Z" fill="#10B981" />
          {/* Sitting Legs */}
          <path d="M28 86C28 82 36 80 50 80C64 80 72 82 72 86C72 92 64 96 50 96C36 96 28 92 28 86Z" fill="#6366F1" />
          <ellipse cx="34" cy="88" rx="5" ry="3.5" fill="#F59E0B" />
          <ellipse cx="66" cy="88" rx="5" ry="3.5" fill="#F59E0B" />
          {/* Hands holding top block */}
          <circle cx="64" cy="62" r="3.5" fill="#FED7AA" />
          <circle cx="76" cy="62" r="3.5" fill="#FED7AA" />
          {/* Stacked Building Blocks (Tower!) */}
          {/* Bottom Block - Red (Letter A) */}
          <g transform="translate(74, 76)">
            <rect width="18" height="18" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
            <text x="9" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">A</text>
          </g>
          {/* Middle Block - Yellow (Number 1) */}
          <g transform="translate(74, 56)">
            <rect width="18" height="18" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
            <text x="9" y="13" textAnchor="middle" fill="#78350F" fontSize="11" fontWeight="900" fontFamily="sans-serif">1</text>
          </g>
          {/* Top Block - Blue (Letter B) being placed */}
          <g transform="translate(68, 36) rotate(-8)">
            <rect width="18" height="18" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
            <text x="9" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">B</text>
          </g>
        </svg>
      );

    case "discovering":
      // Child discovering with magnifying glass & little sprout
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Cute Little Explorer Hat */}
          <ellipse cx="60" cy="28" rx="26" ry="6" fill="#FBBF24" />
          <path d="M42 28C42 18 50 14 60 14C70 14 78 18 78 28Z" fill="#D97706" />
          <line x1="42" y1="28" x2="78" y2="28" stroke="#B45309" strokeWidth="2" />
          {/* Head & Bangs */}
          <circle cx="60" cy="44" r="17" fill="#FDE68A" />
          <path d="M44 42C48 34 72 34 76 42" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          {/* Big Wondering Eye through Magnifier */}
          <circle cx="52" cy="45" r="2.5" fill="#451A03" />
          <circle cx="67" cy="45" r="4.5" fill="#451A03" />
          <circle cx="68" cy="43" r="1.5" fill="#FFFFFF" />
          <circle cx="48" cy="49" r="2.5" fill="#F43F5E" opacity="0.6" />
          <circle cx="73" cy="49" r="3" fill="#F43F5E" opacity="0.6" />
          <path d="M57 52C59 54 62 54 64 52" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          {/* Explorer Vest */}
          <path d="M45 62C43 68 41 78 41 88H79C79 78 77 68 75 62C71 58 49 58 45 62Z" fill="#10B981" />
          <line x1="60" y1="62" x2="60" y2="88" stroke="#047857" strokeWidth="2" />
          <rect x="47" y="70" width="8" height="9" rx="2" fill="#047857" />
          <rect x="65" y="70" width="8" height="9" rx="2" fill="#047857" />
          {/* Legs */}
          <rect x="49" y="88" width="8" height="15" rx="3" fill="#D97706" />
          <rect x="63" y="88" width="8" height="15" rx="3" fill="#D97706" />
          <ellipse cx="53" cy="103" rx="5.5" ry="3" fill="#451A03" />
          <ellipse cx="67" cy="103" rx="5.5" ry="3" fill="#451A03" />
          {/* Magnifying Glass */}
          <g transform="translate(64, 38)">
            <circle cx="10" cy="10" r="10" fill="#BAE6FD" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="3" />
            <line x1="17" y1="17" x2="26" y2="26" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
            <path d="M5 8C6 6 8 5 11 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          {/* Little Sprout Plant on ground */}
          <g transform="translate(24, 90)">
            <ellipse cx="8" cy="14" rx="8" ry="3" fill="#78350F" />
            <path d="M8 14V6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 8C5 6 3 9 8 10" fill="#34D399" />
            <path d="M8 7C11 5 13 8 8 9" fill="#34D399" />
          </g>
        </svg>
      );

    case "gardening":
      // Child with watering can and blooming flower
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Head & Ponytail */}
          <circle cx="82" cy="30" r="8" fill="#B45309" />
          <circle cx="58" cy="42" r="17" fill="#FDE68A" />
          <path d="M42 38C46 28 70 28 74 38C68 34 62 34 58 36C54 34 48 34 42 38Z" fill="#B45309" />
          <circle cx="51" cy="43" r="2.2" fill="#451A03" />
          <circle cx="65" cy="43" r="2.2" fill="#451A03" />
          <circle cx="47" cy="47" r="2.5" fill="#F43F5E" opacity="0.6" />
          <circle cx="69" cy="47" r="2.5" fill="#F43F5E" opacity="0.6" />
          <path d="M54 50C56 52 60 52 62 50" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
          {/* Dungarees / Overalls */}
          <path d="M44 60C42 66 40 76 40 88H76C76 76 74 66 72 60C68 56 48 56 44 60Z" fill="#38BDF8" />
          <line x1="48" y1="60" x2="48" y2="72" stroke="#0284C7" strokeWidth="2.5" />
          <line x1="68" y1="60" x2="68" y2="72" stroke="#0284C7" strokeWidth="2.5" />
          <circle cx="48" cy="72" r="1.5" fill="#FBBF24" />
          <circle cx="68" cy="72" r="1.5" fill="#FBBF24" />
          {/* Legs */}
          <rect x="46" y="88" width="8" height="15" rx="3" fill="#0284C7" />
          <rect x="62" y="88" width="8" height="15" rx="3" fill="#0284C7" />
          <ellipse cx="50" cy="103" rx="5.5" ry="3" fill="#F59E0B" />
          <ellipse cx="66" cy="103" rx="5.5" ry="3" fill="#F59E0B" />
          {/* Watering Can */}
          <g transform="translate(18, 62)">
            <rect x="6" y="10" width="16" height="14" rx="4" fill="#10B981" />
            <path d="M6 14C2 14 0 18 0 20C0 22 2 24 6 24" stroke="#10B981" strokeWidth="2" fill="none" />
            <path d="M22 18L30 14" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="31" cy="14" r="2.5" fill="#34D399" />
            {/* Water Drops */}
            <circle cx="34" cy="18" r="1.2" fill="#38BDF8" />
            <circle cx="36" cy="22" r="1.2" fill="#38BDF8" />
            <circle cx="33" cy="25" r="1.2" fill="#38BDF8" />
          </g>
          {/* Flower blooming on ground */}
          <g transform="translate(80, 78)">
            <line x1="12" y1="28" x2="12" y2="12" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="10" r="5" fill="#FBBF24" />
            <circle cx="12" cy="4" r="3.5" fill="#F43F5E" />
            <circle cx="18" cy="10" r="3.5" fill="#F43F5E" />
            <circle cx="12" cy="16" r="3.5" fill="#F43F5E" />
            <circle cx="6" cy="10" r="3.5" fill="#F43F5E" />
          </g>
        </svg>
      );

    case "dancing":
    default:
      // Joyful child jumping / dancing with arms up
      return (
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
          {/* Head & Spiky Hair */}
          <path d="M42 34L48 24L56 30L64 22L72 28L78 22L78 36C78 46 70 54 60 54C50 54 42 46 42 34Z" fill="#F59E0B" />
          <circle cx="60" cy="42" r="17" fill="#FED7AA" />
          {/* Joyful Closed Smile Eyes */}
          <path d="M52 42C53.5 39 56.5 39 58 42" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 42C63.5 39 66.5 39 68 42" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="49" cy="46" r="3" fill="#F43F5E" opacity="0.6" />
          <circle cx="71" cy="46" r="3" fill="#F43F5E" opacity="0.6" />
          {/* Huge Happy Smile */}
          <path d="M54 48C56 53 64 53 66 48Z" fill="#E11D48" />
          {/* Arms Raised Up High in Joy! */}
          <path d="M44 64L30 46" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" />
          <path d="M76 64L90 46" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" />
          {/* Shirt */}
          <path d="M44 60C42 66 41 76 41 84H79C79 76 78 66 76 60C72 56 48 56 44 60Z" fill="#F43F5E" />
          <circle cx="60" cy="70" r="4" fill="#FBBF24" />
          {/* Dancing Shorts */}
          <path d="M43 84H77L74 94H62L60 88L58 94H46L43 84Z" fill="#3B82F6" />
          {/* Joyful leaping feet */}
          <ellipse cx="48" cy="100" rx="4" ry="5" transform="rotate(-15 48 100)" fill="#10B981" />
          <ellipse cx="72" cy="98" rx="4" ry="5" transform="rotate(20 72 98)" fill="#10B981" />
          {/* Music Notes around child */}
          <g transform="translate(18, 30)">
            <ellipse cx="4" cy="8" rx="3" ry="2" fill="#8B5CF6" />
            <line x1="7" y1="8" x2="7" y2="1" stroke="#8B5CF6" strokeWidth="1.5" />
            <path d="M7 1C10 2 12 5 12 5" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g transform="translate(94, 26)">
            <ellipse cx="4" cy="8" rx="3" ry="2" fill="#F59E0B" />
            <line x1="7" y1="8" x2="7" y2="1" stroke="#F59E0B" strokeWidth="1.5" />
            <path d="M7 1C10 2 12 5 12 5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );
  }
}

// ============================================================================
// 2. INDIVIDUAL ILLUSTRATED HANGING TOY SVG ICONS
// ============================================================================

export function HangingStarIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <polygon
        points="24,4 30,16 43,18 34,27 36,40 24,34 12,40 14,27 5,18 18,16"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="22" r="1.5" fill="#78350F" />
      <circle cx="28" cy="22" r="1.5" fill="#78350F" />
      <path d="M22 26C23 27.5 25 27.5 26 26" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HangingMoonIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M32 8C20 8 10 18 10 30C10 37 14 43 20 46C15 42 12 36 12 30C12 18 21 9 32 8Z"
        fill="#FDE047"
        stroke="#EAB308"
        strokeWidth="1.5"
      />
      <circle cx="19" cy="28" r="1.2" fill="#78350F" />
      <path d="M17 32C18 33 20 33 21 32" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
      <circle cx="34" cy="20" r="1.5" fill="#FEF08A" />
      <circle cx="28" cy="14" r="1.5" fill="#FEF08A" />
    </svg>
  );
}

export function HangingCloudIcon({ className = "w-8 h-6" }) {
  return (
    <svg viewBox="0 0 54 36" fill="none" className={className}>
      <path
        d="M12 30H42C47.5 30 52 25.5 52 20C52 14.8 48 10.5 43 10.1C41.8 4.3 36.8 0 30.5 0C25 0 20.3 3.3 18.2 8C17.2 7.7 16.1 7.5 15 7.5C8.4 7.5 3 12.9 3 19.5C3 25.3 7.7 30 12 30Z"
        fill="#FFFFFF"
        stroke="#BAE6FD"
        strokeWidth="1.5"
      />
      <circle cx="22" cy="18" r="1.5" fill="#0369A1" />
      <circle cx="32" cy="18" r="1.5" fill="#0369A1" />
      <ellipse cx="17" cy="21" rx="2" ry="1.2" fill="#FDA4AF" />
      <ellipse cx="37" cy="21" rx="2" ry="1.2" fill="#FDA4AF" />
      <path d="M25 22C26 23.5 28 23.5 29 22" stroke="#0369A1" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HangingRainbowIcon({ className = "w-8 h-6" }) {
  return (
    <svg viewBox="0 0 54 32" fill="none" className={className}>
      <path d="M6 28C6 16 15 6 27 6C39 6 48 16 48 28" stroke="#F43F5E" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M11 28C11 19 18 11 27 11C36 11 43 19 43 28" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M16 28C16 22 21 16 27 16C33 16 38 22 38 28" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M21 28C21 25 24 21 27 21C30 21 33 25 33 28" stroke="#00A8E8" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function HangingAirplaneIcon({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className}>
      {/* Fuselage */}
      <ellipse cx="24" cy="24" rx="18" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
      {/* Wings */}
      <polygon points="20,24 28,8 34,8 26,24" fill="#F43F5E" />
      <polygon points="20,24 28,40 34,40 26,24" fill="#E11D48" />
      {/* Tail fin */}
      <polygon points="8,24 6,14 12,14 10,24" fill="#F59E0B" />
      {/* Propeller front */}
      <circle cx="42" cy="24" r="2.5" fill="#FBBF24" />
      <line x1="42" y1="18" x2="42" y2="30" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
      {/* Window */}
      <circle cx="32" cy="24" r="2" fill="#FFFFFF" />
      <circle cx="26" cy="24" r="2" fill="#FFFFFF" />
    </svg>
  );
}

export function HangingKiteIcon({ className = "w-7 h-9" }) {
  return (
    <svg viewBox="0 0 40 54" fill="none" className={className}>
      {/* Diamond Kite Body */}
      <polygon points="20,2 38,20 20,40 2,20" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      <polygon points="20,2 20,40 2,20" fill="#F43F5E" />
      {/* Crosspieces */}
      <line x1="20" y1="2" x2="20" y2="40" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
      <line x1="2" y1="20" x2="38" y2="20" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
      {/* Tail string */}
      <path d="M20 40C22 45 18 48 20 54" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Tail bows */}
      <polygon points="18,44 24,45 20,46" fill="#10B981" />
      <polygon points="17,50 23,51 19,52" fill="#00A8E8" />
    </svg>
  );
}

export function HangingBalloonIcon({ color = "rose", className = "w-7 h-9" }) {
  const fills = {
    rose: { bg: "#F43F5E", stroke: "#E11D48", highlight: "#FECDD3" },
    amber: { bg: "#F59E0B", stroke: "#D97706", highlight: "#FEF3C7" },
    sky: { bg: "#0284C7", stroke: "#0369A1", highlight: "#BAE6FD" },
    emerald: { bg: "#10B981", stroke: "#059669", highlight: "#D1FAE5" },
    purple: { bg: "#8B5CF6", stroke: "#7C3AED", highlight: "#EDE9FE" },
  };
  const theme = fills[color] || fills.rose;

  return (
    <svg viewBox="0 0 36 48" fill="none" className={className}>
      <ellipse cx="18" cy="18" rx="14" ry="17" fill={theme.bg} stroke={theme.stroke} strokeWidth="1.2" />
      <path d="M12 9C15 6 19 6 22 8" stroke={theme.highlight} strokeWidth="1.8" strokeLinecap="round" />
      {/* Balloon Knot */}
      <polygon points="18,35 15,39 21,39" fill={theme.stroke} />
      {/* Little hanging ribbon tail */}
      <path d="M18 39C16 43 20 45 18 48" stroke="#64748B" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function HangingPuzzleIcon({ color = "emerald", className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="6" y="6" width="28" height="28" rx="4" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
      <circle cx="20" cy="6" r="3.5" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
      <circle cx="34" cy="20" r="3.5" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export function HangingHeartIcon({ className = "w-7 h-7" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 34C20 34 5 24 5 14C5 8 10 4 16 5C19 6 20 8 20 8C20 8 21 6 24 5C30 4 35 8 35 14C35 24 20 34 20 34Z"
        fill="#F43F5E"
        stroke="#E11D48"
        strokeWidth="1.5"
      />
      <circle cx="13" cy="11" r="1.5" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

// ============================================================================
// 3. GLOBAL COMPONENT: <VannamHangingToys />
// ============================================================================

export function VannamHangingToys({
  items = [
    { type: "star", delay: "0s", height: 44 },
    { type: "cloud", delay: "0.8s", height: 54 },
    { type: "rainbow", delay: "1.4s", height: 40 },
    { type: "teddy", delay: "2.1s", height: 50 },
  ],
  className = "",
  containerHeight = "h-24 sm:h-32",
  congested = true,
}) {
  return (
    <div
      className={`absolute top-0 left-0 right-0 pointer-events-none select-none z-20 flex ${congested ? "justify-center gap-3 xs:gap-4 sm:gap-7 md:gap-10 max-w-4xl mx-auto" : "justify-around"} items-start px-3 sm:px-6 overflow-visible ${containerHeight} ${className}`}
      aria-hidden="true"
    >
      {items.map((item, idx) => {
        // Mobile rule: show only 2 essential toys to keep text readable and view clean
        const isHiddenMobile = (congested ? idx >= 2 : idx >= 2) || item.hiddenMobile;
        const swingClass = idx % 3 === 0
          ? "animate-pendulum-slow"
          : idx % 3 === 1
            ? "animate-pendulum-reverse"
            : "animate-pendulum";

        const deskH = item.height || 48;
        const mobH = Math.max(20, Math.round(deskH * 0.65));

        return (
          <div
            key={idx}
            className={`flex flex-col items-center origin-top transition-transform ${isHiddenMobile ? "hidden sm:flex" : "flex"}`}
            style={{
              animationDelay: item.delay || `${idx * 0.4}s`,
            }}
          >
            {/* Hanging Cord / illustrated ribbon */}
            <div
              className="w-[1.5px] relative h-[var(--cord-mob)] sm:h-[var(--cord-desk)]"
              style={{
                "--cord-desk": `${deskH}px`,
                "--cord-mob": `${mobH}px`,
                backgroundColor: item.cordColor || "#FBBF24",
                backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)`
              }}
            >
              {/* Cute Tack Bead */}
              <div
                className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs -mt-1 -ml-[4px]"
                style={{ backgroundColor: item.beadColor || "#F59E0B" }}
              />
            </div>

            {/* Oscillating Toy Head */}
            <div
              className={`${swingClass} origin-top p-1 sm:p-1.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-amber-200/80 shadow-xs flex items-center justify-center -mt-0.5 hover:scale-110 transition-transform`}
              style={{ animationDelay: item.delay || "0s" }}
            >
              {item.type === "star" && <HangingStarIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "moon" && <HangingMoonIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "cloud" && <HangingCloudIcon className="w-6 h-5 sm:w-8 sm:h-6" />}
              {item.type === "rainbow" && <HangingRainbowIcon className="w-6 h-5 sm:w-8 sm:h-6" />}
              {item.type === "airplane" && <HangingAirplaneIcon className="w-6 h-6 sm:w-8 sm:h-8" />}
              {item.type === "kite" && <HangingKiteIcon className="w-5 h-7 sm:w-7 sm:h-9" />}
              {item.type === "balloon" && <HangingBalloonIcon color={item.color || "rose"} className="w-5 h-7 sm:w-7 sm:h-9" />}
              {item.type === "puzzle" && <HangingPuzzleIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "heart" && <HangingHeartIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "book" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">📚</div>}
              {item.type === "palette" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🎨</div>}
              {item.type === "music" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🎵</div>}
              {item.type === "apple" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🍎</div>}
              {item.type === "camera" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">📸</div>}
              {item.type === "shield" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🛡️</div>}
              {item.type === "sprout" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🌱</div>}
              {item.type === "bus" && <SchoolBusToyIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "sun" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">☀️</div>}
              {item.type === "flower" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">🌸</div>}
              {item.type === "letter" && <div className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center text-sm sm:text-base">💌</div>}
              {item.type === "car" && <ToyCarIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "pinwheel" && <PinwheelToy className="w-5 h-5 sm:w-7 sm:h-7 animate-spin-slow" />}
              {item.type === "teddy" && <TeddyBearIcon className="w-5 h-5 sm:w-7 sm:h-7" />}
              {item.type === "block" && (
                <AlphabetBlock
                  letter={item.letter || "A"}
                  color={item.color || "amber"}
                  className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-2xs"
                />
              )}
              {item.type === "custom" && item.component}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. GLOBAL COMPONENT: <VannamFloatingElements />
// ============================================================================

export function VannamFloatingElements({
  className = "",
  elements = [
    { type: "butterfly", position: "top-10 left-4", color: "rose", delay: "0s" },
    { type: "star", position: "top-16 right-6", color: "amber", delay: "1.2s" },
    { type: "cloud", position: "bottom-12 left-10", color: "sky", delay: "0.5s" },
  ],
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-10 overflow-hidden ${className}`} aria-hidden="true">
      {elements.map((el, i) => {
        return (
          <div
            key={i}
            className={`absolute ${el.position} transition-transform ${el.hiddenMobile ? "hidden sm:block" : "block"}`}
            style={{ animationDelay: el.delay || "0s" }}
          >
            {el.type === "butterfly" && (
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-8 sm:h-8 animate-flutter">
                <path d="M16 16C12 8 4 10 8 18C12 26 16 18 16 16Z" fill={el.color === "rose" ? "#F43F5E" : "#8B5CF6"} />
                <path d="M16 16C20 8 28 10 24 18C20 26 16 18 16 16Z" fill={el.color === "rose" ? "#FB7185" : "#A78BFA"} />
                <line x1="16" y1="12" x2="16" y2="20" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}

            {el.type === "star" && (
              <div className="animate-float">
                <HangingStarIcon className="w-5 h-5 sm:w-6 sm:h-6 opacity-75" />
              </div>
            )}

            {el.type === "cloud" && (
              <div className="animate-float-reverse">
                <HangingCloudIcon className="w-8 h-6 sm:w-12 sm:h-8 opacity-60" />
              </div>
            )}

            {el.type === "balloon" && (
              <div className="animate-float">
                <HangingBalloonIcon color={el.color || "amber"} className="w-6 h-8 sm:w-8 sm:h-10 opacity-75" />
              </div>
            )}

            {el.type === "paperplane" && (
              <div className="animate-float-reverse">
                <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
                  <polygon points="4,16 28,4 20,28 16,20" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
                  <polygon points="28,4 16,20 20,18" fill="#BAE6FD" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 5. GLOBAL COMPONENT: <VannamCrayonDivider />
// ============================================================================

export function VannamCrayonDivider({
  type = "scallop-cloud", // "scallop-cloud" | "crayon-wave" | "rainbow-arc"
  flip = false,
  className = "",
  strokeColor = "rgba(255, 255, 255, 0.8)",
}) {
  const flipClass = flip ? "rotate-180" : "";

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none z-20 ${flipClass} ${className}`}
      aria-hidden="true"
    >
      {type === "crayon-wave" && (
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          {/* Textured hand-drawn crayon wave stroke */}
          <path
            d="M0,20 Q180,36 360,20 T720,20 T1080,20 T1440,20"
            stroke={strokeColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="16 6 8 6"
            fill="none"
          />
        </svg>
      )}

      {type === "rainbow-arc" && (
        <svg
          viewBox="0 0 1440 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path d="M0,24 Q360,40 720,24 T1440,24" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M0,27 Q360,43 720,27 T1440,27" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M0,30 Q360,46 720,30 T1440,30" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M0,33 Q360,49 720,33 T1440,33" stroke="#00A8E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        </svg>
      )}

      {type === "scallop-cloud" && (
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          {/* Cloud Bunting / Scalloped gentle wave */}
          <path
            d="M0,24 C120,40 240,40 360,24 C480,40 600,40 720,24 C840,40 960,40 1080,24 C1200,40 1320,40 1440,24"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M0,24 C120,40 240,40 360,24 C480,40 600,40 720,24 C840,40 960,40 1080,24 C1200,40 1320,40 1440,24"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
}

// ============================================================================
// 6. SPECIAL COMPONENT 1: HERO "Hanging Toy Canopy"
// ============================================================================

export function HangingToyCanopy({
  theme = "hero",
  items,
  ropeColor = "#F59E0B",
  className = "",
  congested = true,
}) {
  const themeMap = {
    hero: [
      { type: "teddy", label: "Teddy", height: 46, delay: "0s", cordColor: "#FBBF24" },
      { type: "block", letter: "A", color: "rose", height: 52, delay: "0.5s", cordColor: "#F43F5E" },
      { type: "cloud", label: "Cloud", height: 38, delay: "0.8s", cordColor: "#BAE6FD" },
      { type: "pinwheel", label: "Pinwheel", height: 48, delay: "1.2s", cordColor: "#38BDF8" },
      { type: "rainbow", label: "Rainbow", height: 42, delay: "1.4s", cordColor: "#F59E0B" },
      { type: "car", label: "Car", height: 48, delay: "1.9s", cordColor: "#10B981", hiddenMobile: true },
      { type: "star", label: "Star", height: 56, delay: "1.8s", cordColor: "#FBBF24", hiddenMobile: true },
      { type: "airplane", label: "Flyer", height: 42, delay: "2.3s", cordColor: "#0284C7", hiddenMobile: true },
      { type: "block", letter: "1", color: "amber", height: 46, delay: "0.4s", cordColor: "#10B981", hiddenMobile: true },
    ],
    about: [
      { type: "book", label: "Story", height: 48, delay: "0s", cordColor: "#F59E0B" },
      { type: "star", label: "Star", height: 56, delay: "0.9s", cordColor: "#FBBF24" },
      { type: "teddy", label: "Teddy", height: 42, delay: "1.5s", cordColor: "#EA580C" },
      { type: "rainbow", label: "Rainbow", height: 50, delay: "0.6s", cordColor: "#F43F5E", hiddenMobile: true },
      { type: "cloud", label: "Cloud", height: 46, delay: "1.8s", cordColor: "#BAE6FD", hiddenMobile: true },
      { type: "block", letter: "V", color: "emerald", height: 52, delay: "2.2s", cordColor: "#10B981", hiddenMobile: true },
      { type: "heart", label: "Heart", height: 44, delay: "1.3s", cordColor: "#F43F5E", hiddenMobile: true },
    ],
    programs: [
      { type: "block", letter: "A", color: "rose", height: 48, delay: "0s", cordColor: "#F43F5E" },
      { type: "teddy", label: "Teddy", height: 54, delay: "0.6s", cordColor: "#F59E0B" },
      { type: "puzzle", label: "Puzzle", height: 40, delay: "1.2s", cordColor: "#10B981" },
      { type: "block", letter: "B", color: "sky", height: 50, delay: "0.4s", cordColor: "#38BDF8" },
      { type: "balloon", color: "emerald", height: 44, delay: "1.4s", cordColor: "#10B981" },
      { type: "star", label: "Star", height: 56, delay: "1.9s", cordColor: "#FBBF24", hiddenMobile: true },
      { type: "block", letter: "C", color: "purple", height: 45, delay: "2.4s", cordColor: "#8B5CF6", hiddenMobile: true },
      { type: "airplane", label: "Flyer", height: 50, delay: "1.2s", cordColor: "#0284C7", hiddenMobile: true },
    ],
    whyUs: [
      { type: "shield", label: "Trust", height: 48, delay: "0s", cordColor: "#3B82F6" },
      { type: "heart", label: "Care", height: 54, delay: "0.8s", cordColor: "#F43F5E" },
      { type: "star", label: "Quality", height: 42, delay: "1.6s", cordColor: "#F59E0B" },
      { type: "sun", label: "Joy", height: 50, delay: "0.5s", cordColor: "#FBBF24", hiddenMobile: true },
      { type: "cloud", label: "Cloud", height: 44, delay: "2.0s", cordColor: "#BAE6FD", hiddenMobile: true },
      { type: "teddy", label: "Warmth", height: 56, delay: "1.3s", cordColor: "#EA580C", hiddenMobile: true },
      { type: "flower", label: "Grow", height: 46, delay: "2.5s", cordColor: "#10B981", hiddenMobile: true },
    ],
    methodology: [
      { type: "sprout", label: "Discover", height: 48, delay: "0s", cordColor: "#10B981" },
      { type: "book", label: "Learn", height: 56, delay: "0.7s", cordColor: "#F59E0B" },
      { type: "star", label: "Spark", height: 42, delay: "1.5s", cordColor: "#FBBF24" },
      { type: "puzzle", label: "Build", height: 52, delay: "0.4s", cordColor: "#8B5CF6", hiddenMobile: true },
      { type: "kite", label: "Fly", height: 60, delay: "2.1s", cordColor: "#F43F5E", hiddenMobile: true },
      { type: "rainbow", label: "Color", height: 44, delay: "1.1s", cordColor: "#F59E0B", hiddenMobile: true },
      { type: "airplane", label: "Soar", height: 50, delay: "2.6s", cordColor: "#00A8E8", hiddenMobile: true },
    ],
    activities: [
      { type: "teddy", label: "Teddy", height: 46, delay: "0s", cordColor: "#F59E0B" },
      { type: "pinwheel", label: "Pinwheel", height: 52, delay: "0.7s", cordColor: "#F43F5E" },
      { type: "block", letter: "1", color: "amber", height: 40, delay: "1.4s", cordColor: "#FBBF24" },
      { type: "car", label: "Toy Car", height: 48, delay: "0.5s", cordColor: "#38BDF8" },
      { type: "kite", label: "Kite", height: 44, delay: "1.8s", cordColor: "#0284C7" },
      { type: "star", label: "Star", height: 54, delay: "2.2s", cordColor: "#FBBF24", hiddenMobile: true },
      { type: "palette", label: "Art", height: 46, delay: "1.1s", cordColor: "#8B5CF6", hiddenMobile: true },
      { type: "bus", label: "Bus", height: 50, delay: "2.5s", cordColor: "#10B981", hiddenMobile: true },
    ],
    facilities: [
      { type: "bus", label: "School Bus", height: 48, delay: "0s", cordColor: "#FBBF24" },
      { type: "car", label: "Car", height: 52, delay: "0.7s", cordColor: "#F43F5E" },
      { type: "star", label: "Campus Star", height: 40, delay: "1.5s", cordColor: "#FBBF24" },
      { type: "airplane", label: "Flyer", height: 48, delay: "0.5s", cordColor: "#0284C7" },
      { type: "kite", label: "Play", height: 44, delay: "1.8s", cordColor: "#10B981" },
      { type: "cloud", label: "Cloud", height: 50, delay: "2.1s", cordColor: "#BAE6FD", hiddenMobile: true },
      { type: "puzzle", label: "Puzzle", height: 44, delay: "1.2s", cordColor: "#8B5CF6", hiddenMobile: true },
    ],
    safety: [
      { type: "shield", label: "Safe", height: 48, delay: "0s", cordColor: "#3B82F6" },
      { type: "star", label: "Clean", height: 54, delay: "0.8s", cordColor: "#FBBF24" },
      { type: "heart", label: "Love", height: 42, delay: "1.5s", cordColor: "#F43F5E" },
      { type: "cloud", label: "Pure", height: 50, delay: "0.4s", cordColor: "#BAE6FD", hiddenMobile: true },
      { type: "apple", label: "Health", height: 58, delay: "2.1s", cordColor: "#EF4444", hiddenMobile: true },
      { type: "camera", label: "CCTV", height: 44, delay: "1.2s", cordColor: "#0284C7", hiddenMobile: true },
      { type: "flower", label: "Care", height: 46, delay: "2.5s", cordColor: "#10B981", hiddenMobile: true },
    ],
    teachers: [
      { type: "apple", label: "Mentor", height: 48, delay: "0s", cordColor: "#EF4444" },
      { type: "heart", label: "Care", height: 54, delay: "0.7s", cordColor: "#F43F5E" },
      { type: "book", label: "Story", height: 40, delay: "1.4s", cordColor: "#F59E0B" },
      { type: "star", label: "Inspire", height: 50, delay: "0.4s", cordColor: "#FBBF24", hiddenMobile: true },
      { type: "palette", label: "Create", height: 58, delay: "2.0s", cordColor: "#8B5CF6", hiddenMobile: true },
      { type: "block", letter: "T", color: "amber", height: 44, delay: "1.1s", cordColor: "#10B981", hiddenMobile: true },
      { type: "flower", label: "Nurture", height: 46, delay: "2.5s", cordColor: "#10B981", hiddenMobile: true },
    ],
    gallery: [
      { type: "camera", label: "Photo", height: 46, delay: "0s", cordColor: "#0284C7" },
      { type: "star", label: "Smile", height: 54, delay: "0.7s", cordColor: "#FBBF24" },
      { type: "palette", label: "Art", height: 42, delay: "1.5s", cordColor: "#F43F5E" },
      { type: "pinwheel", label: "Play", height: 50, delay: "0.5s", cordColor: "#38BDF8" },
      { type: "balloon", color: "rose", height: 44, delay: "1.9s", cordColor: "#FB7185" },
      { type: "kite", label: "Cheer", height: 58, delay: "2.2s", cordColor: "#10B981", hiddenMobile: true },
      { type: "heart", label: "Love", height: 46, delay: "1.2s", cordColor: "#F43F5E", hiddenMobile: true },
    ],
    testimonials: [
      { type: "heart", label: "Love", height: 48, delay: "0s", cordColor: "#F43F5E" },
      { type: "letter", label: "Note", height: 54, delay: "0.8s", cordColor: "#F59E0B" },
      { type: "star", label: "Gratitude", height: 42, delay: "1.6s", cordColor: "#FBBF24" },
      { type: "flower", label: "Joy", height: 50, delay: "0.5s", cordColor: "#10B981", hiddenMobile: true },
      { type: "balloon", color: "sky", height: 44, delay: "2.0s", cordColor: "#00A8E8", hiddenMobile: true },
      { type: "teddy", label: "Hugs", height: 56, delay: "1.3s", cordColor: "#EA580C", hiddenMobile: true },
      { type: "sun", label: "Warmth", height: 46, delay: "2.5s", cordColor: "#FBBF24", hiddenMobile: true },
    ],
    events: [
      { type: "balloon", color: "amber", height: 48, delay: "0s", cordColor: "#F59E0B" },
      { type: "star", label: "Party", height: 56, delay: "0.7s", cordColor: "#FBBF24" },
      { type: "music", label: "Sing", height: 42, delay: "1.5s", cordColor: "#8B5CF6" },
      { type: "kite", label: "Fest", height: 52, delay: "0.4s", cordColor: "#0284C7", hiddenMobile: true },
      { type: "rainbow", label: "Fun", height: 60, delay: "2.1s", cordColor: "#F43F5E", hiddenMobile: true },
      { type: "heart", label: "Family", height: 44, delay: "1.1s", cordColor: "#F43F5E", hiddenMobile: true },
      { type: "airplane", label: "Fly", height: 50, delay: "2.6s", cordColor: "#00A8E8", hiddenMobile: true },
    ],
    faq: [
      { type: "book", label: "Answers", height: 48, delay: "0s", cordColor: "#F59E0B" },
      { type: "star", label: "Clarity", height: 54, delay: "0.7s", cordColor: "#FBBF24" },
      { type: "puzzle", label: "Solve", height: 42, delay: "1.5s", cordColor: "#3B82F6" },
      { type: "cloud", label: "Peace", height: 50, delay: "0.4s", cordColor: "#BAE6FD", hiddenMobile: true },
      { type: "heart", label: "Care", height: 58, delay: "2.0s", cordColor: "#F43F5E", hiddenMobile: true },
      { type: "block", letter: "?", color: "emerald", height: 44, delay: "1.1s", cordColor: "#10B981", hiddenMobile: true },
      { type: "teddy", label: "Comfort", height: 46, delay: "2.4s", cordColor: "#EA580C", hiddenMobile: true },
    ],
    contact: [
      { type: "rainbow", label: "Welcome", height: 48, delay: "0s", cordColor: "#F59E0B" },
      { type: "star", label: "Enroll", height: 54, delay: "0.8s", cordColor: "#FBBF24" },
      { type: "balloon", color: "rose", height: 40, delay: "1.5s", cordColor: "#F43F5E" },
      { type: "kite", label: "Visit", height: 50, delay: "0.4s", cordColor: "#0284C7", hiddenMobile: true },
      { type: "airplane", label: "Tour", height: 58, delay: "2.1s", cordColor: "#10B981", hiddenMobile: true },
      { type: "heart", label: "Join Us", height: 44, delay: "1.2s", cordColor: "#FB7185", hiddenMobile: true },
      { type: "bus", label: "Campus", height: 46, delay: "2.6s", cordColor: "#FBBF24", hiddenMobile: true },
    ],
  };

  const canopyToys = items || themeMap[theme] || themeMap.hero;

  return (
    <div className={`absolute top-0 left-0 right-0 w-full pointer-events-none select-none z-20 overflow-visible ${className}`}>
      {/* Curved Suspension Garland / Illustrated Rope across the top */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <svg
          viewBox="0 0 800 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-5 sm:h-7 opacity-85"
          preserveAspectRatio="none"
        >
          <path
            d="M0,6 Q400,22 800,8"
            stroke={ropeColor}
            strokeWidth="2.5"
            strokeDasharray="6 4"
            fill="none"
          />
        </svg>
      </div>

      {/* Hanging Toys Array */}
      <VannamHangingToys items={canopyToys} containerHeight="h-24 sm:h-32" congested={congested} />
    </div>
  );
}

// ============================================================================
// 7. SPECIAL COMPONENT 2: ABOUT "Hanging Classroom Mobile"
// ============================================================================

export function HangingClassroomMobile() {
  return (
    <div className="relative mx-auto w-full max-w-sm sm:max-w-md py-2 pointer-events-none select-none" aria-hidden="true">
      {/* Mobile Top Star Bar */}
      <div className="flex flex-col items-center">
        {/* Top hanging anchor star */}
        <div className="animate-bounce-gentle">
          <HangingStarIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        {/* Central suspension cord */}
        <div className="w-[1.5px] h-6 bg-amber-400" />

        {/* Horizontal Mobile Bar */}
        <div className="w-56 sm:w-72 h-[2.5px] bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 rounded-full shadow-2xs relative">
          {/* Sub-hangers */}
          {/* Left: Cloud */}
          <div className="absolute left-2 top-0 flex flex-col items-center animate-pendulum origin-top">
            <div className="w-[1px] h-8 bg-amber-300" />
            <div className="p-1 rounded-xl bg-white/90 border border-sky-200 shadow-2xs">
              <HangingCloudIcon className="w-6 h-5" />
            </div>
          </div>

          {/* Center-Left: Rainbow */}
          <div className="absolute left-16 sm:left-20 top-0 flex flex-col items-center animate-pendulum-reverse origin-top" style={{ animationDelay: "0.6s" }}>
            <div className="w-[1px] h-12 bg-rose-300" />
            <div className="p-1 rounded-xl bg-white/90 border border-rose-200 shadow-2xs">
              <HangingRainbowIcon className="w-6 h-5" />
            </div>
          </div>

          {/* Center: Open Book */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center animate-pendulum-slow origin-top" style={{ animationDelay: "1.2s" }}>
            <div className="w-[1px] h-16 bg-amber-400" />
            <div className="p-1.5 rounded-xl bg-white/95 border border-amber-300 shadow-xs flex items-center gap-1">
              <span className="text-xs">📚</span>
              <span className="text-[9px] font-black text-amber-900 uppercase">Story</span>
            </div>
          </div>

          {/* Center-Right: Teddy */}
          <div className="absolute right-16 sm:right-20 top-0 flex flex-col items-center animate-pendulum origin-top" style={{ animationDelay: "0.9s" }}>
            <div className="w-[1px] h-10 bg-amber-300" />
            <div className="p-1 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
              <span className="text-sm">🧸</span>
            </div>
          </div>

          {/* Right: Star */}
          <div className="absolute right-2 top-0 flex flex-col items-center animate-pendulum-reverse origin-top" style={{ animationDelay: "1.5s" }}>
            <div className="w-[1px] h-7 bg-sky-300" />
            <div className="p-1 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
              <HangingStarIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. SPECIAL COMPONENT 3: PROGRAMS "Floating Toy Orbit"
// ============================================================================

export function FloatingToyOrbit({ programKey = "playgroup" }) {
  // 2-3 playful objects tailored per age group
  const orbitSets = {
    playgroup: [
      { icon: "🧸", pos: "-top-3 -right-2", anim: "animate-float", label: "Teddy" },
      { icon: "🚗", pos: "-bottom-2 -left-2", anim: "animate-float-reverse", label: "Toy Car" },
      { icon: "⚽", pos: "top-1/2 -right-3", anim: "animate-wiggle", label: "Soft Ball" },
    ],
    nursery: [
      { icon: "🖍️", pos: "-top-3 -left-2", anim: "animate-float", label: "Crayon" },
      { icon: "🎨", pos: "-bottom-2 -right-2", anim: "animate-float-reverse", label: "Paintbrush" },
      { icon: "📖", pos: "top-1/2 -left-3", anim: "animate-bounce-gentle", label: "Picture Book" },
    ],
    lkg: [
      { icon: "🔢", pos: "-top-3 -right-2", anim: "animate-float", label: "Numbers" },
      { icon: "🧩", pos: "-bottom-2 -left-2", anim: "animate-wiggle", label: "Puzzle" },
      { icon: "📐", pos: "top-1/2 -right-3", anim: "animate-float-reverse", label: "Shapes" },
    ],
    ukg: [
      { icon: "🔬", pos: "-top-3 -left-2", anim: "animate-float", label: "Science" },
      { icon: "🔤", pos: "-bottom-2 -right-2", anim: "animate-float-reverse", label: "Letters" },
      { icon: "🧱", pos: "top-1/2 -left-3", anim: "animate-bounce-gentle", label: "Blocks" },
    ],
  };

  const currentOrbit = orbitSets[programKey] || orbitSets.playgroup;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10" aria-hidden="true">
      {currentOrbit.map((item, idx) => (
        <div
          key={idx}
          className={`absolute ${item.pos} ${item.anim} flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-amber-200 shadow-sm text-sm sm:text-base`}
        >
          <span>{item.icon}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 9. SPECIAL COMPONENT 4: LEARNING "Learning Adventure Path"
// ============================================================================

export function LearningAdventurePath() {
  const milestones = [
    {
      step: "01",
      title: "DISCOVER",
      toy: "🔍",
      desc: "Sensory curiosity & wonder",
      color: "bg-amber-100 text-amber-900 border-amber-300",
      hanging: "📚 Book"
    },
    {
      step: "02",
      title: "PLAY",
      toy: "🧸",
      desc: "Social joy & sharing",
      color: "bg-rose-100 text-rose-900 border-rose-300",
      hanging: "🧩 Puzzle"
    },
    {
      step: "03",
      title: "CREATE",
      toy: "🎨",
      desc: "Art, rhythms & imagination",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300",
      hanging: "🔤 ABC Blocks"
    },
    {
      step: "04",
      title: "LEARN",
      toy: "💡",
      desc: "Early phonics & numeracy",
      color: "bg-sky-100 text-sky-900 border-sky-300",
      hanging: "🔢 123 Blocks"
    },
    {
      step: "05",
      title: "GROW",
      toy: "🌱",
      desc: "Confidence & school readiness",
      color: "bg-purple-100 text-purple-900 border-purple-300",
      hanging: "⭐ Star"
    },
  ];

  return (
    <div className="relative py-6 sm:py-10 max-w-5xl mx-auto px-4">
      {/* Overhead Hanging Learning Tools Mobile */}
      <div className="flex justify-around items-start mb-6 pointer-events-none select-none">
        {milestones.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center animate-pendulum origin-top" style={{ animationDelay: `${idx * 0.5}s` }}>
            <div className="w-[1.5px] h-8 sm:h-12 bg-amber-300" />
            <div className="px-2 py-1 rounded-full bg-white/95 border border-amber-200 shadow-xs text-[9.5px] sm:text-[11px] font-black text-amber-950 flex items-center gap-1">
              <span>{m.hanging}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Journey Road / Connected Stepping Stones */}
      <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 z-10">
        {milestones.map((m, idx) => (
          <div
            key={idx}
            className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 shadow-xs transition-all hover:-translate-y-1 hover:shadow-md ${m.color} flex flex-col justify-between space-y-2`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl">{m.toy}</span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/80">
                {m.step}
              </span>
            </div>
            <div>
              <h4 className="font-heading font-black text-xs sm:text-sm tracking-wide">{m.title}</h4>
              <p className="text-[10.5px] sm:text-xs opacity-85 leading-snug">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 10. SPECIAL COMPONENT 5: ACTIVITIES "Ceiling Toy Collection"
// ============================================================================

export function CeilingToyCollection() {
  const ceilingToys = [
    { type: "teddy", height: 56, delay: "0s" },
    { type: "kite", height: 68, delay: "0.7s" },
    { type: "block", letter: "1", height: 46, delay: "1.4s" },
    { type: "star", height: 60, delay: "2.1s" },
    { type: "airplane", height: 52, delay: "0.9s", hiddenMobile: true },
    { type: "block", letter: "2", height: 48, delay: "1.8s", hiddenMobile: true },
    { type: "balloon", color: "emerald", height: 64, delay: "2.5s" },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none select-none z-20">
      <VannamHangingToys items={ceilingToys} containerHeight="h-20 sm:h-24" />
    </div>
  );
}

// ============================================================================
// 11. SPECIAL COMPONENT 6: CHILD DEVELOPMENT "Growing Little Minds"
// ============================================================================

export function GrowingLittleMindsMobile() {
  return (
    <div className="relative py-4 pointer-events-none select-none">
      {/* Hanging Growth Mobile: Star, Heart, Lightbulb, Book, Puzzle */}
      <div className="flex justify-center items-start gap-4 sm:gap-8">
        <div className="flex flex-col items-center animate-pendulum origin-top">
          <div className="w-[1.5px] h-7 bg-amber-300" />
          <div className="p-1.5 rounded-full bg-white border border-amber-200 shadow-2xs text-xs">⭐</div>
        </div>
        <div className="flex flex-col items-center animate-pendulum-reverse origin-top" style={{ animationDelay: "0.5s" }}>
          <div className="w-[1.5px] h-10 bg-rose-300" />
          <div className="p-1.5 rounded-full bg-white border border-rose-200 shadow-2xs text-xs">❤️</div>
        </div>
        <div className="flex flex-col items-center animate-pendulum-slow origin-top" style={{ animationDelay: "1s" }}>
          <div className="w-[1.5px] h-12 bg-amber-400" />
          <div className="p-1.5 rounded-full bg-white border border-amber-300 shadow-2xs text-xs">💡</div>
        </div>
        <div className="flex flex-col items-center animate-pendulum origin-top" style={{ animationDelay: "1.5s" }}>
          <div className="w-[1.5px] h-9 bg-sky-300" />
          <div className="p-1.5 rounded-full bg-white border border-sky-200 shadow-2xs text-xs">📚</div>
        </div>
        <div className="flex flex-col items-center animate-pendulum-reverse origin-top" style={{ animationDelay: "0.8s" }}>
          <div className="w-[1.5px] h-7 bg-emerald-300" />
          <div className="p-1.5 rounded-full bg-white border border-emerald-200 shadow-2xs text-xs">🧩</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 12. SPECIAL COMPONENT 7: WHY VANNAM "Trust Garden Illustration"
// ============================================================================

export function TrustGardenIllustration() {
  return (
    <div className="relative mx-auto max-w-xs sm:max-w-sm p-4 text-center pointer-events-none select-none">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/95 border-2 border-emerald-200 shadow-sm backdrop-blur-md">
        <VannamChildCharacter type="reading" className="w-12 h-12" />
        <div className="text-left">
          <div className="flex items-center gap-1 text-[11px] font-black text-emerald-800 uppercase tracking-wider">
            <span>🛡️ Safe Sanctuary</span>
          </div>
          <p className="text-[10px] text-slate-600 font-medium">Child + Loving Teacher + Vannam School</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 13. SPECIAL COMPONENT 8: GALLERY "Hanging Photo Clips"
// ============================================================================

export function HangingPhotoClips() {
  return (
    <div className="relative w-full py-3 pointer-events-none select-none" aria-hidden="true">
      {/* Clothesline Cord */}
      <div className="w-full h-[2px] bg-amber-700/60 relative">
        <div className="flex justify-around items-start -mt-1 px-6">
          {[
            { tag: "Art Hour", icon: "📸" },
            { tag: "Playtime", icon: "🧸" },
            { tag: "Science Fun", icon: "🌱" },
            { tag: "Story Time", icon: "📖" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center animate-pendulum origin-top ${idx > 2 ? "hidden sm:flex" : "flex"}`}
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              {/* Wooden Peg / Clip */}
              <div className="w-3 h-5 bg-amber-200 border border-amber-600 rounded-xs shadow-2xs z-10" />
              {/* String */}
              <div className="w-[1px] h-4 bg-amber-700/60" />
              {/* Polaroid Badge Tag */}
              <div className="px-2.5 py-1 rounded-lg bg-white border-2 border-slate-200 shadow-sm text-[10px] font-black text-slate-800 flex items-center gap-1 -mt-0.5">
                <span>{item.icon}</span>
                <span>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 14. SPECIAL COMPONENT 9: TESTIMONIALS "Hanging Heart Mobile"
// ============================================================================

export function HangingHeartMobile() {
  const hearts = [
    { icon: "❤️", height: 42, delay: "0s" },
    { icon: "⭐", height: 56, delay: "0.6s" },
    { icon: "💛", height: 38, delay: "1.2s" },
    { icon: "🌈", height: 50, delay: "1.8s" },
    { icon: "☁️", height: 44, delay: "0.9s" },
  ];

  return (
    <div className="relative mx-auto flex justify-center items-start gap-4 sm:gap-6 py-2 pointer-events-none select-none" aria-hidden="true">
      {hearts.map((h, i) => (
        <div key={i} className="flex flex-col items-center animate-pendulum origin-top" style={{ animationDelay: h.delay }}>
          <div className="w-[1.2px] bg-rose-300" style={{ height: `${h.height}px` }} />
          <div className="p-1 rounded-full bg-white/95 border border-rose-200 shadow-2xs text-xs sm:text-sm">
            {h.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 15. SPECIAL COMPONENT 10: CAMPUS "Mini Hanging Playground"
// ============================================================================

export function MiniHangingPlayground() {
  const toys = [
    { type: "kite", height: 46, delay: "0s" },
    { type: "airplane", height: 54, delay: "0.8s" },
    { type: "star", height: 42, delay: "1.5s" },
    { type: "balloon", color: "amber", height: 50, delay: "0.4s" },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none select-none z-20">
      <VannamHangingToys items={toys} containerHeight="h-16 sm:h-20" />
    </div>
  );
}

// ============================================================================
// 16. SPECIAL COMPONENT 11: CTA "Celebration Mobile"
// ============================================================================

export function CelebrationMobile() {
  const celebrationItems = [
    { type: "star", height: 48, delay: "0s" },
    { type: "balloon", color: "rose", height: 60, delay: "0.7s" },
    { type: "rainbow", height: 42, delay: "1.3s" },
    { type: "balloon", color: "sky", height: 58, delay: "0.5s" },
    { type: "star", height: 44, delay: "1.8s" },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none select-none z-20">
      <VannamHangingToys items={celebrationItems} containerHeight="h-18 sm:h-22" />
    </div>
  );
}

// ============================================================================
// 17. SPECIAL COMPONENT 12: FOOTER "Nighttime Hanging Mobile"
// ============================================================================

export function NighttimeHangingMobile() {
  const nighttimeItems = [
    { type: "moon", height: 52, delay: "0s" },
    { type: "star", height: 40, delay: "1.2s" },
    { type: "cloud", height: 48, delay: "2.4s" },
    { type: "star", height: 38, delay: "0.6s" },
    { type: "moon", height: 46, delay: "1.8s", hiddenMobile: true },
  ];

  return (
    <div className="relative w-full py-2 pointer-events-none select-none" aria-hidden="true">
      <VannamHangingToys items={nighttimeItems} containerHeight="h-18 sm:h-22" />
    </div>
  );
}

// ============================================================================
// 18. VANNAM MAGIC INTRO (<VannamMagicIntro />)
// Opening non-blocking sequence (1.5-2.2s max)
// ============================================================================

export function VannamMagicIntro() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("vannam_intro_seen")) {
      setDismissed(true);
      return;
    }

    const t1 = setTimeout(() => setStep(1), 180);  // 1. Cloud drifts in
    const t2 = setTimeout(() => setStep(2), 450);  // 2. Star appears
    const t3 = setTimeout(() => setStep(3), 800);  // 3. Crayon rainbow draws
    const t4 = setTimeout(() => setStep(4), 1150); // 4. VANNAM logo reveals
    const t5 = setTimeout(() => setStep(5), 1450); // 5. Hanging toys appear
    const t6 = setTimeout(() => {                  // 6. Hero content fades up
      setStep(6);
      setTimeout(() => {
        setDismissed(true);
        window.sessionStorage.setItem("vannam_intro_seen", "1");
      }, 450);
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  if (dismissed) return null;

  return (
    <div
      onClick={() => {
        setDismissed(true);
        if (typeof window !== "undefined") window.sessionStorage.setItem("vannam_intro_seen", "1");
      }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#F0F9FF] via-[#FFFDF8] to-[#FFFDF8] transition-opacity duration-400 cursor-pointer overflow-hidden ${step === 6 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      aria-label="Welcome intro animation - tap to skip"
    >
      {/* 1. Cloud drifts in */}
      <div className={`transition-all duration-700 ease-out transform ${step >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
        <HangingCloudIcon className="w-14 h-9 text-sky-400 drop-shadow-xs" />
      </div>

      {/* 2. Small Star appears */}
      <div className={`absolute top-1/4 right-1/4 transition-all duration-500 transform ${step >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
        <HangingStarIcon className="w-6 h-6" />
      </div>

      {/* 3. Crayon Rainbow line draws */}
      <div className={`my-2.5 transition-all duration-600 ${step >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <svg viewBox="0 0 160 44" className="w-32 h-10">
          <path d="M 10 40 Q 80 8 150 40" stroke="#F43F5E" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeDasharray="180" className={step >= 3 ? "animate-[draw-rainbow-arc_0.8s_ease-out_forwards]" : "opacity-0"} />
          <path d="M 16 42 Q 80 14 144 42" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="180" className={step >= 3 ? "animate-[draw-rainbow-arc_0.9s_ease-out_forwards]" : "opacity-0"} />
          <path d="M 22 44 Q 80 20 138 44" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="180" className={step >= 3 ? "animate-[draw-rainbow-arc_1s_ease-out_forwards]" : "opacity-0"} />
        </svg>
      </div>

      {/* 4. VANNAM logo reveals */}
      <div className={`flex flex-col items-center gap-1 transition-all duration-500 transform ${step >= 4 ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}>
        <img src="/logo.png" alt="Vannam Playschool" className="h-11 sm:h-13 w-auto object-contain" />
        <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-[#0F2963]">A Little World of Childhood</span>
      </div>

      {/* 5. Hanging toys drop in */}
      <div className={`flex items-start gap-6 mt-3 transition-all duration-400 transform ${step >= 5 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
        <div className="flex flex-col items-center animate-pendulum origin-top">
          <div className="w-[1.5px] h-5 bg-amber-400" />
          <span className="text-base">🧸</span>
        </div>
        <div className="flex flex-col items-center animate-pendulum-reverse origin-top" style={{ animationDelay: "0.2s" }}>
          <div className="w-[1.5px] h-7 bg-sky-400" />
          <HangingStarIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="absolute bottom-5 text-[10px] text-slate-400 font-semibold tracking-wide">
        Tap or scroll to enter
      </div>
    </div>
  );
}

// ============================================================================
// 19. ABOUT STORYBOOK REVEAL (<VannamStorybookCorner />)
// Chapter 01 — Where Learning Begins
// ============================================================================

export function VannamStorybookCorner({
  title = "Building a Safe & Inspiring Foundation",
  subtitle = "Combining Montessori exploration with early STEAM inquiry, structured around your child's natural curiosity and comfort.",
  image,
  children
}) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const [currentSrc, setCurrentSrc] = useState(image || "/about-kids.jpg");

  useEffect(() => {
    if (image) setCurrentSrc(image);
  }, [image]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto px-3 sm:px-6 py-2">
      {/* Max 1 Hanging Star or Cloud on mobile */}
      <div className="absolute -top-3 right-4 sm:right-10 pointer-events-none select-none z-10 animate-pendulum origin-top">
        <div className="w-[1.5px] h-6 bg-amber-300" />
        <div className="p-1 rounded-xl bg-white/90 border border-amber-200 shadow-2xs">
          <HangingStarIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Chapter 01 Storybook Header Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-[#0F2963] text-[11px] font-extrabold tracking-wider uppercase shadow-2xs">
          <span>📖 Chapter 01 — Where Learning Begins</span>
        </div>

        {/* Heading with smooth upward fade */}
        <h2 className={`font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963] leading-tight transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {title}
        </h2>

        {/* Tiny Crayon Stroke Underline */}
        <div className="flex justify-center my-1">
          <svg viewBox="0 0 140 10" className="w-28 sm:w-36 h-2">
            <path
              d="M 4 5 Q 70 8 136 5"
              stroke="#F59E0B"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="140"
              className={inView ? "animate-[draw-crayon-stroke_0.8s_ease-out_forwards]" : "opacity-0"}
            />
          </svg>
        </div>

        {/* Paragraph fades upward */}
        <p className={`text-xs sm:text-sm text-[#334155] max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          {subtitle}
        </p>
      </div>

      {/* Image Organic Clip Mask on Mobile */}
      <div className={`relative mx-auto w-full max-w-xs sm:max-w-md my-4 rounded-3xl overflow-hidden border-2 border-white shadow-md bg-white aspect-[16/10] transition-all duration-800 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <Image
          src={currentSrc}
          alt="Children learning in a warm preschool classroom"
          fill
          sizes="(max-width: 640px) 300px, 480px"
          className="object-cover"
          onError={() => setCurrentSrc("/hero-kids.jpg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091A42]/60 via-transparent to-transparent" />
        <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-bold flex items-center gap-1.5">
          <span>🌱 Montessori & STEAM Exploration</span>
        </div>
      </div>

      {children}
    </div>
  );
}

// ============================================================================
// 20. PROGRAMS LITTLE WORLDS (<VannamLittleWorlds />)
// Vertically stacked mobile cards with unique micro-animations on viewport entry
// ============================================================================

export function VannamLittleWorlds({ programsData, activeProgramTab, onSelectTab }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const programKeys = ["playgroup", "nursery", "lkg", "ukg"];

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto px-3 sm:px-6">
      {/* Vertically stacked on mobile (flex-col), expanding to responsive grid on md+ */}
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {programKeys.map((key, idx) => {
          const prog = programsData[key];
          if (!prog) return null;
          const isSelected = activeProgramTab === key;

          return (
            <div
              key={key}
              onClick={() => onSelectTab && onSelectTab(key)}
              className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between ${isSelected ? "ring-2 ring-vannam-yellow shadow-md" : "hover:shadow-xs"} ${prog.cardStyle} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              <div>
                {/* Header with Title & Age */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-heading text-base sm:text-lg font-black text-[#0F2963]">
                    {prog.title}
                  </h3>
                  <span className={`text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full border ${prog.badgeBg}`}>
                    {prog.age}
                  </span>
                </div>

                <p className="text-[11.5px] sm:text-xs text-[#334155] leading-relaxed mb-3">
                  {prog.description}
                </p>

                {/* UNIQUE MICRO-ANIMATION PER CARD */}
                <div className="my-2 p-2.5 rounded-xl bg-white/80 border border-slate-100 flex items-center justify-center min-h-[50px]">
                  {/* PLAYGROUP: Small Teddy Gently Rocks */}
                  {key === "playgroup" && (
                    <div className="flex items-center gap-2">
                      <div className="text-2xl animate-teddy-rock origin-bottom">🧸</div>
                      <span className="text-[10px] font-bold text-amber-800">Playful Sensory Wonder</span>
                    </div>
                  )}

                  {/* NURSERY: Crayon Draws a Tiny Playful Line */}
                  {key === "nursery" && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">🖍️</span>
                        <svg viewBox="0 0 100 12" className="w-24 h-3">
                          <path d="M 4 6 Q 50 1 96 6" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="100" className={inView ? "animate-[draw-crayon-stroke_1s_ease-out_forwards]" : "opacity-0"} />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-rose-800">First Creative Expressions</span>
                    </div>
                  )}

                  {/* LKG: Wooden Alphabet Blocks Gently Slide Into Position */}
                  {key === "lkg" && (
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 transition-all duration-700 ${inView ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"}`}>
                        <div className="w-6 h-6 rounded-md bg-amber-400 text-[#0F2963] font-black text-xs flex items-center justify-center shadow-2xs border border-amber-500">A</div>
                        <div className="w-6 h-6 rounded-md bg-rose-400 text-white font-black text-xs flex items-center justify-center shadow-2xs border border-rose-500">B</div>
                        <div className="w-6 h-6 rounded-md bg-sky-400 text-white font-black text-xs flex items-center justify-center shadow-2xs border border-sky-500">C</div>
                      </div>
                      <span className="text-[10px] font-bold text-sky-800">Phonics & Early Words</span>
                    </div>
                  )}

                  {/* UKG: Number Blocks Appear One After Another */}
                  {key === "ukg" && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className={`w-6 h-6 rounded-md bg-emerald-400 text-white font-black text-xs flex items-center justify-center shadow-2xs border border-emerald-500 transition-all duration-400 delay-100 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>1</div>
                        <div className={`w-6 h-6 rounded-md bg-amber-400 text-white font-black text-xs flex items-center justify-center shadow-2xs border border-amber-500 transition-all duration-400 delay-300 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>2</div>
                        <div className={`w-6 h-6 rounded-md bg-purple-400 text-white font-black text-xs flex items-center justify-center shadow-2xs border border-purple-500 transition-all duration-400 delay-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>3</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800">School-Ready Math</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Ratio & Objectives Preview */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-700">
                <span>{prog.ratio}</span>
                <span className="text-vannam-orange">Explore →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 21. LEARNING ADVENTURE PATH (<VannamLearningAdventurePath />)
// Mobile: Vertical curved winding path (DISCOVER ↓ PLAY ↓ CREATE ↓ LEARN ↓ GROW)
// Progressive SVG path draw as user scrolls
// ============================================================================

export function VannamLearningAdventurePath() {
  const [activeStep, setActiveStep] = useState(0);
  const pathRef = useRef(null);

  const steps = [
    {
      id: "discover",
      title: "DISCOVER",
      icon: "🔍",
      label: "Sensory curiosity & wonder",
      color: "border-amber-400 bg-amber-50 text-amber-900",
      accent: "#F59E0B"
    },
    {
      id: "play",
      title: "PLAY",
      icon: "⚽",
      label: "Social joy, sharing & smiles",
      color: "border-rose-400 bg-rose-50 text-rose-900",
      accent: "#F43F5E"
    },
    {
      id: "create",
      title: "CREATE",
      icon: "🖍️",
      label: "Art, rhythms & imagination",
      color: "border-emerald-400 bg-emerald-50 text-emerald-900",
      accent: "#10B981"
    },
    {
      id: "learn",
      title: "LEARN",
      icon: "📖",
      label: "Phonics, early numbers & questions",
      color: "border-sky-400 bg-sky-50 text-sky-900",
      accent: "#00A8E8"
    },
    {
      id: "grow",
      title: "GROW",
      icon: "🌱",
      label: "Confidence, kindness & readiness",
      color: "border-purple-400 bg-purple-50 text-purple-900",
      accent: "#8B5CF6"
    },
  ];

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Incrementally reveal milestones
        steps.forEach((_, i) => {
          setTimeout(() => setActiveStep(prev => Math.max(prev, i + 1)), i * 250);
        });
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [steps.length]);

  return (
    <div ref={pathRef} className="relative w-full max-w-md md:max-w-4xl mx-auto px-3 sm:px-6 py-4">
      {/* Mobile Vertical Curved Adventure Road */}
      <div className="relative flex flex-col space-y-4">
        {/* Subtle connecting vertical guideline */}
        <div className="absolute left-6 top-6 bottom-6 w-1 bg-gradient-to-b from-amber-300 via-rose-300 via-emerald-300 via-sky-300 to-purple-300 rounded-full opacity-60 md:hidden pointer-events-none" />

        {steps.map((s, idx) => {
          const isReached = activeStep > idx;
          return (
            <div
              key={s.id}
              className={`flex items-center gap-3.5 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 relative z-10 ${s.color} ${isReached ? "opacity-100 translate-x-0 shadow-xs" : "opacity-40 -translate-x-2"}`}
            >
              {/* Milestone Icon Avatar */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-xs text-xl sm:text-2xl shrink-0 border-2 transition-transform duration-300 ${isReached ? "scale-100" : "scale-90"}`} style={{ borderColor: s.accent }}>
                <span>{s.icon}</span>
              </div>

              {/* Milestone Text Details */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-xs sm:text-sm tracking-wide text-[#0F2963]">
                    {s.title}
                  </h4>
                  <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full bg-white/90 shadow-2xs">
                    Step 0{idx + 1}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs opacity-90 leading-tight mt-0.5 font-medium">
                  {s.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// 22. PUZZLE TRANSITION (<VannamPuzzleTransition />)
// 2-3 gentle puzzle pieces connecting without blocking content
// ============================================================================

export function VannamPuzzleTransition() {
  const [connected, setConnected] = useState(false);
  const puzzleRef = useRef(null);

  useEffect(() => {
    const el = puzzleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setConnected(true);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={puzzleRef} className="relative py-4 flex flex-col items-center justify-center pointer-events-none select-none" aria-hidden="true">
      <div className="flex items-center gap-1">
        {/* Piece 1: Rose */}
        <div className={`transition-all duration-700 ease-out transform ${connected ? "translate-x-0 rotate-0 opacity-95" : "-translate-x-4 rotate-6 opacity-0"}`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-400 border border-rose-600 flex items-center justify-center text-white text-xs shadow-2xs">
            🧩
          </div>
        </div>

        {/* Piece 2: Amber */}
        <div className={`transition-all duration-700 ease-out delay-150 transform ${connected ? "translate-y-0 rotate-0 opacity-95" : "translate-y-3 -rotate-8 opacity-0"}`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400 border border-amber-600 flex items-center justify-center text-[#0F2963] text-xs font-bold shadow-2xs">
            ⭐
          </div>
        </div>

        {/* Piece 3: Sky */}
        <div className={`transition-all duration-700 ease-out delay-300 transform ${connected ? "translate-x-0 rotate-0 opacity-95" : "translate-x-4 rotate-6 opacity-0"}`}>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-400 border border-sky-600 flex items-center justify-center text-white text-xs shadow-2xs">
            🌱
          </div>
        </div>
      </div>
      <span className="text-[10px] text-slate-400 font-bold tracking-wider mt-1">Every experience builds the child</span>
    </div>
  );
}

// ============================================================================
// 23. ACTIVITIES PLAYGROUND (<VannamActivityPlayground />)
// Mobile activity cards with ONE unique micro-animation entering viewport
// ============================================================================

export function VannamActivityPlayground({ activities = [] }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const defaultCards = [
    { title: "ART & CRAFT", type: "art", icon: "🎨", animDesc: "paint stroke draws", color: "card-rose" },
    { title: "MUSIC & RHYTHM", type: "music", icon: "🎵", animDesc: "music note gently floats", color: "card-purple" },
    { title: "SPORTS & MOTOR", type: "sports", icon: "⚽", animDesc: "ball rolls a short distance", color: "card-emerald" },
    { title: "STORYBOOK READING", type: "reading", icon: "📚", animDesc: "book opens slightly", color: "card-amber" },
    { title: "NATURE & BOTANY", type: "nature", icon: "🌸", animDesc: "flower blooms gently", color: "card-green" },
    { title: "CREATIVITY & PUZZLES", type: "creativity", icon: "🧩", animDesc: "puzzle piece connects", color: "card-sky" },
  ];

  const cards = activities.length > 0 ? activities : defaultCards;

  const scrollTrack = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-3 sm:px-6">
      {/* Track Header with Mobile Swipe Hint and Arrow Controls */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-[11px] sm:text-xs font-bold text-[#64748B] flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-vannam-yellow animate-pulse" />
          <span>Interactive Play Areas ({cards.length})</span>
          <span className="lg:hidden text-[10px] text-amber-600 font-extrabold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full ml-1">
            Swipe ➔
          </span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scrollTrack("left")}
            aria-label="Scroll left"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-amber-50 active:scale-90 transition-all cursor-pointer"
          >
            ‹
          </button>
          <button
            onClick={() => scrollTrack("right")}
            aria-label="Scroll right"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-amber-50 active:scale-90 transition-all cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Cards Grid Track */}
      <div
        ref={scrollRef}
        className="flex lg:grid lg:grid-cols-6 gap-3 sm:gap-3.5 overflow-x-auto lg:overflow-visible pb-3 pt-1 px-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className={`w-[155px] xs:w-[170px] sm:w-[190px] lg:w-auto shrink-0 snap-start p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 transition-all duration-500 bg-white ${c.color || "card-amber"} ${inView ? "opacity-100 translate-y-0 shadow-xs" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl">{c.icon}</span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-500 bg-white/90 px-1.5 py-0.5 rounded-md border border-slate-100">Play</span>
            </div>
            <h4 className="font-heading font-black text-xs sm:text-sm text-[#0F2963] mb-1 line-clamp-2 leading-tight min-h-[2rem]">
              {c.title}
            </h4>

            {/* Viewport Micro-Animation */}
            <div className="my-1.5 h-7 flex items-center justify-center rounded-lg bg-white/80 border border-slate-100 overflow-hidden">
              {c.type === "art" && (
                <svg viewBox="0 0 80 12" className="w-16 h-2.5">
                  <path d="M 2 6 Q 40 1 78 6" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="80" className={inView ? "animate-[draw-crayon-stroke_0.8s_ease-out_forwards]" : "opacity-0"} />
                </svg>
              )}
              {c.type === "music" && (
                <div className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                  <span className="text-sm">🎶</span>
                </div>
              )}
              {c.type === "sports" && (
                <div className={`transition-all duration-700 ${inView ? "translate-x-3 rotate-45" : "-translate-x-3 rotate-0"}`}>
                  <span className="text-xs">⚽</span>
                </div>
              )}
              {c.type === "reading" && (
                <div className={`transition-transform duration-500 ${inView ? "scale-105" : "scale-95"}`}>
                  <span className="text-xs">📖</span>
                </div>
              )}
              {c.type === "nature" && (
                <div className={`transition-all duration-600 ${inView ? "scale-110 opacity-100" : "scale-75 opacity-0"}`}>
                  <span className="text-xs">🌻</span>
                </div>
              )}
              {c.type === "creativity" && (
                <div className={`transition-all duration-500 ${inView ? "scale-105 opacity-100" : "scale-80 opacity-0"}`}>
                  <span className="text-xs">🧩</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 24. CHILD DEVELOPMENT (<VannamGrowingLittleMinds />)
// Mobile Signature Animation: Seed ↓ Sprout ↓ Plant ↓ Flower ↓ Tree
// Calm scroll-triggered SVG progression (triggers once, does not loop)
// ============================================================================

export function VannamGrowingLittleMinds() {
  const [stage, setStage] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Trigger progression once
        [0, 1, 2, 3, 4].forEach((s) => {
          setTimeout(() => setStage(s), s * 400);
        });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stages = [
    { name: "Seed", desc: "Sensory Curiosity", icon: "🌱", color: "#B45309" },
    { name: "Sprout", desc: "First Steps & Words", icon: "🌿", color: "#10B981" },
    { name: "Plant", desc: "Social Play & Sharing", icon: "🪴", color: "#047857" },
    { name: "Flower", desc: "Creative Confidence", icon: "🌸", color: "#F43F5E" },
    { name: "Tree", desc: "School Readiness", icon: "🌳", color: "#15803D" },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto px-4 py-4">
      <div className="p-4 rounded-3xl bg-white/95 border-2 border-emerald-200 shadow-sm text-center">
        <span className="text-[10.5px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full">
          🌱 Natural Child Development
        </span>

        {/* Dynamic Growth Illustration Stage */}
        <div className="my-4 h-24 flex items-center justify-center">
          <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-300 shadow-2xs transition-transform duration-500">
            <span className="text-4xl transition-transform duration-300 scale-100">
              {stages[stage].icon}
            </span>
          </div>
        </div>

        {/* Growth Stepper Dots */}
        <div className="flex justify-center items-center gap-2 mb-3">
          {stages.map((st, i) => (
            <div
              key={st.name}
              className={`h-2 rounded-full transition-all duration-300 ${i === stage ? "w-6 bg-emerald-600" : i < stage ? "w-2 bg-emerald-400" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <h4 className="font-heading font-black text-sm text-[#0F2963]">
          Stage 0{stage + 1}: {stages[stage].name}
        </h4>
        <p className="text-xs text-[#334155] font-medium mt-0.5">
          {stages[stage].desc}
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// 25. WHY VANNAM (<VannamTrustGarden />)
// Parent-focused: Shield, Heart, Teacher, Safe Environment, Learning, Care
// Scale 0.94 -> 1, Opacity 0 -> 1. No bouncing.
// ============================================================================

export function VannamTrustGarden() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const trustPillars = [
    { title: "Shielded Security", desc: "Monitored campus, secure check-in, verified safety", icon: "🛡️" },
    { title: "Loving Heart", desc: "Warm, empathetic teachers who nurture every emotion", icon: "❤️" },
    { title: "Certified Mentors", desc: "ECCED-trained early childhood educators", icon: "👩‍🏫" },
    { title: "Hygienic Space", desc: "Daily sanitized play zones and child-friendly materials", icon: "✨" },
    { title: "STEAM Curiosity", desc: "Montessori-inspired inquiry and problem-solving", icon: "💡" },
    { title: "Low Ratio Care", desc: "Individual attention for every single milestone", icon: "🤝" },
  ];

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-3 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {trustPillars.map((p, idx) => (
          <div
            key={idx}
            className={`p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-[#CBD8F6] shadow-xs transition-all duration-500 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-[0.94]"}`}
            style={{ transitionDelay: `${idx * 80}ms` }}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-lg mb-2 shadow-2xs">
              <span>{p.icon}</span>
            </div>
            <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963]">
              {p.title}
            </h4>
            <p className="text-[11px] text-[#334155] leading-snug mt-1 font-medium">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 26. TEACHERS (<VannamFriendlyFaces />)
// Teacher photo enters with organic shape reveal, text fades upward
// ============================================================================

export function VannamFriendlyFaces({ teachers = [] }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const defaultTeachers = [
    { name: "Priya Sharma", role: "Head of Early Learning", exp: "12+ Yrs", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { name: "Ananya Deshmukh", role: "Montessori Lead", exp: "8+ Yrs", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80" },
    { name: "Rahul Verma", role: "Physical & Motor Coach", exp: "6+ Yrs", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  ];

  const list = teachers.length > 0 ? teachers : defaultTeachers;

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-3 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {list.map((t, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-3xl bg-white border-2 border-amber-200/80 shadow-xs flex flex-col items-center text-center transition-all duration-600 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            {/* Organic Shape Photo Reveal */}
            <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-amber-300 shadow-md mb-3 transition-transform duration-500 ${inView ? "scale-100" : "scale-90"}`}>
              <Image
                src={t.img || t.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"}
                alt={t.name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>

            {/* Small decorative pencil / star */}
            <div className="text-xs mb-1">⭐</div>

            <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963]">
              {t.name}
            </h4>
            <p className="text-xs text-vannam-orange font-bold mt-0.5">
              {t.role}
            </p>
            <span className="text-[10px] text-slate-500 font-semibold mt-1">
              {t.exp || t.qual || "Certified Educator"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 27. GALLERY (<VannamLivingScrapbook />)
// Vertical mobile scrapbook with subtle photo tilt (-1deg, +1deg, -0.5deg), tape & crayon borders
// ============================================================================

export function VannamLivingScrapbook({ images = [] }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const defaultItems = [
    { title: "Morning Circle & Rhymes", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", tilt: "-rotate-1" },
    { title: "Little Hands Painting", img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80", tilt: "rotate-1" },
    { title: "Building Tall Towers", img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80", tilt: "-rotate-0.5" },
    { title: "Outdoor Garden Play", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", tilt: "rotate-0.5" },
  ];

  const list = images.length > 0 ? images : defaultItems;

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto px-3 sm:px-6">
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
        {list.map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl bg-white border-2 border-slate-200 shadow-sm relative transition-all duration-600 ${item.tilt || ""} ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
            style={{ transitionDelay: `${idx * 140}ms` }}
          >
            {/* Washi Paper Tape Sticker */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-amber-200/90 border border-amber-300 rounded-xs shadow-2xs z-10 rotate-1" />

            {/* Photo Container */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
              <Image
                src={item.img || item.image || item.src || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"}
                alt={item.title || item.alt || "School moment"}
                fill
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover"
              />
            </div>

            {/* Polaroid Caption */}
            <div className="pt-2 text-center">
              <span className="font-heading font-black text-xs text-[#0F2963]">
                {item.title || item.alt || "School moment"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 28. TESTIMONIALS (<VannamParentLetters />)
// Mobile signature envelope reveal: envelope opens slightly -> quote appears -> parent info
// ============================================================================

export function VannamParentLetters({ testimonials = [] }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const defaultTestimonial = {
    quote: "Vannam has been a second home for our daughter. The loving teachers and engaging Montessori routines transformed her confidence completely!",
    author: "Kavitha & Arvind",
    child: "Parents of Ananya (Nursery)",
  };

  const firstItem = testimonials.length > 0 ? testimonials[0] : null;
  const item = firstItem ? {
    quote: firstItem.quote || firstItem.text || defaultTestimonial.quote,
    author: firstItem.author || firstItem.parent || firstItem.name || defaultTestimonial.author,
    child: firstItem.child || firstItem.relation || firstItem.program || defaultTestimonial.child,
  } : defaultTestimonial;

  return (
    <div ref={containerRef} className="w-full max-w-lg mx-auto px-4 py-2">
      {/* Illustrated Envelope Container */}
      <div className={`relative p-5 sm:p-7 rounded-3xl bg-white border-2 border-rose-200 shadow-md transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

        {/* Envelope Top Flap Badge */}
        <div className="flex items-center justify-between border-b border-rose-100 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-800">
            <span>💌 A Letter from our Parents</span>
          </div>
          <div className={`transition-transform duration-500 ${inView ? "scale-110" : "scale-90"}`}>
            <span className="text-sm">❤️</span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-xs sm:text-sm text-[#334155] italic leading-relaxed mb-4">
          “{item.quote}”
        </blockquote>

        {/* Parent Attribution */}
        <div className="flex items-center justify-between pt-2 border-t border-rose-100">
          <div>
            <h5 className="font-heading font-black text-xs sm:text-sm text-[#0F2963]">
              {item.author}
            </h5>
            <p className="text-[10.5px] text-slate-500 font-semibold">
              {item.child}
            </p>
          </div>
          <span className="text-xs text-amber-400">⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 29. CAMPUS / SCHOOL WORLD (<VannamSchoolWorld />)
// Compact illustrated school environment (school, tree, cloud, flowers, playground)
// ============================================================================

export function VannamSchoolWorld() {
  return (
    <div className="relative w-full max-w-lg mx-auto px-4 py-3 pointer-events-none select-none" aria-hidden="true">
      <div className="p-4 rounded-3xl bg-gradient-to-b from-sky-50 via-amber-50/50 to-emerald-50/60 border-2 border-sky-200 shadow-xs flex items-center justify-around">
        {/* Soft Drifting Cloud */}
        <div className="animate-cloud-drift">
          <HangingCloudIcon className="w-9 h-6 text-sky-400" />
        </div>

        {/* Illustrated Schoolhouse */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-10 rounded-t-lg bg-amber-400 border border-amber-600 flex items-center justify-center text-lg shadow-2xs">
            🏫
          </div>
          <span className="text-[9.5px] font-black text-[#0F2963] mt-0.5">Vannam Campus</span>
        </div>

        {/* Rustling Tree Leaves */}
        <div className="animate-leaf-rustle origin-bottom">
          <div className="text-2xl">🌳</div>
        </div>

        {/* Occasional Fluttering Bird */}
        <div className="animate-bird-hop">
          <div className="text-sm">🐦</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 30. FINAL CTA (<VannamAdventureBegins />)
// Sequential reveal: Rainbow -> Illustration -> Heading -> Description -> CTA
// ============================================================================

export function VannamAdventureBegins({ onOpenTour }) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto px-4 py-4 text-center">
      {/* 1. Rainbow draws itself */}
      <div className="flex justify-center mb-2">
        <svg viewBox="0 0 160 40" className="w-36 h-9">
          <path d="M 8 36 Q 80 6 152 36" stroke="#F43F5E" strokeWidth="3.5" strokeLinecap="round" fill="none" strokeDasharray="180" className={inView ? "animate-[draw-rainbow-arc_0.9s_ease-out_forwards]" : "opacity-0"} />
          <path d="M 14 38 Q 80 12 146 38" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="180" className={inView ? "animate-[draw-rainbow-arc_1s_ease-out_forwards]" : "opacity-0"} />
          <path d="M 20 40 Q 80 18 140 40" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="180" className={inView ? "animate-[draw-rainbow-arc_1.1s_ease-out_forwards]" : "opacity-0"} />
        </svg>
      </div>

      {/* 2. Child Illustration */}
      <div className={`flex justify-center my-1 transition-all duration-500 delay-150 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <VannamChildCharacter type="dancing" className="w-16 h-16" />
      </div>

      {/* 3. Heading */}
      <h3 className={`font-heading text-xl sm:text-3xl font-black text-white leading-tight mb-2 transition-all duration-600 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        The Adventure Begins at Vannam! 🚀
      </h3>

      {/* 4. Description */}
      <p className={`text-xs sm:text-sm text-blue-100 max-w-md mx-auto mb-4 transition-all duration-600 delay-450 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        Admissions are now open for the upcoming academic year. Book your personalized school tour today.
      </p>

      {/* 5. CTA Button with gentle tap feedback */}
      <div className={`transition-all duration-600 delay-600 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <button
          onClick={onOpenTour}
          className="btn-secondary px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-black rounded-full shadow-lg active:scale-95 transition-transform"
        >
          📅 Schedule a Visit Today
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 31. FOOTER STORYBOOK ENDING (<VannamStorybookEnding />)
// Calm evening twilight scene: moon, stars, schoolhouse with warm light, child walking
// "The story doesn't end here. The child's journey begins."
// ============================================================================

export function VannamStorybookEnding() {
  const [lit, setLit] = useState(false);
  const endingRef = useRef(null);

  useEffect(() => {
    const el = endingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setLit(true), 600);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={endingRef} className="relative w-full max-w-md mx-auto px-4 py-4 text-center pointer-events-none select-none" aria-hidden="true">
      {/* Evening Sky Scene */}
      <div className="flex items-center justify-center gap-6 my-2">
        <HangingMoonIcon className="w-6 h-6" />

        {/* School with Warm Light Window */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-11 rounded-t-xl bg-[#091A42] border border-amber-300/60 relative flex items-center justify-center shadow-xs">
            {/* School Warm Window */}
            <div className={`w-4 h-5 rounded-t-sm border border-amber-200 transition-all duration-700 ${lit ? "bg-amber-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]" : "bg-slate-700"}`} />
          </div>
          <span className="text-[9.5px] font-bold text-amber-200 mt-1">Vannam School</span>
        </div>

        {/* Small Illustrated Child walking to school */}
        <div className={`transition-all duration-1000 transform ${lit ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-40"}`}>
          <VannamChildCharacter type="reading" className="w-8 h-8" />
        </div>

        {/* Single Evening Star */}
        <div className={`transition-opacity duration-700 ${lit ? "opacity-100" : "opacity-0"}`}>
          <HangingStarIcon className="w-5 h-5" />
        </div>
      </div>

      {/* Storybook Ending Text */}
      <p className="text-[11px] text-amber-100/90 font-medium italic mt-2">
        “The story doesn't end here. The child's journey begins.”
      </p>
    </div>
  );
}

