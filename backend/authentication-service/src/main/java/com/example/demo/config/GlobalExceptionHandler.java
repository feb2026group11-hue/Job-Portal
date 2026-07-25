/*package com.example.demo.config;

import java.nio.file.AccessDeniedException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentials(BadCredentialsException e){
		return ResponseEntity.status(401)
				.body(Map.of("message","Invalid username/password"));
	}
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> handleAuthozizationError(AccessDeniedException e){
		return ResponseEntity.status(403)
				.body(Map.of("message","Authorization failed"));
	}

}*/
