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

    // update user
    public boolean updateUser(Integer uid, UserRegisterDTO userdto) {

        if (uid == null) {
            throw new IllegalArgumentException("User id is required");
        }

        if (userdto == null) {
            throw new IllegalArgumentException("User data cannot be null");
        }

        User user = urepo.findById(uid)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Name
        if (userdto.getName() == null || userdto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        user.setName(userdto.getName().trim());

        userdto.setEmail(user.getEmail());

        // Phone
        // if (userdto.getPhone() == null || userdto.getPhone().trim().isEmpty()) {
        // throw new IllegalArgumentException("Phone number is required");
        // }

        // if (urepo.existsByPhone(userdto.getPhone().trim())
        // && !user.getPhone().equals(userdto.getPhone().trim())) {
        // throw new IllegalArgumentException("Phone number is already registered");
        // }

        user.setPhone(user.getPhone());

        // Password (Update only if provided)
        if (userdto.getPassword() != null && !userdto.getPassword().trim().isEmpty()) {
            user.setPassword(encoder.encode(userdto.getPassword()));
        }

        // Address Details
        user.setAddress(userdto.getAddress());
        user.setCity(userdto.getCity());
        user.setState(userdto.getState());
        user.setCountry(userdto.getCountry());

        // // Update Role (Optional)
        // if (userdto.getRid() != null) {
        // Role role = rrepo.findById(userdto.getRid())
        // .orElseThrow(() -> new IllegalArgumentException("Role not found"));
        // user.setRole(role);
        // }

        try {
            urepo.save(user);
            return true;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user: " + e.getMessage(), e);
        }
    }

    public User updateUser(int id, com.example.demo.dto.UserDTO userdto) {
        User user = urepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userdto.getName());
        user.setPhone(userdto.getPhone());
        user.setAddress(userdto.getAddress());
        user.setCity(userdto.getCity());
        user.setState(userdto.getState());
        user.setCountry(userdto.getCountry());
        return urepo.save(user);
    }

    public User getUserById(Integer uid) {
        return urepo.findById(uid)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public boolean changePassword(int id, String oldPassword, String newPassword) {
        User user = urepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!encoder.matches(oldPassword, user.getPassword())) {
            return false;
        }
        user.setPassword(encoder.encode(newPassword));
        urepo.save(user);
        return true;
    }
}