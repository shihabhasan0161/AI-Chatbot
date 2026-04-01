import axios from "axios";

const config = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const endpoint = {
    CHAT: "/chat",
    IMAGE: "/generate-image",
    FILE_UPLOAD: "/upload-file", // to be implemented in backend
};

export {config, endpoint};
export default config;