import React from "react";
import "../components/PageLayout.css";

export default function Privacy() {
  return (
    <div className="wc-page wc-privacy">
      <h1>Privacy Policy</h1>
      <p>
        At WellCompanion, your privacy is very important to us. We are committed
        to protecting your personal information and ensuring transparency in how
        we use it.
      </p>

      <h3>🔐 Information We Collect</h3>
      <p>
        We may collect basic personal details such as your name, email, and
        health preferences to provide a personalized experience.
      </p>

      <h3>📘 How We Use Your Data</h3>
      <ul>
        <li>To provide personalized health & wellness insights</li>
        <li>To improve our services and user experience</li>
        <li>To communicate important updates and offers</li>
      </ul>

      <h3>⚖️ Your Rights</h3>
      <p>
        You can request to access, update, or delete your information at any
        time by contacting us at{" "}
        <a href="mailto:privacy@wellcompanion.com">privacy@wellcompanion.com</a>.
      </p>

      <p>
        By using WellCompanion, you agree to this Privacy Policy. Any updates
        will be shared on this page.
      </p>
    </div>
  );
}
