/*
 * SENOTA — The Circle VIP Dashboard
 * Design: Exclusive, dark editorial aesthetic
 * Sections: Community Feed, VIP Events, Perks & Offers, Announcements
 */

import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";
import {
  Heart,
  Calendar,
  Gift,
  Megaphone,
  LogOut,
  Loader2,
  MapPin,
  Video,
  Plus,
  Send,
  Crown,
  Pin,
  AlertTriangle,
  Info,
  PartyPopper,
  FileText,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from "lucide-react";

type TabKey = "feed" | "events" | "perks" | "announcements";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "feed", label: "The Feed", icon: <Crown size={16} /> },
  { key: "events", label: "VIP Events", icon: <Calendar size={16} /> },
  { key: "perks", label: "Perks", icon: <Gift size={16} /> },
  { key: "announcements", label: "Updates", icon: <Megaphone size={16} /> },
];

const RSVP_OPTIONS: { value: "going" | "maybe" | "not_going"; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "going", label: "Going", icon: <CheckCircle2 size={14} />, color: "#22C55E" },
  { value: "maybe", label: "Maybe", icon: <HelpCircle size={14} />, color: "#F59E0B" },
  { value: "not_going", label: "Can't Go", icon: <XCircle size={14} />, color: "#8A8A8A" },
];

const PERK_CATEGORY_COLORS: Record<string, string> = {
  discount: "#CC0000",
  access: "#3B82F6",
  merch: "#8B5CF6",
  experience: "#F59E0B",
  digital: "#22C55E",
};

const ANNOUNCEMENT_CATEGORY_COLORS: Record<string, string> = {
  general: "#8A8A8A",
  urgent: "#CC0000",
  event: "#3B82F6",
  policy: "#F59E0B",
};

const ANNOUNCEMENT_ICONS: Record<string, React.ReactNode> = {
  general: <Info size={14} />,
  urgent: <AlertTriangle size={14} />,
  event: <PartyPopper size={14} />,
  policy: <FileText size={14} />,
};

