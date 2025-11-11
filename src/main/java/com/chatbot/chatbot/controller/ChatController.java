package com.chatbot.chatbot.controller;

import com.chatbot.chatbot.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    public final ChatService chatService;

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt) {
        return chatService.generateResponse(prompt);
    }
}
