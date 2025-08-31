import mongoose from "mongoose";

const HealthDataSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodPressure: String,   
    bloodSugar: String,      
    waterIntake: String,     
    mood: Number,            
    steps: Number,           
    sleep: Number,           
    temperature: String,     
    weight: Number,          
    calories: Number,        
    notes: String,           
    date: { type: Date, default: () => new Date() } 
  },
  { timestamps: true }
);

export default mongoose.model("HealthData", HealthDataSchema);
