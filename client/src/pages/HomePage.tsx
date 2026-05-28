/*
 * SENOTA Homepage
 * The main landing page at "/"
 * Design: Hunger Magazine-style — editorial, clean, high-contrast
 * Under construction body between header and footer
 */

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />

      {/* ── Under Construction Body ───────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        {/* Decorative vertical line */}
        <div
          className="mb-8"
          style={{ width: "1px", height: "60px", backgroundColor: "#CC0000" }}
        />

        {/* Label */}
        <p
          className="mb-3"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#CC0000",
          }}
        >
          SENOTA Studios
        </p>

        {/* Main heading */}
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(48px, 9vw, 96px)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.0,
            letterSpacing: "0.02em",
          }}
        >
          Coming Soon
        </h1>

        {/* Italic subheading */}
        <p
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(18px, 3vw, 26px)",
            fontStyle: "italic",
            fontWeight: 400,
            color: "#555",
            letterSpacing: "0.04em",
          }}
        >
          Art. Culture. Expression.
        </p>

        {/* Body text */}
        <p
          className="text-center max-w-lg mb-10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#8A8A8A",
            lineHeight: 1.75,
          }}
        >
          The SENOTA homepage is under construction. We're building a world-class editorial
          experience — magazine, modeling, photography, music, and more. In the meantime, explore
          the Creative Showcase below.
        </p>

        {/* Decorative dash row */}
        <div className="flex items-center gap-3 mb-10">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 3 ? "32px" : "12px",
                height: "1px",
                backgroundColor: i === 3 ? "#CC0000" : "#D0D0D0",
              }}
            />
          ))}
        </div>

        {/* CTA: go to Creative Showcase */}
        <a
          href="/creatives"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1A1A1A",
            textDecoration: "none",
            borderBottom: "1px solid #1A1A1A",
            paddingBottom: "2px",
            transition: "color 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#CC0000";
            (e.currentTarget as HTMLElement).style.borderColor = "#CC0000";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#1A1A1A";
            (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
          }}
        >
          Explore the Creative Showcase →
        </a>
      </main>

      <SiteFooter />
    </div>
  );
}
