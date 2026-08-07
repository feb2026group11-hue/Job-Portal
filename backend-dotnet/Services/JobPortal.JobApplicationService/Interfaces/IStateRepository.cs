using JobPortal.JobApplications.Entities;

namespace JobPortal.JobApplications.Interfaces;

public interface IStateRepository
{
    Task<State> SaveAsync(State state);
    Task<List<State>> GetAllAsync();
    Task<State?> GetByIdAsync(int id);
    Task DeleteAsync(State state);
}
