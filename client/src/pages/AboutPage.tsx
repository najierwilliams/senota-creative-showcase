/**
 * SENOTA About Page
 * Design: Editorial magazine-spread feel. White background, large serif type,
 * full-bleed photo, timeline, values grid, and team section.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLocation } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-about-hero-6PS6dBHeppnmgKoQAaGHVk.webp";

const TIMELINE = [
  { year: "2025", event: "SENOTA concept developed — the idea of a creative collective turned media company." },
  { year: "Jan 2026", event: "SENOTA LLC officially formed. The foundation is laid." },
  { year: "Spring 2026", event: "Issue 01 — 'Origins' — enters production. The first creatives join the roster." },
  { year: "Summer 2026", event: "Website launches. Creative Showcase goes live. Community begins to form." },
  { year: "Fall 2026", event: "Issue 01 drops. SENOTA Academy and Advertising divisions launch." },
  { year: "2027 →", event: "Expansion. More issues. More cities. More creatives. More everything." },
];

const VALUES = [
  {
    title: "Authenticity",
    desc: "We don't manufacture culture — we reflect it. Every creative, every story, every image has to be real.",
  },
  {
    title: "Access",
    desc: "The industry has too many gatekeepers. SENOTA exists to open doors that have historically been closed.",
  },
  {
    title: "Excellence",
    desc: "We hold ourselves to the highest standard. If it doesn't feel right, we don't publish it.",
  },
  {
    title: "Community",
    desc: "We are nothing without the people who create with us. Every decision we make starts with the collective.",
  },
];

export default function AboutPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7", color: "#1A1A1A" }}>
      <SiteHeader />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative" style={{ minHeight: "80vh", overflow: "hidden" }}>
        <img
          src={HERO_IMG}
          alt="The SENOTA Collective"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #1A1A1A 0%, transparent 55%)",
          }}
        />
        <div
          className="relative z-10 container flex flex-col justify-end"
          style={{ minHeight: "80vh", paddingBottom: "5rem" }}
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
            Our Story
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 8.5vw, 120px)",
              fontWeight: 700,
              lineHeight: 0.92,
              color: "#F7F7F7",
              marginBottom: "28px",
            }}
          >
            We Are<br />SENOTA.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "rgba(247,247,247,0.7)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            A creative media company built from the ground up by people who believe that art, culture, and expression deserve a platform that actually understands them.
          </p>
        </div>
      </section>

      {/* ── Mission Statement ─────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "#1A1A1A",
          padding: "80px 0",
        }}
      >
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(24px, 3.5vw, 42px)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#F7F7F7",
              lineHeight: 1.5,
              marginBottom: "24px",
            }}
          >
            "SENOTA exists to give creatives the platform, the tools, the education, and the community they deserve — and to build a media company that actually looks like the world we live in."
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#CC0000",
            }}
          >
            — SENOTA Founder
          </p>
        </div>
      </section>

      {/* ── What We Are ───────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
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
              What We Are
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
              More than a magazine.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "#555",
                lineHeight: 1.8,
                marginBottom: "18px",
              }}
            >
              SENOTA started as a magazine — but it was always meant to be more. We are a full creative ecosystem: a publishing company, a modeling agency, an advertising studio, an online school, a branding house, and a community platform.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "#555",
                lineHeight: 1.8,
                marginBottom: "18px",
              }}
            >
              Every arm of SENOTA feeds the others. The magazine discovers talent. The agency represents them. The academy trains the next generation. The advertising studio connects brands to culture. And the community holds it all together.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "#555",
                lineHeight: 1.8,
              }}
            >
              We are based in the United States, formed in January 2026, and growing every day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #E5E7EB",
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#F0EDE8",
          padding: "80px 0",
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
            What We Stand For
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
            Our Values
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "0",
              borderTop: "1px solid #D5D0C8",
            }}
          >
            {VALUES.map((v) => (
              <div
                key={v.title}
                style={{
                  padding: "36px 28px",
                  borderRight: "1px solid #D5D0C8",
                  borderBottom: "1px solid #D5D0C8",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    marginBottom: "12px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: 1.7,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
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
          The Journey
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
          How We Got Here
        </h2>
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "8px",
              bottom: "8px",
              width: "1px",
              backgroundColor: "#E5E7EB",
            }}
          />
          <div style={{ paddingLeft: "32px", display: "flex", flexDirection: "column", gap: "0" }}>
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "24px",
                  paddingBottom: i < TIMELINE.length - 1 ? "36px" : "0",
                  position: "relative",
                }}
              >
                {/* dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-36px",
                    top: "6px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#CC0000",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#CC0000",
                    paddingTop: "2px",
                  }}
                >
                  {t.year}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    color: "#1A1A1A",
                    lineHeight: 1.5,
                  }}
                >
                  {t.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 600,
              color: "#1A1A1A",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Want to be part of the story?
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#777",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            Whether you're a creative looking to be featured, a brand looking to partner, or someone who just wants to be in the room — we want to hear from you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/submit")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F7F7F7",
                background: "#CC0000",
                border: "none",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
            >
              Submit Your Work
            </button>
            <button
              onClick={() => navigate("/contact")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1A1A1A",
                background: "none",
                border: "1px solid #1A1A1A",
                padding: "14px 32px",
                cursor: "pointer",
                transition: "background 200ms, color 200ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A1A1A"; (e.currentTarget as HTMLElement).style.color = "#F7F7F7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "#1A1A1A"; }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
