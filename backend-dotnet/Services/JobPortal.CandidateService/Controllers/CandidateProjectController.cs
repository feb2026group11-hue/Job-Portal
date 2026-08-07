using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/projects")]
public class CandidateProjectController : ControllerBase
{
    private readonly CandidateProjectService _service;

    public CandidateProjectController(CandidateProjectService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddProject([FromBody] CandidateProjectDto dto)
    {
        var result = await _service.AddProjectAsync(dto);
        return Ok(result);
    }

    [HttpPut("{cpid}")]
    public async Task<IActionResult> UpdateProject(int cpid, [FromBody] CandidateProjectDto dto)
    {
        try
        {
            var result = await _service.UpdateProjectAsync(cpid, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Project not found");
        }
    }

    [HttpDelete("{cpid}")]
    public async Task<IActionResult> DeleteProject(int cpid)
    {
        try
        {
            await _service.DeleteProjectAsync(cpid);
            return Ok("Project deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Project not found");
        }
    }

    [HttpGet("{cpid}")]
    public async Task<IActionResult> GetProjectById(int cpid)
    {
        try
        {
            var result = await _service.GetProjectByIdAsync(cpid);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Project not found");
        }
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetProjectsByCandidate(int cid)
    {
        var list = await _service.GetProjectsByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProjects()
    {
        var list = await _service.GetAllProjectsAsync();
        return Ok(list);
    }
}
