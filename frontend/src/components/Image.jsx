import { useState } from "react";
import { toast } from "react-hot-toast";
import { config, endpoint } from "../utils/config.js";

const Image = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const handleImageGeneration = async () => {
    try {
      const res = await config.post(endpoint.IMAGE, { prompt, apiKey });
      setImageUrl(res.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch response from the server.");
    }
  };

  return (
    <div className="image-container">
      <div className="api-key-input">
        <p>We don't store your API key. It is saved in local storage.</p>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API Key"
        />
      </div>
      <h1>Generate Image</h1>
      <input
        className="image-input"
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter image prompt"
      />
      <button onClick={handleImageGeneration}>Generate</button>
      <div className="image-results">
        {imageUrl.map((url, index) => (
          <img key={index} src={url} alt={`Generated ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Image;
