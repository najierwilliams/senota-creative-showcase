/**
 * SENOTA — Vault Member Dashboard
 * Sophisticated "Executive Terminal" aesthetic
 * High-density intelligence command center
 */

import { useState, useEffect, useRef } from "react";
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
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  FileCode,
  Scale,
  Gavel,
  BookOpen,
  MessageSquare,
  ShieldQuestion,
  Image as ImageIcon,
  Trash2,
  X,
  AlertTriangle,
  Linkedin,
  Send,
  Music2,
  Share,
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

/* ── Types ────────────────────────────────────────────────── */
interface PendingAsset {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  preview?: string;
}

interface ActiveSignature {
  id: string;
  name: string;
  type: string;
  date: string;
  hash: string;
  preview?: string;
}

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

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "16px", width: "100%", maxWidth: "500px", overflow: "hidden", animation: "fadeIn 0.3s ease-out" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: COLORS.textSecondary, cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
};

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

const SignaturesView = ({ pendingAssets, activeSignatures, onApprove, onDeletePending, onDeleteActive }: any) => {
  const handleDownload = (name: string) => {
    alert(`Downloading ${name}... (Functional Link Simulation)`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Pending Approval Section */}
        <Card title="Pending Approval" subtitle="Review assets before fingerprinting" extra={<Badge color={COLORS.warning}>{pendingAssets.length} Pending</Badge>}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {pendingAssets.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: COLORS.textSecondary, fontSize: "13px" }}>No assets awaiting approval</div>
            ) : (
              pendingAssets.map((asset: any) => (
                <div key={asset.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(245,158,11,0.03)", borderRadius: "12px", border: `1px solid ${COLORS.warning}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "50px", height: "50px", background: "#1a1a1a", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {asset.preview ? <img src={asset.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <ImageIcon size={20} color={COLORS.warning} />}
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{asset.name}</p>
                      <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "4px 0 0" }}>{asset.size} • {asset.date}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => onDeletePending(asset.id)} style={{ background: "transparent", border: "none", color: COLORS.danger, cursor: "pointer", padding: "4px" }}><Trash2 size={16} /></button>
                    <button onClick={() => onApprove(asset)} style={{ padding: "8px 16px", background: COLORS.warning, color: "#000", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>Approve Fingerprint</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Neural Fingerprint Engine Info */}
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
              <p style={{ fontSize: "10px", color: COLORS.textSecondary }}>Processing neural hash for active assets</p>
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
      </div>

      {/* Active Signatures Section */}
      <Card title="Active Asset Signatures" subtitle="Manage and verify live asset fingerprints" extra={<Badge color={COLORS.success}>{activeSignatures.length} Verified</Badge>}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {activeSignatures.map((asset: any, i: number) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "50px", height: "50px", background: "#1a1a1a", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {asset.preview ? <img src={asset.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <FileText size={20} color={COLORS.textSecondary} />}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{asset.name}</p>
                  <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                    <span style={{ fontSize: "10px", color: COLORS.accentSecondary }}>{asset.type}</span>
                    <span style={{ fontSize: "10px", color: COLORS.textSecondary, fontFamily: "monospace" }}>{asset.hash}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleDownload(asset.name)} style={{ padding: "8px", background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: "6px", color: COLORS.textSecondary, cursor: "pointer" }}><Download size={16} /></button>
                <button onClick={() => onDeleteActive(asset.id)} style={{ padding: "8px", background: "rgba(239,68,68,0.05)", border: `1px solid ${COLORS.danger}30`, borderRadius: "6px", color: COLORS.danger, cursor: "pointer" }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const GlobalMonitorView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    {/* Real World 2D Map Section - High Detail Aesthetic */}
    <Card title="Global Detection Network" subtitle="High-precision geographic surveillance" extra={<Badge color={COLORS.success}>Live Feed</Badge>}>
      <div style={{ height: "500px", background: "#050B15", borderRadius: "12px", position: "relative", overflow: "hidden", border: `1px solid ${COLORS.border}`, boxShadow: "inset 0 0 100px rgba(59,130,246,0.1)" }}>
        {/* High-Detail World Map Simulation */}
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2000&auto=format&fit=crop') center center", backgroundSize: "cover", opacity: 0.15, mixBlendMode: "screen" }} />
        
        <svg viewBox="0 0 1000 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}>
          <path fill="#1E3A8A" d="M150,150 L180,140 L220,150 L250,180 L230,220 L190,240 L150,230 Z" />
          <path fill="#1E3A8A" d="M450,120 L500,110 L550,130 L540,180 L480,190 L440,160 Z" />
          <path fill="#1E3A8A" d="M700,150 L850,140 L900,200 L850,300 L750,320 L680,250 Z" />
          <path fill="#1E3A8A" d="M200,300 L250,280 L300,320 L280,400 L220,420 L180,380 Z" />
          <path fill="#1E3A8A" d="M480,250 L550,240 L600,300 L580,400 L500,420 L450,350 Z" />
          <path fill="#1E3A8A" d="M750,380 L850,370 L880,420 L820,450 L740,430 Z" />
        </svg>

        {/* Glow Effects */}
        <div style={{ position: "absolute", top: "30%", left: "20%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "40%", left: "70%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />

        {/* City Markers */}
        {[
          { top: "35%", left: "18%", city: "San Francisco", status: "Active" },
          { top: "30%", left: "48%", city: "London", status: "Active" },
          { top: "60%", left: "78%", city: "Singapore", status: "Alert" },
          { top: "35%", left: "82%", city: "Tokyo", status: "Active" },
          { top: "75%", left: "28%", city: "São Paulo", status: "Active" },
          { top: "38%", left: "25%", city: "New York", status: "Active" },
          { top: "42%", left: "52%", city: "Berlin", status: "Alert" },
          { top: "65%", left: "55%", city: "Lagos", status: "Active" },
        ].map((node, i) => (
          <div key={i} style={{ position: "absolute", top: node.top, left: node.left, textAlign: "center", transform: "translate(-50%, -50%)" }}>
            <div style={{ 
              width: "10px", 
              height: "10px", 
              background: node.status === "Alert" ? COLORS.danger : COLORS.accentSecondary, 
              borderRadius: "50%", 
              boxShadow: `0 0 15px ${node.status === "Alert" ? COLORS.danger : COLORS.accentSecondary}`, 
              marginBottom: "6px",
              animation: "pulse 2s infinite"
            }} />
            <span style={{ fontSize: "8px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, textShadow: "0 0 5px rgba(0,0,0,0.5)" }}>{node.city}</span>
          </div>
        ))}

        {/* Scan Radar */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: "800px", height: "800px", background: "conic-gradient(from 0deg, rgba(59,130,246,0.05), transparent 90deg)", borderRadius: "50%", transform: "translate(-50%, -50%)", animation: "rotate 15s linear infinite" }} />
      </div>
    </Card>

    {/* Platform Security Matrix - Expanded */}
    <Card title="Multi-Platform Security Matrix" subtitle="Real-time asset protection across global networks">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {[
          { name: "Facebook", icon: Facebook, status: "Secured", alert: false },
          { name: "Instagram", icon: Instagram, status: "Secured", alert: false },
          { name: "X (Twitter)", icon: Twitter, status: "Alert Detected", alert: true },
          { name: "YouTube", icon: Youtube, status: "Secured", alert: false },
          { name: "TikTok", icon: Music2, status: "Secured", alert: false },
          { name: "LinkedIn", icon: Linkedin, status: "Secured", alert: false },
          { name: "Reddit", icon: Share, status: "Review Required", alert: true, warning: true },
          { name: "Telegram", icon: Send, status: "Secured", alert: false },
        ].map((platform, i) => (
          <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${platform.alert ? COLORS.danger + '40' : COLORS.border}`, transition: "all 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <platform.icon size={24} color={platform.alert ? COLORS.danger : platform.warning ? COLORS.warning : COLORS.textSecondary} />
              {platform.alert ? <AlertCircle size={16} color={COLORS.danger} className="animate-pulse" /> : platform.warning ? <AlertTriangle size={16} color={COLORS.warning} /> : <Check size={16} color={COLORS.success} />}
            </div>
            <p style={{ fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>{platform.name}</p>
            <Badge color={platform.alert ? COLORS.danger : platform.warning ? COLORS.warning : COLORS.success}>{platform.status}</Badge>
            {platform.alert && (
              <button style={{ width: "100%", marginTop: "16px", padding: "8px", background: "rgba(239,68,68,0.1)", border: `1px solid ${COLORS.danger}30`, borderRadius: "6px", color: COLORS.danger, fontSize: "10px", fontWeight: 700, cursor: "pointer" }}>
                Analyze Threat
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

const ProfileView = ({ onDeleteAccount }: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmStep, setConfirmStep] = useState(1);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Member Profile" subtitle="Manage your security identity and credentials">
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px 0" }}>
          {/* User Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(45deg, #222, #444)", border: `2px solid ${COLORS.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={40} color={COLORS.accent} />
            </div>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Everett Williams</h2>
              <p style={{ fontSize: "13px", color: COLORS.accent, margin: "4px 0 0" }}>Elite Partner • Member since 2024</p>
              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                <Badge color={COLORS.success}>Identity Verified</Badge>
                <Badge color={COLORS.accentSecondary}>2FA Active</Badge>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase" }}>Full Name</label>
              <input defaultValue="Everett Williams" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "14px", borderRadius: "8px", outline: "none" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: COLORS.textSecondary, fontWeight: 500, textTransform: "uppercase" }}>Email Address</label>
              <input defaultValue="everett@senotastudios.com" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: "#FFF", padding: "14px", borderRadius: "8px", outline: "none" }} />
            </div>
          </div>

          <div style={{ padding: "24px", background: "rgba(239,68,68,0.03)", borderRadius: "16px", border: `1px solid ${COLORS.danger}20`, marginTop: "20px" }}>
            <h4 style={{ fontSize: "14px", color: COLORS.danger, margin: "0 0 8px" }}>Danger Zone</h4>
            <p style={{ fontSize: "12px", color: COLORS.textSecondary, marginBottom: "20px" }}>Permanently delete your account, all asset signatures, and historical security data.</p>
            <button 
              onClick={() => setShowDeleteModal(true)}
              style={{ padding: "12px 24px", background: "transparent", border: `1px solid ${COLORS.danger}`, color: COLORS.danger, borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              Delete Account & Data
            </button>
          </div>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => { setShowDeleteModal(false); setConfirmStep(1); }} title="Critical Action Required">
        {confirmStep === 1 ? (
          <div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <AlertTriangle size={48} color={COLORS.danger} />
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "15px" }}>Are you absolutely sure?</p>
                <p style={{ fontSize: "13px", color: COLORS.textSecondary, marginTop: "8px", lineHeight: 1.5 }}>
                  This action is irreversible. You will lose access to the Vault and all your protected asset signatures will be purged.
                </p>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
              <p style={{ fontSize: "12px", fontWeight: 600, marginBottom: "12px" }}>The following will occur:</p>
              <ul style={{ fontSize: "12px", color: COLORS.textSecondary, paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>All 2,400+ digital signatures will be permanently deleted.</li>
                <li>Global monitoring for your assets will cease immediately.</li>
                <li>Your personal information and login credentials will be wiped.</li>
                <li>You will be removed from all secure mailing lists.</li>
              </ul>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button onClick={() => setShowDeleteModal(false)} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#FFF", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => setConfirmStep(2)} style={{ flex: 1, padding: "12px", background: COLORS.danger, border: "none", borderRadius: "8px", color: "#FFF", fontWeight: 600, cursor: "pointer" }}>Proceed</button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>Final Confirmation</p>
            <p style={{ fontSize: "13px", color: COLORS.textSecondary, textAlign: "center", marginBottom: "24px" }}>
              Type <span style={{ color: COLORS.textPrimary, fontWeight: 700 }}>DELETE</span> to confirm permanent account removal.
            </p>
            <input placeholder="Type DELETE" style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.danger}`, color: "#FFF", padding: "14px", borderRadius: "8px", textAlign: "center", outline: "none", marginBottom: "24px" }} />
            <button 
              onClick={() => { onDeleteAccount(); setShowDeleteModal(false); }}
              style={{ width: "100%", padding: "14px", background: COLORS.danger, border: "none", borderRadius: "8px", color: "#FFF", fontWeight: 700, cursor: "pointer" }}
            >
              Permanently Delete Everything
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

const EnforcementView = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px" }}>
      <Card title="Legal Command Center" subtitle="Automated legal actions and takedown resources" extra={<Gavel size={18} color={COLORS.accent} />}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { title: "Takedown Templates", desc: "Standard DMCA and IP notices", icon: FileCode },
            { title: "Jurisdiction Guides", desc: "Global IP law resources", icon: BookOpen },
            { title: "Expert Consultation", desc: "Speak with IP attorneys", icon: MessageSquare },
            { title: "Compliance Portal", desc: "Platform-specific tools", icon: Scale },
          ].map((tool, i) => (
            <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}>
              <tool.icon size={20} color={COLORS.accent} style={{ marginBottom: "12px" }} />
              <h4 style={{ fontSize: "13px", margin: "0 0 4px" }}>{tool.title}</h4>
              <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>{tool.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "24px", padding: "20px", background: "rgba(212,175,55,0.05)", borderRadius: "12px", border: `1px solid ${COLORS.accent}30` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <ShieldAlert size={20} color={COLORS.accent} />
            <h4 style={{ fontSize: "14px", margin: 0 }}>Rapid Response Toolkit</h4>
          </div>
          <p style={{ fontSize: "11px", color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: "16px" }}>Immediate legal escalation for high-value asset leaks. Automatically generates multi-jurisdictional takedown notices.</p>
          <button style={{ padding: "10px 20px", background: COLORS.accent, color: "#000", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Initialize Rapid Response</button>
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
      </div>
    </div>
  </div>
);

const SecureAssetView = ({ onUpload }: { onUpload: (files: FileList) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", width: "100%", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Secure New Digital Asset" subtitle="Initiate Vault protection and neural fingerprinting">
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", padding: "20px 0" }}>
          {/* Upload Zone */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: "none" }} 
            multiple 
            onChange={(e) => e.target.files && onUpload(e.target.files)}
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              border: `2px dashed ${COLORS.border}`, 
              borderRadius: "16px", 
              padding: "60px", 
              textAlign: "center",
              background: "rgba(255,255,255,0.01)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }} 
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.accent)} 
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
          >
            <div style={{ width: "64px", height: "64px", background: "rgba(255,255,255,0.03)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <Plus size={32} color={COLORS.accent} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: 500, margin: "0 0 8px" }}>Upload Creative Assets</h3>
            <p style={{ fontSize: "13px", color: COLORS.textSecondary }}>Click to browse or drag and drop files</p>
            <p style={{ fontSize: "11px", color: COLORS.textSecondary, marginTop: "20px" }}>Supported: PNG, JPG, TIFF, MP4, MOV (Max 2GB)</p>
          </div>

          <button 
            onClick={() => alert("Upload complete. Check Digital Signatures for pending approvals.")}
            style={{ 
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
            }} 
          >
            <ShieldCheck size={20} />
            Initialize Vault Protection
          </button>
        </div>
      </Card>
    </div>
  );
};

/* ── Main Dashboard ──────────────────────────────────────────── */
export default function VaultMemberDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Persistent Data Logic
  const [pendingAssets, setPendingAssets] = useState<PendingAsset[]>(() => {
    const saved = localStorage.getItem("vault_pending");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeSignatures, setActiveSignatures] = useState<ActiveSignature[]>(() => {
    const saved = localStorage.getItem("vault_signatures");
    return saved ? JSON.parse(saved) : [
      { id: "S-001", name: "Brand_Logo_2026.svg", type: "Vector", date: "Jul 08, 2026", hash: "9x2f...1e0a" },
      { id: "S-002", name: "Campaign_Video_01.mp4", type: "Video", date: "Jul 07, 2026", hash: "4a8c...d9f2" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("vault_pending", JSON.stringify(pendingAssets));
  }, [pendingAssets]);

  useEffect(() => {
    localStorage.setItem("vault_signatures", JSON.stringify(activeSignatures));
  }, [activeSignatures]);

  const handleFileUpload = (files: FileList) => {
    const newAssets: PendingAsset[] = Array.from(files).map(file => {
      const isMedia = file.type.startsWith('image/') || file.type.startsWith('video/');
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        preview: isMedia ? URL.createObjectURL(file) : undefined
      };
    });
    setPendingAssets(prev => [...prev, ...newAssets]);
    setActiveTab("signatures");
  };

  const handleApproveSignature = (asset: PendingAsset) => {
    const newSignature: ActiveSignature = {
      id: "S-" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      name: asset.name,
      type: asset.type.split('/')[1]?.toUpperCase() || "Asset",
      date: asset.date,
      hash: Math.random().toString(36).substr(2, 8) + "..." + Math.random().toString(36).substr(2, 4),
      preview: asset.preview
    };
    setActiveSignatures(prev => [newSignature, ...prev]);
    setPendingAssets(prev => prev.filter(a => a.id !== asset.id));
  };

  const handleDeletePending = (id: string) => {
    setPendingAssets(prev => prev.filter(a => a.id !== id));
  };

  const handleDeleteActive = (id: string) => {
    setActiveSignatures(prev => prev.filter(a => a.id !== id));
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    window.location.href = "https://senotastudios.com";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewView />;
      case "signatures": return <SignaturesView pendingAssets={pendingAssets} activeSignatures={activeSignatures} onApprove={handleApproveSignature} onDeletePending={handleDeletePending} onDeleteActive={handleDeleteActive} />;
      case "monitoring": return <GlobalMonitorView />;
      case "enforcement": return <EnforcementView />;
      case "profile": return <ProfileView onDeleteAccount={handleDeleteAccount} />;
      default: return <OverviewView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Executive Overview";
      case "signatures": return "Digital Signatures";
      case "monitoring": return "Global Monitor";
      case "enforcement": return "Legal Enforcement";
      case "profile": return "Member Profile";
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
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes rotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
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
            { icon: User, label: "Member Profile", id: "profile" },
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
