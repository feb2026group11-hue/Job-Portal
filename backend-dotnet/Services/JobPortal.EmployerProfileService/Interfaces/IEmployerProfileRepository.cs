using JobPortal.EmployerProfiles.Models;

namespace JobPortal.EmployerProfiles.Interfaces;

public interface IEmployerProfileRepository
{
    Task<EmployerProfile?> GetByIdAsync(int id);
    Task<EmployerProfile?> GetByUserIdAsync(int userId);
    Task<List<EmployerProfile>> GetAllAsync();
    Task<bool> ExistsByUserIdAsync(int userId);
    Task<bool> ExistsByRegistrationIdAsync(string registrationId);
    Task<EmployerProfile> SaveAsync(EmployerProfile profile);
    Task DeleteAsync(EmployerProfile profile);
}
