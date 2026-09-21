"use client";

import React, { useState, useEffect } from "react";
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
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard State
  const [activeChildId, setActiveChildId] = useState("ananya");
  const [activityFilter, setActivityFilter] = useState("all"); // all, pending, completed
  const [selectedHomework, setSelectedHomework] = useState(null);
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

  // Live Cameras Data
  const cameras = {
    cam1: { name: "Classroom 1A • Sensory Play", status: "LIVE 4K", viewers: 16, icon: "🎨" },
    cam2: { name: "Montessori STEAM Lab", status: "LIVE 4K", viewers: 12, icon: "🔬" },
    cam3: { name: "Outdoor Adventure Lawn", status: "LIVE 4K", viewers: 24, icon: "🌿" },
    cam4: { name: "Organic Dining Suite", status: "STANDBY", viewers: 0, icon: "🍎" }
  };

  // Live Data Fetching & Multi-Channel Real-time Sync ("Nuclear Option")
  const loadLivePortalData = () => {
    fetch(`/api/portal/data?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.childrenData && Object.keys(data.childrenData).length > 0) {
          setChildrenData(data.childrenData);
          setActiveChildId((prev) => (data.childrenData[prev] ? prev : Object.keys(data.childrenData)[0]));
        }
      })
      .catch((err) => console.error("Error loading portal live data:", err));
  };

  useEffect(() => {
    loadLivePortalData();

    // 1. BroadcastChannel for instant 0ms cross-tab sync from Teacher/Admin panel
    let channel;
    try {
      channel = new BroadcastChannel('vannam_store_sync');
      channel.onmessage = () => {
        loadLivePortalData();
      };
    } catch {}

    // 2. LocalStorage trigger across separate windows
    const handleStorage = (e) => {
      if (e.key === 'vannam_sync_trigger') {
        loadLivePortalData();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Focus trigger
    const handleFocus = () => {
      loadLivePortalData();
    };
    window.addEventListener('focus', handleFocus);

    // 4. Background heartbeat polling (every 4 seconds)
    const heartbeat = setInterval(loadLivePortalData, 4000);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      clearInterval(heartbeat);
    };
  }, []);

  const currentChild = childrenData[activeChildId] || Object.values(childrenData)[0] || {
    id: "default",
    name: "Preschool Learner",
    avatarEmoji: "🎒",
    avatarBg: "from-cyan-400 to-blue-500",
    grade: "Preschool Group",
    campusId: "VW-2026-001",
    teacher: "Teacher Lead",
    attendance: "98%",
    todayStatus: "PRESENT",
    overallProgress: 85,
    homeworkCompletion: 90,
    insight: "Happy and productive classroom participation today!",
    activities: [],
    homework: []
  };

  // Calculate Progress Stats Dynamically
  const childActivities = currentChild.activities || [];
  const completedActivitiesCount = childActivities.filter(a => a.status === "completed").length;
  const totalActivitiesCount = childActivities.length || 1;
  const todayProgressPercent = Math.round((completedActivitiesCount / totalActivitiesCount) * 100);

  // Filtered Activities
  const filteredActivities = childActivities.filter(act => {
    if (activityFilter === "completed") return act.status === "completed";
    if (activityFilter === "pending") return act.status !== "completed";
    return true;
  });

  // Handle Parent Login with Neon DB verification
  const handleNeonLogin = async (e) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/portal/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, pin: loginPin })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsLoggingIn(false);
        setLoginError(data.error || "Invalid parent email or PIN. Please enter your registered credentials.");
        return;
      }

      // Valid credentials verified
      setIsLoggingIn(false);

      if (data.matchedChildId && childrenData[data.matchedChildId]) {
        setActiveChildId(data.matchedChildId);
      } else {
        const query = (loginEmail || "").trim().toLowerCase();
        const matchedChild = Object.values(childrenData).find(
          (c) =>
            c.parentEmail?.toLowerCase() === query ||
            c.studentId?.toLowerCase() === query ||
            c.name?.toLowerCase().includes(query) ||
            c.parentPhone?.includes(query)
        );
        if (matchedChild) {
          setActiveChildId(matchedChild.id);
        } else if (Object.keys(childrenData).length > 0) {
          setActiveChildId(Object.keys(childrenData)[0]);
        }
      }

      setIsAuthenticated(true);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } catch (err) {
      setIsLoggingIn(false);
      setLoginError("Unable to reach server. Please check your network and try again.");
    }
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
      <div className="relative min-h-[590px] w-full rounded-3xl bg-white text-[#0F2963] flex items-center justify-center p-3 sm:p-6 overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Soft Cheerful Ambient Glow Spheres */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#F43F5E]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-10 -right-20 w-72 h-72 bg-[#00A8E8]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-[#10B981]/10 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#8B5CF6]/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle grid dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />

        {/* 7-Color Rainbow Border Container */}
        <div className="relative z-10 max-w-md w-full p-[2.5px] rounded-3xl bg-gradient-to-r from-[#F43F5E] via-[#F97316] via-[#F59E0B] via-[#10B981] via-[#00A8E8] via-[#8B5CF6] to-[#0F2963] shadow-[0_20px_60px_-15px_rgba(15,41,99,0.15)]">
          
          <div className="bg-white p-6 sm:p-8 rounded-[21px] space-y-4 sm:space-y-5 text-center relative shadow-sm">
            
            {/* Modal Close Button (Clearly visible inside card top-right) */}
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 flex items-center justify-center transition-all shadow-xs cursor-pointer"
                title="Close Parent Portal"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Logo & School Name */}
            <div className="flex flex-col items-center space-y-2">
              
              {/* Logo Card */}
              <div className="p-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
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
                  { color: "bg-[#0F2963]", name: "Navy" }
                ].map((shade, i) => (
                  <span 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${shade.color} shadow-xs`}
                    title={shade.name}
                  />
                ))}
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8EEFB] border border-[#CBD8F6] text-[#0F2963] text-[10px] font-black uppercase tracking-widest shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A8E8] animate-ping" />
                <span>VANNAM WORLD PRESCHOOL</span>
              </div>

              {/* Title with 7-Color Gradient */}
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-black tracking-tight leading-tight">
                  <span className="text-[#0F2963]">7-Shades </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F43F5E] via-[#F59E0B] via-[#10B981] via-[#00A8E8] to-[#8B5CF6]">
                    Parent Portal
                  </span>
                </h2>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Daily Activity & Learning Command Center
                </p>
              </div>

            </div>

            {/* Login Form */}
            <form onSubmit={handleNeonLogin} className="space-y-3 text-left">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-1 ml-0.5">
                  Parent Email / ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="parent@vannamworld.edu"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#00A8E8] focus:ring-2 focus:ring-[#00A8E8]/20 transition shadow-2xs"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-700 uppercase tracking-wider mb-1 ml-0.5">
                  Parent PIN / Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={loginPin}
                    onChange={(e) => setLoginPin(e.target.value)}
                    required
                    placeholder="••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition shadow-2xs"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 7-Color Rainbow Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F43F5E] via-[#F97316] via-[#F59E0B] via-[#10B981] via-[#00A8E8] to-[#8B5CF6] text-white font-heading font-black text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
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
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2.5 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                256-Bit Encrypted
              </span>
              <span className="text-slate-400 font-semibold">Vannam World • 2026</span>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // 2. COMPACT, NEAT & SCANNABLE PARENT DASHBOARD
  // =========================================================================

  const parentFirstName = currentChild.parentName?.split(' ')[0] || 'Parent';
  const childFirstName = currentChild.name?.split(' ')[0] || 'Learner';
  const isPresent = currentChild.todayStatus !== 'ABSENT';
  const pendingHw = (currentChild.homework || []).filter(h => h.status !== 'completed');
  const completedHw = (currentChild.homework || []).filter(h => h.status === 'completed');

  return (
    <div className={`w-full bg-[#F8FAFC] text-[#0F2963] ${isModal ? "p-3 sm:p-5 max-w-6xl mx-auto rounded-3xl" : "min-h-screen p-3 sm:p-5 lg:p-6"}`}>
      
      {/* ─── TOP BAR: CHILD PROFILE & QUICK ACTIONS ─── */}
      <header className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs mb-3.5 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

          {/* Left: Child Avatar + Name + Campus Status */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${currentChild.avatarBg} text-white flex items-center justify-center text-2xl shadow-xs shrink-0 ring-2 ring-white`}>
              {currentChild.avatarEmoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading font-black text-base sm:text-lg text-[#0F2963] leading-tight">
                  {currentChild.name}
                </h1>
                <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                  isPresent 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPresent ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {isPresent ? 'In Campus Today' : 'Absent'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                {currentChild.grade} • Teacher: <span className="text-[#0F2963] font-semibold">{currentChild.teacher}</span>
              </p>
            </div>
          </div>

          {/* Right: Sibling Switcher + Notification + Lock + Close */}
          <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
            
            {/* Sibling Switcher */}
            <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 border border-slate-200/70">
              {Object.values(childrenData).map((child) => (
                <button
                  key={child.id}
                  onClick={() => setActiveChildId(child.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    activeChildId === child.id
                      ? "bg-white text-[#0F2963] shadow-xs"
                      : "text-slate-500 hover:text-[#0F2963] hover:bg-white/50"
                  }`}
                >
                  <span>{child.avatarEmoji}</span>
                  <span>{child.name?.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setUnreadCount(0); }}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0F2963] hover:border-slate-300 transition relative cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isNotificationsOpen && (
                  <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-50 space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-heading font-black text-xs text-[#0F2963]">Daily Updates</span>
                      <span className="text-[10px] text-slate-400 font-medium">Just Now</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                      <p className="font-bold text-[#0F2963] flex items-center gap-1">🌟 {currentChild.teacher}</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">{childFirstName} completed the sensory block assembly independently!</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs">
                      <p className="font-bold text-[#0F2963] flex items-center gap-1">📢 Annual Sports Day</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">Scheduled this Friday morning. Please pack sports shoes.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout / Lock */}
              <button
                onClick={() => setIsAuthenticated(false)}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-200 transition cursor-pointer"
                title="Lock Portal"
              >
                <LogOut className="w-4 h-4" />
              </button>

              {/* Modal Close */}
              {isModal && onClose && (
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl bg-[#0F2963] text-white flex items-center justify-center hover:bg-[#1E3A8A] transition cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ─── COMPACT VITALS / SUMMARY ROW (4 CARDS) ─── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 mb-3.5 sm:mb-4">
        
        {/* Card 1: Today's Routine Progress */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00A8E8]" /> Today's Routine
            </span>
            <span className="font-black text-xs text-[#00A8E8]">{todayProgressPercent}%</span>
          </div>
          <div className="text-base sm:text-lg font-black text-[#0F2963] leading-tight">
            {completedActivitiesCount} <span className="text-xs font-semibold text-slate-400">/ {totalActivitiesCount} Done</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#00A8E8] to-emerald-500 transition-all duration-500"
              style={{ width: `${todayProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Card 2: Attendance */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Attendance
          </span>
          <div className="text-base sm:text-lg font-black text-emerald-600 leading-tight">
            {currentChild.attendance || "98.5%"}
          </div>
          <p className="text-[10px] font-semibold text-slate-400 mt-2 flex items-center gap-1 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Present & On Time
          </p>
        </div>

        {/* Card 3: Homework */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
            <BookOpen className="w-3 h-3 text-amber-500" /> Homework
          </span>
          <div className="text-base sm:text-lg font-black text-amber-600 leading-tight">
            {pendingHw.length} <span className="text-xs font-semibold text-slate-400">Pending</span>
          </div>
          <p className="text-[10px] font-semibold text-slate-400 mt-2 truncate">
            {completedHw.length} completed this week
          </p>
        </div>

        {/* Card 4: Term Milestone */}
        <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
            <Award className="w-3 h-3 text-[#8B5CF6]" /> Term Progress
          </span>
          <div className="text-base sm:text-lg font-black text-[#8B5CF6] leading-tight">
            {currentChild.overallProgress || "92%"}
          </div>
          <p className="text-[10px] font-semibold text-slate-400 mt-2 truncate">
            Exceeding learning goals
          </p>
        </div>

      </div>

      {/* ─── MAIN 2-COLUMN WORKSPACE ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4">

        {/* ═══ LEFT COLUMN (2/3 WIDTH): SCHEDULE + HOMEWORK ═══ */}
        <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">

          {/* 1. TODAY'S SCHEDULE & ROUTINE */}
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-[#0F2963] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00A8E8]" />
                  Today's Schedule & Routine
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Tap any activity to inspect notes or toggle milestone completion.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/80 p-0.5 rounded-xl border border-slate-200/70 self-start sm:self-auto">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Done" }
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActivityFilter(key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      activityFilter === key
                        ? "bg-white text-[#0F2963] shadow-xs"
                        : "text-slate-500 hover:text-[#0F2963]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities List */}
            <div className="divide-y divide-slate-100">
              {filteredActivities.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No activities found for this filter.
                </div>
              ) : (
                filteredActivities.map((act) => {
                  const isDone = act.status === "completed";
                  const isInProgress = act.status === "in-progress";
                  const isDue = act.status === "due-today";

                  return (
                    <div
                      key={act.id}
                      onClick={() => handleToggleActivity(act.id)}
                      className={`p-3 sm:p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-slate-50/80 ${
                        isDone ? "bg-slate-50/40" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleActivity(act.id);
                        }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black transition-all shrink-0 mt-0.5 cursor-pointer ${
                          isDone
                            ? "bg-emerald-500 text-white shadow-xs"
                            : "border-2 border-slate-300 text-transparent hover:border-emerald-500 hover:text-emerald-500"
                        }`}
                        title={isDone ? "Mark Pending" : "Mark Completed"}
                      >
                        ✓
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold text-[#00A8E8] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                            {act.time}
                          </span>
                          <span className="text-[10px] font-extrabold uppercase text-slate-400">
                            {act.subject}
                          </span>
                          {isInProgress && (
                            <span className="text-[9px] font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-full animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isDue && (
                            <span className="text-[9px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full">
                              Due Today
                            </span>
                          )}
                        </div>

                        <h4 className={`font-heading font-extrabold text-xs sm:text-sm mt-1 ${
                          isDone ? "line-through text-slate-400" : "text-[#0F2963]"
                        }`}>
                          {act.title}
                        </h4>

                        {act.teacherNote && (
                          <div className="mt-1 text-[11px] text-slate-600 bg-slate-50 rounded-lg p-2 border border-slate-200/60 leading-relaxed">
                            <span className="font-semibold text-slate-500">Teacher Note:</span> {act.teacherNote}
                          </div>
                        )}
                      </div>

                      {/* Status Tag */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        isDone 
                          ? "bg-emerald-100 text-emerald-700"
                          : isInProgress
                          ? "bg-amber-100 text-amber-700"
                          : isDue
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {isDone ? "Done" : isInProgress ? "Active" : isDue ? "Due" : "Pending"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* 2. HOMEWORK & LEARNING ASSIGNMENTS */}
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-[#0F2963] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  Homework & Learning Tasks
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Assignments designed for developmental curiosity and creative expression.
                </p>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                {pendingHw.length} Pending
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {(currentChild.homework || []).map((hw) => {
                const isCompleted = hw.status === "completed";

                return (
                  <div
                    key={hw.id}
                    onClick={() => setSelectedHomework(hw)}
                    className={`p-3.5 sm:p-4 cursor-pointer hover:bg-slate-50/80 transition-colors ${
                      isCompleted ? "bg-slate-50/40 opacity-70" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      
                      {/* Left Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold uppercase text-[#00A8E8] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                            {hw.subject}
                          </span>
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${hw.priorityColor}`}>
                            {hw.priority}
                          </span>
                        </div>

                        <h4 className={`font-heading font-extrabold text-xs sm:text-sm ${
                          isCompleted ? "line-through text-slate-400" : "text-[#0F2963]"
                        }`}>
                          {hw.title}
                        </h4>

                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" /> Due: {hw.dueDate}
                          </span>
                          <span>•</span>
                          <span>Assigned by {hw.teacher}</span>
                        </p>
                      </div>

                      {/* Right Progress & Action */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-xs font-black text-[#0F2963]">{hw.progress}%</span>
                          <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isCompleted ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${hw.progress}%` }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleHomework(hw.id);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isCompleted
                              ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                          }`}
                        >
                          {isCompleted ? "Done ✓" : "Complete"}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* ═══ RIGHT SIDEBAR (1/3 WIDTH): INSIGHTS + UPCOMING + QUICK ACTIONS ═══ */}
        <div className="space-y-3.5 sm:space-y-4">

          {/* 1. WEEKLY DEVELOPMENTAL INSIGHT */}
          <section className="bg-gradient-to-br from-amber-50/80 via-orange-50/50 to-amber-100/40 rounded-2xl p-3.5 sm:p-4 border border-amber-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-amber-800 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="font-heading font-black text-xs uppercase tracking-wide">Weekly Growth Insight</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentChild.insight}
            </p>
          </section>

          {/* 2. UPCOMING EVENTS & REMINDERS */}
          <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-heading font-black text-xs sm:text-sm text-[#0F2963] flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Upcoming Dates
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {(currentChild.upcoming || []).map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between gap-2 hover:bg-slate-50/60 transition-colors">
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-xs text-[#0F2963] truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.day} • {item.time}</p>
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                    {item.subject}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. QUICK SHORTCUT ACTIONS */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDownloadPDF}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-[#00A8E8] text-center transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer group"
            >
              <Download className="w-4 h-4 text-[#00A8E8] mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-extrabold text-[#0F2963] block">Download PDF</span>
              <span className="text-[9px] text-slate-400 block">Daily Report</span>
            </button>
            <button
              onClick={() => setIsLiveCamOpen(true)}
              className="p-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 text-center transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer group"
            >
              <Camera className="w-4 h-4 text-emerald-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-extrabold text-[#0F2963] block">Live Classroom</span>
              <span className="text-[9px] text-slate-400 block">4K Safe Stream</span>
            </button>
          </div>

        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 1: HOMEWORK DETAILS & INSTRUCTIONS
          ═══════════════════════════════════════════════════════════════ */}
      {selectedHomework && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 border border-slate-200 shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-150 relative my-auto">
            
            <button
              onClick={() => setSelectedHomework(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-8">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase text-[#00A8E8] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  {selectedHomework.subject}
                </span>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${selectedHomework.priorityColor}`}>
                  {selectedHomework.priority}
                </span>
              </div>
              <h3 className="font-heading font-black text-base sm:text-lg text-[#0F2963]">
                {selectedHomework.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Assigned by {selectedHomework.teacher} • Due: <span className="font-semibold text-[#0F2963]">{selectedHomework.dueDate}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-[#0F2963] block mb-1">Instructions:</span>
              {selectedHomework.description}
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block mb-1.5">
                Required Materials:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHomework.materials.map((mat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-medium text-slate-700 flex items-center gap-1">
                    📦 {mat}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleHomework(selectedHomework.id)}
              className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                selectedHomework.status === "completed"
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{selectedHomework.status === "completed" ? "Mark Incomplete" : "Mark as Completed ✓"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          MODAL 2: LIVE 4K CLASSROOM STREAM
          ═══════════════════════════════════════════════════════════════ */}
      {isLiveCamOpen && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
          <div className="bg-[#0F2963] text-white rounded-3xl max-w-xl w-full p-4 sm:p-5 border border-cyan-500/40 shadow-2xl space-y-3.5 animate-in zoom-in-95 duration-150 relative my-auto">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="font-heading font-black text-sm sm:text-base text-white">
                  Live Classroom Safe Stream • {childFirstName}
                </h3>
              </div>
              <button
                onClick={() => setIsLiveCamOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Feed Placeholder */}
            <div className="relative h-56 sm:h-64 w-full rounded-2xl bg-black overflow-hidden border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80"
                alt="Live Classroom Feed"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute top-2.5 left-2.5 bg-rose-600/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>LIVE HD • 60 FPS</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/70 backdrop-blur-xs p-2.5 rounded-xl text-xs flex justify-between items-center text-slate-200">
                <span className="font-bold">{cameras[selectedCam].name}</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted
                </span>
              </div>
            </div>

            {/* Camera Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(cameras).map(([camKey, camInfo]) => (
                <button
                  key={camKey}
                  onClick={() => setSelectedCam(camKey)}
                  className={`p-2 rounded-xl text-xs font-bold text-center transition border cursor-pointer ${
                    selectedCam === camKey
                      ? "bg-cyan-500 text-black border-cyan-400 font-black shadow-xs"
                      : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  }`}
                >
                  <span className="block text-base">{camInfo.icon}</span>
                  <span className="block truncate text-[11px] mt-0.5">{camInfo.name.split("•")[0]}</span>
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
