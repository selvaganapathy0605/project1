import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: "",
    chronicCondition: "",
    medicalCondition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to save your profile");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        
        toast.success(data.message || "Profile saved successfully");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Error saving profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-6xl border border-gray-300"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
            Health Profile Form
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-400 text-gray-800">
              Personal Information
            </h2>
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Age", name: "age", type: "number" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["Male", "Female", "Other"],
              },
              { label: "Contact", name: "contact", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Address", name: "address", type: "text" },
            ].map((field) => (
              <div key={field.name} className="flex items-center mb-4">
                <label className="w-40 font-medium text-gray-700">
                  {field.label}:
                </label>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="flex-1 border border-gray-500 rounded-md px-3 py-2"
                  >
                    <option value="">Select</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="flex-1 border border-gray-500 rounded-md px-3 py-2"
                  />
                )}
              </div>
            ))}
          </div>

          
          <div>
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-400 text-gray-800">
              Medical Information
            </h2>
            {[
              { label: "Blood Group", name: "bloodGroup", type: "text" },
              { label: "Height (cm)", name: "height", type: "number" },
              { label: "Weight (kg)", name: "weight", type: "number" },
              { label: "Allergies", name: "allergies", type: "text" },
              {
                label: "Chronic Condition",
                name: "chronicCondition",
                type: "text",
              },
              {
                label: "Medical Condition",
                name: "medicalCondition",
                type: "text",
              },
            ].map((field) => (
              <div key={field.name} className="flex items-center mb-4">
                <label className="w-48 font-medium text-gray-700">
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="flex-1 border border-gray-500 rounded-md px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-2 rounded-md shadow-md hover:scale-105 transition-transform"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
