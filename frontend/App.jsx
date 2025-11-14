import Chat from "./components/Chat";
import Image from "./components/Image";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">ChatBot</h1>
      </div>
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "chat" ? "active" : ""}`}
          onClick={() => handleTabChange("chat")}
        >
          ChatBot
        </button>
        <button
          className={`tab-button ${activeTab === "image" ? "active" : ""}`}
          onClick={() => handleTabChange("image")}
        >
          Image Generator
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "chat" && <Chat />}
        {activeTab === "image" && <Image />}
      </div>
      <Toaster />
    </div>
  );
};

export default App;
