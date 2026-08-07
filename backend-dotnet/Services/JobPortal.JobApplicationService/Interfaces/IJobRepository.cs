using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface IJobRepository
{
    Task<Job> SaveAsync(Job job);
    Task<Job?> GetByIdAsync(int jobId);
    Task<List<Job>> GetAllAsync();
    Task<List<Job>> GetByEmpIdAsync(int empId);
    Task<List<Job>> SearchJobsAsync(string? title, string? location, string? type, string? status);
    Task<bool> ExistsByIdAsync(int jobId);
    Task DeleteByIdAsync(int jobId);
}
