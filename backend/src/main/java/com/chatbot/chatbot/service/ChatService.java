package com.chatbot.chatbot.service;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatModel chatModel;
    private final GeminiService geminiService;

    public String generateResponse(String prompt, String apiKey, String provider, String model) {
        if ("gemini".equalsIgnoreCase(provider)){
            return geminiService.generateResponse(prompt, apiKey, model);
        } else {
            return generateOpenAIResponse(prompt, apiKey);
        }
    }

    public String generateOpenAIResponse(String prompt, String apiKey) {
        OpenAiChatOptions options = OpenAiChatOptions.builder()
                .httpHeaders(Map.of("Authorization", "Bearer " + apiKey))
                .build();

        ChatResponse response = chatModel.call(new Prompt(prompt, options));

        return response.getResult().getOutput().getText();
    }
}
