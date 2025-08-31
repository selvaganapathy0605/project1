import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Header.css";
import { toast } from "react-toastify";
import favicon from "../assets/favicon.ico"; 

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const savedName = localStorage.getItem("userName");
      setUserName(savedName);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("login") === "true") {
      setAuthMode("login");
      setAuthOpen(true);
    }
  }, [location]);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        authMode === "login"
          ? `${process.env.REACT_APP_API_URL}/auth/login`
          : `${process.env.REACT_APP_API_URL}/auth/register`;

      const bodyData =
        authMode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        if (authMode === "login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.user?.name || form.email);
          setUserName(data.user?.name || form.email);
          setIsLoggedIn(true);
          navigate("/profile");
        } else {
          toast.success("Registered successfully! Please login.");
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
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <header className="hc-header">
        <div className="hc-left">
          <div className="hc-logo" aria-hidden>
            <img className="w-6 h-6 mr-2" src={favicon} alt="fav" />
            <span className="hc-logo-text">WellCompanion</span>
          </div>
        </div>

        <nav className="hc-nav" aria-label="Main navigation">
          <Link to="/" title="Home" className="hc-icon">🏠</Link>
          <Link to="/profile" title="Profile" className="hc-icon">👤</Link>
          <Link to="/dashboard" title="Dashboard" className="hc-icon">📊</Link>
          <Link to="/chatbox" title="Chatbot" className="hc-icon">🤖</Link>
          <button
            className="hc-icon hc-bell"
            onClick={() => navigate("/notifications", { state: { notifications } })}
          >
            🔔
            {notifications.length > 0 && (
              <span className="hc-badge">{notifications.length}</span>
            )}
          </button>
        </nav>

        <div className="hc-right">
          {isLoggedIn ? (
            <>
              <span className="hc-user">Hello, {userName} 👋</span>
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
              {authMode === "signup" && (
                <label>
                  Name
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </label>
              )}
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
