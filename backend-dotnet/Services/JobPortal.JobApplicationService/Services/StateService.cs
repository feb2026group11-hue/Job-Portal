using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Exceptions;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Services;

public class StateService : IStateService
{
    private readonly IStateRepository _stateRepository;

    public StateService(IStateRepository stateRepository)
    {
        _stateRepository = stateRepository;
    }

    public async Task<StateDto> SaveStateAsync(StateDto stateDto)
    {
        var state = new State
        {
            Sname = stateDto.Sname
        };

        var saved = await _stateRepository.SaveAsync(state);
        return new StateDto(saved.Sid, saved.Sname);
    }

    public async Task<List<StateDto>> GetAllStatesAsync()
    {
        var states = await _stateRepository.GetAllAsync();
        return states.Select(s => new StateDto(s.Sid, s.Sname)).ToList();
    }

    public async Task<StateDto> GetStateByIdAsync(int id)
    {
        var state = await _stateRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("State Not Found");

        return new StateDto(state.Sid, state.Sname);
    }

    public async Task<StateDto> UpdateStateAsync(int id, StateDto stateDto)
    {
        var state = await _stateRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("State Not Found");

        state.Sname = stateDto.Sname;
        var updated = await _stateRepository.SaveAsync(state);
        return new StateDto(updated.Sid, updated.Sname);
    }

    public async Task<string> DeleteStateAsync(int id)
    {
        var state = await _stateRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("State Not Found");

        await _stateRepository.DeleteAsync(state);
        return "State Deleted Successfully";
    }
}
