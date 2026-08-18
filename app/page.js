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
import { getAcademicYear, getCurrentYear, formatDynamicYears } from "../lib/academicYear";

import {
  TeddyBearIcon,
  AlphabetBlock,
  ToyCarIcon,
  RainbowIcon,
  HappyCloudIcon,
  CrayonIcon,
  BalloonIcon,
  KiteIcon,
  PuzzlePieceIcon,
  StorybookIcon
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

  // Program Tab State
  const [activeProgramTab, setActiveProgramTab] = useState("playgroup");

  // Innovative 7-Shade Methodology State
  const [activeMethodologyShade, setActiveMethodologyShade] = useState("creative");
  const [methodologyAgeStage, setMethodologyAgeStage] = useState("all");

  // Routine Schedule Tab State
  const [activeRoutineTab, setActiveRoutineTab] = useState("morning");

  // Interactive Security Dashboard State
  const [activeSafetyTab, setActiveSafetyTab] = useState(0);

  // Interactive Why Us & Awards State
  const [activeWhyUsTab, setActiveWhyUsTab] = useState(0);
  const [whyUsView, setWhyUsView] = useState("vannam"); // "vannam" | "traditional" | "matrix"
  const [activeAwardTab, setActiveAwardTab] = useState(0);
  const [isAwardPaused, setIsAwardPaused] = useState(false);
  const [selectedAwardModal, setSelectedAwardModal] = useState(null);
  const [showCitationDetails, setShowCitationDetails] = useState(false);

  // Auto-play for Awards Accordion (pauses smoothly when user hovers or interacts)
  useEffect(() => {
    if (isAwardPaused) return;
    const timer = setInterval(() => {
      setActiveAwardTab((prev) => (prev + 1) % 4);
    }, 1400); // 1.4 seconds per tab
    return () => clearInterval(timer);
  }, [isAwardPaused]);

  // Dynamic Content & Announcements from Admin Store with initial fallback
  const [dynamicAnnouncements, setDynamicAnnouncements] = useState([
    {
      id: "ann-default",
      title: `Admissions Open for Academic Year ${getAcademicYear()}`,
      message: "Limited seats available across Playgroup, Nursery, LKG & UKG. Book your campus walkthrough now for early bird fee waiver!",
      type: "admission",
      active: true,
      link: "#admissions",
      linkText: "Apply Online",
      bannerColor: "from-[#0F2963] via-[#00A8E8] to-[#F59E0B]"
    }
  ]);
  const [dynamicContent, setDynamicContent] = useState(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.announcements) && data.announcements.length > 0) {
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
      feature: "Real-Time Parent App Telemetry",
      shortTitle: "Instant Mobile App Alerts",
      vannamPoints: [
        "Real-time app alerts for meal intake, naps & potty",
        "Daily HD photo gallery delivered by 4:30 PM",
        "Monthly developmental milestone report card"
      ],
      traditionalPoints: [
        "Handwritten paper diary note given at pick-up",
        "No daily photo updates for working parents",
        "Brief quarterly report sheet without metrics"
      ],
      icon: "📱",
      highlight: "Real-Time Telemetry",
      stat: "Live",
      statLabel: "App Push Alerts",
      proofTag: "Live Parent Portal App"
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
    <div className="relative min-h-screen font-sans text-[#0F2963] bg-[#FFFDF8] bg-playful-dots selection:bg-vannam-yellow/20 selection:text-vannam-orange pb-16 lg:pb-0">

      {/* STICKY TOP HEADER & ANNOUNCEMENT CONTAINER */}
      <div className="sticky top-0 z-50 shadow-xs">
        {/* Live Admin Active Announcement Ribbon */}
        {dynamicAnnouncements.length > 0 && (
          <div className={`text-white py-2 px-3 sm:px-6 bg-gradient-to-r ${dynamicAnnouncements[0].bannerColor || 'from-[#0F2963] via-[#00A8E8] to-[#F59E0B]'} shadow-xs relative z-20`}>
            <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-bold text-xs sm:text-sm text-white leading-snug truncate sm:whitespace-normal">
                  {formatDynamicYears(dynamicAnnouncements[0].title)}
                  {dynamicAnnouncements[0].message && (
                    <span className="text-white/90 font-normal text-xs hidden md:inline ml-1.5">
                      — {formatDynamicYears(dynamicAnnouncements[0].message)}
                    </span>
                  )}
                </p>
              </div>
              {dynamicAnnouncements[0].link && (
                <a
                  href={dynamicAnnouncements[0].link}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-white text-[#0F2963] text-[11px] sm:text-xs font-black hover:bg-amber-50 active:scale-95 transition-all shadow-xs shrink-0 whitespace-nowrap"
                >
                  <span>{dynamicAnnouncements[0].linkText || 'Apply Online'}</span>
                  <span className="font-bold">→</span>
                </a>
              )}
            </div>
          </div>
        )}

        <header className="bg-white border-b border-[#CBD8F6]/80">
          <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3 xl:gap-6">
            
            {/* Logo & School Name */}
            <Link href="/" className="flex items-center group shrink-0">
              <img 
                src="/logo.png" 
                alt="Vannam World Preschool Logo" 
                className="h-9 xs:h-10 sm:h-12 lg:h-12 xl:h-14 w-auto object-contain group-hover:scale-105 transition transform"
              />
            </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-2 xl:mx-4 gap-0.5 xl:gap-1.5 2xl:gap-2.5 text-[12.5px] xl:text-[13.5px] 2xl:text-[14.5px] font-bold text-[#0F2963]">
            <a href="#about" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">About</a>
            <a href="#programs" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Programs</a>
            <a href="#why-us" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Why Us</a>
            <a href="#approach" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Approach</a>
            <a href="#safety" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Safety</a>
            
            {/* Explore Dropdown for Secondary Sections */}
            <div className="relative group">
              <button 
                type="button"
                className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap flex items-center gap-1 group-hover:text-[#00A8E8] group-hover:bg-[#F0F4FC]"
                aria-haspopup="true"
              >
                <span>Explore</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-[#64748B] group-hover:text-[#00A8E8]" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="w-52 bg-white rounded-2xl p-2 shadow-xl border border-[#CBD8F6] space-y-1">
                  <a href="#activities" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">
                    <Puzzle className="w-4 h-4 text-vannam-orange shrink-0" />
                    <span>Activities</span>
                  </a>
                  <a href="#facilities" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">
                    <TreePine className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Facilities</span>
                  </a>
                  <a href="#awards" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">
                    <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Awards</span>
                  </a>
                  <a href="#teachers" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">
                    <Users className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Teachers</span>
                  </a>
                  <a href="#gallery" className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#0F2963] hover:bg-[#F0F4FC] hover:text-[#00A8E8] transition">
                    <Camera className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>Gallery</span>
                  </a>
                </div>
              </div>
            </div>

            <a href="#contact" className="px-2 xl:px-2.5 py-1.5 rounded-lg hover:text-[#00A8E8] hover:bg-[#F0F4FC] transition whitespace-nowrap">Contact</a>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
            <button
              onClick={() => setIsFeeCalcOpen(true)}
              className="p-1.5 xl:p-2 rounded-full text-[#334155] hover:text-[#0F2963] hover:bg-[#E8EEFB] transition shrink-0"
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
                  <a href="#awards" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#F0F4FC] hover:bg-amber-50 active:bg-amber-100 flex items-center gap-2 transition min-h-[44px]">🏆 Awards</a>
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
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-playful-dots">
        {/* Subtle Background Organic Shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-vannam-yellow/10 via-vannam-red/5 to-vannam-cyan/10 rounded-full blur-3xl -z-10 opacity-80 pointer-events-none" />
        
        {/* Decorative Playful Floating Elements (Positioned safely away from text/buttons) */}
        <div className="hidden lg:block absolute top-6 left-10 animate-float pointer-events-none opacity-85">
          <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
        </div>
        <div className="hidden lg:block absolute top-12 right-16 animate-float-reverse pointer-events-none opacity-80">
          <HappyCloudIcon className="w-14 h-10 drop-shadow-xs" />
        </div>
        <div className="hidden xl:block absolute bottom-12 left-12 animate-wiggle pointer-events-none opacity-85">
          <div className="flex items-center gap-1.5">
            <AlphabetBlock letter="A" color="rose" className="w-9 h-9 drop-shadow-sm" />
            <AlphabetBlock letter="B" color="amber" className="w-9 h-9 drop-shadow-sm -mt-2" />
            <AlphabetBlock letter="C" color="sky" className="w-9 h-9 drop-shadow-sm" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left relative">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#C2410C] text-[11px] sm:text-xs font-extrabold shadow-2xs max-w-full text-center mx-auto lg:mx-0">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#EA580C]" />
                <span className="leading-tight">Voted #1 International Preschool for Early Development & Safety</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#0F2963] leading-[1.15]">
                Where Little Minds Begin <span className="text-vannam-yellow underline decoration-vannam-green underline-offset-4 sm:underline-offset-8">Big Adventures</span>
              </h1>

              {/* Sub-paragraph */}
              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A warm, joyful, and certified preschool designed for parents who seek absolute safety, Montessori-inspired STEAM learning, and loving early childhood care.
              </p>

              {/* Dual Action CTAs - Responsive Stack on Extra Small, Row on Larger */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
                  className="btn-primary w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-xs xs:text-sm sm:text-base flex items-center justify-center gap-2 shadow-md whitespace-nowrap min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-vannam-yellow shrink-0" />
                  <span>Book a Visit</span>
                </button>

                <a
                  href="#programs"
                  className="btn-secondary w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-xs xs:text-sm sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap min-h-[44px]"
                >
                  <span>Explore Programs</span>
                  <ChevronRight className="w-4 h-4 text-vannam-navy shrink-0" />
                </a>
              </div>

              {/* Trust Indicator Pills */}
              <div className="pt-3 sm:pt-6 border-t border-[#CBD8F6]/80 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-left">
                <div className="flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl bg-white/80 border border-vannam-green/20 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-vannam-green/10 flex items-center justify-center text-vannam-green font-bold text-[11px] sm:text-xs shrink-0">
                    1:4
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2963] leading-tight">Low Ratio Care</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl bg-white/80 border border-vannam-yellow/20 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-vannam-yellow/10 flex items-center justify-center text-vannam-orange shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2963] leading-tight">24/7 Live CCTV</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl bg-white/80 border border-vannam-red/20 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-vannam-red/10 flex items-center justify-center text-vannam-red shrink-0">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2963] leading-tight">Organic Meals</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-2.5 p-2 rounded-xl bg-white/80 border border-vannam-cyan/20 shadow-2xs">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-vannam-cyan/10 flex items-center justify-center text-vannam-cyan shrink-0">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#0F2963] leading-tight">CPR Certified</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Layout */}
            <div className="lg:col-span-5 relative">
              
              {/* Cute Floating Balloon Accent near image */}
              <div className="hidden sm:block absolute -top-8 left-4 animate-float pointer-events-none z-20">
                <BalloonIcon color="rose" className="w-10 h-14 drop-shadow-md" />
              </div>
              <div className="hidden sm:block absolute -bottom-8 right-6 animate-float-reverse pointer-events-none z-20">
                <BalloonIcon color="sky" className="w-10 h-14 drop-shadow-md" />
              </div>

              {/* Main Visual Container */}
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-vannam-yellow/30 shadow-xl bg-white aspect-[16/11] sm:aspect-square">
                  <Image 
                    src="/hero-kids.jpg" 
                    alt="Preschool children playing with colorful wooden blocks" 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover" 
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating Badge 1 */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#E8EEFB] shadow-lg flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-vannam-green flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 inline text-vannam-green" /> Admissions Open
                      </span>
                      <span className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] block">Limited Seats Available</span>
                    </div>
                    <button 
                      onClick={() => setIsTourModalOpen(true)}
                      className="btn-accent px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs flex items-center gap-1 shrink-0 min-h-[36px]"
                    >
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>

                {/* Floating Decorative Card 2 - Teddy & Happy Graduates */}
                <div className="hidden sm:flex absolute -top-6 -right-6 bg-white p-3.5 rounded-2xl border-2 border-vannam-green/30 shadow-xl animate-float items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-vannam-green/10 flex items-center justify-center text-vannam-green shadow-xs">
                    <TeddyBearIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <Counter end={1500} className="font-heading font-bold text-sm text-[#0F2963] block" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative overflow-hidden">
        {/* Subtle decorative playful stickers in empty spaces */}
        <div className="hidden lg:block absolute top-8 left-8 animate-wiggle pointer-events-none opacity-40">
          <AlphabetBlock letter="★" color="amber" className="w-10 h-10" />
        </div>
        <div className="hidden lg:block absolute bottom-8 right-8 animate-float pointer-events-none opacity-40">
          <PuzzlePieceIcon color="emerald" className="w-10 h-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/10 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Heart className="w-3.5 h-3.5" />
              <span>About Vannam World Preschool</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963]">
              Building a Safe & Inspiring Foundation for Life
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              Our school philosophy combines Montessori freedom of exploration with early STEAM inquiry, structured around your child’s emotional comfort and intellectual curiosity.
            </p>
          </div>

          {/* Philosophy, Mission, Vision Horizontal Swipeable Row on Mobile & 3-Col Bento Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-4 pb-4 mb-6 md:mb-16 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible -mx-4 px-4 sm:mx-0 sm:px-0">
            
            {/* Philosophy Card */}
            <div className="bento-card card-amber p-5 sm:p-8 space-y-4 relative group w-[84vw] xs:w-[320px] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-center flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-vannam-yellow text-[#0F2963] flex items-center justify-center shadow-md">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <TeddyBearIcon className="w-6 h-6 sm:w-7 sm:h-7 opacity-70 group-hover:scale-110 transition" />
                </div>
                <h3 className="font-heading text-lg sm:text-2xl font-bold text-[#0F2963] mb-2">Our Philosophy</h3>
                <p className="text-xs sm:text-sm text-[#0F2963] leading-relaxed">
                  Every child possesses a unique spark of genius. We cultivate confidence through gentle encouragement, self-chosen activities, and warm teacher mentorship.
                </p>
              </div>
              <div className="pt-3 border-t border-amber-200/60 flex items-center gap-1.5 text-[11px] font-extrabold text-amber-900">
                <span>🌱 Self-Discovery & Joy</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bento-card card-emerald p-5 sm:p-8 space-y-4 relative group w-[84vw] xs:w-[320px] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-center flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-vannam-green text-white flex items-center justify-center shadow-md">
                    <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <PuzzlePieceIcon color="emerald" className="w-6 h-6 sm:w-7 sm:h-7 opacity-80 group-hover:scale-110 transition" />
                </div>
                <h3 className="font-heading text-lg sm:text-2xl font-bold text-[#0F2963] mb-2">Our Mission</h3>
                <p className="text-xs sm:text-sm text-[#0F2963] leading-relaxed">
                  To provide a world-class, hygienic, and emotionally secure early childhood environment that prepares children for lifelong academic success and emotional resilience.
                </p>
              </div>
              <div className="pt-3 border-t border-emerald-200/60 flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-900">
                <span>🛡️ Safety & Excellence</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bento-card card-sky p-5 sm:p-8 space-y-4 relative group w-[84vw] xs:w-[320px] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-center flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-vannam-cyan text-white flex items-center justify-center shadow-md">
                    <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <KiteIcon className="w-6 h-6 sm:w-7 sm:h-7 opacity-80 group-hover:scale-110 transition" />
                </div>
                <h3 className="font-heading text-lg sm:text-2xl font-bold text-[#0F2963] mb-2">Our Vision</h3>
                <p className="text-xs sm:text-sm text-[#0F2963] leading-relaxed">
                  To set the benchmark in global early childhood education by combining cutting-edge STEAM inquiry with compassionate parenting partnership.
                </p>
              </div>
              <div className="pt-3 border-t border-sky-200/60 flex items-center gap-1.5 text-[11px] font-extrabold text-sky-900">
                <span>🚀 Future-Ready Global Citizens</span>
              </div>
            </div>

          </div>

          {/* Mobile Swipe Hint Indicators */}
          <div className="flex md:hidden items-center justify-center gap-1.5 pb-6">
            <span className="text-[11px] font-bold text-[#0F2963]/60 flex items-center gap-1">
              <span>← Swipe cards horizontally →</span>
            </span>
          </div>

          {/* Animated Statistics Counters Bar */}
          <div className="bg-[#0F2963] text-white rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl border-4 border-[#091A42] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center relative overflow-hidden">
            <div className="space-y-1 relative">
              <Counter end={12} className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-vannam-yellow block" />
              <span className="text-xs sm:text-sm font-semibold text-blue-100">Years of Experience</span>
            </div>
            <div className="space-y-1 relative">
              <Counter end={1500} className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-vannam-green block" />
              <span className="text-xs sm:text-sm font-semibold text-blue-100">Happy Children</span>
            </div>
            <div className="space-y-1 relative">
              <Counter end={25} className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-vannam-cyan block" />
              <span className="text-xs sm:text-sm font-semibold text-blue-100">Qualified Teachers</span>
            </div>
            <div className="space-y-1 relative">
              <Counter end={100} className="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-vannam-red block" />
              <span className="text-xs sm:text-sm font-semibold text-blue-100">Activities & Games</span>
            </div>
          </div>

        </div>
      </section>

      {/* AGE-BASED PROGRAMS SECTION */}
      <section id="programs" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-green bg-vannam-green/10 px-3.5 py-1.5 rounded-full shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tailored Programs</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963]">
              Curriculum Built for Every Growth Stage
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              Select your child's age group below to discover learning objectives, daily teacher ratios, and specialized activities.
            </p>
          </div>

          {/* Program Tabs - Touch Horizontal Scroll with Snap */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none snap-x justify-start sm:justify-center px-1">
            {Object.keys(programsData).map((key) => {
              const prog = programsData[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveProgramTab(key)}
                  className={`px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 sm:gap-2 transition shrink-0 snap-center min-h-[44px] ${
                    activeProgramTab === key
                      ? prog.activeTabStyle
                      : "bg-white text-[#0F2963] hover:bg-[#E8EEFB] border border-[#CBD8F6]"
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
          </div>

          {/* Active Program Card Showcase */}
          {activeProgramTab && (
            <div className="max-w-4xl mx-auto">
              <div className={`bento-card ${programsData[activeProgramTab].cardStyle} p-5 sm:p-8 md:p-12 transition-all duration-300 relative overflow-hidden`}>
                
                {/* Decorative Toy Watermark */}
                <div className="absolute top-4 right-4 opacity-15 sm:opacity-20 pointer-events-none">
                  {programsData[activeProgramTab].toyType === "teddy" && <TeddyBearIcon className="w-16 h-16 sm:w-24 sm:h-24" />}
                  {programsData[activeProgramTab].toyType === "blocks" && <AlphabetBlock letter="1" color="amber" className="w-16 h-16 sm:w-24 sm:h-24" />}
                  {programsData[activeProgramTab].toyType === "puzzle" && <PuzzlePieceIcon color="emerald" className="w-16 h-16 sm:w-24 sm:h-24" />}
                  {programsData[activeProgramTab].toyType === "crayons" && <CrayonIcon color="sky" className="w-16 h-16 sm:w-24 sm:h-24" />}
                  {programsData[activeProgramTab].toyType === "storybook" && <StorybookIcon className="w-16 h-16 sm:w-24 sm:h-24" />}
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border ${programsData[activeProgramTab].badgeBg} mb-2`}>
                      Age: {programsData[activeProgramTab].age}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0F2963]">
                      {programsData[activeProgramTab].title}
                    </h3>
                  </div>

                  <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/90 font-bold text-xs text-[#0F2963] border border-[#CBD8F6] shadow-xs">
                    {programsData[activeProgramTab].ratio}
                  </span>
                </div>

                <p className="text-xs xs:text-sm sm:text-base text-[#0F2963] leading-relaxed mb-6 sm:mb-8 relative">
                  {programsData[activeProgramTab].description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8 relative">
                  
                  {/* Learning Objectives */}
                  <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-[#CBD8F6]/80 shadow-xs space-y-3">
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-base sm:text-lg flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-vannam-green shrink-0" />
                      <span>Key Learning Objectives</span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#0F2963]">
                      {programsData[activeProgramTab].objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-vannam-yellow mt-1.5 shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Featured Activities */}
                  <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-[#CBD8F6]/80 shadow-xs space-y-3">
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-base sm:text-lg flex items-center gap-2">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-vannam-yellow shrink-0" />
                      <span>Core Daily Activities</span>
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {programsData[activeProgramTab].activities.map((act, i) => (
                        <span key={i} className="px-2.5 sm:px-3 py-1.5 bg-[#E8EEFB]/90 rounded-xl text-xs font-bold text-[#0F2963] flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-vannam-green shrink-0" />
                          <span>{act}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Enquire CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-[#0F2963]/10 relative">
                  <span className="text-xs font-bold text-[#334155] text-center sm:text-left">
                    Interested in {programsData[activeProgramTab].title}?
                  </span>
                  <button
                    onClick={() => setIsTourModalOpen(true)}
                    className="btn-primary w-full sm:w-auto px-6 py-3 text-xs sm:text-sm min-h-[44px] flex items-center justify-center"
                  >
                    Enquire for Admission
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* HOW WE DIFFER FROM OTHER SCHOOLS (WHY US) SECTION - INNOVATIVE INTERACTIVE COCKPIT */}
      <section id="why-us" className="scroll-mt-24 py-12 sm:py-20 lg:py-28 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative overflow-hidden">
        
        {/* Floating Decorative Elements */}
        <div className="hidden lg:block absolute top-12 left-8 animate-float pointer-events-none opacity-80">
          <RainbowIcon className="w-16 h-10 drop-shadow-sm" />
        </div>
        <div className="hidden lg:block absolute bottom-12 right-8 animate-float-reverse pointer-events-none opacity-80">
          <PuzzlePieceIcon color="amber" className="w-14 h-14" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-vannam-yellow/10 border border-vannam-yellow/30 text-vannam-orange text-xs font-extrabold uppercase tracking-widest shadow-2xs">
              <Star className="w-3.5 h-3.5 shrink-0" />
              <span>Interactive Standard Comparison</span>
            </span>
            
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              How We Differ From <br className="hidden sm:block" />
              <span className="inline-block whitespace-nowrap text-vannam-yellow underline decoration-vannam-green underline-offset-4 sm:underline-offset-8">Other Schools</span>
            </h2>
            
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
              Tap any feature parameter below to launch the live side-by-side comparison console:
            </p>
          </div>

          {/* INNOVATIVE FEATURE SELECTOR TILES */}
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pb-3 sm:pb-0 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
            {differentiators.map((item, idx) => {
              const isSelected = activeWhyUsTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveWhyUsTab(idx)}
                  className={`min-w-[130px] xs:min-w-[145px] sm:min-w-0 flex-1 snap-start p-3 sm:p-3.5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 shrink-0 sm:shrink min-h-[90px] ${
                    isSelected
                      ? "bg-[#0F2963] text-white border-vannam-yellow shadow-xl scale-[1.02] sm:scale-105"
                      : "bg-white text-[#0F2963] border-[#CBD8F6]/80 hover:bg-[#F0F4FC] hover:border-[#00A8E8]"
                  }`}
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <span className="text-[11px] sm:text-xs font-extrabold leading-tight">{item.shortTitle}</span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${
                    isSelected ? "bg-vannam-yellow text-[#0F2963]" : "bg-[#E8EEFB] text-[#00A8E8]"
                  }`}>
                    {item.stat}
                  </span>
                </button>
              );
            })}
          </div>

          {/* INNOVATIVE DUAL-PANEL COMPARISON COCKPIT - RESPONSIVE STACK ON MOBILE, SIDE-BY-SIDE ON DESKTOP */}
          {(() => {
            const current = differentiators[activeWhyUsTab];
            return (
              <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] border-2 sm:border-4 border-[#CBD8F6] shadow-xl sm:shadow-2xl p-4 sm:p-8 lg:p-10 relative overflow-hidden animate-in fade-in zoom-in-95">
                
                {/* Cockpit Top Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-[#E8EEFB]">
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <span className="text-2xl sm:text-4xl p-2 sm:p-2.5 rounded-2xl bg-[#F0F4FC] border border-[#CBD8F6] shrink-0">{current.icon}</span>
                    <div>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#00A8E8] block">{current.highlight}</span>
                      <h3 className="font-heading font-extrabold text-base sm:text-2xl text-[#0F2963] leading-tight">{current.feature}</h3>
                    </div>
                  </div>

                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-vannam-yellow/15 border border-vannam-yellow/40 text-[#0F2963] text-[10px] sm:text-xs font-black text-center">
                    Verified Benchmark: {current.proofTag}
                  </span>
                </div>

                {/* Split Dual-Panel Comparison Cockpit (Stacked on Mobile, 2-Col on Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 pt-5 sm:pt-8 items-stretch">
                  
                  {/* LEFT PANEL: VANNAM WORLD (98% VISUAL GAUGE) */}
                  <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-[#A7F3D0] space-y-4 sm:space-y-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="space-y-3 sm:space-y-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
                          <span>Vannam Standard</span>
                        </span>
                        <span className="font-heading font-black text-lg sm:text-2xl text-emerald-950">{current.stat}</span>
                      </div>

                      {/* Visual Score Gauge Bar */}
                      <div className="space-y-1 sm:space-y-1.5">
                        <div className="flex justify-between text-[10px] sm:text-xs font-black text-emerald-900">
                          <span>Quality Score</span>
                          <span>98/100</span>
                        </div>
                        <div className="w-full h-2.5 sm:h-3 bg-emerald-200/80 rounded-full overflow-hidden p-0.5">
                          <div className="h-full bg-emerald-600 rounded-full w-[98%] animate-pulse" />
                        </div>
                      </div>

                      {/* Visual Checkmark Pills */}
                      <div className="space-y-2 sm:space-y-3 pt-1">
                        {current.vannamPoints.map((pt, i) => (
                          <div key={i} className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/95 border border-emerald-300/80 shadow-2xs">
                            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0">
                              ✓
                            </div>
                            <span className="text-xs sm:text-sm font-extrabold text-[#0F2963] leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PANEL: TRADITIONAL SCHOOLS (38% VISUAL GAUGE) */}
                  <div className="bg-gradient-to-br from-rose-50/70 to-slate-100/70 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-rose-200 space-y-4 sm:space-y-6 relative overflow-hidden opacity-95 flex flex-col justify-between">
                    <div className="space-y-3 sm:space-y-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0" />
                          <span>Traditional Daycare</span>
                        </span>
                        <span className="font-heading font-bold text-sm sm:text-lg text-slate-500 whitespace-nowrap">Baseline</span>
                      </div>

                      {/* Visual Score Gauge Bar */}
                      <div className="space-y-1 sm:space-y-1.5">
                        <div className="flex justify-between text-[10px] sm:text-xs font-bold text-slate-600">
                          <span>Quality Score</span>
                          <span>38/100</span>
                        </div>
                        <div className="w-full h-2.5 sm:h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                          <div className="h-full bg-rose-400 rounded-full w-[38%]" />
                        </div>
                      </div>

                      {/* Visual Warning Pills */}
                      <div className="space-y-2 sm:space-y-3 pt-1">
                        {current.traditionalPoints.map((pt, i) => (
                          <div key={i} className="flex items-start sm:items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/85 border border-rose-200/80 shadow-2xs">
                            <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-xs sm:text-sm shrink-0 mt-0.5 sm:mt-0">
                              ✕
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-600 leading-snug">{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* Bottom Trust CTA Strip */}
          <div className="bento-card p-5 sm:p-8 bg-gradient-to-r from-vannam-yellow/10 via-white to-vannam-cyan/10 border-2 border-vannam-yellow/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-vannam-yellow text-[#0F2963] flex items-center justify-center text-2xl shrink-0 shadow-md font-bold">
                🧸
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-base sm:text-xl text-[#0F2963]">See the difference with your own eyes</h4>
                <p className="text-xs sm:text-sm text-[#334155] font-medium">Join a 30-minute private campus walk-through with our academic principal.</p>
              </div>
            </div>

            <button
              onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
              className="btn-primary w-full sm:w-auto px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold shrink-0 flex items-center justify-center gap-2 shadow-lg min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-vannam-yellow" />
              <span>Schedule Campus Visit</span>
            </button>
          </div>

        </div>
      </section>

      {/* INNOVATIVE LEARNING METHODOLOGY SECTION (7 SHADES OF GROWTH) */}
      <section id="approach" className="scroll-mt-24 py-12 sm:py-20 lg:py-28 bg-[#FFFDF8] bg-playful-dots border-y-2 border-[#E8EEFB] relative overflow-hidden">
        
        {/* Subtle Ambient Glow corresponding to active shade */}
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] rounded-full blur-3xl -z-10 opacity-30 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: (methodologyShades.find(s => s.id === activeMethodologyShade) || methodologyShades[0]).hex }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header with Multi-Color Innovation Badges */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-[#CBD8F6] shadow-xs">
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F2963] shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider text-[#0F2963]">
                The 7-Shade Growth Spectrum
              </span>
            </div>

            <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl font-extrabold text-[#0F2963] leading-tight">
              How Children Learn & Flourish: <br className="hidden sm:block" />
              <span className="text-[#00A8E8] underline decoration-[#F59E0B] underline-offset-4 sm:underline-offset-8">The 7 Shades</span> of Development
            </h2>

            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] font-medium leading-relaxed max-w-2xl mx-auto">
              Rooted in our signature motto <em>&quot;Learning Through Every Shade of Play&quot;</em>. Tap each developmental shade below to inspect our tactile Montessori tools, live daily immersion, and verified child milestones.
            </p>
          </div>

          {/* Quick-Tap Category Tabs for Mobile View */}
          <div className="flex lg:hidden overflow-x-auto gap-2 pb-3 mb-6 scrollbar-none snap-x px-1">
            {methodologyShades.map((shade) => {
              const isActive = activeMethodologyShade === shade.id;
              const Icon = shade.icon;
              return (
                <button
                  key={`tab-${shade.id}`}
                  onClick={() => {
                    setActiveMethodologyShade(shade.id);
                    setIsMethodologyAutoPaused(true);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 snap-center transition-all min-h-[40px] ${
                    isActive
                      ? "text-white shadow-md scale-[1.02]"
                      : "bg-white text-[#0F2963] border border-[#CBD8F6]/80 hover:bg-[#F0F4FC]"
                  }`}
                  style={{
                    backgroundColor: isActive ? shade.hex : undefined
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{shade.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Radial Color Wheel & Glassmorphism Reveal */}
          <div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative z-10 mb-12 sm:mb-16"
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
            
            {/* Interactive Radial Color Wheel (Responsive Centered Orbit on Mobile & Desktop) */}
            <div className="w-full lg:col-span-5 flex justify-center items-center relative py-2 lg:py-0">
              {(() => {
                const currentShade = methodologyShades.find(s => s.id === activeMethodologyShade) || methodologyShades[0];
                const ActiveIcon = currentShade.icon;
                
                return (
                  <div className="relative w-[250px] h-[250px] xs:w-[285px] xs:h-[285px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] aspect-square rounded-full flex items-center justify-center mx-auto">
                    
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
                      className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full z-20 flex flex-col items-center justify-center transition-all duration-500 bg-white shadow-xl p-2 text-center"
                      style={{ 
                        border: `4px solid ${currentShade.hex}`
                      }}
                    >
                      <ActiveIcon className="w-7 h-7 xs:w-9 xs:h-9 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-1 transition-colors duration-500 shrink-0" style={{ color: currentShade.hex }} />
                      <span className="text-[8px] xs:text-[9px] sm:text-[10px] lg:text-[11px] font-black uppercase text-[#0F2963] leading-tight px-1 truncate max-w-full">
                        {currentShade.title}
                      </span>
                    </div>

                    {/* Orbiting 7 Nodes with Percentage Positioning for Responsive Scaling */}
                    {methodologyShades.map((shade, i) => {
                      // Distribute evenly across 360 degrees, start at top (-90deg)
                      const angle = (i * (360 / methodologyShades.length)) - 90;
                      const rad = (angle * Math.PI) / 180;
                      // 38% radius places nodes precisely along the dashed orbit line
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
                          className={`absolute w-8 h-8 xs:w-10 xs:h-10 sm:w-13 sm:h-13 lg:w-16 lg:h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 group z-30 ${
                            isActive 
                              ? "shadow-2xl ring-2 xs:ring-3 sm:ring-4 ring-white scale-110" 
                              : "opacity-80 hover:opacity-100 shadow-sm hover:scale-105"
                          }`}
                          style={{
                            left: `${leftPercent}%`,
                            top: `${topPercent}%`,
                            transform: `translate(-50%, -50%)`,
                            backgroundColor: isActive ? shade.hex : "#ffffff",
                            color: isActive ? "#ffffff" : shade.hex,
                            border: isActive ? 'none' : `2px solid ${shade.hex}40`,
                            boxShadow: isActive ? `0 10px 25px -5px ${shade.hex}80` : "none"
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

                          <Icon className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 stroke-[2.5] relative z-10" />
                          
                          {/* Floating Tooltip Label */}
                          {!isActive && (
                            <div className="hidden sm:block absolute top-[110%] w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                              <span className="bg-white text-[#0F2963] text-[10px] font-extrabold px-2 py-1 rounded-md shadow-md border border-[#E8EEFB] block">
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

            {/* Right: Glassmorphism Dynamic Content Reveal */}
            <div className="w-full lg:col-span-7 relative">
              {(() => {
                const currentShade = methodologyShades.find(s => s.id === activeMethodologyShade) || methodologyShades[0];
                const ActiveIcon = currentShade.icon;

                return (
                  <div 
                    key={currentShade.id}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl lg:rounded-[2rem] border-2 sm:border-[3px] p-4 xs:p-5 sm:p-8 lg:p-10 shadow-xl sm:shadow-2xl transition-all duration-700 relative overflow-hidden animate-in fade-in slide-in-from-bottom-3 lg:slide-in-from-right-4"
                    style={{ borderColor: `${currentShade.hex}40` }}
                  >
                    {/* Background Watermark Icon */}
                    <div 
                      className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none transition-transform duration-700 rotate-12 scale-110"
                      style={{ color: currentShade.hex }}
                    >
                      <ActiveIcon className="w-80 h-80" />
                    </div>

                    <div className="relative z-10 space-y-4 sm:space-y-6">
                      
                      {/* Badge & Title */}
                      <div className="space-y-2 sm:space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span 
                            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
                            style={{
                              backgroundColor: `${currentShade.hex}20`,
                              color: currentShade.hex
                            }}
                          >
                            <span>{currentShade.tagline}</span>
                          </span>

                          <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white text-[#0F2963] text-[10px] font-extrabold border border-[#CBD8F6] shadow-2xs">
                            {currentShade.dailyDuration}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963] leading-tight mb-1 transition-colors duration-500">
                            {currentShade.title}
                          </h3>
                          <p className="text-xs sm:text-base font-bold italic" style={{ color: currentShade.hex }}>
                            &ldquo;{currentShade.quote}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <p className="text-xs xs:text-sm sm:text-base text-[#334155] font-medium leading-relaxed">
                        {currentShade.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 pt-2">
                        
                        {/* Tools / Montessori Block */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8EEFB] shadow-2xs space-y-2 sm:space-y-3">
                          <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] flex items-center gap-2 border-b border-[#F0F4FC] pb-2">
                            <Puzzle className="w-4 h-4 shrink-0" style={{ color: currentShade.hex }} />
                            <span>Tactile Tools Used</span>
                          </h4>
                          <ul className="space-y-2">
                            {currentShade.tools.map((tool, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-[11px] sm:text-xs font-medium text-[#334155]">
                                <span className="text-[14px] mt-0.5 leading-none shrink-0" style={{ color: currentShade.hex }}>•</span>
                                <span><strong className="text-[#0F2963]">{tool.name}:</strong> {tool.desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Milestones / Benefit Block */}
                        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8EEFB] shadow-2xs space-y-2 sm:space-y-3">
                          <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] flex items-center gap-2 border-b border-[#F0F4FC] pb-2">
                            <BookOpen className="w-4 h-4 text-vannam-orange shrink-0" />
                            <span>Scientific Insight</span>
                          </h4>
                          <p className="text-[11px] sm:text-xs text-[#0F2963] font-bold leading-relaxed bg-[#F0F4FC] p-2.5 sm:p-3 rounded-xl border border-[#CBD8F6]">
                            {currentShade.scientificInsight}
                          </p>
                          <ul className="space-y-1.5 mt-2">
                            {currentShade.milestones.slice(0, 2).map((milestone, idx) => (
                              <li key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-[#334155]">
                                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: currentShade.hex }} />
                                <span>{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setIsTourModalOpen(true)}
                          className={`${currentShade.btnClass} w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:-translate-y-1 min-h-[44px]`}
                        >
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span className="hidden sm:inline">Experience {currentShade.title} In Campus</span>
                          <span className="sm:hidden">Experience Our Approach</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })()}
            </div>
            
          </div>

          {/* Bottom Innovation Row: The 4 Pillars of the 7-Shade Learning System */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="bento-card card-yellow p-4 sm:p-6 space-y-2 sm:space-y-3 relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F59E0B] text-[#0F2963] font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-white">
                🌱
              </div>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] leading-tight">Self-Paced Freedom</h4>
              <p className="text-xs sm:text-xs text-[#334155] font-medium leading-relaxed">
                Children choose activities based on inner curiosity, building intrinsic focus without pressure.
              </p>
            </div>

            <div className="bento-card card-green p-4 sm:p-6 space-y-2 sm:space-y-3 relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#10B981] text-white font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-white">
                🔬
              </div>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] leading-tight">Tactile STEAM Labs</h4>
              <p className="text-xs sm:text-xs text-[#334155] font-medium leading-relaxed">
                Touching, manipulating, and observing real materials connects abstract concepts to physical reality.
              </p>
            </div>

            <div className="bento-card card-cyan p-4 sm:p-6 space-y-2 sm:space-y-3 relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#00A8E8] text-white font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-white">
                👩‍🏫
              </div>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] leading-tight">Loving 1:4 to 1:8 Ratio</h4>
              <p className="text-xs sm:text-xs text-[#334155] font-medium leading-relaxed">
                Every teacher acts as an observant guide, tailoring learning steps to each child&apos;s unique pace.
              </p>
            </div>

            <div className="bento-card card-red p-4 sm:p-6 space-y-2 sm:space-y-3 relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F43F5E] text-white font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md border-2 border-white">
                📱
              </div>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] leading-tight">Parent Portal Updates</h4>
              <p className="text-xs sm:text-xs text-[#334155] font-medium leading-relaxed">
                Daily milestone logs, snack reports, and photo moments directly to your phone.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* DAILY ACTIVITIES SECTION */}
      <section id="activities" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-red bg-rose-100 border border-rose-300 px-4 py-1.5 rounded-full shadow-2xs">
              <Clock className="w-3.5 h-3.5" />
              <span>A Day at Vannam World Preschool</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Joyful <span className="text-vannam-red underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-8">Daily Activities</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              Every hour is balanced between structured learning, free play, organic dining, and restful quiet time.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Timeline Tabs - Horizontal on Mobile, Sticky Column on Desktop */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2.5 sm:gap-3 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none snap-x lg:sticky lg:top-28 z-10 -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: "morning", label: "Morning Block", sub: "8:00 AM - 11:00 AM", icon: Sun, color: "text-[#F59E0B]", activeBorder: "border-[#F59E0B]", bg: "bg-amber-100" },
                { id: "mid-day", label: "Mid-Day Block", sub: "11:00 AM - 1:00 PM", icon: Cloud, color: "text-[#F97316]", activeBorder: "border-[#F97316]", bg: "bg-orange-100" },
                { id: "afternoon", label: "Afternoon Block", sub: "1:00 PM - 4:00 PM", icon: Moon, color: "text-[#8B5CF6]", activeBorder: "border-[#8B5CF6]", bg: "bg-purple-100" }
              ].map((tab) => {
                const isActive = activeRoutineTab === tab.id;
                const Icon = tab.icon;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRoutineTab(tab.id)}
                    className={`shrink-0 snap-center min-w-[170px] xs:min-w-[190px] sm:min-w-[220px] lg:min-w-0 w-auto lg:w-full text-left p-3 sm:p-4 rounded-2xl transition-all duration-200 flex items-center gap-2.5 sm:gap-3 border-2 group min-h-[52px] ${
                      isActive 
                        ? `bg-white shadow-md ${tab.activeBorder}` 
                        : "bg-white/70 border-[#CBD8F6]/60 hover:bg-white hover:border-[#CBD8F6]"
                    }`}
                  >
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 ${isActive ? tab.bg : "bg-[#F0F4FC] group-hover:bg-gray-100"}`}>
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? tab.color : "text-gray-400 group-hover:text-gray-600"}`} />
                    </div>
                    <div className="min-w-0">
                      <span className={`block font-heading font-extrabold text-xs sm:text-sm truncate ${isActive ? "text-[#0F2963]" : "text-gray-600"}`}>
                        {tab.label}
                      </span>
                      <span className={`block text-[10px] sm:text-xs font-bold truncate ${isActive ? tab.color : "text-gray-400"}`}>
                        {tab.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Activity Cards Grid - Responsive columns */}
            <div className="lg:col-span-8 relative">
              <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
                {dailyActivities
                  .filter((act) => act.time === activeRoutineTab)
                  .map((act, i) => {
                    const CardIcon = act.Icon;
                    
                    return (
                      <div 
                        key={`${activeRoutineTab}-${i}`} 
                        className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 bg-gradient-to-br ${act.bgClass} p-4 sm:p-6 shadow-xs hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between`}
                      >
                        {/* Background Watermark SVG */}
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rotate-12">
                          <CardIcon className="w-24 h-24 sm:w-36 sm:h-36" color={act.color} />
                        </div>

                        {/* Interactive Floating Icon */}
                        <div className="relative z-10 bg-white w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl shadow-xs border border-white/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shrink-0">
                          <CardIcon className="w-6 h-6 sm:w-8 sm:h-8" color={act.color} />
                        </div>

                        <div className="relative z-10 space-y-1 sm:space-y-1.5">
                          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#0F2963]/70 bg-white/70 px-2 py-0.5 rounded-md inline-block">
                            {act.time}
                          </span>
                          <h3 className="font-heading font-extrabold text-[#0F2963] text-sm sm:text-base leading-tight">
                            {act.title}
                          </h3>
                          <p className="text-xs text-[#334155] font-medium leading-relaxed">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FACILITIES SECTION */}
      <section id="facilities" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>World-Class Campus</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Facilities Engineered for <br className="hidden sm:block" />
              <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-8">Safety & Wonder</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
              Designed from the ground up with rounded edges, medical-grade air filtration, and engaging play environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {facilities.map((fac, idx) => (
              <div key={idx} className={`bento-card overflow-hidden border-2 ${fac.accent} group flex flex-col justify-between`}>
                <div className="relative h-44 xs:h-48 sm:h-48 w-full overflow-hidden">
                  <Image 
                    src={fac.image} 
                    alt={fac.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold text-[#0F2963] shadow-xs">
                    {fac.tag}
                  </div>
                </div>
                <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                  <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0F2963]">{fac.title}</h3>
                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* YOUR CHILD'S SAFETY & PROTECTION SECTION */}
      <section id="safety" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Compromise Security Standard</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Your Child&apos;s Safety <br className="hidden sm:block" />
              <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-8">Comes First. Always.</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              From biometric pickup gates and 4K encrypted parent live streams to full-time pediatric CPR staff, we protect your peace of mind.
            </p>
          </div>

          {/* 4 Safety Pillars - Stacked on Mobile, 2-Col on Tablet, 4-Col on Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              {
                title: "Biometric Access Control",
                desc: "Strict gate security allowing entry only to authorized parents & staff.",
                badge: "Biometric RFID Gates",
                image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
                color: "card-amber",
                badgeColor: "bg-vannam-yellow text-[#0F2963]",
                icon: Lock
              },
              {
                title: "24/7 Live Parent CCTV",
                desc: "Watch classroom learning anytime via encrypted parent portal streaming.",
                badge: "4K Encrypted Stream",
                image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
                color: "card-emerald",
                badgeColor: "bg-vannam-green text-white",
                icon: Eye
              },
              {
                title: "Pediatric CPR Certified",
                desc: "All teachers & caregivers trained in pediatric first aid and emergency care.",
                badge: "Medical First-Aid On-Site",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
                color: "card-sky",
                badgeColor: "bg-vannam-cyan text-white",
                icon: Award
              },
              {
                title: "Child-Safe Architecture",
                desc: "Rounded furniture corners, finger-guard doors, and daily UV-C toy sanitization.",
                badge: "UV-C Sanitized Daily",
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
                  className={`bento-card ${item.color} p-4 sm:p-5 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200 group`}
                >
                  <div>
                    {/* Photo with Tag */}
                    <div className="relative h-40 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[10px] font-black ${item.badgeColor} shadow-xs`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-white/90 flex items-center justify-center text-[#0F2963] shrink-0 shadow-2xs">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963] leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#334155] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/5 mt-3 flex items-center gap-1.5 text-xs font-black text-emerald-800">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">100% Certified Standard</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reassurance Trust Banner */}
          <div className="bg-[#F0F4FC] border-2 border-[#CBD8F6] rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-[#00A8E8] shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-[#0F2963]">256-Bit Encrypted Parent App</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-vannam-yellow shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-[#0F2963]">Pediatric First-Aid Certified</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-vannam-green shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold text-[#0F2963]">UV-C Disinfected Daily</span>
            </div>
          </div>

        </div>
      </section>

      {/* TEACHERS & LEADERSHIP SECTION */}
      <section id="teachers" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/15 border border-vannam-yellow/30 px-4 py-1.5 rounded-full shadow-2xs">
              <Users className="w-3.5 h-3.5" />
              <span>Loving Educators</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Meet Our Certified & <br className="hidden sm:block" />
              <span className="text-vannam-yellow underline decoration-vannam-green underline-offset-4 sm:underline-offset-8">Warm Teachers</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
              Every educator at Vannam World Preschool holds early childhood degrees, background checks, and a deep love for guiding young learners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {teachers.map((t, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-6 space-y-3 sm:space-y-4 hover:-translate-y-2 transition duration-200 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 xs:h-52 sm:h-56 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3">
                    <Image src={t.image} alt={t.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    <span className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[10px] font-extrabold ${t.badgeColor} shadow-xs`}>
                      {t.badge}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0F2963] truncate">{t.name}</h3>
                    <span className="text-xs font-bold text-vannam-orange block truncate">{t.role}</span>
                    <span className="text-[11px] font-semibold text-[#64748B] block truncate">{t.qual}</span>
                  </div>
                </div>
                <p className="text-xs text-[#334155] leading-relaxed">{t.intro}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALLERY SECTION WITH LIGHTBOX */}
      <section id="gallery" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100 border border-emerald-300 px-4 py-1.5 rounded-full shadow-2xs">
              <Camera className="w-3.5 h-3.5" />
              <span>Campus Moments</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Moments of <span className="text-vannam-cyan underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-8">Joy & Discovery</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              Explore snapshots of classroom STEAM activities, outdoor sports, and seasonal celebrations.
            </p>
          </div>

          {/* Filter Tabs - Horizontal Swipeable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 scrollbar-none snap-x justify-start sm:justify-center px-1">
            {["all", "classroom", "activities", "events", "sports", "celebrations", "outdoor"].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryCategory(cat)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition shrink-0 snap-center min-h-[40px] flex items-center justify-center ${
                  galleryCategory === cat
                    ? "bg-[#091A42] text-[#F59E0B] border border-[#1D4ED8] shadow-xs"
                    : "bg-[#E8EEFB] text-[#0F2963] hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid - Responsive */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredGallery.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setActiveLightboxImage(item)}
                className="group relative h-48 xs:h-44 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border-2 border-[#CBD8F6] shadow-xs hover:border-vannam-yellow/40 transition"
              >
                <Image 
                  src={item.src} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091A42]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-2.5 rounded-xl text-xs font-bold text-[#0F2963] truncate shadow-sm group-hover:bg-white transition-colors">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeLightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#091A42]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#0F2963] rounded-3xl border-4 border-[#F59E0B] overflow-hidden shadow-2xl border border-slate-800">
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

      {/* AWARDS & RECOGNITION SECTION - INNOVATIVE FLEX ACCORDION */}
      <section id="awards" className="scroll-mt-24 py-12 sm:py-20 lg:py-28 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2963]/5 border border-[#CBD8F6] text-[#0F2963] text-xs font-extrabold uppercase tracking-widest">
              <Award className="w-4 h-4 text-[#0F2963]" />
              <span>Accreditations & Honors</span>
            </div>
            
            <h2 className="font-heading text-2xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              A Legacy of <span className="text-[#00A8E8] underline decoration-[#F59E0B] underline-offset-4 sm:underline-offset-8">Excellence</span>
            </h2>
          </div>

          {/* MOBILE / TABLET VIEW: Clean 1-Col on mobile, 2-Col on tablet */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {awardsData.map((award) => (
              <div
                key={award.id}
                onClick={() => setSelectedAwardModal(award)}
                className={`bento-card p-4 sm:p-5 bg-gradient-to-br ${award.accentBg} flex flex-col justify-between hover:-translate-y-1 transition-all duration-200 cursor-pointer group shadow-xs`}
              >
                <div>
                  {/* Top Bar with Icon & Year */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-white border border-[#CBD8F6] flex items-center justify-center text-2xl shadow-xs">
                      {award.icon}
                    </div>
                    <span className="text-xs font-black text-[#64748B] uppercase">
                      {award.year}
                    </span>
                  </div>

                  {/* Badge & Stat */}
                  <div className="space-y-1.5 mb-2">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-2xs ${award.badgeClass}`}>
                      {award.badge}
                    </span>
                    <h3 className="font-heading font-extrabold text-base sm:text-base text-[#0F2963] leading-tight">
                      {award.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#334155] leading-relaxed mb-3 font-medium">
                    {award.desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-black/5 flex items-center justify-between text-xs font-black text-[#00A8E8]">
                  <span>{award.stat}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Verify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: INNOVATIVE FLEX ACCORDION (HORIZONTAL) */}
          <div 
            onMouseEnter={() => setIsAwardPaused(true)}
            onMouseLeave={() => setIsAwardPaused(false)}
            className="hidden lg:flex lg:flex-row gap-4 h-[500px] w-full max-w-6xl mx-auto"
          >
            {awardsData.map((award, idx) => {
              const isActive = activeAwardTab === idx;
              return (
                <div
                  key={award.id}
                  onClick={() => { setActiveAwardTab(idx); setIsAwardPaused(true); }}
                  onMouseEnter={() => { setActiveAwardTab(idx); setIsAwardPaused(true); }}
                  style={{ flex: isActive ? 4.5 : 1 }}
                  className={`relative overflow-hidden rounded-[2rem] border-2 cursor-pointer transition-all duration-350 ease-out group flex flex-col justify-end will-change-[flex] ${
                    isActive 
                      ? `bg-gradient-to-br ${award.accentBg} shadow-2xl` 
                      : `bg-white border-[#CBD8F6] hover:border-[#00A8E8] hover:bg-[#F0F4FC] hover:shadow-md`
                  }`}
                >
                  {/* Background Decoration (visible only when active) */}
                  <div className={`absolute inset-0 transition-opacity duration-350 ${isActive ? 'opacity-15' : 'opacity-0'}`}>
                     <Image src={award.image} alt={award.title} fill sizes="50vw" className="object-cover mix-blend-multiply" />
                  </div>

                  {/* Top Floating Icon (Always visible) */}
                  <div className={`absolute transition-all duration-350 ease-out z-20 ${
                    isActive ? "top-6 left-6" : "top-8 left-1/2 -translate-x-1/2"
                  }`}>
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg border-2 transition-transform duration-350 ${
                      isActive ? "bg-white border-[#CBD8F6] scale-100" : "bg-white border-[#CBD8F6] scale-75 group-hover:scale-90"
                    }`}>
                      {award.icon}
                    </div>
                  </div>

                  {/* Vertical Title (Visible when NOT active on Desktop) */}
                  <div className={`hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none transition-opacity duration-200 ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}>
                     <h3 className="transform -rotate-90 text-[#0F2963] font-heading font-extrabold text-xl whitespace-nowrap tracking-wide opacity-50 group-hover:opacity-100 transition-opacity">
                       {award.highlight}
                     </h3>
                  </div>

                  {/* Expanded Content (Visible when active) */}
                  <div className={`relative z-20 p-6 sm:p-8 min-w-[460px] transition-all duration-350 ease-out ${
                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none absolute bottom-0"
                  }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/50 shadow-xl space-y-4">
                      
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-sm ${award.badgeClass}`}>
                          {award.badge}
                        </span>
                        <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">{award.year}</span>
                      </div>

                      <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0F2963] leading-tight">
                        <span className="text-[#00A8E8]">{award.stat}</span> <br className="hidden sm:block" />
                        <span className="text-xl sm:text-2xl text-[#334155] font-medium">{award.title}</span>
                      </h3>

                      <div className="pt-4 mt-2 border-t border-[#CBD8F6]/60 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <ShieldCheck className="w-5 h-5 text-emerald-600" />
                           <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Verified by {award.issuer}</span>
                         </div>
                         <button
                           onClick={(e) => { e.stopPropagation(); setSelectedAwardModal(award); }}
                           className="text-xs font-black text-[#00A8E8] hover:text-[#0F2963] transition flex items-center gap-1 group/btn"
                         >
                           <span>Verify Digital Badge</span>
                           <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                         </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PARENT TESTIMONIALS SECTION */}
      <section id="testimonials" className="scroll-mt-24 py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-orange bg-vannam-yellow/15 border border-vannam-yellow/30 px-4 py-1.5 rounded-full shadow-2xs">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Parent Feedback</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Trusted by Hundreds of <br className="hidden sm:block" />
              <span className="text-vannam-yellow underline decoration-vannam-cyan underline-offset-4 sm:underline-offset-8">Happy Families</span>
            </h2>
            <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
              Read authentic reviews from parents about their child's growth, safety experience, and academic readiness.
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 md:grid md:grid-cols-3 md:gap-8 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {testimonials.map((t, idx) => (
              <div key={idx} className="w-[85vw] xs:w-[320px] sm:w-[360px] shrink-0 snap-center md:w-auto bento-card p-5 sm:p-8 space-y-4 sm:space-y-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-vannam-yellow">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0F2963] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-[#E8EEFB]">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-vannam-yellow/30">
                    <Image src={t.avatar} alt={t.parent} fill sizes="150px" className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-[#0F2963] text-base">{t.parent}</h4>
                    <span className="text-xs font-bold text-vannam-orange block">Parent of {t.child}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* UPCOMING SCHOOL EVENTS */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-cyan bg-vannam-cyan/10 px-3.5 py-1.5 rounded-full shadow-2xs">
              <Calendar className="w-3.5 h-3.5" />
              <span>School Calendar</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#0F2963]">
              Upcoming School Events & Celebrations
            </h2>
            <p className="text-xs xs:text-sm sm:text-base text-[#334155] leading-relaxed">
              We invite parents to participate in regular workshops, sports days, and cultural celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {upcomingEvents.map((ev, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-6 flex flex-col xs:flex-row items-start gap-3.5 sm:gap-6 hover:border-vannam-yellow/40 hover:-translate-y-1 transition-all duration-200">
                <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-2xl bg-vannam-yellow text-[#0F2963] flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span className="font-heading font-black text-base xs:text-lg sm:text-xl leading-none">{ev.date.split(" ")[1]}</span>
                  <span className="text-[9px] xs:text-[10px] font-extrabold uppercase tracking-widest">{ev.date.split(" ")[0]}</span>
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${ev.badge}`}>
                      {ev.category}
                    </span>
                    <span className="text-xs text-[#64748B] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-vannam-yellow" /> {ev.time}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base sm:text-xl text-[#0F2963] leading-tight">{ev.title}</h3>
                  <p className="text-xs text-[#334155] leading-relaxed">{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FFFDF8] bg-playful-dots border-y border-[#CBD8F6]/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 sm:mb-14 space-y-3 sm:space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-vannam-green bg-vannam-green/15 border border-vannam-green/30 px-4 py-1.5 rounded-full shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Parent Answers</span>
            </span>
            <h2 className="font-heading text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2963] tracking-tight leading-tight">
              Frequently Asked <span className="text-vannam-green underline decoration-vannam-yellow underline-offset-4 sm:underline-offset-8">Questions</span>
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bento-card p-4 sm:p-6 bg-white">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-3 sm:gap-4"
                >
                  <span className="font-heading font-extrabold text-[#0F2963] text-base sm:text-xl leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#64748B] shrink-0 transition transform ${activeFaq === idx ? "rotate-180 text-vannam-yellow" : ""}`} />
                </button>
                {activeFaq === idx && (
                  <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#334155] leading-relaxed pt-3 border-t border-[#E8EEFB]">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ADMISSION CTA & CONTACT FORM SECTION - GLASSMORPHIC POSTCARD */}
      <section id="contact" className="scroll-mt-24 py-12 sm:py-20 lg:py-32 bg-[#0F2963] text-white relative overflow-hidden">
        
        {/* Floating Background 3D Toys */}
        <div className="absolute top-10 left-10 opacity-30 animate-pulse pointer-events-none rotate-[-15deg]">
          <KiteIcon className="w-24 h-24" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20 animate-wiggle pointer-events-none rotate-[20deg] scale-150">
          <RainbowIcon className="w-32 h-32" />
        </div>
        <div className="absolute top-20 right-10 opacity-30 animate-pulse pointer-events-none rotate-[10deg]">
          <HappyCloudIcon className="w-20 h-20" />
        </div>
        <div className="absolute -bottom-10 right-1/4 opacity-40 pointer-events-none rotate-[-25deg]">
          <CrayonIcon color="amber" className="w-32 h-32" />
        </div>

        {/* Ambient Light Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00A8E8]/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#F59E0B]/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Info - VIP Invitation Vibe */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-center lg:text-left">
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FDE68A] text-[11px] font-black uppercase tracking-widest inline-flex items-center gap-2 shadow-sm backdrop-blur-md mx-auto lg:mx-0">
                <Calendar className="w-4 h-4 text-[#FDE68A]" />
                <span>Admissions Open</span>
              </span>

              <h2 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] text-white drop-shadow-sm">
                Begin Your Child's Learning Journey.
              </h2>

              <p className="text-xs xs:text-sm sm:text-base lg:text-lg text-blue-100 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                Schedule a campus tour or submit an admission enquiry. Our friendly counselors are happy to help you through the process.
              </p>

              <div className="space-y-3.5 sm:space-y-5 pt-2 text-left">
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
                  </div>
                  <span className="font-bold text-blue-50 text-xs sm:text-sm">Rainbow Gardens Campus, 124 Academy Drive</span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981]" />
                  </div>
                  <span className="font-bold text-blue-50 text-xs sm:text-sm">Direct Admissions: +1 (800) 555-PLAY</span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#00A8E8]" />
                  </div>
                  <span className="font-bold text-blue-50 text-xs sm:text-sm break-all sm:break-normal">admissions@vannamworld.edu</span>
                </div>
              </div>
            </div>

            {/* Right Contact Form - Glassmorphic Postcard with 1-Col Inputs on Mobile */}
            <div className="lg:col-span-7 relative">
              <div className="bg-white/10 backdrop-blur-2xl p-5 xs:p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] border-2 border-white/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                
                {/* Form Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10 mb-6 sm:mb-8 text-center sm:text-left">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-1.5">
                    Admission Enquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    Fill out the postcard below to receive our prospectus and fee schedule instantly.
                  </p>
                </div>

                {enquirySubmitted ? (
                  <div className="p-6 sm:p-8 rounded-3xl bg-white/10 border border-[#10B981]/50 backdrop-blur-md text-center space-y-4 animate-in zoom-in-95 duration-500">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#10B981]/30">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h4 className="font-heading font-extrabold text-white text-xl sm:text-2xl">
                      Enquiry Received!
                    </h4>
                    <p className="text-xs sm:text-sm text-blue-50 font-medium">
                      Thank you! Our admissions coordinator will reach out to you within 2 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-4 sm:space-y-5 relative z-10">
                    
                    {/* Row 1: Parent Name & Child Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Parent Name *</label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.parentName}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] transition-all placeholder:text-[#64748B]/50 min-h-[44px]"
                          placeholder="e.g. Sarah J."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Child Name *</label>
                        <input
                          type="text"
                          required
                          value={enquiryForm.childName}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, childName: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#F59E0B]/30 focus:border-[#F59E0B] transition-all placeholder:text-[#64748B]/50 min-h-[44px]"
                          placeholder="e.g. Leo J."
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] transition-all placeholder:text-[#64748B]/50 min-h-[44px]"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#00A8E8]/30 focus:border-[#00A8E8] transition-all placeholder:text-[#64748B]/50 min-h-[44px]"
                          placeholder="parent@example.com"
                        />
                      </div>
                    </div>

                    {/* Row 3: Child Age & Preferred Program */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5">
                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Child Age *</label>
                        <select
                          value={enquiryForm.childAge}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, childAge: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all cursor-pointer min-h-[44px]"
                        >
                          <option value="12-24m">12-24m (Toddler)</option>
                          <option value="2-3">2-3 Yrs (Play Group)</option>
                          <option value="3-4">3-4 Yrs (Nursery)</option>
                          <option value="4-5">4-5 Yrs (LKG)</option>
                          <option value="5-6">5-6 Yrs (UKG)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Preferred Program</label>
                        <select
                          value={enquiryForm.program}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, program: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] transition-all cursor-pointer min-h-[44px]"
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
                      <label className="block text-[10px] font-black text-blue-100 uppercase tracking-widest mb-1 ml-1">Message / Questions</label>
                      <textarea
                        rows={3}
                        value={enquiryForm.message}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-white/90 border-2 border-transparent text-[#0F2963] text-xs sm:text-sm font-bold shadow-inner focus:outline-none focus:ring-4 focus:ring-[#F43F5E]/30 focus:border-[#F43F5E] transition-all placeholder:text-[#64748B]/50 resize-none"
                        placeholder="Tell us any specific requirements or questions..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-yellow w-full py-4 sm:py-5 text-base sm:text-lg font-black flex items-center justify-center gap-2.5 rounded-2xl shadow-[0_8px_30px_-5px_rgba(245,158,11,0.5)] transition-all hover:-translate-y-1 mt-3 sm:mt-4 min-h-[48px]"
                    >
                      <span className="uppercase tracking-wide">Submit Enquiry</span>
                      <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SOPHISTICATED LIGHT ORANGE THEMED FOOTER */}
      <footer className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED] to-[#FFEDD5] text-[#0F2963] pt-12 sm:pt-16 pb-24 lg:pb-12 border-t-2 border-[#FDBA74]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-8">
            
            {/* Brand Col */}
            <div className="sm:col-span-2 space-y-4 sm:space-y-5 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className="bg-white p-2 rounded-2xl inline-block shadow-xs border border-[#FED7AA]">
                  <Image 
                    src="/logo.png" 
                    alt="Vannam World Preschool Logo" 
                    width={180}
                    height={48}
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-sm font-medium mx-auto sm:mx-0">
                Learning through every shade of play. Voted #1 international preschool for safe, joyful Montessori & STEAM early learning.
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-1">
                {/* Instagram */}
                <a 
                  href="https://instagram.com/vannamworldpreschool" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com/@vannamworldpreschool" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#EA580C] border border-[#FED7AA] flex items-center justify-center hover:bg-[#EA580C] hover:text-white transition-all shadow-2xs hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#C2410C] uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#475569] font-semibold">
                <li><a href="#about" className="hover:text-[#EA580C] transition">About School</a></li>
                <li><a href="#programs" className="hover:text-[#EA580C] transition">Our Programs</a></li>
                <li><a href="#facilities" className="hover:text-[#EA580C] transition">Campus Facilities</a></li>
                <li><a href="#safety" className="hover:text-[#EA580C] transition">Child Safety Standard</a></li>
                <li><a href="#teachers" className="hover:text-[#EA580C] transition">Educators & Staff</a></li>
              </ul>
            </div>

            {/* Programs */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#C2410C] uppercase tracking-wider">Programs</h4>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-[#475569] font-semibold">
                <li><a href="#programs" className="hover:text-[#EA580C] transition">Toddler Care (12-24m)</a></li>
                <li><a href="#programs" className="hover:text-[#EA580C] transition">Play Group (2-3 Yrs)</a></li>
                <li><a href="#programs" className="hover:text-[#EA580C] transition">Nursery Early STEAM</a></li>
                <li><a href="#programs" className="hover:text-[#EA580C] transition">LKG Junior Kindergarten</a></li>
                <li><a href="#programs" className="hover:text-[#EA580C] transition">UKG Senior Kindergarten</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#C2410C] uppercase tracking-wider">Campus Contact</h4>
              <div className="space-y-2 text-xs sm:text-sm text-[#475569] font-medium">
                <p>124 Rainbow Gardens Drive, <br className="hidden sm:block" />North Campus</p>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-[#C2410C] font-extrabold text-sm sm:text-base mt-1">+1 (800) 555-PLAY</p>
                <p className="text-[#0F2963] font-bold break-all">admissions@vannamworld.edu</p>
              </div>
            </div>

          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#FED7AA] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-[#64748B]">
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

      {/* FIXED MOBILE BOTTOM QUICK-ACTION DOCK */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#CBD8F6] px-2 xs:px-3 py-1.5 xs:py-2 flex items-center justify-around text-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        <a 
          href="tel:+18005557529"
          className="flex flex-col items-center justify-center gap-0.5 text-[#0F2963] hover:text-vannam-green transition py-1 px-1.5 xs:px-2 group min-w-[56px] min-h-[44px]"
        >
          <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </div>
          <span className="text-[10px] font-extrabold">Call</span>
        </a>

        <button 
          onClick={() => { triggerConfetti(); setIsTourModalOpen(true); }}
          className="flex flex-col items-center justify-center gap-0.5 text-[#0F2963] transition py-1 px-1.5 xs:px-2 group min-w-[56px] min-h-[44px]"
        >
          <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calendar className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#D97706]" />
          </div>
          <span className="text-[10px] font-black text-[#0F2963]">Book Visit</span>
        </button>

        <button 
          onClick={() => setIsFeeCalcOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 text-[#0F2963] hover:text-[#00A8E8] transition py-1 px-1.5 xs:px-2 group min-w-[56px] min-h-[44px]"
        >
          <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-sky-50 text-[#00A8E8] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Calculator className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </div>
          <span className="text-[10px] font-extrabold">Fee Calc</span>
        </button>

        <button 
          onClick={() => setIsPortalModalOpen(true)}
          className="flex flex-col items-center justify-center gap-0.5 text-[#0F2963] hover:text-vannam-yellow transition py-1 px-1.5 xs:px-2 group min-w-[56px] min-h-[44px]"
        >
          <div className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Lock className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
          </div>
          <span className="text-[10px] font-extrabold">Portal</span>
        </button>
      </nav>

    </div>
  );
}
