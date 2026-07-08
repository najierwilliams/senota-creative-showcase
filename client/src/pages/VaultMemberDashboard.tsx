/**
 * SENOTA — Vault Member Dashboard
 * Sophisticated "Executive Terminal" aesthetic
 * High-density intelligence command center
 */

import { useState, useEffect, useRef } from "react";
import { trpc } from "@/_core/trpc";
import { toast } from "sonner";
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
  ImageIcon,
  Trash2,
  X,
  AlertTriangle,
  Linkedin,
  Send,
  Music2,
  Share,
  Users,
  Gift,
  Trophy,
  Newspaper,
  History,
  FileSearch,
  Key,
  CreditCard,
  Copy,
  Info,
  ChevronUp,
  ArrowUp,
  ArrowDown,
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
    cta: "Downgrade to Basic",
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
    cta: "Downgrade to Pro",
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
    cta: "Current Plan",
  },
];

/* ── Types ────────────────────────────────────────────────── */
interface PendingAsset {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  preview?: string;
  blob?: Blob;
}

interface ActiveSignature {
  id: string;
  name: string;
  type: string;
  date: string;
  hash: string;
  preview?: string;
  blob?: Blob;
}

/* ── Components ────────────────────────────────────────────────── */

const Card = ({ children, title, subtitle, extra, onClick }: any) => (
  <div
    onClick={onClick}
    style={{
      background: COLORS.surface,
      border: `1px solid ${COLORS.border}`,
      borderRadius: "12px",
      padding: "24px",
      height: "100%",
      transition: "all 0.3s ease",
      cursor: onClick ? "pointer" : "default",
    }}
    onMouseEnter={(e) => onClick && (e.currentTarget.style.background = COLORS.surfaceHover)}
    onMouseLeave={(e) => onClick && (e.currentTarget.style.background = COLORS.surface)}
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
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: "16px", width: "100%", maxWidth: "600px", overflow: "hidden", animation: "fadeIn 0.3s ease-out" }}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: COLORS.textSecondary, cursor: "pointer" }}><X size={20} /></button>
        </div>
        <div style={{ padding: "24px", maxHeight: "80vh", overflowY: "auto" }}>{children}</div>
      </div>
    </div>
  );
};

/* ── Page Views ────────────────────────────────────────────────── */

