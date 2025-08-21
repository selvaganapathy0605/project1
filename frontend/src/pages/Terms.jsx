import React from "react";
import "../components/PageLayout.css";

export default function Terms() {
  return (
    <div className="wc-page wc-terms">
      <h1>Terms & Conditions</h1>
      <p>
        Welcome to WellCompanion! By using our platform, you agree to the
        following terms and conditions. Please read them carefully.
      </p>

      <h3>✅ Use of Service</h3>
      <p>
        Our service is intended to provide health and wellness information. It
        should not be considered a substitute for professional medical advice,
        diagnosis, or treatment.
      </p>

      <h3>👤 User Responsibilities</h3>
      <ul>
        <li>You agree to use WellCompanion only for lawful purposes.</li>
        <li>You must not misuse or attempt to disrupt our services.</li>
        <li>You are responsible for keeping your account information secure.</li>
      </ul>

      <h3>⚠️ Limitation of Liability</h3>
      <p>
        WellCompanion is not responsible for any health decisions made solely
        based on the information provided on this platform. Always consult a
        healthcare professional for personal medical concerns.
      </p>

      <h3>📅 Updates to Terms</h3>
      <p>
        We may update these Terms & Conditions from time to time. Continued use
        of our platform means you accept the updated terms.
      </p>

      <p>
        If you have any questions about these Terms, contact us at{" "}
        <a href="mailto:support@wellcompanion.com">support@wellcompanion.com</a>.
      </p>
    </div>
  );
}
