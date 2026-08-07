using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateResumeService
{
    private readonly JobPortalDbContext _context;

    public CandidateResumeService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateResumeDto> SaveResumeAsync(CandidateResumeDto dto, IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            throw new ArgumentException("Resume file is required");
        }

        var candidateProfile = await _context.CandidateProfiles.FindAsync(dto.Cid);
        if (candidateProfile == null)
        {
            throw new KeyNotFoundException("Candidate not found with id: " + dto.Cid);
        }

        var existingDefault = await _context.CandidateResumes
            .FirstOrDefaultAsync(r => r.Cid == dto.Cid && r.IsDefault == true);

        CandidateResume resume;
        if (existingDefault != null && dto.IsDefault)
        {
            resume = existingDefault;
            try
            {
                if (resume.File != null)
                {
                    // Find actual path to delete old file
                    var oldFilePath = ResolvePhysicalPath(resume.File);
                    if (File.Exists(oldFilePath))
                    {
                        File.Delete(oldFilePath);
                    }
                }
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("Failed to delete old resume file: " + e.Message);
            }
        }
        else
        {
            resume = new CandidateResume();
            resume.Cid = dto.Cid;
        }

        resume.Summary = dto.Summary;
        resume.File = await UploadFileAsync(file);
        resume.IsDefault = dto.IsDefault;
        resume.UpdatedAt = DateTime.UtcNow;

        if (resume.ResumeId == 0)
        {
            _context.CandidateResumes.Add(resume);
        }
        await _context.SaveChangesAsync();

        return ToDto(resume);
    }

    public async Task<List<CandidateResumeDto>> GetAllResumesAsync()
    {
        var list = await _context.CandidateResumes.ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<CandidateResumeDto> GetResumeByIdAsync(int id)
    {
        var resume = await _context.CandidateResumes.FindAsync(id);
        if (resume == null)
        {
            throw new KeyNotFoundException("Resume not found with id: " + id);
        }
        return ToDto(resume);
    }

    public async Task<List<CandidateResumeDto>> GetResumeByCandidateAsync(int cid)
    {
        var list = await _context.CandidateResumes.Where(r => r.Cid == cid).ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<CandidateResumeDto> GetDefaultResumeAsync(int cid)
    {
        var resume = await _context.CandidateResumes
            .FirstOrDefaultAsync(r => r.Cid == cid && r.IsDefault == true);
        if (resume == null)
        {
            throw new KeyNotFoundException("Default resume not found");
        }
        return ToDto(resume);
    }

    public async Task DeleteResumeAsync(int id)
    {
        var resume = await _context.CandidateResumes.FindAsync(id);
        if (resume == null)
        {
            throw new KeyNotFoundException("Resume not found with id: " + id);
        }

        _context.CandidateResumes.Remove(resume);
        await _context.SaveChangesAsync();
    }

    private async Task<string> UploadFileAsync(IFormFile file)
    {
        var uploadFolder = GetProjectRootUploadPath();
        Directory.CreateDirectory(uploadFolder);

        var originalName = Path.GetFileName(file.FileName);
        var fileName = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}_{originalName}";
        var filePath = Path.Combine(uploadFolder, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"uploads/resumes/{fileName}";
    }

    private string GetProjectRootUploadPath()
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir != null)
        {
            var uploadsPath = Path.Combine(dir.FullName, "uploads", "resumes");
            if (Directory.Exists(Path.Combine(dir.FullName, "uploads")))
            {
                return uploadsPath;
            }
            dir = dir.Parent;
        }
        return Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "uploads", "resumes"));
    }

    private string ResolvePhysicalPath(string relativePath)
    {
        var dir = new DirectoryInfo(Directory.GetCurrentDirectory());
        while (dir != null)
        {
            var path = Path.Combine(dir.FullName, relativePath);
            if (File.Exists(path))
            {
                return path;
            }
            dir = dir.Parent;
        }
        return Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "..", relativePath));
    }

    private CandidateResumeDto ToDto(CandidateResume resume)
    {
        return new CandidateResumeDto
        {
            ResumeId = resume.ResumeId,
            Cid = resume.Cid,
            Summary = resume.Summary ?? string.Empty,
            File = resume.File,
            IsDefault = resume.IsDefault ?? false,
            UpdatedAt = resume.UpdatedAt
        };
    }
}
