/*
 * SENOTA SiteFooter
 * Design: Hunger Magazine-style dark footer
 * - Background: #262626 (dark charcoal)
 * - 4 columns: Sections | Series | SENOTA | Community
 * - Newsletter email signup above columns
 * - Bottom bar: copyright + tagline
 * Fonts: Cormorant Garamond (headings), DM Sans (links/body)
 */

import { useState } from "react";
import { Link } from "wouter";

const FOOTER_COLS = [
  {
    heading: "Sections",
    links: [
      { label: "Magazine", href: "/magazine" },
      { label: "Fashion", href: "/fashion" },
      { label: "Music", href: "/music" },
      { label: "Photography", href: "/photography" },
      { label: "Art + Culture", href: "/art-culture" },
      { label: "Modeling", href: "/modeling" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Advertising", href: "/advertising" },
      { label: "Academy", href: "/academy" },
      { label: "Community", href: "/community" },
      { label: "Branding", href: "/branding" },
      { label: "Creative Showcase", href: "/creatives" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    heading: "SENOTA",
    links: [
      { label: "Issue 01", href: "/magazine" },
      { label: "About", href: "/about" },
      { label: "Archive", href: "/archive" },
      { label: "Submit Work", href: "/submit" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "TikTok", href: "https://tiktok.com" },
      { label: "X (Twitter)", href: "https://x.com" },
      { label: "YouTube", href: "https://youtube.com" },
    ],
  },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ backgroundColor: "#262626" }}>
      {/* Newsletter row */}
      <div
        className="px-6 md:px-10 py-8"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="text-center sm:text-left">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "20px",
                fontWeight: 600,
                color: "#F7F7F7",
                marginBottom: "4px",
              }}
            >
              Stay in the loop
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#8A8A8A",
              }}
            >
              Get SENOTA updates, issue drops, and creative spotlights.
            </p>
          </div>
          {subscribed ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#CC0000",
                letterSpacing: "0.05em",
                textAlign: "center",
              }}
            >
              You're on the list.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0 w-full sm:w-auto" style={{ maxWidth: "400px", margin: "0 auto" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2.5 outline-none bg-transparent"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#F7F7F7",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRight: "none",
                }}
              />
              <button
                type="submit"
                className="px-5 py-2.5 transition-colors"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "#CC0000",
                  color: "#F7F7F7",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#AA0000"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#CC0000"; }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="px-6 md:px-10 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#F7F7F7",
                  marginBottom: "16px",
                  letterSpacing: "0.04em",
                }}
              >
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#8A8A8A",
                          textDecoration: "none",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F7F7F7"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A8A8A"; }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#8A8A8A",
                          textDecoration: "none",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F7F7F7"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#8A8A8A"; }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 md:px-10 py-5 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: "#555",
          }}
        >
          © 2026 SENOTA Studios LLC. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "13px",
            fontStyle: "italic",
            color: "#555",
            letterSpacing: "0.04em",
          }}
        >
          Art. Culture. Expression.
        </p>
      </div>
    </footer>
  );
}
