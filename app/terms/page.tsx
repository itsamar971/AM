import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Service | AM Studio",
  description: "Terms of Service governing use of AM Studio platform services and client engagements.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="Master terms governing digital services, client contracts, and agency software deliverables."
      updatedDate="EFFECTIVE AUGUST 2026"
    >
      <section className="legal-section-card">
        <h2 className="legal-section-heading">1. Engagement Scope & Deliverables</h2>
        <p className="legal-section-body">
          AM Studio agrees to provide design, engineering, and software delivery services as defined in individual client Statements of Work (SOW) or project briefs. All deliverables are built around agreed scope boundaries.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">2. Intellectual Property Rights</h2>
        <p className="legal-section-body">
          Upon complete payment of project fees, clients retain full ownership of bespoke codebases, branding assets, and custom design artifacts produced for their specific engagement.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">3. Client Control & Guarantees</h2>
        <p className="legal-section-body">
          AM Studio operates under transparent scope principles. No undisclosed recurring commitments, sub-licensing obligations, or external dependencies are introduced without explicit client approval.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">4. Contact Details</h2>
        <div className="legal-contact-box">
          <p><strong>AM Studio Head Office</strong></p>
          <p>Kompally, Hyderabad, Telangana, India</p>
          <p>Phone: +91 9542710588</p>
          <p>Email: <a href="mailto:infoam@gmail.com">infoam@gmail.com</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
