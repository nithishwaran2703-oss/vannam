"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// Storybook Context for coordinating 13 pages
const StorybookContext = createContext({
  activePage: 1,
  totalPages: 13,
  setActivePage: () => {},
  scrollToPage: () => {}
});

export const useStorybook = () => useContext(StorybookContext);

export const STORYBOOK_CHAPTERS = [
  { num: 1, title: "Welcome to Vannam", id: "hero", badge: "Chapter 01" },
  { num: 2, title: "Our Story", id: "about", badge: "Chapter 02" },
  { num: 3, title: "Our Programs", id: "programs", badge: "Chapter 03" },
  { num: 4, title: "Learning Journey", id: "methodology", badge: "Chapter 04" },
  { num: 5, title: "Daily Activities", id: "activities", badge: "Chapter 05" },
  { num: 6, title: "Growing Little Minds", id: "growing-minds", badge: "Chapter 06" },
  { num: 7, title: "Why Vannam", id: "why-us", badge: "Chapter 07" },
  { num: 8, title: "Meet Our Teachers", id: "teachers", badge: "Chapter 08" },
  { num: 9, title: "Little Moments", id: "gallery", badge: "Chapter 09" },
  { num: 10, title: "Parent Love", id: "testimonials", badge: "Chapter 10" },
  { num: 11, title: "Explore Vannam", id: "facilities", badge: "Chapter 11" },
  { num: 12, title: "Your Adventure Begins", id: "contact", badge: "Chapter 12" },
  { num: 13, title: "Storybook Ending", id: "footer", badge: "Chapter 13" },
];

/**
 * Main Storybook Container
 * Manages active page tracking without any 3D rotation or notebook page turns
 */
export function VannamStorybook({ children }) {
  const [activePage, setActivePage] = useState(1);
  const totalPages = STORYBOOK_CHAPTERS.length;

  const scrollToPage = (pageNum) => {
    const chapter = STORYBOOK_CHAPTERS.find(c => c.num === pageNum);
    if (chapter) {
      const el = document.getElementById(chapter.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <StorybookContext.Provider value={{ activePage, totalPages, setActivePage, scrollToPage }}>
      <div className="storybook-root w-full relative">
        {children}
      </div>
    </StorybookContext.Provider>
  );
}

/**
 * Individual Storybook Page
 * Completely flat, upright, and natural mobile scrolling.
 * No 3D rotation, no perspective tilting, no notebook effect.
 */
export function VannamStoryPage({
  pageNumber,
  children,
  className = "",
  id
}) {
  const { setActivePage } = useStorybook();
  const pageRef = useRef(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActivePage(pageNumber);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [pageNumber, setActivePage]);

  return (
    <div
      id={id}
      ref={pageRef}
      className={`storybook-page-wrapper w-full relative ${className}`}
    >
      <div className="storybook-page-content relative z-10">
        {children}
      </div>
    </div>
  );
}
