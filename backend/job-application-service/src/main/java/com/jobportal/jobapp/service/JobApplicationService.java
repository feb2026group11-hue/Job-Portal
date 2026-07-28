package com.jobportal.jobapp.service;

import com.jobportal.jobapp.dto.ApplicationRequestDto;
import com.jobportal.jobapp.dto.ApplicationResponseDto;

import java.util.List;

public interface JobApplicationService {

    ApplicationResponseDto applyToJob(ApplicationRequestDto request);

    ApplicationResponseDto getApplicationById(Integer applicationId);

    List<ApplicationResponseDto> getApplicationsByCandidate(Integer candidateId);

    List<ApplicationResponseDto> getApplicationsByJob(Integer jobId);

    ApplicationResponseDto updateApplicationStatus(Integer applicationId, Integer statusId);
}
