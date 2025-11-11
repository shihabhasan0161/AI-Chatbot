package com.chatbot.chatbot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatModel chatModel;

    public String generateResponse(String prompt) {
        return chatModel.call(prompt);
    }
}
