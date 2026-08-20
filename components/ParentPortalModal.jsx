"use client";

import React from "react";
import ParentPortal from "./ParentPortal";

export default function ParentPortalModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#060913]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-6xl my-auto animate-in fade-in zoom-in-95 duration-200">
        <ParentPortal isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
