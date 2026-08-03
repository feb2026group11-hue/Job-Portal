package com.jobportal.jobapp.controllers;

import com.jobportal.jobapp.dto.ApplicationRequestDto;
import com.jobportal.jobapp.dto.ApplicationResponseDto;
import com.jobportal.jobapp.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@Validated
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponseDto> applyToJob(@Valid @RequestBody ApplicationRequestDto request) {
        return new ResponseEntity<>(jobApplicationService.applyToJob(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponseDto> getApplicationById(@PathVariable Integer id) {
        return ResponseEntity.ok(jobApplicationService.getApplicationById(id));
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicationsByCandidate(@PathVariable Integer candidateId) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByCandidate(candidateId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponseDto>> getApplicationsByJob(@PathVariable Integer jobId) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByJob(jobId));
    }

    @PutMapping("/{id}/status/{statusId}")
    public ResponseEntity<ApplicationResponseDto> updateApplicationStatus(
            @PathVariable Integer id,
            @PathVariable Integer statusId) {
        return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(id, statusId));
    }
}
