import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Security & NDAs | AM Agency",
  description: "Security architecture, mutual NDA guarantees, and asset protection at AM Agency.",
};

export default function SecurityPage() {
  return (
    <LegalLayout
      title="Security & NDAs"
      subtitle="Institutional security standards, encrypted data pipelines, and strict client confidentiality guarantees."
      updatedDate="EFFECTIVE AUGUST 2026"
    >
      <section className="legal-section-card">
        <h2 className="legal-section-heading">1. Mutual Non-Disclosure Obligations</h2>
        <p className="legal-section-body">
          AM Agency executes Mutual Non-Disclosure Agreements (MNDAs) prior to reviewing proprietary client briefs, codebase repositories, or strategic roadmap assets. All client disclosures remain strictly confidential.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">2. Codebase & Infrastructure Protection</h2>
        <p className="legal-section-body">
          We employ strict zero-trust access controls, multi-factor authentication across all developer seats, and automated vulnerability scanning. Code repositories are isolated per client engagement.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">3. Reporting & Compliance</h2>
        <p className="legal-section-body">
          To request an executed NDA or report a security concern, contact our dedicated security team:
        </p>
        <div className="legal-contact-box">
          <p><strong>AM Agency Security Operations</strong></p>
          <p>Kompally, Hyderabad, Telangana, India</p>
          <p>Phone: +91 9542710588</p>
          <p>Email: <a href="mailto:infoam@gmail.com">infoam@gmail.com</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
