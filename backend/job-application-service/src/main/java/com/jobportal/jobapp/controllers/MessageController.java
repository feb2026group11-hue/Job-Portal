package com.jobportal.jobapp.controllers;

import com.jobportal.jobapp.dto.MessageDto;
import com.jobportal.jobapp.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@Validated
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<MessageDto> sendMessage(@Valid @RequestBody MessageDto request) {
        return new ResponseEntity<>(messageService.sendMessage(request), HttpStatus.CREATED);
    }

    @GetMapping("/history")
    public ResponseEntity<List<MessageDto>> getChatHistory(
            @RequestParam Integer user1,
            @RequestParam Integer user2) {
        return ResponseEntity.ok(messageService.getChatHistory(user1, user2));
    }
}
