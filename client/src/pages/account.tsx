import { UserProfile, SignIn, SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LogOut } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Account() {
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
            
            {/* Quick Actions / Sign Out */}
            <div className="flex justify-center pt-4">
              <SignOutButton redirectUrl="/">
                <button
                  className="flex items-center gap-2 px-8 py-3 transition-all hover:bg-[#CC0000] hover:text-white"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    color: "#1A1A1A",
                    border: "1px solid #1A1A1A",
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={14} />
                  Sign Out of Account
                </button>
              </SignOutButton>
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
