/**
 * SENOTA — Vault Contact Sales
 * Enterprise-grade contact experience for Vault Elite prospects
 * Design: Dark, cinematic, high-trust sales environment
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Shield,
  Award,
  Users,
  Building,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  Lock,
  Star,
  TrendingUp,
  MessageCircle,
  Clock,
  ChevronRight,
  Fingerprint,
} from "lucide-react";

/* ── Data ────────────────────────────────────────────────────── */
const ELITE_FEATURES = [
  { icon: Shield, title: "Everything in Pro", desc: "Full content monitoring, takedowns, and case tracking" },
  { icon: Fingerprint, title: "Advanced Monitoring", desc: "Deep-scan detection with forensic-grade accuracy" },
  { icon: Award, title: "Brand Protection", desc: "Comprehensive brand identity and trademark monitoring" },
  { icon: Zap, title: "Faster Response Times", desc: "Priority escalation with guaranteed SLA windows" },
  { icon: Users, title: "Dedicated Account Manager", desc: "A named expert assigned to your account" },
  { icon: Globe, title: "Custom Integrations", desc: "API access and bespoke workflow integrations" },
];

const TRUST_SIGNALS = [
  { stat: "50K+", label: "Creators Protected" },
  { stat: "14.2M+", label: "Threats Blocked" },
  { stat: "99.7%", label: "Detection Accuracy" },
  { stat: "<2hr", label: "Elite Response Time" },
];

const USE_CASES = [
  {
    icon: Building,
    title: "Media Companies",
    desc: "Protect editorial content, video assets, and brand identity across all platforms at scale.",
  },
  {
    icon: Star,
    title: "High-Profile Creators",
    desc: "Safeguard your personal brand, likeness, and exclusive content from impersonators.",
  },
  {
    icon: TrendingUp,
    title: "Agencies & Studios",
    desc: "Manage protection for an entire roster of talent under one unified enterprise account.",
  },
];

const TEAM_MEMBERS = [
  {
    name: "Marcus Reid",
    role: "Enterprise Sales Lead",
    initials: "MR",
    color: "#7C3AED",
  },
  {
    name: "Alicia Voss",
    role: "Solutions Architect",
    initials: "AV",
    color: "#5B21B6",
  },
  {
    name: "Devon Park",
    role: "Account Strategy",
    initials: "DP",
    color: "#4C1D95",
  },
];

