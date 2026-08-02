package com.jobportal.gateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // Authentication Service (Security5)
                .route("auth-service", r -> r
                        .path("/api/auth", "/api/auth/**", "/api/users", "/api/users/**", "/user", "/user/**")
                        .uri("lb://SECURITY5"))
                // Candidate Profile Service (candidate-profile-service)
                .route("candidate-profile-service", r -> r
                        .path("/api/profile", "/api/profile/**", "/api/companies", "/api/companies/**", 
                              "/api/skills", "/api/skills/**", "/api/candidate-skills", "/api/candidate-skills/**", 
                              "/api/projects", "/api/projects/**", "/api/certificates", "/api/certificates/**", 
                              "/api/candidate/resume", "/api/candidate/resume/**", "/candidate-profile", 
                              "/candidate-profile/**", "/education", "/education/**", "/api/experiences", 
                              "/api/experiences/**")
                        .uri("lb://CANDIDATE-PROFILE-SERVICE"))
                // Employer Profile Service (employer-profile)
                .route("employer-profile-service", r -> r
                        .path("/api/employers", "/api/employers/**")
                        .uri("lb://EMPLOYER-PROFILE"))
                // Job Application Service (job-application-service)
                .route("job-application-service", r -> r
                        .path("/api/jobs", "/api/jobs/**", "/api/applications", "/api/applications/**", 
                              "/api/job-status", "/api/job-status/**", "/api/messages", "/api/messages/**",
                              "/api/states", "/api/states/**", "/api/cities", "/api/cities/**")
                        .uri("lb://JOB-APPLICATION-SERVICE"))
                .build();
    }
}
