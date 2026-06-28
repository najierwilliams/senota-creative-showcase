import React from "react";
import { Download, BookOpen, Zap, Shield, Lock } from "lucide-react";
import BetaHeader from "@/components/BetaHeader";

export default function BetaWhitepaperPage() {
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

      <BetaHeader />

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
        <div style={{ textAlign: "center", marginBottom: "64px", maxWidth: "900px", padding: "0 20px" }}>
          <div style={{ 
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px", 
            backgroundColor: "rgba(0, 217, 255, 0.1)", 
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 700,
            marginBottom: "24px",
            border: "1px solid rgba(0, 217, 255, 0.3)"
          }}>
            <BookOpen size={14} />
            TECHNICAL DOCUMENTATION
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(40px, 8vw, 72px)", 
            fontWeight: 800, 
            marginBottom: "24px",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            textShadow: "0 0 30px rgba(0, 217, 255, 0.4)"
          }}>
            Senota Vault <span style={{ color: "#00D9FF" }}>v1.0</span> Architecture
          </h1>
          
          <p style={{ 
            fontSize: "16px", 
            color: "#808080", 
            maxWidth: "700px", 
            margin: "0 auto 48px",
            lineHeight: 1.8
          }}>
            A comprehensive deep-dive into the neural encryption protocols, distributed ledger architecture, and quantum-resistant cryptography powering the next generation of creator protection.
          </p>

          <a
            href="/Senota_Vault_Whitepaper.pdf"
            download="Senota_Vault_Whitepaper.pdf"
            style={{
              backgroundColor: "#00D9FF",
              color: "#000000",
              padding: "14px 28px",
              borderRadius: "4px",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)",
              textDecoration: "none"
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
            <Download size={16} />
            DOWNLOAD PDF
          </a>
        </div>

        {/* Content Sections */}
        <div style={{
          maxWidth: "900px",
          width: "100%",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
          marginBottom: "64px"
        }}>
          {[
            {
              icon: <Shield size={28} />,
              title: "Neural Encryption",
              desc: "Our proprietary AI-driven encryption adapts in real-time to emerging threats. Each piece of content is protected by a unique neural signature that evolves with threat patterns."
            },
            {
              icon: <Zap size={28} />,
              title: "Quantum Resistance",
              desc: "Built on post-quantum cryptography standards. Our algorithms are resistant to both classical and quantum computing attacks, ensuring long-term protection."
            },
            {
              icon: <Lock size={28} />,
              title: "Zero-Knowledge Proof",
              desc: "We never see your data. Our verification system uses zero-knowledge proofs to confirm authenticity without ever accessing the protected content."
            }
          ].map((item, i) => (
            <div key={i} style={{
              padding: "32px",
              backgroundColor: "rgba(0, 217, 255, 0.02)",
              border: "1px solid rgba(0, 217, 255, 0.15)",
              borderRadius: "12px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.02)";
              e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.15)";
            }}>
              <div style={{ color: "#00D9FF", marginBottom: "16px" }}>{item.icon}</div>
              <h3 style={{ color: "#FFFFFF", marginBottom: "12px", fontSize: "18px", fontWeight: 700 }}>{item.title}</h3>
              <p style={{ color: "#606060", fontSize: "14px", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key Specifications */}
        <div style={{
          maxWidth: "900px",
          width: "100%",
          padding: "40px",
          backgroundColor: "rgba(0, 217, 255, 0.03)",
          border: "1px solid rgba(0, 217, 255, 0.1)",
          borderRadius: "12px",
          marginBottom: "48px"
        }}>
          <h2 style={{ color: "#FFFFFF", marginBottom: "24px", fontSize: "24px", fontWeight: 700 }}>Key Specifications</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
            {[
              { label: "Encryption Standard", value: "AES-256 + Neural Adaptive" },
              { label: "Key Exchange", value: "Post-Quantum CRYSTALS-Kyber" },
              { label: "Hash Algorithm", value: "SHA-3 (Keccak)" },
              { label: "Verification", value: "Zero-Knowledge Proof (zk-SNARK)" },
              { label: "Uptime SLA", value: "99.99%" },
              { label: "Response Time", value: "< 100ms" }
            ].map((spec, i) => (
              <div key={i}>
                <p style={{ color: "#606060", fontSize: "12px", marginBottom: "8px", letterSpacing: "0.1em" }}>{spec.label}</p>
                <p style={{ color: "#00D9FF", fontSize: "16px", fontWeight: 700 }}>{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#808080", marginBottom: "24px", fontSize: "14px" }}>
            Ready to implement Senota Vault in your workflow?
          </p>
          <a
            href="/beta/signup"
            style={{
              backgroundColor: "#00D9FF",
              color: "#000000",
              padding: "16px 32px",
              borderRadius: "4px",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
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
            JOIN THE BETA
          </a>
        </div>
      </main>
    </div>
  );
}
