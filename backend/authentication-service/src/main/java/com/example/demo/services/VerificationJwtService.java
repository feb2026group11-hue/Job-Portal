package com.example.demo.services;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.exceptions.InvalidOtpException;
import com.example.demo.exceptions.InvalidTokenException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class VerificationJwtService {

    @Value("${jwt.verification.secret:verificationJwtSecretKeyVerificationJwtSecretKey123456}")
    private String verificationSecret;

    @Value("${jwt.verification.expiration-ms:300000}")
    private long expirationMs;

    private final SecureRandom secureRandom = new SecureRandom();

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(verificationSecret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Generates a secure 6-digit numeric OTP.
     */
    public String generate6DigitOtp() {
        int number = 100000 + secureRandom.nextInt(900000);
        return String.valueOf(number);
    }

    /**
     * Hashes plain OTP using SHA-256.
     */
    public String hashOtp(String otp) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(otp.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing OTP: SHA-256 algorithm unavailable", e);
        }
    }

    /**
     * Creates a stateless verification JWT containing only the hashed OTP and user email.
     */
    public String createVerificationToken(String email, String plainOtp) {
        String hashedOtp = hashOtp(plainOtp);
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(email)
                .claim("otpHash", hashedOtp)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Validates verification JWT and checks if submitted OTP hash matches token claims.
     */
    public void validateAndVerifyOtp(String email, String submittedOtp, String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new InvalidTokenException("Verification token is required.");
        }
        if (submittedOtp == null || submittedOtp.trim().isEmpty()) {
            throw new InvalidOtpException("OTP is required.");
        }

        Claims claims;
        try {
            claims = Jwts.parser()
                    .verifyWith((SecretKey) getSigningKey())
                    .build()
                    .parseSignedClaims(token.trim())
                    .getPayload();
        } catch (ExpiredJwtException e) {
            throw new InvalidTokenException("Verification session has expired. Please request a new OTP.");
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidTokenException("Invalid or corrupted verification token.");
        }

        String tokenEmail = claims.getSubject();
        if (tokenEmail == null || !tokenEmail.equalsIgnoreCase(email.trim())) {
            throw new InvalidTokenException("Verification token does not correspond to the specified email.");
        }

        String storedOtpHash = claims.get("otpHash", String.class);
        String submittedOtpHash = hashOtp(submittedOtp.trim());

        if (storedOtpHash == null || !MessageDigest.isEqual(
                storedOtpHash.getBytes(StandardCharsets.UTF_8),
                submittedOtpHash.getBytes(StandardCharsets.UTF_8))) {
            throw new InvalidOtpException("Invalid OTP provided. Verification failed.");
        }
    }
}
