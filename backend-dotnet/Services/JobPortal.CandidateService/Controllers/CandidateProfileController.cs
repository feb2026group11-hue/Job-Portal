using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.DTOs.AI;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
public class CandidateProfileController : ControllerBase
{
    private readonly CandidateProfileService _service;

    public CandidateProfileController(CandidateProfileService service)
    {
        _service = service;
    }

    [HttpPost("candidate-profile")]
    public async Task<IActionResult> Create([FromBody] CandidateProfileDto dto)
    {
        try
        {
            var result = await _service.CreateAsync(dto);
            return StatusCode(201, result);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("api/candidate/me/save-parsed-profile")]
    [HttpPost("candidate-profile/me/save-parsed-profile")]
    public async Task<IActionResult> SaveMyParsedProfile(
        [FromHeader(Name = "Authorization")] string? tokenHeader,
        [FromHeader(Name = "X-User-Id")] int? headerUid,
        [FromQuery] int? uid,
        [FromBody] ExtractedResumeDto dto)
    {
        int resolvedUid = ExtractUid(tokenHeader, headerUid, uid);
        var result = await _service.SaveParsedProfileByUidAsync(resolvedUid, dto);
        return Ok(result);
    }

    [HttpGet("candidate-profile")]
    public async Task<IActionResult> GetAll()
    {
        var list = await _service.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("candidate-profile/{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var profile = await _service.GetByIdAsync(id);
            return Ok(profile);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate Profile not found");
        }
    }

    [HttpPut("candidate-profile/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] CandidateProfileDto dto)
    {
        try
        {
            var result = await _service.UpdateAsync(id, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate Profile not found");
        }
    }

    [HttpDelete("candidate-profile/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var msg = await _service.DeleteAsync(id);
            return Ok(msg);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate Profile not found");
        }
    }

    [HttpGet("candidate-profile/cid/{cid}")]
    public async Task<IActionResult> GetByCid(int cid)
    {
        try
        {
            var profile = await _service.GetByCidAsync(cid);
            return Ok(profile);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Candidate Profile not found");
        }
    }

    private int ExtractUid(string? tokenHeader, int? headerUid, int? paramUid)
    {
        if (headerUid.HasValue)
        {
            return headerUid.Value;
        }
        if (paramUid.HasValue)
        {
            return paramUid.Value;
        }
        if (!string.IsNullOrEmpty(tokenHeader) && tokenHeader.StartsWith("Bearer "))
        {
            try
            {
                var token = tokenHeader.Substring(7);
                var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
                if (handler.CanReadToken(token))
                {
                    var jwtToken = handler.ReadJwtToken(token);
                    var uidClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "uid" || c.Type == "nameid");
                    if (uidClaim != null && int.TryParse(uidClaim.Value, out int uidVal))
                    {
                        return uidVal;
                    }
                    var subClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "sub");
                    if (subClaim != null && int.TryParse(subClaim.Value, out int subUidVal))
                    {
                        return subUidVal;
                    }
                }
            }
            catch { }
        }
        return 1;
    }
}
