package com.jobportal.jobapp.service.impl;

import com.jobportal.jobapp.dto.MessageDto;
import com.jobportal.jobapp.entities.Message;
import com.jobportal.jobapp.repository.MessageRepository;
import com.jobportal.jobapp.service.MessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public MessageDto sendMessage(MessageDto messageDto) {
        Message msg = new Message();
        msg.setSenderId(messageDto.getSenderId());
        msg.setReceiverId(messageDto.getReceiverId());
        msg.setTextMessage(messageDto.getTextMessage());
        msg.setDatetime(LocalDateTime.now());
        
        Message saved = messageRepository.save(msg);
        return mapEntityToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MessageDto> getChatHistory(Integer user1, Integer user2) {
        return messageRepository.findChatHistory(user1, user2).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    private MessageDto mapEntityToDto(Message entity) {
        MessageDto dto = new MessageDto();
        dto.setMsgid(entity.getMsgid());
        dto.setSenderId(entity.getSenderId());
        dto.setReceiverId(entity.getReceiverId());
        dto.setDatetime(entity.getDatetime());
        dto.setTextMessage(entity.getTextMessage());
        return dto;
    }
}
