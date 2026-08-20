"use client";

import React, { useEffect, useRef } from "react";

/**
 * ScrollReveal — Lightweight scroll-triggered animation wrapper.
 * Uses a single shared IntersectionObserver. GPU-accelerated CSS only.
 * Respects prefers-reduced-motion via CSS (globals.css).
 */

// Shared observer instance for performance
let sharedObserver = null;
const observedElements = new Set();

function getObserver() {
  if (sharedObserver) return sharedObserver;

  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
    return null;
  }

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          sharedObserver.unobserve(entry.target);
          observedElements.delete(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  return sharedObserver;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "", // "reveal-left", "reveal-right", "reveal-scale"
  stagger = 0,  // 1-6 for stagger delay
  as: Tag = "div",
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    if (!observer) {
      // Fallback: just show it if IntersectionObserver is not available
      el.classList.add("revealed");
      return;
    }

    observer.observe(el);
    observedElements.add(el);

    return () => {
      if (observedElements.has(el)) {
        observer.unobserve(el);
        observedElements.delete(el);
      }
    };
  }, []);

  const staggerClass = stagger > 0 && stagger <= 6 ? `stagger-${stagger}` : "";

  return (
    <Tag
      ref={ref}
      className={`reveal-on-scroll ${variant} ${staggerClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
