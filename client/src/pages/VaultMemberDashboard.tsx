import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Fingerprint, 
  Globe, 
  ShieldCheck, 
  ArrowUpRight, 
  Gift, 
  Cpu, 
  User, 
  ChevronRight, 
  Search,
  Download,
  ExternalLink,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Lock,
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Plus
} from "lucide-react";

const COLORS = {
  primary: "#D4AF37", // Gold
  secondary: "#1A1A1A",
  accent: "#D4AF37",
  background: "#0A0A0A",
  surface: "#121212",
  border: "rgba(212,175,55,0.2)",
  text: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.6)",
  success: "#4CAF50",
  warning: "#FFC107",
  danger: "#FF5252",
  info: "#2196F3"
};

export default function VaultMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: COLORS.background, 
      color: COLORS.text,
      fontFamily: "'Inter', sans-serif",
      display: "flex"
    }}>
      {/* Sidebar */}
      <div style={{ 
        width: "280px", 
        background: COLORS.surface, 
        borderRight: `1px solid ${COLORS.border}`,
        padding: "32px 24px",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        height: "100vh"
      }}>
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: 800, 
            letterSpacing: "2px",
            margin: 0,
            color: COLORS.accent,
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <Shield size={24} />
            SENOTA
          </h2>
          <p style={{ 
            fontSize: "10px", 
            color: COLORS.textSecondary, 
            letterSpacing: "4px",
            marginTop: "4px",
            fontWeight: 600
          }}>
            VAULT
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            { icon: Activity, label: "Executive Overview", id: "overview" },
            { icon: Fingerprint, label: "Digital Signatures", id: "signatures" },
            { icon: Globe, label: "Global Monitor", id: "monitoring" },
            { icon: ShieldCheck, label: "Legal Enforcement", id: "enforcement" },
            { icon: ArrowUpRight, label: "Update Tiers", id: "update" },
            { icon: Gift, label: "Referral Program", id: "referrals" },
            { icon: Cpu, label: "Engine", id: "engine", external: true },
            { icon: User, label: "Member Profile", id: "profile" },
          ].map((item: any) => (
            item.external ? (
              <a
                key={item.id}
                href="/vault/engine"
                className="nav-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: COLORS.textSecondary,
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = COLORS.textSecondary;
                }}
              >
                <item.icon size={18} />
                {item.label}
              </a>
            ) : (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="nav-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  border: "none",
                  background: activeTab === item.id ? "rgba(212,175,55,0.08)" : "transparent",
                  color: activeTab === item.id ? COLORS.accent : COLORS.textSecondary,
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textAlign: "left",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            )
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => setActiveTab("secure_asset")}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px",
              borderRadius: "8px",
              border: `1px dashed ${COLORS.border}`,
              background: "rgba(212,175,55,0.03)",
              color: COLORS.accent,
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginBottom: "24px"
            }}
          >
            <Plus size={18} />
            Secure New Asset
          </button>

          <div style={{ 
            padding: "16px", 
            background: "rgba(255,255,255,0.02)", 
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.05)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ 
                width: "32px", 
                height: "32px", 
                borderRadius: "50%", 
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: COLORS.secondary
              }}>
                NW
              </div>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>Najier W.</p>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>Elite Member</p>
              </div>
            </div>
            <button style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: COLORS.danger,
              fontSize: "11px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: 0,
              cursor: "pointer"
            }}>
              <LogOut size={14} />
              Logout Securely
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "48px", overflowY: "auto", maxHeight: "100vh" }}>
        {activeTab === "overview" && <ExecutiveOverview />}
        {activeTab !== "overview" && (
          <div style={{ 
            height: "100%", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center",
            textAlign: "center",
            opacity: 0.5
          }}>
            <Lock size={48} color={COLORS.accent} style={{ marginBottom: "24px" }} />
            <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Section Encrypted</h2>
            <p style={{ fontSize: "14px", color: COLORS.textSecondary }}>This module is currently initializing for your account.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ExecutiveOverview() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, margin: 0, marginBottom: "8px" }}>Executive Overview</h1>
          <p style={{ fontSize: "16px", color: COLORS.textSecondary, margin: 0 }}>Real-time protection status for your creative portfolio.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: COLORS.text,
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Download size={16} />
            Export Report
          </button>
          <button style={{
            padding: "10px 24px",
            borderRadius: "8px",
            background: COLORS.accent,
            border: "none",
            color: COLORS.secondary,
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(212, 175, 55, 0.3)"
          }}>
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "40px" }}>
        <StatCard 
          label="Active Protections" 
          value="142" 
          change="+12" 
          icon={ShieldCheck} 
          color={COLORS.success} 
        />
        <StatCard 
          label="Global Mentions" 
          value="1,842" 
          change="+154" 
          icon={Globe} 
          color={COLORS.info} 
        />
        <StatCard 
          label="Risk Incidents" 
          value="03" 
          change="-2" 
          icon={AlertTriangle} 
          color={COLORS.warning} 
        />
        <StatCard 
          label="Legal Actions" 
          value="08" 
          change="+1" 
          icon={FileText} 
          color={COLORS.accent} 
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <Card title="Recent Activity" subtitle="Last 24 hours of monitoring">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ActivityItem 
              title="Digital Signature Verified" 
              desc="Asset 'Summer Collection 2026' successfully hashed." 
              time="2 mins ago"
              status="success"
            />
            <ActivityItem 
              title="Unauthorized Use Detected" 
              desc="Potential infringement on 'Pinterest' (Domain: pin-save.net)" 
              time="45 mins ago"
              status="warning"
            />
            <ActivityItem 
              title="Legal Notice Dispatched" 
              desc="DMCA sent to hosting provider for 'Artistic Vision #4'." 
              time="3 hours ago"
              status="info"
            />
            <ActivityItem 
              title="Portfolio Sync Complete" 
              desc="All 142 assets synchronized with global database." 
              time="5 hours ago"
              status="success"
            />
          </div>
        </Card>

        <Card title="Security Score" subtitle="Portfolio health index">
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ 
              width: "140px", 
              height: "140px", 
              borderRadius: "50%", 
              border: `8px solid ${COLORS.success}`,
              borderLeftColor: "rgba(255,255,255,0.05)",
              margin: "0 auto 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{ fontSize: "36px", fontWeight: 800 }}>94</span>
              <span style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 600 }}>OPTIMAL</span>
            </div>
            <p style={{ fontSize: "13px", color: COLORS.textSecondary, lineHeight: 1.6 }}>
              Your portfolio security is in the top 5% of all Senota members. 
              <span style={{ color: COLORS.accent, fontWeight: 600, cursor: "pointer", marginLeft: "4px" }}>
                View tips
              </span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, icon: Icon, color }: any) {
  return (
    <div style={{ 
      background: COLORS.surface, 
      padding: "24px", 
      borderRadius: "16px", 
      border: "1px solid rgba(255,255,255,0.05)" 
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div style={{ 
          padding: "10px", 
          borderRadius: "10px", 
          background: `rgba(${color === COLORS.success ? "76,175,80" : color === COLORS.info ? "33,150,243" : color === COLORS.warning ? "255,193,7" : "212,175,55"}, 0.1)`,
          color: color
        }}>
          <Icon size={20} />
        </div>
        <span style={{ 
          fontSize: "12px", 
          fontWeight: 700, 
          color: change.startsWith("+") ? COLORS.success : COLORS.danger,
          background: "rgba(255,255,255,0.03)",
          padding: "4px 8px",
          borderRadius: "4px"
        }}>
          {change}
        </span>
      </div>
      <h3 style={{ fontSize: "28px", fontWeight: 800, margin: "0 0 4px 0" }}>{value}</h3>
      <p style={{ fontSize: "13px", color: COLORS.textSecondary, margin: 0, fontWeight: 500 }}>{label}</p>
    </div>
  );
}

function ActivityItem({ title, desc, time, status }: any) {
  const statusColor = status === "success" ? COLORS.success : status === "warning" ? COLORS.warning : COLORS.info;
  
  return (
    <div style={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ marginTop: "4px" }}>
        {status === "success" ? <CheckCircle2 size={16} color={statusColor} /> : 
         status === "warning" ? <AlertTriangle size={16} color={statusColor} /> : 
         <Clock size={16} color={statusColor} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>{title}</h4>
          <span style={{ fontSize: "11px", color: COLORS.textSecondary }}>{time}</span>
        </div>
        <p style={{ fontSize: "12px", color: COLORS.textSecondary, margin: 0, lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  );
}
