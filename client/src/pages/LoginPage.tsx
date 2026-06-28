import { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useSupabaseAuth";
import { toast } from "sonner";
import { Mail, Lock, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useLocation } from "wouter";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // If already authenticated, go to account page
  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast.success("Account created! Please check your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        toast.success("Welcome back!");
        // Redirect to profile page
        setTimeout(() => {
          window.location.href = "/profile";
        }, 500);
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed.");
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
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif mb-4 uppercase tracking-widest text-[#1A1A1A]">
              {isSignUp ? "Join" : "Sign In"}
            </h1>
            <p className="text-xs font-mono text-[#8A8A8A] uppercase tracking-[0.2em]">
              Senota Studios
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={16} />
                <input
                  type="email"
                  placeholder="EMAIL"
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
                isSignUp ? "Register" : "Access"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[10px] font-mono text-[#8A8A8A] uppercase tracking-[0.2em] hover:text-[#1A1A1A] transition-all"
            >
              {isSignUp ? "Already a member? Sign In" : "New here? Create Account"}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
