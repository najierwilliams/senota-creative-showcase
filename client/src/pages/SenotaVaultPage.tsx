/*
 * SENOTA — Senota Vault
 * Design: Apple-style scroll interactivity with dark futuristic aesthetic
 * Features: Scroll-triggered animations, pulsating background shield, immersive hero
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Shield,
  Fingerprint,
  Globe,
  Zap,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Lock,
  Award,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

/* ── Membership tier data ─────────────────────────────────────────── */
const TIERS = [
  {
    id: "basic",
    name: "Vault Basic",
    price: "$29",
    period: "/month",
    tagline: "Perfect for individuals and solo creators.",
    recommended: false,
    features: [
      "Fake account monitoring",
      "Impersonation alerts",
      "Basic reporting assistance",
      "Creator profile protection",
      "Monthly security report",
    ],
    cta: "Get Started",
    accentColor: "#7C3AED",
  },
  {
    id: "pro",
    name: "Vault Pro",
    price: "$99",
    period: "/month",
    tagline: "Advanced protection for growing teams and businesses.",
    recommended: true,
    features: [
      "Everything in Basic",
      "Active content monitoring",
      "Unlimited case tracking",
      "Takedown assistance",
      "Stolen content detection",
      "Priority support",
    ],
    cta: "Get Started",
    accentColor: "#8B5CF6",
  },
  {
    id: "elite",
    name: "Vault Elite",
    price: "$299",
    period: "/month",
    tagline: "Custom solutions for large organizations.",
    recommended: false,
    features: [
      "Everything in Pro",
      "Advanced monitoring",
      "Brand protection",
      "Faster response times",
      "Agency / team access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    accentColor: "#6D28D9",
  },
];

/* ── Credit marketplace items ─────────────────────────────────────── */
const CREDITS = [
  {
    credits: "500",
    label: "Content Recovery",
    bundle: "Rapid Removal Bundle",
    items: [
      "Priority takedown requests",
      "Multiple URLs in single request",
      "Escalation tracking & reporting",
    ],
    icon: <Zap size={20} />,
  },
  {
    credits: "750",
    label: "Creator Intelligence",
    bundle: "Creator Threat Report",
    items: [
      "Impersonator network map",
      "Fake account connections",
      "Risk analysis & patterns",
    ],
    icon: <Globe size={20} />,
  },
  {
    credits: "1,000",
    label: "Premium AI Tools",
    bundle: "AI Content Fingerprint",
    items: [
      "Register content fingerprints",
      "Advanced tracking across platforms",
      "Historical archive access",
    ],
    icon: <Fingerprint size={20} />,
  },
  {
    credits: "1,500",
    label: "Reputation Protection",
    bundle: "Digital Reputation Audit",
    items: [
      "Search presence review",
      "Impersonation risk assessment",
      "Fake information monitoring",
    ],
    icon: <Shield size={20} />,
  },
  {
    credits: "2,500",
    label: "Crisis Services",
    bundle: "Creator Emergency Response",
    items: [
      "Priority team response (24/7)",
      "Coordinated removal effort",
      "Legal documentation support",
    ],
    icon: <Lock size={20} />,
  },
];

/* ── Core capabilities ────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    number: "01",
    title: "Vault Fingerprinting",
    subtitle: "UNIQUE. INVISIBLE. PERSISTENT.",
    description:
      "Our advanced fingerprinting embeds a unique, invisible signature into your content — allowing us to detect unauthorized copies, even if edited, cropped, or filtered.",
    bullets: [
      "Resilient to edits, compression & transformations",
      "Works across platforms & file types",
      "Forensic-grade accuracy, unmatched at scale",
    ],
    icon: <Fingerprint size={28} />,
  },
  {
    number: "02",
    title: "Vault Monitoring",
    subtitle: "GLOBAL. REAL-TIME. RELENTLESS.",
    description:
      "We continuously scan billions of sources across the open web, social platforms, and dark web to identify and verify threats in real-time.",
    bullets: [
      "Scans 24/7 across surface, deep & dark web",
      "Real-time detection & instant alerts",
      "Actionable intelligence in one dashboard",
    ],
    icon: <Globe size={28} />,
  },
  {
    number: "03",
    title: "Vault Response",
    subtitle: "AUTOMATED. PRECISE. EFFECTIVE.",
    description:
      "Our automated response system takes down infringing content fast — with proven success rates and complete transparency at every step.",
    bullets: [
      "Automated takedown across all platforms",
      "Verified & validated match accuracy",
      "Full case history & reporting",
    ],
    icon: <Zap size={28} />,
  },
];

/* ── Revenue model rows ───────────────────────────────────────────── */
const REVENUE_ROWS = [
  { stream: "Membership Fees", predictability: "High", purpose: "Core recurring revenue" },
  { stream: "Referral Commissions", predictability: "Medium", purpose: "Customer acquisition cost" },
  { stream: "Credit Marketplace", predictability: "Medium–High", purpose: "Retention & upsell" },
  { stream: "Partner Payouts", predictability: "Medium", purpose: "Celebrity creator incentive" },
];

/* ── Scroll-triggered animation hook ──────────────────────────────── */
function useScrollReveal() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observe = (id: string, element: HTMLElement | null) => {
    if (element && observerRef.current) {
      element.id = id;
      observerRef.current.observe(element);
    }
  };

  return { visibleElements, observe };
}

