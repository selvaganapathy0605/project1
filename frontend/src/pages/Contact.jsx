import React from "react";
import "../components/PageLayout.css";

export default function Contact() {
  return (
    <div className="wc-page">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Whether you have questions, feedback, or
        partnership ideas, reach out to us.
      </p>

      <h3>📞 Phone</h3>
      <p>(+91) 6360154460</p>

      <h3>📧 Email</h3>
      <p>
        <a href="mailto:support@wellcompanion.com">
          support@wellcompanion.com
        </a>
      </p>

      <h3>📍 Address</h3>
      <p>WellCompanion HQ, Bangalore, India</p>
    </div>
  );
}
