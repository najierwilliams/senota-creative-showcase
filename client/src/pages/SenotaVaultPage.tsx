/**
 * SENOTA — Senota Vault
 * Design: Apple-style scroll interactivity with dark futuristic aesthetic
 * Features: Scroll-triggered animations, pulsating background shield, immersive hero
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AIChatBox } from "@/components/AIChatBox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  MessageCircle,
  X,
  Play,
} from "lucide-react";

/* ── Q&A Data for Interactive Chat ──────────────────────────────────── */
const QA_DATA = [
  {
    question: "How does Vault Fingerprinting work?",
    answer: "Vault Fingerprinting embeds a unique, invisible signature into your content. This allows us to detect unauthorized copies across the web, even if they've been edited, cropped, or filtered. Our AI can recognize your content at scale with forensic-grade accuracy.",
  },
  {
    question: "What's included in Vault Pro?",
    answer: "Vault Pro includes everything from Vault Basic, plus active content monitoring, unlimited case tracking, takedown assistance, stolen content detection, and priority support. It's designed for growing teams and creators who need comprehensive protection.",
  },
  {
    question: "How does the referral program work?",
    answer: "Earn a 20% referral commission on every creator you bring to Senota Vault. Your commissions first offset your own membership cost. Once your membership is free, additional referrals convert to Vault Credits that can be spent on premium services.",
  },
  {
    question: "What are Vault Credits?",
    answer: "Vault Credits are earned through referrals and can only be spent on exclusive premium add-ons in our Credit Marketplace. These include services like rapid content removal, creator intelligence reports, AI tools, reputation protection, and crisis response services.",
  },
  {
    question: "How do I reach Partner status?",
    answer: "After reaching 100 active referrals, you unlock Partner status. This gives you cash commissions on top of credits, continued Vault Credits earning, and an official partnership badge. Partners become part of our core creator network.",
  },
  {
    question: "Can I change my membership tier?",
    answer: "Yes! You can upgrade or downgrade your membership tier at any time. Upgrades take effect immediately, while downgrades apply at the next billing cycle. There are no penalties for changing your tier.",
  },
  {
    question: "What's the difference between Basic and Elite?",
    answer: "Vault Basic ($29/mo) is perfect for individuals. Vault Pro ($99/mo) is for growing teams with active monitoring and takedown assistance. Vault Elite ($299/mo) includes advanced monitoring, brand protection, faster response times, and a dedicated account manager.",
  },
  {
    question: "How fast are takedowns processed?",
    answer: "Our automated response system processes takedowns quickly with verified accuracy. Most takedowns are initiated within hours of detection. Vault Pro and Elite members get priority processing and escalation support.",
  },
];

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
  },
  {
    id: "pro",
    name: "Vault Pro",
    price: "$99",
    period: "/month",
    tagline: "For growing teams and serious creators.",
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
  },
  {
    id: "elite",
    name: "Vault Elite",
    price: "$299",
    period: "/month",
    tagline: "For enterprises and high-volume creators.",
    recommended: false,
    features: [
      "Everything in Pro",
      "Advanced monitoring",
      "Brand protection",
      "Faster response times",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
  },
];

const FEATURES = [
  {
    icon: Fingerprint,
    title: "Vault Fingerprinting",
    description: "Embed invisible signatures into your content for forensic-grade detection across the web.",
  },
  {
    icon: Globe,
    title: "Vault Monitoring",
    description: "Real-time alerts when your content is detected or stolen anywhere online.",
  },
  {
    icon: Zap,
    title: "Vault Response",
    description: "Automated takedown requests and crisis management for stolen content.",
  },
];

const CREDITS = [
  { label: "Content Recovery", credits: "500", description: "Rapid removal of stolen content" },
  { label: "Creator Intelligence", credits: "750", description: "Deep-dive reputation analysis" },
  { label: "Premium AI Tools", credits: "1000", description: "Advanced detection & monitoring" },
  { label: "Reputation Protection", credits: "1500", description: "Full brand protection suite" },
  { label: "Crisis Services", credits: "2500", description: "24/7 emergency response team" },
];

