/**
 * SENOTA Community Page
 * Design: Dark editorial with warm amber accents — underground creative culture
 * - Full-bleed moody hero with overlay text
 * - Social platform links (Instagram, TikTok, X, YouTube)
 * - "The Circle" member spotlight grid
 * - Upcoming events / gatherings feed
 * - Newsletter / join CTA
 * Fonts: Cormorant Garamond (display), DM Sans (body), Space Mono (labels)
 */

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useState } from "react";
import { Instagram, Youtube, Twitter, ArrowRight, MapPin, Calendar, Users } from "lucide-react";

const HERO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-community-hero-A6kM8FVmZQymvJbGKgdb8S.webp";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@senotastudios",
    url: "https://instagram.com/senotastudios",
    icon: Instagram,
    description: "Behind-the-scenes, editorials, and creative spotlights",
    count: "Follow",
    color: "#E1306C",
  },
  {
    name: "TikTok",
    handle: "@senotastudios",
    url: "https://tiktok.com/@senotastudios",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
    description: "Short-form creative content, process videos, and culture",
    count: "Follow",
    color: "#010101",
  },
  {
    name: "X (Twitter)",
    handle: "@senotastudios",
    url: "https://x.com/senotastudios",
    icon: Twitter,
    description: "Industry commentary, announcements, and conversation",
    count: "Follow",
    color: "#1DA1F2",
  },
  {
    name: "YouTube",
    handle: "SENOTA Studios",
    url: "https://youtube.com/@senotastudios",
    icon: Youtube,
    description: "Mini-documentaries, issue recaps, and creative interviews",
    count: "Subscribe",
    color: "#FF0000",
  },
];

