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
  Filter,
  Download,
  Share2,
  Lock,
  Zap,
  Layers,
  Settings,
  Bell,
  User,
  MoreHorizontal,
  Mail,
  Smartphone,
  Check,
} from "lucide-react";

/* ── Sophisticated Theme Constants ────────────────────────────────── */
const COLORS = {
  bg: "#050505",
  surface: "#121212", 
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
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
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
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr", padding: "16px", background: COLORS.surface, alignItems: "center", transition: "background 0.2s", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surfaceHover)} onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.surface)}>
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
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
      <Card title="Neural Fingerprint Engine" subtitle="AI-Resistant Asset Identity" extra={<Cpu size={16} color={COLORS.accent} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <Zap size={18} color={COLORS.accent} />
              <h4 style={{ fontSize: "14px", margin: 0 }}>Deep Scan Status</h4>
            </div>
            <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", marginBottom: "8px" }}>
              <div style={{ width: "85%", height: "100%", background: COLORS.accent }} />
            </div>
            <p style={{ fontSize: "10px", color: COLORS.textSecondary }}>Processing neural hash for 1,240 new assets</p>
          </div>
          <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <Lock size={18} color={COLORS.success} />
              <h4 style={{ fontSize: "14px", margin: 0 }}>Immutable Registry</h4>
            </div>
            <p style={{ fontSize: "11px", color: COLORS.textSecondary, lineHeight: 1.5 }}>All signatures are anchored to the Vault distributed ledger, ensuring non-repudiation of asset ownership.</p>
          </div>
        </div>
      </Card>
      <Card title="Signature Management" subtitle="Manage and verify asset fingerprints" extra={<Filter size={16} color={COLORS.textSecondary} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { name: "Brand_Logo_2026.svg", type: "Vector", date: "Jul 08, 2026", hash: "9x2f...1e0a" },
            { name: "Campaign_Video_01.mp4", type: "Video", date: "Jul 07, 2026", hash: "4a8c...d9f2" },
            { name: "Product_Shot_A.jpg", type: "Image", date: "Jul 06, 2026", hash: "2b7e...k4l8" },
            { name: "Whitepaper_Draft.pdf", type: "Document", date: "Jul 05, 2026", hash: "1d3a...p9q0" },
          ].map((asset, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", background: "#1a1a1a", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={18} color={COLORS.textSecondary} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{asset.name}</p>
                  <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                    <span style={{ fontSize: "10px", color: COLORS.accentSecondary }}>{asset.type}</span>
                    <span style={{ fontSize: "10px", color: COLORS.textSecondary, fontFamily: "monospace" }}>{asset.hash}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ padding: "6px", background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textSecondary }}><Download size={14} /></button>
                <button style={{ padding: "6px", background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textSecondary }}><Share2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const GlobalMonitorView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "24px" }}>
      <Card title="Live Surveillance Network" subtitle="Global asset detection across 400+ data nodes" extra={<Badge color={COLORS.success}>Operational</Badge>}>
        <div style={{ height: "450px", background: "#080808", borderRadius: "12px", position: "relative", overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
          {/* Mock Map Background */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 2px 2px, #444 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          
          {/* Mock Data Nodes with Animation */}
          {[
            { top: "30%", left: "20%", city: "San Francisco", status: "Active" },
            { top: "40%", left: "45%", city: "London", status: "Active" },
            { top: "60%", left: "75%", city: "Singapore", status: "Alert" },
            { top: "25%", left: "80%", city: "Tokyo", status: "Active" },
            { top: "70%", left: "30%", city: "São Paulo", status: "Active" },
          ].map((node, i) => (
            <div key={i} style={{ position: "absolute", top: node.top, left: node.left, textAlign: "center", transform: "translate(-50%, -50%)" }}>
              <div style={{ 
                width: "14px", 
                height: "14px", 
                background: node.status === "Alert" ? COLORS.danger : COLORS.accent, 
                borderRadius: "50%", 
                boxShadow: `0 0 20px ${node.status === "Alert" ? COLORS.danger : COLORS.accent}`, 
                marginBottom: "8px",
                animation: "pulse 2s infinite"
              }} />
              <span style={{ fontSize: "9px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{node.city}</span>
            </div>
          ))}

          {/* Radar Line */}
          <div style={{ position: "absolute", top: "50%", left: "50%", width: "1000px", height: "1000px", background: "conic-gradient(from 0deg, rgba(212,175,55,0.1), transparent 60deg)", borderRadius: "50%", transformOrigin: "center", transform: "translate(-50%, -50%)", animation: "rotate 10s linear infinite" }} />
          
          <style>{`
            @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
            @keyframes rotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
          `}</style>
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Card title="Node Status" extra={<Activity size={16} color={COLORS.success} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { node: "US-West-01", latency: "24ms", health: "99%" },
              { node: "EU-Central-02", latency: "48ms", health: "100%" },
              { node: "AS-South-01", latency: "112ms", health: "98%" },
              { node: "SA-East-01", latency: "156ms", health: "97%" },
            ].map((node, i) => (
              <div key={i} style={{ padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600 }}>{node.node}</span>
                  <span style={{ fontSize: "10px", color: COLORS.success }}>{node.health}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: COLORS.textSecondary }}>
                  <span>Latency</span>
                  <span>{node.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Scan Frequency" subtitle="Live updates per minute">
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "36px", fontWeight: 300, margin: 0 }}>14,280</p>
            <p style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", marginTop: "4px" }}>Scans / Min</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
);

const EnforcementView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px" }}>
      <Card title="Active Enforcement Cases" subtitle="Legal actions and takedown status" extra={<ShieldCheck size={18} color={COLORS.success} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: COLORS.border, borderRadius: "8px", overflow: "hidden" }}>
          {[
            { id: "C-8821", target: "imposter-site.com", platform: "Domain", status: "Legal Notice Sent", priority: "Critical" },
            { id: "C-8822", target: "@fake_creator_01", platform: "Instagram", status: "Account Suspended", priority: "High" },
            { id: "C-8823", target: "leak-forum.net", platform: "Forum", status: "Content Removed", priority: "Medium" },
            { id: "C-8824", target: "image-scraper.io", platform: "Web", status: "Takedown Pending", priority: "High" },
          ].map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 2fr 1.5fr", padding: "16px", background: COLORS.surface, alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: COLORS.textSecondary, fontFamily: "monospace" }}>{item.id}</span>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{item.target}</p>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary }}>{item.platform}</p>
              </div>
              <Badge color={item.status.includes("Removed") || item.status.includes("Suspended") ? COLORS.success : COLORS.warning}>{item.status}</Badge>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "10px", color: item.priority === "Critical" ? COLORS.danger : COLORS.textSecondary, fontWeight: 700 }}>{item.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <Card title="Enforcement Success" subtitle="Resolution performance">
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h2 style={{ fontSize: "48px", fontWeight: 300, margin: "0 0 8px", color: COLORS.success }}>99.7%</h2>
            <p style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>Case Resolution Rate</p>
            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
                  <span>Compliance Level</span>
                  <span style={{ color: COLORS.success }}>High</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                  <div style={{ width: "94%", height: "100%", background: COLORS.success }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "8px" }}>
                  <span>Legal Response Speed</span>
                  <span style={{ color: COLORS.accentSecondary }}>4.2 Hours</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                  <div style={{ width: "88%", height: "100%", background: COLORS.accentSecondary }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card title="Resolution Timeline" extra={<Clock size={16} color={COLORS.textSecondary} />}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "60px", gap: "4px" }}>
            {[40, 60, 45, 90, 75, 85, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: COLORS.accentSecondary, borderRadius: "2px", opacity: 0.6 }} />
            ))}
          </div>
          <p style={{ fontSize: "10px", color: COLORS.textSecondary, textAlign: "center", marginTop: "12px" }}>Average time to takedown (Last 7 Days)</p>
        </Card>
      </div>
    </div>
  </div>
);

