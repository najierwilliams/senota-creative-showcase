/**
 * SENOTA — Vault Engine
 * Backend Intelligence System UI
 * Real-time threat scanning, comparison, storage, and notification system
 */

import { useState, useEffect, useRef } from "react";
import {
  Cpu,
  Database,
  Eye,
  Globe,
  Zap,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Activity,
  Radio,
  Radar,
  Server,
  Network,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  BarChart3,
  Layers,
  MapPin,
  Users,
  FileText,
  Download,
  ArrowRight,
  Gauge,
  Wifi,
  Droplet,
  Flame,
  Wind,
  Zap as Lightning,
  Info,
  X,
} from "lucide-react";

/* ── Theme Constants ────────────────────────────────────── */
const COLORS = {
  bg: "#050505",
  surface: "#121212",
  surfaceHover: "#1A1A1A",
  border: "rgba(255, 255, 255, 0.08)",
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0A0",
  accent: "#D4AF37",
  accentSecondary: "#3B82F6",
  success: "#10B981",
  danger: "#EF4444",
  warning: "#F59E0B",
  cyan: "#06B6D4",
  purple: "#8B5CF6",
};

/* ── Engine Status Data ────────────────────────────────────── */
const ENGINE_NODES = [
  { id: "node-us-west", name: "US West", region: "San Francisco", status: "active", latency: "12ms", threats: 24 },
  { id: "node-eu-central", name: "EU Central", region: "Berlin", status: "active", latency: "18ms", threats: 31 },
  { id: "node-asia-east", name: "Asia East", region: "Tokyo", status: "active", latency: "22ms", threats: 18 },
  { id: "node-sa-north", name: "South America", region: "São Paulo", status: "active", latency: "45ms", threats: 8 },
];

const THREAT_TYPES = [
  { type: "Content Duplication", count: 156, severity: "high", icon: Copy },
  { type: "Unauthorized Redistribution", count: 89, severity: "critical", icon: Share2 },
  { type: "Deepfake Detection", count: 12, severity: "critical", icon: Eye },
  { type: "Impersonation Accounts", count: 34, severity: "high", icon: Users },
  { type: "Watermark Stripping", count: 67, severity: "medium", icon: Layers },
  { type: "Platform Violations", count: 23, severity: "medium", icon: AlertTriangle },
];

const RECENT_SCANS = [
  { id: "scan-001", target: "Everett's Brand Assets", platform: "Instagram", time: "Just now", results: 12, status: "complete" },
  { id: "scan-002", target: "Campaign Video Collection", platform: "TikTok", time: "2 minutes ago", results: 8, status: "complete" },
  { id: "scan-003", target: "Creative Showcase PDF", platform: "Pinterest", time: "5 minutes ago", results: 3, status: "complete" },
  { id: "scan-004", target: "Identity Signatures", platform: "YouTube", time: "12 minutes ago", results: 15, status: "complete" },
  { id: "scan-005", target: "Commercial Raw Files", platform: "Dropbox Shares", time: "18 minutes ago", results: 5, status: "complete" },
];

const STORAGE_METRICS = [
  { name: "Threat Database", size: "2.4 TB", growth: "+340 GB/month", color: COLORS.danger },
  { name: "Fingerprint Index", size: "890 GB", growth: "+120 GB/month", color: COLORS.accent },
  { name: "Comparison Cache", size: "1.2 TB", growth: "+85 GB/month", color: COLORS.accentSecondary },
  { name: "User Assets", size: "340 GB", growth: "+45 GB/month", color: COLORS.success },
];

const NOTIFICATION_QUEUE = [
  { id: "notif-1", user: "Everett", threat: "New unauthorized copy detected", platform: "Instagram", time: "Just now", severity: "high" },
  { id: "notif-2", user: "Everett", threat: "Deepfake variant identified", platform: "TikTok", time: "3 min ago", severity: "critical" },
  { id: "notif-3", user: "Everett", threat: "Watermark removal attempt", platform: "YouTube", time: "8 min ago", severity: "medium" },
  { id: "notif-4", user: "Everett", threat: "Impersonation account created", platform: "Twitter", time: "15 min ago", severity: "high" },
];

/* ── Utility Components ────────────────────────────────────── */
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

/* ── Engine Views ────────────────────────────────────── */

