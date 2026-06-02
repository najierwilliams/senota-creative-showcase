/*
 * SENOTA — Branding & Identity Lab
 * Design: High-fashion, avant-garde, immersive editorial
 */

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  ArrowRight, 
  Layers, 
  Palette, 
  Type, 
  Eye, 
  Compass, 
  Sparkles,
  ExternalLink
} from "lucide-react";

export default function BrandingPage() {
  const [activePillar, setActivePillar] = useState(0);

  const PILLARS = [
    {
      title: "Discovery",
      desc: "We dive deep into your brand's DNA to uncover the core narrative that sets you apart.",
      icon: <Compass size={24} />,
      color: "#8A8A8A"
    },
    {
      title: "Curation",
      desc: "Meticulous selection of visual elements, typography, and textures that define your identity.",
      icon: <Layers size={24} />,
      color: "#CC0000"
    },
    {
      title: "Launch",
      desc: "Bringing your brand to life with a high-impact strategy across all digital and physical touchpoints.",
      icon: <Sparkles size={24} />,
      color: "#1A1A1A"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7" }}>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero: The Identity Lab */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
          <div className="absolute inset-0 opacity-40 grayscale mix-blend-overlay">
            <img 
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" 
              alt="Design Lab" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 text-center px-6">
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#CC0000] mb-6">
              Creative Strategy — Branding
            </p>
            <h1 className="font-serif text-6xl md:text-9xl text-white font-bold tracking-tighter leading-none mb-8">
              IDENTITY<br />LAB.
            </h1>
            <p className="max-w-2xl mx-auto font-sans text-lg text-[#8A8A8A] leading-relaxed">
              We don't just design logos. We build visual legacies. SENOTA Studios 
              crafts immersive brand identities for the next generation of creative leaders.
            </p>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-[1px] h-12 bg-[#CC0000]" />
          </div>
        </section>

        {/* The Strategy Pillars */}
        <section className="py-24 bg-white border-b border-[#E5E7EB]">
          <div className="container px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {PILLARS.map((pillar, idx) => (
                <div 
                  key={pillar.title}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActivePillar(idx)}
                >
                  <div 
                    className="mb-8 transition-transform duration-500 group-hover:scale-110"
                    style={{ color: activePillar === idx ? "#CC0000" : "#1A1A1A" }}
                  >
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-3xl font-bold mb-4 uppercase tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-[#8A8A8A] leading-relaxed">
                    {pillar.desc}
                  </p>
                  <div className="mt-6 h-[2px] w-0 bg-[#CC0000] group-hover:w-full transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Language Gallery */}
        <section className="py-24 bg-[#0D0D0D] text-white overflow-hidden">
          <div className="container px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  VISUAL<br />LANGUAGE.
                </h2>
                <p className="font-sans text-[#8A8A8A] text-lg">
                  Every brand has a voice. We make sure yours is heard clearly through 
                  meticulous attention to visual detail.
                </p>
              </div>
              <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                <div className="flex flex-col gap-2">
                  <Palette size={16} className="text-[#CC0000]" />
                  <span>Color Theory</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Type size={16} className="text-[#CC0000]" />
                  <span>Typography</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Eye size={16} className="text-[#CC0000]" />
                  <span>Art Direction</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
              ].map((img, i) => (
                <div key={i} className="aspect-[3/4] overflow-hidden group relative">
                  <img 
                    src={img} 
                    alt="Work" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-[#CC0000] opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA: Start a Project */}
        <section className="py-32 bg-[#F7F7F7]">
          <div className="container px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-5xl md:text-7xl font-bold mb-10 tracking-tight text-[#1A1A1A]">
                READY TO BUILD<br />YOUR LEGACY?
              </h2>
              <p className="font-sans text-[#8A8A8A] text-xl mb-12 leading-relaxed">
                Whether you're a startup looking for an identity or an established brand 
                seeking a creative evolution, we're ready to curate your next chapter.
              </p>
              <a 
                href="/contact"
                className="inline-flex items-center gap-4 bg-[#0D0D0D] text-white px-12 py-6 font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#CC0000] transition-all group"
              >
                Inquire Now
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
