import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { config, endpoint } from "../utils/config.js";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [{ text: "Hello! How can I help you today?", sender: "bot" }];
  });

  const messagesEndRef = useRef(null);

  // Save chat history to local storage
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatResponse = async () => {
    if (!prompt.trim() || !apiKey.trim()) {
      toast.error("Something went wrong. Please check your input.");
      return;
    }

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => {
      return [...prev, userMessage];
    });
    setPrompt("");

    try {
      const response = await config.post(endpoint.CHAT, { prompt, apiKey });
      const data = response.data;
      const botMessage = { text: data, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch response from the server.");
    }
  };

  // Handle Enter key press for sending message
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatResponse();
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="api-key-input">
        <p>We don't store your API key. It is saved in local storage.</p>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API Key"
        />
      </div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button className="send-button" onClick={handleChatResponse}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
