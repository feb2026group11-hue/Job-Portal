using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.DTOs.AI;
using JobPortal.CandidateService.Services;

namespace JobPortal.CandidateService.Controllers;

[ApiController]
[Route("api/candidate/resume")]
public class CandidateResumeController : ControllerBase
{
    private readonly CandidateResumeService _resumeService;
    private readonly ResumeParserService _resumeParserService;

    public CandidateResumeController(CandidateResumeService resumeService, ResumeParserService resumeParserService)
    {
        _resumeService = resumeService;
        _resumeParserService = resumeParserService;
    }

    [HttpPost("parse-ai")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> ParseResumeWithAI([FromForm] IFormFile file)
    {
        try
        {
            var extracted = await _resumeParserService.ParseResumeFileAsync(file);
            return Ok(extracted);
        }
        catch (Exception e)
        {
            return BadRequest(new { message = e.Message });
        }
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadResume(
        [FromForm(Name = "resume")] string? resumeJson,
        [FromForm(Name = "file")] IFormFile file)
    {
        CandidateResumeDto? resumeDto = null;
        if (!string.IsNullOrEmpty(resumeJson))
        {
            try
            {
                resumeDto = JsonSerializer.Deserialize<CandidateResumeDto>(resumeJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }
            catch { }
        }

        if (resumeDto == null)
        {
            try
            {
                var resumeFile = Request.Form.Files["resume"];
                if (resumeFile != null && resumeFile.Length > 0)
                {
                    using (var reader = new StreamReader(resumeFile.OpenReadStream()))
                    {
                        var content = await reader.ReadToEndAsync();
                        resumeDto = JsonSerializer.Deserialize<CandidateResumeDto>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                    }
                }
            }
            catch { }
        }

        if (resumeDto == null)
        {
            return BadRequest("Resume metadata is required");
        }

        try
        {
            var result = await _resumeService.SaveResumeAsync(resumeDto, file);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAllResumes()
    {
        var list = await _resumeService.GetAllResumesAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetResumeById(int id)
    {
        try
        {
            var result = await _resumeService.GetResumeByIdAsync(id);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Resume not found with id: {id}");
        }
    }

    [HttpGet("candidate/{cid}")]
    public async Task<IActionResult> GetByCandidate(int cid)
    {
        var list = await _resumeService.GetResumeByCandidateAsync(cid);
        return Ok(list);
    }

    [HttpGet("candidate/{cid}/default")]
    public async Task<IActionResult> GetDefaultResume(int cid)
    {
        try
        {
            var result = await _resumeService.GetDefaultResumeAsync(cid);
            return Ok(result);
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Default resume not found");
        }
    }

    [HttpGet("download/{id}")]
    public async Task<IActionResult> DownloadResume(int id)
    {
        try
        {
            var resume = await _resumeService.GetResumeByIdAsync(id);
            var filePath = ResolveFilePath(resume.File ?? "");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found on disk: " + filePath);
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(fileBytes, "application/pdf", Path.GetFileName(filePath));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("view/{id}")]
    public async Task<IActionResult> ViewResume(int id)
    {
        try
        {
            var resume = await _resumeService.GetResumeByIdAsync(id);
            var filePath = ResolveFilePath(resume.File ?? "");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found on disk: " + filePath);
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(fileBytes, "application/pdf");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResume(int id)
    {
        try
        {
            await _resumeService.DeleteResumeAsync(id);
            return Ok("Resume deleted successfully");
        }
        catch (KeyNotFoundException)
        {
            return NotFound("Resume not found");
        }
    }

    private string ResolveFilePath(string savedPath)
    {
        if (System.IO.File.Exists(savedPath))
        {
            return Path.GetFullPath(savedPath);
        }

        var fallback1 = Path.GetFullPath(Path.Combine("backend-dotnet", "Services", "JobPortal.CandidateService", savedPath));
        if (System.IO.File.Exists(fallback1))
        {
            return fallback1;
        }

        var fallback2 = Path.GetFullPath(Path.Combine("..", "..", savedPath));
        if (System.IO.File.Exists(fallback2))
        {
            return fallback2;
        }

        try
        {
            var uploadsDirs = new[]
            {
                Path.GetFullPath("uploads/resumes"),
                Path.GetFullPath("backend-dotnet/Services/JobPortal.CandidateService/uploads/resumes"),
                Path.GetFullPath("../../uploads/resumes")
            };
            foreach (var uploadsDir in uploadsDirs)
            {
                if (Directory.Exists(uploadsDir))
                {
                    var anyPdf = Directory.GetFiles(uploadsDir, "*.pdf").FirstOrDefault();
                    if (anyPdf != null)
                    {
                        return anyPdf;
                    }
                }
            }
        }
        catch { }

        return Path.GetFullPath(savedPath);
    }
}
