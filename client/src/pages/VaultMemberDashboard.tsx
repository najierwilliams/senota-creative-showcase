/**
 * SENOTA — Vault Member Dashboard
 * Sophisticated "Executive Terminal" aesthetic
 * High-density intelligence command center
 */

import { useState, useEffect } from "react";
import {
  Shield,
  Fingerprint,
  Globe,
  ShieldCheck,
  BarChart3,
  LogOut,
  Search,
  Activity,
  TrendingUp,
  AlertCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowUpRight,
  ShieldAlert,
  Cpu,
  Database,
  Eye,
  FileText,
  MapPin,
  RefreshCw,
  Plus,
  Home as HomeIcon,
} from "lucide-react";

/* ── Sophisticated Theme Constants ────────────────────────────────── */
const COLORS = {
  bg: "#050505",
  surface: "#121212", // Slightly lighter for contrast
  surfaceHover: "#1A1A1A",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  accent: "#D4AF37", // Muted Gold
  accentSecondary: "#3B82F6", // Professional Blue
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
};

/* ── Components ────────────────────────────────────────────────── */

const Card = ({ children, title, subtitle, extra }: any) => (
  <div
    style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: "12px",
      padding: "24px",
      height: "100%",
      transition: "all 0.3s ease",
    }}
  >
    {(title || extra) && (
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          {title && <h3 style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: COLORS.textPrimary, textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</h3>}
          {subtitle && <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: 0, marginTop: "4px" }}>{subtitle}</p>}
        </div>
        {extra}
      </div>
    )}
    {children}
  </div>
);

const Badge = ({ children, color = COLORS.accent }: any) => (
  <span style={{ 
    fontSize: "9px", 
    padding: "3px 8px", 
    borderRadius: "4px", 
    background: `${color}15`, 
    color: color, 
    fontWeight: 700, 
    textTransform: "uppercase", 
    letterSpacing: "0.05em",
    border: `1px solid ${color}30`
  }}>
    {children}
  </span>
);

/* ── Page Views ────────────────────────────────────────────────── */

