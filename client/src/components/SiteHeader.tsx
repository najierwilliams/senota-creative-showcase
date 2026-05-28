/*
 * SENOTA SiteHeader
 * Design: Hunger Magazine-style header
 * - Off-white bg (#F7F7F7), 49px sticky bar, 1px border-bottom
 * - Row 1: [hamburger] [SENOTA logo centered] [Issue 01] [book icon] [search icon]
 * - Row 2 (desktop): nav links centered — FASHION | MUSIC | BEAUTY | ART + CULTURE | SOCIETY | ...
 * - Issue 01 hover card: dark panel, cover image, description, Buy Now + Explore buttons
 * - Mobile: hamburger opens full-screen menu with same nav + issue card
 * Fonts: Cormorant Garamond (logo/issue), DM Sans (nav/body), Space Mono (tags)
 */

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, BookOpen, X, Menu } from "lucide-react";

const COVER_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-issue-01-cover-FPHewCEVPfJ9k2ps7aYQuT.webp";

const NAV_LINKS = [
  { label: "Magazine", href: "/magazine" },
  { label: "Fashion", href: "/fashion" },
  { label: "Music", href: "/music" },
  { label: "Photography", href: "/photography" },
  { label: "Art + Culture", href: "/art-culture" },
  { label: "Modeling", href: "/modeling" },
  { label: "Advertising", href: "/advertising" },
  { label: "Academy", href: "/academy" },
  { label: "Community", href: "/community" },
  { label: "Branding", href: "/branding" },
  { label: "Creatives", href: "/" },
];

interface SiteHeaderProps {
  onSearchOpen?: () => void;
}

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const issueRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  // Close issue card when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (issueRef.current && !issueRef.current.contains(e.target as Node)) {
        setIssueOpen(false);
      }
    };
    if (issueOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [issueOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close mobile menu on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setIssueOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* ── Sticky Header Bar ─────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "#F7F7F7",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {/* Row 1: hamburger | logo | issue + icons */}
        <div
          className="relative flex items-center justify-between px-4 md:px-6"
          style={{ height: "49px" }}
        >
          {/* Left: Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-60"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} color="#1A1A1A" />
          </button>

          {/* Center: SENOTA Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "26px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#1A1A1A",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              SENOTA
            </span>
          </Link>

          {/* Right: Issue 01 + book + search */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Issue 01 button */}
            <div ref={issueRef} className="relative">
              <button
                onClick={() => setIssueOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2 py-1 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "#1A1A1A",
                  letterSpacing: "0.02em",
                }}
              >
                <span className="hidden sm:inline">Issue 01</span>
                <span className="sm:hidden text-xs" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Issue 01</span>
              </button>

              {/* Issue hover card */}
              {issueOpen && (
                <div
                  className="absolute right-0 top-full mt-1 z-50"
                  style={{
                    width: "min(420px, 92vw)",
                    backgroundColor: "#1A1A1A",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="flex gap-0">
                    {/* Text panel */}
                    <div className="flex-1 p-5 flex flex-col gap-3">
                      <div>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#CC0000",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: "2px",
                          }}
                        >
                          Issue 01
                        </p>
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#F7F7F7",
                            lineHeight: 1.2,
                          }}
                        >
                          Origins
                        </p>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#A0A0A0",
                          lineHeight: 1.6,
                        }}
                      >
                        The debut issue of SENOTA Magazine — introducing the creatives, stories, and
                        voices that define a new generation of art, culture, and expression.
                      </p>
                      <div className="flex flex-col gap-2 mt-1">
                        <a
                          href="/magazine"
                          onClick={(e) => { e.preventDefault(); handleNavClick("/magazine"); }}
                          className="block text-center py-2 transition-colors"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            color: "#F7F7F7",
                            border: "1px solid #F7F7F7",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "#F7F7F7";
                            (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                            (e.currentTarget as HTMLElement).style.color = "#F7F7F7";
                          }}
                        >
                          Buy Now
                        </a>
                        <a
                          href="/magazine"
                          onClick={(e) => { e.preventDefault(); handleNavClick("/magazine"); }}
                          className="block text-center py-2 transition-colors"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            color: "#A0A0A0",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#F7F7F7";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#A0A0A0";
                          }}
                        >
                          Explore Issue
                        </a>
                      </div>
                    </div>

                    {/* Cover image */}
                    <div
                      className="flex-shrink-0"
                      style={{ width: "130px" }}
                    >
                      <img
                        src={COVER_URL}
                        alt="SENOTA Issue 01 — Origins"
                        className="w-full h-full object-cover"
                        style={{ display: "block" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Book icon */}
            <button
              className="flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-60"
              onClick={() => handleNavClick("/magazine")}
              aria-label="Magazine archive"
            >
              <BookOpen size={17} strokeWidth={1.5} color="#1A1A1A" />
            </button>

            {/* Search icon / input */}
            {searchOpen ? (
              <div className="flex items-center gap-1">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }
                  }}
                  placeholder="Search SENOTA..."
                  className="outline-none bg-transparent border-b text-sm"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#1A1A1A",
                    borderColor: "#1A1A1A",
                    width: "160px",
                    paddingBottom: "2px",
                  }}
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="flex items-center justify-center w-6 h-6 transition-opacity hover:opacity-60"
                >
                  <X size={14} color="#1A1A1A" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-60"
                aria-label="Search"
              >
                <Search size={17} strokeWidth={1.5} color="#1A1A1A" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Desktop nav links */}
        <nav
          className="hidden md:flex items-center justify-center gap-6 px-6"
          style={{
            height: "38px",
            borderTop: "1px solid #E5E7EB",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#1A1A1A",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#CC0000"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1A1A"; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Full-Screen Mobile Menu ────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          {/* Mobile menu header */}
          <div
            className="flex items-center justify-between px-4"
            style={{ height: "49px", borderBottom: "1px solid #E5E7EB" }}
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#1A1A1A",
                  textTransform: "uppercase",
                }}
              >
                SENOTA
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-8 h-8"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} color="#1A1A1A" />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            <nav className="flex flex-col gap-0">
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-4 transition-colors"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    letterSpacing: "0.04em",
                    borderBottom: i < NAV_LINKS.length - 1 ? "1px solid #E5E7EB" : "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#CC0000"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1A1A"; }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile Issue 01 card */}
            <div
              className="mt-8 p-5 flex gap-4"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#CC0000",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}
                >
                  Issue 01
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    marginBottom: "8px",
                    lineHeight: 1.2,
                  }}
                >
                  Origins
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    color: "#A0A0A0",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                  }}
                >
                  The debut issue of SENOTA Magazine — introducing the creatives, stories, and voices
                  that define a new generation.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleNavClick("/magazine")}
                    className="px-4 py-2 text-xs transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#F7F7F7",
                      border: "1px solid #F7F7F7",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleNavClick("/magazine")}
                    className="px-4 py-2 text-xs transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#A0A0A0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Explore Issue
                  </button>
                </div>
              </div>
              <div style={{ width: "90px", flexShrink: 0 }}>
                <img
                  src={COVER_URL}
                  alt="SENOTA Issue 01"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
