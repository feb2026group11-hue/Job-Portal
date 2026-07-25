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

        // Fetch Role from Role table
        Role role = rrepo.findById(userdto.getRid())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Create User object
        User user = new User();

        user.setRole(role);
        user.setName(userdto.getName());
        user.setEmail(userdto.getEmail());
        user.setPhone(userdto.getPhone());
        user.setPassword(encoder.encode(userdto.getPassword()));
        user.setAddress(userdto.getAddress());
        user.setCity(userdto.getCity());
        user.setState(userdto.getState());
        user.setCountry(userdto.getCountry());
        user.setImage(null); // Default image
        user.setStatus(Status.Active);

        try {
            User savedUser = urepo.save(user);

            System.out.println("User Saved Successfully");
            System.out.println(savedUser);

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Fetch user by email
     */
    public User getUser(String email) {
        return urepo.findByEmail(email);
    }
}