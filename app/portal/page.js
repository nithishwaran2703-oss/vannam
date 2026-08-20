"use client";

import React from "react";
import ParentPortal from "../../components/ParentPortal";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[#070B19] text-white">
      {/* Top Breadcrumb Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <Link 
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white transition bg-white/5 border border-cyan-500/20 px-3 py-1.5 rounded-xl shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>

        <div className="text-[11px] text-slate-400 font-medium">
          Vannam World Preschool • Official Parent Portal
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 pb-12 pt-2">
        <ParentPortal isModal={false} />
      </div>
    </main>
  );
}
