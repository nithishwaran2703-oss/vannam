"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function TourSchedulerModal({ isOpen, onClose }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10am");
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    childAge: "2-3",
    phone: "",
    email: "",
    notes: ""
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: form.parentName,
          childName: form.childName,
          childDob: form.childAge ? `Age ~${form.childAge}` : '',
          phone: form.phone,
          email: form.email,
          program: "Campus Tour - Coimbatore Main Campus",
          preferredDate: selectedDate ? `${selectedDate} (${selectedTimeSlot === "10am" ? "10:00 AM" : "03:30 PM"})` : '',
          notes: form.notes || "Tour booking request at Coimbatore Main Campus."
        })
      });
    } catch (err) {
      console.error("Error posting tour booking:", err);
    }
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091A42]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      
      <div className="bg-white max-w-xl w-full rounded-3xl border-4 border-vannam-yellow/30 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200 my-auto">
        
        {/* Header */}
        <div className="bg-[#0F2963] text-white p-4 sm:p-6 relative border-b border-vannam-navy">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-vannam-yellow text-[#0F2963] rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md border-2 border-white shrink-0">
              🏫
            </div>
            <div>
              <span className="bg-vannam-yellow/20 text-vannam-yellow text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-vannam-yellow/40/40 uppercase tracking-wider">
                Guided Campus Visit
              </span>
              <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-white mt-0.5">Schedule A Campus Tour</h3>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-vannam-green/10 text-vannam-green border-2 border-vannam-green/30 rounded-full flex items-center justify-center mx-auto text-3xl sm:text-4xl shadow-md">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <h4 className="font-heading text-xl sm:text-3xl font-extrabold text-[#0F2963]">Tour Booking Confirmed! 🎉</h4>
            <p className="text-xs sm:text-sm text-[#334155] max-w-sm mx-auto font-medium">
              We look forward to meeting you and <strong>{form.childName || "your child"}</strong>! Our admissions officer will call you to confirm your visit details.
            </p>
            <div className="bg-[#F0F4FC] p-4 rounded-2xl border border-[#CBD8F6] text-xs text-[#1E293B] space-y-2 font-bold max-w-sm mx-auto text-left">
              <div className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <div>
                  <div className="font-extrabold text-[#0F2963]">Coimbatore Main Campus</div>
                  <div className="text-[11px] font-normal text-slate-600 mt-0.5">Door no: 701, G-6 ground floor, Sullivan Street, Gandhi Park, Coimbatore - 641 001</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-slate-700">
                <span>📅</span>
                <span>Visit: {selectedDate ? `${selectedDate} • ` : ""}{selectedTimeSlot === "10am" ? "10:00 AM (Morning)" : "03:30 PM (Afternoon)"}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-vannam-yellow hover:bg-vannam-yellow text-[#0F2963] font-heading text-xs font-extrabold px-8 py-3.5 rounded-xl shadow-md transition cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-4 text-[#0F2963] max-h-[75vh] overflow-y-auto">
            
            {/* Campus Location Card (Single Campus with Address) */}
            <div>
              <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-vannam-orange" />
                <span>Campus Location</span>
              </label>
              <div className="p-3.5 rounded-2xl bg-[#F0F4FC] border border-[#CBD8F6] text-left flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-vannam-yellow/25 text-vannam-orange flex items-center justify-center text-base shrink-0 mt-0.5">
                  📍
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-heading font-extrabold text-xs sm:text-sm text-[#0F2963] flex items-center gap-2">
                    <span>Coimbatore Main Campus</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Open for Visits</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-600 mt-0.5 leading-snug">
                    Door no: 701, G-6 ground floor, Sullivan Street, Gandhi Park, Coimbatore - 641 001
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">1. Preferred Date *</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-3 text-xs font-bold text-[#0F2963] focus:ring-2 focus:ring-vannam-yellow focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1.5">2. Time Slot *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedTimeSlot("10am")}
                    className={`py-3 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                      selectedTimeSlot === "10am" ? "bg-[#0F2963] text-white shadow-xs" : "bg-[#F0F4FC] border-[#CBD8F6] text-[#1E293B]"
                    }`}
                  >
                    10:00 AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTimeSlot("3pm")}
                    className={`py-3 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                      selectedTimeSlot === "3pm" ? "bg-[#0F2963] text-white shadow-xs" : "bg-[#F0F4FC] border-[#CBD8F6] text-[#1E293B]"
                    }`}
                  >
                    03:30 PM
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1">Parent's Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Bennett"
                  value={form.parentName}
                  onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  className="w-full bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-vannam-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1">Child's Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya"
                  value={form.childName}
                  onChange={(e) => setForm({ ...form, childName: e.target.value })}
                  className="w-full bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-vannam-yellow focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-vannam-yellow focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[#1E293B] uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="parent@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F0F4FC] border border-[#CBD8F6] rounded-2xl px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-vannam-yellow focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full btn-primary text-sm font-extrabold py-4 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Confirm Guided Tour Slot</span>
                <Sparkles className="w-4 h-4 text-vannam-yellow" />
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
}