const MEMBERS = [
  {
    name: "Amara Cole",
    role: "Brand Strategist",
    city: "Atlanta, GA",
    since: "2026",
    img: `https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80`,
    tag: "Branding",
  },
  {
    name: "Imani Cross",
    role: "Photographer",
    city: "Atlanta, GA",
    since: "2026",
    img: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80`,
    tag: "Photography",
  },
  {
    name: "Kai Morrison",
    role: "Music Producer",
    city: "Atlanta, GA",
    since: "2026",
    img: `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80`,
    tag: "Sound",
  },
  {
    name: "Nina Obi",
    role: "Motion Designer",
    city: "Los Angeles, CA",
    since: "2026",
    img: `https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80`,
    tag: "Visuals",
  },
  {
    name: "Darius Stone",
    role: "Film Director",
    city: "Chicago, IL",
    since: "2026",
    img: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80`,
    tag: "Direction",
  },
  {
    name: "Priya Sen",
    role: "Poet & Essayist",
    city: "New York, NY",
    since: "2026",
    img: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80`,
    tag: "Writing",
  },
];

const EVENTS = [
  {
    title: "SENOTA Vol. I — Launch Gathering",
    date: "TBD — Summer 2026",
    location: "Atlanta, GA",
    type: "Launch Event",
    description:
      "The official debut of SENOTA Issue 01. An intimate evening of art, music, and conversation with the creatives behind the first volume.",
    status: "upcoming",
  },
  {
    title: "Open Portfolio Review",
    date: "TBD — Fall 2026",
    location: "Virtual + In-Person",
    type: "Workshop",
    description:
      "Submit your work for a live review session with SENOTA editors and creative directors. Open to photographers, writers, models, and visual artists.",
    status: "upcoming",
  },
  {
    title: "SENOTA x Community Showcase",
    date: "TBD — 2026",
    location: "To Be Announced",
    type: "Exhibition",
    description:
      "A curated group exhibition featuring work from SENOTA's growing community of creatives. Submissions open to all members.",
    status: "upcoming",
  },
];

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D0D0D", color: "#F7F7F7" }}>
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(480px, 70vh, 720px)" }}>
        <img
          src={HERO_URL}
          alt="SENOTA Community"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, rgba(13,13,13,0.1) 40%, rgba(13,13,13,0.85) 100%)",
          }}
        />
        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 md:pb-14">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#CC0000",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            SENOTA — Community
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(42px, 7vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#F7F7F7",
              letterSpacing: "-0.01em",
            }}
          >
            The Circle
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 1.8vw, 17px)",
              color: "rgba(247,247,247,0.7)",
              marginTop: "14px",
              maxWidth: "520px",
              lineHeight: 1.6,
            }}
          >
            A growing network of artists, photographers, writers, musicians, and makers united by
            one thing — the drive to create something that matters.
          </p>
        </div>
      </section>

      {/* ── Stat Bar ─────────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid rgba(247,247,247,0.1)",
          borderTop: "1px solid rgba(247,247,247,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 grid grid-cols-3 gap-4">
          {[
            { icon: Users, label: "Creatives", value: "17+" },
            { icon: MapPin, label: "Cities", value: "6" },
            { icon: Calendar, label: "Est.", value: "2026" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <Icon size={16} color="#CC0000" strokeWidth={1.5} />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 700,
                  color: "#F7F7F7",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  color: "rgba(247,247,247,0.4)",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Social Platforms ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="mb-10">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#CC0000",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Find Us
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "#F7F7F7",
              lineHeight: 1.1,
            }}
          >
            Join the Conversation
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIAL_LINKS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-5 transition-all"
                style={{
                  border: "1px solid rgba(247,247,247,0.1)",
                  backgroundColor: "rgba(247,247,247,0.03)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(247,247,247,0.07)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,247,247,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(247,247,247,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,247,247,0.1)";
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ backgroundColor: "rgba(247,247,247,0.08)", color: "#F7F7F7" }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#F7F7F7",
                      }}
                    >
                      {s.name}
                    </p>
                    <span
                      className="flex-shrink-0 flex items-center gap-1 transition-all group-hover:gap-2"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.12em",
                        color: "#CC0000",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.count}
                      <ArrowRight size={10} />
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      color: "rgba(247,247,247,0.4)",
                      marginTop: "2px",
                      marginBottom: "6px",
                    }}
                  >
                    {s.handle}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(247,247,247,0.55)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── The Circle — Member Spotlight ────────────────────────────── */}
      <section
        style={{ borderTop: "1px solid rgba(247,247,247,0.1)" }}
        className="py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "#CC0000",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Members
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#F7F7F7",
                  lineHeight: 1.1,
                }}
              >
                Featured Creatives
              </h2>
            </div>
            <a
              href="/creatives"
              className="flex-shrink-0 flex items-center gap-1.5 transition-opacity hover:opacity-70"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "#CC0000",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              View All
              <ArrowRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {MEMBERS.map((m) => (
              <a
                key={m.name}
                href="/creatives"
                className="group block"
                style={{ textDecoration: "none" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 50%, rgba(13,13,13,0.9) 100%)",
                    }}
                  />
                  {/* Tag */}
                  <div
                    className="absolute top-3 left-3"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.14em",
                      color: "#F7F7F7",
                      backgroundColor: "#CC0000",
                      padding: "3px 7px",
                      textTransform: "uppercase",
                    }}
                  >
                    {m.tag}
                  </div>
                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#F7F7F7",
                        lineHeight: 1.1,
                      }}
                    >
                      {m.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "rgba(247,247,247,0.6)",
                        marginTop: "2px",
                      }}
                    >
                      {m.role} — {m.city}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ───────────────────────────────────────────────────── */}
      <section
        style={{ borderTop: "1px solid rgba(247,247,247,0.1)" }}
        className="py-16 md:py-20"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="mb-10">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#CC0000",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Gatherings
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: "#F7F7F7",
                lineHeight: 1.1,
              }}
            >
              Upcoming Events
            </h2>
          </div>

          <div className="flex flex-col gap-0">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.title}
                className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-7 transition-colors cursor-pointer"
                style={{
                  borderTop: i === 0 ? "1px solid rgba(247,247,247,0.12)" : "none",
                  borderBottom: "1px solid rgba(247,247,247,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(247,247,247,0.03)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {/* Date + type */}
                <div className="flex-shrink-0 md:w-48">
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      color: "#CC0000",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {ev.type}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(247,247,247,0.5)",
                    }}
                  >
                    {ev.date}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} color="rgba(247,247,247,0.4)" />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "rgba(247,247,247,0.4)",
                      }}
                    >
                      {ev.location}
                    </p>
                  </div>
                </div>
                {/* Title + desc */}
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      fontWeight: 700,
                      color: "#F7F7F7",
                      lineHeight: 1.15,
                      marginBottom: "8px",
                    }}
                  >
                    {ev.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(247,247,247,0.55)",
                      lineHeight: 1.6,
                    }}
                  >
                    {ev.description}
                  </p>
                </div>
                {/* Arrow */}
                <div className="flex-shrink-0 flex items-center">
                  <ArrowRight
                    size={18}
                    color="rgba(247,247,247,0.25)"
                    className="transition-all group-hover:translate-x-1 group-hover:text-white"
                    style={{ transition: "transform 200ms ease, color 200ms ease" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ─────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{
          borderTop: "1px solid rgba(247,247,247,0.1)",
          background: "linear-gradient(135deg, #0D0D0D 0%, #1a0a0a 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 md:px-12 text-center">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.18em",
              color: "#CC0000",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Become Part of It
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 700,
              color: "#F7F7F7",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            You Belong Here
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "rgba(247,247,247,0.55)",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            SENOTA is built by creatives, for creatives. Whether you shoot, write, design, perform,
            or produce — there's a place for you in The Circle. Drop your email and we'll reach out
            when we're ready to grow.
          </p>

          {submitted ? (
            <div
              className="inline-flex items-center gap-2 px-6 py-3"
              style={{
                border: "1px solid rgba(204,0,0,0.4)",
                backgroundColor: "rgba(204,0,0,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "#CC0000",
                  letterSpacing: "0.04em",
                }}
              >
                You're in. We'll be in touch.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 outline-none"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  backgroundColor: "rgba(247,247,247,0.06)",
                  border: "1px solid rgba(247,247,247,0.15)",
                  borderRight: "none",
                  color: "#F7F7F7",
                }}
                onFocus={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(204,0,0,0.5)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(247,247,247,0.15)";
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  backgroundColor: "#CC0000",
                  color: "#F7F7F7",
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Join
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
