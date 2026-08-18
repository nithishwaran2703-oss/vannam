"use client";

import React, { useState } from "react";
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Cpu, 
  Activity, 
  CheckCircle2,
  Brain,
  Zap
} from "lucide-react";
import confetti from "canvas-confetti";
import { TwinkleStarIcon } from "./ToyDecorations";

export default function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Vannam AI", text: "Hello! Welcome to Vannam World Preschool. How can I assist you with admissions, child safety protocols, or campus tours today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const predefinedPrompts = [
    "What is the teacher-to-child ratio?",
    "How does live 4K parent streaming work?",
    "Tell me about organic meal plans.",
    "Calculate estimated tuition fee."
  ];

  const handleSend = (userText) => {
    const textToSend = userText || inputMsg;
    if (!textToSend.trim()) return;

    const userEntry = { sender: "You", text: textToSend };
    setMessages((prev) => [...prev, userEntry]);
    if (!userText) setInputMsg("");
    setIsTyping(true);

    // AI Response generation logic
    setTimeout(() => {
      let reply = "Our Vannam World Preschool environment integrates AI biometrics, 1:6 teacher ratio, and 4K encrypted parent live stream for 100% peace of mind.";
      const query = textToSend.toLowerCase();

      if (query.includes("ratio") || query.includes("teacher")) {
        reply = "We maintain an ultra-exclusive ratio: 1:4 for Toddlers, 1:6 for Playgroup, 1:8 for Nursery, and 1:10 for Kindergarten, plus 2 assistant caregivers in every room.";
      } else if (query.includes("stream") || query.includes("live") || query.includes("camera")) {
        reply = "Our encrypted 4K Parent Stream allows verified parents to log into the Parent Portal app anytime from 8:00 AM - 6:00 PM to view live classroom feeds.";
      } else if (query.includes("meal") || query.includes("food")) {
        reply = "Our meals are 100% certified organic, chef-curated daily, and tailored to each child's allergy profile tracked in our real-time nutrition database.";
      } else if (query.includes("fee") || query.includes("tuition")) {
        reply = "Tuition ranges between $350/month for Playgroup up to $550/month for Senior KG. You can use our interactive Fee Calculator tool on the website!";
      }

      setMessages((prev) => [...prev, { sender: "Vannam AI", text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Glow Trigger Button - Responsive bottom placement above mobile dock */}
      <div className="fixed bottom-18 right-3 sm:bottom-6 sm:right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) confetti({ particleCount: 40, spread: 50, origin: { x: 0.9, y: 0.9 } });
          }}
          className="relative group p-[2px] sm:p-[2.5px] bg-gradient-to-r from-cyan-400 via-rose-500 to-amber-400 rounded-full shadow-2xl transition transform hover:scale-105 active:scale-95"
        >
          <div className="bg-[#0B0F19] text-white font-heading text-xs sm:text-sm font-extrabold px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-full flex items-center gap-2 sm:gap-3">
            <div className="relative flex items-center justify-center">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
            </div>
            <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-amber-300 bg-clip-text text-transparent font-black tracking-wide whitespace-nowrap text-xs sm:text-sm">
              <span className="hidden xs:inline">Ask </span>Vannam AI
            </span>
          </div>
        </button>
      </div>

      {/* AI Chat Window Drawer - Responsive full width / safe bounds on mobile */}
      {isOpen && (
        <div className="fixed inset-x-2.5 bottom-20 sm:inset-x-auto sm:bottom-24 sm:right-8 z-50 w-auto sm:w-full sm:max-w-md max-h-[70vh] sm:max-h-[80vh] bg-white rounded-3xl border-3 sm:border-4 border-vannam-yellow/30 shadow-2xl text-[#0F2963] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
          
          {/* Top Header */}
          <div className="bg-[#0D1527] text-white p-4 border-b border-[#091A42] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-vannam-yellow rounded-2xl flex items-center justify-center text-[#0F2963] shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-base font-extrabold text-white">Vannam AI Assistant</h4>
                  <span className="bg-vannam-green/20 text-vannam-green text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-vannam-green/40">
                    ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-blue-200 font-medium">Preschool Parent Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white p-2 rounded-full hover:bg-[#091A42] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="p-4 h-64 sm:h-80 overflow-y-auto space-y-4 text-xs bg-[#FAFBFD]">
            {messages.map((msg, idx) => {
              const isAi = msg.sender === "Vannam AI" || msg.sender === "AURA AI";
              return (
                <div key={idx} className={`flex flex-col ${isAi ? "items-start" : "items-end"}`}>
                  <span className="text-[10px] text-blue-200 font-bold mb-1 px-1">{msg.sender}</span>
                  <div className={`p-4 rounded-2xl max-w-[90%] font-medium text-xs leading-relaxed ${
                    isAi 
                      ? "bg-white text-[#0F2963] border border-[#CBD8F6]/90 shadow-xs" 
                      : "bg-vannam-yellow text-[#0F2963] font-bold shadow-xs"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-vannam-orange text-xs font-bold animate-pulse p-2">
                <Cpu className="w-4 h-4 animate-spin text-vannam-yellow" />
                <span>Vannam AI is writing response...</span>
              </div>
            )}
          </div>

          {/* Prompt Chips */}
          <div className="px-4 py-3 bg-white border-t border-[#E8EEFB] flex gap-2 overflow-x-auto">
            {predefinedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="bg-vannam-yellow/5/80 hover:bg-vannam-yellow/10 text-[#0F2963] text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap transition border border-vannam-yellow/20 shrink-0"
              >
                ✨ {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-[#CBD8F6] flex gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 bg-[#F0F4FC] border border-[#CBD8F6] rounded-full px-4 py-2.5 text-xs text-[#0F2963] focus:outline-none focus:ring-2 focus:ring-vannam-yellow"
            />
            <button
              type="submit"
              className="bg-vannam-yellow hover:bg-vannam-yellow p-2.5 rounded-full text-[#0F2963] font-bold shrink-0 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
