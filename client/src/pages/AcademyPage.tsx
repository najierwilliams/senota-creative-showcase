/**
 * SENOTA Academy Page
 * Design: Warm cream/off-white background, dark type, red accents.
 * Aspirational educational feel — course tracks, mentorship, and enrollment CTA.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";
import { useLocation } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-academy-hero-NWoDKvsmJYe2sVvZ8dhJLa.webp";

const TRACKS = [
  {
    tag: "Photography",
    title: "Visual Storytelling",
    desc: "Master composition, lighting, and editorial direction. From shooting on film to post-production — learn to create images that tell stories.",
    duration: "8 Weeks",
    level: "All Levels",
  },
  {
    tag: "Writing",
    title: "Editorial & Journalism",
    desc: "Develop your voice as a writer. Pitch stories, conduct interviews, write profiles, and understand the editorial process from concept to publication.",
    duration: "6 Weeks",
    level: "Beginner–Intermediate",
  },
  {
    tag: "Modeling",
    title: "Portfolio Development",
    desc: "Build a professional modeling portfolio from scratch. Learn posing, working with photographers, understanding the industry, and self-presentation.",
    duration: "4 Weeks",
    level: "Beginner",
  },
  {
    tag: "Direction",
    title: "Creative Direction",
    desc: "Learn how to conceptualize, plan, and execute a creative shoot or campaign. Mood boarding, casting, styling, and directing a full production.",
    duration: "10 Weeks",
    level: "Intermediate–Advanced",
  },
  {
    tag: "Branding",
    title: "Personal Brand Strategy",
    desc: "Define your identity as a creative. Build your online presence, understand your audience, and position yourself in the market with clarity and confidence.",
    duration: "5 Weeks",
    level: "All Levels",
  },
  {
    tag: "Music",
    title: "Sound & Production",
    desc: "From beat-making to mixing and mastering — learn the technical and creative fundamentals of music production for the modern creative industry.",
    duration: "8 Weeks",
    level: "Beginner–Intermediate",
  },
];

const MENTORS = [
  { initials: "A.R.", name: "Asha Reeves", role: "Editorial Photographer", specialty: "Visual Storytelling" },
  { initials: "D.M.", name: "Darius Monroe", role: "Creative Director", specialty: "Campaign Strategy" },
  { initials: "L.C.", name: "Lena Cruz", role: "Fashion Writer", specialty: "Editorial & Journalism" },
  { initials: "T.W.", name: "Tobias Wright", role: "Music Producer", specialty: "Sound & Production" },
];

export default function AcademyPage() {
  const [, navigate] = useLocation();
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAF8F5", color: "#1A1A1A" }}>
      <SiteHeader />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative" style={{ minHeight: "70vh", overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="SENOTA Academy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "brightness(0.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.2) 100%)",
          }}
        />
        <div
          className="relative z-10 container flex flex-col justify-end"
          style={{ minHeight: "70vh", paddingBottom: "5rem" }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: "14px",
            }}
          >
            SENOTA Academy
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 8vw, 110px)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#FAF8F5",
              marginBottom: "24px",
            }}
          >
            Learn From<br />Those Who<br />Live It.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              color: "rgba(250,248,245,0.75)",
              maxWidth: "440px",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            SENOTA Academy is a creative education platform built by working professionals for aspiring creatives. No fluff — just real skills, real mentors, and a real community.
          </p>
          <button
            onClick={() => navigate("/academy/enroll")}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FAF8F5",
              background: "#CC0000",
              border: "none",
              padding: "14px 32px",
              cursor: "pointer",
              width: "fit-content",
              transition: "background 200ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
          >
            Apply for Early Access →
          </button>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────── */}
      <section
        className="container"
        style={{
          paddingTop: "72px",
          paddingBottom: "72px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: "12px",
            }}
          >
            Our Philosophy
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              color: "#1A1A1A",
              lineHeight: 1.1,
            }}
          >
            Education built for the creative economy.
          </h2>
        </div>
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#555",
              lineHeight: 1.8,
              marginBottom: "16px",
            }}
          >
            Traditional education wasn't designed for photographers, models, writers, directors, or musicians trying to build a career in today's creative industry. SENOTA Academy was.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#555",
              lineHeight: 1.8,
            }}
          >
            Every course is taught by a working creative — someone actively doing the work, not just teaching theory. You'll build a real portfolio, make real connections, and leave with real skills.
          </p>
        </div>
      </section>

      {/* ── Course Tracks ─────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #E5E2DC",
          paddingTop: "72px",
          paddingBottom: "72px",
          backgroundColor: "#F2EFE9",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: "12px",
            }}
          >
            Curriculum
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              color: "#1A1A1A",
              marginBottom: "48px",
              lineHeight: 1.1,
            }}
          >
            Course Tracks
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2px",
              backgroundColor: "#E5E2DC",
            }}
          >
            {TRACKS.map((track, i) => (
              <div
                key={track.title}
                onClick={() => setActiveTrack(activeTrack === i ? null : i)}
                style={{
                  backgroundColor: activeTrack === i ? "#1A1A1A" : "#FAF8F5",
                  padding: "32px 28px",
                  cursor: "pointer",
                  transition: "background 220ms",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#CC0000",
                    marginBottom: "8px",
                  }}
                >
                  {track.tag}
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    fontWeight: 600,
                    color: activeTrack === i ? "#FAF8F5" : "#1A1A1A",
                    marginBottom: "12px",
                    lineHeight: 1.2,
                    transition: "color 220ms",
                  }}
                >
                  {track.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: activeTrack === i ? "#A0A0A0" : "#777",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    transition: "color 220ms",
                  }}
                >
                  {track.desc}
                </p>
                <div className="flex gap-4">
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: activeTrack === i ? "#888" : "#999",
                    }}
                  >
                    {track.duration}
                  </span>
                  <span style={{ color: "#CC0000" }}>·</span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: activeTrack === i ? "#888" : "#999",
                    }}
                  >
                    {track.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mentors ───────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "72px", paddingBottom: "72px" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#CC0000",
            marginBottom: "12px",
          }}
        >
          Faculty
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 600,
            color: "#1A1A1A",
            marginBottom: "48px",
            lineHeight: 1.1,
          }}
        >
          Your Mentors
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          {MENTORS.map((m) => (
            <div key={m.name}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#1A1A1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#FAF8F5",
                    letterSpacing: "0.05em",
                  }}
                >
                  {m.initials}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                  marginBottom: "4px",
                }}
              >
                {m.name}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "#888",
                  marginBottom: "4px",
                }}
              >
                {m.role}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#CC0000",
                }}
              >
                {m.specialty}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enrollment CTA ────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "580px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: "16px",
            }}
          >
            Launching Soon
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              color: "#FAF8F5",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Be the first to enroll.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#888",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            SENOTA Academy is currently in development. Apply for early access and be notified when enrollment opens — early applicants receive priority placement and founding member pricing.
          </p>
          <button
            onClick={() => navigate("/academy/enroll")}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FAF8F5",
              background: "#CC0000",
              border: "none",
              padding: "14px 36px",
              cursor: "pointer",
              transition: "background 200ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
          >
            Apply for Early Access
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
