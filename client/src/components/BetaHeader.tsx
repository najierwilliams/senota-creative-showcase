import React from "react";
import { Shield, Home } from "lucide-react";

export default function BetaHeader() {
  return (
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
        <span style={{ fontWeight: 700, letterSpacing: "0.2em", fontSize: "14px", color: "#00D9FF" }}>SENOTA // BETA</span>
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
  );
}
