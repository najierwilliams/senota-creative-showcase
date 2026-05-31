/*
 * SENOTA — Customer Dashboard
 * Design: Editorial, contemporary art archive aesthetic
 * Sections: Digital Library, My Courses, Profile, Order History
 */

import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";
import {
  BookOpen,
  Download,
  GraduationCap,
  User,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  LogOut,
  Loader2,
  ShoppingBag,
} from "lucide-react";

type TabKey = "library" | "courses" | "profile" | "orders";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "library", label: "Digital Library", icon: <BookOpen size={16} /> },
  { key: "courses", label: "My Courses", icon: <GraduationCap size={16} /> },
  { key: "profile", label: "Profile", icon: <User size={16} /> },
  { key: "orders", label: "Order History", icon: <ShoppingBag size={16} /> },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "#8A8A8A",
  active: "#CC0000",
  completed: "#22C55E",
  paused: "#F59E0B",
};

export default function CustomerDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("library");
  const [profileForm, setProfileForm] = useState({
    name: "",
    bio: "",
    city: "",
  });
  const [profileEditing, setProfileEditing] = useState(false);

  // tRPC queries
  const magazines = trpc.dashboard.getMyMagazines.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const enrollments = trpc.dashboard.getMyEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // tRPC mutations
  const utils = trpc.useUtils();
  const downloadMutation = trpc.dashboard.downloadMagazine.useMutation({
    onSuccess: () => {
      utils.dashboard.getMyMagazines.invalidate();
      toast.success("Download started");
    },
    onError: () => toast.error("Download failed"),
  });
  const updateProfile = trpc.dashboard.updateProfile.useMutation({
    onSuccess: () => {
      toast.success("Profile updated");
      setProfileEditing(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    window.location.href = "/account";
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F7F7" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "#CC0000" }} />
      </div>
    );
  }

  const handleDownload = (magazineId: number, fileUrl: string | null | undefined) => {
    if (!fileUrl) {
      toast.info("Download link coming soon — check back after Issue 01 launches.");
      return;
    }
    downloadMutation.mutate({ magazineId });
    window.open(fileUrl, "_blank");
  };

  const handleProfileSave = () => {
    const data: Record<string, string> = {};
    if (profileForm.name.trim()) data.name = profileForm.name.trim();
    if (profileForm.bio.trim()) data.bio = profileForm.bio.trim();
    if (profileForm.city.trim()) data.city = profileForm.city.trim();
    updateProfile.mutate(data);
  };

  const startEditProfile = () => {
    setProfileForm({
      name: user?.name ?? "",
      bio: (user as any)?.bio ?? "",
      city: (user as any)?.city ?? "",
    });
    setProfileEditing(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F7F7", fontFamily: "'DM Sans', sans-serif" }}>
      <SiteHeader />

      {/* ── Dashboard Header ─────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <div className="container py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  backgroundColor: "#CC0000",
                  overflow: "hidden",
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name ?? ""} className="w-full h-full object-cover" />
                ) : (
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#F7F7F7",
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
                  Member Account
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
                  {user?.name ?? "Welcome"}
                </h1>
              </div>
            </div>
            <button
              onClick={async () => { await logout(); navigate("/"); }}
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

      {/* ── Tab Navigation ───────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#0D0D0D",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
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

        {/* ── Digital Library ─────────────────────────────────────── */}
        {activeTab === "library" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#0D0D0D",
                    lineHeight: 1.1,
                  }}
                >
                  Digital Library
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginTop: "4px" }}>
                  Your purchased digital magazines
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "11px",
                  color: "#CC0000",
                  letterSpacing: "0.1em",
                }}
              >
                {magazines.data?.length ?? 0} issues
              </span>
            </div>

            {magazines.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : magazines.data?.length === 0 ? (
              <div
                className="text-center py-20"
                style={{ border: "1px dashed #E5E7EB" }}
              >
                <BookOpen size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                    marginBottom: "8px",
                  }}
                >
                  Your library is empty
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A0A0A0" }}>
                  Purchase SENOTA Magazine to access your digital issues here.
                </p>
                <button
                  onClick={() => navigate("/magazine")}
                  className="mt-6 px-6 py-3 transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    backgroundColor: "#CC0000",
                    color: "#F7F7F7",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Browse Issues
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {magazines.data?.map((mag: any) => (
                  <div
                    key={mag.id}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    {/* Cover */}
                    <div
                      style={{
                        aspectRatio: "3/4",
                        backgroundColor: "#1A1A1A",
                        overflow: "hidden",
                      }}
                    >
                      {mag.coverUrl ? (
                        <img
                          src={mag.coverUrl}
                          alt={mag.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                              fontSize: "14px",
                              color: "#8A8A8A",
                              letterSpacing: "0.1em",
                            }}
                          >
                            SENOTA
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-4">
                      <p
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          color: "#CC0000",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                        }}
                      >
                        Issue {mag.issueNumber}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#0D0D0D",
                          marginBottom: "8px",
                        }}
                      >
                        {mag.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "9px",
                            color: "#A0A0A0",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {mag.downloadCount} download{mag.downloadCount !== 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={() => handleDownload(mag.magazineId, mag.fileUrl)}
                          disabled={downloadMutation.isPending}
                          className="flex items-center gap-1.5 px-3 py-2 transition-colors"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            backgroundColor: "#0D0D0D",
                            color: "#F7F7F7",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <Download size={12} />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── My Courses ───────────────────────────────────────────── */}
        {activeTab === "courses" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#0D0D0D",
                  }}
                >
                  My Courses
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginTop: "4px" }}>
                  Track your Academy enrollment progress
                </p>
              </div>
              <button
                onClick={() => navigate("/academy/enroll")}
                className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  backgroundColor: "#CC0000",
                  color: "#F7F7F7",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <GraduationCap size={14} />
                Enroll
              </button>
            </div>

            {enrollments.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : enrollments.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #E5E7EB" }}>
                <GraduationCap size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                    marginBottom: "8px",
                  }}
                >
                  No enrollments yet
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A0A0A0" }}>
                  Enroll in an Academy course to start building your portfolio.
                </p>
                <button
                  onClick={() => navigate("/academy/enroll")}
                  className="mt-6 px-6 py-3 transition-colors"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    backgroundColor: "#CC0000",
                    color: "#F7F7F7",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {enrollments.data?.map((enrollment: any) => (
                  <div
                    key={enrollment.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "18px",
                            fontWeight: 600,
                            color: "#0D0D0D",
                          }}
                        >
                          {enrollment.courseName}
                        </span>
                        <span
                          className="px-2 py-0.5"
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "9px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: STATUS_COLORS[enrollment.status] ?? "#8A8A8A",
                            border: `1px solid ${STATUS_COLORS[enrollment.status] ?? "#8A8A8A"}`,
                          }}
                        >
                          {enrollment.status}
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div
                        className="w-full"
                        style={{ height: "3px", backgroundColor: "#F0EEE9", marginBottom: "6px" }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${enrollment.progress}%`,
                            backgroundColor: "#CC0000",
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "10px",
                            color: "#8A8A8A",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {enrollment.progress}% complete
                        </span>
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "10px",
                            color: "#A0A0A0",
                          }}
                        >
                          Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/academy")}
                      className="flex items-center gap-1.5 px-4 py-2 flex-shrink-0 transition-opacity hover:opacity-70"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0D0D0D",
                        border: "1px solid #0D0D0D",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      Continue
                      <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Profile ──────────────────────────────────────────────── */}
        {activeTab === "profile" && (
          <div className="max-w-xl">
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#0D0D0D",
                marginBottom: "8px",
              }}
            >
              Your Profile
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Manage your SENOTA member information
            </p>

            <div
              className="p-6"
              style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB" }}
            >
              {/* Avatar row */}
              <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: "1px solid #F0EEE9" }}>
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#CC0000",
                    overflow: "hidden",
                  }}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "28px",
                        fontWeight: 700,
                        color: "#F7F7F7",
                      }}
                    >
                      {(user?.name ?? "?")[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: "#0D0D0D",
                    }}
                  >
                    {user?.name ?? "Member"}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "#CC0000",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {user?.role === "admin" ? "Admin" : user?.role === "circle" ? "The Circle" : user?.role === "employee" ? "Employee" : "Member"}
                  </p>
                </div>
              </div>

              {/* Fields */}
              {profileEditing ? (
                <div className="flex flex-col gap-4">
                  {[
                    { key: "name", label: "Display Name", placeholder: "Your name" },
                    { key: "city", label: "City", placeholder: "Where are you based?" },
                    { key: "bio", label: "Bio", placeholder: "Tell us about yourself..." },
                  ].map((field) => (
                    <div key={field.key}>
                      <label
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "9px",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "#8A8A8A",
                          display: "block",
                          marginBottom: "6px",
                        }}
                      >
                        {field.label}
                      </label>
                      {field.key === "bio" ? (
                        <textarea
                          rows={3}
                          value={profileForm[field.key as keyof typeof profileForm]}
                          onChange={(e) =>
                            setProfileForm((p) => ({ ...p, [field.key]: e.target.value }))
                          }
                          placeholder={field.placeholder}
                          className="w-full outline-none resize-none"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "14px",
                            color: "#0D0D0D",
                            border: "1px solid #E5E7EB",
                            padding: "10px 12px",
                            backgroundColor: "#F7F7F7",
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          value={profileForm[field.key as keyof typeof profileForm]}
                          onChange={(e) =>
                            setProfileForm((p) => ({ ...p, [field.key]: e.target.value }))
                          }
                          placeholder={field.placeholder}
                          className="w-full outline-none"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "14px",
                            color: "#0D0D0D",
                            border: "1px solid #E5E7EB",
                            padding: "10px 12px",
                            backgroundColor: "#F7F7F7",
                          }}
                        />
                      )}
                    </div>
                  ))}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={handleProfileSave}
                      disabled={updateProfile.isPending}
                      className="flex items-center gap-2 px-5 py-2.5 transition-opacity hover:opacity-80"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        backgroundColor: "#CC0000",
                        color: "#F7F7F7",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {updateProfile.isPending && <Loader2 size={12} className="animate-spin" />}
                      Save Changes
                    </button>
                    <button
                      onClick={() => setProfileEditing(false)}
                      className="px-5 py-2.5 transition-opacity hover:opacity-70"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#8A8A8A",
                        border: "1px solid #E5E7EB",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Email", value: user?.email ?? "—" },
                    { label: "City", value: (user as any)?.city ?? "—" },
                    { label: "Bio", value: (user as any)?.bio ?? "—" },
                    {
                      label: "Member Since",
                      value: user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })
                        : "—",
                    },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-4">
                      <span
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontSize: "10px",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#8A8A8A",
                          minWidth: "100px",
                          paddingTop: "2px",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          color: "#0D0D0D",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                  <button
                    onClick={startEditProfile}
                    className="mt-2 px-5 py-2.5 self-start transition-opacity hover:opacity-80"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      backgroundColor: "#0D0D0D",
                      color: "#F7F7F7",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Order History ────────────────────────────────────────── */}
        {activeTab === "orders" && (
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
              Order History
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Your past purchases and transactions
            </p>
            <div className="text-center py-20" style={{ border: "1px dashed #E5E7EB" }}>
              <ShoppingBag size={40} style={{ color: "#E5E7EB", margin: "0 auto 16px" }} />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "22px",
                  fontStyle: "italic",
                  color: "#8A8A8A",
                  marginBottom: "8px",
                }}
              >
                Order history coming soon
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#A0A0A0" }}>
                Full purchase history and receipts will be available when the SENOTA shop launches.
              </p>
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
