package com.example.demo.dto;

public class SendOtpResponseDTO {

    private boolean status;
    private String message;
    private String verificationJwt;

    public SendOtpResponseDTO() {
    }

    public SendOtpResponseDTO(boolean status, String message, String verificationJwt) {
        this.status = status;
        this.message = message;
        this.verificationJwt = verificationJwt;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getVerificationJwt() {
        return verificationJwt;
    }

    public void setVerificationJwt(String verificationJwt) {
        this.verificationJwt = verificationJwt;
    }
}
