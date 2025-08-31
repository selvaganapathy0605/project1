import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

const AuthContext = React.createContext(null);

export default function Chatbot() {
  const { user } = useContext(AuthContext) || {};
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/chat/${user._id}`)
        .then((res) =>
          setChatHistory(
            res.data
              .slice(-15)
              .map((c) => [
                { sender: "user", text: c.disease },
                { sender: "ai", text: c.response },
              ])
              .flat()
          )
        )
        .catch((err) => console.error("Error fetching chats:", err));
    }
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setChatHistory((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat/ask`, {
        userId: user ? user._id : null,
        disease: input,
      });

      const aiMsg = { sender: "ai", text: res.data.response };
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Error getting AI response:", err);
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Error connecting to AI server." },
      ]);
    }

    setInput("");
  };
  const handleDietPlan = () => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", text: "Show me a diet plan" },
      {
        sender: "ai",
        text: "✅ Here’s a sample diet plan:\n- Breakfast: Oats with fruits 🍎\n- Lunch: Brown rice + veggies 🥦\n- Snack: Nuts & Green tea ☕\n- Dinner: Grilled chicken/fish + salad 🥗",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg flex flex-col w-full max-w-3xl h-[70vh]">
        <h1 className="text-2xl font-bold py-3 px-4 border-b text-green-600 text-center">
          AI Chatbot
        </h1>
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className="flex flex-col max-w-[75%]">
              <div
                className={`px-4 py-2 rounded-lg break-words ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="p-3 border-t flex flex-col gap-2">
          
          <div className="flex gap-2">
            <button
              onClick={handleDietPlan}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              🍽️ Diet Plan
            </button>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
