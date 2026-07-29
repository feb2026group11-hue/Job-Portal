package com.jobportal.jobapp.service;

import com.jobportal.jobapp.dto.MessageDto;

import java.util.List;

public interface MessageService {

    MessageDto sendMessage(MessageDto messageDto);

    List<MessageDto> getChatHistory(Integer user1, Integer user2);
}
