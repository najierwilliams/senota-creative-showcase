/**
 * SENOTA — Vault Learn More
 * A cinematic deep-dive into how Senota Vault works
 * Design: Scroll-driven storytelling, interactive demos, editorial depth
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Shield,
  Fingerprint,
  Globe,
  Zap,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Users,
  TrendingUp,
  Award,
  Star,
  Activity,
  Scan,
  FileWarning,
  Gavel,
  BarChart3,
  Clock,
  RefreshCw,
} from "lucide-react";

/* ── Scroll Reveal Hook ─────────────────────────────────────── */
function useScrollReveal() {
  const [visible, setVisible] = useState(new Set<string>());
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = (id: string, el: HTMLElement | null) => {
    if (!el) return;
    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((prev) => new Set([...prev, entry.target.id]));
            }
          });
        },
        { threshold: 0.12 }
      );
    }
    el.id = id;
    observer.current.observe(el);
  };

  return { visible, observe };
}

/* ── Animated Counter ────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 1800;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ── Interactive Fingerprint Demo ────────────────────────────── */
function FingerprintDemo() {
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const runDemo = () => {
    if (phase !== "idle") return;
    setPhase("scanning");
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 40);
  };

  const reset = () => {
    setPhase("idle");
    setProgress(0);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.25)",
        borderRadius: "14px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #7C3AED, #A78BFA, transparent)",
        }}
      />

      <div className="flex items-center gap-3 mb-6">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "rgba(124,58,237,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fingerprint size={22} style={{ color: "#A78BFA" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 700, color: "#FFFFFF" }}>
            Live Fingerprint Demo
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0" }}>
            See how content gets signed and protected
          </p>
        </div>
      </div>

      {/* Simulated content block */}
      <div
        style={{
          padding: "20px",
          background: "rgba(0,0,0,0.4)",
          border: phase === "done" ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(255,255,255,0.06)",
          borderRadius: "8px",
          marginBottom: "20px",
          transition: "border-color 0.4s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Scan animation */}
        {phase === "scanning" && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "2px",
              background: "linear-gradient(90deg, transparent, #7C3AED, #A78BFA, transparent)",
              top: `${progress}%`,
              transition: "top 0.04s linear",
              boxShadow: "0 0 10px rgba(124,58,237,0.8)",
            }}
          />
        )}

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#8080B0",
            lineHeight: 1.7,
            marginBottom: "10px",
          }}
        >
          <strong style={{ color: "#FFFFFF" }}>Original Content:</strong> "This photograph was taken at the Senota Studios showcase event on June 14th, 2025. All rights reserved."
        </p>

        {phase === "done" && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: "6px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <CheckCircle size={14} style={{ color: "#10B981" }} />
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#10B981" }}>
              VAULT-FP: 7c3aed·a78bfa·5b21b6·60a5fa·818cf8
            </span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {phase === "scanning" && (
        <div style={{ marginBottom: "16px" }}>
          <div className="flex justify-between mb-2">
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#A78BFA" }}>
              Embedding signature...
            </span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#A78BFA" }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
                borderRadius: "2px",
                transition: "width 0.04s linear",
                boxShadow: "0 0 8px rgba(124,58,237,0.6)",
              }}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={phase === "done" ? reset : runDemo}
          disabled={phase === "scanning"}
          style={{
            padding: "10px 20px",
            background: phase === "done"
              ? "rgba(255,255,255,0.05)"
              : phase === "scanning"
              ? "rgba(124,58,237,0.2)"
              : "linear-gradient(135deg, #7C3AED, #5B21B6)",
            border: phase === "done" ? "1px solid rgba(255,255,255,0.1)" : "none",
            borderRadius: "6px",
            color: phase === "done" ? "#8080B0" : "#FFFFFF",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            cursor: phase === "scanning" ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
        >
          {phase === "idle" && <><Scan size={14} /> Run Fingerprint</>}
          {phase === "scanning" && <><RefreshCw size={14} style={{ animation: "spin 1s linear infinite" }} /> Scanning...</>}
          {phase === "done" && <><RefreshCw size={14} /> Reset Demo</>}
        </button>

        {phase === "done" && (
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <CheckCircle size={14} style={{ color: "#10B981" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#10B981", fontWeight: 600 }}>
              Content Protected
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Threat Timeline ─────────────────────────────────────────── */
function ThreatTimeline() {
  const events = [
    { time: "00:00", event: "Content published on your platform", type: "safe", icon: CheckCircle },
    { time: "02:14", event: "Vault fingerprint embedded & monitoring begins", type: "safe", icon: Shield },
    { time: "06:48", event: "Unauthorized copy detected on external site", type: "threat", icon: AlertTriangle },
    { time: "06:49", event: "Vault Response triggered automatically", type: "action", icon: Zap },
    { time: "07:02", event: "Takedown notice sent to platform", type: "action", icon: Gavel },
    { time: "18:30", event: "Content removed. Threat neutralized.", type: "resolved", icon: CheckCircle },
  ];

  const colors = {
    safe: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", text: "#10B981" },
    threat: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.3)", text: "#EF4444" },
    action: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.3)", text: "#A78BFA" },
    resolved: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.4)", text: "#10B981" },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {events.map((e, i) => {
        const Icon = e.icon;
        const c = colors[e.type as keyof typeof colors];
        return (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              padding: "12px 16px",
              background: c.bg,
              border: `1px solid ${c.border}`,
              borderRadius: "8px",
              transition: "all 0.2s ease",
            }}
          >
            <Icon size={16} style={{ color: c.text, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "10px",
                color: c.text,
                flexShrink: 0,
                minWidth: "40px",
              }}
            >
              {e.time}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C0C0E0" }}>
              {e.event}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function VaultLearnMorePage() {
  const { visible, observe } = useScrollReveal();
  const [activeTab, setActiveTab] = useState<"fingerprint" | "monitor" | "respond">("fingerprint");

  const HOW_IT_WORKS = {
    fingerprint: {
      icon: Fingerprint,
      title: "Vault Fingerprinting",
      headline: "Your content gets an invisible identity.",
      body: "Every piece of content you upload is embedded with a unique, forensic-grade digital signature — invisible to the human eye, but detectable by our AI at any scale. Even if your content is cropped, filtered, color-adjusted, or re-encoded, the fingerprint survives. We call this Vault DNA.",
      points: [
        "Works on images, video, audio, and written content",
        "Survives edits, crops, filters, and re-encoding",
        "Forensic-grade accuracy — 99.7% detection rate",
        "Embeds in under 2 seconds per asset",
      ],
    },
    monitor: {
      icon: Globe,
      title: "Vault Monitoring",
      headline: "We watch the entire internet so you don't have to.",
      body: "Our AI crawls billions of web pages, social platforms, marketplaces, and dark web sources continuously. The moment a match is found — whether it's your photo on a stock site, your video on a competitor's page, or your likeness being used without consent — you're alerted instantly.",
      points: [
        "Real-time scanning across 500M+ web sources",
        "Social media, marketplaces, and dark web coverage",
        "Instant push notifications on detection",
        "Detailed match reports with evidence capture",
      ],
    },
    respond: {
      icon: Zap,
      title: "Vault Response",
      headline: "From detection to takedown in hours, not weeks.",
      body: "When a threat is detected, Vault Response kicks in automatically. Our system generates legally compliant DMCA takedown notices, submits them to platforms, tracks their status, and escalates to our legal team if needed. You get a real-time case dashboard — no chasing, no paperwork.",
      points: [
        "Automated DMCA takedown generation and submission",
        "Platform-specific escalation protocols",
        "Real-time case status dashboard",
        "Legal escalation support for Elite members",
      ],
    },
  };

  const activeData = HOW_IT_WORKS[activeTab];
  const ActiveIcon = activeData.icon;

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
      <SiteHeader />

      <style>{`
        @keyframes float-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 50px rgba(124,58,237,0.7); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
        @keyframes slide-right {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>

      <main>
        {/* ── Hero ── */}
        <section
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, #000000 0%, #0A0A1A 40%, #0D0020 70%, #000000 100%)",
          }}
        >
          {/* Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Glow orb */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative z-10 container max-w-5xl mx-auto px-6 py-24 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(167,139,250,0.3)",
                animation: "float-up 0.6s ease-out",
              }}
            >
              <Shield size={14} style={{ color: "#A78BFA" }} />
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "#A78BFA",
                  textTransform: "uppercase",
                }}
              >
                The Science of Content Protection
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(36px, 7vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: "24px",
                animation: "float-up 0.6s ease-out 0.1s both",
              }}
            >
              How Senota Vault
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Protects What's Yours
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#8080B0",
                maxWidth: "580px",
                margin: "0 auto 48px",
                lineHeight: 1.7,
                animation: "float-up 0.6s ease-out 0.2s both",
              }}
            >
              A deep dive into the AI-powered technology, real-time monitoring, and automated response systems that keep your creative work safe.
            </p>

            {/* Animated stats */}
            <div
              className="flex flex-wrap justify-center gap-10"
              style={{ animation: "float-up 0.6s ease-out 0.3s both" }}
            >
              {[
                { value: 14200000, suffix: "+", label: "Threats Blocked" },
                { value: 50000, suffix: "+", label: "Creators Protected" },
                { value: 500, suffix: "M+", label: "Sources Monitored" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "clamp(24px, 4vw, 36px)",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#6060A0",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "48px", animation: "float-up 0.6s ease-out 0.4s both" }}>
              <ChevronDown size={24} style={{ color: "#3030A0", margin: "0 auto", display: "block" }} />
            </div>
          </div>
        </section>

        {/* ── The Problem ── */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #000000 0%, #0A0A1A 100%)",
          }}
        >
          <div className="container max-w-5xl mx-auto">
            <div
              ref={(el) => observe("problem-header", el)}
              className="text-center mb-14 transition-all duration-700"
              style={{
                opacity: visible.has("problem-header") ? 1 : 0,
                transform: visible.has("problem-header") ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                <AlertTriangle size={13} style={{ color: "#EF4444" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#EF4444", textTransform: "uppercase" }}>
                  The Problem
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                  color: "#FFFFFF",
                }}
              >
                Content theft is a $1.2B problem
                <br />
                <span style={{ color: "#8080B0", fontWeight: 400, fontSize: "0.7em" }}>that most creators face alone.</span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "17px",
                  color: "#8080B0",
                  maxWidth: "560px",
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Every day, creators lose revenue, reputation, and control over their work. Traditional copyright enforcement is slow, expensive, and exhausting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: FileWarning,
                  stat: "1 in 3",
                  label: "Creators experience content theft monthly",
                  color: "#EF4444",
                },
                {
                  icon: Clock,
                  stat: "47 days",
                  label: "Average time to resolve a DMCA claim manually",
                  color: "#F59E0B",
                },
                {
                  icon: TrendingUp,
                  stat: "83%",
                  label: "Of stolen content goes undetected without monitoring",
                  color: "#EF4444",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    ref={(el) => observe(`problem-${i}`, el)}
                    className="transition-all duration-700"
                    style={{
                      opacity: visible.has(`problem-${i}`) ? 1 : 0,
                      transform: visible.has(`problem-${i}`) ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${i * 100}ms`,
                      padding: "28px",
                      background: "rgba(239,68,68,0.04)",
                      border: "1px solid rgba(239,68,68,0.15)",
                      borderRadius: "12px",
                    }}
                  >
                    <Icon size={28} style={{ color: item.color, marginBottom: "16px" }} />
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "36px",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        marginBottom: "8px",
                      }}
                    >
                      {item.stat}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0", lineHeight: 1.6 }}>
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── How It Works (Tabs) ── */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #0A0A1A 0%, #000000 100%)",
          }}
        >
          <div className="container max-w-5xl mx-auto">
            <div
              ref={(el) => observe("how-header", el)}
              className="text-center mb-14 transition-all duration-700"
              style={{
                opacity: visible.has("how-header") ? 1 : 0,
                transform: visible.has("how-header") ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(167,139,250,0.3)" }}
              >
                <Activity size={13} style={{ color: "#A78BFA" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#A78BFA", textTransform: "uppercase" }}>
                  How It Works
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "12px",
                }}
              >
                Three layers of protection.
                <br />
                <span style={{ color: "#8080B0", fontWeight: 400, fontSize: "0.75em" }}>Working together, 24/7.</span>
              </h2>
            </div>

            {/* Tab selector */}
            <div
              className="flex gap-2 mb-10 p-1 rounded-lg"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(124,58,237,0.2)",
                maxWidth: "500px",
                margin: "0 auto 40px",
              }}
            >
              {(["fingerprint", "monitor", "respond"] as const).map((tab) => {
                const labels = { fingerprint: "Fingerprint", monitor: "Monitor", respond: "Respond" };
                const icons = { fingerprint: Fingerprint, monitor: Globe, respond: Zap };
                const Icon = icons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "10px 16px",
                      borderRadius: "6px",
                      background: activeTab === tab ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "transparent",
                      border: "none",
                      color: activeTab === tab ? "#FFFFFF" : "#6060A0",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: activeTab === tab ? 600 : 400,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      boxShadow: activeTab === tab ? "0 0 20px rgba(124,58,237,0.3)" : "none",
                    }}
                  >
                    <Icon size={14} />
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tab content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  }}
                >
                  <ActiveIcon size={26} color="#FFFFFF" />
                </div>

                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.1em",
                    color: "#A78BFA",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  {activeData.title}
                </p>

                <h3
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: "clamp(22px, 3vw, 32px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    lineHeight: 1.2,
                  }}
                >
                  {activeData.headline}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: "#8080B0",
                    lineHeight: 1.8,
                    marginBottom: "24px",
                  }}
                >
                  {activeData.body}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {activeData.points.map((point, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                      <CheckCircle size={16} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#C0C0E0" }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {activeTab === "fingerprint" && <FingerprintDemo />}
                {activeTab === "monitor" && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      borderRadius: "14px",
                      padding: "28px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #7C3AED, #A78BFA, transparent)" }} />
                    <div className="flex items-center gap-3 mb-6">
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#10B981" }}>LIVE MONITORING ACTIVE</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { source: "Instagram", matches: 0, status: "clean" },
                        { source: "TikTok", matches: 0, status: "clean" },
                        { source: "Pinterest", matches: 2, status: "flagged" },
                        { source: "Stock Sites", matches: 0, status: "clean" },
                        { source: "Dark Web", matches: 0, status: "clean" },
                        { source: "Twitter / X", matches: 1, status: "flagged" },
                        { source: "Reddit", matches: 0, status: "clean" },
                        { source: "YouTube", matches: 0, status: "clean" },
                      ].map((row, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 14px",
                            background: row.status === "flagged" ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${row.status === "flagged" ? "rgba(239,68,68,0.2)" : "rgba(124,58,237,0.1)"}`,
                            borderRadius: "6px",
                          }}
                        >
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#C0C0E0" }}>{row.source}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            {row.matches > 0 && (
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#EF4444", background: "rgba(239,68,68,0.1)", padding: "2px 8px", borderRadius: "4px" }}>
                                {row.matches} match{row.matches > 1 ? "es" : ""}
                              </span>
                            )}
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: row.status === "flagged" ? "#EF4444" : "#10B981" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "respond" && (
                  <div
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(124,58,237,0.25)",
                      borderRadius: "14px",
                      padding: "28px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #7C3AED, #A78BFA, transparent)" }} />
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#A78BFA", textTransform: "uppercase", marginBottom: "16px" }}>
                      Response Timeline — Real Case
                    </p>
                    <ThreatTimeline />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Referral Economy ── */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #000000 0%, #0A0A1A 100%)",
          }}
        >
          <div className="container max-w-5xl mx-auto">
            <div
              ref={(el) => observe("referral-header", el)}
              className="text-center mb-14 transition-all duration-700"
              style={{
                opacity: visible.has("referral-header") ? 1 : 0,
                transform: visible.has("referral-header") ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}
              >
                <Star size={13} style={{ color: "#F59E0B" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "#F59E0B", textTransform: "uppercase" }}>
                  The Vault Economy
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "12px",
                }}
              >
                Protect your content.
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #F59E0B, #A78BFA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Earn while you do it.
                </span>
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "17px", color: "#8080B0", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                Vault's referral program turns your network into income. Refer creators, earn commissions, and unlock Vault Credits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Refer a Creator", desc: "Share your unique Vault referral link with another creator.", icon: Users },
                { step: "02", title: "They Join Vault", desc: "They sign up for any Vault membership tier.", icon: Shield },
                { step: "03", title: "Earn 20%", desc: "You earn a 20% commission on their monthly membership.", icon: TrendingUp },
                { step: "04", title: "Unlock Credits", desc: "After your membership is covered, earnings become Vault Credits.", icon: Award },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    ref={(el) => observe(`referral-step-${i}`, el)}
                    className="transition-all duration-700"
                    style={{
                      opacity: visible.has(`referral-step-${i}`) ? 1 : 0,
                      transform: visible.has(`referral-step-${i}`) ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${i * 100}ms`,
                      padding: "24px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "12px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "11px",
                        color: "#3030A0",
                      }}
                    >
                      {item.step}
                    </div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: "rgba(124,58,237,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "14px",
                      }}
                    >
                      <Icon size={20} style={{ color: "#A78BFA" }} />
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", marginBottom: "6px" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section
          style={{
            padding: "100px 24px",
            background: "linear-gradient(135deg, #0A0A1A 0%, #12003A 50%, #0A0A1A 100%)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative z-10 container max-w-3xl mx-auto">
            <div
              ref={(el) => observe("final-cta", el)}
              className="transition-all duration-700"
              style={{
                opacity: visible.has("final-cta") ? 1 : 0,
                transform: visible.has("final-cta") ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 32px",
                  animation: "glow-pulse 2.5s ease-in-out infinite",
                }}
              >
                <Shield size={38} color="#FFFFFF" />
              </div>

              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(28px, 5vw, 52px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  marginBottom: "16px",
                  lineHeight: 1.1,
                }}
              >
                Ready to protect
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  what's yours?
                </span>
              </h2>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "18px",
                  color: "#8080B0",
                  maxWidth: "460px",
                  margin: "0 auto 48px",
                  lineHeight: 1.7,
                }}
              >
                Join 50,000+ creators who trust Senota Vault. Start your 14-day free trial today.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/vault/get-started"
                  className="inline-flex items-center gap-3 px-10 py-5 transition-all"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: "6px",
                    boxShadow: "0 0 40px rgba(124,58,237,0.5)",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 70px rgba(124,58,237,0.8)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.5)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/vault"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "20px 32px",
                    border: "1px solid rgba(167,139,250,0.4)",
                    color: "#A78BFA",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderRadius: "6px",
                    background: "rgba(124,58,237,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.8)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)";
                  }}
                >
                  View Pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
