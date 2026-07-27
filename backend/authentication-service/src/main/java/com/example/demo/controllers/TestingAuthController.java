package com.example.demo.controllers;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestingAuthController {	
	@GetMapping("/user")	
	public String welcomeUser() {
		return "Welcome USER";
	}
	
	@GetMapping("/admin")	
	public String welcomeAdmin(Authentication authentication) {
		System.out.println("in admin");
		System.out.println(authentication.getAuthorities());
		return "Welcome ADMIN";
	}
	
	@GetMapping("/guest")	
	public String welcomeGuest() {
		return "Welcome GUEST";
	}
}
