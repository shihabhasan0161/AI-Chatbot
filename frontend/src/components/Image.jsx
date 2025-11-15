import { useState } from "react";
import { toast } from "react-hot-toast";
import { config, endpoint } from "../utils/config.js";

const Image = ({ apiKey }) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState([]);

  const handleImageGeneration = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt.");
      return;
    }

    if (!apiKey) {
      toast.error("Please set your OpenAI API key first.");
      return;
    }

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
