using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;
using JobPortal.JobApplications.Exceptions;

namespace JobPortal.JobApplications.Services;

public class JobService : IJobService
{
    private readonly IJobRepository _jobRepository;

    public JobService(IJobRepository jobRepository)
    {
        _jobRepository = jobRepository;
    }

    public async Task<JobResponseDto> CreateJobAsync(JobRequestDto request)
    {
        var job = new Job();
        MapDtoToEntity(request, job);
        job.PostedDate = DateTime.Now;
        if (string.IsNullOrEmpty(job.Status))
        {
            job.Status = "Open";
        }
        var saved = await _jobRepository.SaveAsync(job);
        return MapEntityToDto(saved);
    }

    public async Task<JobResponseDto> UpdateJobAsync(int jobId, JobRequestDto request)
    {
        var job = await _jobRepository.GetByIdAsync(jobId)
            ?? throw new NotFoundException($"Job not found with ID: {jobId}");

        MapDtoToEntity(request, job);
        var updated = await _jobRepository.SaveAsync(job);
        return MapEntityToDto(updated);
    }

    public async Task<JobResponseDto> GetJobByIdAsync(int jobId)
    {
        var job = await _jobRepository.GetByIdAsync(jobId)
            ?? throw new NotFoundException($"Job not found with ID: {jobId}");

        return MapEntityToDto(job);
    }

    public async Task<List<JobResponseDto>> GetAllJobsAsync()
    {
        var jobs = await _jobRepository.GetAllAsync();
        return jobs.Select(MapEntityToDto).ToList();
    }

    public async Task<List<JobResponseDto>> GetJobsByEmployerAsync(int empId)
    {
        var jobs = await _jobRepository.GetByEmpIdAsync(empId);
        return jobs.Select(MapEntityToDto).ToList();
    }

    public async Task<List<JobResponseDto>> SearchJobsAsync(string? title, string? location, string? type, string? status)
    {
        var jobs = await _jobRepository.SearchJobsAsync(title, location, type, status);
        return jobs.Select(MapEntityToDto).ToList();
    }

    public async Task DeleteJobAsync(int jobId)
    {
        if (!await _jobRepository.ExistsByIdAsync(jobId))
        {
            throw new NotFoundException($"Job not found with ID: {jobId}");
        }
        await _jobRepository.DeleteByIdAsync(jobId);
    }

    public async Task<JobResponseDto> UpdateJobStatusAsync(int jobId, string status)
    {
        var job = await _jobRepository.GetByIdAsync(jobId)
            ?? throw new NotFoundException($"Job not found with ID: {jobId}");

        job.Status = status;

        if ("Closed".Equals(status, StringComparison.OrdinalIgnoreCase))
        {
            job.ClosedDate = DateTime.Now;
        }
        else
        {
            job.ClosedDate = null;
        }

        var updated = await _jobRepository.SaveAsync(job);
        return MapEntityToDto(updated);
    }

    private static void MapDtoToEntity(JobRequestDto dto, Job entity)
    {
        entity.EmpId = dto.EmpId;
        entity.Title = dto.Title;
        entity.Description = dto.Description;
        entity.Role = dto.Role;
        entity.Experience = dto.Experience;
        entity.Salary = dto.Salary;
        entity.Location = dto.Location;
        entity.State = dto.State;
        entity.City = dto.City;
        entity.Type = dto.Type;
        if (dto.Status != null)
        {
            entity.Status = dto.Status;
        }
    }

    private static JobResponseDto MapEntityToDto(Job entity)
    {
        return new JobResponseDto
        {
            JobId = entity.JobId,
            EmpId = entity.EmpId,
            Title = entity.Title,
            Description = entity.Description,
            Role = entity.Role,
            Experience = entity.Experience,
            Salary = entity.Salary,
            Location = entity.Location,
            State = entity.State,
            City = entity.City,
            Type = entity.Type,
            PostedDate = entity.PostedDate,
            ClosedDate = entity.ClosedDate,
            Status = entity.Status
        };
    }
}
