import React, { useState, useEffect } from "react";
import { Home, Shield, Cpu, Zap, Lock, Terminal, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function BetaPage() {
  const [glitchText, setGlitchText] = useState("SECURE ACCESS GRANTED");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const lines = [
      "> Initializing Senota Neural Link...",
      "> decrypting_vault_v2.0.4.bin",
      "> connection established via node_0x442",
      "> status: early_access_authorized",
      "> warning: beta_environment_unstable",
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ 
      backgroundColor: "#050505", 
      color: "#00D9FF", 
      minHeight: "100vh", 
      fontFamily: "'Space Mono', monospace",
      overflow: "hidden",
      position: "relative"
    }}>
      {/* Background Grid Effect */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(0, 217, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Custom Header */}
      <header style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(0, 217, 255, 0.1)",
        backgroundColor: "rgba(5, 5, 5, 0.8)",
        backdropFilter: "blur(10px)",
        zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Shield size={20} color="#00D9FF" />
          <span style={{ fontWeight: 700, letterSpacing: "0.2em", fontSize: "14px" }}>SENOTA // BETA</span>
        </div>
        
        <a 
          href="https://senotastudios.com" 
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#00D9FF",
            textDecoration: "none",
            fontSize: "12px",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid rgba(0, 217, 255, 0.3)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
            e.currentTarget.style.borderColor = "#00D9FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.3)";
          }}
        >
          <Home size={14} />
          RETURN HOME
        </a>
      </header>

      <main style={{ 
        paddingTop: "120px", 
        paddingBottom: "60px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        position: "relative",
        zIndex: 1 
      }}>
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "64px", maxWidth: "800px", padding: "0 20px" }}>
          <div style={{ 
            display: "inline-block", 
            padding: "4px 12px", 
            backgroundColor: "rgba(0, 217, 255, 0.1)", 
            borderRadius: "2px",
            fontSize: "10px",
            fontWeight: 700,
            marginBottom: "24px",
            border: "1px solid rgba(0, 217, 255, 0.3)"
          }}>
            PROTOCOL v2.0-BETA
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(32px, 8vw, 64px)", 
            fontWeight: 800, 
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            textShadow: "0 0 20px rgba(0, 217, 255, 0.5)"
          }}>
            The Future of <span style={{ color: "#00D9FF" }}>Creation</span> is Encrypted.
          </h1>
          
          <p style={{ 
            fontSize: "16px", 
            color: "#808080", 
            maxWidth: "600px", 
            margin: "0 auto 40px",
            lineHeight: 1.6
          }}>
            Welcome to the inner circle. As a beta participant, you'll be the first to experience our next-generation AI protection suite before it goes public.
          </p>

          {/* Terminal Box */}
          <div style={{
            width: "100%",
            maxWidth: "500px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(0, 217, 255, 0.2)",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "left",
            margin: "0 auto 48px",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)"
          }}>
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FF5F56" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#27C93F" }} />
            </div>
            <div style={{ fontSize: "12px", lineHeight: 1.8 }}>
              {terminalLines.map((line, i) => (
                <div key={i} style={{ color: i === terminalLines.length - 1 ? "#00D9FF" : "#404040" }}>
                  {line}
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>&gt;</span>
                <span style={{ 
                  width: "8px", 
                  height: "14px", 
                  backgroundColor: "#00D9FF",
                  animation: "pulse 1s infinite" 
                }} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
            <button 
              style={{
                backgroundColor: "#00D9FF",
                color: "#000000",
                padding: "16px 32px",
                borderRadius: "4px",
                border: "none",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 0 50px rgba(0, 217, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 217, 255, 0.4)";
              }}
            >
              INITIALIZE BETA ACCESS
              <ArrowRight size={18} />
            </button>
            
            <button 
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                padding: "16px 32px",
                borderRadius: "4px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
            >
              READ WHITEPAPER
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "24px", 
          width: "100%", 
          maxWidth: "1000px",
          padding: "0 20px"
        }}>
          {[
            { icon: <Cpu size={24} />, title: "Neural Protection", desc: "Advanced AI models that learn and adapt to new threats in real-time." },
            { icon: <Zap size={24} />, title: "Quantum Speed", desc: "Encryption so fast you won't even know it's there." },
            { icon: <Lock size={24} />, title: "Zero Knowledge", desc: "We don't see your data. We just protect it. Period." }
          ].map((item, i) => (
            <div key={i} style={{
              padding: "32px",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.03)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
            }}>
              <div style={{ color: "#00D9FF", marginBottom: "20px" }}>{item.icon}</div>
              <h3 style={{ color: "#FFFFFF", marginBottom: "12px", fontSize: "18px" }}>{item.title}</h3>
              <p style={{ color: "#606060", fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
