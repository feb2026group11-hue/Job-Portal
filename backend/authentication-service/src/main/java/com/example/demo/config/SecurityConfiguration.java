package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    // Register JWT Filter as a Spring Bean
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    // Password Encoder used while registering and logging in users
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Main Spring Security Configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF because we are using JWT
            .csrf(csrf -> csrf.disable())

            // No session will be created (Stateless Authentication)
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // Configure API authorization
            .authorizeHttpRequests(auth -> {

                // Public APIs
                auth.requestMatchers(
                        "/user/register",
                        "/user/login",
                        "/guest"
                ).permitAll();

                // Candidate APIs
                auth.requestMatchers("/candidate/**")
                        .hasRole("CANDIDATE");

                // Recruiter APIs
                auth.requestMatchers("/recruiter/**")
                        .hasRole("RECRUITER");

                // Admin APIs
                auth.requestMatchers("/admin/**")
                        .hasRole("ADMIN");

                // All remaining APIs require authentication
                auth.anyRequest().authenticated();
            })

            // Execute JWT Filter before UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthenticationFilter(),
                    UsernamePasswordAuthenticationFilter.class)

            // Optional Basic Authentication (can be removed if only JWT is used)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // Authentication Manager Bean
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }
}