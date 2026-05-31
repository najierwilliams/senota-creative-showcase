/*
 * SENOTA — Employee Dashboard
 * Design: Editorial, contemporary art archive aesthetic
 * Sections: Training Tracker, Announcements, Resources, Schedule
 */

import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  Megaphone,
  BookOpen,
  Calendar,
  LogOut,
  Loader2,
  ChevronDown,
  ChevronUp,
  Pin,
  AlertTriangle,
  Info,
  PartyPopper,
  FileText,
} from "lucide-react";

type TabKey = "training" | "announcements" | "resources" | "schedule";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "training", label: "Training", icon: <BookOpen size={16} /> },
  { key: "announcements", label: "Announcements", icon: <Megaphone size={16} /> },
  { key: "resources", label: "Resources", icon: <FileText size={16} /> },
  { key: "schedule", label: "Schedule", icon: <Calendar size={16} /> },
];

const CATEGORY_COLORS: Record<string, string> = {
  general: "#8A8A8A",
  urgent: "#CC0000",
  event: "#3B82F6",
  policy: "#F59E0B",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  general: <Info size={14} />,
  urgent: <AlertTriangle size={14} />,
  event: <PartyPopper size={14} />,
  policy: <FileText size={14} />,
};

const RESOURCES = [
  {
    title: "Employee Handbook",
    description: "Company policies, code of conduct, and operational guidelines.",
    category: "Policy",
    href: "#",
  },
  {
    title: "Brand Style Guide",
    description: "SENOTA visual identity, typography, color system, and usage rules.",
    category: "Design",
    href: "#",
  },
  {
    title: "Content Submission Portal",
    description: "Submit editorial content, photography, and creative assets.",
    category: "Workflow",
    href: "/submit",
  },
  {
    title: "Photography Standards",
    description: "Technical specs, composition guidelines, and post-processing requirements.",
    category: "Creative",
    href: "#",
  },
  {
    title: "Social Media Playbook",
    description: "Tone of voice, posting schedules, and platform-specific guidelines.",
    category: "Marketing",
    href: "#",
  },
  {
    title: "Event Production Checklist",
    description: "Pre-event, day-of, and post-event operational checklists.",
    category: "Operations",
    href: "#",
  },
];

