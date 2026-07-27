package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserDetailServiceBean implements UserDetailsService {

    // Repository to fetch user details
    @Autowired
    private UserRepository urepo;

    /**
     * Spring Security calls this method during login.
     * Although the method name is loadUserByUsername(),
     * we are using EMAIL as the username.
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // Fetch user using email
        User user = urepo.findByEmail(email);

        // If user not found
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Return Spring Security UserDetails object
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())          // Email used as username
                .password(user.getPassword())           // Encrypted password
                .roles(user.getRole().getRname())       // ADMIN, CANDIDATE, RECRUITER
                .build();
    }
}