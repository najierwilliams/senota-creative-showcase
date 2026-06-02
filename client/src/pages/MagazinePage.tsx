/*
 * SENOTA — Magazine Launch Page
 * Design: High-end editorial, minimalist, bold typography
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toast } from "sonner";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MagazinePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const joinMutation = trpc.launchList.join.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Welcome to the list.");
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    joinMutation.mutate({ email, name, source: "magazine_launch" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0D0D0D" }}>
      <SiteHeader />

      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Left Side: Visual/Editorial */}
        <div className="lg:w-1/2 relative overflow-hidden min-h-[400px] lg:min-h-0">
          <img 
            src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=2070&auto=format&fit=crop" 
            alt="Editorial" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent lg:bg-gradient-to-r" />
          
          <div className="absolute bottom-12 left-12 right-12">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#CC0000] mb-4">
              Volume 01 — Coming Soon
            </p>
            <h2 className="font-serif text-5xl md:text-7xl text-white font-bold leading-none tracking-tighter">
              THE NEW<br />STANDARD.
            </h2>
          </div>
        </div>

        {/* Right Side: Sign-up Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-[#F7F7F7]">
          <div className="max-w-md w-full">
            {!isSubmitted ? (
              <>
                <div className="mb-12">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight">
                    Join the<br />Launch List.
                  </h1>
                  <p className="font-sans text-[#8A8A8A] text-lg leading-relaxed">
                    SENOTA Magazine is a curated exploration of contemporary art, culture, and creative vision. Be the first to access the digital debut.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A] mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Optional"
                      className="w-full bg-transparent border-b-2 border-[#D0D0D0] py-3 focus:border-[#CC0000] outline-none transition-colors font-sans text-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-[#8A8A8A] mb-2">Email Address *</label>
                    <input 
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@senotastudios.com"
                      className="w-full bg-transparent border-b-2 border-[#D0D0D0] py-3 focus:border-[#CC0000] outline-none transition-colors font-sans text-lg"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={joinMutation.isPending}
                    className="group w-full bg-[#0D0D0D] text-white py-5 px-8 flex items-center justify-between hover:bg-[#CC0000] transition-all duration-300 disabled:opacity-50"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
                      {joinMutation.isPending ? "Processing..." : "Reserve My Access"}
                    </span>
                    {joinMutation.isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    )}
                  </button>
                </form>

                <p className="mt-8 font-mono text-[9px] text-[#D0D0D0] uppercase tracking-widest leading-loose">
                  By joining, you agree to receive early access updates and exclusive content from SENOTA. You can opt-out at any time.
                </p>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-8">
                  <CheckCircle2 size={64} className="text-[#CC0000]" />
                </div>
                <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-4">You're on the list.</h2>
                <p className="font-sans text-[#8A8A8A] text-lg mb-10">
                  Thank you for joining the SENOTA community. We'll reach out as soon as Volume 01 is ready for launch.
                </p>
                <a 
                  href="/"
                  className="inline-block font-mono text-xs uppercase tracking-widest border-b-2 border-[#1A1A1A] pb-1 hover:text-[#CC0000] hover:border-[#CC0000] transition-all"
                >
                  Return to Home
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