const OverviewView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    {/* High-Level Stats */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
      {[
        { label: "Asset Integrity", value: "99.8%", trend: "+0.2%", icon: ShieldCheck, color: COLORS.success },
        { label: "Active Threats", value: "12", trend: "High Risk", icon: ShieldAlert, color: COLORS.danger },
        { label: "Global Monitoring", value: "24/7", trend: "Operational", icon: Globe, color: COLORS.accentSecondary },
        { label: "System Uptime", value: "99.99%", trend: "Stable", icon: Activity, color: COLORS.success },
      ].map((stat, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.03)" }}>
              <stat.icon size={18} color={stat.color} />
            </div>
            <Badge color={stat.color}>{stat.trend}</Badge>
          </div>
          <p style={{ fontSize: "28px", fontWeight: 300, margin: "16px 0 4px" }}>{stat.value}</p>
          <p style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>{stat.label}</p>
        </Card>
      ))}
    </div>

    {/* Intelligence Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
      <Card title="Real-Time Threat Intelligence" subtitle="Live stream of global asset detections" extra={<RefreshCw size={14} color={COLORS.textSecondary} className="animate-spin-slow" />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: COLORS.border, borderRadius: "8px", overflow: "hidden" }}>
          {[
            { asset: "Senota Brand Assets", location: "Beijing, CN", status: "Mitigated", time: "Just now", severity: "Low" },
            { asset: "Official Campaign Video", location: "Moscow, RU", status: "Takedown Sent", time: "2m ago", severity: "High" },
            { asset: "Creative Showcase PDF", location: "Berlin, DE", status: "Reviewing", time: "15m ago", severity: "Medium" },
            { asset: "Identity Signatures", location: "Lagos, NG", status: "Protected", time: "45m ago", severity: "Low" },
            { asset: "Commercial Raw Files", location: "Tokyo, JP", status: "Alert Triggered", time: "1h ago", severity: "High" },
          ].map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", padding: "16px", background: COLORS.surface, alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{item.asset}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                  <MapPin size={10} color={COLORS.textSecondary} />
                  <span style={{ fontSize: "10px", color: COLORS.textSecondary }}>{item.location}</span>
                </div>
              </div>
              <Badge color={item.severity === "High" ? COLORS.danger : item.severity === "Medium" ? COLORS.warning : COLORS.success}>{item.status}</Badge>
              <span style={{ fontSize: "11px", color: COLORS.textSecondary, textAlign: "right" }}>{item.time}</span>
              <div style={{ textAlign: "right" }}><ChevronRight size={14} color={COLORS.textSecondary} /></div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Card title="Security Scorecard" subtitle="Overall protection health">
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto" }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={COLORS.accent} strokeWidth="8" strokeDasharray="339" strokeDashoffset="40" strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <span style={{ fontSize: "24px", fontWeight: 600 }}>88</span>
                <span style={{ fontSize: "10px", color: COLORS.textSecondary }}>A+ Grade</span>
              </div>
            </div>
            <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>2.4k</p>
                <p style={{ fontSize: "9px", color: COLORS.textSecondary, margin: 0 }}>Assets</p>
              </div>
              <div style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
                <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>185</p>
                <p style={{ fontSize: "9px", color: COLORS.textSecondary, margin: 0 }}>Cases</p>
              </div>
            </div>
          </div>
        </Card>
        <Card title="System Alerts" extra={<AlertCircle size={14} color={COLORS.warning} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "12px", borderLeft: `2px solid ${COLORS.warning}`, background: "rgba(245,158,11,0.05)" }}>
              <p style={{ fontSize: "12px", fontWeight: 500, margin: 0 }}>API Key Rotation Due</p>
              <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "4px 0 0" }}>Scheduled in 48 hours</p>
            </div>
            <div style={{ padding: "12px", borderLeft: `2px solid ${COLORS.accentSecondary}`, background: "rgba(59,130,246,0.05)" }}>
              <p style={{ fontSize: "12px", fontWeight: 500, margin: 0 }}>New Global Node Active</p>
              <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "4px 0 0" }}>Node: Singapore-01</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const SignaturesView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
      <Card title="Fingerprint Engine" subtitle="Proprietary AI Signature Technology">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
            <Cpu size={24} color={COLORS.accent} style={{ marginBottom: "16px" }} />
            <h4 style={{ fontSize: "14px", margin: "0 0 8px" }}>Neural Hash Engine</h4>
            <p style={{ fontSize: "11px", color: COLORS.textSecondary, lineHeight: 1.5 }}>Our engine creates a unique 2048-bit neural signature for every asset, resistant to cropping, filtering, and AI manipulation.</p>
          </div>
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
            <Database size={24} color={COLORS.accentSecondary} style={{ marginBottom: "16px" }} />
            <h4 style={{ fontSize: "14px", margin: "0 0 8px" }}>Vault Registry</h4>
            <p style={{ fontSize: "11px", color: COLORS.textSecondary, lineHeight: 1.5 }}>Signatures are permanently anchored to the Vault Registry, providing immutable proof of origin for all your creative works.</p>
          </div>
        </div>
      </Card>
      <Card title="Active Asset Signatures" extra={<Badge color={COLORS.success}>Verified</Badge>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", background: "#222", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={16} color={COLORS.textSecondary} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>Asset_Signature_V{i}_Final.png</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, fontFamily: "monospace", margin: "4px 0 0" }}>SHA-256: 8f2a...{i}e9c</p>
                </div>
              </div>
              <button style={{ padding: "6px 12px", background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: "4px", fontSize: "11px", color: COLORS.textPrimary }}>Verify</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const GlobalMonitorView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <Card title="Global Detection Network" subtitle="Live tracking across 400+ data nodes" extra={<Badge color={COLORS.success}>Live</Badge>}>
      <div style={{ height: "400px", background: "#080808", borderRadius: "12px", position: "relative", overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
        {/* Mock Map Background */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 2px 2px, #333 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        
        {/* Mock Data Nodes */}
        {[
          { top: "30%", left: "20%", city: "San Francisco" },
          { top: "40%", left: "45%", city: "London" },
          { top: "60%", left: "75%", city: "Singapore" },
          { top: "25%", left: "80%", city: "Tokyo" },
          { top: "70%", left: "30%", city: "São Paulo" },
        ].map((node, i) => (
          <div key={i} style={{ position: "absolute", top: node.top, left: node.left, textAlign: "center" }}>
            <div style={{ width: "12px", height: "12px", background: COLORS.accent, borderRadius: "50%", boxShadow: `0 0 15px ${COLORS.accent}`, marginBottom: "8px" }} />
            <span style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>{node.city}</span>
          </div>
        ))}

        {/* Live Scan Line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${COLORS.accent}, transparent)`, animation: "scan 4s linear infinite" }} />
        <style>{`
          @keyframes scan {
            0% { transform: translateY(-100px); }
            100% { transform: translateY(500px); }
          }
        `}</style>
      </div>
    </Card>
  </div>
);

const EnforcementView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      <Card title="Automated Takedowns" subtitle="Legal enforcement in progress">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { platform: "Instagram", cases: 42, status: "Active" },
            { platform: "Twitter/X", cases: 18, status: "Active" },
            { platform: "Pinterest", cases: 85, status: "Processing" },
            { platform: "Independent Domains", cases: 12, status: "Legal Review" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>{item.platform}</p>
                <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: "4px 0 0" }}>{item.cases} Pending Takedowns</p>
              </div>
              <Badge color={item.status === "Active" ? COLORS.success : COLORS.warning}>{item.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Legal Intelligence" subtitle="Enforcement success metrics">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "48px", fontWeight: 300, margin: "0 0 8px", color: COLORS.success }}>99.7%</h2>
          <p style={{ fontSize: "12px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>Success Rate</p>
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span>Compliance Rate</span>
              <span style={{ color: COLORS.success }}>High</span>
            </div>
            <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
              <div style={{ width: "94%", height: "100%", background: COLORS.success }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "12px" }}>
              <span>Avg. Response Time</span>
              <span style={{ color: COLORS.accentSecondary }}>4.2 Hours</span>
            </div>
            <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
              <div style={{ width: "88%", height: "100%", background: COLORS.accentSecondary }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const IntelligenceView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    <Card title="Advanced Risk Analytics" subtitle="Deep-dive into threat vectors and leak origins">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "12px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px" }}>Top Leak Source</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>Social Media</p>
          <p style={{ fontSize: "11px", color: COLORS.danger, margin: "8px 0 0" }}>+12% vs last month</p>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "12px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px" }}>Risk Velocity</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>Moderate</p>
          <p style={{ fontSize: "11px", color: COLORS.success, margin: "8px 0 0" }}>-5% vs last month</p>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "12px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px" }}>Asset Value Protected</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>$2.4M</p>
          <p style={{ fontSize: "11px", color: COLORS.accent, margin: "8px 0 0" }}>Estimated Impact</p>
        </div>
      </div>
    </Card>
  </div>
);

const SecureAssetView = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
    <Card title="Secure New Digital Asset" subtitle="Initiate Vault protection and neural fingerprinting">
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px 0" }}>
        {/* Upload Zone */}
        <div style={{ 
          border: `2px dashed ${COLORS.border}`, 
          borderRadius: "16px", 
          padding: "60px", 
          textAlign: "center",
          background: "rgba(255,255,255,0.01)",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}>
          <div style={{ width: "64px", height: "64px", background: "rgba(255,255,255,0.03)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Plus size={32} color={COLORS.accent} />
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px" }}>Upload Creative Assets</h3>
          <p style={{ fontSize: "13px", color: COLORS.textSecondary }}>Drag and drop high-resolution images, videos, or design files</p>
          <p style={{ fontSize: "11px", color: COLORS.textSecondary, marginTop: "20px" }}>Supported: PNG, JPG, TIFF, MP4, MOV (Max 2GB)</p>
        </div>

        {/* Configuration */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500 }}>Protection Level</label>
            <select style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "12px", borderRadius: "8px", outline: "none" }}>
              <option>Standard Vault Protection</option>
              <option>Enhanced Neural Fingerprinting</option>
              <option>Real-Time Global Monitoring</option>
              <option>Elite Legal Enforcement</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500 }}>Asset Category</label>
            <select style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "12px", borderRadius: "8px", outline: "none" }}>
              <option>Commercial Photography</option>
              <option>Brand Identity / Logos</option>
              <option>Cinematic Content</option>
              <option>Intellectual Property</option>
            </select>
          </div>
        </div>

        <button style={{ 
          padding: "16px", 
          background: COLORS.accent, 
          color: "#000", 
          border: "none", 
          borderRadius: "8px", 
          fontSize: "15px", 
          fontWeight: 700, 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}>
          <ShieldCheck size={20} />
          Initialize Vault Protection
        </button>
      </div>
    </Card>
  </div>
);

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function VaultMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewView />;
      case "signatures": return <SignaturesView />;
      case "monitoring": return <GlobalMonitorView />;
      case "enforcement": return <EnforcementView />;
      case "intelligence": return <IntelligenceView />;
      case "secure_asset": return <SecureAssetView />;
      default: return <OverviewView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Executive Overview";
      case "signatures": return "Digital Signatures";
      case "monitoring": return "Global Monitor";
      case "enforcement": return "Legal Enforcement";
      case "intelligence": return "Intelligence Analytics";
      case "secure_asset": return "Secure New Asset";
      default: return "Dashboard";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, color: COLORS.textPrimary, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        .nav-button:hover { background: rgba(255,255,255,0.03); color: #FFFFFF; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "260px",
          background: COLORS.surface,
          borderRight: `1px solid ${COLORS.border}`,
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
          position: "sticky",
          top: 0,
          height: "100vh",
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
            { icon: Activity, label: "Executive Overview", id: "overview" },
            { icon: Fingerprint, label: "Digital Signatures", id: "signatures" },
            { icon: Globe, label: "Global Monitor", id: "monitoring" },
            { icon: ShieldCheck, label: "Legal Enforcement", id: "enforcement" },
            { icon: BarChart3, label: "Intelligence Analytics", id: "intelligence" },
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
                  padding: "14px 16px",
                  background: isActive ? "rgba(212,175,55,0.08)" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  color: isActive ? COLORS.accent : COLORS.textSecondary,
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 400,
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

        {/* Navigation Footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <a
            href="https://senotastudios.com"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              color: COLORS.textSecondary,
              textDecoration: "none",
              fontSize: "13px",
              borderRadius: "8px",
              transition: "all 0.2s ease",
            }}
            className="nav-button"
          >
            <HomeIcon size={16} />
            Return Home
          </a>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "transparent",
              border: "none",
              color: COLORS.danger,
              fontSize: "13px",
              cursor: "pointer",
              borderRadius: "8px",
            }}
            className="nav-button"
          >
            <LogOut size={16} />
            Logout Terminal
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, overflow: "auto", padding: "48px 64px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <Badge color={COLORS.accentSecondary}>Security Level: Elite</Badge>
              <span style={{ fontSize: "10px", color: COLORS.textSecondary, fontFamily: "monospace" }}>ID: VAULT-EX-8821</span>
            </div>
            <h1 style={{ fontSize: "36px", fontWeight: 300, margin: 0, letterSpacing: "-0.02em" }}>{getPageTitle()}</h1>
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "8px" }}>
              <Search size={14} color={COLORS.textSecondary} />
              <input 
                placeholder="Global search..." 
                style={{ background: "transparent", border: "none", color: "#FFF", fontSize: "13px", outline: "none", width: "180px" }}
              />
            </div>
            <button 
              onClick={() => setActiveTab("secure_asset")}
              style={{ 
                padding: "10px 24px", 
                background: COLORS.accent, 
                color: "#000", 
                border: "none", 
                borderRadius: "8px", 
                fontSize: "13px", 
                fontWeight: 700, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: `0 0 20px ${COLORS.accent}30`
              }}
            >
              <Plus size={16} />
              Secure New Asset
            </button>
          </div>
        </div>

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
}
