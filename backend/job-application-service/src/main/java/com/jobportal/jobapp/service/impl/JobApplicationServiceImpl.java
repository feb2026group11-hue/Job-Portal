package com.jobportal.jobapp.service.impl;

import com.jobportal.jobapp.dto.ApplicationRequestDto;
import com.jobportal.jobapp.dto.ApplicationResponseDto;
import com.jobportal.jobapp.entities.JobApplication;
import com.jobportal.jobapp.entities.JobStatus;
import com.jobportal.jobapp.repository.JobApplicationRepository;
import com.jobportal.jobapp.repository.JobRepository;
import com.jobportal.jobapp.repository.JobStatusRepository;
import com.jobportal.jobapp.service.JobApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobRepository jobRepository;
    private final JobStatusRepository jobStatusRepository;

    public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository,
                                     JobRepository jobRepository,
                                     JobStatusRepository jobStatusRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobRepository = jobRepository;
        this.jobStatusRepository = jobStatusRepository;
    }

    @Override
    public ApplicationResponseDto applyToJob(ApplicationRequestDto request) {
        // Verify job exists
        if (!jobRepository.existsById(request.getJobId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found with ID: " + request.getJobId());
        }

        // Prevent duplicate applications
        if (jobApplicationRepository.existsByJobIdAndCandidateId(request.getJobId(), request.getCandidateId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Candidate has already applied to this job");
        }

        // Fetch or create default "Applied" status (ID = 1)
        JobStatus status = jobStatusRepository.findById(1)
                .orElseGet(() -> jobStatusRepository.save(new JobStatus(1, "Applied")));

        JobApplication application = new JobApplication();
        application.setJobId(request.getJobId());
        application.setCandidateId(request.getCandidateId());
        application.setResumeId(request.getResumeId());
        application.setApplicationDate(LocalDateTime.now());
        application.setStatus(status);

        JobApplication saved = jobApplicationRepository.save(application);
        return mapEntityToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponseDto getApplicationById(Integer applicationId) {
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found with ID: " + applicationId));
        return mapEntityToDto(app);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDto> getApplicationsByCandidate(Integer candidateId) {
        return jobApplicationRepository.findByCandidateId(candidateId).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApplicationResponseDto> getApplicationsByJob(Integer jobId) {
        return jobApplicationRepository.findByJobId(jobId).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ApplicationResponseDto updateApplicationStatus(Integer applicationId, Integer statusId) {
        JobApplication app = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found with ID: " + applicationId));

        // Get or create job status fallback mapping
        JobStatus status = jobStatusRepository.findById(statusId)
                .orElseGet(() -> {
                    String statusName = switch (statusId) {
                        case 1 -> "Applied";
                        case 2 -> "Under Review";
                        case 3 -> "Shortlisted";
                        case 4 -> "Interview Scheduled";
                        case 5 -> "Selected";
                        case 6 -> "Rejected";
                        default -> "Pending Review";
                    };
                    return jobStatusRepository.save(new JobStatus(statusId, statusName));
                });

        app.setStatus(status);
        JobApplication updated = jobApplicationRepository.save(app);
        return mapEntityToDto(updated);
    }

    private ApplicationResponseDto mapEntityToDto(JobApplication entity) {
        ApplicationResponseDto dto = new ApplicationResponseDto();
        dto.setApplicationId(entity.getApplicationId());
        dto.setJobId(entity.getJobId());
        dto.setCandidateId(entity.getCandidateId());
        dto.setResumeId(entity.getResumeId());
        dto.setApplicationDate(entity.getApplicationDate());
        if (entity.getStatus() != null) {
            dto.setStatusId(entity.getStatus().getJsid());
            dto.setStatusName(entity.getStatus().getStatus());
        }
        return dto;
    }
}
