/**
 * SENOTA Submit Work Page
 * Design: Dark editorial feel. Multi-step form with progress indicator.
 * Step 1: About You. Step 2: Your Work. Step 3: Confirmation.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";
import { toast } from "sonner";

const CREATIVE_AREAS = [
  "Photography", "Modeling", "Writing", "Music / Sound", "Visual Art",
  "Creative Direction", "Videography", "Styling", "Makeup / Beauty", "Performance", "Other",
];

const STEPS = ["About You", "Your Work", "Submit"];

export default function SubmitPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", city: "", instagram: "",
    area: "", portfolioUrl: "", bio: "", experience: "", goals: "",
  });

  const next = () => {
    if (step === 0 && (!form.name || !form.email || !form.city)) {
      toast.error("Please fill in your name, email, and city.");
      return;
    }
    if (step === 1 && (!form.area || !form.bio)) {
      toast.error("Please select your creative area and write a short bio.");
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Submission received! We'll review your work and be in touch.");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    color: "#F7F7F7",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    outline: "none",
    transition: "border-color 200ms",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#888",
    display: "block",
    marginBottom: "4px",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D0D0D", color: "#F7F7F7" }}>
      <SiteHeader />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
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
            Join the Collective
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#F7F7F7",
              marginBottom: "20px",
            }}
          >
            Submit<br />Your Work.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              color: "#888",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            SENOTA is always looking for talented creatives to feature in the magazine, join the showcase, and become part of the collective. Tell us about yourself and your work.
          </p>
        </div>
      </section>

      {/* ── Form ──────────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "64px", paddingBottom: "80px", maxWidth: "760px", margin: "0 auto" }}>

        {/* Progress */}
        {!submitted && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0",
              marginBottom: "56px",
            }}
          >
            {STEPS.map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: i <= step ? "#CC0000" : "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 300ms",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: i <= step ? "#F7F7F7" : "#666",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: i === step ? "#F7F7F7" : "#555",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: i < step ? "#CC0000" : "rgba(255,255,255,0.1)",
                      margin: "0 16px",
                      transition: "background 300ms",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {submitted ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "72px",
                color: "#CC0000",
                lineHeight: 1,
                marginBottom: "24px",
              }}
            >
              ✓
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 600,
                color: "#F7F7F7",
                marginBottom: "16px",
              }}
            >
              You're in the queue.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "#888",
                lineHeight: 1.7,
                maxWidth: "440px",
                margin: "0 auto",
              }}
            >
              We review every submission personally. If your work is a fit for SENOTA, we'll reach out within 2–4 weeks. In the meantime, follow us on Instagram for updates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Step 0: About You */}
            {step === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    marginBottom: "8px",
                  }}
                >
                  Tell us about yourself.
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#F7F7F7"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#F7F7F7"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
                    />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <label style={labelStyle}>City / Location *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="City, State"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#F7F7F7"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Instagram Handle</label>
                    <input
                      type="text"
                      value={form.instagram}
                      onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                      placeholder="@yourhandle"
                      style={inputStyle}
                      onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#F7F7F7"; }}
                      onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Your Work */}
            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    marginBottom: "8px",
                  }}
                >
                  Tell us about your work.
                </h2>
                <div>
                  <label style={labelStyle}>Creative Area *</label>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    {CREATIVE_AREAS.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => setForm({ ...form, area })}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "8px 16px",
                          border: "1px solid",
                          borderColor: form.area === area ? "#CC0000" : "rgba(255,255,255,0.2)",
                          backgroundColor: form.area === area ? "#CC0000" : "transparent",
                          color: form.area === area ? "#F7F7F7" : "#888",
                          cursor: "pointer",
                          transition: "all 180ms",
                        }}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Portfolio / Website URL</label>
                  <input
                    type="url"
                    value={form.portfolioUrl}
                    onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                    placeholder="https://yourportfolio.com"
                    style={inputStyle}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderBottomColor = "#F7F7F7"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.15)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Short Bio * (2–4 sentences)</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="Who are you as a creative? What do you make? What drives you?"
                    rows={4}
                    style={{
                      ...inputStyle,
                      borderBottom: "none",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "12px",
                      resize: "vertical",
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#F7F7F7"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>What are you hoping to get from SENOTA?</label>
                  <textarea
                    value={form.goals}
                    onChange={(e) => setForm({ ...form, goals: e.target.value })}
                    placeholder="Feature in the magazine? Part of the creative showcase? Something else?"
                    rows={3}
                    style={{
                      ...inputStyle,
                      borderBottom: "none",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "12px",
                      resize: "vertical",
                    }}
                    onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#F7F7F7"; }}
                    onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; }}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Review & Submit */}
            {step === 2 && (
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(28px, 3.5vw, 42px)",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    marginBottom: "32px",
                  }}
                >
                  Review & Submit.
                </h2>
                <div
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "32px",
                    marginBottom: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {[
                    { label: "Name", value: form.name },
                    { label: "Email", value: form.email },
                    { label: "City", value: form.city },
                    { label: "Instagram", value: form.instagram || "—" },
                    { label: "Creative Area", value: form.area },
                    { label: "Portfolio", value: form.portfolioUrl || "—" },
                    { label: "Bio", value: form.bio },
                    { label: "Goals", value: form.goals || "—" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: "16px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        paddingBottom: "16px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#666",
                          paddingTop: "2px",
                        }}
                      >
                        {row.label}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          color: "#D0D0D0",
                          lineHeight: 1.6,
                        }}
                      >
                        {row.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "48px",
              }}
            >
              {step > 0 ? (
                <button
                  type="button"
                  onClick={back}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#888",
                    background: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    padding: "12px 28px",
                    cursor: "pointer",
                    transition: "border-color 200ms, color 200ms",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#F7F7F7"; (e.currentTarget as HTMLElement).style.color = "#F7F7F7"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "#888"; }}
                >
                  ← Back
                </button>
              ) : <div />}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={next}
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
                  Continue →
                </button>
              ) : (
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
                    padding: "14px 36px",
                    cursor: "pointer",
                    transition: "background 200ms",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#AA0000"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#CC0000"; }}
                >
                  Submit Application →
                </button>
              )}
            </div>
          </form>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
