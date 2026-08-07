using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class JobRepository : IJobRepository
{
    private readonly JobApplicationDbContext _context;

    public JobRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Job> SaveAsync(Job job)
    {
        if (job.JobId == 0)
        {
            await _context.Jobs.AddAsync(job);
        }
        else
        {
            _context.Jobs.Update(job);
        }
        await _context.SaveChangesAsync();
        return job;
    }

    public async Task<Job?> GetByIdAsync(int jobId)
    {
        return await _context.Jobs.FindAsync(jobId);
    }

    public async Task<List<Job>> GetAllAsync()
    {
        return await _context.Jobs.ToListAsync();
    }

    public async Task<List<Job>> GetByEmpIdAsync(int empId)
    {
        return await _context.Jobs.Where(j => j.EmpId == empId).ToListAsync();
    }

    public async Task<List<Job>> SearchJobsAsync(string? title, string? location, string? type, string? status)
    {
        var query = _context.Jobs.AsQueryable();

        if (!string.IsNullOrWhiteSpace(title))
        {
            query = query.Where(j => j.Title.ToLower().Contains(title.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(location))
        {
            query = query.Where(j => j.Location.ToLower().Contains(location.ToLower()));
        }

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(j => j.Type == type);
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(j => j.Status == status);
        }

        return await query.ToListAsync();
    }

    public async Task<bool> ExistsByIdAsync(int jobId)
    {
        return await _context.Jobs.AnyAsync(j => j.JobId == jobId);
    }

    public async Task DeleteByIdAsync(int jobId)
    {
        var job = await _context.Jobs.FindAsync(jobId);
        if (job != null)
        {
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
        }
    }
}
