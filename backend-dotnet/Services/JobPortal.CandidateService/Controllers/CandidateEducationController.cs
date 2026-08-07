using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("education")]
public class CandidateEducationController : ControllerBase
{
    private readonly CandidateEducationService _service;

    public CandidateEducationController(CandidateEducationService service)
    {
        _service = service;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddEducation([FromBody] CandidateEducationDTO dto)
    {
        var result = await _service.AddEducationAsync(dto);
        return Ok(result);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllEducation()
    {
        var list = await _service.GetAllEducationAsync();
        return Ok(list);
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetEducationByCandidate(int cid)
    {
        var list = await _service.GetEducationByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEducationById(int id)
    {
        var result = await _service.GetEducationByIdAsync(id);
        if (result == null) return NotFound("Education record not found");
        return Ok(result);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateEducation(int id, [FromBody] CandidateEducationDTO dto)
    {
        var result = await _service.UpdateEducationAsync(id, dto);
        if (result == null) return NotFound("Education record not found");
        return Ok(result);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteEducation(int id)
    {
        var msg = await _service.DeleteEducationAsync(id);
        if (msg == "Education Not Found") return NotFound(msg);
        return Ok(msg);
    }
}
