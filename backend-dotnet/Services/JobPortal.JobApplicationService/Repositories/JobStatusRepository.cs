using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class JobStatusRepository : IJobStatusRepository
{
    private readonly JobApplicationDbContext _context;

    public JobStatusRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<JobStatus?> GetByIdAsync(int jsid)
    {
        return await _context.JobStatuses.FindAsync(jsid);
    }

    public async Task<JobStatus> SaveAsync(JobStatus jobStatus)
    {
        var existing = await _context.JobStatuses.FindAsync(jobStatus.Jsid);
        if (existing == null)
        {
            await _context.JobStatuses.AddAsync(jobStatus);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(jobStatus);
        }
        await _context.SaveChangesAsync();
        return jobStatus;
    }
}
