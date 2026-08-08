import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy | AM Agency",
  description: "Privacy Policy for AM Agency - How we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How AM Agency collects, processes, and safeguards client data and platform information."
      updatedDate="EFFECTIVE AUGUST 2026"
    >
      <section className="legal-section-card">
        <h2 className="legal-section-heading">1. Information We Collect</h2>
        <p className="legal-section-body">
          AM Agency (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects information necessary to deliver high-quality software engineering, branding, and career automation services. This includes personal contact details, resume artifacts, portfolio metadata, and communications initiated through our website or client portal.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">2. Use of Collected Data</h2>
        <p className="legal-section-body">
          We utilize your data exclusively to fulfill project deliverables, optimize platform workflows, and communicate project milestones. We do not sell, rent, or monetize your personal data to third parties.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">3. Data Security & Storage</h2>
        <p className="legal-section-body">
          All information is stored using enterprise-grade AES-256 encryption at rest and TLS 1.3 in transit. Project repositories and client credentials are isolated within secure virtual environments.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">4. Contact Information</h2>
        <p className="legal-section-body">
          For privacy inquiries, data deletion requests, or compliance questions, please contact our Data Protection Officer:
        </p>
        <div className="legal-contact-box">
          <p><strong>AM Agency Legal & Compliance</strong></p>
          <p>Kompally, Hyderabad, Telangana, India</p>
          <p>Phone: +91 9542710588</p>
          <p>Email: <a href="mailto:infoam@gmail.com">infoam@gmail.com</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
