package com.example.demo.dto;

public class SendOtpRequestDTO {

    private String email;

    public SendOtpRequestDTO() {
    }

    public SendOtpRequestDTO(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
