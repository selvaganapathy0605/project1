import React, { useState, useEffect } from "react";
import "./community.css";

export default function Community() {
  const [streak] = useState(5); // Example streak
  const [level, setLevel] = useState(3);
  const [xp, setXp] = useState(60); // Out of 100

  useEffect(() => {
    const timer = setInterval(() => {
      setXp((prev) => {
        if (prev >= 100) {
          setLevel((l) => l + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="community-container">
      <h1 className="title">🏆 Community Hub</h1>
      <p className="subtitle">Track your progress, earn rewards, and keep your streak alive!</p>

      {/* Streak Tracker */}
      <div className="streak-card">
        <div className="fire-icon">🔥</div>
        <h2>{streak}-Day Streak</h2>
        <p>Keep going! Don’t break the chain.</p>
      </div>

      {/* Level Progress */}
      <div className="progress-card">
        <h3>Level {level}</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${xp}%` }}></div>
        </div>
        <p>{xp}/100 XP</p>
      </div>

      {/* Achievements */}
      <div className="achievements">
        <h3>Achievements</h3>
        <div className="badge-grid">
          <div className="badge">🌟</div>
          <div className="badge">⚡</div>
          <div className="badge">💎</div>
          <div className="badge">🎯</div>
        </div>
      </div>
    </div>
  );
}
