import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: { type: String, required: true },
  age: Number,
  gender: String,
  contact: String,
  email: String,
  address: String,
  bloodGroup: String,
  height: Number,
  weight: Number,
  allergies: String,
  chronicCondition: String,
  medicalCondition: String,
}, { timestamps: true });

export default mongoose.model("Profile", ProfileSchema);
