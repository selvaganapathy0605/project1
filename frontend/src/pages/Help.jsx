import React from "react";
import "../components/PageLayout.css";

export default function Help() {
  return (
    <div className="wc-page main-page">
      <h1>Help Center</h1>
      <p>
        Welcome to the WellCompanion Help Center! Here you’ll find answers to
        common questions and guides to get started.
      </p>

      <h3>Frequently Asked Questions</h3>
      <ul>
        <li>💊 How do I track my health data?</li>
        <li>📱 Is my information private and secure?</li>
        <li>🍎 Can I connect fitness apps with WellCompanion?</li>
      </ul>

      <h3>Need more help?</h3>
      <p>
        📧 Email us:{" "}
        <a href="mailto:support@wellcompanion.com">
          support@wellcompanion.com
        </a>
      </p>
      <p>
        📞 Call us:{" "}
        <a href="tel:+916360154460">(+91) 6360154460</a>
      </p>
    </div>
  );
}