export default function EmployeeDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("training");
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  // tRPC queries
  const progressQuery = trpc.employee.getMyProgress.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const announcementsQuery = trpc.employee.getAnnouncements.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // tRPC mutations
  const utils = trpc.useUtils();
  const markComplete = trpc.employee.markModuleComplete.useMutation({
    onSuccess: () => {
      utils.employee.getMyProgress.invalidate();
      toast.success("Module marked as complete!");
    },
    onError: () => toast.error("Failed to update progress"),
  });
  const markInProgress = trpc.employee.markModuleInProgress.useMutation({
    onSuccess: () => {
      utils.employee.getMyProgress.invalidate();
    },
  });

  // Redirect if not authenticated or wrong role
  if (!loading && !isAuthenticated) {
    window.location.href = "/account";
    return null;
  }

  if (!loading && user && user.role !== "employee" && user.role !== "admin") {
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F7F7" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "#CC0000" }} />
      </div>
    );
  }

  // Compute progress stats
  const modules = progressQuery.data ?? [];
  const total = modules.length;
  const completed = modules.filter((m: any) => m.status === "completed").length;
  const inProgress = modules.filter((m: any) => m.status === "in_progress").length;
  const required = modules.filter((m: any) => m.isRequired).length;
  const requiredCompleted = modules.filter((m: any) => m.isRequired && m.status === "completed").length;
  const overallPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Group modules by category
  const byCategory: Record<string, typeof modules> = {};
  modules.forEach((m: any) => {
    if (!byCategory[m.category]) byCategory[m.category] = [];
    byCategory[m.category].push(m);
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F7", fontFamily: "'DM Sans', sans-serif" }}>
      <SiteHeader />

      {/* ── Dashboard Header ─────────────────────────────────────── */}
      <div style={{ backgroundColor: "#0D0D0D", borderBottom: "1px solid #2A2A2A" }}>
        <div className="container py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#1A1A1A",
                  border: "2px solid #CC0000",
                  overflow: "hidden",
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#CC0000",
                    }}
                  >
                    {(user?.name ?? "?")[0].toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "#CC0000",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}
                >
                  Staff Portal
                </p>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "26px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    lineHeight: 1.1,
                  }}
                >
                  {user?.name ?? "Employee"}
                </h1>
              </div>
            </div>

            {/* Training progress summary */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#F7F7F7",
                    lineHeight: 1,
                  }}
                >
                  {overallPct}%
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    color: "#8A8A8A",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Complete
                </p>
              </div>
              <div className="text-center">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#F7F7F7",
                    lineHeight: 1,
                  }}
                >
                  {requiredCompleted}/{required}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px",
                    color: "#8A8A8A",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Required
                </p>
              </div>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "#8A8A8A",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: "1px solid #2A2A2A",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ───────────────────────────────────────── */}
      <div style={{ backgroundColor: "#0D0D0D", borderBottom: "1px solid #2A2A2A" }}>
        <div className="container">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-5 py-4 flex-shrink-0 transition-colors"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: activeTab === tab.key ? "#F7F7F7" : "#8A8A8A",
                  borderBottom: activeTab === tab.key ? "2px solid #CC0000" : "2px solid transparent",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ──────────────────────────────────────────── */}
      <div className="container py-10">

        {/* ── Training Tracker ─────────────────────────────────────── */}
        {activeTab === "training" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#0D0D0D",
                  }}
                >
                  Training Tracker
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginTop: "4px" }}>
                  Complete all required modules to be fully onboarded
                </p>
              </div>
            </div>

            {/* Overall progress bar */}
            <div
              className="p-5 mb-8"
              style={{ backgroundColor: "#0D0D0D" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "10px",
                    color: "#8A8A8A",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  Overall Progress
                </span>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                  }}
                >
                  {completed} / {total} modules
                </span>
              </div>
              <div style={{ height: "4px", backgroundColor: "#2A2A2A", borderRadius: "2px" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${overallPct}%`,
                    backgroundColor: "#CC0000",
                    borderRadius: "2px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
              <div className="flex gap-6 mt-4">
                {[
                  { label: "Completed", value: completed, color: "#22C55E" },
                  { label: "In Progress", value: inProgress, color: "#F59E0B" },
                  { label: "Not Started", value: total - completed - inProgress, color: "#8A8A8A" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: stat.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        color: "#8A8A8A",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {stat.value} {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {progressQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #E5E7EB" }}>
                <BookOpen size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  No training modules yet
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A0A0A0", marginTop: "8px" }}>
                  Training content will appear here once modules are published by your admin.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {Object.entries(byCategory).map(([category, catModules]) => (
                  <div key={category}>
                    <p
                      className="mb-3"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "10px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#CC0000",
                      }}
                    >
                      {category}
                    </p>
                    <div className="flex flex-col gap-2">
                      {catModules.map((mod: any) => {
                        const isExpanded = expandedModule === mod.moduleId;
                        const statusColor =
                          mod.status === "completed"
                            ? "#22C55E"
                            : mod.status === "in_progress"
                            ? "#F59E0B"
                            : "#8A8A8A";

                        return (
                          <div
                            key={mod.moduleId}
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #E5E7EB",
                            }}
                          >
                            {/* Module header row */}
                            <div
                              className="flex items-center gap-4 p-4 cursor-pointer"
                              onClick={() =>
                                setExpandedModule(isExpanded ? null : mod.moduleId)
                              }
                            >
                              {/* Status icon */}
                              {mod.status === "completed" ? (
                                <CheckCircle2 size={20} style={{ color: "#22C55E", flexShrink: 0 }} />
                              ) : mod.status === "in_progress" ? (
                                <PlayCircle size={20} style={{ color: "#F59E0B", flexShrink: 0 }} />
                              ) : (
                                <Circle size={20} style={{ color: "#E5E7EB", flexShrink: 0 }} />
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span
                                    style={{
                                      fontFamily: "'Syne', sans-serif",
                                      fontSize: "15px",
                                      fontWeight: 600,
                                      color: "#0D0D0D",
                                    }}
                                  >
                                    {mod.title}
                                  </span>
                                  {mod.isRequired && (
                                    <span
                                      style={{
                                        fontFamily: "'Space Mono', monospace",
                                        fontSize: "8px",
                                        letterSpacing: "0.12em",
                                        textTransform: "uppercase",
                                        color: "#CC0000",
                                        border: "1px solid #CC0000",
                                        padding: "1px 5px",
                                      }}
                                    >
                                      Required
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-1">
                                  <span
                                    style={{
                                      fontFamily: "'Space Mono', monospace",
                                      fontSize: "9px",
                                      color: "#8A8A8A",
                                      letterSpacing: "0.08em",
                                    }}
                                  >
                                    ~{mod.estimatedMinutes} min
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "'Space Mono', monospace",
                                      fontSize: "9px",
                                      color: statusColor,
                                      letterSpacing: "0.08em",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {mod.status?.replace("_", " ") ?? "not started"}
                                  </span>
                                </div>
                              </div>

                              {isExpanded ? (
                                <ChevronUp size={16} style={{ color: "#8A8A8A", flexShrink: 0 }} />
                              ) : (
                                <ChevronDown size={16} style={{ color: "#8A8A8A", flexShrink: 0 }} />
                              )}
                            </div>

                            {/* Expanded content */}
                            {isExpanded && (
                              <div
                                className="px-4 pb-4"
                                style={{ borderTop: "1px solid #F0EEE9" }}
                              >
                                {mod.description && (
                                  <p
                                    className="mt-3 mb-4"
                                    style={{
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "13px",
                                      color: "#8A8A8A",
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    {mod.description}
                                  </p>
                                )}
                                {mod.content && (
                                  <div
                                    className="p-4 mb-4"
                                    style={{
                                      backgroundColor: "#F7F7F7",
                                      border: "1px solid #E5E7EB",
                                      fontFamily: "'DM Sans', sans-serif",
                                      fontSize: "13px",
                                      color: "#0D0D0D",
                                      lineHeight: 1.7,
                                    }}
                                  >
                                    {mod.content}
                                  </div>
                                )}
                                <div className="flex gap-3">
                                  {mod.status !== "completed" && (
                                    <button
                                      onClick={() =>
                                        markComplete.mutate({ moduleId: mod.moduleId })
                                      }
                                      disabled={markComplete.isPending}
                                      className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-80"
                                      style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "11px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        backgroundColor: "#22C55E",
                                        color: "#FFFFFF",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {markComplete.isPending ? (
                                        <Loader2 size={12} className="animate-spin" />
                                      ) : (
                                        <CheckCircle2 size={12} />
                                      )}
                                      Mark Complete
                                    </button>
                                  )}
                                  {mod.status === "not_started" && (
                                    <button
                                      onClick={() =>
                                        markInProgress.mutate({ moduleId: mod.moduleId })
                                      }
                                      className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-80"
                                      style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "11px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        backgroundColor: "transparent",
                                        color: "#0D0D0D",
                                        border: "1px solid #0D0D0D",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <PlayCircle size={12} />
                                      Start Module
                                    </button>
                                  )}
                                  {mod.status === "completed" && (
                                    <span
                                      className="flex items-center gap-2 px-4 py-2"
                                      style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: "11px",
                                        letterSpacing: "0.1em",
                                        textTransform: "uppercase",
                                        color: "#22C55E",
                                      }}
                                    >
                                      <CheckCircle2 size={12} />
                                      Completed{" "}
                                      {mod.completedAt
                                        ? new Date(mod.completedAt).toLocaleDateString()
                                        : ""}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Announcements ────────────────────────────────────────── */}
        {activeTab === "announcements" && (
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#0D0D0D",
                marginBottom: "8px",
              }}
            >
              Announcements
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Company-wide and staff updates
            </p>

            {announcementsQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : announcementsQuery.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #E5E7EB" }}>
                <Megaphone size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  No announcements yet
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {announcementsQuery.data?.map((ann: any) => (
                  <div
                    key={ann.id}
                    className="p-5"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderLeft: `3px solid ${CATEGORY_COLORS[ann.category] ?? "#8A8A8A"}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span style={{ color: CATEGORY_COLORS[ann.category] ?? "#8A8A8A" }}>
                          {CATEGORY_ICONS[ann.category]}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#0D0D0D",
                          }}
                        >
                          {ann.title}
                        </h3>
                        {ann.isPinned && (
                          <Pin size={12} style={{ color: "#CC0000" }} />
                        )}
                      </div>
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          color: "#A0A0A0",
                          letterSpacing: "0.08em",
                          flexShrink: 0,
                        }}
                      >
                        {new Date(ann.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        color: "#4A4A4A",
                        lineHeight: 1.65,
                      }}
                    >
                      {ann.content}
                    </p>
                    <div className="mt-3">
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: CATEGORY_COLORS[ann.category] ?? "#8A8A8A",
                          border: `1px solid ${CATEGORY_COLORS[ann.category] ?? "#8A8A8A"}`,
                          padding: "2px 6px",
                        }}
                      >
                        {ann.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Resources ────────────────────────────────────────────── */}
        {activeTab === "resources" && (
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#0D0D0D",
                marginBottom: "8px",
              }}
            >
              Resources
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Guides, handbooks, and tools for SENOTA staff
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESOURCES.map((res) => (
                <a
                  key={res.title}
                  href={res.href}
                  onClick={(e) => {
                    if (res.href === "#") {
                      e.preventDefault();
                      toast.info("This resource will be available soon.");
                    }
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="p-5 h-full transition-all"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#CC0000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: "9px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#CC0000",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {res.category}
                    </span>
                    <p
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#0D0D0D",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {res.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#8A8A8A",
                        lineHeight: 1.6,
                      }}
                    >
                      {res.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── Schedule ─────────────────────────────────────────────── */}
        {activeTab === "schedule" && (
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#0D0D0D",
                marginBottom: "8px",
              }}
            >
              Schedule
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Your upcoming shifts, meetings, and deadlines
            </p>
            <div className="text-center py-20" style={{ border: "1px dashed #E5E7EB" }}>
              <Calendar size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontStyle: "italic",
                  color: "#8A8A8A",
                  marginBottom: "8px",
                }}
              >
                Schedule coming soon
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A0A0A0" }}>
                Staff scheduling and shift management will be available in a future update.
              </p>
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
