/**
 * SENOTA Privacy Policy Page
 * Design: Clean editorial document layout. Left sticky nav, right content.
 * Minimal, professional, easy to read.
 * Fonts: Cormorant Garamond (display) + DM Sans (body)
 */

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    content: `SENOTA Studios LLC ("SENOTA," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website senotastudios.com and use our services, including the Creative Showcase, SENOTA Academy, and any other platforms we operate.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our site. We reserve the right to make changes to this policy at any time. We will notify you of significant changes by updating the date at the top of this page.

This policy was last updated: May 2026.`,
  },
  {
    id: "collection",
    title: "Information We Collect",
    content: `We may collect information about you in a variety of ways. The information we may collect includes:

Personal Data: Personally identifiable information, such as your name, email address, city, and Instagram handle, that you voluntarily give to us when you submit a creative application, contact us, or sign up for our newsletter.

Derivative Data: Information our servers automatically collect when you access our site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.

Financial Data: If you purchase a magazine issue or other product, we collect financial data related to your payment. All financial transactions are processed through a secure third-party payment processor. We do not store full payment card numbers.

Social Media Data: If you connect with us through social media, we may receive information from those platforms as permitted by your privacy settings.`,
  },
  {
    id: "use",
    title: "Use of Your Information",
    content: `Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:

— Process creative submissions and applications to be featured in SENOTA Magazine or the Creative Showcase.
— Send you newsletters, updates, and marketing communications (you may opt out at any time).
— Respond to your inquiries and provide customer support.
— Fulfill and manage purchases, orders, and transactions.
— Improve our website, services, and user experience.
— Monitor and analyze usage and trends to improve your experience.
— Notify you of updates to our website and services.
— Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.
— Comply with applicable legal obligations.`,
  },
  {
    id: "disclosure",
    title: "Disclosure of Your Information",
    content: `We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.

Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.

We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties for marketing purposes.`,
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: `We may use cookies, web beacons, tracking pixels, and other tracking technologies on our website to help customize the site and improve your experience.

You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. If you turn cookies off, some features of the site may not function properly.

We do not currently respond to Do Not Track signals. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.`,
  },
  {
    id: "security",
    title: "Security",
    content: `We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.`,
  },
  {
    id: "rights",
    title: "Your Rights",
    content: `Depending on your location, you may have certain rights regarding your personal information, including:

— The right to access the personal information we hold about you.
— The right to request correction of inaccurate personal information.
— The right to request deletion of your personal information.
— The right to opt out of marketing communications at any time by clicking "unsubscribe" in any email we send you.
— The right to data portability in certain circumstances.

To exercise any of these rights, please contact us at privacy@senotastudios.com. We will respond to your request within 30 days.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have questions or comments about this Privacy Policy, please contact us at:

SENOTA Studios LLC
privacy@senotastudios.com
senotastudios.com

We take privacy seriously and will respond to all inquiries promptly.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F7F7F7", color: "#1A1A1A" }}>
      <SiteHeader />

      {/* ── Page Header ───────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid #E5E7EB",
          padding: "64px 0 48px",
          backgroundColor: "#1A1A1A",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC0000",
              marginBottom: "12px",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(44px, 7vw, 96px)",
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#F7F7F7",
              marginBottom: "16px",
            }}
          >
            Privacy<br />Policy.
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "#666",
            }}
          >
            Effective Date: May 2026 — SENOTA Studios LLC
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="container" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "clamp(120px, 18vw, 200px) 1fr",
            gap: "clamp(24px, 5vw, 64px)",
            alignItems: "start",
          }}
          className="privacy-grid"
        >
          {/* Sticky Nav */}
          <nav style={{ position: "sticky", top: "80px", minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#999",
                marginBottom: "16px",
              }}
            >
              Contents
            </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0", minWidth: 0 }}>
              {SECTIONS.map((s) => (
                  <a
                  key={s.id}
                  href={`#${s.id}`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(11px, 1.3vw, 13px)",
                    color: "#555",
                    textDecoration: "none",
                    padding: "8px 0",
                    borderBottom: "1px solid #E5E7EB",
                    transition: "color 150ms",
                    wordBreak: "break-word",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#CC0000"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#555"; }}
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "56px", minWidth: 0, overflow: "hidden" }}>
            {SECTIONS.map((s) => (
              <div key={s.id} id={s.id}>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    marginBottom: "20px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  {s.title}
                </h2>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    color: "#555",
                    lineHeight: 1.8,
                    whiteSpace: "pre-line",
                  }}
                >
                  {s.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