const IntelligenceView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    <Card title="Advanced Risk Intelligence" subtitle="Predictive analytics and threat vector modeling" extra={<BarChart3 size={18} color={COLORS.accent} />}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginTop: "20px" }}>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px", letterSpacing: "0.1em" }}>Primary Leak Vector</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>Social Media</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
            <TrendingUp size={14} color={COLORS.danger} />
            <span style={{ fontSize: "11px", color: COLORS.danger }}>+12.4% Surge</span>
          </div>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px", letterSpacing: "0.1em" }}>Threat Intelligence Level</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>Elevated</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
            <AlertCircle size={14} color={COLORS.warning} />
            <span style={{ fontSize: "11px", color: COLORS.warning }}>Active Campaign Detected</span>
          </div>
        </div>
        <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
          <h4 style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", margin: "0 0 16px", letterSpacing: "0.1em" }}>Protected Asset Value</h4>
          <p style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}>$2.48M</p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px" }}>
            <Shield size={14} color={COLORS.success} />
            <span style={{ fontSize: "11px", color: COLORS.success }}>Total Impact Mitigated</span>
          </div>
        </div>
      </div>
    </Card>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      <Card title="Regional Threat Density" subtitle="Geopolitical risk distribution">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            { region: "North America", risk: "Low", value: 15 },
            { region: "Eastern Europe", risk: "High", value: 85 },
            { region: "East Asia", risk: "Medium", value: 45 },
            { region: "Southeast Asia", risk: "High", value: 70 },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px" }}>
                <span>{item.region}</span>
                <span style={{ color: item.risk === "High" ? COLORS.danger : item.risk === "Medium" ? COLORS.warning : COLORS.success }}>{item.risk} Risk</span>
              </div>
              <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                <div style={{ width: `${item.value}%`, height: "100%", background: item.risk === "High" ? COLORS.danger : item.risk === "Medium" ? COLORS.warning : COLORS.success }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Intelligence Feed" extra={<Layers size={16} color={COLORS.textSecondary} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { event: "New Scraper Pattern Identified", time: "2h ago", type: "Security Advisory" },
            { event: "Major Platform API Update", time: "5h ago", type: "System Notification" },
            { event: "Coordinated Leak Campaign Detected", time: "8h ago", type: "Critical Alert" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.type.includes("Critical") ? COLORS.danger : COLORS.accentSecondary, marginTop: "4px" }} />
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>{item.event}</p>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <span style={{ fontSize: "10px", color: COLORS.textSecondary }}>{item.time}</span>
                  <span style={{ fontSize: "10px", color: COLORS.accentSecondary }}>{item.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const SecureAssetView = () => (
  <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", animation: "fadeIn 0.5s ease-out" }}>
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
        }} onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.accent)} onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}>
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
            <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Protection Level</label>
            <select style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "14px", borderRadius: "8px", outline: "none", fontSize: "13px" }}>
              <option>Standard Vault Protection</option>
              <option>Enhanced Neural Fingerprinting</option>
              <option>Real-Time Global Monitoring</option>
              <option>Elite Legal Enforcement</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Asset Category</label>
            <select style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "14px", borderRadius: "8px", outline: "none", fontSize: "13px" }}>
              <option>Commercial Photography</option>
              <option>Brand Identity / Logos</option>
              <option>Cinematic Content</option>
              <option>Intellectual Property</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>Asset Metadata (Optional)</label>
          <textarea placeholder="Enter asset description, copyright details, or licensing terms..." style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "14px", borderRadius: "8px", outline: "none", fontSize: "13px", minHeight: "100px", resize: "none" }} />
        </div>

        <button style={{ 
          padding: "18px", 
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
          gap: "10px",
          boxShadow: `0 0 30px ${COLORS.accent}40`,
          transition: "all 0.3s ease"
        }} onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}>
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
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "280px",
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
          <p style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.25em", margin: 0, color: COLORS.textPrimary }}>
            SENOTA
          </p>
          <p style={{ fontSize: "10px", color: COLORS.accent, letterSpacing: "0.4em", margin: 0, marginTop: "6px", fontWeight: 600 }}>
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
                  gap: "14px",
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
          <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(45deg, #222, #444)", border: `1px solid ${COLORS.border}` }} />
              <div>
                <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>Everett Williams</p>
                <p style={{ fontSize: "10px", color: COLORS.accent, margin: 0 }}>Elite Partner</p>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                padding: "8px",
                background: "transparent",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "6px",
                color: COLORS.textSecondary,
                fontSize: "11px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              className="nav-button"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
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
                boxShadow: `0 0 20px ${COLORS.accent}30`,
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
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
