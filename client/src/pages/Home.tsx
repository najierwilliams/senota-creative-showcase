/*
 * SENOTA Creative Showcase — Main Page
 * Design: Contemporary Art Archive / Gallery Catalogue
 * Colors: White (#FFFFFF), Near-Black (#0D0D0D), Red (#CC0000), Gray (#F0EEE9)
 * Fonts: Cormorant Garamond (display), Syne (UI/names), Space Mono (tags/codes), DM Sans (body)
 */

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CATEGORIES,
  CREATIVES,
  getCreativesByCategory,
  type Creative,
  type CategoryKey,
} from "@/data/creatives";
import ProfileOverlay from "@/components/ProfileOverlay";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-showcase-hero-dLi8jXhwsXWkp5QuPnYQ3s.webp";

export default function Home() {
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const byCategory = getCreativesByCategory();

  // Filter creatives by search
  const filteredByCategory = Object.fromEntries(
    CATEGORIES.map((cat) => [
      cat.key,
      byCategory[cat.key].filter(
        (c) =>
          searchQuery === "" ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    ])
  ) as Record<CategoryKey, Creative[]>;

  // Intersection observer to track active category in nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CATEGORIES.forEach((cat) => {
      const el = sectionRefs.current[cat.key];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveCategory(cat.key);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close overlay on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCreative(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = selectedCreative ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedCreative]);

  const scrollToCategory = useCallback((key: CategoryKey) => {
    sectionRefs.current[key]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const totalCreatives = CREATIVES.length;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Syne', sans-serif" }}>
      {/* ── Top Nav Bar ───────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 bg-white border-b"
        style={{ borderColor: "#E8E6E1" }}
      >
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <span
              className="text-sm font-800 tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
            >
              SENOTA
            </span>
            <span
              className="hidden sm:block text-xs tracking-[0.15em] uppercase"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              Creative Showcase
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="text-xs"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              {totalCreatives} Creatives
            </span>
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs pl-3 pr-8 py-1.5 border bg-transparent outline-none focus:border-[#CC0000] transition-colors"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  borderColor: "#E8E6E1",
                  color: "#0D0D0D",
                  width: "160px",
                }}
              />
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3"
                style={{ color: "#8A8A8A" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "340px" }}>
        <img
          src={HERO_IMG}
          alt="SENOTA Creative Showcase"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, rgba(255,255,255,0.95) 100%)" }}
        />
        <div className="absolute bottom-8 left-0 right-0 container">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-1"
            style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
          >
            Archive Vol. I — 2026
          </p>
          <p
            className="text-sm max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#0D0D0D" }}
          >
            Every creative who has contributed to SENOTA's magazines, shows, events, and projects.
          </p>
        </div>
      </section>

      {/* ── Main Layout: Sticky Nav + Content ─────────────────────── */}
      <div className="container flex gap-0 lg:gap-12 pt-10 pb-24">
        {/* Sticky Category Navigator */}
        <aside
          className="hidden lg:block flex-shrink-0"
          style={{ width: "160px", position: "sticky", top: "80px", alignSelf: "flex-start" }}
        >
          <p
            className="text-xs tracking-[0.15em] uppercase mb-4"
            style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
          >
            Sections
          </p>
          <nav className="flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => scrollToCategory(cat.key)}
                className={`alpha-nav-item text-left ${activeCategory === cat.key ? "active" : ""}`}
              >
                <span className="mr-2" style={{ color: "#CC0000", opacity: 0.5 }}>
                  {cat.code}
                </span>
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Category count summary */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid #E8E6E1" }}>
            <p
              className="text-xs tracking-[0.1em] uppercase mb-3"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              By Section
            </p>
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex justify-between items-center mb-1.5">
                <span
                  className="text-xs"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                >
                  {cat.label}
                </span>
                <span
                  className="text-xs font-600"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#0D0D0D" }}
                >
                  {byCategory[cat.key].length}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Mobile category scroll nav */}
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => scrollToCategory(cat.key)}
                className="flex-shrink-0 text-xs px-3 py-1.5 border transition-colors"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  borderColor: activeCategory === cat.key ? "#CC0000" : "#E8E6E1",
                  color: activeCategory === cat.key ? "#CC0000" : "#8A8A8A",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category Sections */}
          {CATEGORIES.map((cat, catIdx) => {
            const creatives = filteredByCategory[cat.key];
            if (searchQuery && creatives.length === 0) return null;

            return (
              <section
                key={cat.key}
                ref={(el) => { sectionRefs.current[cat.key] = el; }}
                className="mb-16"
                style={{ scrollMarginTop: "80px" }}
              >
                {/* Folder Tab Header */}
                <div className="flex items-end gap-0 mb-0">
                  {/* Folder tab */}
                  <div
                    className="folder-tab flex items-center gap-3"
                    style={{
                      background: "#F0EEE9",
                      padding: "0.6rem 2rem 0.6rem 0",
                      clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 100%, 0 100%)",
                      minWidth: "220px",
                    }}
                  >
                    <span
                      className="text-xs tracking-[0.2em] uppercase ml-0"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                    >
                      {cat.code}
                    </span>
                    <span
                      className="text-base font-700 tracking-[0.12em] uppercase"
                      style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                    >
                      {cat.label}
                    </span>
                    <span
                      className="text-xs ml-auto pr-4"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                    >
                      {creatives.length}
                    </span>
                  </div>
                </div>

                {/* Folder body */}
                <div
                  className="border-t-2"
                  style={{ borderColor: "#0D0D0D" }}
                >
                  {/* Category description */}
                  <p
                    className="text-xs py-3 border-b"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#8A8A8A",
                      borderColor: "#E8E6E1",
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Creative list */}
                  {creatives.length === 0 ? (
                    <p
                      className="py-8 text-sm"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A" }}
                    >
                      No creatives in this section yet.
                    </p>
                  ) : (
                    creatives.map((creative, idx) => (
                      <div
                        key={creative.id}
                        className="creative-row fade-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                        onClick={() => setSelectedCreative(creative)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && setSelectedCreative(creative)}
                        aria-label={`View profile of ${creative.name}`}
                      >
                        <span className="creative-row-dot" />

                        {/* Name */}
                        <span
                          className="flex-1 text-base font-500 underline-draw"
                          style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                        >
                          {creative.name}
                        </span>

                        {/* Role */}
                        <span
                          className="hidden sm:block text-xs"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A", minWidth: "160px" }}
                        >
                          {creative.role}
                        </span>

                        {/* Location */}
                        <span
                          className="hidden md:block text-xs"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A", minWidth: "120px" }}
                        >
                          {creative.location}
                        </span>

                        {/* Since */}
                        <span
                          className="hidden lg:block text-xs"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000", minWidth: "40px", textAlign: "right" }}
                        >
                          {creative.since}
                        </span>

                        {/* Arrow */}
                        <svg
                          className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-150"
                          style={{ color: "#8A8A8A" }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </div>
                    ))
                  )}
                </div>
              </section>
            );
          })}

          {/* Empty search state */}
          {searchQuery &&
            CATEGORIES.every((cat) => filteredByCategory[cat.key].length === 0) && (
              <div className="py-24 text-center">
                <p
                  className="text-2xl mb-2"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#0D0D0D",
                    fontStyle: "italic",
                  }}
                >
                  No results for "{searchQuery}"
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A" }}
                >
                  Try a different name, role, or creative area.
                </p>
              </div>
            )}
        </main>
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer
        className="border-t py-8"
        style={{ borderColor: "#E8E6E1" }}
      >
        <div className="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span
              className="text-sm font-700 tracking-[0.25em] uppercase block mb-1"
              style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
            >
              SENOTA
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              Creative Showcase — Archive Vol. I
            </span>
          </div>
          <div className="flex gap-6">
            <span
              className="text-xs"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              © 2026 SENOTA LLC
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            >
              All Rights Reserved
            </span>
          </div>
        </div>
      </footer>

      {/* ── Profile Overlay ───────────────────────────────────────── */}
      <ProfileOverlay
        creative={selectedCreative}
        onClose={() => setSelectedCreative(null)}
      />
    </div>
  );
}
