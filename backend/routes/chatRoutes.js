import express from "express";
import Chat from "../models/chat.js";
import Groq from "groq-sdk";

const router = express.Router();


const groq = new Groq({ apiKey: "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" });


router.post("/ask", async (req, res) => {
  try {
    const { userId, disease } = req.body;

   
    const isDietQuery = /diet|food|meal|nutrition|eat|breakfast|lunch|dinner/i.test(
      disease
    );

    
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192", 
      messages: [
        { role: "system", content: "You are a helpful health & diet assistant AI." },
        { role: "user", content: disease },
      ],
    });

    const aiResponse =
      completion.choices[0]?.message?.content || "⚠️ No response from AI";

    
    let chatDoc = null;
    if (userId) {
      chatDoc = new Chat({ userId, disease, response: aiResponse });
      await chatDoc.save();
    }

    
    if (isDietQuery && userId) {
      
      const suggestions = aiResponse.split("\n").filter((line) => line.trim());

      const tasks = suggestions.map((line) => ({
        userId,
        task: line.replace(/[-•]/, "").trim(), 
        category: "diet",
      }));

      if (tasks.length) {
        await Task.insertMany(tasks);
      }
    }

    res.json({ response: aiResponse, chat: chatDoc });
  } catch (err) {
    console.error("Groq API error:", err);
    res
      .status(500)
      .json({ response: "⚠️ Error connecting to AI service. Try again later." });
  }
});


router.get("/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId }).sort({
      createdAt: 1,
    });
    res.json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

export default router;
