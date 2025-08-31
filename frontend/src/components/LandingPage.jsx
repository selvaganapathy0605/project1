import React from "react";
import "./LandingPage.css";
import Cards from "./Cards";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const isLoggedIn = localStorage.getItem("token"); 

  return (
    <main className="lp-main">
      {isLoggedIn && (
        <div className="community-icon">
          <Link to="/community" title="Join Community">
            🌐
          </Link>
        </div>
      )}

      <section className="lp-hero">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-logo-large">❤️</div>
          </div>

          <div className="hero-center">
            <h1 className="hero-quote">
              <strong>
                Your personalized health companion — smarter habits, healthier life.
              </strong>
            </h1>
            <div className="hero-cta">
              <Link
                to="/chatbox "
                title="Explore Features "
                className="px-4 py-2 border border-green-500 text-blue-500 rounded hover:bg-green-500 hover:text-white transition"
              >
                Explore Features 🤖
              </Link>
            </div>
            <div className="hero-icons">
              <div className="icon-block">🏃</div>
              <div className="icon-block">🥗</div>
              <div className="icon-block">🧘</div>
              <div className="icon-block">📊</div>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-quote-overlay">
            <p>“Track your wellness — one smart habit at a time.”</p>
          </div>
        </div>
      </section>

      <section className="lp-cards">
        <h2>Healthy Living — small ideas that add up</h2>
        <p className="lp-subtle">
          Tips & thoughts about fitness, nutrition and mental well-being
        </p>
        <Cards />
      </section>
    </main>
  );
}
