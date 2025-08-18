import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import { toast } from "react-toastify";

export default function Header() {
  const navigate = useNavigate();

  const languages = ["English", "Hindi", "Kannada", "Tamil", "Telugu"];
  const [lang, setLang] = useState("English");
  const [langOpen, setLangOpen] = useState(false);

  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const email = localStorage.getItem("userEmail");
      setUserEmail(email);
    }
  }, []);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        authMode === "login"
          ? "http://localhost:5000/api/auth/login"
          : "http://localhost:5000/api/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (authMode === "login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userEmail", form.email);
          setUserEmail(form.email);
          setIsLoggedIn(true);
          navigate("/profile");
        } else {
          toast.success("Registered successfully!");
          navigate("/");
        }
        setAuthOpen(false);
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error(err);
      toast.warning("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <header className="hc-header">
        <div className="hc-left">
          <div className="hc-logo" aria-hidden>
            <span className="hc-logo-leaf">🍃</span>
            <span className="hc-logo-text">WellCompanion</span>
          </div>
        </div>

        <nav className="hc-nav" aria-label="Main navigation">
          <Link to="/" title="Home" className="hc-icon">🏠</Link>
          <Link to="/profile" title="Profile" className="hc-icon">👤</Link>
          <Link to="/Dashboard" title="Dashboard" className="hc-icon">📊</Link>
          <button className="hc-icon" title="Notifications">🔔</button>
        </nav>

        <div className="hc-right">
          <div className="hc-lang" onClick={() => setLangOpen(!langOpen)}>
            <span>{lang}</span>
            {langOpen && (
              <ul className="hc-lang-list">
                {languages.map((L) => (
                  <li key={L} onClick={() => { setLang(L); setLangOpen(false); }}>
                    {L}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isLoggedIn ? (
            <>
              <span className="mr-3">Hello, {userEmail} 👋</span>
              <button className="hc-btn hc-login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="hc-btn hc-login" onClick={() => openAuth("login")}>
                Login
              </button>
              <button className="hc-btn hc-signup" onClick={() => openAuth("signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </header>

      {authOpen && (
        <div className="hc-modal" role="dialog" aria-modal="true">
          <div className="hc-modal-backdrop" onClick={() => setAuthOpen(false)} />
          <div className="hc-modal-card">
            <button className="hc-modal-close" onClick={() => setAuthOpen(false)}>✕</button>
            <h3>{authMode === "login" ? "Login to WellCompanion" : "Create your account"}</h3>
            <form className="hc-auth-form" onSubmit={handleAuthSubmit}>
              <label>
                Email
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </label>
              <div className="hc-auth-actions">
                <button type="submit" className="hc-btn hc-primary">
                  {authMode === "login" ? "Login" : "Sign Up"}
                </button>
                <button
                  type="button"
                  className="hc-btn hc-ghost"
                  onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")}
                >
                  {authMode === "login" ? "Create account" : "Have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
