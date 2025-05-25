import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const CaptionAgent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("Authorization");
    if (!storedToken) {
      console.error("No token found");
      return;
    }
    try {
      const decoded = jwtDecode(storedToken);
      setUserId(decoded.userId);
      setToken(storedToken);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`http://localhost:3060/captions/content/${userId}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        const formattedMessages = res.data.flatMap((chat) => [
          { sender: "user", text: chat.prompt },
          { sender: "bot", text: chat.response },
        ]);
        setMessages(formattedMessages);
      })
      .catch((err) => {
        console.error("Failed to load history:", err);
      });
  }, [userId, token]);

  const handleSend = async () => {
    if (!userInput.trim() || !userId || !token) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      const res = await axios.post(
        `http://localhost:3060/captions/content/${userId}`,
        { prompt: userInput },
        { headers: { Authorization: `${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.captions || res.data.response },
      ]);
    } catch (err) {
      console.error("❌ Error sending prompt:", err);
    }
  };

  const handleDelete = async () => {
    if (!userId || !token) return;

    const confirmed = window.confirm(
      "Are you sure you want to start a new chat? This will delete your current chat history."
    );
    if (!confirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:3060/captions/content/${userId}`,
        {
          headers: { Authorization: `${token}` },
          data: { title: "New Chat Session" }, // optional title
        }
      );

      console.log(res.data.message);
      setMessages([]); // Clear chat messages on frontend
    } catch (err) {
      console.error("❌ Error deleting chats:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center">
      <h1 className="text-white text-lg font-semibold mt-4">
        Captions Generator
      </h1>

      <div className="flex-1 w-full max-w-2xl px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-3 text-black max-w-[75%] ${
              msg.sender === "user"
                ? "bg-white ml-auto rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                : "bg-white mr-auto rounded-tr-2xl rounded-tl-2xl rounded-br-2xl"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="w-full max-w-2xl px-4 py-2 sticky bottom-0 bg-black flex items-center space-x-2">
        <input
          type="text"
          placeholder="Describe your image..."
          className="flex-1 px-4 py-3 bg-zinc-900 text-white outline-none"
          style={{ borderRadius: 0 }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-4 py-3 bg-white text-black"
        >
          Send
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-3 bg-red-600 text-white"
        >
          New Chat
        </button>
      </div>
    </div>
  );
};

export default CaptionAgent;
