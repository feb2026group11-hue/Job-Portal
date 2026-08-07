using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface ICityRepository
{
    Task<City> SaveAsync(City city);
    Task<List<City>> GetAllAsync();
    Task<City?> GetByIdAsync(int id);
    Task DeleteAsync(City city);
}
