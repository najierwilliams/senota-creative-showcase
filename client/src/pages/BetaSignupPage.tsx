import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import BetaHeader from "@/components/BetaHeader";

export default function BetaSignupPage() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    creatorType: "",
    portfolio: "",
    experience: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store form data in session storage for the thank you page
    sessionStorage.setItem("betaSignupData", JSON.stringify(formData));
    navigate("/beta/thankyou");
  };

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
        <div style={{ textAlign: "center", marginBottom: "48px", maxWidth: "600px", padding: "0 20px" }}>
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
            CREATOR ONBOARDING
          </div>
          
          <h1 style={{ 
            fontSize: "clamp(32px, 8vw, 56px)", 
            fontWeight: 800, 
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            textShadow: "0 0 20px rgba(0, 217, 255, 0.5)"
          }}>
            Join the <span style={{ color: "#00D9FF" }}>Inner Circle</span>
          </h1>
          
          <p style={{ 
            fontSize: "14px", 
            color: "#808080", 
            marginBottom: "40px",
            lineHeight: 1.6
          }}>
            Tell us about yourself and your creative work. We're looking for visionary creators to shape the future of content protection.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(0, 217, 255, 0.2)",
          borderRadius: "12px",
          margin: "0 20px"
        }}>
          {/* First Name */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              FIRST NAME
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            />
          </div>

          {/* Last Name */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              LAST NAME
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            />
          </div>

          {/* Creator Type */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              CREATOR TYPE
            </label>
            <select
              name="creatorType"
              value={formData.creatorType}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            >
              <option value="">Select...</option>
              <option value="musician">Musician</option>
              <option value="photographer">Photographer</option>
              <option value="filmmaker">Filmmaker</option>
              <option value="artist">Visual Artist</option>
              <option value="writer">Writer</option>
              <option value="designer">Designer</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Portfolio URL */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              PORTFOLIO URL
            </label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            />
          </div>

          {/* Experience */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", fontSize: "12px", marginBottom: "8px", color: "#00D9FF", fontWeight: 700, letterSpacing: "0.1em" }}>
              TELL US ABOUT YOUR WORK
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Share your creative journey and what you're protecting..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "rgba(0, 217, 255, 0.05)",
                border: "1px solid rgba(0, 217, 255, 0.2)",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "'Space Mono', monospace",
                fontSize: "14px",
                outline: "none",
                transition: "all 0.3s ease",
                resize: "vertical"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00D9FF";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 217, 255, 0.2)";
                e.currentTarget.style.backgroundColor = "rgba(0, 217, 255, 0.05)";
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#00D9FF",
              color: "#000000",
              padding: "16px",
              borderRadius: "4px",
              border: "none",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              boxShadow: "0 0 30px rgba(0, 217, 255, 0.4)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 50px rgba(0, 217, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0, 217, 255, 0.4)";
            }}
          >
            SUBMIT APPLICATION
            <ArrowRight size={16} />
          </button>
        </form>
      </main>
    </div>
  );
}
