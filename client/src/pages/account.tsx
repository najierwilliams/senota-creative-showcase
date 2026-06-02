import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { toast } from "sonner";
import { UserCircle, Loader2, RefreshCw, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function AccountPage() {
  const { user, isAuthenticated, loading, refresh, logout } = useAuth();
  const [, navigate] = useLocation();

  // If not authenticated, go to login page
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <Loader2 className="animate-spin" size={32} color="#1A1A1A" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-[#E5E7EB]">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-[#F7F7F7] rounded-full flex items-center justify-center border border-[#E5E7EB]">
                <UserCircle size={40} color="#1A1A1A" strokeWidth={1} />
              </div>
            </div>
            
            <h1 className="text-3xl font-serif mb-2 uppercase tracking-widest text-[#1A1A1A]">
              {user?.name || "Member"}
            </h1>
            <p className="text-xs font-mono text-[#8A8A8A] mb-8 uppercase tracking-[0.2em]">
              {user?.role || "Verified Account"}
            </p>

            <div className="space-y-4">
              <button
                onClick={() => {
                  toast.info("Refreshing account...");
                  refresh();
                }}
                className="w-full py-4 flex items-center justify-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
              >
                <RefreshCw size={14} />
                Sync Profile
              </button>

              <button
                onClick={async () => {
                  await logout();
                  // Hard redirect to home to clear all memory state
                  window.location.href = "/";
                }}
                className="w-full py-4 border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
              >
                <LogOut size={14} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
