/*
 * SENOTA — Employee Portal (Creative Operations Center)
 * Design: High-contrast, brutalist editorial aesthetic
 * Exclusively for staff members.
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { 
  Loader2, 
  LayoutDashboard, 
  Layers, 
  Clock, 
  Lock, 
  ShieldAlert, 
  Camera, 
  FileEdit, 
  Send,
  Zap,
  Package,
  ArrowRight
} from "lucide-react";

type ProjectStatus = "Pre-Production" | "In Progress" | "Review" | "Complete";

interface Project {
  id: number;
  title: string;
  type: string;
  status: ProjectStatus;
  deadline: string;
  assignee: string;
}

const PROJECTS: Project[] = [
  { id: 1, title: "Origins: Cover Story", type: "Editorial", status: "Review", deadline: "June 15", assignee: "Sarah J." },
  { id: 2, title: "Branding: Summer Campaign", type: "Marketing", status: "In Progress", deadline: "June 22", assignee: "Marcus T." },
  { id: 3, title: "Academy: Masterclass Video", type: "Education", status: "Pre-Production", deadline: "July 05", assignee: "Elena R." },
  { id: 4, title: "Issue 02: Initial Curation", type: "Magazine", status: "In Progress", deadline: "July 12", assignee: "David L." },
];

const STATUS_COLORS: Record<ProjectStatus, string> = {
  "Pre-Production": "#8A8A8A",
  "In Progress": "#3B82F6",
  "Review": "#F59E0B",
  "Complete": "#22C55E",
};

export default function EmployeePortal() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Redirect logic
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/account");
      } else if (user?.role !== "employee" && user?.role !== "admin") {
        navigate("/");
      }
    }
  }, [loading, isAuthenticated, user, navigate]);

  if (loading || !isAuthenticated || (user?.role !== "employee" && user?.role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
        <Loader2 size={32} className="animate-spin text-[#CC0000]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0D0D0D] text-[#F7F7F7] py-16 px-6 border-b-[8px] border-[#CC0000]">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2 py-0.5 bg-[#CC0000] text-[10px] font-mono tracking-widest uppercase">
                Internal Access Only
              </div>
              <ShieldAlert size={14} className="text-[#CC0000]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6">
              CREATIVE<br />OPERATIONS
            </h1>
            <p className="max-w-xl font-sans text-lg text-[#8A8A8A] leading-relaxed">
              The central hub for SENOTA staff. Manage production pipelines, 
              access brand assets, and track editorial deadlines across all platforms.
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="container -mt-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Active Projects", value: "12", icon: <Layers size={20} /> },
              { label: "Pending Reviews", value: "04", icon: <Zap size={20} /> },
              { label: "Upcoming Deadlines", value: "08", icon: <Clock size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-8 shadow-xl border-l-4 border-[#0D0D0D]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#8A8A8A] font-mono text-xs uppercase tracking-widest">{stat.label}</span>
                  <div className="text-[#CC0000]">{stat.icon}</div>
                </div>
                <div className="text-4xl font-serif font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Dashboard Area */}
        <section className="container py-16 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Pipeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 border-b-2 border-[#0D0D0D] pb-4">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-tight flex items-center gap-3">
                <LayoutDashboard size={24} />
                Production Pipeline
              </h2>
              <button className="text-xs font-mono uppercase tracking-widest text-[#CC0000] hover:underline flex items-center gap-2">
                View All <ArrowRight size={12} />
              </button>
            </div>

            <div className="space-y-4">
              {PROJECTS.map((project) => (
                <div key={project.id} className="bg-white border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-mono uppercase text-[#8A8A8A]">{project.type}</span>
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: STATUS_COLORS[project.status] }}
                        />
                        <span className="text-[10px] font-mono uppercase" style={{ color: STATUS_COLORS[project.status] }}>
                          {project.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-sans">{project.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-[#8A8A8A] uppercase mb-1">Deadline</p>
                      <p className="font-bold">{project.deadline}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-xs font-mono text-[#8A8A8A] uppercase mb-1">Lead</p>
                      <p className="font-bold">{project.assignee}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Resources & Tools */}
          <div className="space-y-12">
            {/* Quick Tools */}
            <div>
              <h2 className="text-xl font-serif font-bold uppercase tracking-tight mb-6 border-b-2 border-[#0D0D0D] pb-3">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Submit Copy", icon: <FileEdit size={20} /> },
                  { label: "Upload Media", icon: <Camera size={20} /> },
                  { label: "Send Update", icon: <Send size={20} /> },
                  { label: "Inventory", icon: <Package size={20} /> },
                ].map((tool) => (
                  <button 
                    key={tool.label}
                    className="flex flex-col items-center justify-center p-6 bg-[#0D0D0D] text-white hover:bg-[#CC0000] transition-colors gap-3"
                  >
                    {tool.icon}
                    <span className="text-[10px] font-mono uppercase tracking-tighter">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Vault */}
            <div className="bg-[#1A1A1A] text-white p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock size={18} className="text-[#CC0000]" />
                <h2 className="text-lg font-serif font-bold uppercase tracking-widest">Brand Vault</h2>
              </div>
              <p className="text-xs text-[#8A8A8A] mb-8 leading-relaxed">
                Secure access to high-resolution brand assets, typography files, 
                and official templates.
              </p>
              <div className="space-y-3">
                {["Logo Package (v2.1)", "Editorial Fonts", "Media Kit PDF", "Presentation Template"].map((item) => (
                  <button key={item} className="w-full flex items-center justify-between text-[11px] font-mono uppercase tracking-widest py-3 border-b border-[#2A2A2A] hover:text-[#CC0000] transition-colors">
                    {item}
                    <ArrowRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
