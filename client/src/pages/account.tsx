import { UserProfile, SignIn, SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Account() {
  const { user, refresh: refreshAuth } = useAuth();
  const utils = trpc.useUtils();
  
  const syncMutation = trpc.auth.refresh.useMutation({
    onSuccess: (data) => {
      refreshAuth();
      utils.auth.me.invalidate();
      if (data.user?.role === "employee" || data.user?.role === "admin") {
        toast.success(`Success! Your role is now: ${data.user.role.toUpperCase()}`);
      } else {
        toast.success("Account synced with Clerk.");
      }
    },
    onError: () => {
      toast.error("Failed to sync with Clerk. Please try signing out and back in.");
    }
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <SignedIn>
          <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="overflow-hidden rounded-xl shadow-lg bg-white">
              <UserProfile 
                routing="path" 
                path="/account" 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none w-full max-w-none border-none",
                    navbar: "hidden md:flex",
                    scrollBox: "rounded-none"
                  }
                }}
              />
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-col items-center gap-4 pt-4">
              {/* Role Indicator */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] rounded-full shadow-sm">
                <ShieldCheck size={14} className={user?.role === 'employee' || user?.role === 'admin' ? "text-[#CC0000]" : "text-[#8A8A8A]"} />
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Status: <span className="font-bold">{user?.role ?? 'User'}</span>
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => syncMutation.mutate()}
                  disabled={syncMutation.isPending}
                  className="flex items-center gap-2 px-6 py-3 transition-all hover:border-[#CC0000] hover:text-[#CC0000]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    backgroundColor: "white",
                    color: "#1A1A1A",
                    border: "1px solid #E5E7EB",
                    cursor: "pointer",
                  }}
                >
                  <RefreshCw size={13} className={syncMutation.isPending ? "animate-spin" : ""} />
                  {syncMutation.isPending ? "Syncing..." : "Sync Account Status"}
                </button>

                <SignOutButton redirectUrl="/">
                  <button
                    className="flex items-center gap-2 px-6 py-3 transition-all hover:bg-[#CC0000] hover:text-white"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      backgroundColor: "transparent",
                      color: "#1A1A1A",
                      border: "1px solid #1A1A1A",
                      cursor: "pointer",
                    }}
                  >
                    <LogOut size={13} />
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
              
              <p className="text-[10px] text-[#8A8A8A] font-sans text-center max-w-xs">
                If you recently updated your role in Clerk, click "Sync Account Status" to update your website profile.
              </p>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="w-full max-w-md">
            <SignIn 
              routing="path" 
              path="/account" 
              signUpUrl="/account/sign-up"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-[#CC0000] hover:bg-[#A30000] text-sm",
                  card: "shadow-xl border-none",
                  headerTitle: "font-serif text-2xl",
                  headerSubtitle: "text-muted-foreground"
                }
              }}
            />
          </div>
        </SignedOut>
      </main>
      <SiteFooter />
    </div>
  );
}
