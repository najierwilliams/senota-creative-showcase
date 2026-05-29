/**
 * SENOTA Advertising Page
 * Design: Bold agency aesthetic — near-black background, white type, SENOTA red accents.
 * Full-bleed hero with dramatic B&W photo, service cards, stats bar, client pitch CTA.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLocation } from "wouter";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663669938069/R2tmVQHg3mxoijLEDBNh7f/senota-advertising-hero-oYMhotgDezW98u7JwwEazh.webp";

const SERVICES = [
  {
    number: "01",
    title: "Campaign Strategy",
    desc: "From concept to execution — we build campaigns that cut through the noise and leave a mark on culture. Editorial direction, audience targeting, and narrative architecture.",
  },
  {
    number: "02",
    title: "Brand Partnerships",
    desc: "We connect brands with the right creatives, voices, and platforms. Whether it's a magazine feature, a social activation, or a full-scale collaboration — we make it authentic.",
  },
  {
    number: "03",
    title: "Content Production",
    desc: "Photography, video, editorial, and digital content produced in-house by the SENOTA creative collective. Every asset is crafted with intention.",
  },
  {
    number: "04",
    title: "Digital & Social",
    desc: "Paid media, organic strategy, influencer integration, and community-driven campaigns across Instagram, TikTok, YouTube, and beyond.",
  },
  {
    number: "05",
    title: "Event Activation",
    desc: "Pop-ups, launch events, editorial showcases, and experiential moments that bring your brand into the physical world and generate lasting impressions.",
  },
  {
    number: "06",
    title: "Print Advertising",
    desc: "Premium placement in SENOTA Magazine — reaching a curated audience of creatives, tastemakers, and culture-forward consumers across print and digital editions.",
  },
];

const STATS = [
  { value: "17+", label: "Creatives in Network" },
  { value: "6", label: "Cities Represented" },
  { value: "Est. 2026", label: "Founded" },
  { value: "Issue 01", label: "Now Available" },
];

export default function AdvertisingPage() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D0D0D", color: "#F7F7F7" }}>
      <SiteHeader />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "85vh", overflow: "hidden" }}
      >
        <img
          src={HERO_IMG}
          alt="SENOTA Advertising"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            filter: "brightness(0.45)",
          }}
        />
        {/* gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0D0D0D 0%, transparent 60%)",
          }}
        />
        <div
          className="relative z-10 container"
          style={{ paddingBottom: "5rem" }}
        >
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
            SENOTA Studios — Advertising
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(52px, 9vw, 130px)",
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
              color: "#F7F7F7",
              marginBottom: "28px",
            }}
          >
            We Build<br />Brands That<br />Move Culture.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(14px, 1.6vw, 18px)",
              color: "#B0B0B0",
              maxWidth: "480px",
              lineHeight: 1.7,
              marginBottom: "36px",
            }}
          >
            SENOTA's advertising arm connects forward-thinking brands with a
            collective of creatives, storytellers, and cultural tastemakers.
            We don't just place ads — we create moments.
          </p>
          <button
            onClick={() => navigate("/contact")}
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
            Start a Conversation →
          </button>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "32px 24px",
                borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#CC0000",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────── */}
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
          What We Offer
        </p>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 600,
            color: "#F7F7F7",
            marginBottom: "56px",
            lineHeight: 1.1,
          }}
        >
          Our Services
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.number}
              style={{
                padding: "36px 32px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderRight: (i % 2 === 0) ? "1px solid rgba(255,255,255,0.08)" : "none",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(204,0,0,0.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  color: "#CC0000",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                {s.number}
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 600,
                  color: "#F7F7F7",
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "#888",
                  lineHeight: 1.7,
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "640px", margin: "0 auto" }}>
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
            Let's Work Together
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 600,
              color: "#F7F7F7",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Ready to make something that matters?
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
            Tell us about your brand, your goals, and your vision. We'll handle the rest.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/contact")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F7F7F7",
                background: "#CC0000",
                border: "none",
                padding: "14px 36px",
                cursor: "pointer",
                transition: "background 200ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
            >
              Get in Touch
            </button>
            <button
              onClick={() => navigate("/magazine")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#F7F7F7",
                background: "none",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "14px 36px",
                cursor: "pointer",
                transition: "border-color 200ms",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#F7F7F7"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
            >
              View Magazine
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
