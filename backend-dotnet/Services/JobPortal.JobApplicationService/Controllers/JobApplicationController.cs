using Microsoft.AspNetCore.Mvc;
using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Controllers;

[ApiController]
[Route("api/applications")]
public class JobApplicationController : ControllerBase
{
    private readonly IJobApplicationService _jobApplicationService;

    public JobApplicationController(IJobApplicationService jobApplicationService)
    {
        _jobApplicationService = jobApplicationService;
    }

    [HttpPost]
    public async Task<IActionResult> ApplyToJob([FromBody] ApplicationRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _jobApplicationService.ApplyToJobAsync(request);
        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApplicationResponseDto>> GetApplicationById([FromRoute] int id)
    {
        var response = await _jobApplicationService.GetApplicationByIdAsync(id);
        return Ok(response);
    }

    [HttpGet("candidate/{candidateId:int}")]
    public async Task<ActionResult<List<ApplicationResponseDto>>> GetApplicationsByCandidate([FromRoute] int candidateId)
    {
        var response = await _jobApplicationService.GetApplicationsByCandidateAsync(candidateId);
        return Ok(response);
    }

    [HttpGet("job/{jobId:int}")]
    public async Task<ActionResult<List<ApplicationResponseDto>>> GetApplicationsByJob([FromRoute] int jobId)
    {
        var response = await _jobApplicationService.GetApplicationsByJobAsync(jobId);
        return Ok(response);
    }

    [HttpPut("{id:int}/status/{statusId:int}")]
    public async Task<ActionResult<ApplicationResponseDto>> UpdateApplicationStatus(
        [FromRoute] int id,
        [FromRoute] int statusId)
    {
        var response = await _jobApplicationService.UpdateApplicationStatusAsync(id, statusId);
        return Ok(response);
    }
}
