using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/experiences")]
public class CandidateExperienceController : ControllerBase
{
    private readonly CandidateExperienceService _service;

    public CandidateExperienceController(CandidateExperienceService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddExperience([FromBody] CandidateExperienceDto dto)
    {
        var result = await _service.AddExperienceAsync(dto);
        return Ok(result);
    }

    [HttpPut("{expId}")]
    public async Task<IActionResult> UpdateExperience(int expId, [FromBody] CandidateExperienceDto dto)
    {
        try
        {
            var result = await _service.UpdateExperienceAsync(expId, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Experience not found");
        }
    }

    [HttpDelete("{expId}")]
    public async Task<IActionResult> DeleteExperience(int expId)
    {
        try
        {
            await _service.DeleteExperienceAsync(expId);
            return Ok("Experience deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Experience not found");
        }
    }

    [HttpGet("{expId}")]
    public async Task<IActionResult> GetExperienceById(int expId)
    {
        try
        {
            var result = await _service.GetExperienceByIdAsync(expId);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Experience not found");
        }
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetExperiencesByCandidate(int cid)
    {
        var list = await _service.GetExperiencesByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllExperiences()
    {
        var list = await _service.GetAllExperiencesAsync();
        return Ok(list);
    }
}
