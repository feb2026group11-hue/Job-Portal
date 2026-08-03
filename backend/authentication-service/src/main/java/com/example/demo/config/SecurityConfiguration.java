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
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                // Configure API authorization
                                .authorizeHttpRequests(auth -> {

                                        // Allow OPTIONS preflight requests for CORS
                                        auth.requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll();

                                        // Public APIs
                                        auth.requestMatchers(
                                                        "/user/register",
                                                        "/user/login",
                                                        "/user/send-otp",
                                                        "/user/verify-otp",
                                                        "/guest").permitAll();

                                        // Candidate APIs
                                        auth.requestMatchers("/candidate/**")
                                                        .hasRole("CANDIDATE");

                                        // Recruiter APIs
                                        auth.requestMatchers("/employers/**")
                                                        .hasRole("EMPLOYER");

                                        // Admin APIs
                                        auth.requestMatchers("/admin/**")
                                                        .hasRole("ADMIN");

                                        // All remaining APIs require authentication
                                        auth.anyRequest().authenticated();
                                })

                                // Execute JWT Filter before UsernamePasswordAuthenticationFilter
                                .addFilterBefore(jwtAuthenticationFilter(),
                                                UsernamePasswordAuthenticationFilter.class)

                                // Disable Basic Authentication for REST APIs using JWT
                                .httpBasic(h -> h.disable())
                                .cors(Customizer.withDefaults());

                return http.build();
        }

        @Bean
        public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
                org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
                configuration.setAllowedOriginPatterns(java.util.List.of("*"));
                configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
                configuration.setAllowedHeaders(java.util.List.of("*"));
                configuration.setAllowCredentials(true);
                org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", configuration);
                return source;
        }


        // Authentication Manager Bean
        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration configuration) throws Exception {

                return configuration.getAuthenticationManager();
        }
}
