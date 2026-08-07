using Microsoft.AspNetCore.Mvc;
using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Controllers;

[ApiController]
[Route("api/jobs")]
public class JobController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateJob([FromBody] JobRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _jobService.CreateJobAsync(request);
        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<JobResponseDto>> UpdateJob([FromRoute] int id, [FromBody] JobRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _jobService.UpdateJobAsync(id, request);
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<JobResponseDto>> GetJobById([FromRoute] int id)
    {
        var response = await _jobService.GetJobByIdAsync(id);
        return Ok(response);
    }

    [HttpGet("employer/{empId:int}")]
    public async Task<ActionResult<List<JobResponseDto>>> GetJobsByEmployer([FromRoute] int empId)
    {
        var response = await _jobService.GetJobsByEmployerAsync(empId);
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<List<JobResponseDto>>> SearchJobs(
        [FromQuery] string? title,
        [FromQuery] string? location,
        [FromQuery] string? type,
        [FromQuery] string? status)
    {
        if (title == null && location == null && type == null && status == null)
        {
            var allJobs = await _jobService.GetAllJobsAsync();
            return Ok(allJobs);
        }
        var filteredJobs = await _jobService.SearchJobsAsync(title, location, type, status);
        return Ok(filteredJobs);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteJob([FromRoute] int id)
    {
        await _jobService.DeleteJobAsync(id);
        return NoContent();
    }

    [HttpPatch("{jobId:int}/status")]
    public async Task<ActionResult<JobResponseDto>> UpdateJobStatus(
        [FromRoute] int jobId,
        [FromQuery] string status)
    {
        var response = await _jobService.UpdateJobStatusAsync(jobId, status);
        return Ok(response);
    }
}
