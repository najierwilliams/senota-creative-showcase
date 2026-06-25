/**
 * SENOTA — Vault Member Dashboard
 * A futuristic command center for content protection
 * Real-time threat monitoring, protection status, credits, referrals, and analytics
 */

import { useState, useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Zap,
  Lock,
  Eye,
  Globe,
  Fingerprint,
  Activity,
  BarChart3,
  Clock,
  Copy,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  Maximize2,
  X,
  Play,
  Pause,
} from "lucide-react";

/* ── Live Threat Feed Data ────────────────────────────────────── */
const LIVE_THREATS = [
  {
    id: 1,
    type: "unauthorized_copy",
    platform: "Pinterest",
    severity: "high",
    description: "Your photo detected on unauthorized board",
    timestamp: "2 mins ago",
    status: "detected",
    match: 94,
  },
  {
    id: 2,
    type: "impersonation",
    platform: "Twitter / X",
    severity: "critical",
    description: "Account impersonating your creator profile",
    timestamp: "14 mins ago",
    status: "flagged",
    match: 98,
  },
  {
    id: 3,
    type: "unauthorized_copy",
    platform: "Stock Site",
    severity: "medium",
    description: "Your artwork found on stock photo site",
    timestamp: "1 hour ago",
    status: "takedown_sent",
    match: 87,
  },
  {
    id: 4,
    type: "unauthorized_use",
    platform: "Blog",
    severity: "low",
    description: "Your content cited without attribution",
    timestamp: "3 hours ago",
    status: "resolved",
    match: 76,
  },
  {
    id: 5,
    type: "unauthorized_copy",
    platform: "Instagram",
    severity: "medium",
    description: "Repost detected in competitor account",
    timestamp: "5 hours ago",
    status: "resolved",
    match: 91,
  },
];

const REFERRAL_HISTORY = [
  { name: "Alex Chen", status: "active", joined: "2 weeks ago", commission: "$19.80" },
  { name: "Jordan Mills", status: "active", joined: "3 weeks ago", commission: "$29.70" },
  { name: "Casey Rivera", status: "active", joined: "1 month ago", commission: "$99.00" },
  { name: "Morgan Blake", status: "active", joined: "6 weeks ago", commission: "$149.00" },
  { name: "Taylor Kim", status: "pending", joined: "2 days ago", commission: "$0.00" },
];

const CREDIT_TRANSACTIONS = [
  { type: "earned", amount: 500, description: "Referral commission - Alex Chen signup", date: "Today" },
  { type: "spent", amount: 250, description: "Content Recovery service used", date: "Yesterday" },
  { type: "earned", amount: 750, description: "Referral commission - Jordan Mills signup", date: "3 days ago" },
  { type: "spent", amount: 150, description: "Creator Intelligence report", date: "1 week ago" },
];

/* ── Animated Counter ────────────────────────────────────────── */
function LiveCounter({ value, label, icon: Icon, color }: { value: number; label: string; icon: React.ElementType; color: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = value / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 12px",
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "28px",
          fontWeight: 800,
          color: "#FFFFFF",
          marginBottom: "4px",
        }}
      >
        {displayValue.toLocaleString()}
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
        {label}
      </p>
    </div>
  );
}

