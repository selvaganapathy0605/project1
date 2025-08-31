import React from "react";
import "../components/PageLayout.css";

export default function Careers() {
  return (
    <div className="wc-page wc-careers main-page">
      <h1>Careers at WellCompanion</h1>
      <p>
        At WellCompanion, we’re on a mission to transform health and wellness
        through personalized technology. 🚀
      </p>

      <h3>Why join us?</h3>
      <ul>
        <li>🌱 Work on meaningful projects that improve lives</li>
        <li>🤝 Collaborative and inclusive culture</li>
        <li>📚 Opportunities for learning and growth</li>
      </ul>

      <h3>Current Openings</h3>
      <p>No open roles right now — but we’d love to hear from you!</p>

      <h3>Contact Us</h3>
      <p>
        📧 Send your resume to{" "}
        <a href="mailto:careers@wellcompanion.com">careers@wellcompanion.com</a>
      </p>
    </div>
  );
}
