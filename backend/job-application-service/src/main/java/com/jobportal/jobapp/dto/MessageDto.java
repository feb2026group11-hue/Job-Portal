package com.jobportal.jobapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class MessageDto {

    private Integer msgid;

    @NotNull(message = "Sender ID is required")
    private Integer senderId;

    @NotNull(message = "Receiver ID is required")
    private Integer receiverId;

    private LocalDateTime datetime;

    @NotBlank(message = "Message text cannot be blank")
    private String textMessage;

    public MessageDto() {
    }

    public Integer getMsgid() {
        return msgid;
    }

    public void setMsgid(Integer msgid) {
        this.msgid = msgid;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public Integer getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(Integer receiverId) {
        this.receiverId = receiverId;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public String getTextMessage() {
        return textMessage;
    }

    public void setTextMessage(String textMessage) {
        this.textMessage = textMessage;
    }
}
