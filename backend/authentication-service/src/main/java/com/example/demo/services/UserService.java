package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserRegisterDTO;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.entities.User.Status;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository urepo;

    @Autowired
    private RoleRepository rrepo;

    @Autowired
    private PasswordEncoder encoder;

    /**
     * Registers a new user
     */
    public boolean addUser(UserRegisterDTO userdto) {
        if (userdto == null) {
            throw new IllegalArgumentException("User registration data cannot be null");
        }
        if (userdto.getName() == null || userdto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (userdto.getEmail() == null || userdto.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userdto.getPassword() == null || userdto.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (userdto.getPhone() == null || userdto.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException("Phone number is required");
        }

        if (urepo.existsByEmail(userdto.getEmail().trim())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        if (urepo.existsByPhone(userdto.getPhone().trim())) {
            throw new IllegalArgumentException("Phone number is already registered");
        }

        Role role = rrepo.findById(userdto.getRid())
                .orElseThrow(() -> new IllegalArgumentException("Role not found for ID: " + userdto.getRid()));

        User user = new User();
        user.setRole(role);
        user.setName(userdto.getName().trim());
        user.setEmail(userdto.getEmail().trim());
        user.setPhone(userdto.getPhone().trim());
        user.setPassword(encoder.encode(userdto.getPassword()));
        user.setAddress(userdto.getAddress());
        user.setCity(userdto.getCity());
        user.setState(userdto.getState());
        user.setCountry(userdto.getCountry());
        user.setImage(null);
        user.setStatus(Status.Active);

        try {
            User savedUser = urepo.save(user);
            System.out.println("User Saved Successfully: " + savedUser.getEmail());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save user: " + e.getMessage(), e);
        }
    }

    /**
     * Fetch user by email
     */
    public User getUser(String email) {
        return urepo.findByEmail(email);
    }
}