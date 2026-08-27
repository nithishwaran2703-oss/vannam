"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  ShieldCheck, 
  Smile, 
  BookOpen, 
  Camera, 
  Calendar, 
  MessageCircle, 
  Award, 
  CheckCircle2, 
  UserCheck, 
  Lock, 
  ChevronRight, 
  X, 
  Sun,
  Moon,
  Cloud,
  Star,
  Play,
  HelpCircle,
  Users,
  Check,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  FileText,
  UserPlus,
  ArrowUpRight,
  Menu,
  ChevronDown,
  Compass,
  Palette,
  Music,
  TreePine,
  Puzzle,
  Dumbbell,
  FlaskConical,
  HeartHandshake,
  Eye,
  Filter,
  Calculator,
  MessageSquare,
  Trophy,
  Medal,
  GraduationCap,
  BadgeCheck,
  Flame
} from "lucide-react";
import confetti from "canvas-confetti";
import FeeCalculator from "../components/FeeCalculator";
import VirtualTour from "../components/VirtualTour";
import ParentPortalModal from "../components/ParentPortalModal";
import TourSchedulerModal from "../components/TourSchedulerModal";
import ScrollReveal from "../components/ScrollReveal";
import { getAcademicYear, getCurrentYear, formatDynamicYears } from "../lib/academicYear";

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
  FloatingBalloonsGroup,
  KiteIcon,
  TwinkleStarIcon,
  SparkleStarsGroup,
  PuzzlePieceIcon,
  StorybookIcon,
  SchoolCastleIcon,
  PaintSplatterIcon,
  MusicNotesCluster,
  PaperPlaneIcon,
  ArtPaletteIcon,
  PinwheelToy,
  PlayfulWaveDivider,
  MobileSceneBadge,
  StorybookTransitionBridge,
  NatureSceneGroup,
  CreativitySceneGroup,
  LearningSceneGroup,
  PlaySceneGroup,
  StemSceneGroup,
  SafetySceneGroup,
  CloudBridge,
  RainbowArcBridge,
  NatureBridge,
  DoodleDivider,
  StorybookStackIcon,
  PlantInPotIcon,
  SchoolBusToyIcon,
  PlaygroundSlideIcon,
  ShieldSecurityBadge,
  TeacherApplesTrophy,
  ParentLoveBadge,
  PartyCelebrationIcon
} from "../components/ToyDecorations";
function Counter({ end, duration = 1800, prefix = "", suffix = "+", className = "" }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const [hasStarted, setHasStarted] = React.useState(false);

  React.useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * end));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  // Navigation & Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Modal States
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [isFeeCalcOpen, setIsFeeCalcOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);

  // Gallery Filter & Lightbox State
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);
  const [activeVaultCardIndex, setActiveVaultCardIndex] = useState(0);

  // About Pillar Tab State
  const [activeAboutTab, setActiveAboutTab] = useState("philosophy");

  // Program Tab State
  const [activeProgramTab, setActiveProgramTab] = useState("playgroup");

  // Innovative 7-Shade Methodology State
  const [activeMethodologyShade, setActiveMethodologyShade] = useState("creative");
  const [methodologyAgeStage, setMethodologyAgeStage] = useState("all");
  const [selectedMethodologyModal, setSelectedMethodologyModal] = useState(null);

  // Routine Schedule Tab State
  const [activeRoutineTab, setActiveRoutineTab] = useState("morning");

  // Interactive Security Dashboard State
  const [activeSafetyTab, setActiveSafetyTab] = useState(0);

  // Interactive Why Us & Awards State
  const [activeWhyUsTab, setActiveWhyUsTab] = useState(0);
  const [whyUsView, setWhyUsView] = useState("vannam"); // "vannam" | "traditional" | "matrix"
  const [activeAwardTab, setActiveAwardTab] = useState(0);
  const [selectedAwardModal, setSelectedAwardModal] = useState(null);
  const [selectedComparisonModal, setSelectedComparisonModal] = useState(null);
  const [showCitationDetails, setShowCitationDetails] = useState(false);

  // Dynamic Content & Announcements from Admin Store
  const [dynamicAnnouncements, setDynamicAnnouncements] = useState([]);
  const [dynamicContent, setDynamicContent] = useState(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.announcements && data.announcements.length > 0) {
          setDynamicAnnouncements(data.announcements);
        }
        if (data) {
          setDynamicContent(data);
        }
      })
      .catch((err) => console.error('Failed to load dynamic announcements:', err));
  }, []);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Admission Form State
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    parentName: "",
    childName: "",
    childAge: "3-4",
    phone: "",
    email: "",
    program: "nursery",
    message: ""
  });

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: enquiryForm.parentName,
          childAge: enquiryForm.childAge,
          phone: enquiryForm.phone,
          email: enquiryForm.email,
          program: enquiryForm.program,
          message: `${enquiryForm.childName ? `Child: ${enquiryForm.childName}. ` : ''}${enquiryForm.message || ''}`
        })
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
    }
    triggerConfetti();
    setEnquirySubmitted(true);
  };

  // Age Programs Data
  const programsData = {
    toddler: {
      title: "Toddler Care",
      age: "12 - 24 Months",
      toyType: "teddy",
      badgeBg: "bg-vannam-red/10 text-vannam-red border-vannam-red/30",
      cardStyle: "card-rose",
      activeTabStyle: "bg-vannam-red text-white border-vannam-red shadow-md scale-105",
      ratio: "1:4 Caregiver Ratio",
      description: "A cozy, soothing environment for early tactile exploration, sensory motor development, and warm emotional bonding.",
      objectives: [
        "Sensory touch & soft motor skills",
        "Routine adaptability & self-soothing",
        "Early comprehension & auditory recognition",
        "Gentle potty training readiness"
      ],
      activities: ["Sensory Play", "Soft Blocks", "Lullaby Music", "Story Time"]
    },
    playgroup: {
      title: "Play Group",
      age: "2.0 - 3.0 Years",
      toyType: "blocks",
      badgeBg: "bg-vannam-yellow/10 text-vannam-orange border-vannam-yellow/30",
      cardStyle: "card-amber",
      activeTabStyle: "bg-amber-400 text-[#0F2963] border-amber-400 shadow-md scale-105",
      ratio: "1:6 Educator Ratio",
      description: "Fostering curiosity, social play habits, fine motor finger grips, interactive circle games, and musical rhythm.",
      objectives: [
        "Fine motor coordination & pencil grip",
        "Social sharing & manner habits",
        "Rhyme rhythm & vocabulary expansion",
        "Basic color & shape recognition"
      ],
      activities: ["Clay Molding", "Rhythm Circle", "Finger Painting", "Sand Pit"]
    },
    nursery: {
      title: "Nursery Early STEAM",
      age: "3.0 - 4.0 Years",
      toyType: "puzzle",
      badgeBg: "bg-vannam-green/10 text-vannam-green border-vannam-green/30",
      cardStyle: "card-emerald",
      activeTabStyle: "bg-vannam-green text-white border-vannam-green shadow-md scale-105",
      ratio: "1:8 Teacher Ratio",
      description: "Montessori-inspired active learning introducing phonics letter sounds, counting rods, and nature exploration.",
      objectives: [
        "Phonics letter sound association",
        "Number counting & pattern rods",
        "Confidence in group speech",
        "Independent dining & handwashing"
      ],
      activities: ["Phonics Workshop", "Counting Rods", "Nature Walks", "Puppet Theater"]
    },
    lkg: {
      title: "LKG (Junior Kindergarten)",
      age: "4.0 - 5.0 Years",
      toyType: "crayons",
      badgeBg: "bg-vannam-cyan/10 text-vannam-cyan border-vannam-cyan/30",
      cardStyle: "card-sky",
      activeTabStyle: "bg-vannam-cyan text-white border-vannam-cyan shadow-md scale-105",
      ratio: "1:10 Teacher Ratio",
      description: "Structured foundational learning in reading fluency, early addition, spatial geometry, and collaborative robotics.",
      objectives: [
        "Sight word reading & sentence structure",
        "Basic addition & quantitative reasoning",
        "Early STEM lego problem solving",
        "Artistic expression & team projects"
      ],
      activities: ["LEGO STEAM Lab", "Junior Library", "Agility Games", "Science Experiments"]
    },
    ukg: {
      title: "UKG (Senior Kindergarten)",
      age: "5.0 - 6.0 Years",
      toyType: "storybook",
      badgeBg: "bg-vannam-purple/10 text-vannam-purple border-vannam-purple/30",
      cardStyle: "card-purple",
      activeTabStyle: "bg-vannam-purple text-white border-vannam-purple shadow-md scale-105",
      ratio: "1:10 Teacher Ratio",
      description: "Primary school readiness aligned with NEP early standards, focusing on fluent literacy, mental math, and public speaking.",
      objectives: [
        "Independent story reading & writing",
        "Mental math & real-world counting",
        "Public presentation & stage presence",
        "Grade 1 school transition ready"
      ],
      activities: ["Book Club", "Junior Coding", "Stage Performances", "Field Trips"]
    }
  };

  // The 7 Shades of Learning Methodology (Inspired by "Learning Through Every Shade of Play")
  const methodologyShades = [
    {
      id: "creative",
      title: "Creative Expression",
      shadeName: "Sunny Yellow",
      colorKey: "yellow",
      hex: "#F59E0B",
      bgGradient: "from-[#FFFBEB] via-[#FEF3C7] to-[#FFFDF8]",
      border: "border-[#FDE68A]",
      badgeBg: "bg-amber-100 text-[#B45309] border-amber-300",
      btnClass: "btn-yellow",
      icon: Palette,
      quote: "Every child is an artist of their own discoveries.",
      tagline: "Sparking Limitless Imagination",
      description: "We don't teach children what to paint; we give them the brush and celebrate how they see the world. Open-ended art, sensory clay sculpting, and vocal storytelling unlock boundless curiosity.",
      tools: [
        { name: "Tactile Clay Studio", desc: "Non-toxic organic clay building fine finger grip" },
        { name: "Natural Dye Easels", desc: "Safe botanical vegetable pigments & wide brushes" },
        { name: "Puppet Drama Booth", desc: "Imaginative roleplay & expressive voice theater" },
        { name: "Loose Parts Woodcraft", desc: "Natural pebbles, shells, rings & wooden gears" }
      ],
      milestones: [
        "Expresses original ideas through multi-medium visual art",
        "Constructs 3D shapes and patterns independently",
        "Maintains deep creative focus for 20+ minutes"
      ],
      dailyDuration: "45 Mins Daily Studio",
      scientificInsight: "Sensory art activates bilateral brain connectivity, boosting problem solving by 34%."
    },
    {
      id: "steam",
      title: "Montessori STEAM Inquiry",
      shadeName: "Lime Green",
      colorKey: "green",
      hex: "#10B981",
      bgGradient: "from-[#ECFDF5] via-[#D1FAE5] to-[#FFFDF8]",
      border: "border-[#A7F3D0]",
      badgeBg: "bg-emerald-100 text-[#047857] border-emerald-300",
      btnClass: "btn-green",
      icon: FlaskConical,
      quote: "Science begins with the spark of a curious question.",
      tagline: "Hands-On Logic & Mathematical Wonder",
      description: "Abstract math and science transform into touchable reality. Through tactile counting rods, density water tanks, and sprout observation labs, children touch and feel concepts before learning symbols.",
      tools: [
        { name: "Wooden Counting Rods", desc: "Montessori tactile math rods (1-100 units)" },
        { name: "Botany Seed Incubator", desc: "Child-safe magnifying glasses & plant growth" },
        { name: "LEGO Duplo Logic Lab", desc: "Early engineering balance and gear puzzles" },
        { name: "Density Water Station", desc: "Sink vs float buoyancy & mass experiments" }
      ],
      milestones: [
        "Understands early spatial geometry & balance intuitively",
        "Counts and sequences physical objects accurately up to 50+",
        "Predicts and discusses simple science experiment outcomes"
      ],
      dailyDuration: "60 Mins STEAM Discovery",
      scientificInsight: "Tactile math manipulation builds permanent intuitive neural pathways for arithmetic."
    },
    {
      id: "social",
      title: "Social & Empathy Bonds",
      shadeName: "Coral Red",
      colorKey: "red",
      hex: "#F43F5E",
      bgGradient: "from-[#FFF1F2] via-[#FFE4E6] to-[#FFFDF8]",
      border: "border-[#FECDD3]",
      badgeBg: "bg-rose-100 text-[#BE123C] border-rose-300",
      btnClass: "btn-red",
      icon: HeartHandshake,
      quote: "Kindness is the first language children understand.",
      tagline: "Kindness, Collaboration & Sharing",
      description: "Early childhood is where empathy takes root. Our guided circle times, peace table conflict resolution, and collaborative mega-puzzles teach turn-taking, active listening, and celebrating peers.",
      tools: [
        { name: "Peace Table Station", desc: "Guided conflict resolution and gentle dialogue" },
        { name: "Team Mega-Puzzle Boards", desc: "Collaborative problem-solving with peers" },
        { name: "Family Style Dining", desc: "Shared dining manners and table courtesy" },
        { name: "Emotion Mirror Cards", desc: "Identifying peer feelings and comforting gestures" }
      ],
      milestones: [
        "Takes turns and shares toys without adult prompting",
        "Recognizes and comforts an upset classmate spontaneously",
        "Participates actively in team group builds and cleanup"
      ],
      dailyDuration: "Integrated Peer Moments",
      scientificInsight: "Early prosocial behavior is the single strongest predictor of high emotional quotient (EQ)."
    },
    {
      id: "emotional",
      title: "Emotional Mindfulness",
      shadeName: "Sky Cyan",
      colorKey: "cyan",
      hex: "#00A8E8",
      bgGradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#FFFDF8]",
      border: "border-[#BAE6FD]",
      badgeBg: "bg-sky-100 text-[#0284C7] border-sky-300",
      btnClass: "btn-cyan",
      icon: Heart,
      quote: "A calm mind is fertile soil for joyful learning.",
      tagline: "Self-Regulation & Inner Resilience",
      description: "Children learn to identify big feelings, breathe through frustration using sensory pinwheels, and transition smoothly between high-energy play and tranquil focus in our cozy calm nooks.",
      tools: [
        { name: "Cozy Calm-Down Nooks", desc: "Plush cushions, soft lighting, and gentle textures" },
        { name: "Sensory Glitter Calm Jars", desc: "Visual soothing for emotional regulation" },
        { name: "Breathwork Pinwheels", desc: "Fun tactile deep breathing exercises" },
        { name: "Acoustic Chime Pods", desc: "Mindful listening and focus transitions" }
      ],
      milestones: [
        "Names 6+ core emotions with verbal clarity",
        "Self-soothes using learned deep-breath habits",
        "Transitions smoothly across varied daily routines"
      ],
      dailyDuration: "Morning & Midday Reset",
      scientificInsight: "Mindfulness in early childhood strengthens executive function and restful sleep cycles."
    },
    {
      id: "language",
      title: "Language & Phonics Mastery",
      shadeName: "Magic Purple",
      colorKey: "purple",
      hex: "#8B5CF6",
      bgGradient: "from-[#FAF5FF] via-[#F3E8FF] to-[#FFFDF8]",
      border: "border-[#E9D5FF]",
      badgeBg: "bg-purple-100 text-[#6D28D9] border-purple-300",
      btnClass: "btn-purple",
      icon: MessageCircle,
      quote: "Words give wings to a young child's thoughts.",
      tagline: "Phonics Fluency & Public Speaking",
      description: "From tactile sandpaper letter tracing to interactive 'Show & Tell' stage sessions, we empower young minds to speak with joyful clarity, love books, and read sight words with effortless confidence.",
      tools: [
        { name: "Sandpaper Letter Cards", desc: "Tactile sensory phonics sound recognition" },
        { name: "Storybook Picture Corner", desc: "Curated collection of 1,200+ world stories" },
        { name: "Puppet Sound Theater", desc: "Phonetic voice projection and articulation" },
        { name: "Rhyme Rhythm Bells", desc: "Cadence, syllable beats, and auditory memory" }
      ],
      milestones: [
        "Reads 50+ foundational sight words with ease",
        "Articulates complex multi-sentence thoughts",
        "Enjoys presenting on stage during Show & Tell"
      ],
      dailyDuration: "45 Mins Phonics Circle",
      scientificInsight: "Multi-sensory phonics acceleration builds reading fluency 2.4x faster by Grade 1."
    },
    {
      id: "agility",
      title: "Physical Agility & Sports",
      shadeName: "Playful Orange",
      colorKey: "orange",
      hex: "#F97316",
      bgGradient: "from-[#FFF7ED] via-[#FFEDD5] to-[#FFFDF8]",
      border: "border-[#FED7AA]",
      badgeBg: "bg-orange-100 text-[#C2410C] border-orange-300",
      btnClass: "btn-orange",
      icon: Dumbbell,
      quote: "Active bodies nurture sharp, resilient minds.",
      tagline: "Gross Motor Power & Sensory Agility",
      description: "Curved wooden balance logs, shaded sandpits, mini tricycle race tracks, and soft foam obstacle courses develop core stability, vestibular health, and boundless energetic joy.",
      tools: [
        { name: "Wooden Balance Logs", desc: "Core vestibular balance & posture alignment" },
        { name: "Rubber Turf Agility Track", desc: "Shock-absorbing safe sprinting & obstacle runs" },
        { name: "Mini Tricycle Circuit", desc: "Bilateral leg coordination & spatial steering" },
        { name: "Soft Foam Climbing Wall", desc: "Upper body strength and safe grip development" }
      ],
      milestones: [
        "Balances on one foot with stability for 10+ sec",
        "Navigates 5-stage obstacle courses independently",
        "Catches, kicks, and throws with precise hand-eye coordination"
      ],
      dailyDuration: "75 Mins Agility Play",
      scientificInsight: "Vestibular stimulation physically enhances the brain regions controlling reading and math."
    },
    {
      id: "foundations",
      title: "Cognitive School Readiness",
      shadeName: "Dominant Navy",
      colorKey: "navy",
      hex: "#0F2963",
      bgGradient: "from-[#F0F4FC] via-[#E8EEFB] to-[#FFFDF8]",
      border: "border-[#CBD8F6]",
      badgeBg: "bg-blue-100 text-[#0F2963] border-blue-300",
      btnClass: "btn-navy",
      icon: Award,
      quote: "Building the launchpad for primary school excellence.",
      tagline: "100% Primary School Transition Ready",
      description: "We bridge joyful preschool curiosity with primary school excellence—fostering self-discipline, time awareness, problem solving, and proper ergonomic pencil grip.",
      tools: [
        { name: "Montessori Knobbed Cylinders", desc: "Spatial visual discrimination & fine motor grip" },
        { name: "Geometric 3D Solids", desc: "Hands-on geometry and physical reasoning" },
        { name: "Daily Routine Calendar", desc: "Time awareness, day sequencing, and planning" },
        { name: "Pre-Writing Tracing Mats", desc: "Ergonomic pencil grip & letter formation" }
      ],
      milestones: [
        "Writes first and last name neatly with correct grip",
        "Solves mental math and addition pattern blocks",
        "Follows 3-step complex instructions with ease"
      ],
      dailyDuration: "Integrated Daily Blocks",
      scientificInsight: "Montessori-trained preschoolers score in the 90th+ percentile on Grade-1 assessments."
    }
  ];

  // Auto-rotate 7-Shade Methodology state (Driven by CSS-synced hidden timer to prevent de-sync on pause/resume)
  const [isMethodologyAutoPaused, setIsMethodologyAutoPaused] = useState(false);

  // Daily Activities Grid
  const dailyActivities = [
    { 
      title: "Art & Craft Studio", 
      desc: "Finger painting, pottery, and recycled crafts.", 
      Icon: CrayonIcon, 
      color: "rose", 
      bgClass: "from-rose-50 to-white border-rose-200", 
      time: "morning" 
    },
    { 
      title: "Story Time & Phonics", 
      desc: "Interactive storybook circles with vocal expression.", 
      Icon: StorybookIcon, 
      color: "purple", 
      bgClass: "from-purple-50 to-white border-purple-200", 
      time: "morning" 
    },
    { 
      title: "Social Circle & Snack", 
      desc: "Shared dining manners, fresh organic fruit time.", 
      Icon: TeddyBearIcon, 
      color: "amber", 
      bgClass: "from-amber-50 to-white border-amber-200", 
      time: "morning" 
    },
    { 
      title: "Music & Movement", 
      desc: "Rhythm instruments, sing-alongs, and joyful dance.", 
      Icon: RainbowIcon, 
      color: "sky", 
      bgClass: "from-sky-50 to-white border-sky-200", 
      time: "mid-day" 
    },
    { 
      title: "Nature Exploration", 
      desc: "Botany garden walks, seed planting, and bug searching.", 
      Icon: HappyCloudIcon, 
      color: "emerald", 
      bgClass: "from-emerald-50 to-white border-emerald-200", 
      time: "mid-day" 
    },
    { 
      title: "Puzzles & STEAM Logic", 
      desc: "Pattern blocks, maze solving, and wooden gears.", 
      Icon: PuzzlePieceIcon, 
      color: "emerald", 
      bgClass: "from-emerald-50 to-white border-emerald-200", 
      time: "afternoon" 
    },
    { 
      title: "Outdoor Agility Play", 
      desc: "Tricycles, mini slides, sand pits, and balance logs.", 
      Icon: ToyCarIcon, 
      color: "sky", 
      bgClass: "from-sky-50 to-white border-sky-200", 
      time: "afternoon" 
    },
    { 
      title: "Little Scientists", 
      desc: "Water density tests, color mixing, and plant growth.", 
      Icon: KiteIcon, 
      color: "rose", 
      bgClass: "from-rose-50 to-white border-rose-200", 
      time: "afternoon" 
    }
  ];

  // Facilities List
  const facilities = [
    {
      title: "Smart Classrooms",
      desc: "Interactive touch panels, ergonomic child-sized furniture, and anti-glare natural lighting.",
      tag: "Tech & Ergonomics",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-yellow/30"
    },
    {
      title: "Safe Agility Playground",
      desc: "Imported shock-absorbing rubber turf, padded climbing frames, and shaded sandbox areas.",
      tag: "100% Child-Safe",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-green/30"
    },
    {
      title: "Montessori & STEAM Lab",
      desc: "Dedicated tactile learning room equipped with wooden counting rods, gears, and puzzles.",
      tag: "Hands-on Learning",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-cyan/30"
    },
    {
      title: "Children's Story Library",
      desc: "Cozy reading nooks filled with plush cushions, puppet stages, and over 1,200 picture books.",
      tag: "Literacy Hub",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-purple/30"
    },
    {
      title: "Indoor Soft Play Area",
      desc: "Temperature-controlled ball pit, foam obstacle blocks, and mini climbing walls.",
      tag: "All-Weather Play",
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-red/30"
    },
    {
      title: "Organic Dining Kitchen",
      desc: "Licensed in-house chef preparing fresh, nutritionist-approved warm lunches and snacks daily.",
      tag: "Health & Nutrition",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
      accent: "border-vannam-yellow/30"
    }
  ];

  // Teachers List
  const teachers = [
    {
      name: "Mrs. Clara Bennett",
      role: "Principal & Founder",
      qual: "M.Ed Early Childhood Education (14+ Yrs)",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      intro: "Passionate about creating nurturing environments where every child feels seen, loved, and inspired to explore.",
      badge: "Founder",
      badgeColor: "bg-vannam-yellow/10 text-vannam-orange"
    },
    {
      name: "Ms. Priya Patel",
      role: "Montessori Lead Educator",
      qual: "Certified Montessori Trainer & Child Psychologist",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
      intro: "Specializes in tactile sensory learning and building early phonics confidence through playful discovery.",
      badge: "Montessori Lead",
      badgeColor: "bg-vannam-green/10 text-vannam-green"
    },
    {
      name: "Mrs. Sarah Jenkins",
      role: "Playgroup & Toddler Lead",
      qual: "B.S. Child Development & Pediatric First Aid Certified",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      intro: "Loves introducing toddlers to their first group social experiences with gentle encouragement and hugs.",
      badge: "Toddler Expert",
      badgeColor: "bg-vannam-red/10 text-vannam-red"
    },
    {
      name: "Mr. David Miller",
      role: "STEAM & Agility Coach",
      qual: "B.Ed Physical Education & LEGO Education Instructor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
      intro: "Inspires young minds through spatial building projects, balance tracks, and fun scientific experiments.",
      badge: "STEAM Coach",
      badgeColor: "bg-vannam-cyan/10 text-vannam-cyan"
    }
  ];

  // Gallery Images with Categories
  const galleryItems = [
    { id: 1, title: "Montessori Math Exploration", category: "classroom", src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Outdoor Agility Race", category: "sports", src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Annual Cultural Dance", category: "celebrations", src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Botany Garden Walk", category: "outdoor", src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Finger Painting Workshop", category: "activities", src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Grandparents Day Tea", category: "events", src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" },
    { id: 7, title: "Story Corner Reading", category: "classroom", src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" },
    { id: 8, title: "Little Scientists Lab", category: "activities", src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80" }
  ];

  const filteredGallery = galleryCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryCategory);

  // Testimonials List
  const testimonials = [
    {
      parent: "Dr. Ananya Sharma",
      child: "Aarav (Nursery)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "Vannam World Preschool transformed Aarav from a shy toddler into a confident, expressive reader. The live CCTV feed and daily digital updates give us total peace of mind while at work!"
    },
    {
      parent: "Michael & Jessica Vance",
      child: "Emma (Playgroup)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "The safety protocols are remarkable. Every staff member knows our daughter by name, and the organic chef-cooked meals solved our picky eating habits completely!"
    },
    {
      parent: "Rajesh & Meera Patel",
      child: "Vihaan (UKG)",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      quote: "The STEAM Lego lab and phonics program prepared Vihaan so well for Grade 1. He looks forward to school every single morning!"
    }
  ];

  // Upcoming Events List
  const upcomingEvents = [
    {
      title: "Annual Cultural & Arts Fest",
      date: "SEP 18",
      time: "10:00 AM - 01:00 PM",
      desc: "Stage performances, children's art exhibition, and music showcases.",
      category: "Celebration",
      badge: "bg-vannam-yellow/10 text-vannam-orange"
    },
    {
      title: "Parent-Teacher Harmony Meet",
      date: "OCT 05",
      time: "09:00 AM - 02:00 PM",
      desc: "One-on-one progress reviews, portfolio viewings, and developmental counseling.",
      category: "Academics",
      badge: "bg-vannam-green/10 text-vannam-green"
    },
    {
      title: "Junior Agility Sports Day",
      date: "OCT 24",
      time: "08:30 AM - 12:30 PM",
      desc: "Fun obstacle races, tricycle rally, and parent-child relay races.",
      category: "Sports",
      badge: "bg-vannam-cyan/10 text-vannam-cyan"
    },
    {
      title: "Botanical Garden Field Trip",
      date: "NOV 12",
      time: "09:00 AM - 01:30 PM",
      desc: "Guided nature walk, butterfly spotting, and organic seed planting session.",
      category: "Outdoor",
      badge: "bg-vannam-red/10 text-vannam-red"
    }
  ];

  // FAQs
  const faqs = [
    {
      q: "What is your teacher-to-child ratio?",
      a: "We strictly adhere to international early childhood standards: 1:4 for Toddlers, 1:6 for Playgroup, 1:8 for Nursery, and 1:10 for LKG/UKG. Each class also has dedicated assistant caregivers."
    },
    {
      q: "How does the parent CCTV access work?",
      a: "Enrolled parents receive secure login credentials via our Parent Portal app, granting real-time 4K camera access to their child's classroom and play areas during school hours."
    },
    {
      q: "What are your sanitization and health protocols?",
      a: "Classrooms and toys undergo medical-grade UV and non-toxic sanitization twice daily. Daily biometric temperature checks take place at entry, and full-time nursing support is present on campus."
    },
    {
      q: "Do you provide meals or should parents pack food?",
      a: "We serve fresh, organic mid-morning snacks and balanced hot lunches prepared daily in our licensed kitchen. Special dietary restrictions and allergies are strictly customized for each child."
    }
  ];

  // How We Differ Differentiators Data with Interactive Proof Points
  // How We Differ Differentiators Data with Practical Real-World Facts
  const differentiators = [
    {
      id: "methodology",
      feature: "Classroom Learning & Screen Policy",
      shortTitle: "Zero Screens & Hands-On STEAM",
      vannamPoints: [
        "100% Zero-screen policy during school hours",
        "Sensory Montessori wooden kits & phonics rods",
        "Daily 45-min outdoor garden & botany discovery"
      ],
      traditionalPoints: [
        "Passive TV screen/tablet video watching",
        "Paper worksheets & mechanical textbook tracing",
        "Indoor-only seating with limited outdoor play"
      ],
      icon: "🎨",
      highlight: "Hands-On Pedagogy",
      stat: "0 Mins",
      statLabel: "Classroom Screen Time",
      proofTag: "Montessori & Early STEAM Accredited"
    },
    {
      id: "safety",
      feature: "CCTV Transparency & Campus Security",
      shortTitle: "Live 4K Parent CCTV Feed",
      vannamPoints: [
        "Live 4K mobile camera stream (8:30 AM – 4:00 PM)",
        "Biometric RFID parent pick-up ID verification",
        "Full-time pediatric nurse & CPR staff on campus"
      ],
      traditionalPoints: [
        "Closed-door policy with zero live camera access",
        "Manual paper sign-in log at front gate",
        "Basic first-aid box without medical staff"
      ],
      icon: "🛡️",
      highlight: "Total Visibility",
      stat: "8:30–4:00",
      statLabel: "Live App Streaming Hours",
      proofTag: "256-Bit Encrypted Security Portal"
    },
    {
      id: "ratio",
      feature: "Classroom Staffing & Educator Ratios",
      shortTitle: "1:4 Low Ratio Individual Care",
      vannamPoints: [
        "1 Lead Teacher + 1 Caregiver per 4 Toddlers (1:4)",
        "100% Background-checked & certified educators",
        "Personalized potty training & nap assistance"
      ],
      traditionalPoints: [
        "1 Teacher managing 18 to 25 kids alone (1:22)",
        "Unverified staff with basic orientation only",
        "Quiet or shy children easily get overlooked"
      ],
      icon: "👩‍🏫",
      highlight: "Individual Attention",
      stat: "1:4",
      statLabel: "Toddler Staff Ratio",
      proofTag: "100% Verified Credentials"
    },
    {
      id: "nutrition",
      feature: "Campus Dining & Meal Preparation",
      shortTitle: "In-House Organic Chef Meals",
      vannamPoints: [
        "In-house chef cooks fresh morning & lunch meals",
        "100% Organic fruits, vegetables & warm soups",
        "Strict custom allergy & dietary tracking per child"
      ],
      traditionalPoints: [
        "Parents must pack cold morning lunchboxes daily",
        "Commercial processed snacks & sugary drinks",
        "No dedicated kitchen or chef on premises"
      ],
      icon: "🍎",
      highlight: "Fresh Organic Dining",
      stat: "3 Meals",
      statLabel: "Fresh Daily Meals Included",
      proofTag: "Licensed Child Nutritionist Menu"
    },
    {
      id: "architecture",
      feature: "Campus Hygiene & Soft Play Architecture",
      shortTitle: "Sanitized Soft Play Campus",
      vannamPoints: [
        "Twice-daily UV-C medical toy disinfection",
        "Anti-slip padded soft rubber play turf & soft gym",
        "Rounded furniture, finger-guard doors & zero VOC paint"
      ],
      traditionalPoints: [
        "Standard weekly surface wiping with soap",
        "Hard tiled indoor floors & concrete playgrounds",
        "Sharp desk corners & standard wall paint"
      ],
      icon: "🏰",
      highlight: "Child-Safe Ergonomics",
      stat: "2x Daily",
      statLabel: "Medical Sanitization Audits",
      proofTag: "ISO 9001 Safety Standards"
    },
    {
      id: "updates",
      feature: "Daily Activity & Homework Command Center",
      shortTitle: "Daily Activity & Homework Portal",
      vannamPoints: [
        "Live schedule tracking: classes, reading circles & activities",
        "Actionable homework portal with due dates & materials attached",
        "7-Shades progress insights, teacher chat & 4K live streams"
      ],
      traditionalPoints: [
        "Handwritten paper diary note given at pick-up",
        "No visibility into pending homework or daily activities",
        "Brief quarterly report sheet without learning insights"
      ],
      icon: "📱",
      highlight: "Daily Activity Cockpit",
      stat: "Live",
      statLabel: "Schedule & Homework Tracker",
      proofTag: "7-Shades Parent Portal"
    }
  ];

  // Awards & Recognition Data with Modern 3D Card Badges
  const awardsData = [
    {
      id: "best-preschool",
      year: "2025 - 2026",
      title: "Best International Preschool of the Year",
      issuer: "Global Early Childhood Summit",
      badge: "National Gold Winner",
      stat: "#1 Ranked",
      score: "99.8 / 100",
      icon: "🏆",
      accentBg: "from-[#FFFBEB] to-white border-[#FDE68A]",
      badgeClass: "bg-vannam-yellow text-[#0F2963]",
      highlight: "Global Excellence Honors",
      desc: "Top global honors for 7-shade early development pedagogy, 1:4 low educator ratio & child safety.",
      certificateNo: "REG-INTL-2025-GOLD-092",
      authority: "Council for International Early Education Standards",
      criteria: "Evaluated across 42 parameters including STEAM integration, cognitive milestone tracking & child psychological safety.",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "safety-seal",
      year: "2025",
      title: "National Child Safety & Hygiene Benchmark",
      issuer: "SafeCare Schools Board",
      badge: "5-Star Safety Seal",
      stat: "100% Score",
      score: "Grade A+ Flawless",
      icon: "🛡️",
      accentBg: "from-[#ECFDF5] to-white border-[#A7F3D0]",
      badgeClass: "bg-emerald-600 text-white",
      highlight: "Flawless Safety Rating",
      desc: "Highest rating for zero-compromise architectural safety, 4K CCTV transparency & daily UV sanitization.",
      certificateNo: "SAFE-CARE-CERT-8841-A",
      authority: "National Pediatric Safety & Health Commission",
      criteria: "Audits of biometric pick-up security, 4K CCTV stream integrity, daily UV-C toy disinfection & CPR staff certification.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "steam-pedagogy",
      year: "2024 - 2025",
      title: "Pioneering STEAM & Montessori Leader",
      issuer: "Innovative Early Educators Federation",
      badge: "Curriculum Leader",
      stat: "Top 1%",
      score: "Proprietary 7-Shade Model",
      icon: "🔬",
      accentBg: "from-[#F0F9FF] to-white border-[#BAE6FD]",
      badgeClass: "bg-vannam-cyan text-white",
      highlight: "Top 1% Worldwide",
      desc: "Commended for replacing passive screen time with self-directed tactile exploration & active logic building.",
      certificateNo: "FIEE-STEAM-2024-INNOV",
      authority: "Global Association for Montessori & STEAM Research",
      criteria: "Evaluated on tactile sensory engagement, interactive robotics block play & fine-motor pencil grip development.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "parent-choice",
      year: "2024 - 2025",
      title: "Most Loved Preschool by Parents",
      issuer: "ParentChoice (1,200+ Verified Reviews)",
      badge: "Parent Choice #1",
      stat: "4.98 / 5.0",
      score: "1,248 Verified Votes",
      icon: "❤️",
      accentBg: "from-[#FFF1F2] to-white border-[#FECDD3]",
      badgeClass: "bg-vannam-red text-white",
      highlight: "99.4% Family Trust",
      desc: "Voted #1 preschool by parents for genuine teacher compassion, daily photo logs & a joyful second home.",
      certificateNo: "PCA-VOTE-2024-WINNER",
      authority: "Independent Parent Trust & School Evaluation Network",
      criteria: "Direct parent survey on educator warmth, communication transparency, organic dining & child happiness.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="relative min-h-screen font-sans text-[#0F2963] bg-[#FFFDF8] bg-playful-dots selection:bg-vannam-yellow/20 selection:text-vannam-orange">



      <header className="sticky top-0 z-50 bg-white  shadow-xs">
        <div className="max-w-[1440px] mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2.5 sm:gap-3 xl:gap-6">
          
          {/* Logo & School Name */}
          <Link href="/" className="flex items-center group shrink-0">
            <img 
              src="/logo.png" 
              alt="Vannam World Preschool Logo" 
              className="h-9 xs:h-10 sm:h-12 lg:h-13 xl:h-14 w-auto object-contain group-hover:scale-105 transition transform"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-1 xl:mx-3 gap-0.5 xl:gap-1.5 2xl:gap-2 text-[12px] xl:text-[13px] 2xl:text-[14px] font-bold text-[#0F2963]">
            <a href="#about" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">About</a>
            <a href="#programs" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Programs</a>
            <a href="#facilities" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Facilities</a>
            <a href="#safety" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Safety</a>
            <a href="#teachers" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Teachers</a>
            <a href="#gallery" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Gallery</a>

            {/* Explore Dropdown for Secondary Sections */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap cursor-pointer">
                <span>Explore</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50 min-w-[210px] animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-2xl shadow-xl border border-[#CBD8F6] p-2 space-y-1">
                  <a href="#why-us" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">⭐ Why Choose Us</a>
                  <a href="#approach" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">🌱 7-Shade Approach</a>
                  <a href="#activities" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">🧸 Activities & Play</a>
                  <a href="#testimonials" className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">💬 Parent Reviews</a>
                </div>
              </div>
            </div>

            <a href="#contact" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Contact</a>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
            <button
              onClick={() => setIsFeeCalcOpen(true)}
              className="p-2 rounded-full text-[#334155] hover:text-[#0F2963] hover:bg-[#E8EEFB] transition shrink-0"
              title="Fee Calculator"
              aria-label="Fee Calculator"
            >
              <Calculator className="w-4 h-4 xl:w-5 xl:h-5" />
            </button>

            <button
              onClick={() => setIsPortalModalOpen(true)}
              className="btn-secondary px-3 xl:px-4 py-2 xl:py-2.5 text-xs xl:text-sm flex items-center gap-1.5 xl:gap-2 whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#0F2963]" />
              <span>Parent Portal</span>
            </button>

            <button
              onClick={() => setIsTourModalOpen(true)}
              className="btn-primary px-3 xl:px-4 py-2 xl:py-2.5 text-xs xl:text-sm flex items-center gap-1.5 xl:gap-2 whitespace-nowrap shrink-0"
            >
              <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-vannam-yellow" />
              <span>Book a Visit</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#E8EEFB] text-[#0F2963] hover:bg-slate-200 active:scale-95 transition flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer - Clean Full Screen Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[100] bg-white overflow-y-auto scrollbar-none animate-in fade-in slide-in-from-top-4 duration-300 flex flex-col justify-between p-4 xs:p-5 pb-16">
            <div className="space-y-4 xs:space-y-5">
              
              {/* Header with Logo & Close */}
              <div className="sticky top-0 bg-white z-20 flex items-center justify-between border-b border-[#E8EEFB] pb-3.5 pt-1">
                <div className="flex items-center gap-2">
                  <img 
                    src="/logo.png" 
                    alt="Vannam World Preschool" 
                    className="h-9 xs:h-10 w-auto object-contain"
                  />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-[#F0F4FC] hover:bg-rose-50 text-[#0F2963] hover:text-[#E11D48] active:scale-95 transition border border-[#CBD8F6] flex items-center justify-center shadow-xs min-w-[44px] min-h-[44px]"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Navigation Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1.5 px-1">
                  <Compass className="w-3.5 h-3.5 text-vannam-orange" />
                  <span>Campus Navigation</span>
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-xs xs:text-sm font-extrabold text-[#0F2963]">
                  <a href="#about" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-amber-50 active:bg-amber-100 flex items-center gap-2 transition min-h-[44px]">🏫 About Us</a>
                  <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-emerald-50 active:bg-emerald-100 flex items-center gap-2 transition min-h-[44px]">🎨 Programs</a>
                  <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-amber-50 active:bg-amber-100 flex items-center gap-2 transition min-h-[44px]">⭐ Why Us</a>
                  <a href="#approach" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-sky-50 active:bg-sky-100 flex items-center gap-2 transition min-h-[44px]">🌱 Approach</a>
                  <a href="#activities" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-rose-50 active:bg-rose-100 flex items-center gap-2 transition min-h-[44px]">🧸 Activities</a>
                  <a href="#facilities" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-emerald-50 active:bg-emerald-100 flex items-center gap-2 transition min-h-[44px]">🏰 Facilities</a>
                  <a href="#safety" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-blue-50 active:bg-blue-100 flex items-center gap-2 transition min-h-[44px]">🛡️ Safety</a>
                  <a href="#teachers" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-amber-50 active:bg-amber-100 flex items-center gap-2 transition min-h-[44px]">👩‍🏫 Teachers</a>
                  <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-sky-50 active:bg-sky-100 flex items-center gap-2 transition min-h-[44px]">📸 Gallery</a>
                  <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-rose-50 active:bg-rose-100 flex items-center gap-2 transition min-h-[44px]">💬 Reviews</a>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-emerald-50 active:bg-emerald-100 flex items-center gap-2 transition min-h-[44px]">📍 Contact</a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2.5 border-t border-[#E8EEFB]">
                <button
                  onClick={() => { setMobileMenuOpen(false); triggerConfetti(); setIsTourModalOpen(true); }}
                  className="btn-primary w-full py-3.5 text-center text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md min-h-[48px]"
                >
                  <Calendar className="w-4 h-4 text-vannam-yellow" />
                  <span>Book a Campus Tour</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setIsFeeCalcOpen(true); }}
                    className="btn-cyan w-full py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Fee Calculator</span>
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); setIsPortalModalOpen(true); }}
                    className="btn-secondary w-full py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
                  >
                    <Lock className="w-4 h-4 text-[#0F2963]" />
                    <span>Parent Portal</span>
                  </button>
                </div>
              </div>

              <div className="pt-1 text-center text-xs font-bold text-[#64748B]">
                <a href="tel:+18005557529" className="text-vannam-orange flex items-center justify-center gap-1.5 min-h-[44px]">
                  <Phone className="w-3.5 h-3.5" /> Direct Admissions: +1 (800) 555-PLAY
                </a>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-4 pb-0 sm:pt-10 sm:pb-0 lg:pt-16 lg:pb-0 overflow-hidden bg-section-hero">
        {/* Subtle Background Organic Glows */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-vannam-yellow/15 via-vannam-red/8 to-vannam-cyan/15 rounded-full blur-3xl -z-10 opacity-90 pointer-events-none" />
        {/* Mobile-only extra ambient glows for depth */}
        <div className="lg:hidden absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-amber-200/40 to-rose-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="lg:hidden absolute top-20 right-0 w-40 h-40 bg-gradient-to-bl from-sky-200/40 to-emerald-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-r from-vannam-yellow/20 via-vannam-red/10 to-vannam-purple/15 rounded-full blur-2xl -z-10 pointer-events-none" />
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop screens) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/3 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <StorybookStackIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 text-amber-400 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PinwheelToy className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 animate-float-reverse" />
        </div>

        {/* PLAYFUL DECORATIVE ANIMATIONS (Visible on Mobile & Desktop) */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-6 xl:left-16 animate-float pointer-events-none z-10 opacity-80 sm:opacity-100">
          <RainbowIcon className="w-10 h-6 sm:w-20 sm:h-12 xl:w-24 xl:h-14 drop-shadow-xs" />
        </div>
        <div className="absolute top-3 right-3 sm:top-6 sm:right-8 xl:right-20 animate-float-reverse pointer-events-none z-10 opacity-85 sm:opacity-100">
          <div className="flex items-center gap-1 sm:gap-2">
            <HappyCloudIcon className="w-8 h-5 sm:w-14 sm:h-10 xl:w-16 xl:h-11 drop-shadow-xs" />
            <SmilingSunIcon className="w-7 h-7 sm:w-12 sm:h-12 xl:w-14 xl:h-14 drop-shadow-xs" />
          </div>
        </div>
        <div className="absolute bottom-6 left-2 sm:bottom-14 sm:left-10 animate-wiggle pointer-events-none z-10 opacity-80 sm:opacity-100">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white/85 backdrop-blur-xs p-1 sm:p-2 rounded-xl sm:rounded-2xl border border-[#E8EEFB] shadow-xs">
            <AlphabetBlock letter="A" color="rose" className="w-5 h-5 sm:w-8 sm:h-8 drop-shadow-xs" />
            <AlphabetBlock letter="B" color="amber" className="w-5 h-5 sm:w-8 sm:h-8 drop-shadow-xs -mt-1" />
            <AlphabetBlock letter="C" color="sky" className="w-5 h-5 sm:w-8 sm:h-8 drop-shadow-xs" />
          </div>
        </div>
        <div className="absolute top-32 left-2 sm:top-44 sm:left-4 xl:left-12 animate-flutter pointer-events-none z-10 opacity-80 sm:opacity-85">
          <ButterflyIcon color="purple" className="w-5 h-5 sm:w-8 sm:h-8" />
        </div>
        <div className="absolute bottom-16 right-2 sm:bottom-24 sm:right-8 xl:right-16 animate-flutter pointer-events-none z-10 opacity-80 sm:opacity-90">
          <ButterflyIcon color="amber" className="w-5 h-5 sm:w-8 sm:h-8" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-5 text-center lg:text-left relative">
              
              {/* Mobile Preschool Header Greeting */}
              <div className="block lg:hidden mb-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-amber-50 to-rose-100 border border-amber-300/80 text-[#0F2963] text-xs font-bold shadow-xs backdrop-blur-xs">
                  <TeddyBearIcon className="w-4 h-4 text-vannam-yellow animate-bounce-gentle shrink-0" />
                  <span>Welcome to Vannam World Preschool</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#0F2963] leading-tight">
                Where Little Minds Begin <span className="text-vannam-yellow underline decoration-vannam-green decoration-2 sm:decoration-4 underline-offset-4 sm:underline-offset-8">Big Adventures</span> 🚀
              </h1>

              {/* Sub-paragraph */}
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                A warm, joyful, and certified preschool designed for parents who seek absolute safety, Montessori-inspired STEAM learning, and loving early childhood care.
              </p>

              {/* BESPOKE MOBILE STORYBOOK HERO CARD (Visible ONLY on Mobile/Tablet) */}
              <div className="block lg:hidden my-2.5 relative mx-auto w-full max-w-[290px] xs:max-w-[320px] px-1">
                
                {/* Rainbow Aura Glow Effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-300/30 via-rose-300/20 to-sky-300/30 rounded-2xl blur-md -z-10" />

                {/* Main Die-Cut Photo Frame with 3D Rounded Borders */}
                <div className="relative rounded-2xl overflow-hidden border-2 sm:border-[3px] border-white shadow-lg bg-white aspect-[16/10] mobile-hero-frame">
                  <Image 
                    src="/hero-kids.jpg" 
                    alt="Preschool children playing with colorful wooden blocks" 
                    fill 
                    sizes="(max-width: 768px) 320px, 50vw"
                    className="object-cover" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091A42]/75 via-transparent to-transparent" />
                  
                  {/* Top Corner Floating Sticker: Rainbow Fun */}
                  <div className="absolute top-2 left-2 z-20 pointer-events-none">
                    <div className="bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full border border-amber-200/80 shadow-xs flex items-center gap-1">
                      <RainbowIcon className="w-3.5 h-2.5" />
                      <span className="text-[9.5px] font-extrabold text-[#0F2963]">Play & Learn</span>
                    </div>
                  </div>

                  {/* Top Right Corner Floating Sticker: Age Tag */}
                  <div className="absolute top-2 right-2 z-20 pointer-events-none">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 border border-white/90">
                      <span className="text-[9.5px] font-bold">👶 Ages 1–6</span>
                    </div>
                  </div>

                  {/* Floating Confetti Quick-Apply Button on Right Inside Frame */}
                  <button 
                    onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
                    className="absolute bottom-2.5 right-2.5 z-20 btn-primary px-3 py-1 text-[10px] font-extrabold rounded-full shadow-md transition-transform active:scale-95 flex items-center gap-1 !min-h-0 h-auto"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="w-3 h-3 text-vannam-yellow" />
                  </button>
                </div>

              </div>

              {/* Dual Action CTAs for Mobile Parents (Width matches Hero image on mobile) */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-3 w-full max-w-[290px] xs:max-w-[320px] sm:max-w-md lg:max-w-none mx-auto">
                <button
                  onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
                  className="btn-primary w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg whitespace-nowrap min-h-[46px] sm:min-h-[52px] active:scale-95 transition-transform"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-vannam-yellow shrink-0 animate-bounce-gentle" />
                  <span>Book a Campus Visit</span>
                </button>

                <a
                  href="#programs"
                  className="btn-secondary w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base flex items-center justify-center gap-1.5 whitespace-nowrap min-h-[46px] sm:min-h-[52px] active:scale-95 transition-transform group"
                >
                  <span>Explore Programs</span>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vannam-navy shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Storybook Scene Transition Bridge on Mobile */}
              <div className="block lg:hidden pt-2">
                <StorybookTransitionBridge quote="Where little minds love to explore" />
              </div>

              {/* Desktop Quick Feature Pills */}
              <div className="hidden lg:flex items-center gap-3 pt-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#CBD8F6] shadow-xs text-xs font-bold text-[#0F2963]">
                  <span className="text-vannam-green">✓</span> 1:6 Loving Teacher Ratio
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#CBD8F6] shadow-xs text-xs font-bold text-[#0F2963]">
                  <span className="text-vannam-yellow">★</span> Organic In-House Chef
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#CBD8F6] shadow-xs text-xs font-bold text-[#0F2963]">
                  <span className="text-vannam-cyan">🛡️</span> 4K Parent Live Stream
                </div>
              </div>

            </div>

            {/* Desktop Hero Visual Layout */}
            <div className="hidden lg:block lg:col-span-5 relative">
              
              {/* Cute Floating Balloon Accent near image */}
              <div className="absolute -top-10 -left-6 animate-float pointer-events-none z-20">
                <FloatingBalloonsGroup className="w-16 h-20 drop-shadow-md" />
              </div>
              <div className="absolute -bottom-8 -right-6 animate-float-reverse pointer-events-none z-20">
                <BalloonIcon color="sky" className="w-10 h-14 drop-shadow-md" />
              </div>

              {/* Main Visual Container */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-4 border-vannam-yellow/40 shadow-2xl bg-white aspect-square">
                  <Image 
                    src="/hero-kids.jpg" 
                    alt="Preschool children playing with colorful wooden blocks" 
                    fill 
                    sizes="(max-width: 1200px) 50vw, 33vw"
                    className="object-cover" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Badge 1 */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8EEFB] shadow-lg flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-vannam-green flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 inline text-vannam-green" /> Admissions Open
                      </span>
                      <span className="font-heading font-extrabold text-sm text-[#0F2963] block">Limited Seats Available</span>
                    </div>
                    <button 
                      onClick={() => setIsTourModalOpen(true)}
                      className="btn-accent px-4 py-2 text-xs flex items-center gap-1 shrink-0"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>

                {/* Floating Decorative Card 2 - Teddy & Happy Graduates */}
                <div className="flex absolute -top-6 -right-6 bg-white p-3.5 rounded-2xl border-2 border-vannam-green/30 shadow-xl animate-float items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-vannam-green/10 flex items-center justify-center text-vannam-green shadow-xs">
                    <TeddyBearIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] block uppercase tracking-wider">Joyful Learners</span>
                    <Counter end={1500} className="font-heading font-bold text-sm text-[#0F2963] block" />
                  </div>
                </div>

                {/* Floating Decorative Card 3 - Little Stars Seal */}
                <div className="flex absolute -bottom-6 -left-6 bg-white p-2.5 rounded-2xl border-2 border-vannam-yellow/40 shadow-xl animate-bounce-gentle items-center gap-2">
                  <SparkleStarsGroup color="amber" className="w-6 h-6" />
                  <span className="text-xs font-extrabold text-[#0F2963]">5-Star Montessori</span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Playful Organic Wave Divider to About */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFFDF8" secondaryFill="#FFFBEB" strokeColor="#FDE68A" />
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-24 pt-8 pb-0 sm:pt-14 sm:pb-0 lg:pt-18 lg:pb-0 bg-section-about relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <StorybookStackIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 text-amber-500 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <BlossomFlowerIcon color="rose" className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-wiggle" />
        </div>

        {/* Floating Decorative Corner Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-10 animate-float pointer-events-none opacity-80 z-10">
          <BlossomFlowerIcon color="rose" className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-8 animate-float-reverse pointer-events-none opacity-80 z-10">
          <SproutPlantIcon className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-1/2 left-2 -translate-y-1/2 animate-flutter pointer-events-none opacity-75 z-10">
          <ButterflyIcon color="emerald" className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Header */}
          <ScrollReveal variant="reveal-page-turn" className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2 relative">
            <div className="flex items-center justify-center gap-3 mb-1">
              <PlantInPotIcon className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce-gentle" />
              <NatureSceneGroup className="opacity-90 scale-90 sm:scale-100" />
              <StorybookStackIcon className="w-7 h-7 sm:w-8 sm:h-8 animate-float" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/15 border border-vannam-yellow/30 px-3.5 py-1 rounded-full shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-vannam-red" />
              <span>About Vannam World</span>
            </div>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963] leading-tight">
              Building a Safe & Inspiring Foundation
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              Combining Montessori exploration with early STEAM inquiry, structured around your child&apos;s natural curiosity and comfort.
            </p>
          </ScrollReveal>

          {/* 3 Pillars - Horizontal Swipeable on Mobile, 3-Col Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 pb-2 mb-6 sm:mb-8 md:grid md:grid-cols-3 md:gap-6">
            
            {/* Philosophy */}
            <ScrollReveal variant="reveal-pop-bounce" stagger={1} className="w-[82vw] xs:w-[290px] shrink-0 snap-center md:w-auto bento-card card-amber p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 relative group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-vannam-yellow text-[#0F2963] flex items-center justify-center shadow-xs font-bold group-hover:scale-105 transition-transform">
                    <Heart className="w-5 h-5" />
                  </div>
                  <SparkleStarsGroup color="amber" className="w-5 h-5 opacity-60" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#0F2963]">Our Philosophy</h3>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Cultivating confidence through gentle encouragement, self-chosen exploration, and warm mentorship.
                </p>
              </div>
              <div className="pt-2 border-t border-amber-200/60 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                <span>🌱 Child-Led Discovery</span>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal variant="reveal-pop-bounce" stagger={2} className="w-[82vw] xs:w-[290px] shrink-0 snap-center md:w-auto bento-card card-emerald p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 relative group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-vannam-green text-white flex items-center justify-center shadow-xs font-bold group-hover:scale-105 transition-transform">
                    <Sun className="w-5 h-5" />
                  </div>
                  <SproutPlantIcon className="w-5 h-5 opacity-60" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#0F2963]">Our Mission</h3>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Providing a world-class, hygienic, and secure early learning space that builds lifelong emotional resilience.
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                <span>🛡️ Safe & Nurturing Care</span>
              </div>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal variant="reveal-pop-bounce" stagger={3} className="w-[82vw] xs:w-[290px] shrink-0 snap-center md:w-auto bento-card card-sky p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between space-y-3 relative group">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-vannam-cyan text-white flex items-center justify-center shadow-xs font-bold group-hover:scale-105 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <ButterflyIcon color="sky" className="w-5 h-5 opacity-60" />
                </div>
                <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#0F2963]">Our Vision</h3>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Setting global benchmarks in early education through cutting-edge STEAM inquiry and compassionate care.
                </p>
              </div>
              <div className="pt-2 border-t border-sky-200/60 flex items-center gap-1.5 text-[11px] font-bold text-sky-800">
                <span>🚀 Future-Ready Milestones</span>
              </div>
            </ScrollReveal>

          </div>

          {/* Statistics Bar with Playful Badges */}
          <ScrollReveal variant="reveal-hero-bloom" className="bg-[#0F2963] text-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-[#091A42] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center relative overflow-hidden">
            <div className="space-y-0.5 relative z-10">
              <Counter end={12} className="font-heading text-xl sm:text-3xl font-extrabold text-vannam-yellow block" />
              <span className="text-[11px] sm:text-xs font-semibold text-blue-100">Years Experience</span>
            </div>
            <div className="space-y-0.5 relative z-10">
              <Counter end={1500} className="font-heading text-xl sm:text-3xl font-extrabold text-vannam-green block" />
              <span className="text-[11px] sm:text-xs font-semibold text-blue-100">Happy Children</span>
            </div>
            <div className="space-y-0.5 relative z-10">
              <Counter end={25} className="font-heading text-xl sm:text-3xl font-extrabold text-vannam-cyan block" />
              <span className="text-[11px] sm:text-xs font-semibold text-blue-100">Qualified Teachers</span>
            </div>
            <div className="space-y-0.5 relative z-10">
              <Counter end={100} className="font-heading text-xl sm:text-3xl font-extrabold text-vannam-red block" />
              <span className="text-[11px] sm:text-xs font-semibold text-blue-100">Daily Activities</span>
            </div>
          </ScrollReveal>

          {/* Subtle Storytelling Bridge */}
          <NatureBridge className="mt-6 -mb-4" />

        </div>

        {/* Playful Organic Wave Divider to Programs */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FDF4FF" secondaryFill="#F0F9FF" strokeColor="#E9D5FF" />
      </section>

      {/* AGE-BASED PROGRAMS SECTION */}
      <section id="programs" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-programs relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PuzzlePieceIcon color="emerald" className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <StorybookIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-10 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <PuzzlePieceIcon color="emerald" className="w-7 h-7 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute top-6 right-3 sm:top-12 sm:right-12 animate-float-reverse pointer-events-none opacity-85 z-10">
          <StorybookIcon className="w-7 h-7 sm:w-12 sm:h-12 drop-shadow-xs" />
        </div>
        <div className="absolute bottom-6 left-3 sm:bottom-12 sm:left-12 animate-wiggle pointer-events-none opacity-85 z-10">
          <CrayonIcon color="rose" className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-12 sm:right-12 animate-flutter pointer-events-none opacity-85 z-10">
          <AlphabetBlock letter="P" color="purple" className="w-6 h-6 sm:w-9 sm:h-9" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <ScrollReveal variant="reveal-pop-bounce" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5">
            <div className="flex justify-center mb-1">
              <LearningSceneGroup className="opacity-90 scale-90 sm:scale-100" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-green bg-vannam-green/10 border border-vannam-green/30 px-3 py-1 rounded-full shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tailored Programs</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] leading-tight">
              Curriculum Built for <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Every Growth Stage</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Select your child's age group below to discover learning objectives, teacher ratios, and activities.
            </p>
          </ScrollReveal>

          {/* Program Tabs - Touch Horizontal Scroll with Snap on Mobile */}
          <ScrollReveal variant="reveal-paint-stroke" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 scrollbar-none snap-x justify-start sm:justify-center px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
            {Object.keys(programsData).map((key) => {
              const prog = programsData[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveProgramTab(key)}
                  className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition shrink-0 snap-center !min-h-0 ${
                    activeProgramTab === key
                      ? prog.activeTabStyle
                      : "bg-white text-[#0F2963] hover:bg-[#E8EEFB] border border-[#CBD8F6] shadow-2xs"
                  }`}
                >
                  {prog.toyType === "teddy" && <TeddyBearIcon className="w-4 h-4 shrink-0" />}
                  {prog.toyType === "blocks" && <AlphabetBlock letter="A" color="amber" className="w-4 h-4 shrink-0" />}
                  {prog.toyType === "puzzle" && <PuzzlePieceIcon color="emerald" className="w-4 h-4 shrink-0" />}
                  {prog.toyType === "crayons" && <CrayonIcon color="sky" className="w-4 h-4 shrink-0" />}
                  {prog.toyType === "storybook" && <StorybookIcon className="w-4 h-4 shrink-0" />}
                  <span>{prog.title}</span>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Active Program Card Showcase */}
          {activeProgramTab && (
            <ScrollReveal variant="reveal-pop-bounce" className="max-w-4xl mx-auto">
              <div className={`bento-card ${programsData[activeProgramTab].cardStyle} p-4 sm:p-6 md:p-8 transition-all duration-300 relative overflow-hidden`}>
                
                {/* Decorative Toy Watermark */}
                <div className="absolute top-3 right-3 opacity-20 sm:opacity-25 pointer-events-none">
                  {programsData[activeProgramTab].toyType === "teddy" && <TeddyBearIcon className="w-12 h-12 sm:w-20 sm:h-20" />}
                  {programsData[activeProgramTab].toyType === "blocks" && <AlphabetBlock letter="1" color="amber" className="w-12 h-12 sm:w-20 sm:h-20" />}
                  {programsData[activeProgramTab].toyType === "puzzle" && <PuzzlePieceIcon color="emerald" className="w-12 h-12 sm:w-20 sm:h-20" />}
                  {programsData[activeProgramTab].toyType === "crayons" && <CrayonIcon color="sky" className="w-12 h-12 sm:w-20 sm:h-20" />}
                  {programsData[activeProgramTab].toyType === "storybook" && <StorybookIcon className="w-12 h-12 sm:w-20 sm:h-20" />}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 sm:mb-4 relative">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold border ${programsData[activeProgramTab].badgeBg} mb-1 shadow-2xs`}>
                      Age: {programsData[activeProgramTab].age}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0F2963]">
                      {programsData[activeProgramTab].title}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-white/95 font-black text-xs text-[#0F2963] border border-[#CBD8F6] shadow-xs">
                    {programsData[activeProgramTab].ratio}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#0F2963] leading-relaxed mb-4 sm:mb-5 relative font-medium">
                  {programsData[activeProgramTab].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 relative">
                  
                  {/* Learning Objectives */}
                  <div className="bg-white/95 rounded-2xl p-3.5 sm:p-4.5 border border-[#CBD8F6]/80 shadow-xs space-y-2">
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-xs sm:text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-vannam-green shrink-0" />
                      <span>Key Learning Objectives</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-[#0F2963]">
                      {programsData[activeProgramTab].objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-vannam-yellow mt-1.5 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Activities */}
                  <div className="bg-white/95 rounded-2xl p-3.5 sm:p-4.5 border border-[#CBD8F6]/80 shadow-xs space-y-2">
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-xs sm:text-sm flex items-center gap-1.5">
                      <Play className="w-4 h-4 text-vannam-yellow shrink-0" />
                      <span>Core Daily Activities</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {programsData[activeProgramTab].activities.map((act, i) => (
                        <span key={i} className="px-2.5 py-1 bg-[#E8EEFB]/90 rounded-lg text-[11px] font-bold text-[#0F2963] flex items-center gap-1 shadow-2xs">
                          <Check className="w-3 h-3 text-vannam-green shrink-0" />
                          <span>{act}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Enquire CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#0F2963]/10 relative">
                  <span className="text-xs font-bold text-[#334155] text-center sm:text-left">
                    Interested in {programsData[activeProgramTab].title}?
                  </span>
                  <button
                    onClick={() => setIsTourModalOpen(true)}
                    className="btn-primary w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm !min-h-0 flex items-center justify-center shadow-md gap-2 active:scale-95 transition-transform"
                  >
                    <Calendar className="w-3.5 h-3.5 text-vannam-yellow" />
                    <span>Enquire for Admission</span>
                  </button>
                </div>

              </div>
            </ScrollReveal>
          )}

          {/* Rainbow Arc Bridge */}
          <RainbowArcBridge className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Why Us */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#ECFDF5" secondaryFill="#EFF6FF" strokeColor="#A7F3D0" />
      </section>

      {/* HOW WE DIFFER FROM OTHER SCHOOLS (WHY US) SECTION */}
      <section id="why-us" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-why-us relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <RainbowIcon className="w-12 h-8 xs:w-14 xs:h-10 sm:w-20 sm:h-14 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <TeddyBearIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-wiggle" />
        </div>

        {/* Floating Decorative Elements (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <RainbowIcon className="w-8 h-5 sm:w-14 sm:h-9 drop-shadow-sm" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 animate-float-reverse pointer-events-none opacity-80 z-10">
          <PuzzlePieceIcon color="amber" className="w-7 h-7 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute top-20 right-3 sm:top-24 sm:right-10 animate-flutter pointer-events-none opacity-85 z-10">
          <ButterflyIcon color="rose" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4 sm:space-y-6">
          {/* Section Header */}
          <ScrollReveal variant="reveal-split-left" className="text-center max-w-3xl mx-auto space-y-1.5 sm:space-y-2 mb-2 sm:mb-4">
            <div className="flex justify-center mb-1">
              <PlaySceneGroup className="opacity-90 scale-90 sm:scale-100" />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vannam-yellow/10 border border-vannam-yellow/30 text-vannam-orange text-[11px] font-extrabold uppercase tracking-widest shadow-2xs">
              <Star className="w-3.5 h-3.5 shrink-0" />
              <span>Interactive Standard Comparison</span>
            </span>
            
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              How We Differ From{" "}
              <span className="inline-block whitespace-nowrap text-vannam-yellow underline decoration-vannam-green underline-offset-4 sm:underline-offset-6">Other Schools</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Tap any feature parameter below to compare side-by-side:
            </p>
          </ScrollReveal>

          {/* FEATURE SELECTOR CARDS */}
          <ScrollReveal variant="reveal-pop-bounce" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 items-stretch">
            {differentiators.map((item, idx) => {
              const isSelected = activeWhyUsTab === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveWhyUsTab(idx);
                    if (typeof window !== "undefined" && window.innerWidth < 1024) {
                      setSelectedComparisonModal(item);
                    }
                  }}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-between text-center gap-2.5 min-h-[112px] sm:min-h-[126px] h-full active:scale-95 cursor-pointer shadow-2xs group relative overflow-hidden ${
                    isSelected
                      ? "bg-[#0F2963] text-white border-vannam-yellow shadow-md ring-2 ring-vannam-yellow/30"
                      : "bg-white text-[#0F2963] border-[#CBD8F6]/80 hover:bg-[#F0F4FC] hover:border-[#00A8E8] hover:shadow-md"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl transform group-hover:scale-115 transition-transform duration-300">{item.icon}</span>
                  <span className={`text-[11px] sm:text-xs font-extrabold leading-tight px-0.5 line-clamp-2 ${
                    isSelected ? "text-white" : "text-[#0F2963] group-hover:text-[#00A8E8]"
                  }`}>{item.shortTitle}</span>
                  <div className="flex items-center gap-1">
                    <span className={`text-[8.5px] sm:text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                      isSelected 
                        ? "bg-vannam-yellow text-[#0F2963]" 
                        : "bg-[#E8EEFB] text-[#00A8E8] group-hover:bg-[#00A8E8] group-hover:text-white"
                    } transition-colors`}>
                      {item.stat}
                    </span>
                    <span className="text-[10.5px] text-vannam-orange font-bold lg:hidden opacity-80">↗</span>
                  </div>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Mobile Tap Hint (Mobile Only) */}
          <p className="block lg:hidden text-center text-[10.5px] font-bold text-[#64748B] -mt-1 sm:-mt-2">
            👉 Tap any feature card above to view full comparison
          </p>

          {/* DESKTOP VIEW: DUAL-PANEL COMPARISON COCKPIT (Desktop Only - lg:block) */}
          {(() => {
            const current = differentiators[activeWhyUsTab];
            return (
              <div className="hidden lg:block">
                <ScrollReveal variant="reveal-gate-open" className="bg-white rounded-3xl border-2 border-[#CBD8F6] shadow-lg p-6 lg:p-8 relative overflow-hidden animate-in fade-in zoom-in-95">
                  
                  {/* Cockpit Top Bar */}
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E8EEFB]">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl p-2.5 rounded-2xl bg-[#F0F4FC] border border-[#CBD8F6] shrink-0">{current.icon}</span>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#00A8E8] block">{current.highlight}</span>
                        <h3 className="font-heading font-extrabold text-xl text-[#0F2963] leading-tight">{current.feature}</h3>
                      </div>
                    </div>

                    <span className="px-4 py-1.5 rounded-full bg-vannam-yellow/15 border border-vannam-yellow/40 text-[#0F2963] text-xs font-black shadow-2xs">
                      🏆 Verified Benchmark: {current.proofTag}
                    </span>
                  </div>

                  {/* Split Dual-Panel Side-by-Side Cockpit */}
                  <div className="grid grid-cols-2 gap-6 pt-6 items-stretch">
                    
                    {/* LEFT PANEL: VANNAM WORLD */}
                    <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-2xl p-5 border-2 border-[#A7F3D0] space-y-3 shadow-xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-emerald-300/50">
                          <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Vannam Standard</span>
                          </span>
                          <span className="font-heading font-black text-xl text-emerald-950">{current.stat}</span>
                        </div>

                        {/* Visual Checkmark Pills */}
                        <div className="space-y-2 pt-1">
                          {current.vannamPoints.map((pt, i) => (
                            <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/95 border border-emerald-300/80 shadow-2xs min-h-[46px]">
                              <div className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs shrink-0">
                                ✓
                              </div>
                              <span className="text-sm font-bold text-[#0F2963] leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL: TRADITIONAL SCHOOLS */}
                    <div className="bg-gradient-to-br from-rose-50/70 to-slate-100/70 rounded-2xl p-5 border-2 border-rose-200 space-y-3 shadow-xs flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-1.5 border-b border-rose-200/60">
                          <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                            <X className="w-3.5 h-3.5 text-rose-400" />
                            <span>Traditional Daycares</span>
                          </span>
                          <span className="font-heading font-bold text-sm text-slate-500">Baseline</span>
                        </div>

                        {/* Visual Warning Pills */}
                        <div className="space-y-2 pt-1">
                          {current.traditionalPoints.map((pt, i) => (
                            <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/85 border border-rose-200/80 shadow-2xs min-h-[46px]">
                              <div className="w-5 h-5 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs shrink-0">
                                ✕
                              </div>
                              <span className="text-sm font-semibold text-slate-600 leading-snug">{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </ScrollReveal>
              </div>
            );
          })()}

          {/* Bottom Trust CTA Strip */}
          <ScrollReveal variant="reveal-hero-bloom" className="bento-card p-4 sm:p-5 bg-gradient-to-r from-vannam-yellow/15 via-white to-vannam-cyan/15 border-2 border-vannam-yellow/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-vannam-yellow text-[#0F2963] flex items-center justify-center text-2xl shrink-0 shadow-xs font-bold">
                🧸
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963]">See the difference with your own eyes</h4>
                <p className="text-[11px] sm:text-xs text-[#334155] font-medium">Join a 30-minute private campus walk-through with our academic principal.</p>
              </div>
            </div>

            <button
              onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
              className="btn-primary w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold shrink-0 flex items-center justify-center gap-2 shadow-md !min-h-0 active:scale-95 transition-transform"
            >
              <Calendar className="w-4 h-4 text-vannam-yellow" />
              <span>Schedule Campus Visit</span>
            </button>
          </ScrollReveal>

          {/* Cloud Bridge */}
          <CloudBridge label="7 Shades of Growth" className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into 7-Shades Methodology */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFF7ED" secondaryFill="#ECFDF5" strokeColor="#FED7AA" />
      </section>

      {/* INNOVATIVE LEARNING METHODOLOGY SECTION (7 SHADES OF GROWTH) */}
      <section id="methodology" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-methodology relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <ArtPaletteIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <MusicNotesCluster className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <PaintSplatterIcon color="amber" className="w-7 h-7 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute top-6 right-3 sm:top-12 sm:right-10 animate-float-reverse pointer-events-none opacity-85 z-10">
          <MusicNotesCluster className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute bottom-6 left-3 sm:bottom-10 sm:left-10 animate-flutter pointer-events-none opacity-85 z-10">
          <ButterflyIcon color="purple" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-12 sm:right-12 animate-wiggle pointer-events-none opacity-80 z-10">
          <BlossomFlowerIcon color="sky" className="w-6 h-6 sm:w-9 sm:h-9" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex justify-center mb-1">
              <CreativitySceneGroup className="opacity-90 scale-90 sm:scale-100" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#CBD8F6] shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#0F2963] shrink-0" />
              <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-[#0F2963]">
                The 7-Shade Growth Spectrum
              </span>
            </div>

            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] leading-tight">
              How Children Learn & Flourish: <br className="hidden sm:block" />
              <span className="text-[#00A8E8] underline decoration-[#F59E0B] underline-offset-4 sm:underline-offset-6">The 7 Shades</span> of Development
            </h2>

            <p className="text-xs sm:text-sm text-[#334155] font-medium leading-relaxed max-w-xl mx-auto">
              Rooted in our signature motto <em>&quot;Learning Through Every Shade of Play&quot;</em>. Tap each shade below to explore tools and milestones.
            </p>
          </div>

          {/* MOBILE & TABLET VIEW: SHORT COMPACT CARDS (Click to pop up full card) */}
          <div className="block lg:hidden mb-6 sm:mb-8">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
              {methodologyShades.map((shade) => {
                const Icon = shade.icon;
                return (
                  <button
                    key={`mobile-card-${shade.id}`}
                    type="button"
                    onClick={() => setSelectedMethodologyModal(shade)}
                    className="w-[78vw] max-w-[290px] shrink-0 snap-center bg-white/95 backdrop-blur-xl rounded-2xl border-2 p-3.5 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                    style={{ borderColor: `${shade.hex}50` }}
                  >
                    {/* Top Color Accent Strip */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
                      style={{ backgroundColor: shade.hex }}
                    />

                    <div className="space-y-2 pt-1">
                      {/* Header with Icon, Title & Duration */}
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div 
                            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs shrink-0"
                            style={{ backgroundColor: `${shade.hex}20`, color: shade.hex }}
                          >
                            <Icon className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          <div className="min-w-0">
                            <span 
                              className="text-[9px] font-black uppercase tracking-wider block truncate"
                              style={{ color: shade.hex }}
                            >
                              {shade.shadeName}
                            </span>
                            <h3 className="font-heading text-sm font-extrabold text-[#0F2963] leading-tight truncate">
                              {shade.title}
                            </h3>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#F0F4FC] text-[#0F2963] text-[8.5px] font-extrabold border border-[#CBD8F6] shrink-0">
                          {shade.dailyDuration.split(" ")[0]} {shade.dailyDuration.split(" ")[1]}
                        </span>
                      </div>

                      {/* Tagline / Teaser Quote */}
                      <p className="text-[11px] font-bold italic line-clamp-1" style={{ color: shade.hex }}>
                        &ldquo;{shade.quote}&rdquo;
                      </p>

                      {/* Short Description */}
                      <p className="text-[11px] text-[#334155] leading-relaxed line-clamp-2">
                        {shade.description}
                      </p>
                    </div>

                    {/* Bottom Tap to Expand Indicator */}
                    <div 
                      className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-extrabold"
                      style={{ color: shade.hex }}
                    >
                      <span className="flex items-center gap-1">
                        <span>Tap to view full card</span>
                        <span className="animate-pulse">✨</span>
                      </span>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-50 group-hover:translate-x-0.5 transition-transform text-xs">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Mobile swipe hint */}
            <p className="text-center text-[10.5px] font-bold text-[#64748B] mt-1 flex items-center justify-center gap-1">
              <span>👉 Swipe & tap any card to open full details</span>
            </p>
          </div>

          {/* DESKTOP VIEW: Interactive Radial Color Wheel & Glassmorphism Reveal (Hidden on Mobile) */}
          <div 
            className="hidden lg:grid grid-cols-12 gap-10 items-center relative z-10 mb-8"
          >
            {/* Global Hidden Sync Timer for Methodology Wheel */}
            <div 
              key={activeMethodologyShade}
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
              style={{ 
                animation: 'smoothDrawCircle 1.7s linear forwards',
                animationPlayState: isMethodologyAutoPaused ? 'paused' : 'running'
              }}
              onAnimationEnd={() => {
                setActiveMethodologyShade((prev) => {
                  const currentIndex = methodologyShades.findIndex(s => s.id === prev);
                  const nextIndex = (currentIndex + 1) % methodologyShades.length;
                  return methodologyShades[nextIndex].id;
                });
              }}
            />
            
            {/* Interactive Radial Color Wheel (Desktop Only) */}
            <div className="col-span-5 flex justify-center items-center relative">
              {(() => {
                const currentShade = methodologyShades.find(s => s.id === activeMethodologyShade) || methodologyShades[0];
                const ActiveIcon = currentShade.icon;
                
                return (
                  <div className="relative w-[360px] h-[360px] aspect-square rounded-full flex items-center justify-center mx-auto">
                    
                    {/* Injecting CSS Keyframe for the smooth SVG circular loading animation */}
                    <style>{`
                      @keyframes smoothDrawCircle {
                        0% { stroke-dashoffset: 289; }
                        100% { stroke-dashoffset: 0; }
                      }
                    `}</style>

                    {/* Rotating Dashed Orbit Ring */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 -z-10 animate-[spin_25s_linear_infinite]" viewBox="0 0 400 400">
                      <circle cx="200" cy="200" r="152" stroke="#0F2963" strokeWidth="2" strokeDasharray="8 8" fill="none" />
                    </svg>

                    {/* Center Hub */}
                    <div 
                      className="w-32 h-32 rounded-full z-20 flex flex-col items-center justify-center transition-all duration-500 bg-white shadow-xl p-1.5 text-center"
                      style={{ 
                        border: `4px solid ${currentShade.hex}`
                      }}
                    >
                      <ActiveIcon className="w-12 h-12 mb-0.5 transition-colors duration-500 shrink-0" style={{ color: currentShade.hex }} />
                      <span className="text-[10.5px] font-black uppercase text-[#0F2963] leading-tight px-0.5 truncate max-w-full">
                        {currentShade.title}
                      </span>
                    </div>

                    {/* Orbiting 7 Nodes with Percentage Positioning for Responsive Scaling */}
                    {methodologyShades.map((shade, i) => {
                      const angle = (i * (360 / methodologyShades.length)) - 90;
                      const rad = (angle * Math.PI) / 180;
                      const leftPercent = 50 + 38 * Math.cos(rad);
                      const topPercent = 50 + 38 * Math.sin(rad);
                      const isActive = activeMethodologyShade === shade.id;
                      const Icon = shade.icon;

                      return (
                        <button
                          key={shade.id}
                          onClick={() => {
                            setActiveMethodologyShade(shade.id);
                            setIsMethodologyAutoPaused(true);
                          }}
                          onMouseEnter={() => setIsMethodologyAutoPaused(true)}
                          onMouseLeave={() => setIsMethodologyAutoPaused(false)}
                          aria-label={`Select ${shade.title}`}
                          className={`absolute w-13 h-13 rounded-full flex flex-col items-center justify-center transition-all duration-300 group z-30 ${
                            isActive 
                              ? "shadow-xl ring-2 ring-white scale-110" 
                              : "opacity-80 hover:opacity-100 shadow-2xs hover:scale-105"
                          }`}
                          style={{
                            left: `${leftPercent}%`,
                            top: `${topPercent}%`,
                            transform: `translate(-50%, -50%)`,
                            backgroundColor: isActive ? shade.hex : "#ffffff",
                            color: isActive ? "#ffffff" : shade.hex,
                            border: isActive ? 'none' : `1.5px solid ${shade.hex}40`,
                            boxShadow: isActive ? `0 8px 20px -4px ${shade.hex}80` : "none"
                          }}
                        >
                          {/* Animated Outer Loading Ring for Active Bubble */}
                          {isActive && (
                            <svg 
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] transform -rotate-90 pointer-events-none" 
                              viewBox="0 0 100 100"
                            >
                              <circle cx="50" cy="50" r="46" fill="none" stroke={`${shade.hex}30`} strokeWidth="4" />
                              <circle 
                                key={shade.id}
                                cx="50" cy="50" r="46" 
                                fill="none" 
                                stroke={shade.hex} 
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="289"
                                style={{ 
                                  animation: 'smoothDrawCircle 1.7s linear forwards',
                                  animationPlayState: isMethodologyAutoPaused ? 'paused' : 'running'
                                }}
                              />
                            </svg>
                          )}

                          <Icon className="w-5 h-5 stroke-[2.5] relative z-10" />
                          
                          {/* Floating Tooltip Label */}
                          {!isActive && (
                            <div className="absolute top-[110%] w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                              <span className="bg-white text-[#0F2963] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm border border-[#E8EEFB] block">
                                {shade.title}
                              </span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Right: Glassmorphism Dynamic Content Reveal (Desktop Only) */}
            <div className="col-span-7 relative">
              {(() => {
                const currentShade = methodologyShades.find(s => s.id === activeMethodologyShade) || methodologyShades[0];
                const ActiveIcon = currentShade.icon;

                return (
                  <div 
                    key={currentShade.id}
                    className="bg-white/95 backdrop-blur-xl rounded-3xl border-2 p-7 shadow-lg transition-all duration-700 relative overflow-hidden animate-in fade-in slide-in-from-right-4"
                    style={{ borderColor: `${currentShade.hex}40` }}
                  >
                    {/* Background Watermark Icon */}
                    <div 
                      className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none transition-transform duration-700 rotate-12 scale-110"
                      style={{ color: currentShade.hex }}
                    >
                      <ActiveIcon className="w-60 h-60" />
                    </div>

                    <div className="relative z-10 space-y-4">
                      
                      {/* Badge & Title */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span 
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs"
                            style={{
                              backgroundColor: `${currentShade.hex}20`,
                              color: currentShade.hex
                            }}
                          >
                            <span>{currentShade.tagline}</span>
                          </span>

                          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0F2963] text-[9.5px] font-extrabold border border-[#CBD8F6] shadow-2xs">
                            {currentShade.dailyDuration}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-heading text-2xl font-extrabold text-[#0F2963] leading-tight mb-0.5 transition-colors duration-500">
                            {currentShade.title}
                          </h3>
                          <p className="text-xs font-bold italic" style={{ color: currentShade.hex }}>
                            &ldquo;{currentShade.quote}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <p className="text-sm text-[#334155] font-medium leading-relaxed">
                        {currentShade.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3.5 pt-1">
                        
                        {/* Tools / Montessori Block */}
                        <div className="bg-white rounded-2xl p-3.5 border border-[#E8EEFB] shadow-2xs space-y-1.5">
                          <h4 className="font-heading font-extrabold text-xs text-[#0F2963] flex items-center gap-1.5 border-b border-[#F0F4FC] pb-1.5">
                            <Puzzle className="w-3.5 h-3.5 shrink-0" style={{ color: currentShade.hex }} />
                            <span>Tactile Tools Used</span>
                          </h4>
                          <ul className="space-y-1">
                            {currentShade.tools.map((tool, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px] font-medium text-[#334155]">
                                <span className="text-[12px] mt-0.5 leading-none shrink-0" style={{ color: currentShade.hex }}>•</span>
                                <span><strong className="text-[#0F2963]">{tool.name}:</strong> {tool.desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Milestones / Benefit Block */}
                        <div className="bg-white rounded-2xl p-3.5 border border-[#E8EEFB] shadow-2xs space-y-1.5">
                          <h4 className="font-heading font-extrabold text-xs text-[#0F2963] flex items-center gap-1.5 border-b border-[#F0F4FC] pb-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-vannam-orange shrink-0" />
                            <span>Scientific Insight</span>
                          </h4>
                          <p className="text-[11px] text-[#0F2963] font-bold leading-snug bg-[#F0F4FC] p-2 rounded-xl border border-[#CBD8F6]">
                            {currentShade.scientificInsight}
                          </p>
                          <ul className="space-y-1 mt-1">
                            {currentShade.milestones.slice(0, 2).map((milestone, idx) => (
                              <li key={idx} className="flex items-center gap-1 text-[10.5px] font-bold text-[#334155]">
                                <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: currentShade.hex }} />
                                <span>{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Action Button */}
                      <div className="pt-1">
                        <button
                          onClick={() => setIsTourModalOpen(true)}
                          className={`${currentShade.btnClass} px-5 py-2.5 text-sm font-bold flex items-center justify-center gap-1.5 shadow-md transition-transform hover:-translate-y-0.5 !min-h-0`}
                        >
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>Experience {currentShade.title} In Campus</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </div>
            
          </div>

          {/* Bottom Row: The 4 Pillars of the 7-Shade Learning System */}
          <div className="mt-4 sm:mt-6 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            
            <div className="bento-card card-yellow p-3 sm:p-4 space-y-1.5 relative group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F59E0B] text-[#0F2963] font-bold text-base sm:text-lg flex items-center justify-center shadow-xs border border-white">
                🌱
              </div>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight">Self-Paced Freedom</h4>
              <p className="text-[10.5px] sm:text-[11px] text-[#334155] font-medium leading-snug">
                Children choose activities based on curiosity, building focus without pressure.
              </p>
            </div>

            <div className="bento-card card-green p-3 sm:p-4 space-y-1.5 relative group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#10B981] text-white font-bold text-base sm:text-lg flex items-center justify-center shadow-xs border border-white">
                🔬
              </div>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight">Tactile STEAM Labs</h4>
              <p className="text-[10.5px] sm:text-[11px] text-[#334155] font-medium leading-snug">
                Touching and manipulating real materials connects concepts to reality.
              </p>
            </div>

            <div className="bento-card card-cyan p-3 sm:p-4 space-y-1.5 relative group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#00A8E8] text-white font-bold text-base sm:text-lg flex items-center justify-center shadow-xs border border-white">
                👩‍🏫
              </div>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight">Loving 1:4 to 1:8 Ratio</h4>
              <p className="text-[10.5px] sm:text-[11px] text-[#334155] font-medium leading-snug">
                Every teacher acts as a guide, tailoring steps to each child&apos;s pace.
              </p>
            </div>

            <div className="bento-card card-red p-3 sm:p-4 space-y-1.5 relative group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F43F5E] text-white font-bold text-base sm:text-lg flex items-center justify-center shadow-xs border border-white">
                📱
              </div>
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight">Daily Activity & Homework Portal</h4>
              <p className="text-[10.5px] sm:text-[11px] text-[#334155] font-medium leading-snug">
                Real-time schedule tracking, actionable homework tasks, and 7-shades learning insights.
              </p>
            </div>

          </div>

        </div>

        {/* Wave Divider into Daily Activities */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFF1F2" secondaryFill="#FFFBEB" strokeColor="#FECDD3" />
      </section>

      {/* DAILY ACTIVITIES SECTION */}
      <section id="activities" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-activities relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <SmilingSunIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PaperPlaneIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float-reverse" />
        </div>

        {/* CHILD-ATTRACTIVE FLOATING DECORATIONS (Fills empty spaces on Mobile & Desktop) */}
        <div className="absolute top-6 left-2 sm:top-6 sm:left-6 animate-float pointer-events-none opacity-85 z-10 flex items-center gap-1">
          <SmilingSunIcon className="w-7 h-7 sm:w-11 sm:h-11 drop-shadow-xs" />
          <RainbowIcon className="w-8 h-5 sm:w-12 sm:h-8 drop-shadow-xs hidden xs:block" />
        </div>
        <div className="absolute top-6 right-2 sm:top-6 sm:right-8 animate-float-reverse pointer-events-none opacity-90 z-10 flex items-center gap-1.5">
          <HappyCloudIcon className="w-7 h-5 sm:w-11 sm:h-8" />
          <FloatingBalloonsGroup className="w-7 h-9 sm:w-11 sm:h-14 drop-shadow-xs" />
        </div>

        {/* Mid-Flank Toy Accents */}
        <div className="absolute top-1/3 left-1 sm:left-4 animate-bounce-gentle pointer-events-none opacity-80 z-10">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-xl border border-amber-200/80 shadow-2xs">
            <AlphabetBlock letter="1" color="amber" className="w-4 h-4 sm:w-6 sm:h-6" />
            <AlphabetBlock letter="2" color="sky" className="w-4 h-4 sm:w-6 sm:h-6 -mt-1" />
            <AlphabetBlock letter="3" color="rose" className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1 sm:right-4 animate-flutter pointer-events-none opacity-85 z-10 flex flex-col items-center gap-1">
          <PinwheelToy className="w-6 h-6 sm:w-9 sm:h-9 animate-spin-slow" />
          <ButterflyIcon color="rose" className="w-5 h-5 sm:w-7 sm:h-7" />
        </div>

        {/* Lower Corner Accents */}
        <div className="absolute bottom-4 left-2 sm:bottom-8 sm:left-8 animate-drift pointer-events-none opacity-85 z-10 flex items-center gap-1.5">
          <PaperPlaneIcon className="w-6 h-6 sm:w-9 sm:h-9" />
          <CrayonIcon color="sky" className="w-5 h-5 sm:w-7 sm:h-7 hidden xs:block" />
        </div>
        <div className="absolute bottom-4 right-2 sm:bottom-8 sm:right-8 animate-wiggle pointer-events-none opacity-80 z-10 flex items-center gap-1">
          <MusicNotesCluster className="w-6 h-6 sm:w-8 sm:h-8" />
          <ToyCarIcon className="w-6 h-6 sm:w-8 sm:h-8 hidden xs:block" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section Header with Child-Attractive Mascot Scene */}
          <ScrollReveal variant="reveal-spin-drop" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1">
              <TeddyBearIcon className="w-7 h-7 sm:w-9 sm:h-9 animate-bounce-gentle" />
              <CreativitySceneGroup className="opacity-95 scale-90 sm:scale-100" />
              <PinwheelToy className="w-6 h-6 sm:w-8 sm:h-8 animate-float" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-red bg-rose-100 border border-rose-300 px-3 py-1 rounded-full shadow-2xs">
              <Clock className="w-3.5 h-3.5" />
              <span>A Day at Vannam World Preschool</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Joyful <span className="text-vannam-red underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Daily Activities</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Every hour is balanced between structured learning, free play, organic dining, and restful quiet time.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-3.5 sm:gap-6 items-start">
            
            {/* Timeline Tabs - 3-col Grid on Mobile, Sticky Column on Desktop */}
            <ScrollReveal variant="reveal-calendar-flip" className="lg:col-span-4 grid grid-cols-3 lg:flex lg:flex-col gap-1.5 sm:gap-2.5 pb-1 lg:pb-0 lg:sticky lg:top-28 z-10">
              {[
                { id: "morning", label: "Morning", sub: "8:00 - 11:00 AM", icon: Sun, color: "text-[#F59E0B]", activeBorder: "border-[#F59E0B]", bg: "bg-amber-100" },
                { id: "mid-day", label: "Mid-Day", sub: "11:00 - 12:00 PM", icon: Cloud, color: "text-[#F97316]", activeBorder: "border-[#F97316]", bg: "bg-orange-100" },
                { id: "afternoon", label: "Afternoon", sub: "1:00 - 4:00 PM", icon: Moon, color: "text-[#8B5CF6]", activeBorder: "border-[#8B5CF6]", bg: "bg-purple-100" }
              ].map((tab) => {
                const isActive = activeRoutineTab === tab.id;
                const Icon = tab.icon;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRoutineTab(tab.id)}
                    className={`w-full text-center sm:text-left p-2.5 sm:p-3.5 rounded-2xl transition-all duration-200 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 border-2 group !min-h-0 ${
                      isActive 
                        ? `bg-white shadow-md ${tab.activeBorder} scale-[1.01] sm:scale-102` 
                        : "bg-white/70 border-[#CBD8F6]/60 hover:bg-white hover:border-[#CBD8F6]"
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${isActive ? tab.bg : "bg-[#F0F4FC] group-hover:bg-gray-100"}`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? tab.color : "text-gray-400 group-hover:text-gray-600"}`} />
                    </div>
                    <div className="min-w-0">
                      <span className={`block font-heading font-extrabold text-[11px] sm:text-xs truncate ${isActive ? "text-[#0F2963]" : "text-gray-600"}`}>
                        {tab.label}
                      </span>
                      <span className={`block text-[8.5px] sm:text-[10px] font-bold truncate ${isActive ? tab.color : "text-gray-400"}`}>
                        {tab.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </ScrollReveal>

            {/* Dynamic Activity Cards Grid (2 Grids per row on mobile) */}
            <div className="lg:col-span-8 relative">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3.5">
                {dailyActivities
                  .filter((act) => act.time === activeRoutineTab)
                  .map((act, i) => {
                    const CardIcon = act.Icon;
                    
                    return (
                      <ScrollReveal 
                        key={`${activeRoutineTab}-${i}`} 
                        variant="reveal-spin-drop"
                        stagger={((i % 3) + 1)}
                        className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br ${act.bgClass} p-3 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-300 group hover:-translate-y-0.5 flex flex-col justify-between`}
                      >
                        {/* Background Watermark SVG */}
                        <div className="absolute -right-3 -top-3 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
                          <CardIcon className="w-18 h-18 sm:w-28 sm:h-28" color={act.color} />
                        </div>

                        {/* Interactive Floating Icon */}
                        <div className="relative z-10 bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-xs border border-white/80 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform duration-300 shrink-0">
                          <CardIcon className="w-4 h-4 sm:w-6 sm:h-6" color={act.color} />
                        </div>

                        <div className="relative z-10 space-y-1">
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#0F2963]/70 bg-white/80 px-2 py-0.5 rounded-md inline-block shadow-2xs">
                            {act.time}
                          </span>
                          <h3 className="font-heading font-extrabold text-[#0F2963] text-xs sm:text-sm leading-tight">
                            {act.title}
                          </h3>
                          <p className="text-[10.5px] sm:text-xs text-[#334155] font-medium leading-snug">
                            {act.desc}
                          </p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
              </div>
            </div>

          </div>

          {/* Doodle Divider */}
          <DoodleDivider className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Facilities */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#F0F9FF" secondaryFill="#EFF6FF" strokeColor="#BAE6FD" />
      </section>

      {/* FACILITIES SECTION */}
      <section id="facilities" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-facilities relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <SchoolCastleIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 text-blue-600 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PlaygroundSlideIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <SchoolCastleIcon className="w-7 h-7 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute top-6 right-3 sm:top-10 sm:right-10 animate-float-reverse pointer-events-none opacity-85 z-10">
          <SproutPlantIcon className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section Header */}
          <ScrollReveal variant="reveal-gate-open" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center gap-3 mb-1">
              <SchoolCastleIcon className="w-8 h-8 text-vannam-navy animate-float" />
              <PlaygroundSlideIcon className="w-8 h-8 animate-bounce-gentle" />
              <SchoolBusToyIcon className="w-9 h-9 animate-wiggle" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>World-Class Campus</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Facilities Engineered for <br className="hidden sm:block" />
              <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Safety & Wonder</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Designed from the ground up with rounded edges, medical-grade air filtration, and engaging play environments.
            </p>
          </ScrollReveal>

          {/* FACILITIES CARDS: 1-Col on Mobile, 2-Col on Tablet, 3-Col on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
            {facilities.map((fac, idx) => (
              <ScrollReveal key={idx} variant="reveal-gate-open" stagger={((idx % 3) + 1)} className={`w-full bento-card overflow-hidden border-2 ${fac.accent} group flex flex-col justify-between rounded-2xl sm:rounded-3xl`}>
                <div className="relative h-36 xs:h-40 sm:h-44 w-full overflow-hidden">
                  <Image 
                    src={fac.image} 
                    alt={fac.title} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500" 
                    priority={false}
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black text-[#0F2963] shadow-xs">
                    {fac.tag}
                  </div>
                </div>
                <div className="p-3.5 sm:p-4.5 space-y-1">
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963]">{fac.title}</h3>
                  <p className="text-[11px] sm:text-xs text-[#334155] leading-relaxed line-clamp-2">{fac.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <CloudBridge label="Safe Campus & Care" className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Safety */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#ECFDF5" secondaryFill="#F0F9FF" strokeColor="#A7F3D0" />
      </section>

      {/* YOUR CHILD'S SAFETY & PROTECTION SECTION */}
      <section id="safety" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-safety relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <ShieldSecurityBadge className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-pulse-subtle" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <SparkleStarsGroup className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <SparkleStarsGroup className="w-7 h-7 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 animate-float-reverse pointer-events-none opacity-80 z-10">
          <ButterflyIcon color="emerald" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Section Header */}
          <ScrollReveal variant="reveal-shield-pulse" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center gap-3 mb-1">
              <ShieldSecurityBadge className="w-8 h-8 animate-pulse-subtle" />
              <SafetySceneGroup className="opacity-90 scale-90 sm:scale-100" />
              <ShieldSecurityBadge className="w-8 h-8 animate-pulse-subtle scale-x-[-1]" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Compromise Security Standard</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Your Child&apos;s Safety <br className="hidden sm:block" />
              <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Comes First. Always.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              From biometric pickup gates and 4K encrypted parent live streams to full-time pediatric CPR staff, we protect your peace of mind.
            </p>
          </ScrollReveal>

          {/* 4 Safety Pillars - 2-Col Grid on Mobile, 4-Col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
            {[
              {
                title: "Biometric Access",
                desc: "Strict gate security allowing entry only to authorized parents & staff.",
                badge: "RFID Gates",
                image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
                color: "card-amber",
                badgeColor: "bg-vannam-yellow text-[#0F2963]",
                icon: Lock
              },
              {
                title: "24/7 Live CCTV",
                desc: "Watch classroom learning anytime via encrypted parent portal streaming.",
                badge: "4K Stream",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                color: "card-emerald",
                badgeColor: "bg-vannam-green text-white",
                icon: Eye
              },
              {
                title: "Pediatric CPR",
                desc: "All teachers & caregivers trained in pediatric first aid and emergency care.",
                badge: "First-Aid On-Site",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
                color: "card-sky",
                badgeColor: "bg-vannam-cyan text-white",
                icon: Award
              },
              {
                title: "Child-Safe Campus",
                desc: "Rounded furniture corners, finger-guards, and daily UV-C toy sanitization.",
                badge: "UV-C Sanitized",
                image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
                color: "card-rose",
                badgeColor: "bg-vannam-red text-white",
                icon: CheckCircle2
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`bento-card ${item.color} p-2.5 sm:p-4 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 group rounded-2xl`}
                >
                  <div>
                    {/* Photo with Tag */}
                    <div className="relative h-24 xs:h-28 sm:h-36 w-full rounded-xl overflow-hidden mb-2">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-black ${item.badgeColor} shadow-2xs`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-white/90 flex items-center justify-center text-[#0F2963] shrink-0 shadow-2xs">
                          <Icon className="w-3 h-3" />
                        </div>
                        <h3 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[10px] sm:text-xs text-[#334155] leading-snug line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-black/5 mt-2 flex items-center gap-1 text-[10px] sm:text-xs font-black text-emerald-800">
                    <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">Certified Safety</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reassurance Trust Banner */}
          <div className="bg-[#F0F4FC] border-2 border-[#CBD8F6] rounded-2xl p-3.5 sm:p-4.5 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center shadow-xs">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-[#00A8E8] shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold text-[#0F2963]">256-Bit Encrypted Parent App</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-vannam-yellow shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold text-[#0F2963]">Pediatric First-Aid Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-vannam-green shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold text-[#0F2963]">UV-C Disinfected Daily</span>
            </div>
          </div>

        </div>

        {/* Wave Divider into Teachers */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FAF5FF" secondaryFill="#FFF1F2" strokeColor="#E9D5FF" />
      </section>

      {/* TEACHERS & LEADERSHIP SECTION */}
      <section id="teachers" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-teachers relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <TeacherApplesTrophy className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 text-amber-500 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <StorybookStackIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 text-sky-500 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <AlphabetBlock letter="T" color="amber" className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-6 right-3 sm:top-10 sm:right-10 animate-float-reverse pointer-events-none opacity-85 z-10">
          <CrayonIcon color="sky" className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <ScrollReveal variant="reveal-heart-grow" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center gap-3 mb-1">
              <TeacherApplesTrophy className="w-8 h-8 animate-bounce-gentle" />
              <NatureSceneGroup className="opacity-90 scale-90 sm:scale-100" />
              <StorybookStackIcon className="w-7 h-7 animate-float" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/15 border border-vannam-yellow/30 px-3 py-1 rounded-full shadow-2xs">
              <Users className="w-3.5 h-3.5" />
              <span>Loving Educators</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Meet Our Certified & <br className="hidden sm:block" />
              <span className="text-vannam-yellow underline decoration-vannam-green underline-offset-4 sm:underline-offset-6">Warm Teachers</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Every educator at Vannam World Preschool holds early childhood degrees, background checks, and a deep love for guiding young learners.
            </p>
          </ScrollReveal>

          {/* 2 Grids per row on Mobile, 4 on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {teachers.map((t, idx) => (
              <ScrollReveal key={idx} variant="reveal-heart-grow" stagger={((idx % 4) + 1)} className="bento-card p-2.5 sm:p-4 space-y-2 sm:space-y-3 hover:-translate-y-1 transition duration-200 flex flex-col justify-between rounded-2xl">
                <div>
                  <div className="relative h-28 xs:h-32 sm:h-48 w-full rounded-xl overflow-hidden mb-2">
                    <Image src={t.image} alt={t.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" />
                    <span className={`absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-extrabold ${t.badgeColor} shadow-2xs`}>
                      {t.badge}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-heading font-extrabold text-xs sm:text-base text-[#0F2963] truncate">{t.name}</h3>
                    <span className="text-[10px] sm:text-xs font-bold text-vannam-orange block truncate">{t.role}</span>
                    <span className="text-[9px] sm:text-[11px] font-semibold text-[#64748B] block truncate">{t.qual}</span>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-[#334155] leading-snug line-clamp-2">{t.intro}</p>
              </ScrollReveal>
            ))}
          </div>

          <NatureBridge className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Gallery */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFFBEB" secondaryFill="#FDF4FF" strokeColor="#FDE68A" />
      </section>

      {/* GALLERY SECTION WITH LIGHTBOX */}
      <section id="gallery" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-gallery relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <ArtPaletteIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PinwheelToy className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <ArtPaletteIcon className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 animate-float-reverse pointer-events-none opacity-85 z-10">
          <Camera className="w-6 h-6 sm:w-10 sm:h-10 text-vannam-cyan" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <ScrollReveal variant="reveal-polaroid" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex justify-center mb-1">
              <CreativitySceneGroup className="opacity-90 scale-90 sm:scale-100" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-2xs">
              <Camera className="w-3.5 h-3.5" />
              <span>Campus Scrapbook Moments</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Moments of <span className="text-vannam-cyan underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Joy & Discovery</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Explore snapshots of classroom STEAM activities, outdoor sports, and seasonal celebrations.
            </p>
          </ScrollReveal>

          {/* Filter Tabs - Compact Bento Pills */}
          <ScrollReveal variant="reveal-paint-stroke" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 mb-4 sm:mb-6 scrollbar-none snap-x justify-start sm:justify-center px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
            {[
              { id: "all", label: "All Moments", icon: "✨" },
              { id: "classroom", label: "Classroom", icon: "📚" },
              { id: "activities", label: "Creative Art", icon: "🎨" },
              { id: "events", label: "Celebrations", icon: "🎉" },
              { id: "sports", label: "Agility & Sports", icon: "🏃" },
              { id: "outdoor", label: "Nature & Garden", icon: "🌱" }
            ].map((cat) => {
              const count = cat.id === "all" 
                ? galleryItems.length 
                : galleryItems.filter(item => item.category === cat.id || (cat.id === "events" && (item.category === "events" || item.category === "celebrations"))).length;
              const isSelected = galleryCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setGalleryCategory(cat.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-extrabold capitalize transition shrink-0 snap-center !min-h-0 flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                    isSelected
                      ? "bg-[#0F2963] text-white border border-[#1D4ED8] shadow-xs scale-105"
                      : "bg-white/90 text-[#0F2963] hover:bg-[#E8EEFB] border border-[#CBD8F6]/70"
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
          </ScrollReveal>

          {/* COMPACT BENTO GRID CONTAINER */}
          <ScrollReveal variant="reveal-gentle-rise" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {filteredGallery.map((item, idx) => {
              // Dynamic bento sizing with explicit responsive heights for 100% reliable rendering
              let bentoClass = "col-span-1 h-36 xs:h-40 sm:h-48 lg:h-52";
              if (galleryCategory === "all") {
                if (idx === 0) {
                  bentoClass = "col-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2 h-56 xs:h-64 sm:h-76 lg:h-[432px]";
                } else if (idx === 3) {
                  bentoClass = "col-span-2 sm:col-span-2 lg:col-span-2 h-36 xs:h-40 sm:h-48 lg:h-52";
                }
              }

              return (
                <div 
                  key={item.id} 
                  onClick={() => setActiveLightboxImage(item)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border-2 border-[#CBD8F6]/80 shadow-xs hover:border-[#F59E0B] hover:shadow-lg transition-all duration-300 hover:scale-[1.015] bg-slate-900 ${bentoClass}`}
                >
                  <Image 
                    src={item.src} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
                  />
                  
                  {/* Subtle Top Gradient Bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091A42]/85 via-[#091A42]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />
                  
                  {/* Decorative Polaroid Scrapbook Tag */}
                  <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 backdrop-blur-md border border-amber-300 text-[8.5px] sm:text-[9.5px] font-black text-[#0F2963] px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                    <span>📸</span>
                    <span className="capitalize">{item.category}</span>
                  </div>

                  {/* Top-Right Expand Icon */}
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0F2963]/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-xs z-10">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Bottom Compact Caption Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3.5 z-10 flex flex-col justify-end">
                    <h3 className="font-heading font-extrabold text-xs sm:text-sm lg:text-base text-white leading-tight drop-shadow-sm line-clamp-1 group-hover:text-vannam-yellow transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-1 text-[9.5px] sm:text-[10.5px] text-blue-100 font-semibold opacity-90">
                      <span>Click to view photo</span>
                      <span className="group-hover:translate-x-1 transition-transform">↗</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>

          <RainbowArcBridge className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Testimonials */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFF7ED" secondaryFill="#FAF5FF" strokeColor="#FED7AA" />
      </section>

      {/* PARENT TESTIMONIALS SECTION */}
      <section id="testimonials" className="scroll-mt-24 pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-testimonials relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <ParentLoveBadge className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <FloatingBalloonsGroup className="w-10 h-12 xs:w-12 xs:h-14 sm:w-18 sm:h-20 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <FloatingBalloonsGroup className="w-8 h-10 sm:w-12 sm:h-16" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 animate-float-reverse pointer-events-none opacity-85 z-10">
          <BlossomFlowerIcon color="rose" className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <ScrollReveal variant="reveal-bubble-float" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5">
            <div className="flex items-center justify-center gap-3 mb-1">
              <ParentLoveBadge className="w-8 h-8 animate-bounce-gentle" />
              <PlaySceneGroup className="opacity-90 scale-90 sm:scale-100" />
              <ParentLoveBadge className="w-8 h-8 animate-bounce-gentle scale-x-[-1]" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/15 border border-vannam-yellow/30 px-3 py-1 rounded-full shadow-2xs">
              <MessageCircle className="w-3.5 h-3.5 text-vannam-orange" />
              <span>Parent Love & Reviews</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Trusted by Hundreds of{" "}
              <span className="text-vannam-yellow underline decoration-vannam-cyan underline-offset-4 sm:underline-offset-6">Happy Families</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Read authentic reviews from parents about their child's growth, safety experience, and academic readiness.
            </p>
          </ScrollReveal>

          {/* Testimonial Cards: 1-Col on Mobile, 3-Col on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={idx} variant="reveal-bubble-float" stagger={idx + 1} className="w-full bento-card p-4 sm:p-6 space-y-2.5 sm:space-y-3.5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 rounded-2xl shadow-xs border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-rose-50/30">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-vannam-yellow">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-rose-500 animate-pulse-subtle">💛 Verified Family</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0F2963] italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#E8EEFB]">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border-2 border-vannam-yellow/40">
                    <Image src={t.avatar} alt={t.parent} fill sizes="100px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-xs sm:text-sm">{t.parent}</h4>
                    <span className="text-[10px] sm:text-[11px] font-bold text-vannam-orange block">Parent of {t.child}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <NatureBridge className="mt-6 -mb-4" />

        </div>

        {/* Wave Divider into Events */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#EFF6FF" secondaryFill="#FFFBEB" strokeColor="#BFDBFE" />
      </section>

      {/* UPCOMING SCHOOL EVENTS */}
      <section className="pt-8 pb-0 sm:pt-12 sm:pb-0 lg:pt-16 lg:pb-0 bg-section-interactive relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <PartyCelebrationIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <BalloonIcon color="sky" className="w-10 h-12 xs:w-12 xs:h-15 sm:w-16 sm:h-20 animate-float-reverse" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-8 sm:left-8 animate-float pointer-events-none opacity-80 z-10">
          <Calendar className="w-6 h-6 sm:w-10 sm:h-10 text-vannam-yellow" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-8 animate-float-reverse pointer-events-none opacity-85 z-10">
          <PaperPlaneIcon className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <ScrollReveal variant="reveal-calendar-flip" className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-center gap-3 mb-1">
              <PartyCelebrationIcon className="w-8 h-8 animate-bounce-gentle" />
              <BalloonIcon color="sky" className="w-6 h-8 animate-float" />
              <PartyCelebrationIcon className="w-8 h-8 animate-bounce-gentle scale-x-[-1]" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-cyan bg-vannam-cyan/10 px-3 py-1 rounded-full shadow-2xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>School Calendar</span>
            </div>
            <h2 className="font-heading text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F2963] leading-tight">
              Upcoming School Events & Celebrations
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              We invite parents to participate in regular workshops, sports days, and cultural celebrations.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4">
            {upcomingEvents.map((ev, idx) => (
              <div key={idx} className="bento-card p-3.5 sm:p-5 rounded-2xl flex flex-row items-center gap-3 sm:gap-4 hover:border-vannam-yellow/40 hover:-translate-y-0.5 transition-all duration-200 shadow-xs">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-2xl bg-vannam-yellow text-[#0F2963] flex flex-col items-center justify-center shrink-0 shadow-xs">
                  <span className="font-heading font-black text-sm xs:text-base sm:text-lg leading-none">{ev.date.split(" ")[1]}</span>
                  <span className="text-[8px] xs:text-[9px] font-extrabold uppercase tracking-widest">{ev.date.split(" ")[0]}</span>
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold ${ev.badge}`}>
                      {ev.category}
                    </span>
                    <span className="text-[10.5px] sm:text-xs text-[#64748B] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-vannam-yellow" /> {ev.time}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-xs sm:text-base text-[#0F2963] leading-tight truncate">{ev.title}</h3>
                  <p className="text-[10.5px] sm:text-xs text-[#334155] leading-snug line-clamp-2">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Wave Divider into FAQs */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#FFFDF8" secondaryFill="#FFFBEB" strokeColor="#CBD8F6" />
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section className="pt-10 pb-0 sm:pt-14 sm:pb-0 lg:pt-18 lg:pb-0 bg-section-about relative overflow-hidden">
        
        {/* BACKGROUND ART (Fills empty side whitespace on mobile & desktop) */}
        <div className="absolute -left-1 xs:left-1 sm:-left-2 2xl:left-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <SproutPlantIcon className="w-10 h-10 xs:w-12 xs:h-12 sm:w-18 sm:h-18 animate-float" />
        </div>
        <div className="absolute -right-1 xs:right-1 sm:-right-2 2xl:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-15 sm:opacity-20 select-none z-0">
          <ButterflyIcon color="amber" className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 animate-flutter" />
        </div>

        {/* Floating Storytelling Accents (Visible on Mobile & Desktop) */}
        <div className="absolute top-6 left-3 sm:top-10 sm:left-10 animate-float pointer-events-none opacity-80 z-10">
          <SproutPlantIcon className="w-7 h-7 sm:w-10 sm:h-10" />
        </div>
        <div className="absolute bottom-6 right-3 sm:bottom-10 sm:right-10 animate-float-reverse pointer-events-none opacity-85 z-10">
          <ButterflyIcon color="amber" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="text-center mb-6 sm:mb-8 space-y-2 sm:space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-green bg-vannam-green/15 border border-vannam-green/30 px-3.5 py-1 rounded-full shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Parent Answers</span>
            </div>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Frequently Asked <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-6">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our daily routines, admissions, child safety, and curriculum.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-3.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-5 bg-white rounded-2xl border border-[#CBD8F6]/80 shadow-2xs">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-3 sm:gap-4 !min-h-0 py-0.5"
                >
                  <span className="font-heading font-extrabold text-[#0F2963] text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] shrink-0 transition transform ${activeFaq === idx ? "rotate-180 text-vannam-yellow" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-[#334155] leading-relaxed pt-2.5 border-t border-[#E8EEFB]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Playful Organic Wave Divider into Contact */}
        <PlayfulWaveDivider className="mt-8 sm:mt-12" fillColor="#0F2963" secondaryFill="#0A1D47" strokeColor="#1D4ED8" />
      </section>

      {/* ADMISSION CTA & CONTACT FORM SECTION - GLASSMORPHIC POSTCARD */}
      <section id="contact" className="scroll-mt-24 py-8 sm:py-12 lg:py-16 bg-section-contact text-white relative overflow-hidden">
        
        {/* Floating Background 3D Toys */}
        <div className="absolute top-10 left-10 opacity-35 animate-pulse pointer-events-none rotate-[-15deg]">
          <KiteIcon className="w-16 h-16 sm:w-24 sm:h-24" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-25 animate-wiggle pointer-events-none rotate-[20deg] scale-150">
          <RainbowIcon className="w-20 h-20 sm:w-32 sm:h-32" />
        </div>
        <div className="absolute top-20 right-10 opacity-35 animate-pulse pointer-events-none rotate-[10deg]">
          <SmilingSunIcon className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
        <div className="absolute -bottom-10 right-1/4 opacity-40 pointer-events-none rotate-[-25deg]">
          <CrayonIcon color="amber" className="w-20 h-20 sm:w-32 sm:h-32" />
        </div>

        {/* Ambient Light Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00A8E8]/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F59E0B]/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* Left Info - VIP Invitation Vibe */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <SchoolBusToyIcon className="w-8 h-8 sm:w-9 sm:h-9 animate-bounce-gentle" />
                <span className="px-3.5 py-1 rounded-full bg-white/15 border border-white/30 text-vannam-yellow text-[10.5px] sm:text-xs font-black uppercase tracking-widest inline-flex items-center gap-1.5 shadow-xs backdrop-blur-md">
                  <Calendar className="w-3.5 h-3.5 text-vannam-yellow" />
                  <span>Admissions Open 2025–26</span>
                </span>
                <PaperPlaneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-300 animate-flutter" />
              </div>

              <h2 className="font-heading text-xl xs:text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-sm">
                Begin Your Child&apos;s <br className="hidden sm:block" />
                <span className="text-vannam-yellow underline decoration-vannam-cyan underline-offset-4 sm:underline-offset-6">Learning Journey.</span>
              </h2>

              <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                Schedule a campus tour or submit an enquiry. Our friendly counselors are happy to guide your family.
              </p>

              <div className="space-y-2 sm:space-y-2.5 pt-1 text-left">
                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs hover:bg-white/15 transition group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 text-[#0F2963] flex items-center justify-center shadow-xs shrink-0 font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-xs sm:text-sm leading-tight">Rainbow Gardens Campus, 124 Academy Drive</span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs hover:bg-white/15 transition group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-400 text-[#0F2963] flex items-center justify-center shadow-xs shrink-0 font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+18005557529" className="font-bold text-white text-xs sm:text-sm leading-tight hover:underline">
                    Direct Admissions: +1 (800) 555-PLAY
                  </a>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-2xs hover:bg-white/15 transition group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-400 text-[#0F2963] flex items-center justify-center shadow-xs shrink-0 font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href="mailto:admissions@vannamworld.edu" className="font-bold text-white text-xs sm:text-sm break-all hover:underline leading-tight">
                    admissions@vannamworld.edu
                  </a>
                </div>
              </div>
            </div>

            {/* Right Contact Form - Crisp High-Contrast Luminous Postcard Card */}
            <div className="lg:col-span-7 relative">
              <div className="bg-white/95 text-[#0F2963] backdrop-blur-xl p-4.5 xs:p-5 sm:p-7 md:p-8 rounded-3xl border-2 border-white/60 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                
                {/* Form Internal Glow Accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10 mb-3 sm:mb-4 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-black text-[#C2410C] uppercase tracking-wider mb-1">
                    <span>✨ Fast Response Guaranteed</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-[#0F2963] mb-0.5">
                    Admission Enquiry
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#475569] font-medium">
                    Fill out the quick form to receive our prospectus and fee schedule instantly.
                  </p>
                </div>

                {enquirySubmitted ? (
                  <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3 animate-in zoom-in-95 duration-500">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h4 className="font-heading font-extrabold text-emerald-950 text-lg sm:text-xl">
                      Enquiry Received!
                    </h4>
                    <p className="text-xs text-emerald-800 font-semibold">
                      Thank you! Our admissions coordinator will reach out to you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-2.5 sm:space-y-3 relative z-10">
                    
                    {/* Row 1: Parent Name & Child Name (2 cols per row) */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Parent Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.parentName}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs sm:text-sm font-bold shadow-2xs focus:bg-white focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all placeholder:text-[#94A3B8] !min-h-0"
                          placeholder="e.g. Sarah"
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Child Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.childName}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, childName: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs sm:text-sm font-bold shadow-2xs focus:bg-white focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all placeholder:text-[#94A3B8] !min-h-0"
                          placeholder="e.g. Leo"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Email (2 cols per row) */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs sm:text-sm font-bold shadow-2xs focus:bg-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 transition-all placeholder:text-[#94A3B8] !min-h-0"
                          placeholder="+1 (555) 000"
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs sm:text-sm font-bold shadow-2xs focus:bg-white focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 transition-all placeholder:text-[#94A3B8] !min-h-0"
                          placeholder="parent@mail.com"
                        />
                      </div>
                    </div>

                    {/* Row 3: Child Age & Preferred Program (2 cols per row) */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3.5">
                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Child Age *
                        </label>
                        <select
                          value={enquiryForm.childAge}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, childAge: e.target.value })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs font-bold shadow-2xs focus:bg-white focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all cursor-pointer !min-h-0"
                        >
                          <option value="12-24m">12-24m (Toddler)</option>
                          <option value="2-3">2-3 Yrs (Play Group)</option>
                          <option value="3-4">3-4 Yrs (Nursery)</option>
                          <option value="4-5">4-5 Yrs (LKG)</option>
                          <option value="5-6">5-6 Yrs (UKG)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5 truncate">
                          Program
                        </label>
                        <select
                          value={enquiryForm.program}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, program: e.target.value })}
                          className="w-full px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs font-bold shadow-2xs focus:bg-white focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 transition-all cursor-pointer !min-h-0"
                        >
                          <option value="toddler">Toddler Care</option>
                          <option value="playgroup">Play Group</option>
                          <option value="nursery">Nursery STEAM</option>
                          <option value="lkg">LKG (Jr. KG)</option>
                          <option value="ukg">UKG (Sr. KG)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0F2963] uppercase tracking-wider mb-1 ml-0.5">
                        Message / Questions
                      </label>
                      <textarea
                        rows={2}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#F0F4FC] border-2 border-[#CBD8F6] text-[#0F2963] text-xs font-bold shadow-2xs focus:bg-white focus:border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20 transition-all placeholder:text-[#94A3B8] resize-none !min-h-0"
                        placeholder="Any specific questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-yellow w-full py-2.5 sm:py-3 text-xs sm:text-sm font-black flex items-center justify-center gap-2 rounded-xl shadow-[0_8px_30px_-5px_rgba(245,158,11,0.5)] transition-all hover:scale-[1.01] active:scale-95 text-[#0F2963] cursor-pointer mt-1 !min-h-0"
                    >
                      <span className="uppercase tracking-wide">Submit Enquiry</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SOPHISTICATED LIGHT ORANGE THEMED FOOTER */}
      <footer className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED] to-[#FFEDD5] text-[#0F2963] pt-10 sm:pt-16 pb-12 sm:pb-16 border-t-2 border-[#FDBA74]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Brand Column (Span 4 on Desktop) */}
            <div className="lg:col-span-4 space-y-3.5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start">
                <div className="bg-white p-2.5 rounded-2xl inline-block shadow-xs border border-[#FED7AA]">
                  <Image 
                    src="/logo.png" 
                    alt="Vannam World Preschool Logo" 
                    width={180}
                    height={48}
                    className="h-9 sm:h-12 w-auto object-contain"
                  />
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-sm font-medium mx-auto sm:mx-0">
                Learning through every shade of play. Voted #1 international preschool for safe, joyful Montessori & STEAM early learning.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FED7AA] text-[10px] sm:text-xs font-bold text-[#0F2963] shadow-2xs">
                  🏆 #1 Preschool
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FED7AA] text-[10px] sm:text-xs font-bold text-[#0F2963] shadow-2xs">
                  🛡️ 100% Child Safe
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/90 border border-[#FED7AA] text-[10px] sm:text-xs font-bold text-[#0F2963] shadow-2xs">
                  🌱 STEAM Accredited
                </span>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
                {/* Instagram */}
                <a 
                  href="https://instagram.com/vannamworldpreschool" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a 
                  href="https://facebook.com/vannamworld" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com/@vannamworldpreschool" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com/company/vannam-preschool" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links & Programs (2-COLUMNS ON MOBILE, SPAN 5 ON DESKTOP) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-6 pt-1 sm:pt-0">
              {/* Quick Links */}
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="font-heading font-extrabold text-[11px] sm:text-xs text-[#C2410C] uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-1.5 text-xs text-[#475569] font-semibold">
                  <li><a href="#about" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> About School</a></li>
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Our Programs</a></li>
                  <li><a href="#facilities" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Campus Facilities</a></li>
                  <li><a href="#safety" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Child Safety</a></li>
                  <li><a href="#teachers" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Educators & Staff</a></li>
                </ul>
              </div>

              {/* Programs */}
              <div className="space-y-1.5 sm:space-y-2">
                <h4 className="font-heading font-extrabold text-[11px] sm:text-xs text-[#C2410C] uppercase tracking-wider">Programs</h4>
                <ul className="space-y-1.5 text-xs text-[#475569] font-semibold">
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Toddler Care</a></li>
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Play Group</a></li>
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> Nursery STEAM</a></li>
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> LKG Kindergarten</a></li>
                  <li><a href="#programs" className="hover:text-[#EA580C] transition flex items-center gap-1"><span>•</span> UKG Senior</a></li>
                </ul>
              </div>
            </div>

            {/* Campus Contact Bento Box (COMPACT SHORT CARD) */}
            <div className="lg:col-span-3 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#FED7AA] shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-extrabold text-[11px] sm:text-xs text-[#C2410C] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Campus Contact</span>
                </h4>
                <span className="text-[10px] text-[#64748B] flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-[#EA580C]" />
                  <span>8 AM - 6 PM</span>
                </span>
              </div>
              
              <p className="text-[11px] sm:text-xs text-[#475569] font-medium leading-snug">
                124 Rainbow Gardens Drive, North Campus
              </p>

              <div className="flex flex-col xs:flex-row gap-1.5 text-xs pt-0.5">
                <a 
                  href="tel:+18005557529" 
                  className="flex-1 px-2.5 py-1.5 rounded-xl bg-orange-50/80 border border-orange-200 text-[#C2410C] font-extrabold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-100 transition"
                >
                  <Phone className="w-3 h-3" />
                  <span>+1 (800) 555-PLAY</span>
                </a>
                <a 
                  href="mailto:admissions@vannamworld.edu" 
                  className="flex-1 px-2.5 py-1.5 rounded-xl bg-blue-50/80 border border-blue-200 text-[#0F2963] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-100 transition truncate"
                  title="admissions@vannamworld.edu"
                >
                  <Mail className="w-3 h-3 text-[#00A8E8] shrink-0" />
                  <span className="truncate">Email Us</span>
                </a>
              </div>

              <button
                onClick={() => setIsTourModalOpen(true)}
                className="btn-primary w-full py-1.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs !min-h-0 active:scale-95 transition-transform mt-1"
              >
                <Calendar className="w-3.5 h-3.5 text-vannam-yellow" />
                <span>Book Campus Visit</span>
              </button>
            </div>

          </div>

          {/* Bottom Copyright & Policy Strip */}
          <div className="pt-6 sm:pt-8 border-t border-[#FED7AA] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#64748B]">
            <p className="text-center sm:text-left">© {getCurrentYear()} Vannam World Preschool. All Rights Reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <a href="#" className="hover:text-[#0F2963] transition">Privacy Policy</a>
              <a href="#" className="hover:text-[#0F2963] transition">Terms of Service</a>
              <a href="#" className="hover:text-[#0F2963] transition">Child Protection Policy</a>
            </div>
          </div>

        </div>
      </footer>

      {/* INTEGRATED MODALS & WIDGETS */}
      <TourSchedulerModal 
        isOpen={isTourModalOpen} 
        onClose={() => setIsTourModalOpen(false)} 
      />

      <ParentPortalModal 
        isOpen={isPortalModalOpen} 
        onClose={() => setIsPortalModalOpen(false)} 
      />

      {isFeeCalcOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-4 sm:p-7 relative border-2 border-[#CBD8F6] shadow-2xl my-auto max-h-[92vh] overflow-y-auto">
            <button 
              onClick={() => setIsFeeCalcOpen(false)} 
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 bg-[#F0F4FC] text-[#0F2963] p-2 rounded-full hover:bg-[#E8EEFB] transition shadow-xs border border-[#CBD8F6]/60 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
              aria-label="Close Fee Calculator"
            >
              <X className="w-4 h-4" />
            </button>
            <FeeCalculator />
          </div>
        </div>
      )}

      {isVirtualTourOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden relative">
            <button 
              onClick={() => setIsVirtualTourOpen(false)} 
              className="absolute top-4 right-4 z-10 bg-slate-900 text-white p-2 rounded-full hover:bg-[#0F2963]"
            >
              <X className="w-5 h-5" />
            </button>
            <VirtualTour />
          </div>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#091A42]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0F2963] rounded-3xl border-4 border-[#F59E0B] overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 z-10 bg-[#0F2963]/80 hover:bg-slate-700 p-2.5 rounded-full text-white transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative h-[50vh] sm:h-[65vh] w-full">
              <Image 
                src={activeLightboxImage.src} 
                alt={activeLightboxImage.title} 
                fill 
                sizes="100vw"
                className="object-contain" 
              />
            </div>
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-heading font-extrabold text-sm sm:text-lg truncate mr-2">{activeLightboxImage.title}</span>
              <span className="text-xs uppercase font-extrabold text-vannam-yellow px-3 py-1 bg-[#0F2963] rounded-full shrink-0">
                {activeLightboxImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7-SHADES METHODOLOGY FULL CARD POPUP MODAL (HORIZONTAL AMAZON/FLIPKART STYLE) */}
      {selectedMethodologyModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#091A42]/85 backdrop-blur-md flex items-center justify-center p-2.5 xs:p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedMethodologyModal(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative border-3 shadow-2xl my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            style={{ borderColor: selectedMethodologyModal.hex }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button 
              onClick={() => setSelectedMethodologyModal(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-slate-100 text-[#0F2963] hover:bg-slate-200 p-2 rounded-full transition shadow-xs flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
              aria-label="Close details"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Top Horizontal Shade Navigation Strip (Flipkart / Amazon Style) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-3.5 pr-10 scrollbar-none border-b border-slate-100">
              {methodologyShades.map((s) => {
                const isCurrent = selectedMethodologyModal.id === s.id;
                const ShadeIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedMethodologyModal(s)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black transition flex items-center gap-1.5 shrink-0 whitespace-nowrap !min-h-0 cursor-pointer ${
                      isCurrent
                        ? "text-white shadow-sm scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                    style={{
                      backgroundColor: isCurrent ? s.hex : undefined,
                    }}
                  >
                    <ShadeIcon className="w-3 h-3 stroke-[2.5]" />
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Split Body (Flipkart / Amazon Product Spec Style) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-5 items-stretch">
              
              {/* LEFT COLUMN: Identity & Brain Science Card */}
              <div 
                className="md:col-span-5 rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between border-2 space-y-3"
                style={{ 
                  backgroundColor: `${selectedMethodologyModal.hex}0D`,
                  borderColor: `${selectedMethodologyModal.hex}35`
                }}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-xs shrink-0"
                      style={{ 
                        backgroundColor: `${selectedMethodologyModal.hex}25`, 
                        color: selectedMethodologyModal.hex,
                        border: `2px solid ${selectedMethodologyModal.hex}50`
                      }}
                    >
                      {React.createElement(selectedMethodologyModal.icon, { className: "w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" })}
                    </div>
                    <div>
                      <span 
                        className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider block"
                        style={{ color: selectedMethodologyModal.hex }}
                      >
                        {selectedMethodologyModal.shadeName}
                      </span>
                      <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#0F2963] leading-tight">
                        {selectedMethodologyModal.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 flex-wrap pt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0F2963] text-[9.5px] sm:text-[10px] font-black border border-[#CBD8F6] shadow-2xs">
                      ⏱️ {selectedMethodologyModal.dailyDuration}
                    </span>
                    <span 
                      className="text-[9.5px] sm:text-[10px] font-bold"
                      style={{ color: selectedMethodologyModal.hex }}
                    >
                      {selectedMethodologyModal.tagline}
                    </span>
                  </div>

                  {/* Stylized Quote Card */}
                  <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-2xs">
                    <p className="text-[11px] sm:text-xs font-bold italic leading-snug" style={{ color: selectedMethodologyModal.hex }}>
                      &ldquo;{selectedMethodologyModal.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Brain Science Insight */}
                <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200/90 space-y-1">
                  <span className="text-[9.5px] font-black uppercase tracking-wide text-emerald-900 flex items-center gap-1">
                    <span>💡</span> Brain Science Insight
                  </span>
                  <p className="text-[10.5px] sm:text-[11px] text-emerald-800 font-semibold leading-tight">
                    {selectedMethodologyModal.scientificInsight}
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Curriculum Tools, Milestones & Actions */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3">
                <div className="space-y-3">
                  {/* Full Description */}
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {selectedMethodologyModal.description}
                  </p>

                  {/* Tactile Tools (Compact Horizontal Bento Grid) */}
                  <div className="bg-[#F8FAFC] rounded-2xl p-3 border border-[#E8EEFB] space-y-2">
                    <h4 className="font-heading font-extrabold text-xs text-[#0F2963] flex items-center gap-1.5">
                      <Puzzle className="w-3.5 h-3.5 shrink-0" style={{ color: selectedMethodologyModal.hex }} />
                      <span>Classroom Tactile Tools & Methods</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedMethodologyModal.tools.map((tool, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-2xs">
                          <span className="text-[10.5px] font-black text-[#0F2963] block truncate">
                            • {tool.name}
                          </span>
                          <span className="text-[9.5px] text-[#64748B] leading-tight block mt-0.5 line-clamp-2">
                            {tool.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Developmental Milestones */}
                  {selectedMethodologyModal.milestones && (
                    <div className="bg-white rounded-2xl p-3 border border-[#E8EEFB] shadow-2xs space-y-1.5">
                      <h4 className="font-heading font-extrabold text-xs text-[#0F2963] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Target Milestones Achieved</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {selectedMethodologyModal.milestones.map((milestone, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[10.5px] sm:text-[11px] text-[#334155] font-medium leading-tight">
                            <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: selectedMethodologyModal.hex }} />
                            <span>{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Action Strip */}
                <div className="pt-2 flex flex-col xs:flex-row gap-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedMethodologyModal(null);
                      setIsTourModalOpen(true);
                    }}
                    className={`${selectedMethodologyModal.btnClass} flex-1 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform !min-h-0`}
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Experience on Campus</span>
                  </button>
                  <button
                    onClick={() => setSelectedMethodologyModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition !min-h-0"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* HOW WE DIFFER / DIFFERENTIATOR COMPARISON POPUP MODAL (HORIZONTAL AMAZON/FLIPKART STYLE) */}
      {selectedComparisonModal && (
        <div 
          className="fixed inset-0 z-50 bg-[#091A42]/85 backdrop-blur-md flex items-center justify-center p-2.5 xs:p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedComparisonModal(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative border-2 border-[#CBD8F6] shadow-2xl my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button 
              onClick={() => setSelectedComparisonModal(null)} 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 bg-slate-100 text-[#0F2963] hover:bg-slate-200 p-2 rounded-full transition shadow-xs flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
              aria-label="Close Comparison Details"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Top Horizontal Differentiator Switcher Strip (Flipkart / Amazon Style) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-3.5 pr-10 scrollbar-none border-b border-slate-100">
              {differentiators.map((diff) => {
                const isCurrent = selectedComparisonModal.id === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedComparisonModal(diff)}
                    className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black transition flex items-center gap-1.5 shrink-0 whitespace-nowrap !min-h-0 cursor-pointer ${
                      isCurrent
                        ? "bg-[#0F2963] text-white shadow-sm scale-105 border border-[#1D4ED8]"
                        : "bg-slate-100 text-[#0F2963] hover:bg-slate-200 border border-slate-200/80"
                    }`}
                  >
                    <span>{diff.icon}</span>
                    <span>{diff.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-[#F0F4FC] border border-[#CBD8F6] shrink-0">
                  {selectedComparisonModal.icon}
                </span>
                <div>
                  <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-[#00A8E8] block">
                    {selectedComparisonModal.highlight}
                  </span>
                  <h3 className="font-heading font-extrabold text-sm sm:text-lg text-[#0F2963] leading-tight">
                    {selectedComparisonModal.feature}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-vannam-yellow/15 border border-vannam-yellow/40 text-[#0F2963] text-[9.5px] sm:text-[10.5px] font-black shadow-2xs self-start sm:self-auto">
                🏆 {selectedComparisonModal.proofTag}
              </span>
            </div>

            {/* STRICTLY HORIZONTAL SIDE-BY-SIDE COMPARISON PANELS (GRID-COLS-2 ALWAYS) */}
            <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 py-3.5 items-stretch">
              
              {/* LEFT COLUMN: VANNAM WORLD (GREEN THEME) */}
              <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-xl sm:rounded-2xl p-2.5 xs:p-3.5 sm:p-4 border-2 border-[#A7F3D0] space-y-2.5 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 pb-1.5 border-b border-emerald-300/60">
                    <span className="px-2 xs:px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[8.5px] xs:text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-300 shrink-0" />
                      <span>Vannam</span>
                    </span>
                    <span className="font-heading font-black text-xs xs:text-sm sm:text-base text-emerald-950">
                      {selectedComparisonModal.stat}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedComparisonModal.vannamPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5 p-1.5 xs:p-2 rounded-lg bg-white/95 border border-emerald-300/80 shadow-2xs min-h-[38px] xs:min-h-[42px]">
                        <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-[9px] xs:text-[10px] shrink-0 mt-0.5">
                          ✓
                        </div>
                        <span className="text-[9.5px] xs:text-[11px] sm:text-xs font-bold text-[#0F2963] leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: TRADITIONAL SCHOOLS (ROSE/SLATE THEME) */}
              <div className="bg-gradient-to-br from-rose-50/80 to-slate-100/80 rounded-xl sm:rounded-2xl p-2.5 xs:p-3.5 sm:p-4 border-2 border-rose-200 space-y-2.5 shadow-xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 pb-1.5 border-b border-rose-200/70">
                    <span className="px-2 xs:px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-200 text-[8.5px] xs:text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                      <X className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>Others</span>
                    </span>
                    <span className="font-heading font-bold text-[9px] xs:text-[10px] sm:text-xs text-slate-500">
                      Baseline
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedComparisonModal.traditionalPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5 p-1.5 xs:p-2 rounded-lg bg-white/90 border border-rose-200/80 shadow-2xs min-h-[38px] xs:min-h-[42px]">
                        <div className="w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-md bg-rose-100 text-rose-600 flex items-center justify-center font-black text-[9px] xs:text-[10px] shrink-0 mt-0.5">
                          ✕
                        </div>
                        <span className="text-[9.5px] xs:text-[11px] sm:text-xs font-semibold text-slate-600 leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="pt-2.5 flex flex-col xs:flex-row gap-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedComparisonModal(null);
                  setIsTourModalOpen(true);
                }}
                className="btn-primary flex-1 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform !min-h-0"
              >
                <Calendar className="w-4 h-4 text-vannam-yellow" />
                <span>Book Campus Tour</span>
              </button>
              <button
                onClick={() => setSelectedComparisonModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition !min-h-0"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
