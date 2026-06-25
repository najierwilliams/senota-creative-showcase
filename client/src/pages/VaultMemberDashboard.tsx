/**
 * SENOTA — Vault Member Dashboard
 * Aegis-inspired aesthetic: command center with global threat map, safety gauge, detection trends
 * Sidebar navigation, high-end purple/neon-green color scheme, real-time data visualization
 */

import { useState, useEffect } from "react";
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
} from "lucide-react";

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

const THREAT_LOCATIONS = [
  { x: 20, y: 35, intensity: "high" },
  { x: 50, y: 25, intensity: "high" },
  { x: 75, y: 40, intensity: "medium" },
  { x: 35, y: 60, intensity: "high" },
  { x: 65, y: 70, intensity: "low" },
  { x: 85, y: 55, intensity: "medium" },
  { x: 25, y: 75, intensity: "high" },
  { x: 60, y: 50, intensity: "medium" },
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

/* ── Animated Circular Gauge ────────────────────────────────────── */
function SafetyGauge() {
  const score = 98;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto" }}>
      <svg width="160" height="160" style={{ transform: "rotate(-90deg)" }}>
        {/* Background circle */}
        <circle cx="80" cy="80" r="45" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="8" />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r="45"
          fill="none"
          stroke="#10B981"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
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
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "36px", fontWeight: 800, color: "#FFFFFF", margin: 0 }}>
          {score}%
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#10B981", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
          Safety Score
        </p>
      </div>
    </div>
  );
}

