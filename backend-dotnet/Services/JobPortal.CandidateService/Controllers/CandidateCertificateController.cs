using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/certificates")]
public class CandidateCertificateController : ControllerBase
{
    private readonly CandidateCertificateService _service;

    public CandidateCertificateController(CandidateCertificateService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> AddCertificate([FromBody] CandidateCertificateDto dto)
    {
        var result = await _service.AddCertificateAsync(dto);
        return Ok(result);
    }

    [HttpPut("{certiId}")]
    public async Task<IActionResult> UpdateCertificate(int certiId, [FromBody] CandidateCertificateDto dto)
    {
        try
        {
            var result = await _service.UpdateCertificateAsync(certiId, dto);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Certificate not found");
        }
    }

    [HttpDelete("{certiId}")]
    public async Task<IActionResult> DeleteCertificate(int certiId)
    {
        try
        {
            await _service.DeleteCertificateAsync(certiId);
            return Ok("Certificate deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Certificate not found");
        }
    }

    [HttpGet("{certiId}")]
    public async Task<IActionResult> GetCertificateById(int certiId)
    {
        try
        {
            var result = await _service.GetCertificateByIdAsync(certiId);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Certificate not found");
        }
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetCertificatesByCandidate(int cid)
    {
        var list = await _service.GetCertificatesByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCertificates()
    {
        var list = await _service.GetAllCertificatesAsync();
        return Ok(list);
    }
}
