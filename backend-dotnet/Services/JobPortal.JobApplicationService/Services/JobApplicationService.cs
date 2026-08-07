using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Exceptions;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly IJobApplicationRepository _jobApplicationRepository;
    private readonly IJobRepository _jobRepository;
    private readonly IJobStatusRepository _jobStatusRepository;

    public JobApplicationService(
        IJobApplicationRepository jobApplicationRepository,
        IJobRepository jobRepository,
        IJobStatusRepository jobStatusRepository)
    {
        _jobApplicationRepository = jobApplicationRepository;
        _jobRepository = jobRepository;
        _jobStatusRepository = jobStatusRepository;
    }

    public async Task<ApplicationResponseDto> ApplyToJobAsync(ApplicationRequestDto request)
    {
        if (!request.JobId.HasValue || !await _jobRepository.ExistsByIdAsync(request.JobId.Value))
        {
            throw new NotFoundException($"Job not found with ID: {request.JobId}");
        }

        if (request.CandidateId.HasValue &&
            await _jobApplicationRepository.ExistsByJobIdAndCandidateIdAsync(request.JobId.Value, request.CandidateId.Value))
        {
            throw new BadRequestException("Candidate has already applied to this job");
        }

        var status = await _jobStatusRepository.GetByIdAsync(1);
        if (status == null)
        {
            status = await _jobStatusRepository.SaveAsync(new JobStatus(1, "Applied"));
        }

        var application = new JobApplication
        {
            JobId = request.JobId,
            CandidateId = request.CandidateId,
            ResumeId = request.ResumeId,
            ApplicationDate = DateTime.Now,
            Status = status
        };

        var saved = await _jobApplicationRepository.SaveAsync(application);
        return MapEntityToDto(saved);
    }

    public async Task<ApplicationResponseDto> GetApplicationByIdAsync(int applicationId)
    {
        var app = await _jobApplicationRepository.GetByIdAsync(applicationId)
            ?? throw new NotFoundException($"Application not found with ID: {applicationId}");

        return MapEntityToDto(app);
    }

    public async Task<List<ApplicationResponseDto>> GetApplicationsByCandidateAsync(int candidateId)
    {
        var apps = await _jobApplicationRepository.GetByCandidateIdAsync(candidateId);
        return apps.Select(MapEntityToDto).ToList();
    }

    public async Task<List<ApplicationResponseDto>> GetApplicationsByJobAsync(int jobId)
    {
        var apps = await _jobApplicationRepository.GetByJobIdAsync(jobId);
        return apps.Select(MapEntityToDto).ToList();
    }

    public async Task<ApplicationResponseDto> UpdateApplicationStatusAsync(int applicationId, int statusId)
    {
        var app = await _jobApplicationRepository.GetByIdAsync(applicationId)
            ?? throw new NotFoundException($"Application not found with ID: {applicationId}");

        var status = await _jobStatusRepository.GetByIdAsync(statusId);
        if (status == null)
        {
            string statusName = statusId switch
            {
                1 => "Applied",
                2 => "Under Review",
                3 => "Shortlisted",
                4 => "Interview Scheduled",
                5 => "Selected",
                6 => "Rejected",
                _ => "Pending Review"
            };
            status = await _jobStatusRepository.SaveAsync(new JobStatus(statusId, statusName));
        }

        app.Status = status;
        app.StatusId = status.Jsid;
        var updated = await _jobApplicationRepository.SaveAsync(app);
        return MapEntityToDto(updated);
    }

    private static ApplicationResponseDto MapEntityToDto(JobApplication entity)
    {
        return new ApplicationResponseDto
        {
            ApplicationId = entity.ApplicationId,
            JobId = entity.JobId,
            CandidateId = entity.CandidateId,
            ResumeId = entity.ResumeId,
            ApplicationDate = entity.ApplicationDate,
            StatusId = entity.Status?.Jsid ?? entity.StatusId,
            StatusName = entity.Status?.Status
        };
    }
}
