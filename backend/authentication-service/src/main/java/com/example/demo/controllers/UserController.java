package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public boolean registerUser(@RequestBody UserRegisterDTO user) {
        return uservice.addUser(user);
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
        String token = jwtService.generateToken(userDetails.getUsername());

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
}