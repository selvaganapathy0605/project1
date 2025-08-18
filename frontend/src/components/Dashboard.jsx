import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bloodPressure: "",
    bloodSugar: "",
    waterIntake: "",
    mood: "",
    steps: "",
    sleep: "",
    temperature: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Login to save your health data");
      navigate("/");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/healthdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.success(data.message);
      navigate('/')
      setFormData({
        bloodPressure: "",
        bloodSugar: "",
        waterIntake: "",
        mood: "",
        steps: "",
        sleep: "",
        temperature: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 mt-4">Dashboard</h1>
        <h2 className="text-xl text-gray-600 mb-6">Manual Data Entry</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Blood Pressure", name: "bloodPressure", type: "text" },
            { label: "Blood Sugar Level", name: "bloodSugar", type: "text" },
            { label: "Water Intake (L)", name: "waterIntake", type: "text" },
            { label: "Mood (1–10)", name: "mood", type: "number", min: 1, max: 10 },
            { label: "Steps Count", name: "steps", type: "number" },
            { label: "Sleep Hours", name: "sleep", type: "number" },
            { label: "Body Temperature", name: "temperature", type: "text" },
          ].map((field) => (
            <div className="flex flex-col bg-white p-2 rounded-md shadow-sm" key={field.name}>
              <label className="mb-1 font-medium text-gray-800">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                min={field.min}
                max={field.max}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md shadow-lg transition duration-200"
            >
              Save Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