export default function SenotaVaultPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { visibleElements, observe } = useScrollReveal();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const FAQS = [
    {
      q: "How does the referral commission work?",
      a: "Creators refer other creators and earn a 20% referral commission. Referral earnings first offset your own membership cost. Once your membership is fully covered, you begin earning Vault Credits.",
    },
    {
      q: "What are Vault Credits and how do I earn them?",
      a: "Vault Credits are earned through referrals and can only be spent on exclusive premium add-ons and services in the Credit Marketplace — from rapid content removal bundles to full digital reputation audits.",
    },
    {
      q: "What happens when I reach Partner status?",
      a: "After reaching 100 active referrals, you unlock Partner status: cash commission on top of credits, continued Vault Credits earning, and an official partnership badge.",
    },
    {
      q: "Can I upgrade or downgrade my membership tier?",
      a: "Yes. You can change your tier at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0A0A1A 0%, #0D0D2B 40%, #12003A 70%, #0A0A1A 100%)",
          }}
        >
          {/* Pulsating background shield - Desktop only, positioned right */}
          <div
            className="absolute pointer-events-none hidden lg:block"
            style={{
              top: "50%",
              right: "5%",
              transform: "translateY(-50%)",
              width: "700px",
              height: "700px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
              animation: "breathe 3s ease-in-out infinite",
            }}
          />

          {/* Inner pulsating shield circle - Desktop only */}
          <div
            className="absolute pointer-events-none hidden lg:block"
            style={{
              top: "50%",
              right: "5%",
              transform: "translateY(-50%)",
              width: "480px",
              height: "480px",
              border: "3px solid rgba(124,58,237,0.6)",
              borderRadius: "50%",
              animation: "pulse-ring 2.5s ease-in-out infinite",
            }}
          />

          {/* Shield icon - Desktop only, centered in circles */}
          <div
            className="absolute pointer-events-none hidden lg:flex items-center justify-center"
            style={{
              top: "50%",
              right: "5%",
              transform: "translate(0, -50%)",
              width: "200px",
              height: "200px",
              animation: "scale-in 1s ease-out 0.3s both",
            }}
          >
            <Shield size={100} style={{ color: "#A78BFA" }} strokeWidth={1} />
          </div>

          {/* Mobile version - centered circles and shield */}
          <div
            className="absolute pointer-events-none lg:hidden"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
              animation: "breathe 3s ease-in-out infinite",
            }}
          />

          {/* Mobile inner ring */}
          <div
            className="absolute pointer-events-none lg:hidden"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "220px",
              height: "220px",
              border: "2px solid rgba(124,58,237,0.7)",
              borderRadius: "50%",
              animation: "pulse-ring 2.5s ease-in-out infinite",
            }}
          />

          {/* Mobile shield icon - centered */}
          <div
            className="absolute pointer-events-none lg:hidden flex items-center justify-center"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
              animation: "scale-in 1s ease-out 0.3s both",
            }}
          >
            <Shield size={50} style={{ color: "#A78BFA" }} strokeWidth={1} />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <style>{`
            @keyframes breathe {
              0%, 100% {
                box-shadow: 0 0 80px rgba(124,58,237,0.4), inset 0 0 80px rgba(124,58,237,0.15);
              }
              50% {
                box-shadow: 0 0 150px rgba(124,58,237,0.8), inset 0 0 120px rgba(124,58,237,0.35);
              }
            }
            @keyframes pulse-ring {
              0%, 100% {
                border-color: rgba(124,58,237,0.4);
                box-shadow: 0 0 0 0 rgba(124,58,237,0.3);
              }
              50% {
                border-color: rgba(124,58,237,0.9);
                box-shadow: 0 0 40px 15px rgba(124,58,237,0.25);
              }
            }
            @keyframes float-up {
              0% {
                opacity: 0;
                transform: translateY(40px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes scale-in {
              0% {
                opacity: 0;
                transform: scale(0.95);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}</style>

          <div className="relative z-10 container px-6 py-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: text */}
            <div className="flex-1 max-w-2xl lg:pr-12">
              <div
                style={{
                  animation: "float-up 0.8s ease-out 0.1s both",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 mb-8"
                  style={{
                    border: "1px solid rgba(124,58,237,0.5)",
                    borderRadius: "100px",
                    background: "rgba(124,58,237,0.1)",
                  }}
                >
                  <Shield size={14} style={{ color: "#A78BFA" }} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#A78BFA",
                    }}
                  >
                    AI-Powered Protection for Creators
                  </span>
                </div>
              </div>

              <h1
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(56px, 8vw, 120px)",
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  marginBottom: "16px",
                  animation: "float-up 0.8s ease-out 0.2s both",
                }}
              >
                SENOTA VAULT
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "18px",
                  color: "#A0A0C0",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  maxWidth: "520px",
                  animation: "float-up 0.8s ease-out 0.3s both",
                }}
              >
                The all-in-one content protection platform built for creators.{" "}
                <span style={{ color: "#A78BFA", fontWeight: 600 }}>Powered by AI.</span>{" "}
                Backed by trust.
              </p>

              <div
                className="flex flex-wrap gap-4 mb-12"
                style={{
                  animation: "float-up 0.8s ease-out 0.4s both",
                }}
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 transition-all hover:shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    borderRadius: "4px",
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 50px rgba(124,58,237,0.7)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 30px rgba(124,58,237,0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  Get Started
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center gap-3 px-8 py-4 transition-all"
                  style={{
                    border: "1px solid rgba(167,139,250,0.4)",
                    color: "#A78BFA",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    borderRadius: "4px",
                    background: "rgba(124,58,237,0.05)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(167,139,250,0.8)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(124,58,237,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(167,139,250,0.4)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(124,58,237,0.05)";
                  }}
                >
                  Learn More
                </a>
              </div>

              {/* Stats row */}
              <div
                className="flex flex-wrap gap-8"
                style={{
                  animation: "float-up 0.8s ease-out 0.5s both",
                }}
              >
                {[
                  { value: "14.2M+", label: "Threats detected & blocked" },
                  { value: "99.7%", label: "Accuracy rate across all detections" },
                  { value: "50K+", label: "Creators worldwide" },
                ].map((stat) => (
                  <div key={stat.value}>
                    <p
                      style={{
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "#6060A0",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: spacer for desktop (shield is in background) */}
            <div
              className="flex-shrink-0 hidden lg:block"
              style={{
                width: "320px",
                height: "320px",
              }}
            />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.3em",
                color: "#4040A0",
                textTransform: "uppercase",
              }}
            >
              Scroll to explore
            </span>
            <div
              className="animate-bounce"
              style={{ width: "1px", height: "8px", background: "linear-gradient(to bottom, #7C3AED, transparent)" }}
            />
          </div>
        </section>

        {/* ── FEATURES / CAPABILITIES ───────────────────────────────── */}
        <section
          id="features"
          style={{
            background: "linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6">
            {/* Section header */}
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                style={{
                  border: "1px solid rgba(124,58,237,0.4)",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.08)",
                }}
              >
                <Shield size={12} style={{ color: "#A78BFA" }} />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#A78BFA",
                  }}
                >
                  Senota Vault
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "16px",
                }}
              >
                Protection That{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Works
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#6060A0",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                Three powerful capabilities. One mission: eliminate content theft at scale.
              </p>
            </div>

            {/* Capability cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.number}
                  ref={(el) => observe(`cap-${i}`, el)}
                  className="group relative overflow-hidden p-8 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "8px",
                    opacity: visibleElements.has(`cap-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`cap-${i}`)
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition: "all 0.6s ease-out",
                    transitionDelay: `${i * 100}ms`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(124,58,237,0.6)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(124,58,237,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(124,58,237,0.25)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  {/* Number */}
                  <div
                    className="flex items-center gap-3 mb-6"
                    style={{ color: "#A78BFA" }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        color: "#4040A0",
                      }}
                    >
                      {cap.number}
                    </span>
                    {cap.icon}
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.2em",
                      color: "#A78BFA",
                      marginBottom: "16px",
                      textTransform: "uppercase",
                    }}
                  >
                    {cap.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "#8080B0",
                      lineHeight: 1.7,
                      marginBottom: "20px",
                    }}
                  >
                    {cap.description}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {cap.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#6060A0",
                        }}
                      >
                        <CheckCircle
                          size={13}
                          style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <Shield size={14} style={{ color: "#4040A0" }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "#4040A0",
                  letterSpacing: "0.06em",
                }}
              >
                Trusted by creators, studios, and enterprises worldwide to protect what matters most.
              </span>
            </div>
          </div>
        </section>

        {/* ── MEMBERSHIP TIERS ──────────────────────────────────────── */}
        <section
          id="pricing"
          style={{
            background: "linear-gradient(180deg, #0D0D2B 0%, #0A0A1A 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6">
            {/* Section header */}
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                }}
              >
                Simple pricing.{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Powerful protection.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#6060A0",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                Senota Vault gives you enterprise-grade security and control so you can focus on building what matters.
              </p>
            </div>

            {/* Tier cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.id}
                  ref={(el) => observe(`tier-${i}`, el)}
                  className="relative flex flex-col p-8 transition-all duration-300"
                  style={{
                    background: tier.recommended
                      ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.1))"
                      : "rgba(255,255,255,0.03)",
                    border: tier.recommended
                      ? "1px solid rgba(124,58,237,0.7)"
                      : "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "8px",
                    boxShadow: tier.recommended
                      ? "0 0 40px rgba(124,58,237,0.25)"
                      : "none",
                    opacity: visibleElements.has(`tier-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`tier-${i}`)
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {tier.recommended && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1"
                      style={{
                        background: "linear-gradient(90deg, #7C3AED, #5B21B6)",
                        borderRadius: "100px",
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Recommended
                    </div>
                  )}

                  <div className="mb-6">
                    <h3
                      style={{
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        marginBottom: "4px",
                      }}
                    >
                      {tier.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#6060A0",
                        lineHeight: 1.5,
                      }}
                    >
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span
                      style={{
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                        lineHeight: 1,
                      }}
                    >
                      {tier.price}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        color: "#6060A0",
                      }}
                    >
                      {tier.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#A0A0C0",
                        }}
                      >
                        <CheckCircle
                          size={14}
                          style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/contact"
                    className="block text-center py-4 transition-all"
                    style={{
                      background: tier.recommended
                        ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
                        : "transparent",
                      border: tier.recommended
                        ? "none"
                        : "1px solid rgba(124,58,237,0.4)",
                      color: "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textDecoration: "none",
                      borderRadius: "4px",
                      boxShadow: tier.recommended
                        ? "0 0 20px rgba(124,58,237,0.4)"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!tier.recommended) {
                        (e.currentTarget as HTMLElement).style.background =
                          "rgba(124,58,237,0.15)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(124,58,237,0.7)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!tier.recommended) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(124,58,237,0.4)";
                      }
                    }}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-2 mt-10">
              <Shield size={14} style={{ color: "#4040A0" }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "#4040A0",
                  letterSpacing: "0.06em",
                }}
              >
                Trusted by developers and security teams worldwide
              </span>
            </div>
          </div>
        </section>

        {/* ── REFERRAL PROGRAM ──────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: text */}
              <div
                ref={(el) => observe("referral-text", el)}
                style={{
                  opacity: visibleElements.has("referral-text") ? 1 : 0,
                  transform: visibleElements.has("referral-text")
                    ? "translateX(0)"
                    : "translateX(-40px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                  style={{
                    border: "1px solid rgba(124,58,237,0.4)",
                    borderRadius: "100px",
                    background: "rgba(124,58,237,0.08)",
                  }}
                >
                  <Users size={12} style={{ color: "#A78BFA" }} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#A78BFA",
                    }}
                  >
                    Referral Program
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "16px",
                  }}
                >
                  Creators Refer Creators.
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Everyone Wins.
                  </span>
                </h2>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    color: "#8080B0",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                  }}
                >
                  Earn a <strong style={{ color: "#A78BFA" }}>20% referral commission</strong> on every creator you bring to Senota Vault. Referral earnings first unlock your own free membership — then convert into Vault Credits for premium services.
                </p>

                {/* How it works steps */}
                <div className="flex flex-col gap-4">
                  {[
                    {
                      step: "01",
                      title: "Refer a creator",
                      desc: "Share your unique referral link with fellow creators.",
                    },
                    {
                      step: "02",
                      title: "Earn 20% commission",
                      desc: "Commissions first offset your membership cost.",
                    },
                    {
                      step: "03",
                      title: "Unlock free membership",
                      desc: "5 referrals on Vault Pro = your membership becomes free.",
                    },
                    {
                      step: "04",
                      title: "Earn Vault Credits",
                      desc: "Once membership is covered, all earnings convert to credits.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 flex items-center justify-center"
                        style={{
                          width: "36px",
                          height: "36px",
                          border: "1px solid rgba(124,58,237,0.5)",
                          borderRadius: "50%",
                          background: "rgba(124,58,237,0.1)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "10px",
                            color: "#A78BFA",
                          }}
                        >
                          {s.step}
                        </span>
                      </div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#FFFFFF",
                            marginBottom: "2px",
                          }}
                        >
                          {s.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            color: "#6060A0",
                          }}
                        >
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: example card */}
              <div
                ref={(el) => observe("referral-card", el)}
                style={{
                  opacity: visibleElements.has("referral-card") ? 1 : 0,
                  transform: visibleElements.has("referral-card")
                    ? "translateX(0)"
                    : "translateX(40px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                <div
                  className="p-8"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#A78BFA",
                      marginBottom: "16px",
                    }}
                  >
                    Example: Vault Pro ($99/month)
                  </p>

                  <div className="flex flex-col gap-3 mb-8">
                    {[
                      { referrals: "1 referral", earned: "$19.80 earned" },
                      { referrals: "3 referrals", earned: "$59.40 earned" },
                      {
                        referrals: "5 referrals",
                        earned: "$99 earned → Membership FREE",
                        highlight: true,
                      },
                    ].map((row) => (
                      <div
                        key={row.referrals}
                        className="flex items-center justify-between px-4 py-3"
                        style={{
                          background: row.highlight
                            ? "rgba(124,58,237,0.15)"
                            : "rgba(255,255,255,0.02)",
                          border: row.highlight
                            ? "1px solid rgba(124,58,237,0.5)"
                            : "1px solid rgba(255,255,255,0.05)",
                          borderRadius: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            color: row.highlight ? "#FFFFFF" : "#8080B0",
                            fontWeight: row.highlight ? 600 : 400,
                          }}
                        >
                          {row.referrals}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "12px",
                            color: row.highlight ? "#A78BFA" : "#6060A0",
                            fontWeight: row.highlight ? 600 : 400,
                          }}
                        >
                          {row.earned}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="p-4"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      borderRadius: "4px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "#A0A0C0",
                        lineHeight: 1.6,
                      }}
                    >
                      Once your membership is free, every additional referral earns{" "}
                      <strong style={{ color: "#A78BFA" }}>Vault Credits</strong> — redeemable for premium services in the Credit Marketplace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CREDIT MARKETPLACE ────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(180deg, #0D0D2B 0%, #0A0A1A 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6">
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                style={{
                  border: "1px solid rgba(124,58,237,0.4)",
                  borderRadius: "100px",
                  background: "rgba(124,58,237,0.08)",
                }}
              >
                <Star size={12} style={{ color: "#A78BFA" }} />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#A78BFA",
                  }}
                >
                  Vault Credit Marketplace
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "12px",
                }}
              >
                Spend Credits on{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Premium Services
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#6060A0",
                  maxWidth: "480px",
                  margin: "0 auto",
                }}
              >
                Credits are earned through referrals and can only be spent on exclusive premium add-ons and services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CREDITS.map((item, i) => (
                <div
                  key={item.label}
                  ref={(el) => observe(`credit-${i}`, el)}
                  className="p-6 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "8px",
                    opacity: visibleElements.has(`credit-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`credit-${i}`)
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(124,58,237,0.5)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(124,58,237,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(124,58,237,0.2)";
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div style={{ color: "#A78BFA" }}>{item.icon}</div>
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "11px",
                        color: "#A78BFA",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {item.credits} credits
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      color: "#A78BFA",
                      letterSpacing: "0.06em",
                      marginBottom: "16px",
                    }}
                  >
                    "{item.bundle}"
                  </p>

                  <ul className="flex flex-col gap-2">
                    {item.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: "#6060A0",
                        }}
                      >
                        <CheckCircle
                          size={12}
                          style={{ color: "#7C3AED", flexShrink: 0, marginTop: "2px" }}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER PAYOUT ────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: partner card */}
              <div
                ref={(el) => observe("partner-card", el)}
                className="p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.08))",
                  border: "1px solid rgba(124,58,237,0.4)",
                  borderRadius: "8px",
                  boxShadow: "0 0 60px rgba(124,58,237,0.15)",
                  opacity: visibleElements.has("partner-card") ? 1 : 0,
                  transform: visibleElements.has("partner-card")
                    ? "translateX(0)"
                    : "translateX(-40px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Award size={28} style={{ color: "#A78BFA" }} />
                  <div>
                    <p
                      style={{
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#FFFFFF",
                      }}
                    >
                      Partner Status
                    </p>
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.2em",
                        color: "#A78BFA",
                        textTransform: "uppercase",
                      }}
                    >
                      Official Badge
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#8080B0",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  After reaching <strong style={{ color: "#FFFFFF" }}>100 active referrals</strong>, you unlock Partner status — the highest tier in the Senota Vault ecosystem.
                </p>

                <div className="flex flex-col gap-3">
                  {[
                    { icon: <TrendingUp size={16} />, label: "Cash commission", desc: "On top of credits" },
                    { icon: <Star size={16} />, label: "Vault Credits", desc: "Continued earning" },
                    { icon: <Award size={16} />, label: "Partnership status", desc: "Official badge" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 px-4 py-3"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(124,58,237,0.2)",
                        borderRadius: "4px",
                      }}
                    >
                      <div style={{ color: "#A78BFA" }}>{item.icon}</div>
                      <div>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#FFFFFF",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            color: "#6060A0",
                          }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: text */}
              <div
                ref={(el) => observe("partner-text", el)}
                style={{
                  opacity: visibleElements.has("partner-text") ? 1 : 0,
                  transform: visibleElements.has("partner-text")
                    ? "translateX(0)"
                    : "translateX(40px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                  style={{
                    border: "1px solid rgba(124,58,237,0.4)",
                    borderRadius: "100px",
                    background: "rgba(124,58,237,0.08)",
                  }}
                >
                  <Award size={12} style={{ color: "#A78BFA" }} />
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#A78BFA",
                    }}
                  >
                    Vault Partner Payout
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "16px",
                  }}
                >
                  The{" "}
                  <span
                    style={{
                      background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Partner Advantage
                  </span>
                </h2>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    color: "#8080B0",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  A creator with Partner status can now say: <em style={{ color: "#A0A0C0" }}>"I use Senota Vault. Join through me and protect your brand."</em>
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: "#6060A0",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                  }}
                >
                  They aren't selling a coupon. They're building a protection network.
                </p>

                {/* Revenue model table */}
                <div
                  className="overflow-hidden"
                  style={{
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    className="px-4 py-3"
                    style={{
                      background: "rgba(124,58,237,0.1)",
                      borderBottom: "1px solid rgba(124,58,237,0.2)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#A78BFA",
                      }}
                    >
                      Revenue Model Summary
                    </p>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(124,58,237,0.15)" }}>
                        {["Revenue Stream", "Predictability", "Purpose"].map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3"
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "9px",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "#4040A0",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {REVENUE_ROWS.map((row, i) => (
                        <tr
                          key={row.stream}
                          style={{
                            borderBottom:
                              i < REVENUE_ROWS.length - 1
                                ? "1px solid rgba(124,58,237,0.1)"
                                : "none",
                          }}
                        >
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#FFFFFF",
                            }}
                          >
                            {row.stream}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
                              color: "#8080B0",
                            }}
                          >
                            {row.predictability}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
                              color: "#6060A0",
                            }}
                          >
                            {row.purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(180deg, #0D0D2B 0%, #0A0A1A 100%)",
            padding: "100px 0",
          }}
        >
          <div className="container px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  color: "#6060A0",
                }}
              >
                Everything you need to know about Senota Vault.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  ref={(el) => observe(`faq-${i}`, el)}
                  style={{
                    border: "1px solid rgba(124,58,237,0.25)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    opacity: visibleElements.has(`faq-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`faq-${i}`)
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transition: "all 0.6s ease-out",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors"
                    style={{
                      background:
                        openFaq === i
                          ? "rgba(124,58,237,0.1)"
                          : "rgba(255,255,255,0.02)",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      style={{
                        color: "#A78BFA",
                        flexShrink: 0,
                        transition: "transform 0.2s",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-6 py-5"
                      style={{
                        background: "rgba(124,58,237,0.05)",
                        borderTop: "1px solid rgba(124,58,237,0.15)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          color: "#8080B0",
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0A0A1A 0%, #12003A 50%, #0A0A1A 100%)",
            padding: "120px 0",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 container px-6 text-center">
            <h2
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: "24px",
              }}
            >
              Ready to Protect
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                What's Yours?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                color: "#8080B0",
                maxWidth: "500px",
                margin: "0 auto 48px",
                lineHeight: 1.7,
              }}
            >
              Join thousands of creators who trust Senota Vault to protect their content, identity, and brand.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 transition-all hover:shadow-2xl"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderRadius: "4px",
                  boxShadow: "0 0 40px rgba(124,58,237,0.5)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 70px rgba(124,58,237,0.8)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 40px rgba(124,58,237,0.5)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Get Started Today
                <ArrowRight size={18} />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 px-10 py-5 transition-all"
                style={{
                  border: "1px solid rgba(167,139,250,0.4)",
                  color: "#A78BFA",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  borderRadius: "4px",
                  background: "rgba(124,58,237,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(167,139,250,0.8)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(167,139,250,0.4)";
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.05)";
                }}
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
