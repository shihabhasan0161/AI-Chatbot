## Request Flow
1. `App` (`[`App`](frontend/src/App.jsx)`) renders Chat and Image tabs plus API-key modal.
2. Chat prompts flow from [`Chat`](frontend/src/components/Chat.jsx) to the backend through axios [`config`](frontend/src/utils/config.js).
3. The Spring Boot API hands prompts to:
   - [`com.chatbot.chatbot.service.ChatService`](backend/src/main/java/com/chatbot/chatbot/service/ChatService.java) for GPT-4o completions.
   - [`com.chatbot.chatbot.service.ImageService`](backend/src/main/java/com/chatbot/chatbot/service/ImageService.java) for DALL·E 3 generations.
4. JSON results stream back to the SPA, which persists them in localStorage for instant retrieval.

## Frontend Highlights
- **Session history**: `previousChats` and `messages` arrays live in [`Chat`](frontend/src/components/Chat.jsx), synced to `localStorage` for persistence and preloading.
- **Responsive sidebar**: `useLayoutEffect` toggles the history drawer on small screens, improving UX without extra CSS frameworks.
- **Keyboard UX**: `Enter` submits, `Shift+Enter` adds a newline, matching established messaging conventions.
- **API key modal**: Managed in `App`, storing the key under `localStorage.apiKey`. This key is never sent to the backend outside of user-triggered requests.

## Backend Highlights
- **Chat completion**: [`ChatService`](backend/src/main/java/com/chatbot/chatbot/service/ChatService.java) proxies arbitrary prompts to Spring AI’s `ChatModel`, injecting the runtime `apiKey` via HTTP headers so each user can bring their own credentials.
- **Image generation**: [`ImageService`](backend/src/main/java/com/chatbot/chatbot/service/ImageService.java) bootstraps `OpenAiImageModel` lazily, keeping the implementation state-free and thread-safe.
- **Transport**: The REST controllers [`com.chatbot.chatbot.controller.ChatController`](backend/src/main/java/com/chatbot/chatbot/controller/ChatController.java) and [`com.chatbot.chatbot.controller.ImageController`](backend/src/main/java/com/chatbot/chatbot/controller/ImageController.java) are intentionally thin, delegating auth + validation to the caller.
- **CORS**: [`com.chatbot.chatbot.config.Config`](backend/src/main/java/com/chatbot/chatbot/config/Config.java) whitelists the deployed frontend origin; update `allowedOrigins` when self-hosting.

## Persistence Strategy
All conversational data lives in the browser:
- `chatHistory` → active conversation.
- `previousChats` → multi-session archive.
- API key → only in localStorage (never stored server-side), aligned with messaging in the modal.

## Extending the Project
- Refer to issues to check out or submit relevant issues for this project.

Refer back to [README.md](README.md) for setup and to [CONTRIBUTING.md](CONTRIBUTING.md) when you are ready to collaborate.