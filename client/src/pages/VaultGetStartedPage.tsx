/**
 * SENOTA — Vault Get Started
 * A cinematic multi-step onboarding experience for Senota Vault
 * Steps: Choose Plan → Create Account → Activate Protection → Confirmed
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  Shield,
  Fingerprint,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Star,
  Users,
  Award,
  ChevronRight,
  User,
  Mail,
  Building,
  Check,
} from "lucide-react";

/* ── Tier Data ─────────────────────────────────────────────────── */
const TIERS = [
  {
    id: "basic",
    name: "Vault Basic",
    price: 29,
    period: "/month",
    tagline: "Perfect for solo creators just getting started.",
    badge: null,
    color: "#6060A0",
    glowColor: "rgba(96,96,160,0.4)",
    features: [
      "Fake account monitoring",
      "Impersonation alerts",
      "Basic reporting assistance",
      "Creator profile protection",
      "Monthly security report",
    ],
    icon: Shield,
  },
  {
    id: "pro",
    name: "Vault Pro",
    price: 99,
    period: "/month",
    tagline: "For growing teams and serious creators.",
    badge: "Most Popular",
    color: "#7C3AED",
    glowColor: "rgba(124,58,237,0.6)",
    features: [
      "Everything in Basic",
      "Active content monitoring",
      "Unlimited case tracking",
      "Takedown assistance",
      "Stolen content detection",
      "Priority support",
    ],
    icon: Fingerprint,
  },
  {
    id: "elite",
    name: "Vault Elite",
    price: 299,
    period: "/month",
    tagline: "Enterprise-grade protection for high-volume creators.",
    badge: "Best Value",
    color: "#F59E0B",
    glowColor: "rgba(245,158,11,0.4)",
    features: [
      "Everything in Pro",
      "Advanced monitoring",
      "Brand protection",
      "Faster response times",
      "Dedicated account manager",
      "Custom integrations",
    ],
    icon: Award,
  },
];

const PROTECTION_FEATURES = [
  { icon: Fingerprint, label: "Content Fingerprinting", desc: "Invisible signatures embedded in your work" },
  { icon: Globe, label: "Web Monitoring", desc: "Real-time detection across the entire internet" },
  { icon: Zap, label: "Auto Takedowns", desc: "Automated removal requests on your behalf" },
  { icon: Lock, label: "Identity Shield", desc: "Protect your brand from impersonators" },
];

const STEPS = [
  { id: 1, label: "Choose Plan", short: "Plan" },
  { id: 2, label: "Create Account", short: "Account" },
  { id: 3, label: "Payment", short: "Payment" },
  { id: 4, label: "Activate Protection", short: "Activate" },
  { id: 5, label: "You're Protected", short: "Done" },
];

