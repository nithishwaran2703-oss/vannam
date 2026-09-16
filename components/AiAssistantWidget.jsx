"use client";

import React, { useState } from "react";
import { 
  MessageCircle, 
  Send, 
  X, 
  Phone,
  Calendar,
  CheckCircle2,
  Heart,
  HelpCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Admissions Team", text: "Hello! Welcome to Vannam World Preschool. I'm Ms. Priya from the Admissions Office. How can we help you with enrollment, safety, or booking a campus tour today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const predefinedPrompts = [
    "What is the teacher-to-child ratio?",
    "How does live parent streaming work?",
    "Tell me about daily organic meals.",
    "Calculate estimated tuition fee."
  ];

  const handleSend = (userText) => {
    const textToSend = userText || inputMsg;
    if (!textToSend.trim()) return;

    const userEntry = { sender: "You", text: textToSend };
    setMessages((prev) => [...prev, userEntry]);
    if (!userText) setInputMsg("");
    setIsTyping(true);

    // Warm, human response logic
    setTimeout(() => {
      let reply = "Thank you for asking! At Vannam World Preschool, we provide small batches, caring educators, and complete parent peace of mind.";
      const query = textToSend.toLowerCase();

      if (query.includes("ratio") || query.includes("teacher")) {
        reply = "We maintain very close teacher ratios: 1:4 for Toddlers, 1:6 for Playgroup, 1:8 for Nursery, and 1:10 for Kindergarten, plus two loving assistant caregivers in every classroom.";
      } else if (query.includes("stream") || query.includes("live") || query.includes("camera") || query.includes("cctv")) {
        reply = "Our secure parent video stream lets verified families log into our Parent Portal app between 8:00 AM and 6:00 PM on school days to watch their child's classroom activities in real time.";
      } else if (query.includes("meal") || query.includes("food") || query.includes("lunch")) {
        reply = "Our school lunches and snacks are 100% organic, freshly cooked every morning by our in-house chef, and carefully adapted to each child's allergy profile.";
      } else if (query.includes("fee") || query.includes("tuition") || query.includes("cost")) {
        reply = "Tuition ranges from $350/month for Playgroup up to $550/month for Senior KG. Feel free to contact our admissions team or schedule a visit for complete details!";
      }

      setMessages((prev) => [...prev, { sender: "Admissions Team", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Glow Trigger Button - Responsive bottom placement above mobile dock */}
      <div className="fixed bottom-18 right-3 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) confetti({ particleCount: 30, spread: 45, origin: { x: 0.9, y: 0.9 } });
          }}
          className="relative group p-[2px] sm:p-[2.5px] bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95"
          aria-label="Chat with Admissions Office"
        >
          <div className="bg-[#0F2963] text-white font-heading text-xs sm:text-sm font-extrabold px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-full flex items-center gap-2 sm:gap-2.5">
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 shrink-0" />
            </div>
            <span className="text-white font-bold tracking-wide whitespace-nowrap text-xs sm:text-sm flex items-center gap-1.5">
              <span>Parent Help Desk</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden xs:inline-block" />
            </span>
          </div>
        </button>
      </div>

      {/* Human Admissions Chat Window Drawer */}
      {isOpen && (
        <div className="fixed inset-x-2.5 bottom-20 sm:inset-x-auto sm:bottom-24 sm:right-8 z-50 w-auto sm:w-full sm:max-w-md max-h-[70vh] sm:max-h-[80vh] bg-white rounded-3xl border-3 sm:border-4 border-amber-300/60 shadow-2xl text-[#0F2963] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
          
          {/* Top Header */}
          <div className="bg-[#0F2963] text-white p-4 border-b border-[#0A1D47] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center text-[#0F2963] font-bold shadow-md">
                <MessageCircle className="w-5 h-5 text-[#0F2963]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-base font-extrabold text-white">Admissions Help Desk</h4>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-400/40">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 font-medium">Ms. Priya • Parent Counselor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-64 sm:h-80 overflow-y-auto space-y-3.5 text-xs bg-[#FAFBFD]">
            {messages.map((msg, idx) => {
              const isStaff = msg.sender === "Admissions Team";
              return (
                <div key={idx} className={`flex flex-col ${isStaff ? "items-start" : "items-end"}`}>
                  <span className="text-[10px] text-slate-400 font-bold mb-1 px-1">{msg.sender}</span>
                  <div className={`p-3.5 rounded-2xl max-w-[90%] font-medium text-xs leading-relaxed ${
                    isStaff 
                      ? "bg-white text-[#0F2963] border border-[#CBD8F6]/90 shadow-xs rounded-tl-xs" 
                      : "bg-[#0F2963] text-white font-semibold shadow-xs rounded-tr-xs"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex items-center gap-2 text-[#0F2963] text-xs font-semibold p-2">
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
                <span className="text-slate-500 text-[11px]">Ms. Priya is typing...</span>
              </div>
            )}
          </div>

          {/* Prompt Chips */}
          <div className="px-4 py-2.5 bg-white border-t border-[#E8EEFB] flex gap-2 overflow-x-auto">
            {predefinedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="bg-amber-50 hover:bg-amber-100 text-[#0F2963] text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition border border-amber-200 shrink-0"
              >
                💬 {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-[#CBD8F6] flex gap-2">
            <input
              type="text"
              placeholder="Ask our admissions team a question..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-[#F0F4FC] border border-[#CBD8F6] rounded-full px-4 py-2.5 text-xs text-[#0F2963] focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-[#0F2963] hover:bg-[#0A1D47] p-2.5 rounded-full text-white font-bold shrink-0 transition shadow-xs"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
