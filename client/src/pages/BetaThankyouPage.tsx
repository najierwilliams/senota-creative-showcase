import React, { useEffect, useState } from "react";
import { CheckCircle, Zap, Mail, ArrowRight } from "lucide-react";
import BetaHeader from "@/components/BetaHeader";

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  creatorType: string;
}

export default function BetaThankyouPage() {
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("betaSignupData");
    if (data) {
      setSignupData(JSON.parse(data));
    }
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

      {/* Animated Background Orbs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        width: "300px",
        height: "300px",
        backgroundColor: "rgba(0, 217, 255, 0.1)",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "float 6s ease-in-out infinite",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "10%",
        width: "300px",
        height: "300px",
        backgroundColor: "rgba(0, 217, 255, 0.08)",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "float 8s ease-in-out infinite reverse",
        zIndex: 0
      }} />

      <BetaHeader />

      <main style={{ 
        paddingTop: "120px", 
        paddingBottom: "60px", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
        minHeight: "calc(100vh - 120px)"
      }}>
        {/* Success Icon */}
        <div style={{
          marginBottom: "32px",
          animation: "pulse 2s ease-in-out infinite"
        }}>
          <CheckCircle size={80} color="#00D9FF" strokeWidth={1.5} />
        </div>

        {/* Main Message */}
        <div style={{ textAlign: "center", maxWidth: "700px", padding: "0 20px", marginBottom: "48px" }}>
          <h1 style={{ 
            fontSize: "clamp(40px, 8vw, 64px)", 
            fontWeight: 800, 
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            textShadow: "0 0 20px rgba(0, 217, 255, 0.5)"
          }}>
            Welcome to the <span style={{ color: "#00D9FF" }}>Inner Circle</span>
          </h1>
          
          <p style={{ 
            fontSize: "16px", 
            color: "#808080", 
            marginBottom: "24px",
            lineHeight: 1.8
          }}>
            {signupData ? (
              <>Your application has been received, <span style={{ color: "#00D9FF", fontWeight: 700 }}>{signupData.firstName}</span>. We're reviewing your profile and will be in touch shortly with next steps.</>
            ) : (
              <>Your application has been received. We're reviewing your profile and will be in touch shortly with next steps.</>
            )}
          </p>

          <div style={{
            padding: "24px",
            backgroundColor: "rgba(0, 217, 255, 0.05)",
            border: "1px solid rgba(0, 217, 255, 0.15)",
            borderRadius: "8px",
            marginBottom: "32px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <Mail size={18} color="#00D9FF" />
              <span style={{ fontSize: "14px", color: "#00D9FF", fontWeight: 700 }}>CONFIRMATION SENT</span>
            </div>
            <p style={{ fontSize: "13px", color: "#808080", lineHeight: 1.6 }}>
              We've sent a confirmation email to <span style={{ color: "#00D9FF", fontWeight: 700 }}>{signupData?.email || "your email"}</span>. Check your inbox for updates on your beta access.
            </p>
          </div>
        </div>

        {/* What's Next */}
        <div style={{
          maxWidth: "700px",
          width: "100%",
          padding: "0 20px",
          marginBottom: "48px"
        }}>
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: 700, 
            marginBottom: "24px", 
            color: "#FFFFFF",
            textAlign: "center"
          }}>
            What Happens Next
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px"
          }}>
            {[
              { step: "01", title: "Review", desc: "Our team reviews your creative profile" },
              { step: "02", title: "Approval", desc: "You'll receive beta access confirmation" },
              { step: "03", title: "Launch", desc: "Start protecting your content immediately" }
            ].map((item, i) => (
              <div key={i} style={{
                padding: "24px",
                backgroundColor: "rgba(0, 217, 255, 0.02)",
                border: "1px solid rgba(0, 217, 255, 0.1)",
                borderRadius: "8px",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#00D9FF",
                  marginBottom: "12px"
                }}>
                  {item.step}
                </div>
                <h3 style={{ color: "#FFFFFF", marginBottom: "8px", fontSize: "16px", fontWeight: 700 }}>
                  {item.title}
                </h3>
                <p style={{ color: "#606060", fontSize: "13px", lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          maxWidth: "500px"
        }}>
          <a
            href="/beta"
            style={{
              backgroundColor: "transparent",
              color: "#FFFFFF",
              padding: "14px 28px",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
            BACK TO BETA
          </a>
          
          <a
            href="https://senotastudios.com"
            style={{
              backgroundColor: "#00D9FF",
              color: "#000000",
              padding: "14px 28px",
              borderRadius: "4px",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
            EXPLORE SENOTA
            <ArrowRight size={16} />
          </a>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
