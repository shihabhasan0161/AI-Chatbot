# Contributing Guide

Thanks for helping improve the Chatbot project! Follow the workflow below to keep reviews fast and predictable.

## 1. Before You Start
- Search existing issues or discussions; open a new one if your idea is novel.
- For large work, propose a design summary referencing relevant files (e.g., [`com.chatbot.chatbot.service.ChatService`](backend/src/main/java/com/chatbot/chatbot/service/ChatService.java), [`Chat`](frontend/src/components/Chat.jsx)).

## 2. Development Environment
```
fork this repository https://github.com/shihabhasan0161/react-spring-chatbot
git clone https://github.com/yourusername/react-spring-chatbot.git
cd react-spring-chatbot
```
- Backend: `cd backend && mvn spring-boot:run`
- Frontend: `cd frontend && npm install && npm run dev`
- Set `VITE_BACKEND_URL` and OpenAI credentials as described in [README.md](README.md).

## 3. Branch & Commit
- Branch naming: `feature/<topic>`, `bugfix/<issue-number>`, `docs/<scope>`.
- Write descriptive commits; reference issues (`Fixes #123`) where applicable.

## 5. Pull Requests
- Rebase on `main` before opening a PR.
- Fill out the template: summary, testing evidence, screenshots if UI changes.
- Link to any relevant docs (e.g., updates to [`LEARN.md`](LEARN.md)).

## 6. Issue Triaging
- Label issues with `bug`, `enhancement`, or `documentation`.
- Provide reproducible steps and environment details when filing bugs.

Following these steps ensures reviewers can focus on the substance of your contribution. See [LEARN.md](LEARN.md) for deeper architectural context.