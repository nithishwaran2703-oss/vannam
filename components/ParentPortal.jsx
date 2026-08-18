"use client";

import React, { useState } from "react";
import { 
  Camera, 
  Video, 
  Calendar, 
  MessageSquare, 
  Send, 
  Award, 
  Download, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  Sparkles,
  User,
  Activity,
  Cpu,
  Radio,
  Lock,
  Flame,
  CheckCircle2,
  Smile
} from "lucide-react";
import confetti from "canvas-confetti";
import { TwinkleStarIcon, TeddyBearIcon } from "./ToyDecorations";

export default function ParentPortal() {
  const [selectedCam, setSelectedCam] = useState("cam1");
  const [activePortalTab, setActivePortalTab] = useState("camera");
  const [streamQuality, setStreamQuality] = useState("4K HDR");
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI Assistant Nanny", time: "09:15 AM", text: "Biometric Check-In Verified: Ananya entered Classroom 1A with normal body temp (98.4°F)." },
    { sender: "Teacher Sarah", time: "09:30 AM", text: "Good morning! Ananya is leading the STEAM block assembly project today!" },
    { sender: "Parent (You)", time: "09:45 AM", text: "Wonderful! Please make sure she wears her protective painting apron." }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isSimulatingReply, setIsSimulatingReply] = useState(false);

  const cameras = {
    cam1: { name: "Classroom 1A • Sensory Play", status: "4K 60FPS", bitrate: "14.2 Mbps", viewers: 18, icon: "🎨", streamUrl: "cam_1a_4k" },
    cam2: { name: "Montessori STEAM Lab", status: "4K 60FPS", bitrate: "12.8 Mbps", viewers: 11, icon: "🤖", streamUrl: "cam_robotics" },
    cam3: { name: "Outdoor Adventure Lawn", status: "4K 60FPS", bitrate: "15.0 Mbps", viewers: 26, icon: "🌿", streamUrl: "cam_lawn" },
    cam4: { name: "Organic Dining & Sleep Suite", status: "1080P NIGHT VISION", bitrate: "8.5 Mbps", viewers: 4, icon: "🍎", streamUrl: "cam_dining" }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      sender: "Parent (You)",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newMessage
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setIsSimulatingReply(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "Teacher Sarah",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "Understood! The apron is secured. Sending a snapshot to your daily gallery right now! 📸"
        }
      ]);
      setIsSimulatingReply(false);
    }, 1400);
  };

  const handleDownloadReport = () => {
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    alert("✨ Accessing Secure Vault... Ananya's Monthly Cognitive Milestone Report Card generated & downloaded!");
  };

  return (
    <div className="bento-card p-6 sm:p-8 border-2 border-vannam-yellow/30 bg-white space-y-6 text-[#0F2963] relative overflow-hidden shadow-xl">
      
      {/* Header Profile Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between border-b border-[#E8EEFB] pb-5 gap-4 relative z-10">
        
        {/* Child Profile Badge */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 via-rose-400 to-[#00A8E8] rounded-2xl p-1 shadow-md">
              <div className="w-full h-full bg-white rounded-[12px] flex items-center justify-center text-3xl">
                👧
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-vannam-green border-2 border-white rounded-full animate-pulse"></span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-2xl font-extrabold text-[#0F2963] tracking-tight">Ananya Sharma</h3>
              <span className="bg-vannam-green/10 text-vannam-green text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-vannam-green/30 flex items-center gap-1">
                <Radio className="w-3 h-3 text-vannam-green animate-pulse" />
                <span>CHECKED IN (09:15 AM)</span>
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-bold mt-0.5">
              Grade: <strong className="text-vannam-orange">Playgroup A</strong> • Educator: <strong className="text-[#0F2963]">Sarah Jenkins</strong> • UID: <span className="font-mono text-[#334155]">#BW-8942</span>
            </p>
          </div>
        </div>

        {/* Portal Nav Switcher */}
        <div className="flex bg-[#E8EEFB] p-1.5 rounded-2xl border border-[#CBD8F6]/80 w-full lg:w-auto overflow-x-auto scrollbar-none snap-x gap-1">
          <button
            onClick={() => setActivePortalTab("camera")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activePortalTab === "camera" 
                ? "bg-[#0F2963] text-white shadow-md" 
                : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>4K Live Telecast</span>
          </button>

          <button
            onClick={() => setActivePortalTab("diary")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activePortalTab === "diary" 
                ? "bg-vannam-yellow text-[#0F2963] shadow-md" 
                : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Activity Diary</span>
          </button>

          <button
            onClick={() => setActivePortalTab("chat")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activePortalTab === "chat" 
                ? "bg-[#F43F5E] text-white shadow-md" 
                : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Teacher Chat</span>
          </button>

          <button
            onClick={() => setActivePortalTab("report")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activePortalTab === "report" 
                ? "bg-vannam-green text-white shadow-md" 
                : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Milestones</span>
          </button>
        </div>

      </div>

      {/* Camera Viewport */}
      {activePortalTab === "camera" && (
        <div className="space-y-4 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 4K Stream Screen */}
            <div className="lg:col-span-8 bg-[#0F2963] text-white rounded-3xl p-5 border-2 border-[#091A42] relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px] shadow-2xl">
              
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between z-10">
                <div className="bg-[#091A42]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#1D4ED8] flex items-center gap-2 text-xs font-extrabold text-white">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
                  <span>{cameras[selectedCam].name}</span>
                </div>

                <div className="flex gap-2">
                  <span className="bg-vannam-cyan/20 text-vannam-cyan backdrop-blur-md px-3 py-1 rounded-xl border border-vannam-cyan/30 text-[10px] font-mono font-bold">
                    {cameras[selectedCam].bitrate}
                  </span>
                  <span className="bg-vannam-green/20 text-vannam-green backdrop-blur-md px-3 py-1 rounded-xl border border-vannam-green/30 text-[10px] font-mono font-bold">
                    256-BIT ENCRYPTED
                  </span>
                </div>
              </div>

              {/* Stream Graphic */}
              <div className="my-6 text-center space-y-4 z-10">
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-vannam-yellow/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="relative w-full h-full bg-[#091A42] border-2 border-vannam-yellow/40/80 rounded-full flex items-center justify-center text-5xl shadow-2xl">
                    {cameras[selectedCam].icon}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                    4K Live Video Telecast Active
                  </h4>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-md mx-auto mt-1">
                    Streaming live from <strong className="text-vannam-yellow">{cameras[selectedCam].name}</strong>. Authorized parents only.
                  </p>
                </div>
              </div>

              {/* Screen Bottom Bar */}
              <div className="flex items-center justify-between z-10 text-xs font-bold text-blue-200 bg-[#091A42]/80 backdrop-blur-md p-3 rounded-2xl border border-[#091A42]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-vannam-yellow" />
                  <span>Authorized Parents Live: <strong className="text-white">{cameras[selectedCam].viewers}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-vannam-cyan" />
                  <span>Campus Time: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>

            </div>

            {/* Camera Selector Buttons */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="font-heading text-xs font-extrabold text-[#64748B] uppercase tracking-widest">
                Classroom Camera Angles
              </h4>

              {Object.keys(cameras).map((camKey) => {
                const cam = cameras[camKey];
                const isSelected = selectedCam === camKey;
                return (
                  <button
                    key={camKey}
                    onClick={() => setSelectedCam(camKey)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition flex items-center justify-between ${
                      isSelected 
                        ? "bg-vannam-yellow/5 border-vannam-yellow/40 shadow-md scale-[1.02]" 
                        : "bg-[#F0F4FC]/80 border-[#CBD8F6] hover:bg-[#E8EEFB]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl">{cam.icon}</span>
                      <div>
                        <h5 className="font-heading text-xs font-extrabold text-[#0F2963]">{cam.name}</h5>
                        <span className="text-[10px] text-[#00A8E8] font-bold">{cam.status}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-3 h-3 bg-vannam-yellow rounded-full shadow-xs"></span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* Diary Tab */}
      {activePortalTab === "diary" && (
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between border-b border-[#E8EEFB] pb-3">
            <h4 className="font-heading text-lg font-extrabold text-[#0F2963]">Today&apos;s Real-Time Activity Feed</h4>
            <span className="text-xs text-vannam-green font-extrabold bg-vannam-green/10 px-3 py-1 rounded-full border border-vannam-green/30">
              UPDATED LIVE
            </span>
          </div>

          <div className="space-y-3">
            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-green/10 text-vannam-green border border-vannam-green/30 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                09:15 AM
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">Morning Gate Check-In & Sanitization</h5>
                  <span className="text-[10px] bg-vannam-green/10 text-vannam-green px-2 py-0.5 rounded-full font-bold">98.4°F Temp OK</span>
                </div>
                <p className="text-xs text-[#334155] font-medium">Ananya checked in with Teacher Sarah Jenkins. Gated safety verified.</p>
              </div>
            </div>

            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-yellow/10 text-vannam-orange border border-vannam-yellow/30 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                10:30 AM
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">Organic Chef Snack Intake</h5>
                  <span className="text-[10px] bg-vannam-yellow/10 text-vannam-orange px-2 py-0.5 rounded-full font-bold">100% Consumed</span>
                </div>
                <p className="text-xs text-[#334155] font-medium">Organic avocado mash, oat crackers, and warm fresh milk.</p>
              </div>
            </div>

            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-red/10 text-vannam-red border border-vannam-red/30 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                11:15 AM
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">STEAM Blocks & Color Stenciling</h5>
                  <span className="text-[10px] bg-vannam-red/10 text-vannam-red px-2 py-0.5 rounded-full font-bold">High Engagement</span>
                </div>
                <p className="text-xs text-[#334155] font-medium">Successfully built a 4-tier wooden bridge with classmate Aarav.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activePortalTab === "chat" && (
        <div className="space-y-4 relative z-10">
          <div className="bg-[#F0F4FC] rounded-2xl p-4 border border-[#CBD8F6] h-64 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => {
              const isMe = msg.sender.includes("You");
              return (
                <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  <span className="text-[10px] text-blue-200 font-bold mb-1">{msg.sender} • {msg.time}</span>
                  <div className={`p-3.5 rounded-2xl text-xs max-w-sm font-semibold ${
                    isMe 
                      ? "bg-[#0F2963] text-white shadow-xs" 
                      : "bg-white text-[#0F2963] border border-[#CBD8F6] shadow-2xs"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isSimulatingReply && (
              <div className="text-xs text-vannam-orange font-bold animate-pulse">
                Teacher Sarah is typing a response...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              placeholder="Type message to Teacher Sarah..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs text-[#0F2963] focus:outline-none focus:ring-2 focus:ring-vannam-yellow font-medium"
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 text-xs font-extrabold flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Report Tab */}
      {activePortalTab === "report" && (
        <div className="bg-vannam-yellow/5/70 rounded-3xl p-8 border-2 border-vannam-yellow/20 space-y-5 text-center relative z-10">
          <div className="w-16 h-16 bg-vannam-yellow text-[#0F2963] rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-md border-2 border-white">
            🏆
          </div>

          <h4 className="font-heading text-2xl font-extrabold text-[#0F2963]">Ananya&apos;s Monthly Milestone Report Card</h4>
          <p className="text-xs sm:text-sm text-[#1E293B] max-w-md mx-auto font-medium">
            Social Adaptability: <strong className="text-vannam-green font-extrabold">96% High</strong> • Fine Motor: <strong className="text-vannam-orange font-extrabold">92% Superior</strong> • STEAM Logic: <strong className="text-[#0F2963] font-extrabold">89% Advanced</strong>
          </p>

          <div className="pt-2">
            <button
              onClick={handleDownloadReport}
              className="btn-primary text-xs font-extrabold px-8 py-3.5 shadow-lg inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Signed Report (PDF)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
