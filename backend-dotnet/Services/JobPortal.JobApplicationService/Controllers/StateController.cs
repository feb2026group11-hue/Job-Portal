using Microsoft.AspNetCore.Mvc;
using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Controllers;

[ApiController]
[Route("api/states")]
public class StateController : ControllerBase
{
    private readonly IStateService _stateService;

    public StateController(IStateService stateService)
    {
        _stateService = stateService;
    }

    [HttpPost]
    public async Task<ActionResult<StateDto>> SaveState([FromBody] StateDto stateDto)
    {
        var response = await _stateService.SaveStateAsync(stateDto);
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<List<StateDto>>> GetAllStates()
    {
        var response = await _stateService.GetAllStatesAsync();
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<StateDto>> GetStateById([FromRoute] int id)
    {
        var response = await _stateService.GetStateByIdAsync(id);
        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<StateDto>> UpdateState([FromRoute] int id, [FromBody] StateDto stateDto)
    {
        var response = await _stateService.UpdateStateAsync(id, stateDto);
        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<string>> DeleteState([FromRoute] int id)
    {
        var response = await _stateService.DeleteStateAsync(id);
        return Ok(response);
    }
}
