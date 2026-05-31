import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { UserCircle, Mail, Lock, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const { user, isAuthenticated, loading, refresh, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const syncMutation = {
    mutate: () => {
      toast.success("Account status updated!");
      refresh();
    },
    isPending: false,
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Check your email for the confirmation link!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed.");
    } finally {
      setAuthLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
        <Loader2 className="animate-spin" size={32} color="#1A1A1A" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md bg-white p-10 shadow-sm border border-[#E5E7EB]">
          {isAuthenticated && user ? (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#F7F7F7] rounded-full flex items-center justify-center border border-[#E5E7EB]">
                  <UserCircle size={40} color="#1A1A1A" strokeWidth={1} />
                </div>
              </div>
              
              <h1 className="text-3xl font-serif mb-2 uppercase tracking-widest text-[#1A1A1A]">
                {user.name || "My Account"}
              </h1>
              <p className="text-xs font-mono text-[#8A8A8A] mb-8 uppercase tracking-[0.2em]">
                Status: {user.role || "User"}
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => syncMutation.mutate()}
                  disabled={syncMutation.isPending}
                  className="w-full py-4 flex items-center justify-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
                >
                  {syncMutation.isPending ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <RefreshCw size={14} />
                  )}
                  Sync Account Status
                </button>

                <button
                  onClick={() => logout()}
                  className="w-full py-4 border border-[#CC0000] text-[#CC0000] hover:bg-[#CC0000] hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
                >
                  Sign Out of Account
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-serif mb-4 uppercase tracking-widest text-[#1A1A1A]">
                  {isSignUp ? "Join Senota" : "Sign In"}
                </h1>
                <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.2em]">
                  {isSignUp ? "Create your creative profile" : "Welcome back to the showcase"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={16} />
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-[#F7F7F7] border border-[#E5E7EB] outline-none focus:border-[#1A1A1A] text-xs tracking-widest transition-all"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={16} />
                    <input
                      type="password"
                      placeholder="PASSWORD"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-[#F7F7F7] border border-[#E5E7EB] outline-none focus:border-[#1A1A1A] text-xs tracking-widest transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-5 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest font-bold hover:bg-black transition-all disabled:opacity-50"
                >
                  {authLoading ? (
                    <Loader2 className="animate-spin mx-auto" size={18} />
                  ) : (
                    isSignUp ? "Create Account" : "Access Portal"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-[0.2em] hover:text-[#1A1A1A] transition-all"
                >
                  {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
