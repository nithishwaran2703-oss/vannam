import React from "react";
import {
  Heart,
  ShieldCheck,
  BookOpen,
  Clock,
  Users,
  Award,
  Star,
  MessageCircle,
  HelpCircle,
  Calendar,
  Sparkles,
  Baby,
  Utensils,
  Video,
  Stethoscope,
  Palette,
  Compass,
  TreePine,
  FlaskConical,
  Smile,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sun,
  Moon
} from "lucide-react";
import {
  TeddyBearIcon,
  AlphabetBlock,
  ToyCarIcon,
  RainbowIcon,
  HappyCloudIcon,
  SmilingSunIcon,
  ButterflyIcon,
  BlossomFlowerIcon,
  SproutPlantIcon,
  CrayonIcon,
  BalloonIcon,
  PuzzlePieceIcon,
  StorybookIcon,
  SchoolCastleIcon,
  PaintSplatterIcon,
  MusicNotesCluster,
  PaperPlaneIcon,
  ArtPaletteIcon,
  PinwheelToy,
  StorybookStackIcon,
  PlantInPotIcon,
  SchoolBusToyIcon,
  PlaygroundSlideIcon,
  ShieldSecurityBadge,
  TeacherApplesTrophy,
  ParentLoveBadge,
  SparkleStarsGroup,
  NatureSceneGroup,
  CreativitySceneGroup,
  LearningSceneGroup,
  PlaySceneGroup,
  SafetySceneGroup
} from "./ToyDecorations";

/**
 * Universal Section Concept Header
 * Displays a numbered concept badge, visual mascot group, and clear title/subtitle
 */
