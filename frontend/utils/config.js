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
};

export {config, endpoint};
export default config;