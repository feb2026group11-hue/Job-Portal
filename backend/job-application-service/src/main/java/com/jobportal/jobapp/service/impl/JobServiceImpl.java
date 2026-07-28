package com.jobportal.jobapp.service.impl;

import com.jobportal.jobapp.dto.JobRequestDto;
import com.jobportal.jobapp.dto.JobResponseDto;
import com.jobportal.jobapp.entities.Job;
import com.jobportal.jobapp.repository.JobRepository;
import com.jobportal.jobapp.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public JobResponseDto createJob(JobRequestDto request) {
        Job job = new Job();
        mapDtoToEntity(request, job);
        job.setPostedDate(LocalDateTime.now());
        if (job.getStatus() == null) {
            job.setStatus("Open");
        }
        Job saved = jobRepository.save(job);
        return mapEntityToDto(saved);
    }

    @Override
    public JobResponseDto updateJob(Integer jobId, JobRequestDto request) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found with ID: " + jobId));
        mapDtoToEntity(request, job);
        Job updated = jobRepository.save(job);
        return mapEntityToDto(updated);
    }

    @Override
    @Transactional(readOnly = true)
    public JobResponseDto getJobById(Integer jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found with ID: " + jobId));
        return mapEntityToDto(job);
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> getJobsByEmployer(Integer empId) {
        return jobRepository.findByEmpId(empId).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<JobResponseDto> searchJobs(String title, String location, String type, String status) {
        return jobRepository.searchJobs(title, location, type, status).stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteJob(Integer jobId) {
        if (!jobRepository.existsById(jobId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job not found with ID: " + jobId);
        }
        jobRepository.deleteById(jobId);
    }

    private void mapDtoToEntity(JobRequestDto dto, Job entity) {
        entity.setEmpId(dto.getEmpId());
        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setRole(dto.getRole());
        entity.setExperience(dto.getExperience());
        entity.setSalary(dto.getSalary());
        entity.setLocation(dto.getLocation());
        entity.setState(dto.getState());
        entity.setCity(dto.getCity());
        entity.setType(dto.getType());
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
    }

    private JobResponseDto mapEntityToDto(Job entity) {
        JobResponseDto dto = new JobResponseDto();
        dto.setJobId(entity.getJobId());
        dto.setEmpId(entity.getEmpId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setRole(entity.getRole());
        dto.setExperience(entity.getExperience());
        dto.setSalary(entity.getSalary());
        dto.setLocation(entity.getLocation());
        dto.setState(entity.getState());
        dto.setCity(entity.getCity());
        dto.setType(entity.getType());
        dto.setPostedDate(entity.getPostedDate());
        dto.setClosedDate(entity.getClosedDate());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
