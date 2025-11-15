import Chat from "./components/Chat";
import Image from "./components/Image";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("apiKey") || "";
  });
  const [showApiModal, setShowApiModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey);
    } else {
      localStorage.removeItem("apiKey");
    }
  }, [apiKey]);

  const openApiModal = () => {
    setShowApiModal(true);
    setTempApiKey(apiKey);
  }

  const closeApiModal = () => {
    setShowApiModal(false);
    setTempApiKey(apiKey);
  }

  const saveApiKey = () => {
    setApiKey(tempApiKey);
    setShowApiModal(false);
  }

  return (
    <>
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">ChatBot</h1>
          <button className="api-key-button" onClick={openApiModal}>
            {apiKey ? "Update API Key" : "Set API Key"}
          </button>
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
          {activeTab === "chat" && <Chat apiKey={apiKey} />}
          {activeTab === "image" && <Image apiKey={apiKey} />}
        </div>
        <Toaster />
      </div>

      {showApiModal && (
        <div className="api-modal-overlay">
          <div className="api-modal">
            <div className="api-modal-header">Set OpenAI API Key</div>
            <p className="api-modal-text">
              Get your API key from your <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>OpenAI account</a>. We don&apos;t store your API key. It is saved in your browser&apos;s local storage only.
            </p>
            <input
              type="password"
              className="api-modal-input"
              placeholder="Enter your OpenAI API key"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
            />
            <div className="api-modal-actions">
              <button className="button-secondary" onClick={closeApiModal}>
                Cancel
              </button>
              <button className="button-primary" onClick={saveApiKey}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;