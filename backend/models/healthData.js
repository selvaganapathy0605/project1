import mongoose from "mongoose";

const HealthDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bloodPressure: String,
    bloodSugar: String,
    waterIntake: String,
    mood: Number,
    steps: Number,
    sleep: Number,
    temperature: String,
  },
  { timestamps: true }
);

export default mongoose.model("HealthData", HealthDataSchema);
