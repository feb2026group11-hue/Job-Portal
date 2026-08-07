using Microsoft.EntityFrameworkCore;
using JobPortal.EmployerProfiles.Data;
using JobPortal.EmployerProfiles.Interfaces;
using JobPortal.EmployerProfiles.Models;

namespace JobPortal.EmployerProfiles.Repositories;

public class EmployerProfileRepository : IEmployerProfileRepository
{
    private readonly EmployerProfileDbContext _context;

    public EmployerProfileRepository(EmployerProfileDbContext context)
    {
        _context = context;
    }

    public async Task<EmployerProfile?> GetByIdAsync(int id)
    {
        return await _context.EmployerProfiles.FindAsync(id);
    }

    public async Task<EmployerProfile?> GetByUserIdAsync(int userId)
    {
        return await _context.EmployerProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
    }

    public async Task<List<EmployerProfile>> GetAllAsync()
    {
        return await _context.EmployerProfiles.ToListAsync();
    }

    public async Task<bool> ExistsByUserIdAsync(int userId)
    {
        return await _context.EmployerProfiles.AnyAsync(p => p.UserId == userId);
    }

    public async Task<bool> ExistsByRegistrationIdAsync(string registrationId)
    {
        return await _context.EmployerProfiles.AnyAsync(p => p.RegistrationId == registrationId);
    }

    public async Task<EmployerProfile> SaveAsync(EmployerProfile profile)
    {
        if (profile.EmployerId == 0)
        {
            _context.EmployerProfiles.Add(profile);
        }
        else
        {
            _context.Entry(profile).State = EntityState.Modified;
        }
        await _context.SaveChangesAsync();
        return profile;
    }

    public async Task DeleteAsync(EmployerProfile profile)
    {
        _context.EmployerProfiles.Remove(profile);
        await _context.SaveChangesAsync();
    }
}
