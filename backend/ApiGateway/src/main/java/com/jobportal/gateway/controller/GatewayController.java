package com.jobportal.gateway.controller;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
public class GatewayController {

    private final WebClient webClient;

    public GatewayController(WebClient.Builder builder) {
        // Build WebClient with custom buffer limits (e.g. 10MB)
        this.webClient = builder
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build();
    }

    @RequestMapping(value = {"/api/auth", "/api/auth/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyAuth(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8081");
    }

    @RequestMapping(value = {"/api/users", "/api/users/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyUsers(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8081");
    }

    @RequestMapping(value = {"/api/jobs", "/api/jobs/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyJobs(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8083");
    }

    @RequestMapping(value = {"/api/applications", "/api/applications/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyApplications(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8083");
    }

    @RequestMapping(value = {"/api/job-status", "/api/job-status/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyJobStatus(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8083");
    }

    @RequestMapping(value = {"/api/employers", "/api/employers/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyEmployers(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8085");
    }

    @RequestMapping(value = {"/api/profile", "/api/profile/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyProfile(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/companies", "/api/companies/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyCompanies(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/skills", "/api/skills/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxySkills(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/candidate-skills", "/api/candidate-skills/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyCandidateSkills(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/projects", "/api/projects/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyProjects(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/certificates", "/api/certificates/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyCertificates(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/candidate/resume", "/api/candidate/resume/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyResume(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/candidate-profile", "/candidate-profile/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyCandidateProfile(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/user", "/user/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyUserEndpoints(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8081");
    }

    @RequestMapping(value = {"/education", "/education/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyEducation(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/experiences", "/api/experiences/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyExperiences(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8082");
    }

    @RequestMapping(value = {"/api/messages", "/api/messages/**"}, method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH})
    public Mono<ResponseEntity<byte[]>> proxyMessages(ServerHttpRequest request, @RequestBody(required = false) byte[] body) {
        return forward(request, body, "http://localhost:8083");
    }


    private Mono<ResponseEntity<byte[]>> forward(ServerHttpRequest request, byte[] body, String targetBaseUrl) {
        String path = request.getPath().value();
        String query = request.getURI().getRawQuery();
        String targetUrl = targetBaseUrl + path + (query != null ? "?" + query : "");

        HttpMethod method = request.getMethod();

        WebClient.RequestBodySpec requestSpec = webClient.method(method)
                .uri(targetUrl)
                .headers(headers -> {
                    // Forward all headers except host and connection
                    request.getHeaders().forEach((key, values) -> {
                        if (!key.equalsIgnoreCase("host") && !key.equalsIgnoreCase("connection")) {
                            headers.addAll(key, values);
                        }
                    });
                });

        if (body != null && body.length > 0) {
            requestSpec.bodyValue(body);
        }

        return requestSpec.exchangeToMono(clientResponse -> 
            clientResponse.toEntity(byte[].class)
        );
    }
}
