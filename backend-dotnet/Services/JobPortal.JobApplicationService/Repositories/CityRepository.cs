using Microsoft.EntityFrameworkCore;
using JobPortal.JobApplications.Data;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Repositories;

public class CityRepository : ICityRepository
{
    private readonly JobApplicationDbContext _context;

    public CityRepository(JobApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<City> SaveAsync(City city)
    {
        if (city.Cid == 0)
        {
            await _context.Cities.AddAsync(city);
        }
        else
        {
            _context.Cities.Update(city);
        }
        await _context.SaveChangesAsync();
        return city;
    }

    public async Task<List<City>> GetAllAsync()
    {
        return await _context.Cities.ToListAsync();
    }

    public async Task<City?> GetByIdAsync(int id)
    {
        return await _context.Cities.FindAsync(id);
    }

    public async Task DeleteAsync(City city)
    {
        _context.Cities.Remove(city);
        await _context.SaveChangesAsync();
    }
}
