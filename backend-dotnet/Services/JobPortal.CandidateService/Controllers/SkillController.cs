using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/skills")]
public class SkillController : ControllerBase
{
    private readonly SkillService _service;

    public SkillController(SkillService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddSkill([FromBody] SkillDto dto)
    {
        try
        {
            var result = await _service.AddSkillAsync(dto);
            return Ok(result);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{skillId}")]
    public async Task<IActionResult> UpdateSkill(int skillId, [FromBody] SkillDto dto)
    {
        try
        {
            var result = await _service.UpdateSkillAsync(skillId, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Skill not found");
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{skillId}")]
    public async Task<IActionResult> DeleteSkill(int skillId)
    {
        try
        {
            await _service.DeleteSkillAsync(skillId);
            return Ok("Skill deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Skill not found");
        }
    }

    [HttpGet("{skillId}")]
    public async Task<IActionResult> GetSkillById(int skillId)
    {
        try
        {
            var result = await _service.GetSkillByIdAsync(skillId);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Skill not found");
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSkills()
    {
        var list = await _service.GetAllSkillsAsync();
        return Ok(list);
    }
}
