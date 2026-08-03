package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    /**
     * Sends the plain 6-digit OTP to the target email address.
     */
    public void sendOtpEmail(String toEmail, String otp) {
        String subject = "Email Verification OTP - Job Portal";
        String content = "Hello,\n\n"
                + "Your email verification OTP code is: " + otp + "\n\n"
                + "This OTP is valid for 5 minutes only. Please do not share this code with anyone.\n\n"
                + "Best regards,\nJob Portal Team";

        if (mailSender != null) {
            try {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(toEmail);
                message.setSubject(subject);
                message.setText(content);
                mailSender.send(message);
                System.out.println("Verification OTP email successfully sent to: " + toEmail);
            } catch (Exception e) {
                System.err.println("Failed to send email via JavaMailSender: " + e.getMessage());
                System.out.println("[DEV FALLBACK] OTP for " + toEmail + " is: " + otp);
            }
        } else {
            System.out.println("[DEV FALLBACK - JavaMailSender not configured] OTP for " + toEmail + " is: " + otp);
        }
    }
}
