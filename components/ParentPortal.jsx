"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  BookOpen, 
  Sparkles, 
  User, 
  Users, 
  Bell, 
  LogOut, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Send, 
  Download, 
  Camera, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  Layers, 
  TrendingUp, 
  Award, 
  ExternalLink, 
  X, 
  Lock, 
  Key, 
  Fingerprint, 
  Eye, 
  Zap, 
  Flame, 
  Search,
  Filter,
  CheckCircle,
  FileText,
  Smile,
  Radio,
  RefreshCw
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ParentPortal({ isModal = false, onClose }) {
  // Authentication State with Neon Login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("andrew@vannamworld.edu");
  const [loginPin, setLoginPin] = useState("2026");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard State
  const [activeChildId, setActiveChildId] = useState("ananya");
  const [activityFilter, setActivityFilter] = useState("all"); // all, pending, completed
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiveCamOpen, setIsLiveCamOpen] = useState(false);
  const [selectedCam, setSelectedCam] = useState("cam1");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  // Dynamic Children Data (Ananya & Vihaan)
  const [childrenData, setChildrenData] = useState({
    ananya: {
      id: "ananya",
      name: "Ananya Sharma",
      avatarEmoji: "👧",
      avatarBg: "from-amber-400 to-rose-400",
      grade: "Playgroup STEAM",
      campusId: "VW-2026-8942",
      teacher: "Teacher Sarah Jenkins",
      attendance: "98%",
      overallProgress: 82,
      homeworkCompletion: 91,
      insight: "Outstanding progress in Phonics & Montessori puzzle block assembly this week!",
      activities: [
        { id: "act-1", time: "08:30 AM", title: "Mathematics Fun with Blocks", subject: "Math & Logic", status: "completed", icon: "📐", teacherNote: "Built a 5-tier pyramid independently." },
        { id: "act-2", time: "10:00 AM", title: "STEAM Nature Observation", subject: "Science", status: "in-progress", icon: "🌿", teacherNote: "Examining leaves and seeds under mini magnifier." },
        { id: "act-3", time: "12:30 PM", title: "Organic Farm-Fresh Lunch", subject: "Nutrition", status: "completed", icon: "🥗", teacherNote: "Ate full portion of avocado pasta and berries." },
        { id: "act-4", time: "03:30 PM", title: "Phonics & Storybook Circle", subject: "English", status: "pending", icon: "📖", teacherNote: "Letter sound 'S' and 'A' practice." },
        { id: "act-5", time: "05:30 PM", title: "Solar System Coloring Task", subject: "Homework", status: "due-today", icon: "🪐", teacherNote: "Identify 3 primary planets with stickers." }
      ],
      homework: [
        {
          id: "hw-1",
          subject: "Mathematics",
          title: "Algebra & Number Tracing (1-10)",
          teacher: "Ms. Sarah",
          dueDate: "Today · 6:00 PM",
          status: "in-progress",
          priority: "High Priority",
          priorityColor: "bg-rose-100 text-rose-700 border-rose-200",
          progress: 60,
          description: "Trace numbers 1 through 10 using tactile crayons. Count 5 fruit blocks and place stickers on worksheet Page 4.",
          materials: ["Tactile Number Chart", "Sticker Sheet #2"]
        },
        {
          id: "hw-2",
          subject: "Science",
          title: "Solar System Planet Matching",
          teacher: "Mr. David",
          dueDate: "Tomorrow · 4:00 PM",
          status: "pending",
          priority: "Normal",
          priorityColor: "bg-blue-100 text-blue-700 border-blue-200",
          progress: 0,
          description: "Match Earth, Mars, and the Sun stickers into the correct orbits on the solar map provided in the learning kit.",
          materials: ["Planet Stickers", "Galaxy Map 3B"]
        },
        {
          id: "hw-3",
          subject: "English Reading",
          title: "Rhyming Words & Letter Sounds",
          teacher: "Ms. Emily",
          dueDate: "Friday · 5:00 PM",
          status: "pending",
          priority: "Normal",
          priorityColor: "bg-amber-100 text-amber-700 border-amber-200",
          progress: 20,
          description: "Read aloud 'Sam the Cat' 3 times with parent and identify three words that rhyme with 'Hat'.",
          materials: ["Storybook Level 1", "Audio Phonics QR"]
        },
        {
          id: "hw-4",
          subject: "Art & Sensory",
          title: "Nature Leaf Collage Project",
          teacher: "Ms. Sarah",
          dueDate: "Yesterday",
          status: "completed",
          priority: "Completed",
          priorityColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
          progress: 100,
          description: "Collect 4 fallen dry leaves and paste them into the butterfly silhouette.",
          materials: ["Butterfly Canvas", "Safe Glue Stick"]
        }
      ],
      upcoming: [
        { day: "Tomorrow", time: "10:00 AM", title: "STEAM Science Mini Project", subject: "Science" },
        { day: "Thursday", time: "04:30 PM", title: "Phonics Reading & Puppet Circle", subject: "Language" },
        { day: "Friday", time: "09:30 AM", title: "Campus Sports Day & Sprint", subject: "Physical Activity" },
        { day: "Next Mon", time: "10:00 AM", title: "Botanical Garden Discovery Trip", subject: "Field Trip" }
      ],
      teacherFeedback: {
        teacher: "Teacher Sarah Jenkins",
        date: "Today at 11:15 AM",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
        message: "Ananya did fantastic in today's block assembly! She helped her peer assemble the toy bridge with wonderful patience."
      }
    },
    vihaan: {
      id: "vihaan",
      name: "Vihaan Sharma",
      avatarEmoji: "👦",
      avatarBg: "from-cyan-400 to-blue-500",
      grade: "UKG Explorers",
      campusId: "VW-2026-9041",
      teacher: "Mr. Robert Lee",
      attendance: "96%",
      overallProgress: 88,
      homeworkCompletion: 95,
      insight: "Superb analytical skills in Junior Coding and robotics mazes this week!",
      activities: [
        { id: "v-act-1", time: "08:30 AM", title: "Lego Robotics Logic Lab", subject: "STEAM", status: "completed", icon: "🤖", teacherNote: "Built 4-wheel gear vehicle." },
        { id: "v-act-2", time: "10:30 AM", title: "Advanced Phonics Reading", subject: "English", status: "completed", icon: "📚", teacherNote: "Read full 10-page reader aloud." },
        { id: "v-act-3", time: "01:00 PM", title: "Farm Table Lunch & Nutrition", subject: "Dining", status: "completed", icon: "🍲", teacherNote: "Finished quinoa bowl and fruit." },
        { id: "v-act-4", time: "03:30 PM", title: "Mental Math & Pattern Sprint", subject: "Math", status: "in-progress", icon: "🧮", teacherNote: "Solving 2-digit additions." },
        { id: "v-act-5", time: "06:00 PM", title: "Planets & Space Habitat Model", subject: "Homework", status: "due-today", icon: "🚀", teacherNote: "Submit cardboard space rover." }
      ],
      homework: [
        {
          id: "v-hw-1",
          subject: "Mathematics",
          title: "Two-Digit Addition & Pattern Mazes",
          teacher: "Mr. Robert",
          dueDate: "Today · 6:30 PM",
          status: "in-progress",
          priority: "High Priority",
          priorityColor: "bg-rose-100 text-rose-700 border-rose-200",
          progress: 80,
          description: "Complete exercises 1 to 15 on addition with number lines on Math Workbook Vol 2.",
          materials: ["Math Workbook 2", "Number Ruler"]
        },
        {
          id: "v-hw-2",
          subject: "Science & Robotics",
          title: "Simple Circuit Diagram Sketch",
          teacher: "Dr. Paul",
          dueDate: "Tomorrow · 5:00 PM",
          status: "pending",
          priority: "Normal",
          priorityColor: "bg-blue-100 text-blue-700 border-blue-200",
          progress: 10,
          description: "Draw battery, switch, and LED light bulb connection with colored pencils.",
          materials: ["Junior STEAM Sketchpad"]
        }
      ],
      upcoming: [
        { day: "Tomorrow", time: "11:00 AM", title: "Junior Coding Challenge", subject: "STEAM" },
        { day: "Thursday", time: "03:00 PM", title: "Creative Storyboarding", subject: "Language" },
        { day: "Friday", time: "10:00 AM", title: "Campus Football Tournament", subject: "Sports" }
      ],
      teacherFeedback: {
        teacher: "Mr. Robert Lee",
        date: "Today at 01:45 PM",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        message: "Vihaan scored 100% on his phonics reading challenge today! He is showing great leadership in group robotics."
      }
    }
  });

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: "Teacher Sarah", time: "09:15 AM", text: "Good morning Andrew! Ananya arrived with a bright smile and jumped straight into the shape-matching blocks." },
    { sender: "Parent (You)", time: "09:40 AM", text: "Thanks Sarah! She practiced her letter 'S' sounds yesterday evening." },
    { sender: "Teacher Sarah", time: "10:15 AM", text: "That is wonderful! She remembered all three words during the morning circle! 🌟" }
  ]);
  const [newChatText, setNewChatText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Live Cameras Data
  const cameras = {
    cam1: { name: "Classroom 1A • Sensory Play", status: "LIVE 4K", viewers: 16, icon: "🎨" },
    cam2: { name: "Montessori STEAM Lab", status: "LIVE 4K", viewers: 12, icon: "🔬" },
    cam3: { name: "Outdoor Adventure Lawn", status: "LIVE 4K", viewers: 24, icon: "🌿" },
    cam4: { name: "Organic Dining Suite", status: "STANDBY", viewers: 0, icon: "🍎" }
  };

  const currentChild = childrenData[activeChildId];

  // Calculate Progress Stats Dynamically
  const completedActivitiesCount = currentChild.activities.filter(a => a.status === "completed").length;
  const totalActivitiesCount = currentChild.activities.length;
  const todayProgressPercent = Math.round((completedActivitiesCount / totalActivitiesCount) * 100);

  // Filtered Activities
  const filteredActivities = currentChild.activities.filter(act => {
    if (activityFilter === "completed") return act.status === "completed";
    if (activityFilter === "pending") return act.status !== "completed";
    return true;
  });

  // Handle Quick Neon Login
  const handleNeonLogin = (e) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    setTimeout(() => {
      setIsLoggingIn(false);
      setIsAuthenticated(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }, 700);
  };

  // Toggle Activity Status
  const handleToggleActivity = (actId) => {
    setChildrenData(prev => {
      const child = prev[activeChildId];
      const updatedActivities = child.activities.map(act => {
        if (act.id === actId) {
          const nextStatus = act.status === "completed" ? "pending" : "completed";
          if (nextStatus === "completed") {
            confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
          }
          return { ...act, status: nextStatus };
        }
        return act;
      });
      return {
        ...prev,
        [activeChildId]: { ...child, activities: updatedActivities }
      };
    });
  };

  // Toggle Homework Status
  const handleToggleHomework = (hwId) => {
    setChildrenData(prev => {
      const child = prev[activeChildId];
      const updatedHw = child.homework.map(hw => {
        if (hw.id === hwId) {
          const isDone = hw.status === "completed";
          const newStatus = isDone ? "pending" : "completed";
          const newProgress = isDone ? 20 : 100;
          if (!isDone) {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
          }
          return { ...hw, status: newStatus, progress: newProgress };
        }
        return hw;
      });
      return {
        ...prev,
        [activeChildId]: { ...child, homework: updatedHw }
      };
    });
    setSelectedHomework(null);
  };

  // Send Teacher Chat
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const userMsg = {
      sender: "Parent (You)",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newChatText
    };

    setChatMessages(prev => [...prev, userMsg]);
    setNewChatText("");
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: currentChild.teacher.split(" ")[0] + " " + currentChild.teacher.split(" ")[1],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Thank you Andrew! I'll make sure ${currentChild.name.split(" ")[0]} has everything ready for afternoon learning! 😊`
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Download PDF Report
  const handleDownloadPDF = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert(`📄 Downloaded: ${currentChild.name} - Daily Activity & Milestone Report (PDF)`);
  };

  // =========================================================================
  // 1. NEON-BASED LOGIN SCREEN WITH 7 LOGO COLORS & BRANDING
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-[590px] w-full rounded-3xl bg-[#060913] text-white flex items-center justify-center p-3 sm:p-6 overflow-hidden shadow-2xl border-2 border-cyan-500/20">
        
        {/* 7-Color Ambient Neon Glow Spheres */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F43F5E]/20 rounded-full blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute top-10 -right-20 w-72 h-72 bg-[#00A8E8]/25 rounded-full blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#10B981]/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#8B5CF6]/25 rounded-full blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Cyber Neon Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A8E812_1px,transparent_1px),linear-gradient(to_bottom,#00A8E812_1px,transparent_1px)] bg-[size:26px_26px] pointer-events-none" />

        {/* 7-Color Rainbow Border Neon Container */}
        <div className="relative z-10 max-w-md w-full p-[2px] rounded-3xl bg-gradient-to-r from-[#F43F5E] via-[#F97316] via-[#F59E0B] via-[#10B981] via-[#00A8E8] via-[#8B5CF6] to-[#0F2963] shadow-[0_0_50px_rgba(0,168,232,0.35)]">
          
          <div className="bg-[#0B1120]/95 backdrop-blur-2xl p-5 sm:p-7 rounded-[22px] space-y-4 sm:space-y-5 text-center relative">
            
            {/* Modal Close Button (Clearly visible inside card top-right) */}
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500 text-slate-300 hover:text-white border border-white/20 flex items-center justify-center transition-all shadow-md cursor-pointer"
                title="Close Parent Portal"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Logo & School Name */}
            <div className="flex flex-col items-center space-y-2">
              
              {/* Logo Card */}
              <div className="p-2 rounded-2xl bg-white/95 border-2 border-white shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                <img 
                  src="/logo.png" 
                  alt="Vannam World Preschool Logo" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              {/* 7-Color Spectrum Dots */}
              <div className="flex items-center gap-1.5 py-0.5">
                {[
                  { color: "bg-[#F59E0B]", name: "Yellow" },
                  { color: "bg-[#10B981]", name: "Green" },
                  { color: "bg-[#F43F5E]", name: "Red" },
                  { color: "bg-[#00A8E8]", name: "Cyan" },
                  { color: "bg-[#F97316]", name: "Orange" },
                  { color: "bg-[#8B5CF6]", name: "Purple" },
                  { color: "bg-[#0F2963] border border-cyan-400", name: "Navy" }
                ].map((shade, i) => (
                  <span 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${shade.color} shadow-xs`}
                    title={shade.name}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-[10px] font-black uppercase tracking-widest shadow-[0_0_12px_rgba(0,168,232,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>VANNAM WORLD PRESCHOOL</span>
              </div>

              {/* Title with 7-Color Gradient */}
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  <span className="text-white">7-Shades </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] via-[#F59E0B] via-[#10B981] via-[#00A8E8] to-[#8B5CF6] drop-shadow-[0_0_20px_rgba(0,168,232,0.5)]">
                    Parent Portal
                  </span>
                </h2>
                <p className="text-[11px] text-slate-300 font-medium mt-0.5">
                  Daily Activity & Learning Command Center
                </p>
              </div>

            </div>

            {/* Quick 1-Tap Demo Login with Rainbow Neon Border */}
            <div className="p-3 rounded-2xl bg-[#060913]/90 border border-cyan-500/30 flex items-center justify-between gap-2 shadow-inner text-left">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                  ⚡
                </div>
                <div>
                  <p className="text-[11px] font-black text-white leading-tight">Parent Demo: Andrew</p>
                  <p className="text-[9px] text-cyan-300 font-medium">Ananya & Vihaan</p>
                </div>
              </div>
              <button
                onClick={handleNeonLogin}
                disabled={isLoggingIn}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#10B981] via-[#00A8E8] to-[#8B5CF6] text-white text-[11px] font-black hover:opacity-95 transition shadow-[0_0_15px_rgba(0,168,232,0.4)] flex items-center gap-1 shrink-0 cursor-pointer"
              >
                {isLoggingIn ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3 fill-current text-amber-300" />}
                <span>One-Tap Login</span>
              </button>
            </div>

            {/* Login Form with 7-Color Focus Highlights */}
            <form onSubmit={handleNeonLogin} className="space-y-2.5 text-left">
              <div>
                <label className="block text-[9.5px] font-black text-cyan-300 uppercase tracking-widest mb-1 ml-0.5">
                  Parent Email / ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="parent@vannamworld.edu"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#060913]/90 border border-cyan-500/30 text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/40 focus:shadow-[0_0_15px_rgba(0,168,232,0.3)] transition"
                  />
                  <User className="w-3.5 h-3.5 text-cyan-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[9.5px] font-black text-cyan-300 uppercase tracking-widest mb-1 ml-0.5">
                  Parent PIN / Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    required
                    placeholder="••••"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#060913]/90 border border-cyan-500/30 text-white text-xs font-semibold placeholder:text-slate-500 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/40 focus:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition"
                  />
                  <Lock className="w-3.5 h-3.5 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 7-Color Rainbow Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#F43F5E] via-[#F97316] via-[#F59E0B] via-[#10B981] via-[#00A8E8] to-[#8B5CF6] text-white font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,168,232,0.5)] hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Verifying Access...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4 text-white" />
                    <span>Unlock Parent Command Center</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Security Badges */}
            <div className="flex items-center justify-between text-[9.5px] text-slate-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <ShieldCheck className="w-3 h-3" />
                256-Bit Encrypted
              </span>
              <span className="text-cyan-300 font-medium">Vannam World • 2026</span>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // 2. MODERN DAILY ACTIVITY & HOMEWORK DASHBOARD
  // =========================================================================
  return (
    <div className={`w-full bg-[#F8FAFC] text-[#0F2963] ${isModal ? "p-3 sm:p-6 max-w-7xl mx-auto rounded-3xl" : "min-h-screen p-3 sm:p-6 lg:p-8"}`}>
      
      {/* ===================================================================
          TOP HEADER: Greeting, Child Switcher, Date, Notifications & Actions
          =================================================================== */}
      <header className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E2E8F0] shadow-sm mb-4 sm:mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Greeting & Child Profile */}
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${currentChild.avatarBg} text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md border-2 border-white shrink-0`}>
              {currentChild.avatarEmoji}
            </div>
            
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heading font-extrabold text-lg sm:text-2xl text-[#0F2963] leading-tight">
                  Good morning, Andrew 👋
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Campus</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] font-medium">
                Here&apos;s what <strong className="text-[#0F2963] font-black">{currentChild.name}</strong> has planned for today.
              </p>
            </div>
          </div>

          {/* Child Switcher + Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start lg:self-center">
            
            {/* Child Selector Pills */}
            <div className="bg-[#F1F5F9] p-1 rounded-xl flex items-center gap-1 border border-[#E2E8F0]">
              <button
                onClick={() => setActiveChildId("ananya")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeChildId === "ananya"
                    ? "bg-white text-[#0F2963] shadow-xs border border-[#CBD5E1]"
                    : "text-[#64748B] hover:text-[#0F2963]"
                }`}
              >
                <span>👧</span>
                <span>Ananya</span>
                <span className="text-[9px] text-amber-600 font-bold hidden sm:inline">(Playgroup)</span>
              </button>

              <button
                onClick={() => setActiveChildId("vihaan")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeChildId === "vihaan"
                    ? "bg-white text-[#0F2963] shadow-xs border border-[#CBD5E1]"
                    : "text-[#64748B] hover:text-[#0F2963]"
                }`}
              >
                <span>👦</span>
                <span>Vihaan</span>
                <span className="text-[9px] text-blue-600 font-bold hidden sm:inline">(UKG)</span>
              </button>
            </div>

            {/* Date Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#475569]">
              <Calendar className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Wednesday, Aug 19, 2026</span>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setUnreadCount(0);
                }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#0F2963] flex items-center justify-center transition shadow-2xs relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4 text-[#0F2963]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xl p-3.5 z-50 space-y-2.5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-heading font-black text-xs text-[#0F2963]">Daily Updates & Alerts</span>
                    <span className="text-[10px] text-emerald-600 font-bold">2 New</span>
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] space-y-0.5">
                      <p className="font-bold text-[#0F2963]">🌟 Teacher Sarah (11:15 AM)</p>
                      <p className="text-[#475569]">Ananya completed her block assembly exercise independently!</p>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11px] space-y-0.5">
                      <p className="font-bold text-[#0F2963]">📢 Sports Day Friday</p>
                      <p className="text-[#475569]">Please send your child in comfortable sports sneakers.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[#475569] text-xs font-bold transition flex items-center gap-1 border border-slate-200"
              title="Lock portal and return to login"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Lock</span>
            </button>

            {/* Modal Close Button (if rendered in modal) */}
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 rounded-xl bg-[#0F2963] text-white text-xs font-extrabold hover:bg-[#1E3A8A] transition flex items-center gap-1 shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Close</span>
              </button>
            )}

          </div>

        </div>
      </header>

      {/* ===================================================================
          MAIN CONTENT AREA (Balanced Desktop 2-Col Layout / Mobile Single Col)
          =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        
        {/* =================================================================
            LEFT / MAIN COLUMN: Today's Progress, Today's Activities & Homework
            ================================================================= */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          
          {/* -------------------------------------------------------------
              1. TODAY'S PROGRESS HERO BAR (Answers "What has been done?")
              ------------------------------------------------------------- */}
          <section className="bg-gradient-to-br from-[#0F2963] to-[#1E3A8A] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-md relative overflow-hidden">
            
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3 sm:space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Today&apos;s Learning Tracker</span>
                  </span>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    Today&apos;s Progress
                  </h2>
                </div>

                <div className="text-right">
                  <span className="font-heading font-black text-2xl sm:text-3xl text-amber-300 leading-none">
                    {todayProgressPercent}%
                  </span>
                  <p className="text-[11px] text-blue-200 font-medium">
                    {completedActivitiesCount} of {totalActivitiesCount} Activities Completed
                  </p>
                </div>
              </div>

              {/* Glowing Gradient Progress Bar */}
              <div className="w-full h-3 sm:h-3.5 bg-black/30 rounded-full overflow-hidden p-0.5 border border-white/20">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 transition-all duration-700 shadow-[0_0_12px_rgba(0,240,255,0.7)]"
                  style={{ width: `${todayProgressPercent}%` }}
                />
              </div>

              {/* Mini Status Breakdown Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-blue-100 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{completedActivitiesCount} Completed</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{totalActivitiesCount - completedActivitiesCount} Remaining Today</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-cyan-300" />
                  <span>On Track</span>
                </span>
              </div>

            </div>
          </section>

          {/* -------------------------------------------------------------
              2. TODAY'S ACTIVITIES (Interactive Timeline & Daily Schedule)
              ------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            
            {/* Header + Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-vannam-orange" />
                  <span>Today&apos;s Schedule & Activities</span>
                </h3>
                <p className="text-xs text-[#64748B]">
                  Click any activity to inspect notes or toggle completion.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl self-start sm:self-auto border border-[#E2E8F0]">
                {["all", "pending", "completed"].map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setActivityFilter(filterKey)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black capitalize transition ${
                      activityFilter === filterKey
                        ? "bg-white text-[#0F2963] shadow-xs"
                        : "text-[#64748B] hover:text-[#0F2963]"
                    }`}
                  >
                    {filterKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities List */}
            <div className="space-y-2.5">
              {filteredActivities.map((act) => {
                const isDone = act.status === "completed";
                const isInProgress = act.status === "in-progress";
                const isDue = act.status === "due-today";

                return (
                  <div
                    key={act.id}
                    onClick={() => handleToggleActivity(act.id)}
                    className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group hover:-translate-y-0.5 ${
                      isDone 
                        ? "bg-emerald-50/50 border-emerald-200/80" 
                        : isInProgress
                        ? "bg-amber-50/50 border-amber-300 shadow-2xs"
                        : isDue
                        ? "bg-rose-50/40 border-rose-200"
                        : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      
                      {/* Interactive Checkbox Bubble */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActivity(act.id);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all shrink-0 ${
                          isDone 
                            ? "bg-emerald-600 text-white shadow-xs" 
                            : "bg-white border-2 border-[#CBD5E1] text-transparent hover:border-emerald-500"
                        }`}
                        title={isDone ? "Mark Pending" : "Mark Completed"}
                      >
                        ✓
                      </button>

                      {/* Time & Icon */}
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-black text-[#0284C7] bg-sky-100/80 px-2 py-0.5 rounded-md">
                            {act.time}
                          </span>
                          <span className="text-xs font-bold text-[#64748B] hidden xs:inline">
                            {act.subject}
                          </span>
                          {isInProgress && (
                            <span className="text-[9.5px] font-black text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isDue && (
                            <span className="text-[9.5px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                              Due Today
                            </span>
                          )}
                        </div>

                        <h4 className={`font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] mt-0.5 truncate ${isDone ? "line-through opacity-70" : ""}`}>
                          {act.title}
                        </h4>

                        <p className="text-[11px] text-[#475569] truncate font-medium">
                          {act.teacherNote}
                        </p>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className={`text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full border ${
                        isDone 
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : isInProgress
                          ? "bg-amber-100 text-amber-800 border-amber-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                      }`}>
                        {isDone ? "Completed ✓" : isInProgress ? "In Progress ⏳" : "Pending"}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>

          {/* -------------------------------------------------------------
              3. HOMEWORK & ASSIGNMENTS (Actionable Cards)
              ------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#E2E8F0] shadow-sm space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#0F2963] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#0284C7]" />
                  <span>Homework & Learning Tasks</span>
                </h3>
                <p className="text-xs text-[#64748B]">
                  Actionable items with deadlines, materials, and progress status.
                </p>
              </div>

              <span className="text-xs font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {currentChild.homework.filter(h => h.status !== "completed").length} Pending
              </span>
            </div>

            {/* Homework Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentChild.homework.map((hw) => {
                const isCompleted = hw.status === "completed";
                const isDueToday = hw.dueDate.toLowerCase().includes("today");

                return (
                  <div
                    key={hw.id}
                    onClick={() => setSelectedHomework(hw)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 hover:-translate-y-1 group shadow-2xs ${
                      isCompleted 
                        ? "bg-emerald-50/40 border-emerald-200/80 opacity-90" 
                        : isDueToday
                        ? "bg-amber-50/50 border-amber-300 hover:border-amber-400"
                        : "bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]"
                    }`}
                  >
                    <div>
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#0284C7] bg-sky-100 px-2 py-0.5 rounded-md">
                          {hw.subject}
                        </span>

                        <span className={`text-[9.5px] font-black px-2 py-0.5 rounded-full border ${hw.priorityColor}`}>
                          {hw.priority}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] leading-tight mb-1 group-hover:text-[#0284C7] transition">
                        {hw.title}
                      </h4>

                      {/* Due Date & Teacher */}
                      <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-medium">
                        <span className="flex items-center gap-1 font-bold text-[#0F2963]">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{hw.dueDate}</span>
                        </span>
                        <span>•</span>
                        <span>{hw.teacher}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-[10px] font-black text-[#475569]">
                          <span>Progress</span>
                          <span>{hw.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              isCompleted 
                                ? "bg-emerald-500" 
                                : isDueToday 
                                ? "bg-amber-500" 
                                : "bg-[#0284C7]"
                            }`}
                            style={{ width: `${hw.progress}%` }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Action Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#64748B]">
                        {hw.materials.length} Materials Attached
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHomework(hw);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition shadow-2xs ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-[#0F2963] text-white hover:bg-[#1E3A8A]"
                        }`}
                      >
                        <span>{isCompleted ? "View Details" : "Open Task"}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>

        </div>

        {/* =================================================================
            RIGHT / SECONDARY COLUMN: Upcoming, Progress, Teacher Updates & Actions
            ================================================================= */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          
          {/* -------------------------------------------------------------
              4. UPCOMING SECTION ("Up Next / Coming Up")
              ------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-3.5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Up Next This Week</span>
              </h3>
              <span className="text-[10.5px] font-bold text-[#64748B]">
                Next 4 Days
              </span>
            </div>

            <div className="space-y-2">
              {currentChild.upcoming.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-white transition flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                        {item.day}
                      </span>
                      <span className="text-[10px] font-bold text-[#64748B]">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs text-[#0F2963] mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#475569] bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.subject}
                  </span>
                </div>
              ))}
            </div>

          </section>

          {/* -------------------------------------------------------------
              5. PROGRESS & LEARNING INSIGHTS (Simple, Not Overloaded)
              ------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-3.5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0284C7]" />
                <span>Learning Insights</span>
              </h3>
              <span className="text-[10.5px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active Term
              </span>
            </div>

            {/* 3 Metric Badges */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                <span className="block font-heading font-black text-base sm:text-lg text-[#0284C7]">
                  {currentChild.overallProgress}%
                </span>
                <span className="text-[9.5px] font-bold text-slate-600 block leading-tight">Overall Progress</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="block font-heading font-black text-base sm:text-lg text-amber-700">
                  {currentChild.homeworkCompletion}%
                </span>
                <span className="text-[9.5px] font-bold text-slate-600 block leading-tight">Homework Done</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="block font-heading font-black text-base sm:text-lg text-emerald-700">
                  {currentChild.attendance}
                </span>
                <span className="text-[9.5px] font-bold text-slate-600 block leading-tight">Attendance</span>
              </div>
            </div>

            {/* Teacher Insight Box */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-xs text-[#0F2963] font-medium space-y-1">
              <div className="flex items-center gap-1.5 font-heading font-black text-[11px] text-amber-900">
                <span>💡 Weekly Insight</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#334155]">
                {currentChild.insight}
              </p>
            </div>

          </section>

          {/* -------------------------------------------------------------
              6. TEACHER & SCHOOL UPDATES
              ------------------------------------------------------------- */}
          <section className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-sm space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#0F2963] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-rose-500" />
                <span>Teacher Feedback</span>
              </h3>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="text-[11px] font-black text-[#0284C7] hover:underline"
              >
                Reply
              </button>
            </div>

            {/* Teacher Note Card */}
            <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
              <div className="flex items-center gap-2.5">
                <img 
                  src={currentChild.teacherFeedback.avatar} 
                  alt={currentChild.teacherFeedback.teacher} 
                  className="w-8 h-8 rounded-full object-cover border border-rose-300"
                />
                <div>
                  <h4 className="font-heading font-bold text-xs text-[#0F2963]">
                    {currentChild.teacherFeedback.teacher}
                  </h4>
                  <span className="text-[10px] text-[#64748B]">
                    {currentChild.teacherFeedback.date}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-[#334155] leading-relaxed italic bg-white/80 p-2 rounded-lg border border-rose-100">
                &ldquo;{currentChild.teacherFeedback.message}&rdquo;
              </p>
            </div>

          </section>



        </div>

      </div>

      {/* ===================================================================
          MODAL 1: HOMEWORK DETAILS & SUBMISSION MODAL
          =================================================================== */}
      {selectedHomework && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 border-2 border-[#CBD5E1] shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative my-auto">
            
            <button
              onClick={() => setSelectedHomework(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0F2963] transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-[#0284C7] bg-sky-100 px-2 py-0.5 rounded">
                  {selectedHomework.subject}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${selectedHomework.priorityColor}`}>
                  {selectedHomework.priority}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#0F2963]">
                {selectedHomework.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                Assigned by {selectedHomework.teacher} • Due {selectedHomework.dueDate}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
              <h4 className="text-xs font-black text-[#0F2963] uppercase tracking-wider">Instructions</h4>
              <p className="text-xs text-[#334155] leading-relaxed">
                {selectedHomework.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#0F2963] uppercase tracking-wider mb-1.5">Attached Kit Materials</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedHomework.materials.map((mat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-[#0F2963] text-xs font-bold flex items-center gap-1">
                    <span>📦</span>
                    <span>{mat}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleToggleHomework(selectedHomework.id)}
                className={`w-full py-2.5 sm:py-3 rounded-xl font-heading font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                  selectedHomework.status === "completed"
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:opacity-95"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{selectedHomework.status === "completed" ? "Mark As Incomplete" : "Mark Homework Completed ✓"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 2: TEACHER DIRECT CHAT DRAWER
          =================================================================== */}
      {isChatOpen && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full h-[520px] max-h-[92vh] border-2 border-[#CBD5E1] shadow-2xl flex flex-col justify-between overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
            
            {/* Chat Header */}
            <div className="p-4 bg-[#0F2963] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-xl font-bold text-[#0F2963]">
                  👩‍🏫
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">{currentChild.teacher}</h4>
                  <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active Now • Classroom 1A</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
              {chatMessages.map((msg, i) => {
                const isMe = msg.sender.includes("You") || msg.sender.includes("Parent");
                return (
                  <div key={i} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe 
                        ? "bg-[#0F2963] text-white rounded-br-none" 
                        : "bg-white text-[#0F2963] border border-[#CBD5E1] rounded-bl-none shadow-2xs"
                    }`}>
                      <p className="font-bold text-[10px] mb-0.5 opacity-75">{msg.sender}</p>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-[#94A3B8] mt-0.5 px-1">{msg.time}</span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-[#64748B] italic">
                  <span>Teacher is typing...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={newChatText}
                onChange={(e) => setNewChatText(e.target.value)}
                placeholder="Type a message to teacher..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#F1F5F9] border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#0284C7]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0F2963] hover:bg-[#1E3A8A] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>

          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL 3: LIVE 4K CLASSROOM STREAM PEEK
          =================================================================== */}
      {isLiveCamOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#0F2963] text-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 border-2 border-cyan-500/40 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative my-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-heading font-extrabold text-sm sm:text-base text-white">
                  Live 4K Encrypted Stream • {currentChild.name}
                </h3>
              </div>

              <button
                onClick={() => setIsLiveCamOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Viewport Mock */}
            <div className="relative h-60 sm:h-72 w-full rounded-2xl bg-black overflow-hidden border border-white/20 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
                alt="Live Classroom Feed"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>LIVE HD • 60 FPS</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-xl text-xs flex justify-between items-center text-slate-200">
                <span>{cameras[selectedCam].name}</span>
                <span className="text-emerald-400 font-bold">256-Bit Encrypted</span>
              </div>
            </div>

            {/* Camera Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(cameras).map(([camKey, camInfo]) => (
                <button
                  key={camKey}
                  onClick={() => setSelectedCam(camKey)}
                  className={`p-2 rounded-xl text-xs font-bold text-left transition border ${
                    selectedCam === camKey
                      ? "bg-cyan-500 text-black border-cyan-400 shadow-md font-black"
                      : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  }`}
                >
                  <span className="block text-sm">{camInfo.icon}</span>
                  <span className="block truncate text-[11px]">{camInfo.name.split("•")[0]}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
