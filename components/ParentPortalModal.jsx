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
  Heart,
  Smile,
  LogOut,
  X,
  FileText,
  Apple,
  Moon,
  Radio
} from "lucide-react";
import confetti from "canvas-confetti";

export default function ParentPortalModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedCam, setSelectedCam] = useState("cam1");
  const [chatMessages, setChatMessages] = useState([
    { sender: "Teacher Sarah", time: "09:30 AM", text: "Good morning! Ananya arrived safely and is happily playing with building blocks." },
    { sender: "Parent (You)", time: "09:45 AM", text: "Thank you Sarah! Please remind her to drink water after painting." },
    { sender: "Teacher Sarah", time: "10:15 AM", text: "Will do! She just completed her alphabet stenciling activity wonderfully." }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const cameras = {
    cam1: { name: "Classroom 1A (Main Playroom)", status: "LIVE HD", viewers: 14, icon: "🎨" },
    cam2: { name: "Montessori STEAM Lab", status: "LIVE HD", viewers: 9, icon: "🔬" },
    cam3: { name: "Outdoor Lawn & Playground", status: "LIVE HD", viewers: 22, icon: "🛝" },
    cam4: { name: "Organic Dining & Nap Zone", status: "STANDBY", viewers: 0, icon: "🍎" }
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
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "Teacher Sarah",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: "Received! I will make sure Ananya gets a quick photo update sent to your dashboard shortly! 😊"
        }
      ]);
      setIsTyping(false);
    }, 1300);
  };

  const handleDownloadReportCard = () => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    alert("📄 Generating Ananya's Monthly Development Report Card (PDF)... Check your downloads folder!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091A42]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      <div className="bg-white text-[#0F2963] max-w-5xl w-full rounded-3xl border-4 border-vannam-yellow/30 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200 my-auto">
        
        {/* Top Header */}
        <div className="bg-[#0F2963] text-white p-4 sm:p-6 border-b border-vannam-navy flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-vannam-yellow rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-md text-[#0F2963] border-2 border-white shrink-0">
              👧
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-white leading-tight">Ananya Sharma</h3>
                <span className="bg-vannam-green/20 text-vannam-green text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-vannam-green/40 flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-vannam-green animate-pulse" />
                  <span>Checked In</span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-vannam-cyan font-medium truncate max-w-[200px] sm:max-w-none">
                Playgroup B • Sarah Jenkins • ID: #WK-8942
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white font-heading text-xs font-extrabold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition flex items-center gap-1.5 border border-white/20"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vannam-red" />
              <span className="hidden xs:inline">Exit Portal</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation - Touch Horizontal Scroll with Snap */}
        <div className="bg-[#F0F4FC] px-3 sm:px-6 py-2 border-b border-[#CBD8F6] flex gap-2 overflow-x-auto scrollbar-none snap-x">
          <button
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activeTab === "live" ? "bg-[#0F2963] text-white shadow-md" : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>4K Live Streams</span>
          </button>

          <button
            onClick={() => setActiveTab("diary")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activeTab === "diary" ? "bg-vannam-yellow text-[#0F2963] shadow-md" : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Daily Diary</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activeTab === "chat" ? "bg-[#F43F5E] text-white shadow-md" : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Teacher Chat</span>
            <span className="bg-vannam-red text-white text-[9px] px-1.5 py-0.2 rounded-full">1</span>
          </button>

          <button
            onClick={() => setActiveTab("report")}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition shrink-0 snap-center ${
              activeTab === "report" ? "bg-vannam-green text-white shadow-md" : "text-[#334155] hover:text-[#0F2963]"
            }`}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Report Card</span>
          </button>
        </div>

        {/* Tab 1: Live Stream Switching */}
        {activeTab === "live" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Screen */}
              <div className="lg:col-span-8 bg-[#0F2963] text-white rounded-3xl p-5 border-2 border-[#091A42] relative min-h-[250px] sm:min-h-[320px] lg:min-h-[360px] flex flex-col justify-between overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center z-10">
                  <div className="bg-red-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    {cameras[selectedCam].status} • {cameras[selectedCam].name}
                  </div>
                  <span className="bg-vannam-green/20 text-vannam-green text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-vannam-green/30">
                    256-Bit Encrypted
                  </span>
                </div>

                <div className="my-8 text-center space-y-3 z-10">
                  <div className="w-20 h-20 bg-vannam-yellow/20 rounded-full flex items-center justify-center mx-auto text-4xl border-2 border-vannam-yellow/40 animate-bounce">
                    {cameras[selectedCam].icon}
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-extrabold text-white">{cameras[selectedCam].name}</h4>
                    <p className="text-xs text-blue-100 font-medium max-w-sm mx-auto">
                      High-Definition encrypted camera stream active. Viewing granted to verified parents only during school hours.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-blue-200 z-10 bg-[#091A42]/80 p-3 rounded-2xl border border-[#091A42]">
                  <span>Viewers online: <strong className="text-white">{cameras[selectedCam].viewers} parents</strong></span>
                  <span>School Time: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Camera Buttons */}
              <div className="lg:col-span-4 space-y-3">
                <h4 className="font-heading text-xs font-extrabold text-[#64748B] uppercase tracking-wider">Select Classroom Camera View</h4>
                {Object.keys(cameras).map((camKey) => {
                  const cam = cameras[camKey];
                  const isSelected = selectedCam === camKey;
                  return (
                    <button
                      key={camKey}
                      onClick={() => setSelectedCam(camKey)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition flex items-center justify-between ${
                        isSelected 
                          ? "bg-vannam-yellow/5 border-vannam-yellow/40 shadow-md scale-[1.02]" 
                          : "bg-[#F0F4FC] border-[#CBD8F6] hover:bg-[#E8EEFB]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{cam.icon}</span>
                        <div>
                          <h5 className="font-heading text-xs font-extrabold text-[#0F2963]">{cam.name}</h5>
                          <span className="text-[10px] text-[#00A8E8] font-bold">Status: {cam.status}</span>
                        </div>
                      </div>
                      {isSelected && <span className="w-3 h-3 bg-vannam-yellow rounded-full"></span>}
                    </button>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Activity Diary */}
        {activeTab === "diary" && (
          <div className="p-4 sm:p-6 space-y-3">
            <h4 className="font-heading text-lg font-extrabold text-[#0F2963] mb-2">Today&apos;s Real-Time Child Telemetry</h4>
            
            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-green/10 text-vannam-green rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                09:15 AM
              </div>
              <div>
                <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">Morning Gate Arrival & Temperature Check</h5>
                <p className="text-xs text-[#334155] font-medium mt-0.5">Temperature: 98.4°F (Normal). Ananya entered with a happy smile!</p>
              </div>
            </div>

            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-yellow/10 text-vannam-orange rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                10:30 AM
              </div>
              <div>
                <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">Organic Snack Break</h5>
                <p className="text-xs text-[#334155] font-medium mt-0.5">Menu: Organic apple slices & oat cookies. Ate 100% of serving.</p>
              </div>
            </div>

            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] flex items-start gap-4">
              <div className="w-12 h-12 bg-vannam-red/10 text-vannam-red rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 font-mono">
                11:15 AM
              </div>
              <div>
                <h5 className="font-heading text-sm font-extrabold text-[#0F2963]">Finger Painting & Alphabet Stencil</h5>
                <p className="text-xs text-[#334155] font-medium mt-0.5">Active engagement. Created a colorful butterfly artwork!</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Chat */}
        {activeTab === "chat" && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="bg-[#F0F4FC] rounded-2xl p-4 border border-[#CBD8F6] h-64 overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => {
                const isMe = msg.sender.includes("You");
                return (
                  <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <span className="text-[10px] text-blue-200 font-bold mb-1">{msg.sender} • {msg.time}</span>
                    <div className={`p-3 rounded-2xl text-xs max-w-sm font-semibold ${
                      isMe ? "bg-[#0F2963] text-white shadow-xs" : "bg-white text-[#0F2963] border border-[#CBD8F6] shadow-2xs"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && <div className="text-xs text-vannam-orange font-bold animate-pulse">Teacher Sarah is typing a response...</div>}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message to Teacher Sarah..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs text-[#0F2963] focus:outline-none focus:ring-2 focus:ring-vannam-yellow font-medium"
              />
              <button
                type="submit"
                className="btn-primary px-4 sm:px-6 py-3 text-xs font-extrabold shrink-0"
              >
                <span className="hidden sm:inline">Send Message</span>
                <Send className="w-4 h-4 sm:hidden" />
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Report Card */}
        {activeTab === "report" && (
          <div className="p-8 text-center space-y-5 bg-vannam-yellow/5/60">
            <div className="w-16 h-16 bg-vannam-yellow text-[#0F2963] rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-md border-2 border-white">
              🏆
            </div>
            <h4 className="font-heading text-2xl font-extrabold text-[#0F2963]">Ananya&apos;s Monthly Milestone Report Card</h4>
            <p className="text-xs sm:text-sm text-[#1E293B] max-w-md mx-auto font-medium">
              Social Adaptability: <strong className="text-vannam-green">95% Excellent</strong> • Fine Motor Skills: <strong className="text-vannam-orange">92% Superior</strong> • Language Development: <strong className="text-[#00A8E8]">89% Progressing</strong>
            </p>
            <button
              onClick={handleDownloadReportCard}
              className="btn-primary px-8 py-3.5 text-xs font-extrabold shadow-lg inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Signed Official Report (PDF)</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
