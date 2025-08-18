import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Header />
        <ToastContainer />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
          <Route path="/ExploreFeatures" element={<Chatbot/>}/>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
