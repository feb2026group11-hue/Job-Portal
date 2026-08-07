using JobPortal.JobApplications.DTOs;

namespace JobPortal.JobApplications.Interfaces;

public interface IJobApplicationService
{
    Task<ApplicationResponseDto> ApplyToJobAsync(ApplicationRequestDto request);
    Task<ApplicationResponseDto> GetApplicationByIdAsync(int applicationId);
    Task<List<ApplicationResponseDto>> GetApplicationsByCandidateAsync(int candidateId);
    Task<List<ApplicationResponseDto>> GetApplicationsByJobAsync(int jobId);
    Task<ApplicationResponseDto> UpdateApplicationStatusAsync(int applicationId, int statusId);
}
