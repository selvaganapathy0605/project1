// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import { ToastContainer } from "react-toastify";
import About from "./pages/About"; 
import Help from "./pages/Help";  
import Careers from "./pages/Careers";
import Contact from "./pages/Contact"; 
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms"; 
import Notifications from "./components/Notifications";
import Community from "./components/Community";   // ✅ Import Community

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbox" element={<Chatbot />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/community" element={<Community />} />   {/* ✅ New Route */}
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} /> 
          <Route path="/careers" element={<Careers />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} /> 
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
