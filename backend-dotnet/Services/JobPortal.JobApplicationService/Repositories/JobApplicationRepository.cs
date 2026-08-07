using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class JobApplicationRepository : IJobApplicationRepository
{
    private readonly JobApplicationDbContext _context;

    public JobApplicationRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobApplication> SaveAsync(JobApplication application)
    {
        if (application.ApplicationId == 0)
        {
            await _context.JobApplications.AddAsync(application);
        }
        else
        {
            _context.JobApplications.Update(application);
        }
        await _context.SaveChangesAsync();
        return application;
    }

    public async Task<JobApplication?> GetByIdAsync(int applicationId)
    {
        return await _context.JobApplications
            .Include(a => a.Status)
            .FirstOrDefaultAsync(a => a.ApplicationId == applicationId);
    }

    public async Task<List<JobApplication>> GetByCandidateIdAsync(int candidateId)
    {
        return await _context.JobApplications
            .Include(a => a.Status)
            .Where(a => a.CandidateId == candidateId)
            .ToListAsync();
    }

    public async Task<List<JobApplication>> GetByJobIdAsync(int jobId)
    {
        return await _context.JobApplications
            .Include(a => a.Status)
            .Where(a => a.JobId == jobId)
            .ToListAsync();
    }

    public async Task<bool> ExistsByJobIdAndCandidateIdAsync(int jobId, int candidateId)
    {
        return await _context.JobApplications
            .AnyAsync(a => a.JobId == jobId && a.CandidateId == candidateId);
    }
}
