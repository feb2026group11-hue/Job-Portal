package com.example.demo.dto;

public class VerifyOtpRequestDTO {

    private String email;
    private String otp;
    private String verificationJwt;

    public VerifyOtpRequestDTO() {
    }

    public VerifyOtpRequestDTO(String email, String otp, String verificationJwt) {
        this.email = email;
        this.otp = otp;
        this.verificationJwt = verificationJwt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getVerificationJwt() {
        return verificationJwt;
    }

    public void setVerificationJwt(String verificationJwt) {
        this.verificationJwt = verificationJwt;
    }
}