export default function CircleDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<TabKey>("feed");
  const [postContent, setPostContent] = useState("");
  const [showPostForm, setShowPostForm] = useState(false);

  // tRPC queries
  const postsQuery = trpc.circle.getPosts.useQuery(undefined, { enabled: isAuthenticated });
  const likedPostsQuery = trpc.circle.getMyLikedPosts.useQuery(undefined, { enabled: isAuthenticated });
  const eventsQuery = trpc.circle.getEvents.useQuery(undefined, { enabled: isAuthenticated });
  const rsvpsQuery = trpc.circle.getUserRsvps.useQuery(undefined, { enabled: isAuthenticated });
  const perksQuery = trpc.circle.getPerks.useQuery(undefined, { enabled: isAuthenticated });
  const announcementsQuery = trpc.circle.getAnnouncements.useQuery(undefined, { enabled: isAuthenticated });

  const utils = trpc.useUtils();

  const createPost = trpc.circle.createPost.useMutation({
    onSuccess: () => {
      utils.circle.getPosts.invalidate();
      setPostContent("");
      setShowPostForm(false);
      toast.success("Post shared with The Circle");
    },
    onError: () => toast.error("Failed to post"),
  });

  const likePost = trpc.circle.likePost.useMutation({
    onMutate: async ({ postId }) => {
      await utils.circle.getPosts.cancel();
      const prev = utils.circle.getPosts.getData();
      const likedPosts = utils.circle.getMyLikedPosts.getData() ?? [];
      const isLiked = likedPosts.includes(postId);

utils.circle.getPosts.setData(undefined, (old: any) =>
        old?.map((p: any) =>
          p.id === postId ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1 } : p
        )
      );
      utils.circle.getMyLikedPosts.setData(undefined, (old: any) =>
        isLiked ? (old ?? []).filter((id: any) => id !== postId) : [...(old ?? []), postId]
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.circle.getPosts.setData(undefined, ctx.prev);
    },
    onSettled: () => {
      utils.circle.getPosts.invalidate();
      utils.circle.getMyLikedPosts.invalidate();
    },
  });

  const rsvpEvent = trpc.circle.rsvpEvent.useMutation({
    onSuccess: () => {
      utils.circle.getUserRsvps.invalidate();
      toast.success("RSVP updated");
    },
    onError: () => toast.error("Failed to update RSVP"),
  });

  // Redirect if not authenticated or wrong role
  if (!loading && !isAuthenticated) {
    window.location.href = "/account";
    return null;
  }

  if (!loading && user && user.role !== "circle" && user.role !== "admin") {
    navigate("/");
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0D0D0D" }}>
        <Loader2 size={32} className="animate-spin" style={{ color: "#CC0000" }} />
      </div>
    );
  }

  const likedPostIds = likedPostsQuery.data ?? [];
  const myRsvpMap: Record<number, string> = {};
  (rsvpsQuery.data ?? []).forEach((r: any) => { myRsvpMap[r.eventId] = r.status; });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0D0D0D", fontFamily: "'DM Sans', sans-serif" }}>
      <SiteHeader />

      {/* ── VIP Header ───────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A0000 0%, #0D0D0D 60%, #1A0A00 100%)",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        <div className="container py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              {/* Crown badge */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #CC0000, #8B0000)",
                  boxShadow: "0 0 24px rgba(204, 0, 0, 0.4)",
                }}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <Crown size={24} style={{ color: "#F7F7F7" }} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "#CC0000",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                    }}
                  >
                    The Circle
                  </p>
                  <Crown size={10} style={{ color: "#CC0000" }} />
                </div>
                <h1
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                    lineHeight: 1.1,
                  }}
                >
                  {user?.name ?? "VIP Member"}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#F7F7F7",
                      lineHeight: 1,
                    }}
                  >
                    {perksQuery.data?.length ?? 0}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      color: "#8A8A8A",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Perks
                  </p>
                </div>
                <div className="text-center">
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#F7F7F7",
                      lineHeight: 1,
                    }}
                  >
                    {eventsQuery.data?.length ?? 0}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "9px",
                      color: "#8A8A8A",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Events
                  </p>
                </div>
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
      <div style={{ backgroundColor: "#111111", borderBottom: "1px solid #2A2A2A" }}>
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

        {/* ── Community Feed ───────────────────────────────────────── */}
        {activeTab === "feed" && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "32px",
                    fontWeight: 600,
                    color: "#F7F7F7",
                  }}
                >
                  The Feed
                </h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginTop: "4px" }}>
                  Exclusive Circle community posts
                </p>
              </div>
              <button
                onClick={() => setShowPostForm(!showPostForm)}
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
                <Plus size={14} />
                Post
              </button>
            </div>

            {/* Post form */}
            {showPostForm && (
              <div
                className="p-5 mb-6"
                style={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A" }}
              >
                <textarea
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share something with The Circle..."
                  className="w-full outline-none resize-none"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "#F7F7F7",
                    backgroundColor: "transparent",
                    border: "none",
                    lineHeight: 1.6,
                  }}
                />
                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid #2A2A2A" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "10px",
                      color: "#8A8A8A",
                    }}
                  >
                    {postContent.length} / 2000
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setShowPostForm(false); setPostContent(""); }}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#8A8A8A",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => createPost.mutate({ content: postContent })}
                      disabled={!postContent.trim() || createPost.isPending}
                      className="flex items-center gap-2 px-4 py-2 transition-opacity hover:opacity-80 disabled:opacity-40"
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
                      {createPost.isPending ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Send size={12} />
                      )}
                      Share
                    </button>
                  </div>
                </div>
              </div>
            )}

            {postsQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : postsQuery.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #2A2A2A" }}>
                <Crown size={40} style={{ color: "#2A2A2A", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  The feed is quiet
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#4A4A4A", marginTop: "8px" }}>
                  Be the first to post something for The Circle.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {postsQuery.data?.map((post: any) => {
                  const isLiked = likedPostIds.includes(post.id);
                  return (
                    <div
                      key={post.id}
                      className="p-5"
                      style={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                      }}
                    >
                      {/* Author row */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "#CC0000",
                            overflow: "hidden",
                          }}
                        >
                          {post.authorAvatar ? (
                            <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span
                              style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "16px",
                                fontWeight: 700,
                                color: "#F7F7F7",
                              }}
                            >
                              {(post.authorName ?? "?")[0].toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "#F7F7F7",
                              }}
                            >
                              {post.authorName ?? "Circle Member"}
                            </span>
                            {post.isPinned && (
                              <Pin size={11} style={{ color: "#CC0000" }} />
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "9px",
                              color: "#8A8A8A",
                              letterSpacing: "0.08em",
                            }}
                          >
                            {new Date(post.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14px",
                          color: "#D0D0D0",
                          lineHeight: 1.7,
                          marginBottom: post.imageUrl ? "12px" : "16px",
                        }}
                      >
                        {post.content}
                      </p>

                      {/* Image */}
                      {post.imageUrl && (
                        <div
                          className="mb-4 overflow-hidden"
                          style={{ maxHeight: "320px" }}
                        >
                          <img
                            src={post.imageUrl}
                            alt=""
                            className="w-full object-cover"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid #2A2A2A" }}>
                        <button
                          onClick={() => likePost.mutate({ postId: post.id })}
                          className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "10px",
                            color: isLiked ? "#CC0000" : "#8A8A8A",
                            letterSpacing: "0.08em",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <Heart
                            size={14}
                            fill={isLiked ? "#CC0000" : "none"}
                            style={{ color: isLiked ? "#CC0000" : "#8A8A8A" }}
                          />
                          {post.likes}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── VIP Events ───────────────────────────────────────────── */}
        {activeTab === "events" && (
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#F7F7F7",
                marginBottom: "8px",
              }}
            >
              VIP Events
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Exclusive events for Circle members only
            </p>

            {eventsQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : eventsQuery.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #2A2A2A" }}>
                <Calendar size={40} style={{ color: "#2A2A2A", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  No events scheduled yet
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#4A4A4A", marginTop: "8px" }}>
                  VIP events will appear here once announced.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eventsQuery.data?.map((event: any) => {
                  const myRsvp = myRsvpMap[event.id];
                  const isPast = new Date(event.eventDate) < new Date();
                  return (
                    <div
                      key={event.id}
                      style={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        opacity: isPast ? 0.6 : 1,
                      }}
                    >
                      {/* Cover */}
                      {event.coverUrl && (
                        <div style={{ height: "180px", overflow: "hidden" }}>
                          <img
                            src={event.coverUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        {/* Date badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "9px",
                              color: isPast ? "#8A8A8A" : "#CC0000",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                            }}
                          >
                            {new Date(event.eventDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          {isPast && (
                            <span
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "8px",
                                color: "#8A8A8A",
                                border: "1px solid #2A2A2A",
                                padding: "1px 5px",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                              }}
                            >
                              Past
                            </span>
                          )}
                        </div>
                        <h3
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "22px",
                            fontWeight: 600,
                            color: "#F7F7F7",
                            marginBottom: "8px",
                            lineHeight: 1.2,
                          }}
                        >
                          {event.title}
                        </h3>
                        {event.description && (
                          <p
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "13px",
                              color: "#8A8A8A",
                              lineHeight: 1.6,
                              marginBottom: "12px",
                            }}
                          >
                            {event.description}
                          </p>
                        )}
                        {/* Location */}
                        {(event.location || event.isVirtual) && (
                          <div className="flex items-center gap-1.5 mb-4">
                            {event.isVirtual ? (
                              <Video size={12} style={{ color: "#8A8A8A" }} />
                            ) : (
                              <MapPin size={12} style={{ color: "#8A8A8A" }} />
                            )}
                            <span
                              style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "12px",
                                color: "#8A8A8A",
                              }}
                            >
                              {event.isVirtual ? "Virtual Event" : event.location}
                            </span>
                          </div>
                        )}

                        {/* RSVP */}
                        {!isPast && (
                          <div>
                            <p
                              style={{
                                fontFamily: "'Space Mono', monospace",
                                fontSize: "9px",
                                color: "#8A8A8A",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                marginBottom: "8px",
                              }}
                            >
                              RSVP
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {RSVP_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  onClick={() =>
                                    rsvpEvent.mutate({ eventId: event.id, status: opt.value })
                                  }
                                  disabled={rsvpEvent.isPending}
                                  className="flex items-center gap-1.5 px-3 py-1.5 transition-all"
                                  style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "11px",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: myRsvp === opt.value ? "#0D0D0D" : opt.color,
                                    backgroundColor:
                                      myRsvp === opt.value ? opt.color : "transparent",
                                    border: `1px solid ${opt.color}`,
                                    cursor: "pointer",
                                  }}
                                >
                                  {opt.icon}
                                  {opt.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Perks ────────────────────────────────────────────────── */}
        {activeTab === "perks" && (
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                fontWeight: 600,
                color: "#F7F7F7",
                marginBottom: "8px",
              }}
            >
              Circle Perks
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Exclusive discounts, access, and benefits for Circle members
            </p>

            {perksQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : perksQuery.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #2A2A2A" }}>
                <Gift size={40} style={{ color: "#2A2A2A", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  Perks coming soon
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#4A4A4A", marginTop: "8px" }}>
                  Exclusive Circle benefits will be unlocked here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {perksQuery.data?.map((perk: any) => {
                  const catColor = PERK_CATEGORY_COLORS[perk.category] ?? "#CC0000";
                  const isExpired = perk.expiresAt && new Date(perk.expiresAt) < new Date();
                  return (
                    <div
                      key={perk.id}
                      className="p-5"
                      style={{
                        backgroundColor: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        opacity: isExpired ? 0.5 : 1,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "9px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: catColor,
                            border: `1px solid ${catColor}`,
                            padding: "2px 6px",
                          }}
                        >
                          {perk.category}
                        </span>
                        {isExpired && (
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "8px",
                              color: "#8A8A8A",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            Expired
                          </span>
                        )}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "20px",
                          fontWeight: 600,
                          color: "#F7F7F7",
                          marginBottom: "8px",
                          lineHeight: 1.2,
                        }}
                      >
                        {perk.title}
                      </h3>
                      {perk.description && (
                        <p
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            color: "#8A8A8A",
                            lineHeight: 1.6,
                            marginBottom: "12px",
                          }}
                        >
                          {perk.description}
                        </p>
                      )}
                      {perk.code && (
                        <div
                          className="flex items-center justify-between px-3 py-2"
                          style={{ backgroundColor: "#0D0D0D", border: "1px solid #2A2A2A" }}
                        >
                          <span
                            style={{
                              fontFamily: "'Space Mono', monospace",
                              fontSize: "13px",
                              color: "#CC0000",
                              letterSpacing: "0.15em",
                            }}
                          >
                            {perk.code}
                          </span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(perk.code!);
                              toast.success("Code copied!");
                            }}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "10px",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#8A8A8A",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Copy
                          </button>
                        </div>
                      )}
                      {perk.expiresAt && !isExpired && (
                        <p
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: "9px",
                            color: "#8A8A8A",
                            letterSpacing: "0.08em",
                            marginTop: "10px",
                          }}
                        >
                          Expires {new Date(perk.expiresAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  );
                })}
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
                color: "#F7F7F7",
                marginBottom: "8px",
              }}
            >
              Circle Updates
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#8A8A8A", marginBottom: "32px" }}>
              Messages and updates from SENOTA to The Circle
            </p>

            {announcementsQuery.isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 size={28} className="animate-spin" style={{ color: "#CC0000" }} />
              </div>
            ) : announcementsQuery.data?.length === 0 ? (
              <div className="text-center py-20" style={{ border: "1px dashed #2A2A2A" }}>
                <Megaphone size={40} style={{ color: "#2A2A2A", margin: "0 auto 16px" }} />
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "22px",
                    fontStyle: "italic",
                    color: "#8A8A8A",
                  }}
                >
                  No updates yet
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-w-2xl">
                {announcementsQuery.data?.map((ann: any) => (
                  <div
                    key={ann.id}
                    className="p-5"
                    style={{
                      backgroundColor: "#1A1A1A",
                      border: "1px solid #2A2A2A",
                      borderLeft: `3px solid ${ANNOUNCEMENT_CATEGORY_COLORS[ann.category] ?? "#CC0000"}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span style={{ color: ANNOUNCEMENT_CATEGORY_COLORS[ann.category] ?? "#CC0000" }}>
                          {ANNOUNCEMENT_ICONS[ann.category]}
                        </span>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#F7F7F7",
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
                          color: "#8A8A8A",
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
                        color: "#A0A0A0",
                        lineHeight: 1.65,
                      }}
                    >
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
