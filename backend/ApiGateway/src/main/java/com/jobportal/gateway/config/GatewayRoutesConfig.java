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
                        .path("/api/auth/**", "/api/users/**", "/user/**")
                        .uri("lb://SECURITY5"))
                // Candidate Profile Service (candidate-profile-service)
                .route("candidate-profile-service", r -> r
                        .path("/api/profile/**", "/api/companies/**", "/api/skills/**", 
                              "/api/candidate-skills/**", "/api/projects/**", "/api/certificates/**", 
                              "/api/candidate/resume/**", "/candidate-profile/**", "/education/**", 
                              "/api/experiences/**")
                        .uri("lb://CANDIDATE-PROFILE-SERVICE"))
                // Employer Profile Service (employer-profile)
                .route("employer-profile-service", r -> r
                        .path("/api/employers/**")
                        .uri("lb://EMPLOYER-PROFILE"))
                // Job Application Service (job-application-service)
                .route("job-application-service", r -> r
                        .path("/api/jobs/**", "/api/applications/**", "/api/job-status/**", "/api/messages/**",
                              "/api/states/**", "/api/cities/**")
                        .uri("lb://JOB-APPLICATION-SERVICE"))
                .build();
    }
}
