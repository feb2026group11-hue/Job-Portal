package com.jobportal.gateway.filter;

import com.jobportal.gateway.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class JwtAuthenticationFilter implements GlobalFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();
        HttpMethod method = request.getMethod();

        // 1. Bypass all OPTIONS requests (preflight)
        if (HttpMethod.OPTIONS.equals(method)) {
            return chain.filter(exchange);
        }

        // 2. Bypass public URLs
        if (isPublicUrl(path, method)) {
            return chain.filter(exchange);
        }

        // 3. Read Authorization Header
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        // 4. Validate JWT
        if (!jwtService.isTokenValid(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // 5. Extract Claims
        String username = jwtService.extractUsername(token);
        String role = jwtService.extractRole(token);
        System.out.println("User : " + username);
        System.out.println("Role : " + role);

        // 6. Coarse Authorization
        if (path.startsWith("/admin")) {
            if (!role.equalsIgnoreCase("ADMIN")) {
                exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                return exchange.getResponse().setComplete();
            }
        }
        if (path.startsWith("/employers") || path.startsWith("/api/employers")) {
            // Bypass GET /api/employers (which is public and checked in isPublicUrl)
            // But verify write operations (POST, PUT, DELETE) require EMPLOYER or ADMIN role
            if (!HttpMethod.GET.equals(method)) {
                if (!role.equalsIgnoreCase("EMPLOYER") && !role.equalsIgnoreCase("ADMIN")) {
                    exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                    return exchange.getResponse().setComplete();
                }
            }
        }

        // 7. Forward request
        return chain.filter(exchange);
    }

    private boolean isPublicUrl(String path, HttpMethod method) {
        // Auth service login and registration endpoints
        if (path.equals("/user/login") || path.equals("/user/register") ||
            path.equals("/api/auth/login") || path.equals("/api/auth/register")) {
            return true;
        }

        if (path.equals("/guest") || path.equals("/api/candidate/resume/parse-ai")) {
            return true;
        }

        // Public GET requests for jobs/employers/companies/states/cities/resumes
        if (HttpMethod.GET.equals(method)) {
            if (path.startsWith("/api/jobs") || path.startsWith("/api/employers") || path.startsWith("/api/companies") ||
                path.startsWith("/api/states") || path.startsWith("/api/cities") ||
                path.startsWith("/api/candidate/resume/download") || path.startsWith("/api/candidate/resume/view")) {
                return true;
            }
        }

        // Eureka discovery server console and static assets
        if (path.startsWith("/eureka") || path.equals("/") || path.equals("/index.html") || 
            path.endsWith(".css") || path.endsWith(".js") || path.endsWith(".png") || path.endsWith(".ico")) {
            return true;
        }

        return false;
    }
}
