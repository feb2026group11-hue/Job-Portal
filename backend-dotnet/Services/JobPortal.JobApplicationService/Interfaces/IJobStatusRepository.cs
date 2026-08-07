using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface IJobStatusRepository
{
    Task<JobStatus?> GetByIdAsync(int jsid);
    Task<JobStatus> SaveAsync(JobStatus jobStatus);
}
