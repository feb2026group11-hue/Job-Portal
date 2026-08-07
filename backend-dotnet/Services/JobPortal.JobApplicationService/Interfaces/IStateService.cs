using JobPortal.JobApplications.DTOs;

namespace JobPortal.JobApplications.Interfaces;

public interface IStateService
{
    Task<StateDto> SaveStateAsync(StateDto stateDto);
    Task<List<StateDto>> GetAllStatesAsync();
    Task<StateDto> GetStateByIdAsync(int id);
    Task<StateDto> UpdateStateAsync(int id, StateDto stateDto);
    Task<string> DeleteStateAsync(int id);
}