/* ── Particle Background ─────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#7C3AED", "#A78BFA", "#5B21B6", "#60A5FA", "#818CF8"];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.06;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "#7C3AED";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}

/* ── Step 1: Plan Selection ──────────────────────────────────── */
function StepPlan({
  selectedTier,
  onSelect,
  onNext,
}: {
  selectedTier: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div>
      <div className="text-center mb-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <Sparkles size={14} style={{ color: "#A78BFA" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#A78BFA",
              textTransform: "uppercase",
            }}
          >
            Step 1 of 3 — Choose Your Shield
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700,
            marginBottom: "12px",
            color: "#FFFFFF",
          }}
        >
          Select Your Protection Level
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "16px",
            color: "#8080B0",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          Every plan includes a 14-day free trial. No credit card required to start.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {TIERS.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          const isHovered = hovered === tier.id;

          return (
            <div
              key={tier.id}
              className="relative cursor-pointer transition-all duration-300"
              style={{
                transform: isSelected || isHovered ? "translateY(-6px)" : "translateY(0)",
              }}
              onClick={() => onSelect(tier.id)}
              onMouseEnter={() => setHovered(tier.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {tier.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: tier.id === "pro"
                      ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
                      : "linear-gradient(135deg, #F59E0B, #D97706)",
                    color: "#FFFFFF",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    zIndex: 10,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tier.badge}
                </div>
              )}

              <div
                className="p-7 h-full transition-all duration-300"
                style={{
                  background: isSelected
                    ? `rgba(${tier.id === "pro" ? "124,58,237" : tier.id === "elite" ? "245,158,11" : "96,96,160"},0.15)`
                    : "rgba(255,255,255,0.03)",
                  border: isSelected
                    ? `2px solid ${tier.color}`
                    : isHovered
                    ? `1px solid ${tier.color}80`
                    : "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                  boxShadow: isSelected ? `0 0 40px ${tier.glowColor}` : "none",
                }}
              >
                {/* Selection indicator */}
                <div
                  className="flex justify-between items-start mb-5"
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: isSelected
                        ? `linear-gradient(135deg, ${tier.color}, ${tier.color}99)`
                        : "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Icon size={22} style={{ color: isSelected ? "#FFFFFF" : tier.color }} />
                  </div>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      border: isSelected ? `2px solid ${tier.color}` : "2px solid rgba(255,255,255,0.2)",
                      background: isSelected ? tier.color : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isSelected && <Check size={12} color="#FFFFFF" />}
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "17px",
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
                    marginBottom: "16px",
                    lineHeight: 1.5,
                  }}
                >
                  {tier.tagline}
                </p>

                <div style={{ marginBottom: "20px" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "30px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                    }}
                  >
                    ${tier.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#6060A0",
                    }}
                  >
                    {tier.period}
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {tier.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <CheckCircle
                        size={14}
                        style={{
                          color: isSelected ? tier.color : "#4040A0",
                          flexShrink: 0,
                          marginTop: "2px",
                          transition: "color 0.3s ease",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          color: isSelected ? "#C0C0E0" : "#6060A0",
                          transition: "color 0.3s ease",
                        }}
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trial notice */}
      <div
        className="flex items-center justify-center gap-3 mb-8"
        style={{
          padding: "12px 24px",
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: "8px",
          maxWidth: "480px",
          margin: "0 auto 32px",
        }}
      >
        <Shield size={16} style={{ color: "#A78BFA" }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#8080B0",
          }}
        >
          14-day free trial · Cancel anytime · No credit card required
        </span>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedTier}
          className="inline-flex items-center gap-3 px-10 py-4 transition-all duration-300"
          style={{
            background: selectedTier
              ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
              : "rgba(255,255,255,0.05)",
            color: selectedTier ? "#FFFFFF" : "#4040A0",
            border: selectedTier ? "none" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            cursor: selectedTier ? "pointer" : "not-allowed",
            boxShadow: selectedTier ? "0 0 40px rgba(124,58,237,0.4)" : "none",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => {
            if (selectedTier) {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(124,58,237,0.7)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedTier) {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.4)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }
          }}
        >
          Continue with {selectedTier ? TIERS.find((t) => t.id === selectedTier)?.name : "a plan"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* ── Step 2: Account Creation ────────────────────────────────── */
function StepAccount({
  formData,
  onChange,
  onNext,
  onBack,
  selectedTier,
}: {
  formData: Record<string, string>;
  onChange: (key: string, val: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedTier: string | null;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);
  const tier = TIERS.find((t) => t.id === selectedTier);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.password?.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    setIsCreating(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });
      if (signUpError) {
        toast.error("Account creation failed: " + signUpError.message);
        setIsCreating(false);
        return;
      }
      if (!authData.user) {
        toast.error("Account creation failed: No user returned");
        setIsCreating(false);
        return;
      }
      toast.success("Account created! Proceeding to payment...");
      onNext();
    } catch (err: any) {
      toast.error("Error creating account: " + err.message);
      setIsCreating(false);
    }
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.04)",
    border: errors[field] ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(124,58,237,0.25)",
    borderRadius: "6px",
    color: "#FFFFFF",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  });

  const labelStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: "#8080B0",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <User size={14} style={{ color: "#A78BFA" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#A78BFA",
              textTransform: "uppercase",
            }}
          >
            Step 2 of 3 — Create Your Account
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Set Up Your Vault
        </h2>
        {tier && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#8080B0" }}>
            Creating your{" "}
            <span style={{ color: tier.color, fontWeight: 600 }}>{tier.name}</span>{" "}
            account — ${tier.price}/month after your free trial
          </p>
        )}
      </div>

      <div className="max-w-lg mx-auto">
        {/* Name row */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label style={labelStyle}>First Name</label>
            <input
              type="text"
              placeholder="Jane"
              value={formData.firstName || ""}
              onChange={(e) => onChange("firstName", e.target.value)}
              style={inputStyle("firstName")}
              onFocus={(e) => { if (!errors.firstName) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { if (!errors.firstName) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
            {errors.firstName && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={formData.lastName || ""}
              onChange={(e) => onChange("lastName", e.target.value)}
              style={inputStyle("lastName")}
              onFocus={(e) => { if (!errors.lastName) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { if (!errors.lastName) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
            {errors.lastName && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label style={labelStyle}>Email Address</label>
          <div style={{ position: "relative" }}>
            <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#4040A0" }} />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              style={{ ...inputStyle("email"), paddingLeft: "42px" }}
              onFocus={(e) => { if (!errors.email) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { if (!errors.email) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
          </div>
          {errors.email && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Creator handle */}
        <div className="mb-5">
          <label style={labelStyle}>Creator Handle <span style={{ color: "#4040A0", fontWeight: 400 }}>(optional)</span></label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#4040A0", fontFamily: "'DM Sans', sans-serif", fontSize: "14px" }}>@</span>
            <input
              type="text"
              placeholder="yourcreatorname"
              value={formData.handle || ""}
              onChange={(e) => onChange("handle", e.target.value)}
              style={{ ...inputStyle("handle"), paddingLeft: "30px" }}
              onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label style={labelStyle}>Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#4040A0" }} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={formData.password || ""}
              onChange={(e) => onChange("password", e.target.value)}
              style={{ ...inputStyle("password"), paddingLeft: "42px", paddingRight: "42px" }}
              onFocus={(e) => { if (!errors.password) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)"; }}
              onBlur={(e) => { if (!errors.password) (e.target as HTMLElement).style.borderColor = "rgba(124,58,237,0.25)"; }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4040A0" }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>
              {errors.password}
            </p>
          )}
          {/* Password strength */}
          {formData.password && (
            <div style={{ marginTop: "8px", display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4].map((i) => {
                const strength = Math.min(Math.floor(formData.password.length / 3), 4);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "3px",
                      borderRadius: "2px",
                      background: i <= strength
                        ? strength <= 1 ? "#EF4444" : strength <= 2 ? "#F59E0B" : strength <= 3 ? "#10B981" : "#7C3AED"
                        : "rgba(255,255,255,0.1)",
                      transition: "background 0.3s ease",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Terms */}
        <div
          className="flex items-start gap-3 mb-8"
          style={{
            padding: "14px",
            background: "rgba(124,58,237,0.05)",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: "8px",
          }}
        >
          <Shield size={16} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", lineHeight: 1.6 }}>
            By creating an account you agree to Senota's{" "}
            <a href="/privacy" style={{ color: "#A78BFA", textDecoration: "none" }}>Privacy Policy</a>{" "}
            and{" "}
            <a href="/privacy" style={{ color: "#A78BFA", textDecoration: "none" }}>Terms of Service</a>.
            Your 14-day free trial begins immediately.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-4 transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: "#8080B0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 transition-all"
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
            Activate My Vault
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Payment ────────────────────────────────────────── */
function StepPayment({
  onBack,
  selectedTier,
  formData,
}: {
  onBack: () => void;
  selectedTier: string | null;
  formData: Record<string, string>;
}) {
  const tier = TIERS.find((t) => t.id === selectedTier);
  const createSession = trpc.stripe.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      toast.error("Failed to initialize payment: " + err.message);
    },
  });

  const handlePayment = () => {
    if (!selectedTier) return;
    createSession.mutate({ tierId: selectedTier });
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <Lock size={14} style={{ color: "#A78BFA" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#A78BFA",
              textTransform: "uppercase",
            }}
          >
            Step 3 of 5 — Secure Payment
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Complete Your Payment
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#8080B0" }}>
          Secure checkout powered by Stripe. Your first 14 days are free.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Summary card */}
        <div
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                background: "rgba(124,58,237,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard size={20} style={{ color: "#A78BFA" }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                {tier?.name}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", margin: "4px 0 0" }}>
                ${tier?.price}{tier?.period}
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(124,58,237,0.2)", paddingTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0" }}>
                Free Trial
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
                14 days
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0" }}>
                Then billed
              </span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
                ${tier?.price}{tier?.period}
              </span>
            </div>
          </div>
        </div>

        {/* Payment info */}
        <div
          style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
          }}
        >
          <Shield size={16} style={{ color: "#3B82F6", flexShrink: 0, marginTop: "2px" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#8080B0", margin: 0, lineHeight: 1.5 }}>
            Your payment is secured with Stripe. We never store your card details. Cancel anytime.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: "14px 24px",
              background: "rgba(255,255,255,0.05)",
              color: "#A78BFA",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.3)";
            }}
          >
            Back
          </button>
          <button
            onClick={handlePayment}
            disabled={createSession.isPending}
            style={{
              flex: 2,
              padding: "14px 24px",
              background: createSession.isPending ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7C3AED, #5B21B6)",
              color: "#FFFFFF",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              borderRadius: "6px",
              cursor: createSession.isPending ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: createSession.isPending ? "none" : "0 0 30px rgba(124,58,237,0.4)",
              opacity: createSession.isPending ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!createSession.isPending) {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.7)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!createSession.isPending) {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }
            }}
          >
            {createSession.isPending ? "Redirecting to Stripe..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3: Activate Protection ─────────────────────────────── */
function StepActivate({
  onNext,
  onBack,
  selectedTier,
  formData,
}: {
  onNext: () => void;
  onBack: () => void;
  selectedTier: string | null;
  formData: Record<string, string>;
}) {
  const [activating, setActivating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState("");
  const tier = TIERS.find((t) => t.id === selectedTier);

  const tasks = [
    "Initializing your Vault...",
    "Generating content fingerprint...",
    "Activating web monitoring...",
    "Configuring identity shield...",
    "Setting up takedown protocols...",
    "Vault secured.",
  ];

  const createSession = trpc.stripe.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      setActivating(false);
      toast.error("Failed to initialize payment: " + err.message);
    },
  });

  const handleActivate = () => {
    if (!selectedTier) return;
    setActivating(true);
    let step = 0;
    const interval = setInterval(() => {
      if (step < tasks.length - 1) {
        setCurrentTask(tasks[step]);
        setProgress(Math.round((step / (tasks.length - 1)) * 100));
        step++;
      } else {
        clearInterval(interval);
        setCurrentTask("Redirecting to secure payment...");
        setProgress(100);
        createSession.mutate({ tierId: selectedTier });
      }
    }, 600);
  };

  return (
    <div>
      <div className="text-center mb-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <Zap size={14} style={{ color: "#A78BFA" }} />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#A78BFA",
              textTransform: "uppercase",
            }}
          >
            Step 4 of 5 — Activate Protection
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "clamp(26px, 4vw, 40px)",
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          Review & Activate
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#8080B0" }}>
          Confirm your details and launch your protection.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Summary card */}
        <div
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Shield size={20} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>
                {tier?.name}
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#8080B0" }}>
                ${tier?.price}/month · 14-day free trial
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(124,58,237,0.2)", paddingTop: "16px" }}>
            {[
              { label: "Name", value: `${formData.firstName || ""} ${formData.lastName || ""}`.trim() || "—" },
              { label: "Email", value: formData.email || "—" },
              { label: "Handle", value: formData.handle ? `@${formData.handle}` : "Not set" },
            ].map((row) => (
              <div key={row.label} className="flex justify-between items-center mb-3">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0" }}>{row.label}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#FFFFFF", fontWeight: 500 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What gets activated */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#A78BFA",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            What activates immediately
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PROTECTION_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  style={{
                    padding: "12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(124,58,237,0.15)",
                    borderRadius: "8px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <Icon size={16} style={{ color: "#A78BFA", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF", marginBottom: "2px" }}>{f.label}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6060A0" }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activation progress */}
        {activating && (
          <div
            style={{
              padding: "20px",
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "10px",
              marginBottom: "24px",
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#A78BFA" }}>
                {currentTask}
              </span>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#A78BFA" }}>
                {progress}%
              </span>
            </div>
            <div
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.08)",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
                  borderRadius: "2px",
                  transition: "width 0.5s ease",
                  boxShadow: "0 0 10px rgba(124,58,237,0.6)",
                }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            disabled={activating}
            className="inline-flex items-center gap-2 px-6 py-4 transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              color: activating ? "#3030A0" : "#8080B0",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              cursor: activating ? "not-allowed" : "pointer",
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleActivate}
            disabled={activating}
            className="flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 transition-all"
            style={{
              background: activating ? "rgba(124,58,237,0.3)" : "linear-gradient(135deg, #7C3AED, #5B21B6)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              cursor: activating ? "not-allowed" : "pointer",
              boxShadow: activating ? "none" : "0 0 30px rgba(124,58,237,0.4)",
            }}
            onMouseEnter={(e) => {
              if (!activating) {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(124,58,237,0.7)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!activating) {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }
            }}
          >
            {activating ? "Activating..." : "Launch My Vault"}
            {!activating && <Zap size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Step 4: Success ─────────────────────────────────────────── */
function StepSuccess({ selectedTier, formData }: { selectedTier: string | null; formData: Record<string, string> }) {
  const tier = TIERS.find((t) => t.id === selectedTier);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease",
      }}
    >
      {/* Shield animation */}
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 32px",
          boxShadow: "0 0 60px rgba(124,58,237,0.6), 0 0 120px rgba(124,58,237,0.3)",
          animation: "glow-pulse 2s ease-in-out infinite",
        }}
      >
        <Shield size={48} color="#FFFFFF" />
      </div>

      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
        style={{
          background: "rgba(16,185,129,0.1)",
          border: "1px solid rgba(16,185,129,0.3)",
        }}
      >
        <CheckCircle size={14} style={{ color: "#10B981" }} />
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "#10B981",
            textTransform: "uppercase",
          }}
        >
          Vault Active — You're Protected
        </span>
      </div>

      <h2
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontSize: "clamp(28px, 5vw, 48px)",
          fontWeight: 700,
          color: "#FFFFFF",
          marginBottom: "16px",
          lineHeight: 1.1,
        }}
      >
        Welcome to Senota Vault,
        <br />
        <span
          style={{
            background: "linear-gradient(90deg, #A78BFA, #60A5FA)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {formData.firstName || "Creator"}.
        </span>
      </h2>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "17px",
          color: "#8080B0",
          maxWidth: "480px",
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}
      >
        Your <strong style={{ color: "#A78BFA" }}>{tier?.name}</strong> is now active. Your content is being fingerprinted and monitored across the web.
      </p>

      {/* Next steps */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left max-w-2xl mx-auto"
      >
        {[
          { icon: Fingerprint, title: "Upload Content", desc: "Add your first piece of content to fingerprint and protect.", step: "01" },
          { icon: Globe, title: "Set Alerts", desc: "Configure where and how you receive threat notifications.", step: "02" },
          { icon: Users, title: "Invite Your Team", desc: "Add collaborators to manage your protection together.", step: "03" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "10px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ease ${0.2 + i * 0.1}s`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(124,58,237,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} style={{ color: "#A78BFA" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FFFFFF", marginBottom: "4px" }}>{item.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
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
          Go to My Vault
          <ArrowRight size={16} />
        </a>
        <a
          href="/vault"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px 28px",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "#A78BFA",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            textDecoration: "none",
            borderRadius: "6px",
            background: "rgba(124,58,237,0.05)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.6)";
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.3)";
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)";
          }}
        >
          View All Features
        </a>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function VaultGetStartedPage() {
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle return from Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const stepParam = params.get("step");
    
    if (sessionId && stepParam) {
      const targetStep = parseInt(stepParam);
      setStep(targetStep);
      // Clean up URL
      window.history.replaceState({}, document.title, "/vault/get-started");
      toast.success("Payment successful! Activating your protection...");
    }
  }, []);

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const goNext = () => {
    setStep((s) => s + 1);
    scrollToTop();
  };

  const goBack = () => {
    setStep((s) => s - 1);
    scrollToTop();
  };

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
      <SiteHeader />

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(124,58,237,0.3); }
          50% { box-shadow: 0 0 60px rgba(124,58,237,0.8), 0 0 120px rgba(124,58,237,0.5); }
        }
        @keyframes float-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: #3030A0; }
        input:focus { outline: none; }
      `}</style>

      <main>
        {/* Background */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(135deg, #000000 0%, #0A0A1A 40%, #0D0D2B 70%, #000000 100%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            zIndex: 0,
          }}
        />
        <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <ParticleField />
        </div>

        <div className="relative z-10 container max-w-5xl mx-auto px-6 py-16" ref={containerRef}>
          {/* Progress stepper */}
          <div className="flex items-center justify-center mb-16" style={{ animation: "float-up 0.6s ease-out" }}>
            {STEPS.map((s, i) => {
              const isDone = step > s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isDone
                          ? "linear-gradient(135deg, #7C3AED, #5B21B6)"
                          : isCurrent
                          ? "rgba(124,58,237,0.2)"
                          : "rgba(255,255,255,0.05)",
                        border: isDone
                          ? "none"
                          : isCurrent
                          ? "2px solid #7C3AED"
                          : "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        boxShadow: isCurrent ? "0 0 20px rgba(124,58,237,0.4)" : "none",
                      }}
                    >
                      {isDone ? (
                        <Check size={16} color="#FFFFFF" />
                      ) : (
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "12px",
                            color: isCurrent ? "#A78BFA" : "#3030A0",
                            fontWeight: 600,
                          }}
                        >
                          {s.id}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10px",
                        color: isCurrent ? "#A78BFA" : isDone ? "#6060A0" : "#2020A0",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        fontWeight: isCurrent ? 600 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.short}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      style={{
                        width: "clamp(40px, 8vw, 80px)",
                        height: "1px",
                        background: step > s.id
                          ? "linear-gradient(90deg, #7C3AED, #5B21B6)"
                          : "rgba(255,255,255,0.08)",
                        margin: "0 8px",
                        marginBottom: "20px",
                        transition: "background 0.3s ease",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step content */}
          <div style={{ animation: "float-up 0.5s ease-out" }}>
            {step === 1 && (
              <StepPlan
                selectedTier={selectedTier}
                onSelect={setSelectedTier}
                onNext={goNext}
              />
            )}
            {step === 2 && (
              <StepAccount
                formData={formData}
                onChange={handleChange}
                onNext={goNext}
                onBack={goBack}
                selectedTier={selectedTier}
              />
            )}
            {step === 3 && (
              <StepPayment
                onBack={goBack}
                selectedTier={selectedTier}
                formData={formData}
              />
            )}
            {step === 4 && (
              <StepActivate
                onNext={goNext}
                onBack={goBack}
                selectedTier={selectedTier}
                formData={formData}
              />
            )}
            {step === 5 && (
              <StepSuccess selectedTier={selectedTier} formData={formData} />
            )}
          </div>
        </div>
      </main>

      {step < 5 && <SiteFooter />}
    </div>
  );
}
