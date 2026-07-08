/**
 * SENOTA — Vault Member Dashboard
 * Sophisticated "Executive Terminal" aesthetic
 * Minimalist professional design with high-end data visualization
 */

import { useState, useEffect, useRef } from "react";
import {
  Shield,
  AlertTriangle,
  Eye,
  Zap,
  BarChart3,
  HelpCircle,
  LogOut,
  ChevronDown,
  Plus,
  Minus,
  MoreVertical,
  TrendingUp,
  CheckCircle,
  Clock,
  MapPin,
  Globe,
  Lock,
  Fingerprint,
  Activity,
  Settings,
  Bell,
  Home,
  X,
  ArrowUpRight,
  ShieldCheck,
  Search,
} from "lucide-react";

/* ── Sophisticated Theme Constants ────────────────────────────────── */
const COLORS = {
  bg: "#050505",
  surface: "#0D0D0D",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "#808080",
  accent: "#D4AF37", // Muted Gold for luxury feel
  accentSecondary: "#3B82F6", // Muted Blue for professional trust
  success: "#10B981",
  danger: "#EF4444",
};

/* ── Mock Data ────────────────────────────────────────────────── */
const RECENT_DETECTIONS = [
  {
    id: 1,
    title: "Product Campaign - Official image AI",
    source: "example-forum.com",
    location: "New York, USA",
    confidence: 98,
    detected: "2 min ago",
    status: "protected",
  },
  {
    id: 2,
    title: "Product Close-up - Official image 3D",
    source: "image-share.net",
    location: "Frankfurt, Germany",
    confidence: 95,
    detected: "15 min ago",
    status: "reviewing",
  },
  {
    id: 3,
    title: "Lifestyle Shot - Official Image 12C",
    source: "socialhub.io",
    location: "São Paulo, Brazil",
    confidence: 93,
    detected: "32 min ago",
    status: "takedown_initiated",
  },
  {
    id: 4,
    title: "Brand Campaign - Official image 9D",
    source: "unknown-site.org",
    location: "Singapore",
    confidence: 89,
    detected: "1 hr ago",
    status: "pending_review",
  },
];

const DETECTION_TREND = [
  { day: "May 18", count: 120 },
  { day: "May 19", count: 150 },
  { day: "May 20", count: 180 },
  { day: "May 21", count: 140 },
  { day: "May 22", count: 200 },
  { day: "May 23", count: 160 },
  { day: "May 24", count: 220 },
];

const TOP_LEAK_SOURCES = [
  { name: "Social Media", percentage: 42 },
  { name: "Image Sharing", percentage: 28 },
  { name: "Forums", percentage: 17 },
  { name: "Websites", percentage: 13 },
];

const STOLEN_CONTENT_MARKERS = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    city: "New York, USA",
    content: "Product Campaign Image",
    platform: "Pinterest",
    date: "2 hours ago",
    confidence: 98,
    status: "Protected",
  },
  {
    id: 2,
    lat: 51.5074,
    lng: -0.1278,
    city: "London, UK",
    content: "Brand Logo Misuse",
    platform: "Twitter",
    date: "4 hours ago",
    confidence: 92,
    status: "Takedown Sent",
  },
  {
    id: 3,
    lat: 35.6762,
    lng: 139.6503,
    city: "Tokyo, Japan",
    content: "Lifestyle Photography",
    platform: "Instagram",
    date: "6 hours ago",
    confidence: 87,
    status: "Reviewing",
  },
  {
    id: 4,
    lat: -33.8688,
    lng: 151.2093,
    city: "Sydney, Australia",
    content: "Product Mockup",
    platform: "Shopify Store",
    date: "8 hours ago",
    confidence: 95,
    status: "Protected",
  },
];

/* ── Sophisticated Data Visualization ────────────────────────── */
function PerformanceGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto" }}>
      <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
        <circle
          cx="80"
          cy="80"
          r="60"
          fill="none"
          stroke={COLORS.accent}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: "32px", fontWeight: 300, color: "#FFFFFF", margin: 0, letterSpacing: "-0.02em" }}>
          {score}%
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, marginTop: "4px" }}>
          Integrity
        </p>
      </div>
    </div>
  );
}

