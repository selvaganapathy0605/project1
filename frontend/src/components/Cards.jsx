import React from "react";
import "./Cards.css";

const items = [
  { title: "Move daily", desc: "20–30 minutes of movement improves mood and metabolic health." },
  { title: "Hydration", desc: "Drink water regularly — small sips across the day." },
  { title: "Balanced meals", desc: "Combine protein, healthy fats and fiber at each meal." },
  { title: "Quality sleep", desc: "Prioritize 7–8 hours of consistent sleep each night." },
  { title: "Mindfulness", desc: "Short daily breathing or meditation increases resilience." },
  { title: "Track progress", desc: "Use simple metrics to celebrate small wins." },
  { title: "Strength training", desc: "2–3 sessions per week for bone & muscle health." },
  { title: "Social checks", desc: "Connect with peers — mental health matters." },
];

export default function Cards() {
  return (
    <div className="cards-grid" aria-live="polite">
      {items.map((c, i) => (
        <article
          className="hc-card"
          key={c.title}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="hc-card-emoji">{["🏃","💧","🍽️","🛌","🧘","📈","🏋️","🤝"][i]}</div>
          <h3>{c.title}</h3>
          <p>{c.desc}</p>
        </article>
      ))}
    </div>
  );
}