const REVENUE_ROWS = [
  { stream: "Referral Commissions", predictability: "High", purpose: "Direct creator earnings" },
  { stream: "Vault Credits", predictability: "Medium", purpose: "Premium service access" },
  { stream: "Partner Payouts", predictability: "High", purpose: "Cash + credits for 100+ referrals" },
];

/* ── Scroll Reveal Hook ─────────────────────────────────────────── */
function useScrollReveal() {
  const [visibleElements, setVisibleElements] = useState(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = (id: string, element: HTMLElement | null) => {
    if (!element) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleElements((prev) => new Set([...prev, entry.target.id]));
            }
          });
        },
        { threshold: 0.1 }
      );
    }
    element.id = id;
    observerRef.current.observe(element);
  };

  return { visibleElements, observe };
}

export default function SenotaVaultPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { visibleElements, observe } = useScrollReveal();
  const [scrollY, setScrollY] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant" | "system"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedQAs, setDisplayedQAs] = useState<typeof QA_DATA>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Display all Q&A options on chat open
  useEffect(() => {
    if (chatOpen && displayedQAs.length === 0) {
      setDisplayedQAs(QA_DATA);
    }
  }, [chatOpen, displayedQAs.length]);

  const handleSendMessage = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Thanks for reaching out! Our team will get back to you shortly about your question regarding Senota Vault.",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuestionClick = (qa: typeof QA_DATA[0]) => {
    // Add question as user message
    setMessages((prev) => [...prev, { role: "user", content: qa.question }]);
    setIsLoading(true);

    // Simulate AI response with the answer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: qa.answer,
        },
      ]);
                  setIsLoading(false);
                  // Keep all Q&A options visible
      }, 800);
      // Don't refresh Q&A options - keep showing all
  };

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
      q: "Can I downgrade my membership?",
      a: "Yes. Downgrades take effect at the next billing cycle. There are no penalties or fees for changing your tier.",
    },
  ];

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            background: "#000000",
          }}
        >
          {/* Starfield background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 20% 50%, rgba(124,58,237,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)",
            }}
          />

          <style>{`
            @keyframes glow-pulse {
              0%, 100% {
                box-shadow: 0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.3);
              }
              50% {
                box-shadow: 0 0 40px rgba(124,58,237,0.8), 0 0 80px rgba(124,58,237,0.5);
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
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(-12px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
            @keyframes bounce {
              0%, 80%, 100% {
                transform: scale(1);
                opacity: 0.8;
              }
              40% {
                transform: scale(1.2);
                opacity: 1;
              }
            }
            @keyframes rotate-slow {
              from {
                transform: rotateZ(0deg);
              }
              to {
                transform: rotateZ(360deg);
              }
            }
            @keyframes pulse-glow {
              0%, 100% {
                filter: drop-shadow(0 0 20px rgba(124,58,237,0.6)) drop-shadow(0 0 40px rgba(59,130,246,0.3));
              }
              50% {
                filter: drop-shadow(0 0 40px rgba(124,58,237,0.8)) drop-shadow(0 0 80px rgba(59,130,246,0.5));
              }
            }
          `}</style>

          <div className="relative z-10 container px-6 py-20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left: text */}
            <div className="flex-1 max-w-2xl flex flex-col items-center lg:items-start">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(167,139,250,0.3)",
                  animation: "float-up 0.8s ease-out",
                }}
              >
                <Shield size={16} style={{ color: "#A78BFA" }} />
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    color: "#A78BFA",
                    textTransform: "uppercase",
                  }}
                >
                  AI-Powered Protection for Creators
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: isMobile ? "clamp(40px, 12vw, 56px)" : "clamp(56px, 9vw, 80px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: "24px",
                  animation: "float-up 0.8s ease-out 0.1s both",
                  color: "#FFFFFF",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                Your Content,<br />
                <span style={{ color: "#7C3AED" }}>Guarded by</span><br />
                <span style={{ color: "#3B82F6" }}>Intelligence.</span>
              </h1>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? "14px" : "15px",
                  color: "#8080A0",
                  maxWidth: "520px",
                  marginBottom: "32px",
                  lineHeight: 1.6,
                  animation: "float-up 0.8s ease-out 0.2s both",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                Senota Vault protects your creative work across the web—detecting theft, enforcing rights, and preserving your value.
              </p>

              <div
                className="flex flex-wrap gap-4 mb-12"
                style={{
                  animation: "float-up 0.8s ease-out 0.3s both",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                <a
                  href="/vault/get-started"
                  className="inline-flex items-center gap-3 px-10 py-4 transition-all relative group"
                  style={{
                    background: "linear-gradient(to right, #7C3AED, #3B82F6)",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: "12px",
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.6)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Button Shine/Glare Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <style>{`
                    @keyframes shimmer {
                      100% { transform: translateX(100%); }
                    }
                  `}</style>
                  Protect My Content
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/vault/learn-more"
                  className="inline-flex items-center gap-3 px-10 py-4 transition-all"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  See How It Works
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <Play size={12} fill="currentColor" />
                  </div>
                </a>
              </div>

            </div>

            {/* Right: Shield with cosmic sphere */}
            <div
              className="flex-1 flex items-center justify-center relative"
              style={{
                animation: "scale-in 1s ease-out 0.2s both",
              }}
            >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: isMobile ? "300px" : "550px",
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                {/* Background glow effects */}
                <div className="absolute w-[150%] h-[150%] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
                <div className="absolute w-[100%] h-[100%] bg-blue-600/10 blur-[100px] rounded-full -z-10" />

                {/* Digital Halo Pedestal */}
                <div 
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    width: isMobile ? "240px" : "400px",
                    height: isMobile ? "60px" : "100px",
                    background: "radial-gradient(ellipse at center, rgba(124,58,237,0.4) 0%, transparent 70%)",
                    transform: "rotateX(75deg)",
                    zIndex: 5,
                  }}
                />
                <div 
                  style={{
                    position: "absolute",
                    bottom: "18%",
                    width: isMobile ? "180px" : "300px",
                    height: isMobile ? "180px" : "300px",
                    border: "2px solid rgba(124,58,237,0.3)",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.4), inset 0 0 40px rgba(124,58,237,0.2)",
                    zIndex: 5,
                  }}
                />
                <div 
                  style={{
                    position: "absolute",
                    bottom: "20%",
                    width: isMobile ? "120px" : "200px",
                    height: isMobile ? "120px" : "200px",
                    border: "1px solid rgba(59,130,246,0.4)",
                    borderRadius: "50%",
                    transform: "rotateX(75deg)",
                    animation: "rotate-slow 10s linear infinite",
                    zIndex: 5,
                  }}
                />

                {/* Shield asset */}
                <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ transform: "translateY(-20px)" }}>
                  <img 
                    src="/aegis-shield-v2.png" 
                    alt="Aegis Shield" 
                    style={{
                      width: "110%",
                      height: "auto",
                      filter: "drop-shadow(0 0 60px rgba(124,58,237,0.5))",
                      animation: "pulse-glow 4s ease-in-out infinite"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side stats */}
          <div
            style={{
              position: "absolute",
              right: "40px",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              animation: "slideIn 1s ease-out 0.6s both",
              zIndex: 20,
            }}
            className="hidden lg:flex"
          >
            {[
              { label: "Threats Detected", value: "14.2M+", icon: TrendingUp },
              { label: "Pieces Protected", value: "2.8M+", icon: Lock },
              { label: "Enforcement Success", value: "99.7%", icon: CheckCircle },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 transition-all hover:translate-x-[-8px]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "16px",
                  width: "240px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <stat.icon size={20} style={{ color: "#7C3AED" }} />
                </div>
                <div>
                  <p style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "#FFFFFF", letterSpacing: "-0.01em" }}>{stat.value}</p>
                  <p style={{ fontSize: "11px", color: "#8080A0", margin: 0, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Bar with Brand Logos */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: 0,
              right: 0,
              padding: "32px",
              textAlign: "center",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.02))",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                color: "#606080",
                marginBottom: "20px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Trusted by creators and brands worldwide
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: isMobile ? "24px" : "60px",
                flexWrap: "wrap",
                opacity: 0.4,
              }}
            >
              {["UNIVERSAL", "SONY", "WARNER BROS.", "ADOBE", "DISNEY", "BBC", "NETFLIX"].map((brand, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {brand}
                </span>
              ))}
            </div>
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
            <ChevronDown size={16} style={{ color: "#4040A0", animation: "float-up 1s ease-in-out infinite" }} />
          </div>
        </section>

        {/* Features Section */}
        <section
          style={{
            padding: isMobile ? "60px 16px" : "80px 24px",
            background: "linear-gradient(180deg, #000000 0%, #0A0A1A 100%)",
          }}
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Protection Features
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8080B0",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                Comprehensive tools to detect, monitor, and respond to content theft.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {FEATURES.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={i}
                    ref={(el) => observe(`feature-${i}`, el)}
                    className="p-6 md:p-8 transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "8px",
                      opacity: visibleElements.has(`feature-${i}`) ? 1 : 0,
                      transform: visibleElements.has(`feature-${i}`) ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${i * 100}ms`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    <Icon size={isMobile ? 28 : 32} style={{ color: "#A78BFA", marginBottom: "16px" }} />
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        color: "#8080B0",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          style={{
            padding: isMobile ? "60px 16px" : "80px 24px",
            background: "linear-gradient(180deg, #0A0A1A 0%, #000000 100%)",
          }}
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Membership Tiers
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8080B0",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                Choose the protection level that fits your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.id}
                  ref={(el) => observe(`tier-${i}`, el)}
                  className="relative transition-all duration-300"
                  style={{
                    opacity: visibleElements.has(`tier-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`tier-${i}`) ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {tier.recommended && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                        color: "#FFFFFF",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      Recommended
                    </div>
                  )}

                  <div
                    className="p-6 md:p-8 h-full transition-all"
                    style={{
                      background: tier.recommended ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.03)",
                      border: tier.recommended ? "2px solid rgba(124,58,237,0.5)" : "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.8)";
                      (e.currentTarget as HTMLElement).style.background = tier.recommended ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = tier.recommended ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.2)";
                      (e.currentTarget as HTMLElement).style.background = tier.recommended ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.03)";
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: 600,
                        marginBottom: "8px",
                      }}
                    >
                      {tier.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "12px" : "13px",
                        color: "#8080B0",
                        marginBottom: "20px",
                      }}
                    >
                      {tier.tagline}
                    </p>

                    <div style={{ marginBottom: "24px" }}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "32px",
                          fontWeight: 700,
                        }}
                      >
                        {tier.price}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#8080B0",
                        }}
                      >
                        {tier.period}
                      </span>
                    </div>

                    <a
                      href={tier.id === "elite" ? "/vault/contact-sales" : "/vault/get-started"}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px 16px",
                        marginBottom: "24px",
                        background: tier.recommended ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "rgba(124,58,237,0.1)",
                        color: tier.recommended ? "#FFFFFF" : "#A78BFA",
                        border: tier.recommended ? "none" : "1px solid rgba(124,58,237,0.3)",
                        borderRadius: "4px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        textDecoration: "none",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        if (tier.recommended) {
                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.6)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {tier.cta}
                    </a>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {tier.features.map((feature, fi) => (
                        <div key={fi} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                          <CheckCircle size={16} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "13px",
                              color: "#8080B0",
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral Section */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #000000 0%, #0A0A1A 100%)",
          }}
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Earn Through Referrals
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8080B0",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Refer creators and earn a 20% commission. Your earnings offset your membership, then convert to Vault Credits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                {[
                  { step: "1", title: "Refer a Creator", desc: "Share your unique referral link" },
                  { step: "2", title: "They Sign Up", desc: "They join Senota Vault" },
                  { step: "3", title: "You Earn 20%", desc: "Commission on their membership" },
                  { step: "4", title: "Unlock Credits", desc: "After membership is covered" },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => observe(`referral-${i}`, el)}
                    className="flex gap-4 mb-6 transition-all duration-300"
                    style={{
                      opacity: visibleElements.has(`referral-${i}`) ? 1 : 0,
                      transform: visibleElements.has(`referral-${i}`) ? "translateY(0)" : "translateY(40px)",
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 600,
                          marginBottom: "4px",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#8080B0",
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                ref={(el) => observe("referral-card", el)}
                className="transition-all duration-300"
                style={{
                  opacity: visibleElements.has("referral-card") ? 1 : 0,
                  transform: visibleElements.has("referral-card") ? "translateY(0)" : "translateY(40px)",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "12px",
                  padding: "32px",
                }}
              >
                <div style={{ marginBottom: "16px" }}>
                  <Users size={32} style={{ color: "#A78BFA" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                >
                  Example: 5 Referrals
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#8080B0",
                    marginBottom: "16px",
                  }}
                >
                  At $99/month Vault Pro:
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0" }}>Total Commission</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#A78BFA" }}>$99/month</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0" }}>Your Membership</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>FREE</span>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid rgba(124,58,237,0.2)",
                      paddingTop: "8px",
                      marginTop: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0" }}>Vault Credits Earned</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#A78BFA" }}>Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credits Marketplace Section */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #0A0A1A 0%, #000000 100%)",
          }}
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Spend Credits on
                </span>{" "}
                Premium Services
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
                    transform: visibleElements.has(`credit-${i}`) ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#A78BFA",
                        background: "rgba(124,58,237,0.1)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {item.credits}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      color: "#8080B0",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Payout Section */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #000000 0%, #0A0A1A 100%)",
          }}
        >
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Partner Payout Model
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8080B0",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                Unlock Partner status at 100 active referrals and start earning cash commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div
                ref={(el) => observe("partner-benefits", el)}
                className="transition-all duration-300"
                style={{
                  opacity: visibleElements.has("partner-benefits") ? 1 : 0,
                  transform: visibleElements.has("partner-benefits") ? "translateY(0)" : "translateY(40px)",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "12px",
                  padding: "32px",
                }}
              >
                <Award size={32} style={{ color: "#A78BFA", marginBottom: "16px" }} />
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  Partner Status Benefits
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    "Cash commissions on top of credits",
                    "Continued Vault Credits earning",
                    "Official partnership badge",
                    "Dedicated partner support",
                    "Early access to new features",
                  ].map((benefit, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <Star size={16} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#8080B0",
                        }}
                      >
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                ref={(el) => observe("partner-table", el)}
                className="transition-all duration-300"
                style={{
                  opacity: visibleElements.has("partner-table") ? 1 : 0,
                  transform: visibleElements.has("partner-table") ? "translateY(0)" : "translateY(40px)",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", minWidth: isMobile ? "500px" : "auto" }}>
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid rgba(124,58,237,0.2)",
                        background: "rgba(124,58,237,0.05)",
                      }}
                    >
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Revenue Stream
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Predictability
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#FFFFFF",
                        }}
                      >
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {REVENUE_ROWS.map((row, i) => (
                      <tr
                        key={row.stream}
                        style={{
                          borderBottom: i < REVENUE_ROWS.length - 1 ? "1px solid rgba(124,58,237,0.1)" : "none",
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 16px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#FFFFFF",
                          }}
                        >
                          {row.stream}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            color: "#8080B0",
                          }}
                        >
                          {row.predictability}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
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

        {/* FAQ Section */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(180deg, #0A0A1A 0%, #000000 100%)",
          }}
        >
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  ref={(el) => observe(`faq-${i}`, el)}
                  className="transition-all duration-300"
                  style={{
                    opacity: visibleElements.has(`faq-${i}`) ? 1 : 0,
                    transform: visibleElements.has(`faq-${i}`) ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${i * 50}ms`,
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: openFaq === i ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.02)",
                      border: openFaq === i ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (openFaq !== i) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (openFaq !== i) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                      }
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        textAlign: "left",
                      }}
                    >
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        color: "#A78BFA",
                        transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        flexShrink: 0,
                      }}
                    />
                  </button>

                  {openFaq === i && (
                    <div
                      style={{
                        padding: "16px",
                        background: "rgba(124,58,237,0.05)",
                        borderLeft: "2px solid rgba(124,58,237,0.3)",
                        borderRadius: "0 0 8px 8px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
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

        {/* Final CTA Section */}
        <section
          style={{
            padding: "80px 24px",
            background: "linear-gradient(135deg, #0A0A1A 0%, #12003A 50%, #0A0A1A 100%)",
            textAlign: "center",
          }}
        >
          <div className="container max-w-3xl mx-auto">
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Ready to Protect Your Content?
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
                href="/vault/get-started"
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
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 70px rgba(124,58,237,0.8)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.5)";
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
        </section>
      </main>

      <SiteFooter />

      {/* AI Chat Button - Fixed bottom-right corner */}
      <button
        onClick={() => {
          setChatOpen(true);
          setMessages([]);
          setDisplayedQAs([]);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center transition-all duration-300"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
          animation: "glow-pulse 3s ease-in-out infinite",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        <MessageCircle size={28} style={{ color: "#FFFFFF" }} />
      </button>

      {/* Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent
          className="!fixed !inset-0 !top-0 !left-0 !w-full !h-full !translate-x-0 !translate-y-0 md:!inset-auto md:!bottom-6 md:!right-6 md:!top-auto md:!w-96 md:!max-h-[600px] md:!translate-x-0 md:!translate-y-0 !flex !flex-col md:!rounded-lg !rounded-none !gap-0 !p-0"
          style={{
            background: "linear-gradient(135deg, #0A0A1A, #0D0D2B)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "0px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            padding: "0px",
          }}
        >
          <DialogHeader
            style={{
              borderBottom: "1px solid rgba(124,58,237,0.2)",
              padding: "16px",
            }}
          >
            <DialogTitle
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              Senota Vault Support
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "#8080B0",
                      textAlign: "center",
                    }}
                  >
                    <p style={{ marginBottom: "8px", fontWeight: 600, color: "#FFFFFF" }}>How can we help?</p>
                    <p>Click a question below or ask us anything about Senota Vault.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 animate-fadeIn"
                      style={{
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        animation: "fadeIn 0.3s ease-out",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "85%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          background: msg.role === "user" ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "rgba(255,255,255,0.08)",
                          border: msg.role === "user" ? "none" : "1px solid rgba(124,58,237,0.3)",
                          color: "#FFFFFF",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2">
                      <div
                        style={{
                          padding: "12px 16px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(124,58,237,0.3)",
                        }}
                      >
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#A78BFA",
                                animation: `bounce 1.4s infinite ${i * 0.2}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Q&A Buttons - Scrollable */}
            <div
              style={{
                borderTop: "1px solid rgba(124,58,237,0.2)",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxHeight: "200px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {displayedQAs.map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuestionClick(qa)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "8px",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "#A78BFA",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    animation: `slideIn 0.4s ease-out ${Math.min(idx * 0.1, 0.4)}s both`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                  }}
                >
                  ❓ {qa.question}
                </button>
              ))}
            </div>

            {/* Text input area */}
            <div
              style={{
                borderTop: "1px solid rgba(124,58,237,0.2)",
                padding: "12px",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type="text"
                placeholder="Ask a question..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                    handleSendMessage((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  outline: "none",
                }}
                onFocus={(e) => {
                  (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.5)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                }}
              />
              <button
                onClick={(e) => {
                  const input = (e.currentTarget as HTMLElement).previousElementSibling as HTMLInputElement;
                  if (input.value.trim()) {
                    handleSendMessage(input.value);
                    input.value = "";
                  }
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: "6px",
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Send
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
