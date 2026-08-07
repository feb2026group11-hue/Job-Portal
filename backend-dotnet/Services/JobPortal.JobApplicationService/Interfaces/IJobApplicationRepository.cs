using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface IJobApplicationRepository
{
    Task<JobApplication> SaveAsync(JobApplication application);
    Task<JobApplication?> GetByIdAsync(int applicationId);
    Task<List<JobApplication>> GetByCandidateIdAsync(int candidateId);
    Task<List<JobApplication>> GetByJobIdAsync(int jobId);
    Task<bool> ExistsByJobIdAndCandidateIdAsync(int jobId, int candidateId);
}
