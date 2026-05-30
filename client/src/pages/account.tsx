import { UserProfile, SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Account() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <SignedIn>
          <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-lg bg-white">
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
