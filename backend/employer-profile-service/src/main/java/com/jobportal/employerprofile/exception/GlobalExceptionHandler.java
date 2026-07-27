package com.jobportal.employerprofile.exception;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, Object>> handleResponseStatusException(ResponseStatusException exception) {
        return error(exception.getStatusCode().value(), exception.getReason());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> fields = new LinkedHashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> fields.put(error.getField(), error.getDefaultMessage()));
        Map<String, Object> response = body(HttpStatus.BAD_REQUEST.value(), "Validation failed");
        response.put("fields", fields);
        return ResponseEntity.badRequest().body(response);
    }

    private ResponseEntity<Map<String, Object>> error(int status, String message) {
        return ResponseEntity.status(status).body(body(status, message));
    }

    private Map<String, Object> body(int status, String message) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", status);
        response.put("error", HttpStatus.valueOf(status).getReasonPhrase());
        response.put("message", message);
        return response;
    }
}
