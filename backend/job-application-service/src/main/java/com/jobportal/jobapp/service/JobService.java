package com.jobportal.jobapp.service;

import com.jobportal.jobapp.dto.JobRequestDto;
import com.jobportal.jobapp.dto.JobResponseDto;

import java.util.List;

public interface JobService {

    JobResponseDto createJob(JobRequestDto request);

    JobResponseDto updateJob(Integer jobId, JobRequestDto request);

    JobResponseDto getJobById(Integer jobId);

    List<JobResponseDto> getAllJobs();

    List<JobResponseDto> getJobsByEmployer(Integer empId);

    List<JobResponseDto> searchJobs(String title, String location, String type, String status);

    void deleteJob(Integer jobId);

    JobResponseDto updateJobStatus(Integer jobId, String status);
}
