using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class StateRepository : IStateRepository
{
    private readonly JobApplicationDbContext _context;

    public StateRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<State> SaveAsync(State state)
    {
        if (state.Sid == 0)
        {
            await _context.States.AddAsync(state);
        }
        else
        {
            _context.States.Update(state);
        }
        await _context.SaveChangesAsync();
        return state;
    }

    public async Task<List<State>> GetAllAsync()
    {
        return await _context.States.ToListAsync();
    }

    public async Task<State?> GetByIdAsync(int id)
    {
        return await _context.States.FindAsync(id);
    }

    public async Task DeleteAsync(State state)
    {
        _context.States.Remove(state);
        await _context.SaveChangesAsync();
    }
}
