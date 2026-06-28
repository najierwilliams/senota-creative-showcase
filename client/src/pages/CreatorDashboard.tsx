import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { User, Mail, Zap, Heart, Share2, Settings, LogOut, Loader2, Copy, CheckCircle, TrendingUp, Award, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function CreatorDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <Loader2 className="animate-spin" size={32} color="#1A1A1A" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <User size={48} className="mx-auto text-[#8A8A8A]" />
            </div>
            <h1 className="text-2xl font-serif uppercase tracking-widest text-[#1A1A1A] mb-4">
              Creator Dashboard
            </h1>
            <p className="text-sm text-[#8A8A8A] mb-8">
              Sign in to access your creator dashboard, manage your work, and track your growth within the Senota ecosystem.
            </p>
            <a
              href="/login"
              className="inline-block px-8 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-all rounded"
            >
              Sign In to Dashboard
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      
      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="flex items-start justify-between gap-8 mb-8">
              <div>
                <p className="text-xs font-mono text-[#CC0000] uppercase tracking-[0.2em] mb-2">
                  Welcome Back
                </p>
                <h1 className="text-4xl font-serif uppercase tracking-widest text-[#1A1A1A] mb-2">
                  {user?.name || "Creator"}
                </h1>
                <p className="text-sm text-[#8A8A8A]">
                  Manage your creative presence and explore opportunities
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1A1A1A] to-[#4A4A4A] rounded-full flex items-center justify-center shadow-md">
                  <User size={40} color="#F7F7F7" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Member Since", value: new Date(user?.created_at || Date.now()).toLocaleDateString(), icon: Calendar },
                { label: "Account Status", value: "Verified", icon: Award },
                { label: "Beta Access", value: "Active", icon: Zap },
                { label: "Profile Views", value: "247", icon: TrendingUp }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-4 shadow-sm border border-[#E5E7EB] rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon size={16} color="#1A1A1A" />
                    <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.1em]">{stat.label}</p>
                  </div>
                  <p className="text-lg font-serif text-[#1A1A1A]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 border-b border-[#E5E7EB]">
            <div className="flex gap-8">
              {["overview", "account", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="py-4 px-2 text-xs uppercase tracking-widest font-bold transition-all"
                  style={{
                    color: activeTab === tab ? "#1A1A1A" : "#8A8A8A",
                    borderBottom: activeTab === tab ? "2px solid #1A1A1A" : "none",
                  }}
                >
                  {tab === "overview" && "Overview"}
                  {tab === "account" && "Account"}
                  {tab === "activity" && "Activity"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "overview" && (
                <>
                  {/* Featured Section */}
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-8 rounded-lg text-white">
                    <div className="flex items-start gap-4 mb-6">
                      <Heart size={24} className="flex-shrink-0 text-[#CC0000]" />
                      <div>
                        <h3 className="text-lg font-serif uppercase tracking-widest mb-2">
                          Senota Vault Beta
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          You have early access to our next-generation content protection suite. Explore advanced features and help shape the future of creator security.
                        </p>
                      </div>
                    </div>
                    <a
                      href="/vault"
                      className="inline-block px-6 py-3 bg-white text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-gray-100 transition-all rounded"
                    >
                      Explore Vault
                    </a>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg">
                    <h3 className="text-lg font-serif uppercase tracking-widest text-[#1A1A1A] mb-6">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <a
                        href="/submit"
                        className="p-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all rounded text-center"
                      >
                        Submit Work
                      </a>
                      <a
                        href="/community"
                        className="p-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all rounded text-center"
                      >
                        Join Community
                      </a>
                      <a
                        href="/academy"
                        className="p-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all rounded text-center"
                      >
                        Explore Academy
                      </a>
                      <a
                        href="/magazine"
                        className="p-4 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all rounded text-center"
                      >
                        Read Magazine
                      </a>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "account" && (
                <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg space-y-6">
                  <div>
                    <h3 className="text-lg font-serif uppercase tracking-widest text-[#1A1A1A] mb-4">
                      Account Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.1em] mb-2">Full Name</p>
                        <p className="text-sm text-[#1A1A1A]">{user?.name || "Not Set"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.1em] mb-2">Email Address</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-[#1A1A1A]">{user?.email}</p>
                          <button
                            onClick={handleCopyEmail}
                            className="p-2 hover:bg-[#F7F7F7] rounded transition-all"
                          >
                            {copied ? (
                              <CheckCircle size={16} color="#00AA00" />
                            ) : (
                              <Copy size={16} color="#8A8A8A" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.1em] mb-2">Account Role</p>
                        <p className="text-sm text-[#1A1A1A]">{user?.role || "Creator"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg">
                  <h3 className="text-lg font-serif uppercase tracking-widest text-[#1A1A1A] mb-6">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: "Account Created", time: "Today", icon: User },
                      { action: "Beta Access Granted", time: "Today", icon: Zap },
                      { action: "Profile Setup Complete", time: "Today", icon: Award }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] last:border-0">
                        <div className="flex items-center gap-3">
                          <activity.icon size={16} color="#8A8A8A" />
                          <span className="text-sm text-[#1A1A1A]">{activity.action}</span>
                        </div>
                        <span className="text-xs text-[#8A8A8A] font-mono">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white p-6 shadow-sm border border-[#E5E7EB] rounded-lg sticky top-20">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#1A1A1A] mb-6">
                  Creator Profile
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 flex items-center justify-center gap-2 border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all text-xs uppercase tracking-widest font-bold rounded"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                  <a
                    href="/contact"
                    className="w-full py-3 flex items-center justify-center gap-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs uppercase tracking-widest font-bold rounded"
                  >
                    <Mail size={14} />
                    Contact Support
                  </a>
                </div>
              </div>

              {/* Share Profile */}
              <div className="bg-white p-6 shadow-sm border border-[#E5E7EB] rounded-lg">
                <h3 className="text-sm font-serif uppercase tracking-widest text-[#1A1A1A] mb-4">
                  Share Profile
                </h3>
                <p className="text-xs text-[#8A8A8A] mb-4">
                  Share your creator profile with the community
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Profile link copied!");
                  }}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-all rounded"
                >
                  <Share2 size={14} />
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
