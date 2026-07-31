package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import com.example.demo.dto.LoginRequestDTO;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserRegisterDTO;
import com.example.demo.entities.User;
import com.example.demo.services.JwtService;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")

public class UserController {

    // Handles user registration and fetching user details
    @Autowired
    private UserService uservice;

    // Generates and validates JWT Tokens
    @Autowired
    private JwtService jwtService;

    // Spring Security Authentication Manager
    @Autowired
    private AuthenticationManager authManager;

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegisterDTO user) {
        try {
            boolean isRegistered = uservice.addUser(user);
            if (isRegistered) {
                return ResponseEntity.ok(Map.of("message", "User registered successfully", "status", true));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Registration failed", "status", false));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage(), "status", false));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message",
                    e.getMessage() != null ? e.getMessage() : "Internal server error", "status", false));
        }
    }

    /**
     * Login API
     * Authenticates user using Email & Password
     * Generates JWT Token
     * Returns User Details + Token
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequestDTO request) {

        // Authenticate user using email and password
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // Authenticated UserDetails
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // Fetch user from database
        User user = uservice.getUser(request.getEmail());

        // Generate JWT Token
        // String token = jwtService.generateToken(userDetails.getUsername());
        String token = jwtService.generateToken(userDetails);

        // Prepare User DTO
        UserDTO userdto = new UserDTO(
                user.getUid(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getCountry(),
                user.getRole().getRname());

        // Create Login Response
        LoginResponse response = new LoginResponse(userdto, token);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getAuthenticatedUser(Authentication authentication) {

        // Get logged-in user's email from JWT
        String email = authentication.getName();

        // Fetch user from database
        User user = uservice.getUser(email);

        // Convert to DTO
        UserDTO userdto = new UserDTO(
                user.getUid(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getCountry(),
                user.getRole().getRname());

        return ResponseEntity.ok(userdto);
    }

    // user by uid
    @GetMapping("/{uid}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Integer uid) {

        User user = uservice.getUserById(uid);

        UserDTO userdto = new UserDTO(
                user.getUid(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getCity(),
                user.getState(),
                user.getCountry(),
                user.getRole().getRname());

        return ResponseEntity.ok(userdto);
    }

    // update user endpoint
    @PutMapping("/update/{uid}")
    public ResponseEntity<?> updateUser(@PathVariable Integer uid,
            @RequestBody UserRegisterDTO user) {
        System.out.println("\n\n-----------Controller reached-----\n\n");
        try {
            boolean isUpdated = uservice.updateUser(uid, user);

            if (isUpdated) {
                return ResponseEntity.ok(Map.of(
                        "message", "User updated successfully",
                        "status", true));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", "User update failed",
                        "status", false));
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", e.getMessage(),
                    "status", false));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "message", e.getMessage() != null ? e.getMessage() : "Internal server error",
                    "status", false));
        }
    }
}