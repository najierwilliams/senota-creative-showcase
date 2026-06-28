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
import { Search, BookOpen, X, Menu, UserCircle, Crown, Briefcase, LogOut, ChevronDown, ShieldAlert } from "lucide-react";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { getLoginUrl } from "@/const";

const COVER_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-issue-01-cover-FPHewCEVPfJ9k2ps7aYQuT.webp";

const NAV_LINKS = [
  { label: "Home", href: "/" },
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
  { label: "Creatives", href: "/creatives" },
  { label: "Vault", href: "/vault" },
  { label: "Vault Dashboard", href: "/vault/dashboard" },
  { label: "Beta", href: "/beta" },
];

interface SiteHeaderProps {
  onSearchOpen?: () => void;
}

function getDashboardPath(role?: string | null) {
  if (role === "circle") return "/dashboard/circle";
  if (role === "employee") return "/dashboard/employee";
  if (role === "admin") return "/dashboard/employee";
  return "/dashboard/customer";
}

export default function SiteHeader({ onSearchOpen }: SiteHeaderProps) {
  const [issueOpen, setIssueOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const issueRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();
  const { user, isAuthenticated, logout, supabaseUser } = useAuth();
  
  // Check role from our DB, fallback to Supabase user metadata if available
  const supabaseRole = (supabaseUser?.user_metadata as any)?.role?.toLowerCase();
  const isEmployee = isAuthenticated;
  const isCircle = isAuthenticated;

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

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    if (accountOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [accountOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu or mobile search open
  useEffect(() => {
    document.body.style.overflow = (mobileMenuOpen || mobileSearchOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen, mobileSearchOpen]);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen) setTimeout(() => mobileSearchRef.current?.focus(), 50);
  }, [mobileSearchOpen]);

  // Close overlays on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setIssueOpen(false);
        setSearchOpen(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    navigate(href);
  };

  const handleSignIn = () => {
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  const handleDashboard = () => {
    if (user) {
      navigate(getDashboardPath(user.role));
    } else {
      navigate("/account");
    }
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

              {/* Issue card — desktop: right-anchored dropdown; mobile: centered modal with dark overlay */}
              {issueOpen && (
                <>
                  {/* Dark backdrop — covers full page */}
                  <div
                    className="fixed inset-0 z-40"
                    style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
                    onClick={() => setIssueOpen(false)}
                  />

                  {/* Card — desktop: absolute dropdown; mobile: fixed centered modal */}
                  <div
                    className="issue-card-popup z-50"
                    style={{
                      backgroundColor: "#1A1A1A",
                      boxShadow: "0 12px 60px rgba(0,0,0,0.6)",
                    }}
                  >
                    {/* Close button — visible on mobile */}
                    <button
                      onClick={() => setIssueOpen(false)}
                      className="md:hidden absolute top-3 right-3 flex items-center justify-center w-7 h-7 transition-opacity hover:opacity-60"
                      style={{ zIndex: 1 }}
                      aria-label="Close"
                    >
                      <X size={16} strokeWidth={1.5} color="#A0A0A0" />
                    </button>

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
                </>
              )}
            </div>

            {/* Book icon — desktop only */}
            <button
              className="hidden md:flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-60"
              onClick={() => handleNavClick("/magazine")}
              aria-label="Magazine archive"
            >
              <BookOpen size={17} strokeWidth={1.5} color="#1A1A1A" />
            </button>

            {/* Account / Login button — desktop only; mobile users access via drawer */}
            <div ref={accountRef} className="relative hidden md:block">
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => setAccountOpen((v) => !v)}
                    className="flex items-center gap-1 px-2 py-1 transition-opacity hover:opacity-70"
                    aria-label="Account"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#1A1A1A",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {user.role === "circle" ? (
                      <Crown size={16} strokeWidth={1.5} style={{ color: "#CC0000" }} />
                    ) : user.role === "employee" || user.role === "admin" ? (
                      <Briefcase size={16} strokeWidth={1.5} />
                    ) : (
                      <UserCircle size={16} strokeWidth={1.5} />
                    )}
                    <span className="hidden sm:inline max-w-[80px] truncate">Dashboard</span>
                    <ChevronDown size={12} />
                  </button>

                  {accountOpen && (
                    <div
                      className="absolute right-0 top-full mt-1 z-50"
                      style={{
                        backgroundColor: "#1A1A1A",
                        minWidth: "180px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3" style={{ borderBottom: "1px solid #2A2A2A" }}>
                        <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "13px", fontWeight: 600, color: "#F7F7F7", marginBottom: "2px" }}>{user.name}</p>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#8A8A8A", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                          {user.role === "circle" ? "The Circle" : user.role === "employee" ? "Employee" : user.role === "admin" ? "Admin" : "Customer"}
                        </p>
                      </div>
                      {/* Profile link */}
                      <button
                        onClick={() => { setAccountOpen(false); navigate("/profile"); }}
                        className="w-full text-left px-4 py-3 transition-colors"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#D0D0D0",
                          letterSpacing: "0.06em",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderBottom: "1px solid #2A2A2A",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#2A2A2A"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                      >
                        My Profile
                      </button>
                      {/* Dashboard link */}
                      <button
                        onClick={() => { setAccountOpen(false); navigate(getDashboardPath(user.role)); }}
                        className="w-full text-left px-4 py-3 transition-colors"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#D0D0D0",
                          letterSpacing: "0.06em",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          borderBottom: "1px solid #2A2A2A",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#2A2A2A"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                      >
                        My Dashboard
                      </button>
                      {/* Sign out */}
                      <button
                        onClick={() => { setAccountOpen(false); logout(); }}
                        className="w-full text-left px-4 py-3 flex items-center gap-2 transition-colors"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#8A8A8A",
                          letterSpacing: "0.06em",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#2A2A2A"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                      >
                        <LogOut size={12} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-1.5 px-3 py-1 transition-opacity hover:opacity-70"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#1A1A1A",
                    border: "1px solid #1A1A1A",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <UserCircle size={14} strokeWidth={1.5} />
                  <span className="hidden sm:inline">{isAuthenticated ? "My Account" : "Sign In"}</span>
                </button>
              )}
            </div>

            {/* Search icon / input — desktop: inline expand; mobile: full-screen overlay */}
            {/* Desktop inline search */}
            {searchOpen ? (
              <div className="hidden md:flex items-center gap-1">
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
                onClick={() => {
                  // On mobile, open full-screen overlay; on desktop, inline expand
                  if (window.innerWidth < 768) {
                    setMobileSearchOpen(true);
                  } else {
                    setSearchOpen(true);
                  }
                }}
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

      {/* ── Slide-In Drawer Menu (mobile + desktop) ──────────────── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[99] transition-opacity duration-300"
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 left-0 z-[100] h-full flex flex-col"
        style={{
          width: "min(320px, 85vw)",
          backgroundColor: "#F7F7F7",
          boxShadow: "4px 0 40px rgba(0,0,0,0.18)",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 280ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between px-4"
            style={{ height: "49px", borderBottom: "1px solid #E5E7EB", flexShrink: 0 }}
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

            {/* Drawer Issue 01 card */}
            <div
              className="mt-8 overflow-hidden"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              <div className="flex items-stretch">
                {/* Text side */}
                <div className="flex-1 p-4 flex flex-col gap-2 min-w-0">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#CC0000",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
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
                      lineHeight: 1.15,
                    }}
                  >
                    Origins
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#A0A0A0",
                      lineHeight: 1.55,
                    }}
                  >
                    The debut issue of SENOTA Magazine — introducing the creatives, stories, and voices that define a new generation.
                  </p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <button
                      onClick={() => handleNavClick("/magazine")}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#F7F7F7",
                        border: "1px solid #F7F7F7",
                        background: "none",
                        cursor: "pointer",
                        padding: "6px 12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleNavClick("/magazine")}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#A0A0A0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "6px 0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Explore Issue
                    </button>
                  </div>
                </div>
                {/* Cover image — fixed width, full height of card */}
                <div style={{ width: "100px", flexShrink: 0, alignSelf: "stretch" }}>
                  <img
                    src={COVER_URL}
                    alt="SENOTA Issue 01"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Account / Login section */}
            <div className="mt-6 pt-6 flex flex-col gap-3" style={{ borderTop: "1px solid #E5E7EB" }}>
              {isAuthenticated && (
                <>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate("/employee-portal"); }}
                    className="flex items-center gap-2 w-full justify-center py-3"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#F7F7F7",
                      backgroundColor: "#CC0000",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <ShieldAlert size={15} />
                    Employee Portal
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate("/account"); }}
                    className="flex items-center gap-2 w-full justify-center py-3"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#F7F7F7",
                      backgroundColor: "#1A1A1A",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <UserCircle size={15} />
                    MY ACCOUNT
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <button
                  onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}
                  className="flex items-center gap-2 w-full justify-center py-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#F7F7F7",
                    backgroundColor: "#1A1A1A",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <UserCircle size={15} />
                  SIGN IN
                </button>
              )}
            </div>
          </div>
        </div>

      {/* ── Full-Screen Mobile Search Overlay ───────────────────── */}
      {mobileSearchOpen && (
        <div
          className="fixed inset-0 z-[110] flex flex-col"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          {/* Search header bar */}
          <div
            className="flex items-center gap-3 px-4"
            style={{ height: "49px", borderBottom: "1px solid #E5E7EB" }}
          >
            <Search size={18} strokeWidth={1.5} color="#8A8A8A" />
            <input
              ref={mobileSearchRef}
              type="text"
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && mobileSearchQuery.trim()) {
                  setMobileSearchOpen(false);
                  setMobileSearchQuery("");
                }
              }}
              placeholder="Search SENOTA..."
              className="flex-1 outline-none bg-transparent"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "16px", /* 16px prevents iOS zoom */
                color: "#1A1A1A",
              }}
            />
            <button
              onClick={() => { setMobileSearchOpen(false); setMobileSearchQuery(""); }}
              className="flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-60"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} color="#1A1A1A" />
            </button>
          </div>

          {/* Search suggestions / recent */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {mobileSearchQuery.trim() === "" ? (
              <div>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-5"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                >
                  Explore
                </p>
                <div className="flex flex-col gap-0">
                  {NAV_LINKS.map((link, i) => (
                    <button
                      key={link.href}
                      onClick={() => { setMobileSearchOpen(false); navigate(link.href); }}
                      className="flex items-center justify-between py-4 text-left transition-colors"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "22px",
                        fontWeight: 500,
                        color: "#1A1A1A",
                        borderBottom: i < NAV_LINKS.length - 1 ? "1px solid #E5E7EB" : "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#CC0000"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#1A1A1A"; }}
                    >
                      {link.label}
                      <span style={{ color: "#CC0000", fontSize: "18px" }}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p
                  className="text-xs tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#8A8A8A" }}
                >
                  Results for “{mobileSearchQuery}”
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  Search coming soon — visit the{" "}
                  <button
                    onClick={() => { setMobileSearchOpen(false); navigate("/creatives"); }}
                    style={{ color: "#CC0000", background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontStyle: "italic" }}
                  >
                    Creative Showcase
                  </button>
                  {" "}to browse all creatives.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