export function SectionConceptHeader({
  conceptNumber = "01",
  badgeText = "Concept Overview",
  badgeIcon: BadgeIcon = Sparkles,
  badgeColor = "amber", // amber | emerald | rose | sky | purple | navy
  title = "",
  highlight = "",
  highlightColor = "text-vannam-yellow",
  underlineColor = "decoration-vannam-green",
  subtitle = "",
  mascotScene = null,
  className = ""
}) {
  const badgeStyles = {
    amber: "bg-vannam-yellow/15 border-vannam-yellow/40 text-vannam-orange",
    emerald: "bg-emerald-100 border-emerald-300 text-emerald-800",
    rose: "bg-rose-100 border-rose-300 text-rose-800",
    sky: "bg-sky-100 border-sky-300 text-sky-800",
    purple: "bg-purple-100 border-purple-300 text-purple-800",
    navy: "bg-[#0F2963]/10 border-[#CBD8F6] text-[#0F2963]"
  };

  const currentBadgeStyle = badgeStyles[badgeColor] || badgeStyles.amber;

  return (
    <div className={`text-center max-w-3xl mx-auto space-y-2 mb-4 sm:mb-6 relative ${className}`}>
      {/* Mascot Scene */}
      {mascotScene && (
        <div className="flex justify-center mb-1">
          {mascotScene}
        </div>
      )}

      {/* Conceptual Numbered Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border shadow-2xs text-xs font-black uppercase tracking-wider backdrop-blur-xs transition-all duration-300 hover:scale-105 select-none">
        <span className="bg-[#0F2963] text-white text-[9.5px] font-black px-2 py-0.5 rounded-full tracking-widest">
          CONCEPT {conceptNumber}
        </span>
        <span className={`inline-flex items-center gap-1 font-extrabold ${currentBadgeStyle}`}>
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 shrink-0" />}
          <span>{badgeText}</span>
        </span>
      </div>

      {/* Main Conceptual Heading */}
      <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
        {title}{" "}
        {highlight && (
          <span className={`${highlightColor} underline ${underlineColor} underline-offset-4 sm:underline-offset-6`}>
            {highlight}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * 1. About Us Conceptual Strip
 * 3 Core Pillars: Safe Nest, Child Curiosity, STEAM Sparks
 */
export function AboutConceptStrip() {
  const pillars = [
    {
      icon: ShieldSecurityBadge,
      title: "1. 360° Safe Haven",
      tagline: "Protected & Loving Care",
      desc: "Zero-harm, 100% childproofed campus with loving 1:6 educator attention.",
      bg: "bg-emerald-50/80 border-emerald-200 text-emerald-950",
      accent: "text-emerald-600 bg-emerald-100"
    },
    {
      icon: PlantInPotIcon,
      title: "2. Child-Led Curiosity",
      tagline: "Montessori Exploration",
      desc: "Self-paced discoveries that spark lifelong confidence and natural wonder.",
      bg: "bg-amber-50/80 border-amber-200 text-amber-950",
      accent: "text-amber-600 bg-amber-100"
    },
    {
      icon: StorybookStackIcon,
      title: "3. Future STEAM Sparks",
      tagline: "Inquiry & Creativity",
      desc: "Hands-on science, logic, arts & phonics tailored for early developmental stages.",
      bg: "bg-sky-50/80 border-sky-200 text-sky-950",
      accent: "text-sky-600 bg-sky-100"
    }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-4">
        {pillars.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <div
              key={idx}
              className={`w-[78vw] xs:w-[270px] shrink-0 snap-center md:w-auto p-3.5 sm:p-4 rounded-2xl border-2 ${p.bg} shadow-xs flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-2xs">
                <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">{p.tagline}</div>
                <div className="text-xs sm:text-sm font-black text-[#0F2963] leading-tight truncate">{p.title}</div>
                <div className="text-[11px] text-slate-600 font-medium line-clamp-1 sm:line-clamp-2 mt-0.5">{p.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 2. Programs Age Growth Ladder Strip
 * Visual continuous developmental ladder from 1.5 yrs to 6 yrs
 */
export function ProgramsAgeLadder({ activeTab, onSelectTab }) {
  const stages = [
    {
      id: "toddler",
      age: "1.5 – 2.5 Yrs",
      stageName: "Toddler Discovery",
      badge: "🐣 Sensory Steps",
      color: "border-amber-400 bg-amber-50 text-amber-900",
      activeColor: "bg-amber-500 text-white border-amber-600 shadow-md",
      icon: TeddyBearIcon
    },
    {
      id: "playgroup",
      age: "2.5 – 3.5 Yrs",
      stageName: "Playgroup Explorers",
      badge: "🧸 Social Spark",
      color: "border-sky-400 bg-sky-50 text-sky-900",
      activeColor: "bg-[#00A8E8] text-white border-sky-600 shadow-md",
      icon: AlphabetBlock
    },
    {
      id: "nursery",
      age: "3.5 – 4.5 Yrs",
      stageName: "Nursery Innovators",
      badge: "🎨 STEAM Inquiries",
      color: "border-emerald-400 bg-emerald-50 text-emerald-900",
      activeColor: "bg-[#10B981] text-white border-emerald-600 shadow-md",
      icon: PuzzlePieceIcon
    },
    {
      id: "kindergarten",
      age: "4.5 – 6.0 Yrs",
      stageName: "KG Preparatory",
      badge: "🎓 School Ready",
      color: "border-purple-400 bg-purple-50 text-purple-900",
      activeColor: "bg-[#8B5CF6] text-white border-purple-600 shadow-md",
      icon: StorybookIcon
    }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white/90 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2 border-[#CBD8F6] shadow-sm">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F2963] text-center mb-2 flex items-center justify-center gap-1.5">
          <span>🌱 Age-Wise Growth Milestones At A Glance</span>
          <span className="text-[10px] text-slate-500 font-bold">(Tap to view curriculum)</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {stages.map((stg, i) => {
            const isActive = activeTab === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => onSelectTab && onSelectTab(stg.id)}
                className={`p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 flex items-center gap-2 sm:gap-2.5 cursor-pointer ${isActive ? stg.activeColor : `${stg.color} hover:scale-[1.02]`
                  }`}
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-white/20' : 'bg-white shadow-2xs'}`}>
                  {stg.id === "toddler" && <TeddyBearIcon className="w-5 h-5" />}
                  {stg.id === "playgroup" && <AlphabetBlock letter="P" color="sky" className="w-5 h-5" />}
                  {stg.id === "nursery" && <PuzzlePieceIcon color="emerald" className="w-5 h-5" />}
                  {stg.id === "kindergarten" && <StorybookIcon className="w-5 h-5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                    {stg.age}
                  </div>
                  <div className="text-xs sm:text-xs font-black truncate">{stg.stageName}</div>
                  <div className={`text-[9.5px] font-bold truncate ${isActive ? 'text-white/80' : 'text-slate-600'}`}>
                    {stg.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Why Us 4 Superpowers Comparison Strip
 */
export function WhyUsPillarsStrip() {
  const pillars = [
    {
      superpower: "1:6 Ultra Ratio",
      vsStandard: "vs 1:25 Overcrowded",
      icon: Users,
      color: "bg-rose-50 border-rose-300 text-rose-900",
      accent: "bg-rose-500 text-white"
    },
    {
      superpower: "Organic Chef Meals",
      vsStandard: "vs Processed Snacks",
      icon: Utensils,
      color: "bg-amber-50 border-amber-300 text-amber-900",
      accent: "bg-amber-500 text-white"
    },
    {
      superpower: "4K Encrypted Stream",
      vsStandard: "vs Closed Door Schools",
      icon: Video,
      color: "bg-sky-50 border-sky-300 text-sky-900",
      accent: "bg-[#00A8E8] text-white"
    },
    {
      superpower: "Montessori + STEAM",
      vsStandard: "vs Rigid Rote Memorization",
      icon: Sparkles,
      color: "bg-emerald-50 border-emerald-300 text-emerald-900",
      accent: "bg-[#10B981] text-white"
    }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-4 md:gap-3">
        {pillars.map((pil, idx) => {
          const Icon = pil.icon;
          return (
            <div
              key={idx}
              className={`w-[68vw] xs:w-[230px] shrink-0 snap-center md:w-auto p-3 rounded-2xl border-2 ${pil.color} shadow-xs flex items-center gap-2.5`}
            >
              <div className={`w-9 h-9 rounded-xl ${pil.accent} flex items-center justify-center shrink-0 shadow-xs font-bold`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-[#0F2963] leading-tight truncate">{pil.superpower}</div>
                <div className="text-[10px] font-bold text-slate-500 line-through decoration-rose-400 truncate">{pil.vsStandard}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 4. 7-Shade Learning Methodology Rainbow Spectrum Ribbon
 */
export function MethodologyRainbowStrip({ activeShade, onSelectShade }) {
  const shades = [
    { id: "creative", title: "Creative", color: "#F43F5E", icon: Palette, tag: "Art & Drama" },
    { id: "cognitive", title: "Logic & STEAM", color: "#F59E0B", icon: FlaskConical, tag: "Math & Coding" },
    { id: "physical", title: "Physical", color: "#10B981", icon: SproutPlantIcon, tag: "Motor Skills" },
    { id: "nature", title: "Nature", color: "#00A8E8", icon: TreePine, tag: "Eco Wonder" },
    { id: "social", title: "Social", color: "#8B5CF6", icon: Users, tag: "Empathy & Team" },
    { id: "language", title: "Language", color: "#EC4899", icon: BookOpen, tag: "Phonics & Tales" },
    { id: "emotional", title: "Emotional", color: "#0F2963", icon: Heart, tag: "Mindfulness" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border border-[#CBD8F6] shadow-xs">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F2963] text-center mb-2 flex items-center justify-center gap-1.5">
          <span>🌈 The 7 Developmental Dimensions At A Glance</span>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2 pb-1 justify-start sm:justify-center">
          {shades.map((s, idx) => {
            const isSel = activeShade === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectShade && onSelectShade(s.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 shrink-0 snap-center transition-all duration-200 cursor-pointer ${isSel
                  ? "text-white shadow-md scale-105"
                  : "bg-slate-50 text-[#0F2963] border-slate-200 hover:bg-slate-100"
                  }`}
                style={{
                  backgroundColor: isSel ? s.color : undefined,
                  borderColor: isSel ? s.color : undefined
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: isSel ? '#FFFFFF' : s.color }} />
                <span>{idx + 1}. {s.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 5. Daily Activities Timeline Progression Ribbon
 */
export function ActivitiesTimelineStrip() {
  const steps = [
    { time: "8:30 AM", title: "Welcome Circle", icon: SmilingSunIcon, desc: "Warm greeting, hydration & mood check", color: "bg-amber-50 border-amber-300 text-amber-900" },
    { time: "9:30 AM", title: "Montessori Work", icon: PuzzlePieceIcon, desc: "Self-chosen sensory exploration", color: "bg-sky-50 border-sky-300 text-sky-900" },
    { time: "11:30 AM", title: "Organic Dining", icon: Utensils, desc: "Farm-fresh balanced lunch by chef", color: "bg-emerald-50 border-emerald-300 text-emerald-900" },
    { time: "12:30 PM", title: "Rest & Nap", icon: Moon, desc: "Cozy quiet rest with lullaby rhythms", color: "bg-purple-50 border-purple-300 text-purple-900" },
    { time: "2:00 PM", title: "STEAM Wonder", icon: FlaskConical, desc: "Hands-on science & creative art", color: "bg-rose-50 border-rose-300 text-rose-900" },
    { time: "4:00 PM", title: "Play & Farewell", icon: PinwheelToy, desc: "Lawn games & parent reunion", color: "bg-amber-50 border-amber-300 text-amber-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-[#CBD8F6] shadow-sm">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#0F2963] text-center mb-2.5 flex items-center justify-center gap-1.5">
          <span>⏰ A Day in the Life: Sunrise to Sunset Journey</span>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2.5 pb-2 -mx-2 px-2 sm:mx-0 sm:px-0">
          {steps.map((st, i) => {
            const IconComp = st.icon;
            return (
              <div
                key={i}
                className={`w-[175px] xs:w-[195px] shrink-0 snap-center p-2.5 sm:p-3 rounded-2xl border ${st.color} shadow-2xs flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 shadow-2xs border border-black/5">
                    {st.time}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shadow-2xs">
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xs font-black text-[#0F2963] leading-tight">{st.title}</div>
                <div className="text-[10px] text-slate-600 font-medium line-clamp-1 mt-0.5">{st.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 6. Facilities Zones Visual Strip
 */
export function FacilitiesZonesStrip() {
  const zones = [
    { name: "Outdoor Lawn", icon: TreePine, desc: "Safety cushioned open-air play", color: "bg-emerald-50 border-emerald-300 text-emerald-900" },
    { name: "STEAM Lab", icon: FlaskConical, desc: "Robotics, light tables & inquiry", color: "bg-sky-50 border-sky-300 text-sky-900" },
    { name: "Treehouse Library", icon: BookOpen, desc: "Cozy reading & storytelling", color: "bg-amber-50 border-amber-300 text-amber-900" },
    { name: "Art Atelier", icon: Palette, desc: "Messy sensory & easel painting", color: "bg-rose-50 border-rose-300 text-rose-900" },
    { name: "Chef's Kitchen", icon: Utensils, desc: "100% Organic, hygienic dining", color: "bg-purple-50 border-purple-300 text-purple-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-5 md:gap-3">
        {zones.map((z, idx) => {
          const Icon = z.icon;
          return (
            <div
              key={idx}
              className={`w-[60vw] xs:w-[210px] shrink-0 snap-center md:w-auto p-2.5 sm:p-3 rounded-2xl border-2 ${z.color} shadow-2xs flex items-center gap-2.5`}
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-2xs">
                <Icon className="w-4 h-4 text-[#0F2963]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#0F2963] truncate">{z.name}</div>
                <div className="text-[10px] text-slate-500 font-medium truncate">{z.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 7. Safety 360° Shield Assurance Strip
 */
export function SafetyShieldStrip() {
  const assurances = [
    { title: "24/7 4K Parent Feed", desc: "Live encrypted mobile camera stream", icon: Video, color: "bg-sky-50 border-sky-300 text-sky-900" },
    { title: "Pediatric Care Onsite", desc: "Certified CPR staff & doctor on call", icon: Stethoscope, color: "bg-rose-50 border-rose-300 text-rose-900" },
    { title: "Biometric Gated Access", desc: "RFID & biometric verified parent pickups", icon: Lock, color: "bg-emerald-50 border-emerald-300 text-emerald-900" },
    { title: "Hospital-Grade Hygiene", desc: "Daily UV & non-toxic sanitization", icon: ShieldCheck, color: "bg-amber-50 border-amber-300 text-amber-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {assurances.map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className={`p-3 rounded-2xl border-2 ${a.color} shadow-xs flex items-center gap-2.5`}>
              <div className="w-9 h-9 rounded-xl bg-white border border-black/5 flex items-center justify-center shrink-0 shadow-2xs">
                <Icon className="w-5 h-5 text-[#0F2963]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#0F2963] leading-tight truncate">{a.title}</div>
                <div className="text-[10px] text-slate-600 font-medium truncate">{a.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 8. Teachers Credential & Ratio Strip
 */
export function TeachersCredentialStrip() {
  const items = [
    { label: "1:6 Care Ratio", value: "Individual Attention", icon: Users, color: "bg-rose-50 border-rose-200 text-rose-900" },
    { label: "100% Certified", value: "Early Childhood Degrees", icon: Award, color: "bg-amber-50 border-amber-200 text-amber-900" },
    { label: "Pediatric CPR", value: "First-Aid Certified", icon: Heart, color: "bg-emerald-50 border-emerald-200 text-emerald-900" },
    { label: "5+ Years Exp", value: "Loving Mentorship", icon: Star, color: "bg-sky-50 border-sky-200 text-sky-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {items.map((it, idx) => {
          const Icon = it.icon;
          return (
            <div key={idx} className={`p-2.5 sm:p-3 rounded-2xl border ${it.color} shadow-2xs flex items-center gap-2.5 bg-white/95`}>
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#0F2963]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-[#0F2963] leading-tight truncate">{it.label}</div>
                <div className="text-[10px] text-slate-500 font-medium truncate">{it.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 9. Awards & Trust Score Strip
 */
export function AwardsTrustStrip() {
  const badges = [
    { title: "Top Montessori Award", year: "2024–2026", badge: "🏆 Ranked #1", color: "bg-amber-50 border-amber-300 text-amber-900" },
    { title: "4.9/5 Parent Score", year: "500+ Reviews", badge: "⭐ Loved by Parents", color: "bg-rose-50 border-rose-300 text-rose-900" },
    { title: "STEAM Excellence", year: "Global Standard", badge: "🎖️ Accredited", color: "bg-sky-50 border-sky-300 text-sky-900" },
    { title: "100% Safety Certified", year: "Zero Incident", badge: "🛡️ Safety Gold", color: "bg-emerald-50 border-emerald-300 text-emerald-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {badges.map((b, idx) => (
          <div key={idx} className={`p-2.5 sm:p-3 rounded-2xl border-2 ${b.color} shadow-xs flex items-center gap-2.5 bg-white/95`}>
            <div className="min-w-0 flex-1">
              <div className="text-[9.5px] font-black uppercase tracking-wider text-slate-500">{b.year}</div>
              <div className="text-xs font-black text-[#0F2963] leading-tight truncate">{b.title}</div>
              <div className="text-[10px] font-bold text-amber-600 mt-0.5">{b.badge}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 10. Parent Trust & Testimonial Badges Strip
 */
export function TestimonialsTrustStrip() {
  const trustStats = [
    { label: "Happy Families", value: "500+", icon: Heart, color: "text-rose-500 bg-rose-50" },
    { label: "Average Rating", value: "4.9 / 5.0", icon: Star, color: "text-amber-500 bg-amber-50" },
    { label: "Recommendation", value: "100%", icon: CheckCircle2, color: "text-emerald-500 bg-emerald-50" },
    { label: "Parent Live Views", value: "Daily 4K", icon: Video, color: "text-sky-500 bg-sky-50" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-center">
          {trustStats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center gap-2 sm:gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${st.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-black text-[#0F2963] leading-tight">{st.value}</div>
                  <div className="text-[10px] text-slate-500 font-bold truncate">{st.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * 11. FAQ Quick Topic Shortcut Strip
 */
export function FaqTopicsStrip() {
  const topics = [
    { id: "admissions", label: "Admissions & Age", icon: Calendar, color: "bg-amber-50 border-amber-300 text-amber-900" },
    { id: "safety", label: "Safety & Live CCTV", icon: ShieldCheck, color: "bg-emerald-50 border-emerald-300 text-emerald-900" },
    { id: "meals", label: "Organic Chef Meals", icon: Utensils, color: "bg-rose-50 border-rose-300 text-rose-900" },
    { id: "fees", label: "Timings & Structure", icon: Clock, color: "bg-sky-50 border-sky-300 text-sky-900" }
  ];

  return (
    <div className="mb-4 sm:mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {topics.map((top) => {
          const Icon = top.icon;
          return (
            <div
              key={top.id}
              className={`p-2.5 rounded-xl border-2 ${top.color} shadow-2xs flex items-center gap-2`}
            >
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-2xs">
                <Icon className="w-3.5 h-3.5 text-[#0F2963]" />
              </div>
              <span className="text-[11px] font-black text-[#0F2963] truncate">{top.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 12. Admissions Roadmap Strip (3 Simple Steps)
 */
export function AdmissionsRoadmapStrip() {
  const steps = [
    { step: "01", title: "Book Campus Tour", desc: "Walk through our nature lawns & STEAM labs" },
    { step: "02", title: "Play & Interact", desc: "Child comfort discovery session with educators" },
    { step: "03", title: "Welcome to Vannam!", desc: "Seamless enrollment & parent app access" }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white flex items-center gap-3 shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-vannam-yellow text-[#0F2963] font-black flex items-center justify-center shrink-0 shadow-md">
              <span className="text-xs font-black">{s.step}</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-black text-white leading-tight">{s.title}</div>
              <div className="text-[10px] sm:text-[11px] text-blue-100 font-medium line-clamp-1 mt-0.5">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
