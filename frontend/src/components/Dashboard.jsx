import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
    weight: "",
    calories: "",
    notes: "",
  });

  const [healthHistory, setHealthHistory] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/healthdata`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setHealthHistory(data);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to save your health data");
      navigate("/?login=true");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/healthdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Health data saved successfully");
        setFormData({
          bloodPressure: "",
          bloodSugar: "",
          waterIntake: "",
          mood: "",
          steps: "",
          sleep: "",
          temperature: "",
          weight: "",
          calories: "",
          notes: "",
        });
        
        setHealthHistory((prev) => [...prev, data.data]);
        navigate("/")
      } else {
        toast.error(data.message || "Error saving data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Health Dashboard
          </h1>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Daily Steps</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="steps" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Sleep Hours</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={healthHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sleep" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Mood (1-10)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="createdAt" hide />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="mood" stroke="#f59e0b" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Manual Data Entry
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Blood Pressure", name: "bloodPressure", type: "text" },
              { label: "Blood Sugar Level", name: "bloodSugar", type: "text" },
              { label: "Water Intake (L)", name: "waterIntake", type: "text" },
              { label: "Mood (1–10)", name: "mood", type: "number", min: 1, max: 10 },
              { label: "Steps Count", name: "steps", type: "number" },
              { label: "Sleep Hours", name: "sleep", type: "number" },
              { label: "Body Temperature", name: "temperature", type: "text" },
              { label: "Weight (kg)", name: "weight", type: "number" },
              { label: "Calories Intake", name: "calories", type: "number" },
            ].map((field) => (
              <div
                className="flex flex-col bg-white p-2 rounded-md shadow-sm"
                key={field.name}
              >
                <label className="mb-1 font-medium text-gray-800">
                  {field.label}
                </label>
                <input
                  required
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
            <div className="flex flex-col bg-white p-2 rounded-md shadow-sm">
              <label className="mb-1 font-medium text-gray-800">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any extra health notes..."
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
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
    </div>
  );
}