const EngineOverviewView = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      {/* System Health Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {[
          { label: "Engine Status", value: "OPERATIONAL", trend: "All Systems", icon: Cpu, color: COLORS.success },
          { label: "Global Nodes", value: "4", trend: "100% Online", icon: Network, color: COLORS.accentSecondary },
          { label: "Threats Detected", value: "381", trend: "+45 today", icon: AlertCircle, color: COLORS.danger },
          { label: "Processing Speed", value: "99.8%", trend: "Optimal", icon: Zap, color: COLORS.accent },
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

      {/* Main Intelligence Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Threat Detection Feed */}
        <Card title="Real-Time Threat Detection" subtitle="Live scanning across 47 platforms" extra={<Radio size={14} color={COLORS.accent} style={{ animation: "pulse 2s infinite" }} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: COLORS.border, borderRadius: "8px", overflow: "hidden" }}>
            {THREAT_TYPES.map((threat, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "16px", background: COLORS.surface, alignItems: "center", transition: "background 0.2s", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surfaceHover)} onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.surface)}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <threat.icon size={14} color={threat.severity === "critical" ? COLORS.danger : threat.severity === "high" ? COLORS.warning : COLORS.accentSecondary} />
                  <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{threat.type}</p>
                </div>
                <Badge color={threat.severity === "critical" ? COLORS.danger : threat.severity === "high" ? COLORS.warning : COLORS.accentSecondary}>{threat.severity}</Badge>
                <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.accent }}>{threat.count}</span>
                <div style={{ textAlign: "right" }}><ChevronRight size={14} color={COLORS.textSecondary} /></div>
              </div>
            ))}
          </div>
        </Card>

        {/* Engine Nodes Status */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <Card title="Global Nodes" subtitle="Distributed scanning network" extra={<Globe size={14} color={COLORS.cyan} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {ENGINE_NODES.map((node) => (
                <div key={node.id} style={{ padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: `1px solid ${COLORS.border}`, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; setSelectedNode(node.id); }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; setSelectedNode(null); }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>{node.name}</span>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 8px ${COLORS.success}` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: COLORS.textSecondary }}>
                    <span>{node.region}</span>
                    <span>{node.latency}</span>
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "10px", color: COLORS.accent }}>Threats: {node.threats}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="System Load" subtitle="CPU & Memory utilization" extra={<Gauge size={14} color={COLORS.warning} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "CPU", value: 67, color: COLORS.warning },
                { label: "Memory", value: 54, color: COLORS.accentSecondary },
                { label: "Disk I/O", value: 42, color: COLORS.success },
              ].map((metric, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "11px" }}>
                    <span>{metric.label}</span>
                    <span style={{ color: metric.color, fontWeight: 600 }}>{metric.value}%</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                    <div style={{ width: `${metric.value}%`, height: "100%", background: metric.color, borderRadius: "3px", transition: "width 0.3s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ScanningView = () => {
  const [expandedScan, setExpandedScan] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Active & Recent Scans" subtitle="Web scanning operations across all platforms">
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: COLORS.border, borderRadius: "8px", overflow: "hidden" }}>
          {RECENT_SCANS.map((scan, i) => (
            <div key={i}>
              <div
                style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 0.5fr", padding: "16px", background: COLORS.surface, alignItems: "center", transition: "background 0.2s", cursor: "pointer" }}
                onClick={() => setExpandedScan(expandedScan === scan.id ? null : scan.id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.surfaceHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.surface)}
              >
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 500, margin: 0 }}>{scan.target}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <Radio size={10} color={COLORS.textSecondary} style={{ animation: "pulse 1s infinite" }} />
                    <span style={{ fontSize: "10px", color: COLORS.textSecondary }}>{scan.platform}</span>
                  </div>
                </div>
                <Badge color={COLORS.success}>Complete</Badge>
                <span style={{ fontSize: "11px", color: COLORS.textSecondary, textAlign: "right" }}>{scan.time}</span>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: COLORS.danger }}>{scan.results}</span>
                </div>
                <div style={{ textAlign: "right" }}><ChevronRight size={14} color={COLORS.textSecondary} style={{ transform: expandedScan === scan.id ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} /></div>
              </div>
              {expandedScan === scan.id && (
                <div style={{ padding: "16px", background: "rgba(255,255,255,0.02)", borderTop: `1px solid ${COLORS.border}`, fontSize: "12px", color: COLORS.textSecondary, lineHeight: 1.6 }}>
                  <p style={{ margin: 0, marginBottom: "12px" }}>Scan Details for {scan.target}:</p>
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    <li>Fingerprint matches: {scan.results} instances detected</li>
                    <li>Comparison completed: 2.3 seconds</li>
                    <li>Platforms scanned: 47 major platforms</li>
                    <li>Confidence score: 98.7%</li>
                    <li>Takedown notifications: Sent to {scan.results} platform admins</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Scanning Statistics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        <Card title="Scans Today" subtitle="Total operations">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>847</p>
          <p style={{ fontSize: "12px", color: COLORS.success }}>↑ 23% from yesterday</p>
        </Card>
        <Card title="Avg Scan Time" subtitle="Per asset">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>2.1s</p>
          <p style={{ fontSize: "12px", color: COLORS.accent }}>Optimized performance</p>
        </Card>
        <Card title="Detection Rate" subtitle="Accuracy">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>99.2%</p>
          <p style={{ fontSize: "12px", color: COLORS.success }}>Industry leading</p>
        </Card>
      </div>
    </div>
  );
};

const ComparisonView = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Fingerprint Comparison Engine" subtitle="AI-powered content matching & verification">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { name: "Neural Fingerprint Matching", accuracy: 98.7, speed: "2.1ms", status: "active" },
            { name: "Watermark Detection", accuracy: 96.3, speed: "1.8ms", status: "active" },
            { name: "Deepfake Analysis", accuracy: 94.2, speed: "3.5ms", status: "active" },
            { name: "Metadata Comparison", accuracy: 99.1, speed: "0.9ms", status: "active" },
            { name: "Visual Similarity Index", accuracy: 97.8, speed: "2.3ms", status: "active" },
          ].map((algo, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{algo.name}</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "4px 0 0" }}>Status: {algo.status}</p>
                </div>
                <Badge color={COLORS.success}>Online</Badge>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", fontSize: "12px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span>Accuracy</span>
                    <span style={{ color: COLORS.accent, fontWeight: 600 }}>{algo.accuracy}%</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                    <div style={{ width: `${algo.accuracy}%`, height: "100%", background: COLORS.accent, borderRadius: "2px" }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span>Avg Speed</span>
                    <span style={{ color: COLORS.accentSecondary, fontWeight: 600 }}>{algo.speed}</span>
                  </div>
                  <div style={{ width: "100%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                    <div style={{ width: "75%", height: "100%", background: COLORS.accentSecondary, borderRadius: "2px" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <Card title="Comparison Algorithms" subtitle="Advanced detection methods">
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "12px" }}>
            {[
              "Perceptual Hashing (pHash)",
              "Convolutional Neural Networks",
              "Spectral Analysis",
              "Temporal Pattern Matching",
              "Semantic Content Analysis",
            ].map((algo, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px", borderRadius: "6px", background: "rgba(255,255,255,0.02)" }}>
                <CheckCircle size={12} color={COLORS.success} />
                <span>{algo}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Comparison Metrics" subtitle="Performance indicators">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { metric: "False Positive Rate", value: "0.3%", color: COLORS.success },
              { metric: "False Negative Rate", value: "1.2%", color: COLORS.warning },
              { metric: "Avg Confidence", value: "97.4%", color: COLORS.accent },
              { metric: "Processing Throughput", value: "12.4K/sec", color: COLORS.accentSecondary },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderRadius: "6px", background: "rgba(255,255,255,0.02)", fontSize: "12px" }}>
                <span>{m.metric}</span>
                <span style={{ color: m.color, fontWeight: 600 }}>{m.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const StorageView = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Distributed Storage System" subtitle="Multi-tier data architecture">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {STORAGE_METRICS.map((storage, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: `1px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{storage.name}</p>
                  <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: "4px 0 0" }}>Growth: {storage.growth}</p>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: storage.color }}>{storage.size}</p>
              </div>
              <div style={{ width: "100%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ width: `${60 + i * 10}%`, height: "100%", background: storage.color, borderRadius: "3px" }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <Card title="Total Storage Capacity" subtitle="Across all nodes">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>4.83 TB</p>
          <p style={{ fontSize: "12px", color: COLORS.accent }}>590 GB available</p>
          <div style={{ marginTop: "16px", width: "100%", height: "8px", borderRadius: "4px", background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
            <div style={{ width: "87.8%", height: "100%", background: `linear-gradient(90deg, ${COLORS.danger}, ${COLORS.warning}, ${COLORS.accent})`, borderRadius: "4px" }} />
          </div>
        </Card>

        <Card title="Storage Growth" subtitle="Monthly trend">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>+590 GB</p>
          <p style={{ fontSize: "12px", color: COLORS.warning }}>↑ 12% increase this month</p>
          <div style={{ marginTop: "16px", display: "flex", alignItems: "flex-end", gap: "4px", height: "40px" }}>
            {[40, 50, 45, 60, 55, 70, 65, 80].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: COLORS.accent, borderRadius: "2px", opacity: 0.6 + i * 0.05 }} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const NotificationView = () => {
  const [dismissedNotifications, setDismissedNotifications] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedNotifications(prev => new Set([...prev, id]));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeIn 0.5s ease-out" }}>
      <Card title="Notification Queue" subtitle="Real-time alerts for Everett" extra={<Radio size={14} color={COLORS.danger} style={{ animation: "pulse 1s infinite" }} />}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {NOTIFICATION_QUEUE.filter(n => !dismissedNotifications.has(n.id)).map((notif) => (
            <div key={notif.id} style={{ padding: "16px", borderRadius: "8px", borderLeft: `3px solid ${notif.severity === "critical" ? COLORS.danger : notif.severity === "high" ? COLORS.warning : COLORS.accentSecondary}`, background: notif.severity === "critical" ? "rgba(239,68,68,0.05)" : notif.severity === "high" ? "rgba(245,158,11,0.05)" : "rgba(59,130,246,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, margin: 0 }}>{notif.threat}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", fontSize: "11px", color: COLORS.textSecondary }}>
                    <MapPin size={12} />
                    <span>{notif.platform}</span>
                    <span>•</span>
                    <Clock size={12} />
                    <span>{notif.time}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <Badge color={notif.severity === "critical" ? COLORS.danger : notif.severity === "high" ? COLORS.warning : COLORS.accentSecondary}>{notif.severity}</Badge>
                  <button onClick={() => handleDismiss(notif.id)} style={{ background: "transparent", border: "none", color: COLORS.textSecondary, cursor: "pointer", padding: "4px" }}>
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        <Card title="Notifications Today" subtitle="Total alerts sent">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>47</p>
          <p style={{ fontSize: "12px", color: COLORS.danger }}>12 critical</p>
        </Card>
        <Card title="Avg Response Time" subtitle="User action">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>3.2m</p>
          <p style={{ fontSize: "12px", color: COLORS.success }}>↓ 15% faster</p>
        </Card>
        <Card title="Notification Delivery" subtitle="Success rate">
          <p style={{ fontSize: "32px", fontWeight: 300, margin: "16px 0 4px" }}>99.8%</p>
          <p style={{ fontSize: "12px", color: COLORS.accent }}>Reliable delivery</p>
        </Card>
      </div>

      <Card title="Notification Channels" subtitle="Delivery methods">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {[
            { channel: "Email", count: 28, icon: Mail },
            { channel: "Push", count: 12, icon: Bell },
            { channel: "SMS", count: 5, icon: Smartphone },
            { channel: "In-App", count: 2, icon: Bell },
          ].map((ch, i) => (
            <div key={i} style={{ padding: "16px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
              <ch.icon size={20} color={COLORS.accent} style={{ margin: "0 auto 12px" }} />
              <p style={{ fontSize: "12px", fontWeight: 600, margin: 0 }}>{ch.channel}</p>
              <p style={{ fontSize: "18px", fontWeight: 300, margin: "8px 0 0", color: COLORS.accent }}>{ch.count}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

/* ── Main Component ────────────────────────────────────── */
export default function VaultEnginePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <EngineOverviewView />;
      case "scanning": return <ScanningView />;
      case "comparison": return <ComparisonView />;
      case "storage": return <StorageView />;
      case "notifications": return <NotificationView />;
      default: return <EngineOverviewView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Engine Overview";
      case "scanning": return "Web Scanning";
      case "comparison": return "Fingerprint Comparison";
      case "storage": return "Data Storage";
      case "notifications": return "Notification System";
      default: return "Engine";
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
            ENGINE
          </p>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            { icon: Cpu, label: "Engine Overview", id: "overview" },
            { icon: Radar, label: "Web Scanning", id: "scanning" },
            { icon: Eye, label: "Fingerprint Comparison", id: "comparison" },
            { icon: Database, label: "Data Storage", id: "storage" },
            { icon: Bell, label: "Notification System", id: "notifications" },
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

        {/* Engine Status Indicator */}
        <div style={{ marginTop: "auto", padding: "16px", borderRadius: "8px", background: "rgba(16,185,129,0.05)", border: `1px solid rgba(16,185,129,0.2)` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.success, boxShadow: `0 0 8px ${COLORS.success}` }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: COLORS.success }}>OPERATIONAL</span>
          </div>
          <p style={{ fontSize: "10px", color: COLORS.textSecondary, margin: 0 }}>All systems running at optimal capacity</p>
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
              <Radio size={12} style={{ animation: "pulse 1s infinite" }} />
              <span>Live Monitoring</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(212,175,55,0.1)", border: `1px solid ${COLORS.accent}30`, borderRadius: "6px", color: COLORS.accent, fontSize: "12px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.1)"; }}>
              <RefreshCw size={14} />
              Refresh
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 12px", background: "rgba(255,255,255,0.03)", borderRadius: "30px", border: `1px solid ${COLORS.border}` }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: COLORS.success }} />
              <span style={{ fontSize: "12px", fontWeight: 500 }}>System Healthy</span>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main style={{ padding: "40px", overflowY: "auto" }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

/* ── Icon Placeholders ────────────────────────────────────── */
function Copy({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>;
}

function Share2({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}

function Bell({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}

function Mail({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
}

function Smartphone({ size, color }: any) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>;
}