/* ── Threat Card ────────────────────────────────────────────── */
function ThreatCard({ threat }: { threat: typeof LIVE_THREATS[0] }) {
  const severityColors = {
    critical: { bg: "rgba(239,68,68,0.1)", border: "rgba(239,68,68,0.3)", badge: "#EF4444" },
    high: { bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)", badge: "#F59E0B" },
    medium: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.25)", badge: "#A78BFA" },
    low: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.25)", badge: "#10B981" },
  };

  const statusColors = {
    detected: "#EF4444",
    flagged: "#F59E0B",
    takedown_sent: "#A78BFA",
    resolved: "#10B981",
  };

  const colors = severityColors[threat.severity as keyof typeof severityColors];

  return (
    <div
      style={{
        padding: "16px",
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: "10px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = colors.border.replace("0.3", "0.6");
        (e.currentTarget as HTMLElement).style.background = colors.bg.replace("0.1", "0.15").replace("0.08", "0.12");
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = colors.border;
        (e.currentTarget as HTMLElement).style.background = colors.bg;
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: colors.badge,
          marginTop: "6px",
          flexShrink: 0,
          animation: threat.status === "detected" ? "pulse 1.5s ease-in-out infinite" : "none",
        }}
      />
      <div style={{ flex: 1 }}>
        <div className="flex items-center gap-2 mb-2">
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {threat.platform}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              background: colors.badge + "20",
              color: colors.badge,
              padding: "2px 8px",
              borderRadius: "4px",
              textTransform: "uppercase",
            }}
          >
            {threat.severity}
          </span>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              color: "#6060A0",
              marginLeft: "auto",
            }}
          >
            {threat.match}% match
          </span>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#C0C0E0",
            marginBottom: "6px",
          }}
        >
          {threat.description}
        </p>
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px",
            color: "#4040A0",
          }}
        >
          {threat.timestamp}
        </p>
      </div>
      <ChevronRight size={16} style={{ color: "#4040A0", flexShrink: 0, marginTop: "4px" }} />
    </div>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function VaultMemberDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "threats" | "referrals" | "credits">("overview");
  const [expandedThreat, setExpandedThreat] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const referralLink = "https://senotastudios.com/vault?ref=USER_ABC123";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>
      <SiteHeader />

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes float-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 50px rgba(124,58,237,0.7); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
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

        <div className="relative z-10 container max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div
            className="flex items-center justify-between mb-10"
            style={{ animation: "float-up 0.6s ease-out" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  }}
                >
                  <Shield size={24} color="#FFFFFF" />
                </div>
                <div>
                  <h1
                    style={{
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                    }}
                  >
                    Vault Dashboard
                  </h1>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#6060A0",
                      margin: 0,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Vault Pro · Active Protection
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  color: "#A78BFA",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                }}
              >
                <RefreshCw size={18} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  color: "#A78BFA",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.2)";
                }}
              >
                <Settings size={18} />
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  border: "none",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 0 20px rgba(124,58,237,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(124,58,237,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.3)";
                }}
              >
                <Download size={14} />
                Export Report
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
            <LiveCounter value={14} label="Active Threats" icon={AlertTriangle} color="#EF4444" />
            <LiveCounter value={847} label="Content Protected" icon={Shield} color="#7C3AED" />
            <LiveCounter value={2340} label="Vault Credits" icon={Award} color="#F59E0B" />
            <LiveCounter value={12} label="Active Referrals" icon={Users} color="#10B981" />
          </div>

          {/* Tab Navigation */}
          <div
            className="flex gap-2 mb-8 p-1 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(124,58,237,0.2)",
              width: "fit-content",
            }}
          >
            {(["overview", "threats", "referrals", "credits"] as const).map((tab) => {
              const labels = { overview: "Overview", threats: "Live Threats", referrals: "Referrals", credits: "Credits" };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "6px",
                    background: activeTab === tab ? "linear-gradient(135deg, #7C3AED, #5B21B6)" : "transparent",
                    border: "none",
                    color: activeTab === tab ? "#FFFFFF" : "#6060A0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: activeTab === tab ? 600 : 400,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Protection Status */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                  animation: "float-up 0.5s ease-out",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      margin: 0,
                    }}
                  >
                    Protection Status
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 14px",
                      background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", animation: "pulse 1.5s ease-in-out infinite" }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#10B981", textTransform: "uppercase" }}>
                      All Systems Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: Fingerprint, label: "Content Fingerprinting", status: "active", uptime: "100%" },
                    { icon: Globe, label: "Web Monitoring", status: "active", uptime: "99.9%" },
                    { icon: Zap, label: "Auto Takedowns", status: "active", uptime: "99.7%" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        style={{
                          padding: "16px",
                          background: "rgba(16,185,129,0.06)",
                          border: "1px solid rgba(16,185,129,0.2)",
                          borderRadius: "8px",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Icon size={16} style={{ color: "#10B981" }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6060A0" }}>
                            {item.status}
                          </span>
                          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#10B981", fontWeight: 600 }}>
                            {item.uptime}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                  animation: "float-up 0.5s ease-out 0.1s both",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Recent Activity
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { action: "Threat detected and flagged", time: "2 mins ago", type: "alert" },
                    { action: "Takedown notice sent to Pinterest", time: "45 mins ago", type: "action" },
                    { action: "New referral signup: Alex Chen", time: "3 hours ago", type: "referral" },
                    { action: "Monthly report generated", time: "1 day ago", type: "report" },
                  ].map((item, i) => {
                    const colors = {
                      alert: { bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.2)", icon: AlertTriangle, color: "#EF4444" },
                      action: { bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.2)", icon: Zap, color: "#A78BFA" },
                      referral: { bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", icon: Users, color: "#10B981" },
                      report: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", icon: BarChart3, color: "#F59E0B" },
                    };
                    const c = colors[item.type as keyof typeof colors];
                    const Icon = c.icon;
                    return (
                      <div
                        key={i}
                        style={{
                          padding: "12px 14px",
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          borderRadius: "8px",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <Icon size={14} style={{ color: c.color, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#C0C0E0", margin: 0 }}>
                            {item.action}
                          </p>
                          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#4040A0", margin: 0 }}>
                            {item.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Live Threats Tab */}
          {activeTab === "threats" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                animation: "float-up 0.5s ease-out",
              }}
            >
              {LIVE_THREATS.map((threat) => (
                <ThreatCard key={threat.id} threat={threat} />
              ))}
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === "referrals" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "float-up 0.5s ease-out" }}>
              {/* Referral Link */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Your Referral Link
                </h3>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "12px",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={copyToClipboard}
                    style={{
                      padding: "12px 16px",
                      background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    {copied ? "Copied!" : <><Copy size={14} /> Copy</>}
                  </button>
                  <button
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      color: "#A78BFA",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Total Referrals", value: "12", icon: Users, color: "#10B981" },
                  { label: "This Month Earnings", value: "$298.50", icon: TrendingUp, color: "#F59E0B" },
                  { label: "Partner Status", value: "12/100", icon: Award, color: "#A78BFA" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      style={{
                        padding: "20px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(124,58,237,0.2)",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon size={16} style={{ color: stat.color }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", textTransform: "uppercase" }}>
                          {stat.label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "28px",
                          fontWeight: 800,
                          color: "#FFFFFF",
                          margin: 0,
                        }}
                      >
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Referral List */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Your Referrals
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {REFERRAL_HISTORY.map((ref, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(124,58,237,0.15)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                          {ref.name}
                        </p>
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#4040A0", margin: 0 }}>
                          {ref.joined}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#10B981", fontWeight: 600, margin: 0 }}>
                            {ref.commission}
                          </p>
                          <p
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "9px",
                              color: ref.status === "active" ? "#10B981" : "#F59E0B",
                              textTransform: "uppercase",
                              margin: 0,
                            }}
                          >
                            {ref.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Credits Tab */}
          {activeTab === "credits" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", animation: "float-up 0.5s ease-out" }}>
              {/* Credit Balance */}
              <div
                style={{
                  padding: "28px",
                  background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(91,33,182,0.08))",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "#A78BFA",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Available Vault Credits
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    margin: 0,
                    marginBottom: "8px",
                  }}
                >
                  2,340
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#8080B0",
                    margin: 0,
                  }}
                >
                  Earn more by referring creators or complete premium services
                </p>
              </div>

              {/* Credit Marketplace Preview */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  What You Can Buy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Content Recovery", credits: "500", desc: "Rapid removal of stolen content" },
                    { name: "Creator Intelligence", credits: "750", desc: "Deep-dive reputation analysis" },
                    { name: "Premium AI Tools", credits: "1000", desc: "Advanced detection & monitoring" },
                    { name: "Reputation Protection", credits: "1500", desc: "Full brand protection suite" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "16px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(124,58,237,0.15)",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.15)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                          {item.name}
                        </p>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "11px",
                            background: "rgba(124,58,237,0.2)",
                            color: "#A78BFA",
                            padding: "4px 10px",
                            borderRadius: "4px",
                            fontWeight: 600,
                          }}
                        >
                          {item.credits}
                        </span>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#6060A0", margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction History */}
              <div
                style={{
                  padding: "24px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "12px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    marginBottom: "16px",
                    margin: 0,
                  }}
                >
                  Transaction History
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {CREDIT_TRANSACTIONS.map((tx, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "14px 16px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(124,58,237,0.15)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: tx.type === "earned" ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {tx.type === "earned" ? (
                            <ArrowUp size={16} style={{ color: "#10B981" }} />
                          ) : (
                            <ArrowDown size={16} style={{ color: "#A78BFA" }} />
                          )}
                        </div>
                        <div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
                            {tx.description}
                          </p>
                          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#4040A0", margin: 0 }}>
                            {tx.date}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          fontWeight: 700,
                          color: tx.type === "earned" ? "#10B981" : "#A78BFA",
                          margin: 0,
                        }}
                      >
                        {tx.type === "earned" ? "+" : "-"}{tx.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
