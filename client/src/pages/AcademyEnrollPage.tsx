/**
 * SENOTA Academy Enrollment Page
 * Design: Dark editorial with warm cream accents. Three-phase flow:
 *   1. Course selection cards with pricing
 *   2. Dynamic form customized per course
 *   3. Soft confirmation — "We'll reach out with next steps"
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { Link } from "wouter";

// ── Course Data ────────────────────────────────────────────────
interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  format: string;
  level: string;
  price: number;
  priceNote: string;
  highlights: string[];
  formFields: FormField[];
  accentColor: string;
}

interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "select" | "url";
  placeholder: string;
  required: boolean;
  options?: string[];
}

const COURSES: Course[] = [
  {
    id: "portfolio-foundations",
    title: "Portfolio Foundations",
    subtitle: "Build Your Creative Identity",
    description:
      "A structured 6-week program designed for emerging creatives who want to build a compelling, professional portfolio from scratch. You'll develop your visual voice, curate your best work, and learn how to present yourself to agencies, brands, and publications.",
    duration: "6 Weeks",
    format: "Online — Live Sessions + Self-Paced Modules",
    level: "Beginner to Intermediate",
    price: 249,
    priceNote: "One-time payment — payment plan available",
    highlights: [
      "Weekly 90-min live workshops with SENOTA mentors",
      "Personal portfolio critique sessions",
      "Brand identity workbook included",
      "Certificate of completion",
    ],
    accentColor: "#CC0000",
    formFields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { id: "city", label: "City & State", type: "text", placeholder: "e.g. Atlanta, GA", required: true },
      { id: "creative_field", label: "Your Creative Field", type: "select", placeholder: "", required: true,
        options: ["Photography", "Modeling", "Graphic Design", "Writing / Journalism", "Videography", "Music", "Fashion Styling", "Art Direction", "Other"] },
      { id: "experience", label: "Tell us about your current experience level", type: "textarea",
        placeholder: "Describe where you are in your creative journey — no experience is too little.", required: true },
      { id: "portfolio_url", label: "Portfolio or Social Link (optional)", type: "url",
        placeholder: "https://instagram.com/yourhandle", required: false },
      { id: "goal", label: "What do you hope to achieve from this course?", type: "textarea",
        placeholder: "Share your goals — we use this to personalize your experience.", required: true },
    ],
  },
  {
    id: "editorial-photography",
    title: "Editorial Photography",
    subtitle: "Shoot with Intent",
    description:
      "An 8-week intensive for photographers ready to move from snapshots to editorial storytelling. You'll learn lighting, composition, directing talent, and how to pitch your work to magazines — including SENOTA.",
    duration: "8 Weeks",
    format: "Online — Live Critiques + Field Assignments",
    level: "Intermediate",
    price: 399,
    priceNote: "One-time payment — payment plan available",
    highlights: [
      "8 live critique sessions with working photographers",
      "Real editorial brief assignments",
      "Opportunity to be featured in SENOTA Magazine",
      "Access to SENOTA's creative network",
    ],
    accentColor: "#1A1A1A",
    formFields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { id: "city", label: "City & State", type: "text", placeholder: "e.g. Chicago, IL", required: true },
      { id: "camera_gear", label: "What camera/gear do you currently use?", type: "text",
        placeholder: "e.g. Sony A7IV, Canon R6, iPhone 15 Pro", required: true },
      { id: "photography_style", label: "How would you describe your photography style?", type: "select",
        placeholder: "", required: true,
        options: ["Fashion / Editorial", "Portrait", "Documentary / Street", "Beauty", "Lifestyle", "Still Life / Product", "Mixed / Exploring"] },
      { id: "portfolio_url", label: "Portfolio or Instagram Link", type: "url",
        placeholder: "https://instagram.com/yourhandle", required: true },
      { id: "inspiration", label: "Who are your biggest photographic influences?", type: "textarea",
        placeholder: "Name photographers, publications, or visual artists that inspire your work.", required: false },
      { id: "goal", label: "What do you want to accomplish in 8 weeks?", type: "textarea",
        placeholder: "Be specific — what does success look like for you?", required: true },
    ],
  },
  {
    id: "brand-yourself",
    title: "Brand Yourself",
    subtitle: "Become the Business",
    description:
      "A 4-week accelerator for creatives who are ready to turn their talent into a brand. You'll learn how to define your niche, price your services, build a client pipeline, and show up consistently on social media — all while staying authentically you.",
    duration: "4 Weeks",
    format: "Online — Self-Paced with Weekly Group Calls",
    level: "All Levels",
    price: 179,
    priceNote: "One-time payment — payment plan available",
    highlights: [
      "Niche definition + positioning workshop",
      "Pricing calculator template",
      "Social media content strategy guide",
      "Weekly group accountability calls",
    ],
    accentColor: "#8B6914",
    formFields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { id: "city", label: "City & State", type: "text", placeholder: "e.g. New York, NY", required: true },
      { id: "creative_field", label: "What type of creative are you?", type: "select", placeholder: "", required: true,
        options: ["Photographer", "Model", "Videographer", "Graphic Designer", "Writer", "Musician / Producer", "Fashion Stylist", "Makeup Artist", "Content Creator", "Other"] },
      { id: "current_income", label: "Are you currently earning income from your creative work?", type: "select",
        placeholder: "", required: true,
        options: ["No — just getting started", "Occasionally / side income", "Part-time income", "Full-time income"] },
      { id: "biggest_challenge", label: "What is your biggest challenge right now?", type: "textarea",
        placeholder: "e.g. pricing my work, finding clients, staying consistent on social media...", required: true },
      { id: "social_url", label: "Your main social media profile", type: "url",
        placeholder: "https://instagram.com/yourhandle", required: false },
    ],
  },
  {
    id: "modeling-masterclass",
    title: "Modeling Masterclass",
    subtitle: "Walk, Work, and Win",
    description:
      "A 6-week program for aspiring and working models who want to elevate their craft. From posing and movement to understanding the industry, building your book, and working with photographers — this course covers everything the agencies don't tell you.",
    duration: "6 Weeks",
    format: "Online — Live Sessions + On-Camera Exercises",
    level: "Beginner to Intermediate",
    price: 299,
    priceNote: "One-time payment — payment plan available",
    highlights: [
      "Posing, movement, and expression workshops",
      "How to work with photographers and directors",
      "Building your comp card and digital portfolio",
      "Industry Q&A with working models and agents",
    ],
    accentColor: "#4A4A4A",
    formFields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { id: "city", label: "City & State", type: "text", placeholder: "e.g. Miami, FL", required: true },
      { id: "height", label: "Height", type: "text", placeholder: "e.g. 5'9\"", required: true },
      { id: "modeling_experience", label: "Modeling experience level", type: "select", placeholder: "", required: true,
        options: ["No experience — completely new", "A few shoots / test shoots", "Some paid work", "Agency represented", "Working professionally"] },
      { id: "modeling_type", label: "What type of modeling interests you most?", type: "select", placeholder: "", required: true,
        options: ["Editorial / High Fashion", "Commercial", "Fitness", "Runway / Runway", "Beauty / Cosmetics", "Plus Size / Curve", "Lifestyle", "Not sure yet"] },
      { id: "portfolio_url", label: "Portfolio, Instagram, or agency link (optional)", type: "url",
        placeholder: "https://instagram.com/yourhandle", required: false },
      { id: "goal", label: "What do you want to achieve from this course?", type: "textarea",
        placeholder: "Tell us where you want to be in 6 months.", required: true },
    ],
  },
  {
    id: "creative-writing-voice",
    title: "Creative Writing & Voice",
    subtitle: "Find Your Story",
    description:
      "A 5-week workshop for writers, journalists, and storytellers who want to develop a distinctive voice and learn how to pitch and publish their work. You'll write for real briefs, receive editorial feedback, and leave with a polished piece ready to submit.",
    duration: "5 Weeks",
    format: "Online — Weekly Workshops + Peer Review",
    level: "All Levels",
    price: 199,
    priceNote: "One-time payment — payment plan available",
    highlights: [
      "Weekly writing prompts and editorial briefs",
      "One-on-one feedback from SENOTA editors",
      "Pitching guide for magazines and publications",
      "Opportunity to be published in SENOTA Magazine",
    ],
    accentColor: "#2D5A3D",
    formFields: [
      { id: "name", label: "Full Name", type: "text", placeholder: "Your full name", required: true },
      { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
      { id: "city", label: "City & State", type: "text", placeholder: "e.g. Los Angeles, CA", required: true },
      { id: "writing_type", label: "What type of writing do you focus on?", type: "select", placeholder: "", required: true,
        options: ["Editorial / Magazine", "Personal Essays", "Music Journalism", "Fashion Writing", "Culture Criticism", "Interviews / Profiles", "Fiction / Creative", "Multiple / Exploring"] },
      { id: "writing_sample", label: "Share a link to a writing sample (optional)", type: "url",
        placeholder: "https://medium.com/@yourprofile or Google Doc link", required: false },
      { id: "publications", label: "Have you been published anywhere?", type: "textarea",
        placeholder: "List any publications, blogs, or platforms where your work has appeared. None is perfectly fine.", required: false },
      { id: "goal", label: "What story do you most want to tell?", type: "textarea",
        placeholder: "Describe the piece you've been wanting to write — or the voice you want to develop.", required: true },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────
type Phase = "select" | "form" | "success";

export default function AcademyEnrollPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleCourseSelect(course: Course) {
    setSelectedCourse(course);
    setFormData({});
    setErrors({});
    setPhase("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleChange(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCourse) return;
    const newErrors: Record<string, string> = {};
    selectedCourse.formFields.forEach((f) => {
      if (f.required && !formData[f.id]?.trim()) {
        newErrors[f.id] = "This field is required.";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPhase("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7", color: "#1A1A1A" }}>
      <SiteHeader />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section style={{ backgroundColor: "#1A1A1A", padding: "64px 0 48px", borderBottom: "1px solid #2A2A2A" }}>
        <div className="container">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#CC0000", marginBottom: "12px" }}>
            SENOTA Academy
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 88px)",
            fontWeight: 700, lineHeight: 0.95, color: "#F7F7F7", marginBottom: "20px" }}>
            {phase === "select" && <>Choose<br />Your Course.</>}
            {phase === "form" && selectedCourse && <>{selectedCourse.title}.</>}
            {phase === "success" && <>You're In.</>}
          </h1>
          {phase === "select" && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#A0A0A0",
              maxWidth: "520px", lineHeight: 1.7 }}>
              Select a course below to see full details and pricing. After you apply, we'll reach out with next steps — no payment required upfront.
            </p>
          )}
          {phase === "form" && selectedCourse && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#A0A0A0",
              maxWidth: "520px", lineHeight: 1.7 }}>
              {selectedCourse.subtitle} — {selectedCourse.duration} · {selectedCourse.format}
            </p>
          )}
          {phase === "success" && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#A0A0A0",
              maxWidth: "520px", lineHeight: 1.7 }}>
              Your application has been received. We'll be in touch soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Phase 1: Course Selection ─────────────────────────── */}
      {phase === "select" && (
        <section className="container" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "24px" }}>
            {COURSES.map((course) => (
              <div
                key={course.id}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 220ms, transform 220ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
                onClick={() => handleCourseSelect(course)}
              >
                {/* Color bar */}
                <div style={{ height: "4px", backgroundColor: course.accentColor }} />

                <div style={{ padding: "28px 28px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Meta row */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[course.duration, course.level].map((tag) => (
                      <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px",
                        letterSpacing: "0.12em", textTransform: "uppercase", color: "#888",
                        border: "1px solid #E5E7EB", padding: "3px 8px" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px",
                      fontWeight: 700, color: "#1A1A1A", lineHeight: 1.15, marginBottom: "4px" }}>
                      {course.title}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                      color: course.accentColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#555",
                    lineHeight: 1.7, flex: 1 }}>
                    {course.description}
                  </p>

                  {/* Highlights */}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                    {course.highlights.map((h) => (
                      <li key={h} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <span style={{ color: course.accentColor, fontSize: "14px", marginTop: "1px", flexShrink: 0 }}>—</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#444", lineHeight: 1.5 }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "20px", display: "flex",
                    alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                    <div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px",
                        fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>
                        ${course.price}
                      </p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#888", marginTop: "2px" }}>
                        {course.priceNote}
                      </p>
                    </div>
                    <button
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        backgroundColor: course.accentColor,
                        color: "#F7F7F7",
                        border: "none",
                        padding: "12px 20px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "opacity 160ms",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                    >
                      Apply Now →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Back to Academy */}
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <Link href="/academy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", textDecoration: "none" }}>
              ← Back to Academy
            </Link>
          </div>
        </section>
      )}

      {/* ── Phase 2: Application Form ─────────────────────────── */}
      {phase === "form" && selectedCourse && (
        <section className="container" style={{ paddingTop: "56px", paddingBottom: "80px" }}>
          <div style={{ maxWidth: "680px" }}>
            {/* Back link */}
            <button
              onClick={() => { setPhase("select"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#888", background: "none", border: "none",
                cursor: "pointer", marginBottom: "40px", padding: 0 }}
            >
              ← Choose a Different Course
            </button>

            {/* Course summary strip */}
            <div style={{ backgroundColor: "#1A1A1A", padding: "20px 24px", marginBottom: "40px",
              display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap",
              borderLeft: `4px solid ${selectedCourse.accentColor}` }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px",
                  fontWeight: 600, color: "#F7F7F7", marginBottom: "4px" }}>
                  {selectedCourse.title}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#A0A0A0" }}>
                  {selectedCourse.duration} · {selectedCourse.level}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px",
                  fontWeight: 700, color: "#F7F7F7" }}>
                  ${selectedCourse.price}
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#666" }}>
                  No payment due today
                </p>
              </div>
            </div>

            {/* Soft reassurance note */}
            <div style={{ backgroundColor: "#FFF8F0", border: "1px solid #F0E0C8", padding: "16px 20px",
              marginBottom: "40px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#7A5A30", lineHeight: 1.6 }}>
                <strong>No payment required today.</strong> Fill out this form and we'll reach out via email with next steps, scheduling details, and payment options. We want this to feel right for you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {selectedCourse.formFields.map((field) => (
                <div key={field.id}>
                  <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                    letterSpacing: "0.1em", textTransform: "uppercase", color: "#555", marginBottom: "8px" }}>
                    {field.label}
                    {field.required && <span style={{ color: "#CC0000", marginLeft: "4px" }}>*</span>}
                  </label>

                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      style={{
                        width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: "#1A1A1A", backgroundColor: "#fff", border: `1px solid ${errors[field.id] ? "#CC0000" : "#D0D0D0"}`,
                        padding: "12px 14px", resize: "vertical", outline: "none", boxSizing: "border-box",
                      }}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      style={{
                        width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: formData[field.id] ? "#1A1A1A" : "#888",
                        backgroundColor: "#fff", border: `1px solid ${errors[field.id] ? "#CC0000" : "#D0D0D0"}`,
                        padding: "12px 14px", outline: "none", appearance: "none",
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
                        color: "#1A1A1A", backgroundColor: "#fff",
                        border: `1px solid ${errors[field.id] ? "#CC0000" : "#D0D0D0"}`,
                        padding: "12px 14px", outline: "none", boxSizing: "border-box",
                      }}
                    />
                  )}

                  {errors[field.id] && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
                      color: "#CC0000", marginTop: "6px" }}>
                      {errors[field.id]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.14em",
                  textTransform: "uppercase", backgroundColor: "#1A1A1A", color: "#F7F7F7",
                  border: "none", padding: "16px 32px", cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1, transition: "opacity 160ms", alignSelf: "flex-start",
                }}
              >
                {submitting ? "Submitting..." : "Submit Application →"}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── Phase 3: Success ──────────────────────────────────── */}
      {phase === "success" && selectedCourse && (
        <section className="container" style={{ paddingTop: "80px", paddingBottom: "120px", maxWidth: "640px" }}>
          {/* Big checkmark */}
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#1A1A1A",
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l6 6 10-12" stroke="#F7F7F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700, lineHeight: 1, color: "#1A1A1A", marginBottom: "24px" }}>
            Application Received.
          </h2>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "#555",
            lineHeight: 1.8, marginBottom: "16px" }}>
            Thank you for applying to <strong>{selectedCourse.title}</strong>. We've received your information and will be in touch via email with next steps, scheduling details, and payment options.
          </p>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#888",
            lineHeight: 1.8, marginBottom: "48px" }}>
            There's no pressure and no rush — we want to make sure this course is the right fit for you before anything else. Keep an eye on your inbox.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/academy"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em",
                textTransform: "uppercase", backgroundColor: "#1A1A1A", color: "#F7F7F7",
                textDecoration: "none", padding: "14px 24px" }}>
              Back to Academy
            </Link>
            <Link href="/creatives"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#555", textDecoration: "none",
                padding: "14px 0", borderBottom: "1px solid #555" }}>
              Explore the Creative Showcase →
            </Link>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
