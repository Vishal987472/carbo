// src/pages/ChatbotPage.jsx
import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your eco-friendly assistant 🌱. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/chat", { message: input });
      const botReply = res.data.reply || "⚠️ Sorry, I couldn’t get a response.";

      const botMessage = { sender: "bot", text: botReply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Something went wrong while contacting AI. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex justify-center px-4">
      <div className="w-full max-w-5xl bg-[#1e293b] rounded-2xl shadow-lg flex flex-col h-[85vh]">
        {/* Header */}
        <div className="calculator-header px-6 py-4 border-b border-gray-700">
          <div className="tag">
            <i className="fas fa-robot mr-2"></i>AI Assistant
          </div>
          <h2>
            Carbon <span className="highlight">Footprint</span> Analyzer
          </h2>
          <p>Chat with your AI assistant for eco-friendly tips and guidance.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-700 text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-gray-700 text-gray-400">Typing...</div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
