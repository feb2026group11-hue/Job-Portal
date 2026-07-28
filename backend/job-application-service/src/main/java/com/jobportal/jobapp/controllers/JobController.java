package com.jobportal.jobapp.controllers;

import com.jobportal.jobapp.dto.JobRequestDto;
import com.jobportal.jobapp.dto.JobResponseDto;
import com.jobportal.jobapp.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@Validated
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<JobResponseDto> createJob(@Valid @RequestBody JobRequestDto request) {
        return new ResponseEntity<>(jobService.createJob(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponseDto> updateJob(@PathVariable Integer id, @Valid @RequestBody JobRequestDto request) {
        return ResponseEntity.ok(jobService.updateJob(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable Integer id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @GetMapping("/employer/{empId}")
    public ResponseEntity<List<JobResponseDto>> getJobsByEmployer(@PathVariable Integer empId) {
        return ResponseEntity.ok(jobService.getJobsByEmployer(empId));
    }

    @GetMapping
    public ResponseEntity<List<JobResponseDto>> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status) {
        if (title == null && location == null && type == null && status == null) {
            return ResponseEntity.ok(jobService.getAllJobs());
        }
        return ResponseEntity.ok(jobService.searchJobs(title, location, type, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Integer id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }
}