/* ── Global Threat Map ────────────────────────────────────────── */
function GlobalThreatMap() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "280px",
        background: "linear-gradient(135deg, rgba(30,20,80,0.4), rgba(50,30,100,0.3))",
        border: "1px solid rgba(124,58,237,0.3)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* World map background (simplified) */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* Simplified continents outline */}
        <path d="M 15 20 L 25 15 L 30 25 L 20 35 Z" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" />
        <path d="M 40 10 L 55 5 L 60 20 L 50 30 Z" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" />
        <path d="M 65 25 L 85 20 L 90 40 L 75 45 Z" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" />
        <path d="M 20 50 L 40 45 L 45 65 L 25 70 Z" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" />
        <path d="M 60 55 L 80 50 L 85 70 L 70 75 Z" fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.2)" strokeWidth="0.5" />

        {/* Threat hotspots */}
        {THREAT_LOCATIONS.map((loc, i) => {
          const radius = loc.intensity === "high" ? 3 : loc.intensity === "medium" ? 2 : 1.5;
          const color = loc.intensity === "high" ? "#EF4444" : loc.intensity === "medium" ? "#F59E0B" : "#A78BFA";
          return (
            <g key={i}>
              {/* Outer glow */}
              <circle cx={loc.x} cy={loc.y} r={radius * 1.8} fill={color} opacity="0.3" />
              {/* Core */}
              <circle cx={loc.x} cy={loc.y} r={radius} fill={color} opacity="0.9" />
            </g>
          );
        })}
      </svg>

      {/* Map controls */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          zIndex: 10,
        }}
      >
        <button
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#A78BFA",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.2)";
          }}
        >
          <Plus size={16} />
        </button>
        <button
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.4)",
            color: "#A78BFA",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.2)";
          }}
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          zIndex: 10,
        }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#A78BFA", margin: 0, fontWeight: 600 }}>
          Leak Activity
        </p>
        {[
          { label: "High", color: "#EF4444" },
          { label: "Medium", color: "#F59E0B" },
          { label: "Low", color: "#A78BFA" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: item.color,
              }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "#6060A0" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Detection Trend Chart ────────────────────────────────────── */
function DetectionTrendChart() {
  const maxCount = Math.max(...DETECTION_TREND.map((d) => d.count));
  const chartHeight = 80;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: `${chartHeight}px` }}>
      {DETECTION_TREND.map((item, i) => {
        const barHeight = (item.count / maxCount) * chartHeight;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${barHeight}px`,
              background: "linear-gradient(180deg, #A78BFA, #7C3AED)",
              borderRadius: "4px 4px 0 0",
              opacity: 0.8,
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124,58,237,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.8";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            title={`${item.day}: ${item.count} detections`}
          />
        );
      })}
    </div>
  );
}

/* ── Donut Chart ────────────────────────────────────────────── */
function DonutChart() {
  const colors = ["#A78BFA", "#60A5FA", "#10B981", "#F59E0B"];
  let currentAngle = -90;

  return (
    <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto" }}>
      <svg width="140" height="140">
        {TOP_LEAK_SOURCES.map((source, i) => {
          const startAngle = (currentAngle * Math.PI) / 180;
          const sliceAngle = (source.percentage / 100) * 360;
          const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

          const x1 = 70 + 50 * Math.cos(startAngle);
          const y1 = 70 + 50 * Math.sin(startAngle);
          const x2 = 70 + 50 * Math.cos(endAngle);
          const y2 = 70 + 50 * Math.sin(endAngle);

          const largeArc = sliceAngle > 180 ? 1 : 0;

          const pathData = [
            `M 70 70`,
            `L ${x1} ${y1}`,
            `A 50 50 0 ${largeArc} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ");

          currentAngle += sliceAngle;

          return (
            <path
              key={i}
              d={pathData}
              fill={colors[i]}
              opacity="0.8"
              style={{ transition: "opacity 0.2s ease" }}
              onMouseEnter={(e) => {
                (e.currentTarget as SVGElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as SVGElement).style.opacity = "0.8";
              }}
            />
          );
        })}
        {/* Inner circle for donut effect */}
        <circle cx="70" cy="70" r="30" fill="#000000" />
      </svg>
    </div>
  );
}

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function VaultMemberDashboard() {
  const [timeRange, setTimeRange] = useState("7days");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#000000", color: "#FFFFFF" }}>
      <style>{`
        @keyframes float-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 0 50px rgba(124,58,237,0.7); }
        }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "200px",
          background: "linear-gradient(180deg, #0A0A1A 0%, #0D0D2B 100%)",
          borderRight: "1px solid rgba(124,58,237,0.2)",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px",
            background: "rgba(124,58,237,0.1)",
            borderRadius: "10px",
            marginBottom: "8px",
          }}
        >
          <Shield size={24} style={{ color: "#A78BFA" }} />
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
              VAULT
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: "#6060A0", margin: 0 }}>
              SENTINEL
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { icon: AlertTriangle, label: "Threat Intelligence", active: true },
            { icon: Fingerprint, label: "Fingerprinting", active: false },
            { icon: Eye, label: "Monitoring", active: false },
            { icon: Zap, label: "Response", active: false },
            { icon: BarChart3, label: "Analytics", active: false },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 14px",
                  background: item.active ? "rgba(124,58,237,0.2)" : "transparent",
                  border: item.active ? "1px solid rgba(124,58,237,0.4)" : "1px solid transparent",
                  borderRadius: "8px",
                  color: item.active ? "#A78BFA" : "#6060A0",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#A78BFA";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#6060A0";
                  }
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Help & Support */}
        <div
          style={{
            padding: "16px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <HelpCircle size={20} style={{ color: "#A78BFA", margin: "0 auto 8px", display: "block" }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: "4px" }}>
            Need Help?
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "#6060A0", margin: 0, marginBottom: "8px" }}>
            Contact our support team 24/7
          </p>
          <button
            style={{
              width: "100%",
              padding: "6px",
              background: "rgba(124,58,237,0.3)",
              border: "1px solid rgba(124,58,237,0.4)",
              borderRadius: "6px",
              color: "#A78BFA",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.3)";
            }}
          >
            Contact Support
          </button>
        </div>

        {/* User Profile */}
        <div
          style={{
            padding: "12px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 600, color: "#FFFFFF", margin: 0 }}>
              Vault Admin
            </p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", color: "#6060A0", margin: 0 }}>
              admin@vault.io
            </p>
          </div>
          <ChevronDown size={14} style={{ color: "#6060A0" }} />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Header */}
        <div
          style={{
            padding: "24px 32px",
            background: "linear-gradient(90deg, rgba(124,58,237,0.05), rgba(91,33,182,0.03))",
            borderBottom: "1px solid rgba(124,58,237,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: 0,
                marginBottom: "4px",
              }}
            >
              Threat Intelligence
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8080B0", margin: 0 }}>
              Real-time monitoring of unauthorized content leaks and brand risks across the digital landscape.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "6px",
                color: "#A78BFA",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              }}
            >
              <Bell size={14} />
              Notifications
            </button>

            <div
              style={{
                padding: "8px 16px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#A78BFA" }}>Last 7 Days</span>
              <ChevronDown size={14} style={{ color: "#6060A0" }} />
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Global Threat Map */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "12px",
                animation: "float-up 0.6s ease-out",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Globe size={16} style={{ color: "#A78BFA" }} />
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                  Global Threat Map
                </h3>
              </div>
              <GlobalThreatMap />
            </div>

            {/* Recent Detections Table */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "12px",
                animation: "float-up 0.6s ease-out 0.1s both",
              }}
            >
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: "16px" }}>
                Recent Detections
              </h3>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(124,58,237,0.15)" }}>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Detected Content
                      </th>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Source
                      </th>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Location
                      </th>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Match Confidence
                      </th>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Detected At
                      </th>
                      <th
                        style={{
                          padding: "10px 8px",
                          textAlign: "left",
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          color: "#6060A0",
                          fontWeight: 600,
                          textTransform: "uppercase",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_DETECTIONS.map((detection, i) => {
                      const statusColors = {
                        protected: { bg: "rgba(16,185,129,0.1)", text: "#10B981", label: "Protected" },
                        reviewing: { bg: "rgba(124,58,237,0.1)", text: "#A78BFA", label: "Reviewing" },
                        takedown_initiated: { bg: "rgba(124,58,237,0.1)", text: "#A78BFA", label: "Takedown Initiated" },
                        pending_review: { bg: "rgba(245,158,11,0.1)", text: "#F59E0B", label: "Pending Review" },
                      };
                      const sc = statusColors[detection.status as keyof typeof statusColors];

                      return (
                        <tr
                          key={i}
                          style={{
                            borderBottom: "1px solid rgba(124,58,237,0.1)",
                            transition: "background 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.05)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <td style={{ padding: "10px 8px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#C0C0E0" }}>
                            {detection.title}
                          </td>
                          <td style={{ padding: "10px 8px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#A78BFA" }}>
                            {detection.source}
                          </td>
                          <td style={{ padding: "10px 8px", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#C0C0E0" }}>
                            {detection.location}
                          </td>
                          <td style={{ padding: "10px 8px" }}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                              }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  height: "4px",
                                  background: "rgba(255,255,255,0.1)",
                                  borderRadius: "2px",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  style={{
                                    height: "100%",
                                    width: `${detection.confidence}%`,
                                    background: "linear-gradient(90deg, #A78BFA, #10B981)",
                                  }}
                                />
                              </div>
                              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#A78BFA", minWidth: "30px" }}>
                                {detection.confidence}%
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: "10px 8px", fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#6060A0" }}>
                            {detection.detected}
                          </td>
                          <td style={{ padding: "10px 8px" }}>
                            <span
                              style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                background: sc.bg,
                                color: sc.text,
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "9px",
                                borderRadius: "4px",
                                fontWeight: 600,
                                textTransform: "uppercase",
                              }}
                            >
                              {sc.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                style={{
                  marginTop: "16px",
                  padding: "10px 16px",
                  background: "transparent",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "6px",
                  color: "#A78BFA",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                }}
              >
                View All Detections →
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Active Protection Status */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: "12px",
                animation: "float-up 0.6s ease-out 0.2s both",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle size={16} style={{ color: "#10B981" }} />
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                    Active Protection Status
                  </h3>
                </div>
                <a
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "#A78BFA",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  View Protection Rules →
                </a>
              </div>

              <SafetyGauge />

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { icon: Lock, label: "Monitored Assets", value: "1,247" },
                  { icon: AlertTriangle, label: "Active Detections", value: "23" },
                  { icon: Shield, label: "Protected Images", value: "18,956" },
                  { icon: Zap, label: "Takedown Requests", value: "156" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Icon size={14} style={{ color: "#A78BFA" }} />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#C0C0E0" }}>
                          {item.label}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: "16px",
                  padding: "10px",
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: "#10B981" }}>
                  All systems operational
                </span>
              </div>

              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: "#4040A0", marginTop: "8px", margin: 0 }}>
                Last updated: 2 min ago
              </p>
            </div>

            {/* Detection Trend */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "12px",
                animation: "float-up 0.6s ease-out 0.3s both",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                  Detection Trend
                </h3>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#6060A0" }}>7 Days</span>
              </div>

              <DetectionTrendChart />

              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <TrendingUp size={14} style={{ color: "#10B981" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                  1,247
                </span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#8080B0" }}>
                  Total Detections
                </span>
              </div>

              <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                <TrendingUp size={12} style={{ color: "#10B981" }} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", color: "#10B981", fontWeight: 600 }}>
                  +18.2%
                </span>
              </div>
            </div>

            {/* Top Leak Sources */}
            <div
              style={{
                padding: "20px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: "12px",
                animation: "float-up 0.6s ease-out 0.4s both",
              }}
            >
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "#FFFFFF", margin: 0, marginBottom: "20px" }}>
                Top Leak Sources
              </h3>

              <DonutChart />

              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {TOP_LEAK_SOURCES.map((source, i) => {
                  const colors = ["#A78BFA", "#60A5FA", "#10B981", "#F59E0B"];
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: colors[i],
                          }}
                        />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#C0C0E0" }}>
                          {source.name}
                        </span>
                      </div>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                        {source.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <a
                href="#"
                style={{
                  display: "block",
                  marginTop: "16px",
                  padding: "10px 16px",
                  background: "transparent",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: "6px",
                  color: "#A78BFA",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)";
                }}
              >
                View Full Analytics →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