const OverviewView = () => {
  const [showScoreModal, setShowScoreModal] = useState(false);

  return (
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
          <Card 
            title="Security Scorecard" 
            subtitle="Overall protection health" 
            onClick={() => setShowScoreModal(true)}
            extra={<Info size={14} color={COLORS.accent} />}
          >
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
              <p style={{ fontSize: "10px", color: COLORS.accent, marginTop: "16px", fontWeight: 600 }}>Click to Analyze Score</p>
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

      {/* Expanded News & Updates Section */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <Card title="Intelligence Updates" subtitle="Latest global security news" extra={<Newspaper size={16} color={COLORS.accent} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { title: "New AI Leak Patterns Detected", date: "Jul 08, 2026", desc: "Advanced neural networks are being used to bypass traditional DMCA filters. Vault engine updated to v4.2." },
              { title: "Platform Security Audit: Meta", date: "Jul 06, 2026", desc: "Instagram's new API changes impact detection speed. Senota nodes optimized for the new architecture." },
              { title: "Regional Threat Alert: Eastern Europe", date: "Jul 05, 2026", desc: "Significant increase in unlicensed asset distribution from high-risk IP ranges in RU/UA regions." },
            ].map((news, i) => (
              <div key={i} style={{ borderBottom: i < 2 ? `1px solid ${COLORS.border}` : "none", paddingBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h4 style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{news.title}</h4>
                  <span style={{ fontSize: "10px", color: COLORS.textSecondary }}>{news.date}</span>
                </div>
                <p style={{ fontSize: "11px", color: COLORS.textSecondary, lineHeight: 1.5, margin: 0 }}>{news.desc}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Vault Activity Log" subtitle="Recent account & security actions" extra={<History size={16} color={COLORS.accentSecondary} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { action: "Signature Verified", asset: "Campaign_Video_01.mp4", time: "2 hours ago", icon: ShieldCheck, color: COLORS.success },
              { action: "Login Detected", asset: "San Francisco, CA (MacBook Pro)", time: "5 hours ago", icon: Activity, color: COLORS.accentSecondary },
              { action: "New Asset Uploaded", asset: "Brand_Logo_2026.svg", time: "Yesterday", icon: Plus, color: COLORS.accent },
              { action: "Takedown Successful", asset: "Official_Photoshoot_04.jpg", time: "2 days ago", icon: Gavel, color: COLORS.success },
            ].map((log, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", background: "rgba(255,255,255,0.01)", borderRadius: "8px" }}>
                <div style={{ padding: "8px", background: `${log.color}10`, borderRadius: "6px" }}>
                  <log.icon size={14} color={log.color} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>{log.action}</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "2px 0 0" }}>{log.asset} • {log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scorecard Modal */}
      <Modal isOpen={showScoreModal} onClose={() => setShowScoreModal(false)} title="Security Score Analysis">
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ textAlign: "center", padding: "20px", background: "rgba(212,175,55,0.05)", borderRadius: "12px", border: `1px solid ${COLORS.accent}20` }}>
            <h2 style={{ fontSize: "48px", fontWeight: 700, color: COLORS.accent, margin: 0 }}>88</h2>
            <p style={{ fontSize: "14px", fontWeight: 600, marginTop: "8px" }}>A+ EXECUTIVE GRADE</p>
          </div>
          
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>What your score means:</h4>
            <p style={{ fontSize: "13px", color: COLORS.textSecondary, lineHeight: 1.6 }}>Your current security posture is elite. Most assets are protected with valid neural signatures and global monitoring is active across all major platforms. To reach 95+, consider rotating your API keys and enabling 2FA for all administrative accounts.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const SignaturesView = ({ pendingAssets, activeSignatures, onApprove, onDeletePending, onDeleteActive }: any) => {
  const [deleteTarget, setDeleteTarget] = useState<any>(null);

  const handleDownload = (asset: any) => {
    if (asset.blob) {
      const url = URL.createObjectURL(asset.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = asset.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("Download functionality initialized. Uploaded files will download directly.");
    }
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
                    <button onClick={() => setDeleteTarget({ id: asset.id, type: 'pending' })} style={{ background: "transparent", border: "none", color: COLORS.danger, cursor: "pointer", padding: "4px" }}><Trash2 size={16} /></button>
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
                  {asset.preview ? <img src={asset.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (
                    asset.type === "Video" ? <Music2 size={20} color={COLORS.textSecondary} /> : <FileText size={20} color={COLORS.textSecondary} />
                  )}
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
                <button onClick={() => handleDownload(asset)} style={{ padding: "8px", background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: "6px", color: COLORS.textSecondary, cursor: "pointer" }}><Download size={16} /></button>
                <button onClick={() => setDeleteTarget({ id: asset.id, type: 'active' })} style={{ padding: "8px", background: "rgba(239,68,68,0.05)", border: `1px solid ${COLORS.danger}30`, borderRadius: "6px", color: COLORS.danger, cursor: "pointer" }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Deletion">
        <div style={{ textAlign: "center" }}>
          <AlertTriangle size={48} color={COLORS.danger} style={{ marginBottom: "16px" }} />
          <p style={{ fontSize: "15px", fontWeight: 600, margin: "0 0 8px" }}>Are you sure you want to delete this asset?</p>
          <p style={{ fontSize: "13px", color: COLORS.textSecondary, marginBottom: "24px" }}>This action cannot be undone. The digital signature and all associated tracking data will be permanently removed.</p>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setDeleteTarget(null)} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#FFF", cursor: "pointer" }}>Cancel</button>
            <button onClick={() => { 
              if (deleteTarget.type === 'pending') onDeletePending(deleteTarget.id);
              else onDeleteActive(deleteTarget.id);
              setDeleteTarget(null);
            }} style={{ flex: 1, padding: "12px", background: COLORS.danger, border: "none", borderRadius: "8px", color: "#FFF", fontWeight: 600, cursor: "pointer" }}>Delete Permanently</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const GlobalMonitorView = () => {
  const [selectedThreat, setSelectedThreat] = useState<any>(null);

  const demoThreats = [
    { id: 1, platform: "X (Twitter)", type: "Copyright Infringement", asset: "Official Campaign Video", source: "@unlicensed_distro", location: "Moscow, RU", severity: "High", timestamp: "14:22 GMT", evidence: "Video matches neural hash 92.4%", status: "Enforcement Pending" },
    { id: 2, platform: "Instagram", type: "Unlicensed Commercial Use", asset: "Brand_Logo_2026.svg", source: "Commercial_Page_XYZ", location: "Berlin, DE", severity: "Medium", timestamp: "12:05 GMT", evidence: "Logo match detected in paid advertisement", status: "Reviewing" },
    { id: 3, platform: "TikTok", type: "Audio Extraction", asset: "Campaign_Video_01.mp4", source: "User_Viral_99", location: "Tokyo, JP", severity: "Low", timestamp: "10:30 GMT", evidence: "Extracted audio fingerprint detected", status: "Mitigated" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      {/* Real World 2D Map Section - Enhanced Aesthetic */}
      <Card title="Global Detection Network" subtitle="High-precision geographic surveillance" extra={<Badge color={COLORS.success}>Live Feed</Badge>}>
        <div style={{ height: "500px", background: "#050B15", borderRadius: "12px", position: "relative", overflow: "hidden", border: `1px solid ${COLORS.border}`, boxShadow: "inset 0 0 100px rgba(59,130,246,0.1)" }}>
          {/* High-Detail World Map Image */}
          <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop') center center", backgroundSize: "cover", opacity: 0.3, mixBlendMode: "screen" }} />
          
          {/* Grid Lines */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

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
                <button 
                  onClick={() => setSelectedThreat(demoThreats.find(t => t.platform === platform.name) || demoThreats[0])}
                  style={{ width: "100%", marginTop: "16px", padding: "8px", background: "rgba(239,68,68,0.1)", border: `1px solid ${COLORS.danger}30`, borderRadius: "6px", color: COLORS.danger, fontSize: "10px", fontWeight: 700, cursor: "pointer" }}
                >
                  Analyze Threat
                </button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Threat Analysis Modal */}
      <Modal isOpen={!!selectedThreat} onClose={() => setSelectedThreat(null)} title="Intelligence Deep Dive: Threat Analysis">
        {selectedThreat && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", background: "rgba(239,68,68,0.05)", borderRadius: "12px", border: `1px solid ${COLORS.danger}20` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ShieldAlert size={24} color={COLORS.danger} />
                <div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>{selectedThreat.type}</h4>
                  <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: "2px 0 0" }}>Platform: {selectedThreat.platform}</p>
                </div>
              </div>
              <Badge color={COLORS.danger}>{selectedThreat.severity} SEVERITY</Badge>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: "8px" }}>Target Asset</p>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{selectedThreat.asset}</p>
              </div>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: "8px" }}>Source Origin</p>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{selectedThreat.source}</p>
              </div>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: "8px" }}>Location</p>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{selectedThreat.location}</p>
              </div>
              <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderRadius: "12px" }}>
                <p style={{ fontSize: "10px", color: COLORS.textSecondary, textTransform: "uppercase", marginBottom: "8px" }}>Timestamp</p>
                <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{selectedThreat.timestamp}</p>
              </div>
            </div>

            <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <FileSearch size={18} color={COLORS.accentSecondary} />
                <h4 style={{ fontSize: "14px", margin: 0 }}>Evidence Analysis</h4>
              </div>
              <p style={{ fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.6 }}>{selectedThreat.evidence}</p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{ flex: 1, padding: "14px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#FFF", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Dismiss Alert</button>
              <button style={{ flex: 1, padding: "14px", background: COLORS.danger, border: "none", borderRadius: "8px", color: "#FFF", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Initialize Takedown</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const ReferralsView = () => {
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const referralCode = "VAULT-EVERETT-2026";

  const rewards = [
    { title: "Neural Scan Priority", level: 1, desc: "Accelerated fingerprinting for all new assets. Reduces processing time by 50%." },
    { title: "Custom Legal Templates", level: 2, desc: "Access to jurisdiction-specific DMCA and IP enforcement templates tailored to your assets." },
    { title: "Advanced Threat Modeling", level: 3, desc: "Predictive analytics to identify potential leak vectors before they occur." },
    { title: "Dedicated Account Lead", level: 4, desc: "Direct 24/7 access to a senior security specialist for high-priority enforcement." },
    { title: "Global IP Litigation Support", level: 5, desc: "Direct legal funding and support for complex international copyright litigation." },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied to clipboard!");
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", width: "100%", animation: "fadeIn 0.5s ease-out" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "32px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Card title="Referral Command" subtitle="Grow the Vault network and earn elite rewards">
            <div style={{ padding: "20px 0" }}>
              <div style={{ padding: "32px", background: "linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 100%)", borderRadius: "16px", border: `1px solid ${COLORS.accent}20`, marginBottom: "32px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 12px" }}>Invite Elite Partners</h2>
                <p style={{ fontSize: "14px", color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: "24px" }}>Share your exclusive access with other creative professionals. For every successful partner activation, you both receive 3 months of complimentary Elite Protection.</p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1, background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: "14px", borderRadius: "8px", color: COLORS.accent, fontFamily: "monospace", fontSize: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {referralCode}
                    <button onClick={handleCopy} style={{ background: "transparent", border: "none", color: COLORS.textSecondary, cursor: "pointer" }}><Copy size={16} /></button>
                  </div>
                  <button onClick={handleCopy} style={{ padding: "14px 24px", background: COLORS.accent, color: "#000", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>Copy Code</button>
                </div>
              </div>

              <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>Recent Referrals</h4>
              <div style={{ textAlign: "center", padding: "40px", background: "rgba(255,255,255,0.01)", borderRadius: "12px", border: `1px dashed ${COLORS.border}` }}>
                <Users size={32} color={COLORS.textSecondary} style={{ marginBottom: "12px", opacity: 0.5 }} />
                <p style={{ fontSize: "13px", color: COLORS.textSecondary, margin: 0 }}>No referrals yet. Share your code to begin earning rewards.</p>
              </div>
            </div>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Card title="Partner Rewards" subtitle="Unlock elite capabilities">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: "80px", height: "80px", background: "rgba(255,255,255,0.03)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: `1px solid ${COLORS.border}` }}>
                  <Trophy size={40} color={COLORS.textSecondary} style={{ opacity: 0.3 }} />
                </div>
                <h3 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 4px" }}>Level 1</h3>
                <p style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>New Contributor</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {rewards.slice(0, 4).map((perk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "8px", opacity: perk.level <= 1 ? 1 : 0.3 }}>
                    {perk.level <= 1 ? <Check size={14} color={COLORS.success} /> : <Lock size={14} color={COLORS.textSecondary} />}
                    <span style={{ fontSize: "12px" }}>{perk.title}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowRewardsModal(true)}
                style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`, borderRadius: "8px", color: "#FFF", fontSize: "13px", fontWeight: 600, cursor: "pointer", marginTop: "12px" }}
              >
                View All Rewards
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Rewards Modal */}
      <Modal isOpen={showRewardsModal} onClose={() => setShowRewardsModal(false)} title="Vault Partner Rewards">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {rewards.map((reward, i) => (
            <div key={i} style={{ padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", border: `1px solid ${COLORS.border}`, display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ width: "40px", height: "40px", background: reward.level === 1 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {reward.level === 1 ? <Check size={20} color={COLORS.success} /> : <Lock size={20} color={COLORS.textSecondary} />}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>{reward.title}</h4>
                  <Badge color={reward.level === 1 ? COLORS.success : COLORS.textSecondary}>LEVEL {reward.level}</Badge>
                </div>
                <p style={{ fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.5, margin: 0 }}>{reward.desc}</p>
              </div>
            </div>
          ))}
        </div>
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
              <p style={{ fontSize: "11px", color: COLORS.textSecondary, margin: 0 }}>{tool.desc}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Enforcement Stats" extra={<Shield size={16} color={COLORS.success} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { label: "Total Takedowns", value: "142", color: COLORS.success },
            { label: "Success Rate", value: "94.2%", color: COLORS.accentSecondary },
            { label: "Average Resolution", value: "4.2 hrs", color: COLORS.accent },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{ fontSize: "11px", color: COLORS.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{stat.label}</p>
              <p style={{ fontSize: "24px", fontWeight: 300, margin: 0, color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

const UpdateView = () => {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const createSession = trpc.stripe.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (err) => {
      setLoadingTier(null);
      toast.error("Failed to initialize payment: " + err.message);
    },
  });

  const handleUpdate = (tierId: string) => {
    setLoadingTier(tierId);
    createSession.mutate({ tierId });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", animation: "fadeIn 0.5s ease-out", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 700, margin: "0 0 12px" }}>Manage Protection Tiers</h2>
        <p style={{ fontSize: "16px", color: COLORS.textSecondary }}>Scale your asset protection as your creative portfolio grows.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {TIERS.map((tier) => (
          <div 
            key={tier.id} 
            style={{ 
              background: COLORS.surface, 
              border: tier.id === "elite" ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`, 
              borderRadius: "16px", 
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {tier.id === "elite" && (
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: COLORS.accent, color: "#000", padding: "4px 12px", borderRadius: "20px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Current Elite Status
              </div>
            )}
            
            <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px" }}>{tier.name}</h3>
            <p style={{ fontSize: "13px", color: COLORS.textSecondary, margin: "0 0 24px", height: "40px" }}>{tier.tagline}</p>
            
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "32px" }}>
              <span style={{ fontSize: "40px", fontWeight: 700 }}>{tier.price}</span>
              <span style={{ fontSize: "14px", color: COLORS.textSecondary }}>{tier.period}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", flex: 1 }}>
              {tier.features.map((feature, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <Check size={16} color={COLORS.accent} style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: COLORS.textSecondary }}>{feature}</span>
                </div>
              ))}
            </div>

            <button 
              disabled={tier.id === "elite" || !!loadingTier}
              onClick={() => handleUpdate(tier.id)}
              style={{ 
                padding: "16px", 
                background: tier.id === "elite" ? "rgba(255,255,255,0.05)" : (tier.id === "pro" ? COLORS.accent : "transparent"), 
                border: tier.id === "basic" ? `1px solid ${COLORS.border}` : "none",
                borderRadius: "8px", 
                color: tier.id === "elite" ? COLORS.textSecondary : (tier.id === "pro" ? "#000" : "#FFF"), 
                fontSize: "14px", 
                fontWeight: 700, 
                cursor: (tier.id === "elite" || !!loadingTier) ? "default" : "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => (tier.id !== "elite" && !loadingTier) && (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (tier.id !== "elite" && !loadingTier) && (e.currentTarget.style.opacity = "1")}
            >
              {loadingTier === tier.id ? "Processing..." : tier.cta}
            </button>
          </div>
        ))}
      </div>

      <Card title="Billing Policy" extra={<Info size={16} color={COLORS.accentSecondary} />}>
        <p style={{ fontSize: "13px", color: COLORS.textSecondary, lineHeight: 1.6, margin: 0 }}>
          Upgrades take effect immediately with pro-rated billing for the remainder of your cycle. Downgrades will be applied at the start of your next billing period (Aug 08, 2026). All data signatures and monitoring historical data are preserved across all tier changes.
        </p>
      </Card>
    </div>
  );
};

const ProfileView = ({ onDeleteAccount, activeSignaturesCount }: { onDeleteAccount: () => void, activeSignaturesCount: number }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmStep, setConfirmStep] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Account Intelligence" subtitle="Manage your professional identity">
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Identity Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "linear-gradient(135deg, #1A1A1A 0%, #050505 100%)", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <User size={40} color={COLORS.textSecondary} />
              </div>
              <div style={{ position: "absolute", bottom: "-5px", right: "-5px", width: "24px", height: "24px", background: COLORS.success, borderRadius: "50%", border: `3px solid ${COLORS.surface}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={12} color="#FFF" />
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Everett Williams</h3>
              <p style={{ fontSize: "12px", color: COLORS.textSecondary, marginTop: "4px" }}>Member ID: SN-992-004-X</p>
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <Badge color={COLORS.accent}>Elite Partner</Badge>
                <Badge color={COLORS.success}>Verified Identity</Badge>
              </div>
            </div>
          </div>

          {/* Subscription Tier */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ padding: "24px", background: "rgba(212,175,55,0.03)", borderRadius: "16px", border: `1px solid ${COLORS.accent}20` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", color: COLORS.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Current Plan</p>
                <TrendingUp size={16} color={COLORS.accent} />
              </div>
              <h4 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 4px" }}>Vault Elite</h4>
              <p style={{ fontSize: "12px", color: COLORS.textSecondary, margin: 0 }}>$299.00 / Month</p>
              <button style={{ marginTop: "20px", padding: "10px 20px", background: COLORS.accent, color: "#000", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Manage Billing</button>
            </div>
            <div style={{ padding: "24px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: `1px solid ${COLORS.border}` }}>
              <p style={{ fontSize: "11px", color: COLORS.textSecondary, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Security Summary</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: COLORS.textSecondary }}>Protected Assets</span>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>{activeSignaturesCount} Assets</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: COLORS.textSecondary }}>Protection Level</span>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>Elite Protection</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: COLORS.textSecondary }}>Next Billing</span>
                  <span style={{ fontSize: "12px" }}>Aug 08, 2026</span>
                </div>
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
                <li>All {activeSignaturesCount} digital signatures will be permanently deleted.</li>
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
            onClick={() => alert("Assets initialized. Proceed to Digital Signatures for approval.")}
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
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showAlertModal, setShowAlertModal] = useState(false);
  
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
        preview: isMedia ? URL.createObjectURL(file) : undefined,
        blob: file
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
      preview: asset.preview,
      blob: asset.blob
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
      case "referrals": return <ReferralsView />;
      case "profile": return <ProfileView onDeleteAccount={handleDeleteAccount} activeSignaturesCount={activeSignatures.length} />;
      case "secure_asset": return <SecureAssetView onUpload={handleFileUpload} />;
      case "update": return <UpdateView />;
      default: return <OverviewView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Executive Overview";
      case "signatures": return "Digital Signatures";
      case "monitoring": return "Global Monitor";
      case "enforcement": return "Legal Enforcement";
      case "referrals": return "Referral Program";
      case "profile": return "Member Profile";
      case "secure_asset": return "Secure New Asset";
      case "update": return "Tier Management";
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
          gap: "32px",
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
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            { icon: Activity, label: "Executive Overview", id: "overview" },
            { icon: Fingerprint, label: "Digital Signatures", id: "signatures" },
            { icon: Globe, label: "Global Monitor", id: "monitoring" },
            { icon: ShieldCheck, label: "Legal Enforcement", id: "enforcement" },
            { icon: ArrowUpRight, label: "Update Tiers", id: "update" },
            { icon: Gift, label: "Referral Program", id: "referrals" },
            { icon: User, label: "Member Profile", id: "profile" },
          ].map((item) => (
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
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <button
            onClick={() => setActiveTab("secure_asset")}
            style={{
              width: "100%",
              padding: "14px",
              background: COLORS.accent,
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: activeTab === "secure_asset" ? `0 0 20px ${COLORS.accent}40` : "none",
            }}
          >
            <Plus size={16} />
            Secure Asset
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header */}
        <header
          style={{
            height: "80px",
            borderBottom: `1px solid ${COLORS.border}`,
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(5,5,5,0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <h1 style={{ fontSize: "18px", fontWeight: 600, margin: 0 }}>{getPageTitle()}</h1>
            <div style={{ width: "1px", height: "20px", background: COLORS.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: COLORS.textSecondary, fontSize: "12px" }}>
              <Clock size={14} />
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={COLORS.textSecondary} />
              {unreadNotifications > 0 && (
                <div style={{ position: "absolute", top: "-2px", right: "-2px", width: "8px", height: "8px", background: COLORS.danger, borderRadius: "50%", border: `2px solid ${COLORS.bg}` }} />
              )}
            </div>
            <div 
              onClick={() => setShowAlertModal(true)}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "30px", border: `1px solid ${COLORS.border}`, cursor: "pointer" }}
            >
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#000" }}>EW</div>
              <span style={{ fontSize: "12px", fontWeight: 500 }}>Everett Williams</span>
              <ChevronDown size={14} color={COLORS.textSecondary} />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main style={{ padding: "40px", overflowY: "auto" }}>
          {renderContent()}
        </main>
      </div>

      {/* Global Alert Modal */}
      <Modal isOpen={showAlertModal} onClose={() => setShowAlertModal(false)} title="Security Alert System">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ padding: "20px", background: "rgba(239,68,68,0.05)", borderRadius: "12px", border: `1px solid ${COLORS.danger}20` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <ShieldAlert size={20} color={COLORS.danger} />
              <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>High Severity Threat Detected</h4>
            </div>
            <p style={{ fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.5, margin: 0 }}>An unauthorized distribution of "Official Campaign Video" has been detected on a high-risk platform. Enforcement nodes have been initialized.</p>
            <button 
              onClick={() => { setShowAlertModal(false); setActiveTab("monitoring"); }}
              style={{ marginTop: "16px", padding: "8px 16px", background: COLORS.danger, color: "#FFF", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}
            >
              Go to Global Monitor
            </button>
          </div>
          <div style={{ padding: "20px", background: "rgba(59,130,246,0.05)", borderRadius: "12px", border: `1px solid ${COLORS.accentSecondary}20` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <Info size={20} color={COLORS.accentSecondary} />
              <h4 style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>System Maintenance</h4>
            </div>
            <p style={{ fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.5, margin: 0 }}>Scheduled maintenance for the Neural Fingerprint Engine on Jul 10, 2026. Asset processing may experience minor delays.</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ChevronDown({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>;
}
