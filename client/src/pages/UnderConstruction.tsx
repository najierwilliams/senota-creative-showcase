/*
 * SENOTA Under Construction Page
 * Shown for all sections not yet built
 * Design: Editorial, matches SENOTA brand
 */

import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// Map route paths to display names
const SECTION_NAMES: Record<string, string> = {
  "/magazine": "Magazine",
  "/fashion": "Fashion",
  "/music": "Music",
  "/photography": "Photography",
  "/art-culture": "Art + Culture",
  "/modeling": "Modeling",
  "/advertising": "Advertising",
  "/academy": "Academy",
  "/community": "Community",
  "/branding": "Branding",
  "/events": "Events",
  "/about": "About",
  "/archive": "Archive",
  "/submit": "Submit Work",
  "/contact": "Contact",
  "/privacy": "Privacy Policy",
};

export default function UnderConstruction() {
  const [location] = useLocation();
  const sectionName = SECTION_NAMES[location] || "This Section";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24">
        {/* Decorative top line */}
        <div
          className="mb-8"
          style={{ width: "1px", height: "60px", backgroundColor: "#CC0000" }}
        />

        {/* Section label */}
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
          {sectionName}
        </p>

        {/* Main heading */}
        <h1
          className="text-center mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(42px, 8vw, 80px)",
            fontWeight: 700,
            color: "#1A1A1A",
            lineHeight: 1.05,
            letterSpacing: "0.02em",
          }}
        >
          Under Construction
        </h1>

        {/* Subtext */}
        <p
          className="text-center max-w-md mb-10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#8A8A8A",
            lineHeight: 1.7,
          }}
        >
          We're building something worth waiting for. The{" "}
          <span style={{ color: "#1A1A1A", fontWeight: 500 }}>{sectionName}</span> section of
          SENOTA is coming soon — check back for updates.
        </p>

        {/* Decorative grid of dashes */}
        <div
          className="flex items-center gap-3 mb-10"
          style={{ color: "#D0D0D0" }}
        >
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

        {/* Back to home */}
        <a
          href="/"
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
          ← Back to Creative Showcase
        </a>
      </main>

      <SiteFooter />
    </div>
  );
}
