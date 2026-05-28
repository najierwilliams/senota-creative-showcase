/*
 * SENOTA Creative Showcase — Profile Overlay Component
 * Design: Contemporary Art Archive / Gallery Catalogue
 * Slides 4–6 inspiration: portrait panel, stats/bio panel, credits/social panel
 * Opens from bottom (translateY 100%→0, 350ms ease-out-snappy)
 */

import { useEffect, useState } from "react";
import type { Creative } from "@/data/creatives";
import { getCategoryInfo } from "@/data/creatives";

type Props = {
  creative: Creative | null;
  onClose: () => void;
};

export default function ProfileOverlay({ creative, onClose }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // Animate in/out
  useEffect(() => {
    if (creative) {
      setActiveSlide(0);
      // Small delay to allow DOM paint before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsOpen(true));
      });
    } else {
      setIsOpen(false);
    }
  }, [creative]);

  if (!creative && !isOpen) return null;

  const cat = creative ? getCategoryInfo(creative.category) : null;

  const slides = [
    { label: "Profile", code: "01" },
    { label: "Work", code: "02" },
    { label: "Credits", code: "03" },
  ];

  return (
    <div
      className={`profile-overlay ${isOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={creative ? `Profile of ${creative.name}` : "Creative profile"}
    >
      {/* ── Overlay Header ─────────────────────────────────────── */}
      <div
        className="sticky top-0 z-10 bg-white border-b flex items-center justify-between px-6 h-14"
        style={{ borderColor: "#E8E6E1" }}
      >
        <div className="flex items-center gap-4">
          <span
            className="text-sm font-700 tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
          >
            SENOTA
          </span>
          {cat && (
            <>
              <span style={{ color: "#E8E6E1" }}>—</span>
              <span
                className="text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
              >
                {cat.code} / {cat.label}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {/* Slide tabs */}
          <div className="hidden sm:flex items-center gap-1">
            {slides.map((slide, i) => (
              <button
                key={slide.code}
                onClick={() => setActiveSlide(i)}
                className="text-xs px-3 py-1 transition-colors"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  color: activeSlide === i ? "#CC0000" : "#8A8A8A",
                  borderBottom: activeSlide === i ? "1px solid #CC0000" : "1px solid transparent",
                }}
              >
                {slide.code} {slide.label}
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs transition-colors hover:text-[#CC0000]"
            style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
            aria-label="Close profile"
          >
            <span>ESC</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile slide tabs */}
      <div className="sm:hidden flex border-b" style={{ borderColor: "#E8E6E1" }}>
        {slides.map((slide, i) => (
          <button
            key={slide.code}
            onClick={() => setActiveSlide(i)}
            className="flex-1 text-xs py-2.5 transition-colors"
            style={{
              fontFamily: "'Space Mono', monospace",
              color: activeSlide === i ? "#CC0000" : "#8A8A8A",
              borderBottom: activeSlide === i ? "2px solid #CC0000" : "2px solid transparent",
            }}
          >
            {slide.code} {slide.label}
          </button>
        ))}
      </div>

      {creative && (
        <div className="container py-10 max-w-6xl">
          {/* ── SLIDE 1: Profile ─────────────────────────────────── */}
          {activeSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 fade-up">
              {/* Left: Portrait */}
              <div className="relative mb-8 lg:mb-0">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4", maxHeight: "600px" }}
                >
                  <img
                    src={creative.image}
                    alt={creative.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Red accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ background: "#CC0000" }}
                  />
                </div>
                {/* Caption below image */}
                <p
                  className="mt-3 text-xs"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                >
                  {creative.name} — {creative.role} — {creative.location}
                </p>
              </div>

              {/* Right: Bio & Info */}
              <div className="flex flex-col justify-between">
                {/* Name block */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p
                        className="text-xs tracking-[0.2em] uppercase mb-2"
                        style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                      >
                        {cat?.code} — {cat?.label}
                      </p>
                      <h1
                        className="text-4xl lg:text-5xl font-400 leading-none mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0D0D" }}
                      >
                        {creative.name.split(" ")[0]}
                      </h1>
                      <h2
                        className="text-4xl lg:text-5xl font-600 leading-none"
                        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0D0D" }}
                      >
                        {creative.name.split(" ").slice(1).join(" ")}
                      </h2>
                    </div>
                    <span
                      className="text-xs mt-1"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                    >
                      {creative.since}
                    </span>
                  </div>

                  <p
                    className="text-sm font-400 mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A" }}
                  >
                    {creative.role} — {creative.location}
                  </p>

                  {/* Divider */}
                  <div className="h-px mb-6" style={{ background: "#E8E6E1" }} />

                  {/* Quote */}
                  <blockquote
                    className="text-xl lg:text-2xl font-400 italic leading-relaxed mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0D0D" }}
                  >
                    "{creative.quote}"
                  </blockquote>

                  {/* Divider */}
                  <div className="h-px mb-6" style={{ background: "#E8E6E1" }} />

                  {/* Bio */}
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#3A3A3A" }}
                  >
                    {creative.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {creative.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links */}
                <div>
                  <div className="h-px mb-4" style={{ background: "#E8E6E1" }} />
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-3"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    Connect
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {creative.social.map((s) => (
                      <div key={s.platform} className="flex flex-col">
                        <span
                          className="text-xs"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                        >
                          {s.platform}
                        </span>
                        <span
                          className="text-sm font-500"
                          style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                        >
                          {s.handle}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SLIDE 2: Work / Stats ─────────────────────────────── */}
          {activeSlide === 1 && (
            <div className="fade-up">
              {/* Name header */}
              <div className="mb-10 pb-6 border-b" style={{ borderColor: "#E8E6E1" }}>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                >
                  {cat?.code} — {cat?.label}
                </p>
                <h1
                  className="text-3xl font-600"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0D0D" }}
                >
                  {creative.name}
                </h1>
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A" }}
                >
                  {creative.role}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Stats column */}
                <div>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-6"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    At a Glance
                  </p>
                  <div className="space-y-6">
                    {[
                      { label: "Creative Area", value: cat?.label || "" },
                      { label: "Based In", value: creative.location },
                      { label: "With SENOTA Since", value: creative.since },
                      { label: "Specialties", value: creative.tags.join(", ") },
                    ].map((item) => (
                      <div key={item.label} className="pb-4 border-b" style={{ borderColor: "#E8E6E1" }}>
                        <p
                          className="text-xs mb-1"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                        >
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-500"
                          style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio + quote column */}
                <div className="lg:col-span-2">
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-6"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    In Their Words
                  </p>
                  <blockquote
                    className="text-2xl lg:text-3xl font-400 italic leading-relaxed mb-8"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "#0D0D0D",
                      borderLeft: "3px solid #CC0000",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    "{creative.quote}"
                  </blockquote>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#3A3A3A" }}
                  >
                    {creative.bio}
                  </p>

                  {/* Image strip */}
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {[creative.image, creative.image, creative.image].map((src, i) => (
                      <div
                        key={i}
                        className="overflow-hidden"
                        style={{ aspectRatio: "3/4", filter: i > 0 ? "grayscale(60%)" : "none", opacity: i > 0 ? 0.7 : 1 }}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover object-top" />
                      </div>
                    ))}
                  </div>
                  <p
                    className="mt-2 text-xs"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    [Replace with actual work samples]
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── SLIDE 3: Credits & Contact ────────────────────────── */}
          {activeSlide === 2 && (
            <div className="fade-up">
              {/* Name header */}
              <div className="mb-10 pb-6 border-b" style={{ borderColor: "#E8E6E1" }}>
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                >
                  {cat?.code} — {cat?.label}
                </p>
                <h1
                  className="text-3xl font-600"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0D0D" }}
                >
                  {creative.name}
                </h1>
                <p
                  className="text-sm mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#8A8A8A" }}
                >
                  {creative.role}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Credits */}
                <div>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-6"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    Selected Credits
                  </p>
                  <div className="space-y-0">
                    {creative.credits.map((credit, i) => (
                      <div
                        key={i}
                        className="py-4 border-b"
                        style={{ borderColor: "#E8E6E1" }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p
                              className="text-sm font-500 mb-1"
                              style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                            >
                              {credit.title}
                            </p>
                            <p
                              className="text-xs"
                              style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                            >
                              {credit.type}
                            </p>
                          </div>
                          <span
                            className="text-xs flex-shrink-0"
                            style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
                          >
                            {credit.year}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Social */}
                <div>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-6"
                    style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                  >
                    Connect & Contact
                  </p>

                  <div className="space-y-4 mb-10">
                    {creative.social.map((s) => (
                      <div
                        key={s.platform}
                        className="flex items-center justify-between py-3 border-b"
                        style={{ borderColor: "#E8E6E1" }}
                      >
                        <span
                          className="text-xs"
                          style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                        >
                          {s.platform}
                        </span>
                        <span
                          className="text-sm font-500"
                          style={{ fontFamily: "'Syne', sans-serif", color: "#0D0D0D" }}
                        >
                          {s.handle}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Booking CTA */}
                  <div
                    className="p-6"
                    style={{ background: "#F0EEE9" }}
                  >
                    <p
                      className="text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                    >
                      Bookings & Inquiries
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "#3A3A3A" }}
                    >
                      To book {creative.name.split(" ")[0]} for a project, collaboration, or event, reach out through SENOTA's booking portal.
                    </p>
                    <button
                      className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-colors"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        background: "#0D0D0D",
                        color: "#FFFFFF",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#CC0000";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#0D0D0D";
                      }}
                      onClick={() => alert("Booking portal — coming soon.")}
                    >
                      Inquire
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="mt-8">
                    <p
                      className="text-xs tracking-[0.15em] uppercase mb-3"
                      style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                    >
                      Specialties
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {creative.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
