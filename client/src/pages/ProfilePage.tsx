import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { useLocation } from "wouter";
import { User, Mail, Shield, Settings, LogOut, Loader2, Copy, CheckCircle, Award, Zap, Heart } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);

  // The header and global state will handle redirection if needed.
  // We'll just show the loading state or the content based on auth.
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Use replace to avoid back-button loops
      window.location.replace("/login");
    }
  }, [isAuthenticated, loading]);

  // If we're loading the session, show a spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <Loader2 className="animate-spin" size={32} color="#1A1A1A" />
      </div>
    );
  }

  // If not authenticated, we'll be redirected by the useEffect above
  if (!isAuthenticated) return null;

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      
      <main className="flex-1 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="md:col-span-1">
                <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg sticky top-20">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1A1A1A] to-[#4A4A4A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                      <User size={48} color="#F7F7F7" strokeWidth={1.5} />
                    </div>
                    
                    <h1 className="text-2xl font-serif uppercase tracking-widest text-[#1A1A1A] mb-2">
                      {user?.name || "Creator"}
                    </h1>
                    <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.2em] mb-6">
                      {user?.role || "Member"}
                    </p>

                    <div className="flex items-center justify-center gap-2 mb-8 p-3 bg-[#F7F7F7] rounded">
                      <Mail size={14} color="#1A1A1A" />
                      <span className="text-xs font-mono text-[#1A1A1A] truncate">{user?.email}</span>
                      <button
                        onClick={handleCopyEmail}
                        className="ml-auto p-1 hover:bg-white rounded transition-all"
                      >
                        {copied ? (
                          <CheckCircle size={14} color="#00AA00" />
                        ) : (
                          <Copy size={14} color="#8A8A8A" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-[#E5E7EB] pt-6">
                    <button
                      onClick={() => navigate("/account")}
                      className="w-full py-3 flex items-center justify-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs uppercase tracking-widest font-bold rounded"
                    >
                      <Settings size={14} />
                      Settings
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full py-3 flex items-center justify-center gap-2 border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all text-xs uppercase tracking-widest font-bold rounded"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Welcome Section */}
                <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg">
                  <h2 className="text-xl font-serif uppercase tracking-widest text-[#1A1A1A] mb-4">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-[#555555] leading-relaxed mb-6">
                    Your creative journey is unique. Explore your dashboard, manage your content, and discover new opportunities within the Senota ecosystem.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-all rounded">
                      Explore Dashboard
                    </button>
                    <button className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-[#1A1A1A] hover:text-white transition-all rounded">
                      View Vault
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: <Award size={20} />, label: "Member Since", value: new Date(user?.created_at || Date.now()).toLocaleDateString() },
                    { icon: <Shield size={20} />, label: "Account Status", value: "Verified" },
                    { icon: <Zap size={20} />, label: "Beta Access", value: "Active" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 shadow-sm border border-[#E5E7EB] rounded-lg text-center">
                      <div className="flex justify-center mb-3 text-[#1A1A1A]">{stat.icon}</div>
                      <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.1em] mb-2">{stat.label}</p>
                      <p className="text-sm font-serif text-[#1A1A1A]">{stat.value}</p>
                    </div>
                  ))}
                </div>

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
                  <button className="px-6 py-3 bg-white text-[#1A1A1A] text-xs uppercase tracking-widest font-bold hover:bg-gray-100 transition-all rounded">
                    Learn More
                  </button>
                </div>

                {/* Activity Section */}
                <div className="bg-white p-8 shadow-sm border border-[#E5E7EB] rounded-lg">
                  <h3 className="text-lg font-serif uppercase tracking-widest text-[#1A1A1A] mb-6">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: "Account Created", time: "Today" },
                      { action: "Beta Access Granted", time: "Today" },
                      { action: "Profile Setup Complete", time: "Today" }
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] last:border-0">
                        <span className="text-sm text-[#1A1A1A]">{activity.action}</span>
                        <span className="text-xs text-[#8A8A8A] font-mono">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center py-12 border-t border-[#E5E7EB]">
            <p className="text-sm text-[#8A8A8A] mb-6">
              Questions? Check out our help center or contact support
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/contact" className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#CC0000] transition-all">
                Contact Support
              </a>
              <span className="text-[#E5E7EB]">•</span>
              <a href="/about" className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A] hover:text-[#CC0000] transition-all">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
