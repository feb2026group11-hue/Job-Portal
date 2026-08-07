using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/candidate-skills")]
public class CandidateSkillsController : ControllerBase
{
    private readonly CandidateSkillsService _service;

    public CandidateSkillsController(CandidateSkillsService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddSkill([FromBody] CandidateSkillsDto dto)
    {
        var result = await _service.AddSkillAsync(dto);
        return Ok(result);
    }

    [HttpPut("{csId}")]
    public async Task<IActionResult> UpdateSkill(int csId, [FromBody] CandidateSkillsDto dto)
    {
        try
        {
            var result = await _service.UpdateSkillAsync(csId, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate skill not found");
        }
    }

    [HttpDelete("{csId}")]
    public async Task<IActionResult> DeleteSkill(int csId)
    {
        try
        {
            await _service.DeleteSkillAsync(csId);
            return Ok("Candidate skill deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate skill not found");
        }
    }

    [HttpGet("{csId}")]
    public async Task<IActionResult> GetSkillById(int csId)
    {
        try
        {
            var result = await _service.GetSkillByIdAsync(csId);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate skill not found");
        }
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetSkillsByCandidate(int cid)
    {
        var list = await _service.GetSkillsByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpPut("candidate/{cid}")]
    public async Task<IActionResult> UpdateSkillsByCandidate(int cid, [FromBody] List<string> skillNames)
    {
        var result = await _service.SaveSkillsForCandidateAsync(cid, skillNames);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSkills()
    {
        var list = await _service.GetAllSkillsAsync();
        return Ok(list);
    }
}
