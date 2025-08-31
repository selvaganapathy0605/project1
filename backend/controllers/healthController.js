import HealthData from "../models/healthData.js";

export const addHealthData = async (req, res) => {
  try {
    const { weight, calories, steps, mood, notes, date } = req.body;

    const newEntry = new HealthData({
      user: req.user._id,   
      weight,
      calories,
      steps,
      mood,
      notes,
      date: date ? new Date(date) : new Date()
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getHealthData = async (req, res) => {
  try {
    const data = await HealthData.find({ user: req.user._id }).sort({ date: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteHealthData = async (req, res) => {
  try {
    const entry = await HealthData.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id  
    });

    if (!entry) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
