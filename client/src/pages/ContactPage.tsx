/**
 * SENOTA Contact Page
 * Design: Clean, minimal white layout. Left column contact info + department cards.
 * Right column: full contact form. Red accent on submit button.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";
import { toast } from "sonner";

const DEPARTMENTS = [
  { label: "General Inquiries", email: "hello@senotastudios.com" },
  { label: "Advertising & Partnerships", email: "advertising@senotastudios.com" },
  { label: "Creative Submissions", email: "submissions@senotastudios.com" },
  { label: "Press & Media", email: "press@senotastudios.com" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", department: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon.");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#1A1A1A",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #D5D5D5",
    outline: "none",
    transition: "border-color 200ms",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7", color: "#1A1A1A" }}>
      <SiteHeader />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #E5E7EB",
          padding: "64px 0 48px",
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
            Get in Touch
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#1A1A1A",
            }}
          >
            Contact<br />SENOTA.
          </h1>
        </div>
      </section>

      {/* ── Main Grid ─────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.5fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: Info */}
          <div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "48px",
              }}
            >
              We read every message. Whether you're a creative, a brand, a journalist, or just someone who wants to connect — reach out and we'll get back to you within 48 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {DEPARTMENTS.map((d, i) => (
                <div
                  key={d.label}
                  style={{
                    padding: "20px 0",
                    borderTop: "1px solid #E5E7EB",
                    borderBottom: i === DEPARTMENTS.length - 1 ? "1px solid #E5E7EB" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginBottom: "4px",
                    }}
                  >
                    {d.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    {d.email}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "48px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#999",
                  marginBottom: "8px",
                }}
              >
                Social
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1A1A1A",
                }}
              >
                @senotastudios
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  padding: "64px 48px",
                  backgroundColor: "#1A1A1A",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "48px",
                    fontWeight: 600,
                    color: "#CC0000",
                    marginBottom: "16px",
                  }}
                >
                  ✓
                </p>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    marginBottom: "12px",
                  }}
                >
                  Message Received.
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#888",
                    lineHeight: 1.7,
                  }}
                >
                  We'll be in touch within 48 hours. Thank you for reaching out to SENOTA.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#999",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#1A1A1A"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#D5D5D5"; }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#999",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#1A1A1A"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#D5D5D5"; }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#999",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Department
                  </label>
                  <select
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#1A1A1A"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#D5D5D5"; }}
                  >
                    <option value="">Select a department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.label} value={d.label}>{d.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#999",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="What's this about?"
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#1A1A1A"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#D5D5D5"; }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#999",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    rows={6}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      borderBottom: "none",
                      border: "1px solid #D5D5D5",
                      padding: "12px",
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#1A1A1A"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "#D5D5D5"; }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#F7F7F7",
                    background: "#CC0000",
                    border: "none",
                    padding: "16px 40px",
                    cursor: "pointer",
                    width: "fit-content",
                    transition: "background 200ms, transform 100ms",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
                  onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                  onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
