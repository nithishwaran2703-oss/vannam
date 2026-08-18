"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, CheckCircle2 } from "lucide-react";
import { TwinkleStarIcon } from "./ToyDecorations";

export default function FeeCalculator() {
  const [ageGroup, setAgeGroup] = useState("playgroup");
  const [hoursOption, setHoursOption] = useState("half");
  const [mealPlan, setMealPlan] = useState(true);
  const [transport, setTransport] = useState(true);

  const rates = {
    playgroup: 450,
    nursery: 500,
    junior: 550,
    senior: 600
  };

  const calculateTotal = () => {
    let base = rates[ageGroup] || 450;
    if (hoursOption === "full") base += 150;
    if (mealPlan) base += 80;
    if (transport) base += 100;
    return base;
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      
      {/* Header */}
      <div className="flex items-center gap-3 pr-10 sm:pr-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-vannam-yellow text-[#0F2963] rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs shrink-0 border border-amber-300">
          <Calculator className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-vannam-orange bg-vannam-yellow/15 px-2 py-0.5 rounded-full mb-0.5">
            <TwinkleStarIcon color="amber" className="w-2.5 h-2.5" />
            <span>Tuition Estimator</span>
          </span>
          <h3 className="font-heading text-base sm:text-2xl font-extrabold text-[#0F2963] leading-tight">Interactive Fee Estimator</h3>
          <p className="text-[11px] sm:text-xs text-[#475569] font-medium leading-tight">Select your program & options for an instant tuition estimate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        
        {/* Left Inputs */}
        <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
          
          {/* 1. Age Program */}
          <div>
            <label className="block text-[11px] font-black text-[#0F2963] uppercase tracking-wide mb-1.5">1. Select Age Program</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "playgroup", title: "Playgroup", age: "1.5-2.5y", activeClass: "bg-vannam-yellow border-vannam-yellow text-[#0F2963]" },
                { id: "nursery", title: "Nursery", age: "2.5-3.5y", activeClass: "bg-vannam-green border-vannam-green text-white" },
                { id: "junior", title: "Junior KG", age: "3.5-4.5y", activeClass: "bg-[#00A8E8] border-[#0284C7] text-white" },
                { id: "senior", title: "Senior KG", age: "4.5-5.5y", activeClass: "bg-vannam-red border-vannam-red text-white" }
              ].map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  onClick={() => setAgeGroup(prog.id)}
                  className={`py-2 px-2.5 rounded-xl text-left transition border font-bold flex flex-col justify-center ${
                    ageGroup === prog.id 
                      ? `${prog.activeClass} shadow-xs font-black ring-2 ring-offset-1 ring-amber-400/40` 
                      : "bg-[#F8FAFC] text-[#1E293B] border-[#CBD8F6] hover:bg-[#F0F4FC]"
                  }`}
                >
                  <span className="text-xs leading-tight font-extrabold">{prog.title}</span>
                  <span className={`text-[10px] font-semibold opacity-90 leading-tight ${ageGroup === prog.id ? "text-inherit" : "text-[#64748B]"}`}>
                    ({prog.age})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. School Hours */}
          <div>
            <label className="block text-[11px] font-black text-[#0F2963] uppercase tracking-wide mb-1.5">2. School Hours</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHoursOption("half")}
                className={`py-2 px-3 rounded-xl text-left transition border text-xs font-bold ${
                  hoursOption === "half" 
                    ? "bg-[#0F2963] text-white shadow-xs font-black border-[#091A42] ring-2 ring-offset-1 ring-[#0F2963]/30" 
                    : "bg-[#F8FAFC] text-[#1E293B] border-[#CBD8F6] hover:bg-[#F0F4FC]"
                }`}
              >
                <div className="font-extrabold">Half Day</div>
                <div className="text-[10px] font-medium opacity-80">8:30 AM - 12:30 PM</div>
              </button>
              <button
                type="button"
                onClick={() => setHoursOption("full")}
                className={`py-2 px-3 rounded-xl text-left transition border text-xs font-bold ${
                  hoursOption === "full" 
                    ? "bg-[#0F2963] text-white shadow-xs font-black border-[#091A42] ring-2 ring-offset-1 ring-[#0F2963]/30" 
                    : "bg-[#F8FAFC] text-[#1E293B] border-[#CBD8F6] hover:bg-[#F0F4FC]"
                }`}
              >
                <div className="font-extrabold">Full Day Care</div>
                <div className="text-[10px] font-medium opacity-80">8:30 AM - 4:00 PM (+ $150)</div>
              </button>
            </div>
          </div>

          {/* 3. Optional Add-ons */}
          <div>
            <label className="block text-[11px] font-black text-[#0F2963] uppercase tracking-wide mb-1.5">3. Optional Add-ons</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border text-xs font-bold transition select-none ${
                mealPlan ? "bg-amber-50/70 border-amber-300 text-[#0F2963]" : "bg-[#F8FAFC] border-[#CBD8F6] text-[#475569]"
              }`}>
                <input
                  type="checkbox"
                  checked={mealPlan}
                  onChange={(e) => setMealPlan(e.target.checked)}
                  className="rounded text-vannam-yellow focus:ring-vannam-yellow w-4 h-4 shrink-0"
                />
                <span className="leading-tight text-[11px] sm:text-xs">Organic Meals (+ $80/mo)</span>
              </label>

              <label className={`flex items-center gap-2 cursor-pointer p-2.5 rounded-xl border text-xs font-bold transition select-none ${
                transport ? "bg-amber-50/70 border-amber-300 text-[#0F2963]" : "bg-[#F8FAFC] border-[#CBD8F6] text-[#475569]"
              }`}>
                <input
                  type="checkbox"
                  checked={transport}
                  onChange={(e) => setTransport(e.target.checked)}
                  className="rounded text-vannam-yellow focus:ring-vannam-yellow w-4 h-4 shrink-0"
                />
                <span className="leading-tight text-[11px] sm:text-xs">Van Pick & Drop (+ $100/mo)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right Output Box */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#FFFBEB] to-[#FEF3C7] rounded-2xl p-4 sm:p-5 border-2 border-amber-300 flex flex-col justify-between text-center space-y-3.5 shadow-sm">
          <span className="bg-vannam-yellow/20 text-vannam-orange text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mx-auto">
            Estimated Monthly Fee
          </span>

          <div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2963]">${calculateTotal()}</span>
              <span className="text-[#64748B] font-bold text-xs sm:text-sm">/ Month</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] text-[#334155] font-bold border-t border-amber-200/80 pt-2.5 text-left">
            <div className="flex justify-between items-center">
              <span className="truncate">Includes Complete Learning Kit</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-vannam-green shrink-0 ml-1" />
            </div>
            <div className="flex justify-between items-center">
              <span className="truncate">Parent Portal & Live Updates</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-vannam-green shrink-0 ml-1" />
            </div>
          </div>

          <a
            href="/admissions"
            className="w-full btn-primary text-xs font-black py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Apply Online Now</span>
            <Sparkles className="w-3.5 h-3.5 text-vannam-yellow" />
          </a>
        </div>

      </div>

    </div>
  );
}
