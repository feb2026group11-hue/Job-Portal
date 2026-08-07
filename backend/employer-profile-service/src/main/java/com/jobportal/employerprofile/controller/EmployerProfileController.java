package com.jobportal.employerprofile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.employerprofile.dto.EmployerProfileRequestDto;
import com.jobportal.employerprofile.dto.EmployerProfileResponseDto;
import com.jobportal.employerprofile.service.EmployerProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employers")
public class EmployerProfileController {

    private final EmployerProfileService employerProfileService;

    public EmployerProfileController(EmployerProfileService employerProfileService) {
        this.employerProfileService = employerProfileService;
    }

    @PostMapping
    public ResponseEntity<EmployerProfileResponseDto> createProfile(
            @Valid @RequestBody EmployerProfileRequestDto request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(employerProfileService.createProfile(request));
    }

    @GetMapping
    public ResponseEntity<java.util.List<EmployerProfileResponseDto>> getAllProfiles() {
        return ResponseEntity.ok(employerProfileService.getAllProfiles());
    }

    @GetMapping("/{employerId}")
    public EmployerProfileResponseDto getProfile(@PathVariable Integer employerId) {
        return employerProfileService.getById(employerId);
    }

    @GetMapping("/user/{userId}")
    public EmployerProfileResponseDto getProfileByUser(@PathVariable Integer userId) {
        return employerProfileService.getByUserId(userId);
    }

    @PutMapping("/{employerId}")
    public EmployerProfileResponseDto updateProfile(@PathVariable Integer employerId,
            @Valid @RequestBody EmployerProfileRequestDto request) {
        return employerProfileService.updateProfile(employerId, request);
    }

    @DeleteMapping("/{employerId}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Integer employerId) {
        employerProfileService.deleteProfile(employerId);
        return ResponseEntity.noContent().build();
    }
}
