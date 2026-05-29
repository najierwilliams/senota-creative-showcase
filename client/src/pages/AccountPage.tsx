/*
 * SENOTA Account Portal — /account
 *
 * Two states:
 *  1. Not signed in → role selector (Member / VIP / Employee) + Sign In / Create Account / Forgot Password tabs
 *  2. Signed in → account management panel (profile, dashboard link, sign out)
 *
 * Design: matches SENOTA editorial palette
 *   White (#FFFFFF) / Near-Black (#0D0D0D) / Red (#CC0000) / Warm Gray (#F0EEE9)
 *   Fonts: Cormorant Garamond (display), Syne (headings), DM Sans (body), Space Mono (labels)
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { SignIn, SignUp } from "@clerk/clerk-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  UserCircle,
  Crown,
  Briefcase,
  LogOut,
  ExternalLink,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type PortalRole = "member" | "vip" | "employee";
type AuthTab = "signin" | "signup" | "forgot";

interface PortalConfig {
  key: PortalRole;
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  description: string;
  signupNote: string;
}

// ── Portal configs ─────────────────────────────────────────────────────────────

const PORTALS: PortalConfig[] = [
  {
    key: "member",
    label: "Member",
    subtitle: "Customer Portal",
    icon: <UserCircle size={22} strokeWidth={1.5} />,
    accentColor: "#CC0000",
    description:
      "Access your digital magazine library, course enrollments, and purchase history.",
    signupNote:
      "Create a free account to purchase digital issues and enroll in SENOTA Academy courses.",
  },
  {
    key: "vip",
    label: "VIP",
    subtitle: "The Circle",
    icon: <Crown size={22} strokeWidth={1.5} />,
    accentColor: "#8B6914",
    description:
      "Exclusive access to The Circle community, VIP events, member perks, and private content.",
    signupNote:
      "The Circle is invite-only. If you received an invitation, create your account here.",
  },
  {
    key: "employee",
    label: "Employee",
    subtitle: "Staff Portal",
    icon: <Briefcase size={22} strokeWidth={1.5} />,
    accentColor: "#1A1A1A",
    description:
      "Access your training modules, company announcements, and employee resources.",
    signupNote:
      "Employee accounts are created by SENOTA administration. Contact HR if you need access.",
  },
];

// ── Helper: get dashboard path by role ────────────────────────────────────────

function getDashboardPath(role?: string | null) {
  if (role === "circle") return "/dashboard/circle";
  if (role === "employee" || role === "admin") return "/dashboard/employee";
  return "/dashboard/customer";
}

function getRoleLabel(role?: string | null) {
  if (role === "circle") return "The Circle — VIP";
  if (role === "employee") return "Employee";
  if (role === "admin") return "Admin";
  return "Member";
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function PasswordInput({
  value,
  onChange,
  placeholder,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Password"}
        className="w-full border-b bg-transparent outline-none pr-8 pb-2 text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#0D0D0D",
          borderColor: "#D0D0D0",
          fontSize: "14px",
        }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-0 top-0 flex items-center justify-center w-6 h-6 opacity-50 hover:opacity-100 transition-opacity"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
}

// ── Sign In form ───────────────────────────────────────────────────────────────

function SignInForm({
  portal,
  onForgot,
}: {
  portal: PortalConfig;
  onForgot: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex justify-center py-4">
      <SignIn 
        routing="path" 
        path="/account" 
        signUpUrl="/account?tab=signup"
        fallbackRedirectUrl="/account"
        forceRedirectUrl="/account"
        appearance={{
          elements: {
            formButtonPrimary: {
              backgroundColor: portal.accentColor,
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            },
            card: {
              boxShadow: "none",
              border: "none",
              padding: 0,
            },
            headerTitle: {
              display: "none",
            },
            headerSubtitle: {
              display: "none",
            },
            footer: {
              display: "none",
            }
          }
        }}
      />
    </div>
  );
}

// ── Create Account form ────────────────────────────────────────────────────────

function CreateAccountForm({ portal }: { portal: PortalConfig }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Note for VIP / Employee */}
      {(portal.key === "vip" || portal.key === "employee") && (
        <div
          className="px-4 py-3 text-xs"
          style={{
            backgroundColor: "#F0EEE9",
            fontFamily: "'DM Sans', sans-serif",
            color: "#5A5A5A",
            lineHeight: 1.6,
            borderLeft: `3px solid ${portal.accentColor}`,
          }}
        >
          {portal.signupNote}
        </div>
      )}

      <div className="flex justify-center py-4">
        <SignUp 
          routing="virtual" 
          signInUrl="/account?tab=signin"
          fallbackRedirectUrl="/account"
          forceRedirectUrl="/account"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: portal.accentColor,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              },
              card: {
                boxShadow: "none",
                border: "none",
                padding: 0,
              },
              headerTitle: {
                display: "none",
              },
              headerSubtitle: {
                display: "none",
              },
              footer: {
                display: "none",
              }
            }
          }}
        />
      </div>
    </div>
  );
}

