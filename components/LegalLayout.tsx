import Link from "next/link";
import type React from "react";

type LegalLayoutProps = {
  title: string;
  subtitle: string;
  updatedDate: string;
  children: React.ReactNode;
};

export function LegalLayout({
  title,
  subtitle,
  updatedDate,
  children,
}: LegalLayoutProps) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <div className="legal-header__inner">
          <Link href="/" className="legal-header__logo" aria-label="AM Agency Home">
            <span>AM</span>
            <span className="legal-header__logo-sub">AGENCY</span>
          </Link>
          <Link href="/" className="legal-header__back-btn">
            ← BACK TO HOME
          </Link>
        </div>
      </header>

      <main className="legal-main">
        <div className="legal-hero-banner">
          <span className="legal-eyebrow">
            LEGAL & COMPLIANCE // {updatedDate}
          </span>
          <h1 className="legal-title">{title}</h1>
          <p className="legal-subtitle">{subtitle}</p>
        </div>

        <div className="legal-content-grid">{children}</div>
      </main>

      <footer className="site-footer-full" id="contact" aria-label="Site Footer">
        <div className="footer-full__inner">
          <div className="footer-full__brand-col">
            <Link className="footer-full__logo" href="/" aria-label="AM Agency, back to home">
              <span>AM</span>
              <span className="footer-full__logo-sub">AGENCY</span>
            </Link>
            <p className="footer-full__tagline">
              Transforming briefs into high-impact digital products, brands, and autonomous systems. Built around your brief. Shipped around your choices.
            </p>
            <div className="footer-full__status">
              <span className="footer-full__status-dot" aria-hidden="true" />
              <span>SYSTEM OPERATIONAL — ACCEPTING Q3/Q4 PROJECTS</span>
            </div>
          </div>

          <div className="footer-full__col">
            <h3 className="footer-full__heading">HEADQUARTERS & CONTACT</h3>
            <address className="footer-full__address">
              <p><strong>AM Agency HQ</strong></p>
              <p>Kompally, Hyderabad</p>
              <p>Telangana, India</p>
            </address>
            <div className="footer-full__contacts">
              <p><strong>Email:</strong> <a href="mailto:infoam@gmail.com">infoam@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919542710588">+91 9542710588</a></p>
            </div>
          </div>

          <div className="footer-full__col">
            <h3 className="footer-full__heading">NAVIGATION</h3>
            <ul className="footer-full__links">
              <li><Link href="/">00 / HOME</Link></li>
              <li><Link href="/#empty-section">01 / CONCEPT & BUILD</Link></li>
              <li><Link href="/#read">02 / RESUME & SIGNALS</Link></li>
              <li><Link href="/#match">03 / MATCH ROUTES</Link></li>
              <li><Link href="/#principles">04 / OPERATING SYSTEM</Link></li>
              <li><Link href="/#move">05 / BOUNDARY CONTROL</Link></li>
            </ul>
          </div>

          <div className="footer-full__col">
            <h3 className="footer-full__heading">LEGAL & COMPLIANCE</h3>
            <ul className="footer-full__links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/cookies">Cookie Settings</Link></li>
              <li><Link href="/security">Security & NDAs</Link></li>
              <li><Link href="/app">Client Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-full__bottom">
          <div className="footer-full__legal">
            <p>© 2026 AM Agency Inc. All rights reserved.</p>
            <p className="footer-full__legal-sub">
              Registered Trademark. All agency artifacts, design systems, and code templates are protected under international copyright law.
            </p>
          </div>

          <div className="footer-full__back-top">
            <Link href="/" aria-label="Back to home">
              <span>BACK TO HOME</span>
              <span aria-hidden="true">↑</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
