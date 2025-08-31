import Chat from "../models/chat.js";

export const saveConversation = async (req, res) => {
  try {
    const { userId, message } = req.body;

    let aiResponse = "";
    const isDietQuery = /diet|food|meal|nutrition|eat|breakfast|lunch|dinner/i.test(message);

    if (isDietQuery) {
      aiResponse = `Here’s a healthy diet suggestion:
      - Breakfast: Oats with fruits
      - Lunch: Brown rice + grilled vegetables
      - Dinner: Light soup + salad
      - Snacks: Nuts & fruits`;

      const dietTasks = [
        "Eat Oats with fruits for breakfast",
        "Have Brown rice with grilled vegetables for lunch",
        "Light soup and salad for dinner",
        "Snacks: Nuts & fruits",
      ];

      await Task.insertMany(
        dietTasks.map((task) => ({
          userId: userId || null,
          task,
          category: "diet",
        }))
      );
    } else {
      aiResponse = `I understand your concern about "${message}". 
      Please consult a healthcare professional for proper diagnosis. 
      General advice: stay hydrated, rest well, and maintain a balanced lifestyle.`;
    }

    const chat = await Chat.create({ user: userId, message, response: aiResponse });

    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 });
    if (chats.length > 15) {
      const extra = chats.slice(15);
      const idsToRemove = extra.map((c) => c._id);
      await Chat.deleteMany({ _id: { $in: idsToRemove } });
    }

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ user: userId }).sort({ createdAt: -1 }).limit(15);
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