// ── Forgot Password form ───────────────────────────────────────────────────────

function ForgotPasswordForm({
  portal,
  onBack,
}: {
  portal: PortalConfig;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p
        className="text-sm"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#5A5A5A",
          lineHeight: 1.6,
        }}
      >
        Click below to securely reset your password via Clerk.
      </p>

      <div className="flex justify-center py-4">
        <SignIn 
          routing="virtual" 
          initialValues={{ emailAddress: "" }}
          fallbackRedirectUrl="/account"
          appearance={{
            elements: {
              formButtonPrimary: {
                backgroundColor: portal.accentColor,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              },
              card: {
                boxShadow: "none",
                border: "none",
                padding: 0,
              },
              headerTitle: {
                display: "none",
              },
              headerSubtitle: {
                display: "none",
              },
              footer: {
                display: "none",
              }
            }
          }}
        />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="text-xs text-center transition-opacity hover:opacity-60"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: "#8A8A8A",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back to Sign In
      </button>
    </div>
  );
}

// ── Signed-in Account Management ───────────────────────────────────────────────

function AccountManagement() {
  const { user, loading, logout } = useAuth();
  const [, navigate] = useLocation();

  // Auto-redirect to dashboard when authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate(getDashboardPath(user.role));
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 p-12 bg-white border border-gray-200 shadow-sm text-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-red-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500 font-medium">Finalizing your secure session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4 p-12 bg-white border border-gray-200 shadow-sm text-center">
        <p className="text-sm text-gray-500 font-medium">We couldn't sync your account. Please try refreshing.</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-xs uppercase tracking-widest text-red-600 font-bold underline"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const dashboardPath = getDashboardPath(user.role);
  const roleLabel = getRoleLabel(user.role);
  const accentColor =
    user.role === "circle"
      ? "#8B6914"
      : user.role === "employee" || user.role === "admin"
      ? "#1A1A1A"
      : "#CC0000";

  return (
    <div className="flex flex-col gap-0">
      {/* Profile card */}
      <div
        className="flex items-center gap-4 p-6"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: "56px",
            height: "56px",
            backgroundColor: accentColor,
          }}
        >
          {user.role === "circle" ? (
            <Crown size={24} style={{ color: "#FFFFFF" }} />
          ) : user.role === "employee" || user.role === "admin" ? (
            <Briefcase size={24} style={{ color: "#FFFFFF" }} />
          ) : (
            <UserCircle size={24} style={{ color: "#FFFFFF" }} />
          )}
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#F7F7F7",
              lineHeight: 1.2,
            }}
          >
            {user.name}
          </p>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              color: accentColor,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: "3px",
            }}
          >
            {roleLabel}
          </p>
          {user.email && (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "#8A8A8A",
                marginTop: "2px",
              }}
            >
              {user.email}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div
        className="flex flex-col"
        style={{ border: "1px solid #E5E7EB", borderTop: "none" }}
      >
        {/* Dashboard link */}
        <button
          onClick={() => navigate(dashboardPath)}
          className="flex items-center justify-between px-6 py-4 transition-colors group"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#0D0D0D",
            background: "none",
            border: "none",
            borderBottom: "1px solid #E5E7EB",
            cursor: "pointer",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#F0EEE9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          <div className="flex items-center gap-3">
            {user.role === "circle" ? (
              <Crown size={16} style={{ color: accentColor }} />
            ) : user.role === "employee" || user.role === "admin" ? (
              <Briefcase size={16} style={{ color: accentColor }} />
            ) : (
              <UserCircle size={16} style={{ color: accentColor }} />
            )}
            <span>My Dashboard</span>
          </div>
          <ExternalLink size={13} style={{ color: "#8A8A8A" }} />
        </button>

        {/* Profile settings */}
        <button
          onClick={() => navigate(dashboardPath)}
          className="flex items-center justify-between px-6 py-4 transition-colors"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#0D0D0D",
            background: "none",
            border: "none",
            borderBottom: "1px solid #E5E7EB",
            cursor: "pointer",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#F0EEE9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          <div className="flex items-center gap-3">
            <Lock size={16} style={{ color: "#8A8A8A" }} />
            <span>Account Settings</span>
          </div>
          <ExternalLink size={13} style={{ color: "#8A8A8A" }} />
        </button>

        {/* Sign out */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-6 py-4 transition-colors"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#CC0000",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#FFF5F5";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { user, loading, isAuthenticated, isSignedIn, isLoaded } = useAuth();
  const [selectedPortal, setSelectedPortal] = useState<PortalRole>("member");
  const [activeTab, setActiveTab] = useState<AuthTab>("signin");

  // Read query params to pre-select portal and tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("portal") as PortalRole | null;
    const t = params.get("tab") as AuthTab | null;
    if (p && ["member", "vip", "employee"].includes(p)) {
      setSelectedPortal(p);
    }
    if (t && ["signin", "signup", "forgot"].includes(t)) {
      setActiveTab(t);
    }
  }, []);

  const portal = PORTALS.find((p) => p.key === selectedPortal)!;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F7F7F7", fontFamily: "'DM Sans', sans-serif" }}
    >
      <SiteHeader />

      <main className="container py-12 md:py-20">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: "'Space Mono', monospace", color: "#CC0000" }}
          >
            SENOTA Studios
          </p>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 52px)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "#0D0D0D",
              lineHeight: 1,
            }}
          >
            Account
          </h1>
          {!isAuthenticated && !loading && (
            <p
              className="mt-3 text-sm max-w-md mx-auto"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "#5A5A5A",
                lineHeight: 1.6,
              }}
            >
              Sign in or create an account to access your SENOTA experience.
            </p>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-16">
            <div
              className="w-6 h-6 border-2 rounded-full animate-spin"
              style={{ borderColor: "#E5E7EB", borderTopColor: "#CC0000" }}
            />
          </div>
        )}

        {/* Signed-in: account management */}
        {isSignedIn && (
          <div className="max-w-md mx-auto">
            <AccountManagement />
          </div>
        )}

        {/* Not signed in: portal selector + auth forms */}
        {!isSignedIn && isLoaded && (
          <div className="max-w-lg mx-auto">
            {/* Portal role selector */}
            <div
              className="flex mb-0"
              style={{ borderBottom: "2px solid #0D0D0D" }}
            >
              {PORTALS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => {
                    setSelectedPortal(p.key);
                    setActiveTab("signin");
                  }}
                  className="flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-colors"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:
                      selectedPortal === p.key ? p.accentColor : "#8A8A8A",
                    backgroundColor:
                      selectedPortal === p.key ? "#FFFFFF" : "transparent",
                    border: "none",
                    borderBottom:
                      selectedPortal === p.key
                        ? `2px solid ${p.accentColor}`
                        : "2px solid transparent",
                    marginBottom: "-2px",
                    cursor: "pointer",
                    transition: "color 0.15s, background-color 0.15s",
                  }}
                >
                  <span style={{ color: selectedPortal === p.key ? p.accentColor : "#C0C0C0" }}>
                    {p.icon}
                  </span>
                  <span>{p.label}</span>
                  <span
                    className="hidden sm:block text-[9px] font-normal tracking-[0.08em]"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      color: selectedPortal === p.key ? "#8A8A8A" : "#C0C0C0",
                    }}
                  >
                    {p.subtitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Auth card */}
            <div
              className="bg-white"
              style={{
                boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
                border: "1px solid #E5E7EB",
                borderTop: "none",
              }}
            >
              {/* Portal description banner */}
              <div
                className="px-6 py-4"
                style={{
                  backgroundColor: "#F0EEE9",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                <p
                  className="text-xs"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#5A5A5A",
                    lineHeight: 1.6,
                  }}
                >
                  {portal.description}
                </p>
              </div>

              {/* Auth tab switcher */}
              <div
                className="flex"
                style={{ borderBottom: "1px solid #E5E7EB" }}
              >
                {(
                  [
                    { key: "signin", label: "Sign In" },
                    { key: "signup", label: "Create Account" },
                    { key: "forgot", label: "Forgot Password" },
                  ] as { key: AuthTab; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 py-3 text-xs transition-colors"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color:
                        activeTab === tab.key ? portal.accentColor : "#8A8A8A",
                      backgroundColor:
                        activeTab === tab.key ? "#FFFFFF" : "#F7F7F7",
                      border: "none",
                      borderBottom:
                        activeTab === tab.key
                          ? `2px solid ${portal.accentColor}`
                          : "2px solid transparent",
                      cursor: "pointer",
                      transition: "color 0.15s, background-color 0.15s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form area */}
              <div className="p-6">
                {activeTab === "signin" && (
                  <SignInForm
                    portal={portal}
                    onForgot={() => setActiveTab("forgot")}
                  />
                )}
                {activeTab === "signup" && (
                  <CreateAccountForm portal={portal} />
                )}
                {activeTab === "forgot" && (
                  <ForgotPasswordForm
                    portal={portal}
                    onBack={() => setActiveTab("signin")}
                  />
                )}
              </div>
            </div>

            {/* Help text */}
            <p
              className="text-center text-xs mt-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#A0A0A0" }}
            >
              Need help?{" "}
              <a
                href="/contact"
                style={{ color: "#CC0000", textDecoration: "underline" }}
              >
                Contact SENOTA Support
              </a>
            </p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
