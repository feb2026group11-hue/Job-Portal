using JobPortal.JobApplications.DTOs;

namespace JobPortal.JobApplications.Interfaces;

public interface IJobService
{
    Task<JobResponseDto> CreateJobAsync(JobRequestDto request);
    Task<JobResponseDto> UpdateJobAsync(int jobId, JobRequestDto request);
    Task<JobResponseDto> GetJobByIdAsync(int jobId);
    Task<List<JobResponseDto>> GetAllJobsAsync();
    Task<List<JobResponseDto>> GetJobsByEmployerAsync(int empId);
    Task<List<JobResponseDto>> SearchJobsAsync(string? title, string? location, string? type, string? status);
    Task DeleteJobAsync(int jobId);
    Task<JobResponseDto> UpdateJobStatusAsync(int jobId, string status);
}
