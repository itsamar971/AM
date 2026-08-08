import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Cookie Settings & Policy | AM Agency",
  description: "Cookie policy and session preferences for AM Agency platform.",
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Settings & Policy"
      subtitle="Understanding essential session tokens, performance cookies, and user preferences."
      updatedDate="EFFECTIVE AUGUST 2026"
    >
      <section className="legal-section-card">
        <h2 className="legal-section-heading">1. Essential Cookies</h2>
        <p className="legal-section-body">
          We use strictly necessary cookies to authenticate user sessions, maintain portal security, and store interface theme preferences. These cookies are essential for core platform functionality and cannot be disabled.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">2. Analytics & Performance</h2>
        <p className="legal-section-body">
          Performance cookies help us measure page interaction speed and feature usage to continuously improve our user experience. All telemetry data is aggregated anonymously.
        </p>
      </section>

      <section className="legal-section-card">
        <h2 className="legal-section-heading">3. Managing Preferences</h2>
        <p className="legal-section-body">
          You can clear stored cookies at any time through your browser settings or manage session state via our client portal preferences.
        </p>
        <div className="legal-contact-box">
          <p><strong>Support & Questions</strong></p>
          <p>Location: Kompally, Hyderabad, Telangana, India</p>
          <p>Phone: +91 9542710588</p>
          <p>Email: <a href="mailto:infoam@gmail.com">infoam@gmail.com</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