function TrendLine() {
  const maxCount = Math.max(...DETECTION_TREND.map((d) => d.count));
  const chartHeight = 60;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: `${chartHeight}px`, width: "100%" }}>
      {DETECTION_TREND.map((item, i) => {
        const barHeight = (item.count / maxCount) * chartHeight;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${barHeight}px`,
              background: i === DETECTION_TREND.length - 1 ? COLORS.accent : "rgba(255,255,255,0.1)",
              borderRadius: "1px",
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function VaultMemberDashboard() {
  const [activeTab, setActiveTab] = useState("threat_intelligence");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .nav-button:hover { background: rgba(255,255,255,0.03); color: #FFFFFF; }
        .card:hover { border-color: rgba(255,255,255,0.15); }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "240px",
          background: COLORS.surface,
          borderRight: `1px solid ${COLORS.border}`,
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Brand */}
        <div style={{ padding: "0 8px" }}>
          <p style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.2em", margin: 0, color: COLORS.textPrimary }}>
            SENOTA
          </p>
          <p style={{ fontSize: "9px", color: COLORS.accent, letterSpacing: "0.3em", margin: 0, marginTop: "4px", fontWeight: 500 }}>
            VAULT
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { icon: Activity, label: "Overview", id: "threat_intelligence" },
            { icon: Fingerprint, label: "Signatures", id: "fingerprinting" },
            { icon: Globe, label: "Global Monitor", id: "monitoring" },
            { icon: ShieldCheck, label: "Enforcement", id: "response" },
            { icon: BarChart3, label: "Intelligence", id: "analytics" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="nav-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
                  border: "none",
                  borderRadius: "4px",
                  color: isActive ? "#FFFFFF" : COLORS.textSecondary,
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                }}
              >
                <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ flex: 1 }} />

        {/* User */}
        <div style={{ padding: "0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(45deg, #222, #444)", border: `1px solid ${COLORS.border}` }} />
            <div>
              <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>Everett Williams</p>
              <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>Executive Account</p>
            </div>
          </div>
          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              borderRadius: "4px",
              color: COLORS.textSecondary,
              fontSize: "11px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflow: "auto", padding: "40px 60px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 300, margin: 0, letterSpacing: "-0.02em" }}>Executive Overview</h1>
            <p style={{ fontSize: "14px", color: COLORS.textSecondary, margin: 0, marginTop: "8px" }}>
              Digital asset protection and global risk intelligence.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "4px" }}>
              <Search size={14} color={COLORS.textSecondary} />
              <input 
                placeholder="Search assets..." 
                style={{ background: "transparent", border: "none", color: "#FFF", fontSize: "13px", outline: "none", width: "150px" }}
              />
            </div>
            <button style={{ padding: "8px 20px", background: COLORS.accent, color: "#000", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
              Secure New Asset
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "48px" }}>
          {[
            { label: "Monitored Assets", value: "1,885", trend: "+12.5%" },
            { label: "Active Detections", value: "55", trend: "-4.2%", color: COLORS.danger },
            { label: "Protected Images", value: "2,400", trend: "+8.1%" },
            { label: "Takedown Success", value: "99.7%", trend: "+0.2%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "24px",
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
            >
              <p style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, marginBottom: "12px" }}>
                {stat.label}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <p style={{ fontSize: "24px", fontWeight: 400, margin: 0 }}>{stat.value}</p>
                <p style={{ fontSize: "11px", color: stat.color || COLORS.success, fontWeight: 500, margin: 0 }}>
                  {stat.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Intelligence Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "24px" }}>
          {/* Left Column: Table */}
          <div
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 500, margin: 0 }}>Critical Detections</h3>
              <button style={{ fontSize: "12px", color: COLORS.accent, background: "none", border: "none", cursor: "pointer" }}>View All Report</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                  {["Asset", "Source", "Confidence", "Status"].map((h) => (
                    <th key={h} style={{ padding: "16px 24px", fontSize: "11px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_DETECTIONS.map((row) => (
                  <tr key={row.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.2s ease" }} className="table-row">
                    <td style={{ padding: "20px 24px" }}>
                      <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{row.title}</p>
                      <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: 0, marginTop: "4px" }}>{row.location}</p>
                    </td>
                    <td style={{ padding: "20px 24px", fontSize: "13px", color: COLORS.textSecondary }}>{row.source}</td>
                    <td style={{ padding: "20px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, width: "60px", height: "2px", background: "rgba(255,255,255,0.05)" }}>
                          <div style={{ width: `${row.confidence}%`, height: "100%", background: COLORS.accent }} />
                        </div>
                        <span style={{ fontSize: "11px", color: COLORS.textSecondary }}>{row.confidence}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "20px 24px" }}>
                      <span style={{ 
                        fontSize: "10px", 
                        padding: "4px 10px", 
                        borderRadius: "2px", 
                        background: row.status === "protected" ? "rgba(16,185,129,0.1)" : "rgba(212,175,55,0.1)",
                        color: row.status === "protected" ? COLORS.success : COLORS.accent,
                        textTransform: "uppercase",
                        fontWeight: 600,
                        letterSpacing: "0.05em"
                      }}>
                        {row.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column: Charts */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                padding: "32px",
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "14px", fontWeight: 500, margin: 0, marginBottom: "32px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Security Posture
              </h3>
              <PerformanceGauge score={98} />
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "center", gap: "24px" }}>
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 400, margin: 0 }}>1.2k</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>Scanned</p>
                </div>
                <div style={{ width: "1px", height: "30px", background: COLORS.border }} />
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 400, margin: 0 }}>0</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>Breaches</p>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 500, margin: 0, color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Risk Velocity
                </h3>
                <TrendingUp size={14} color={COLORS.success} />
              </div>
              <TrendLine />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: 0 }}>May 18</p>
                <p style={{ fontSize: "11px", color: COLORS.textPrimary, fontWeight: 600, margin: 0 }}>+18.2% Increase</p>
                <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: 0 }}>Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