/* ── Animated Grid Background ────────────────────────────────── */
function GridBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #000000 0%, #050510 40%, #0A0020 70%, #000000 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,33,182,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ── Floating Label Input ─────────────────────────────────────── */
function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  icon?: React.ElementType;
  placeholder?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          color: focused ? "#A78BFA" : "#6060A0",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "6px",
          transition: "color 0.2s ease",
        }}
      >
        {label}
        {required && <span style={{ color: "#7C3AED", marginLeft: "3px" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon
            size={15}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: focused ? "#A78BFA" : "#3030A0",
              transition: "color 0.2s ease",
            }}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: Icon ? "12px 16px 12px 40px" : "12px 16px",
            background: focused ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.03)",
            border: error
              ? "1px solid rgba(239,68,68,0.5)"
              : focused
              ? "1px solid rgba(124,58,237,0.6)"
              : "1px solid rgba(124,58,237,0.2)",
            borderRadius: "6px",
            color: "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
          }}
        />
      </div>
      {error && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            color: "#EF4444",
            marginTop: "4px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function VaultContactSalesPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    teamSize: "",
    message: "",
    useCase: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.company.trim()) newErrors.company = "Required";
    if (!formData.message.trim()) newErrors.message = "Tell us a bit about your needs";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(124,58,237,0.2)",
    borderRadius: "6px",
    color: "#FFFFFF",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
      <SiteHeader />
      <GridBackground />

      <style>{`
        @keyframes float-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 50px rgba(124,58,237,0.7); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        input::placeholder, textarea::placeholder { color: #2A2A5A; }
        select option { background: #0A0A1A; color: #FFFFFF; }
      `}</style>

      <main className="relative z-10">
        {submitted ? (
          /* ── Success State ── */
          <div
            className="container max-w-3xl mx-auto px-6 py-24 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
                animation: "glow-pulse 2s ease-in-out infinite",
              }}
            >
              <CheckCircle size={44} color="#FFFFFF" />
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
            >
              <CheckCircle size={13} style={{ color: "#10B981" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#10B981", textTransform: "uppercase" }}>
                Request Received
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(28px, 5vw, 44px)",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Your Vault Elite inquiry
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                is in good hands.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                color: "#8080B0",
                maxWidth: "460px",
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              A dedicated Vault Elite specialist will reach out to{" "}
              <strong style={{ color: "#A78BFA" }}>{formData.email}</strong> within{" "}
              <strong style={{ color: "#FFFFFF" }}>2 business hours</strong>.
            </p>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left max-w-2xl mx-auto"
            >
              {[
                { icon: Clock, title: "Response Time", desc: "Within 2 business hours" },
                { icon: Users, title: "Dedicated Team", desc: "Your own account specialist" },
                { icon: Shield, title: "Custom Plan", desc: "Tailored to your exact needs" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "18px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "10px",
                    }}
                  >
                    <Icon size={20} style={{ color: "#A78BFA", marginBottom: "10px" }} />
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>{item.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0" }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="/vault"
              className="inline-flex items-center gap-3 px-8 py-4 transition-all"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "#FFFFFF",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "6px",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.7)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Back to Vault
              <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            {/* ── Hero Banner ── */}
            <section
              style={{
                padding: "80px 24px 60px",
                borderBottom: "1px solid rgba(124,58,237,0.15)",
                textAlign: "center",
              }}
            >
              <div className="container max-w-4xl mx-auto">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}
                >
                  <Award size={14} style={{ color: "#F59E0B" }} />
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#F59E0B", textTransform: "uppercase" }}>
                    Vault Elite — Enterprise Protection
                  </span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: "clamp(32px, 6vw, 60px)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: "20px",
                    color: "#FFFFFF",
                  }}
                >
                  Let's Build Your
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg, #A78BFA, #60A5FA, #F59E0B)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Protection Strategy
                  </span>
                </h1>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "18px",
                    color: "#8080B0",
                    maxWidth: "560px",
                    margin: "0 auto 40px",
                    lineHeight: 1.7,
                  }}
                >
                  Vault Elite is built for organizations that need enterprise-grade content protection, dedicated support, and custom integrations.
                </p>

                {/* Trust stats */}
                <div className="flex flex-wrap justify-center gap-8">
                  {TRUST_SIGNALS.map((s, i) => (
                    <div key={i} className="text-center">
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "clamp(20px, 3vw, 28px)",
                          fontWeight: 800,
                          color: "#FFFFFF",
                          marginBottom: "4px",
                        }}
                      >
                        {s.stat}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          color: "#6060A0",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Main Content ── */}
            <section style={{ padding: "60px 24px 80px" }}>
              <div className="container max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                  {/* Left: Info Column */}
                  <div className="lg:col-span-2">
                    {/* Elite features */}
                    <div style={{ marginBottom: "40px" }}>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#F59E0B",
                          textTransform: "uppercase",
                          marginBottom: "16px",
                        }}
                      >
                        What's Included
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        {ELITE_FEATURES.map((f, i) => {
                          const Icon = f.icon;
                          return (
                            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                              <div
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "8px",
                                  background: "rgba(124,58,237,0.12)",
                                  border: "1px solid rgba(124,58,237,0.2)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <Icon size={15} style={{ color: "#A78BFA" }} />
                              </div>
                              <div>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>
                                  {f.title}
                                </p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", lineHeight: 1.5 }}>
                                  {f.desc}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Use cases */}
                    <div style={{ marginBottom: "40px" }}>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#A78BFA",
                          textTransform: "uppercase",
                          marginBottom: "16px",
                        }}
                      >
                        Built For
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {USE_CASES.map((u, i) => {
                          const Icon = u.icon;
                          return (
                            <div
                              key={i}
                              style={{
                                padding: "14px",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(124,58,237,0.15)",
                                borderRadius: "8px",
                                display: "flex",
                                gap: "12px",
                                alignItems: "flex-start",
                              }}
                            >
                              <Icon size={18} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
                              <div>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", marginBottom: "3px" }}>{u.title}</p>
                                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", lineHeight: 1.5 }}>{u.desc}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Sales team */}
                    <div>
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          color: "#A78BFA",
                          textTransform: "uppercase",
                          marginBottom: "16px",
                        }}
                      >
                        Your Sales Team
                      </p>
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        {TEAM_MEMBERS.map((m, i) => (
                          <div key={i} style={{ textAlign: "center" }}>
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "13px",
                                fontWeight: 700,
                                color: "#FFFFFF",
                                margin: "0 auto 6px",
                                border: "2px solid rgba(124,58,237,0.3)",
                              }}
                            >
                              {m.initials}
                            </div>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#FFFFFF", fontWeight: 600 }}>{m.name.split(" ")[0]}</p>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "#4040A0" }}>{m.role.split(" ")[0]}</p>
                          </div>
                        ))}
                        <div style={{ marginLeft: "4px" }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#8080B0", lineHeight: 1.5 }}>
                            A dedicated specialist will be assigned to your account within 2 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Contact Form */}
                  <div className="lg:col-span-3">
                    <div
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(124,58,237,0.25)",
                        borderRadius: "16px",
                        padding: "40px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Form header glow */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "linear-gradient(90deg, transparent, #7C3AED, #A78BFA, #7C3AED, transparent)",
                        }}
                      />

                      <div style={{ marginBottom: "28px" }}>
                        <h2
                          style={{
                            fontFamily: "'Helvetica Neue', Arial, sans-serif",
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            marginBottom: "6px",
                          }}
                        >
                          Talk to Sales
                        </h2>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#6060A0" }}>
                          Tell us about your organization and we'll craft a custom Vault Elite plan.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit}>
                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <FloatingInput
                            label="First Name"
                            value={formData.firstName}
                            onChange={(v) => handleChange("firstName", v)}
                            error={errors.firstName}
                            placeholder="Jane"
                            required
                          />
                          <FloatingInput
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(v) => handleChange("lastName", v)}
                            error={errors.lastName}
                            placeholder="Doe"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: "20px" }}>
                          <FloatingInput
                            label="Work Email"
                            type="email"
                            value={formData.email}
                            onChange={(v) => handleChange("email", v)}
                            error={errors.email}
                            icon={Mail}
                            placeholder="jane@company.com"
                            required
                          />
                        </div>

                        {/* Company + Phone */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <FloatingInput
                            label="Company / Studio"
                            value={formData.company}
                            onChange={(v) => handleChange("company", v)}
                            error={errors.company}
                            icon={Building}
                            placeholder="Acme Media"
                            required
                          />
                          <FloatingInput
                            label="Phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(v) => handleChange("phone", v)}
                            icon={Phone}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        {/* Website + Team Size */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          <FloatingInput
                            label="Website"
                            value={formData.website}
                            onChange={(v) => handleChange("website", v)}
                            icon={Globe}
                            placeholder="yoursite.com"
                          />
                          <div>
                            <label
                              style={{
                                display: "block",
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#6060A0",
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                marginBottom: "6px",
                              }}
                            >
                              Team Size
                            </label>
                            <select
                              value={formData.teamSize}
                              onChange={(e) => handleChange("teamSize", e.target.value)}
                              style={{
                                ...inputStyle,
                                cursor: "pointer",
                                appearance: "none",
                              }}
                              onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
                              onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)"; }}
                            >
                              <option value="">Select...</option>
                              <option value="1">Just me</option>
                              <option value="2-10">2–10 people</option>
                              <option value="11-50">11–50 people</option>
                              <option value="51-200">51–200 people</option>
                              <option value="200+">200+ people</option>
                            </select>
                          </div>
                        </div>

                        {/* Use case */}
                        <div style={{ marginBottom: "20px" }}>
                          <label
                            style={{
                              display: "block",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#6060A0",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              marginBottom: "6px",
                            }}
                          >
                            Primary Use Case
                          </label>
                          <select
                            value={formData.useCase}
                            onChange={(e) => handleChange("useCase", e.target.value)}
                            style={{ ...inputStyle, cursor: "pointer", appearance: "none" }}
                            onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
                            onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)"; }}
                          >
                            <option value="">Select your primary need...</option>
                            <option value="content-protection">Content Protection & Takedowns</option>
                            <option value="brand-protection">Brand & Identity Protection</option>
                            <option value="impersonation">Impersonation Monitoring</option>
                            <option value="multi-creator">Multi-Creator / Roster Management</option>
                            <option value="enterprise-api">Enterprise API Integration</option>
                            <option value="other">Other / Custom</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div style={{ marginBottom: "28px" }}>
                          <label
                            style={{
                              display: "block",
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "#6060A0",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              marginBottom: "6px",
                            }}
                          >
                            Tell Us About Your Needs <span style={{ color: "#7C3AED" }}>*</span>
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            placeholder="Describe your content protection challenges, team structure, and what you're looking to solve with Vault Elite..."
                            rows={5}
                            style={{
                              ...inputStyle,
                              resize: "vertical",
                              minHeight: "120px",
                              border: errors.message ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(124,58,237,0.2)",
                            }}
                            onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
                            onBlur={(e) => { (e.target as HTMLElement).style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(124,58,237,0.2)"; }}
                          />
                          {errors.message && (
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>
                              {errors.message}
                            </p>
                          )}
                        </div>

                        {/* Response time promise */}
                        <div
                          className="flex items-center gap-3 mb-6"
                          style={{
                            padding: "12px 16px",
                            background: "rgba(124,58,237,0.06)",
                            border: "1px solid rgba(124,58,237,0.15)",
                            borderRadius: "8px",
                          }}
                        >
                          <Clock size={15} style={{ color: "#A78BFA", flexShrink: 0 }} />
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#8080B0" }}>
                            <strong style={{ color: "#FFFFFF" }}>2-hour response guarantee.</strong>{" "}
                            A dedicated Vault Elite specialist will reach out within 2 business hours.
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-3 py-4 transition-all"
                          style={{
                            background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "6px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                            letterSpacing: "0.04em",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(124,58,237,0.7)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                          }}
                        >
                          Request My Elite Consultation
                          <ArrowRight size={18} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
