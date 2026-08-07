using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;
using JobPortal.CandidateService.DTOs.AI;

namespace JobPortal.CandidateService.Services;

public class CandidateProfileService
{
    private readonly JobPortalDbContext _context;
    private readonly CandidateSkillsService _candidateSkillsService;

    public CandidateProfileService(JobPortalDbContext context, CandidateSkillsService candidateSkillsService)
    {
        _context = context;
        _candidateSkillsService = candidateSkillsService;
    }

    public async Task<CandidateProfileDto> CreateAsync(CandidateProfileDto dto)
    {
        if (await _context.CandidateProfiles.AnyAsync(p => p.Uid == dto.Uid))
        {
            throw new ArgumentException("Candidate Profile already exists");
        }

        var profile = new CandidateProfile
        {
            Uid = dto.Uid,
            Gender = dto.Gender,
            Dob = dto.Dob,
            Experience = dto.Experience,
            CurrentSalary = dto.CurrentSalary,
            ExpectedSalary = dto.ExpectedSalary,
            Summary = dto.Summary
        };

        _context.CandidateProfiles.Add(profile);
        await _context.SaveChangesAsync();

        dto.Cid = profile.Cid;
        return dto;
    }

    public async Task<List<CandidateProfile>> GetAllAsync()
    {
        return await _context.CandidateProfiles.ToListAsync();
    }

    public async Task<CandidateProfile> GetByIdAsync(int id)
    {
        var profile = await _context.CandidateProfiles.FirstOrDefaultAsync(p => p.Uid == id);
        if (profile == null)
        {
            throw new KeyNotFoundException("Candidate Profile not found");
        }
        return profile;
    }

    public async Task<CandidateProfileDto> UpdateAsync(int id, CandidateProfileDto dto)
    {
        var profile = await _context.CandidateProfiles.FirstOrDefaultAsync(p => p.Uid == id);
        if (profile == null)
        {
            throw new KeyNotFoundException("Candidate Profile not found");
        }

        if (!string.IsNullOrEmpty(dto.Gender))
        {
            profile.Gender = dto.Gender;
        }
        profile.Dob = dto.Dob;
        profile.Experience = dto.Experience;
        profile.CurrentSalary = dto.CurrentSalary;
        profile.ExpectedSalary = dto.ExpectedSalary;
        profile.Summary = dto.Summary;

        await _context.SaveChangesAsync();
        dto.Cid = profile.Cid;
        return dto;
    }

    public async Task<string> DeleteAsync(int id)
    {
        var profile = await _context.CandidateProfiles.FirstOrDefaultAsync(p => p.Uid == id);
        if (profile == null)
        {
            throw new KeyNotFoundException("Candidate Profile not found");
        }

        _context.CandidateProfiles.Remove(profile);
        await _context.SaveChangesAsync();

        return "Candidate Profile Deleted Successfully";
    }

    public async Task<CandidateProfile> GetByCidAsync(int cid)
    {
        var profile = await _context.CandidateProfiles.FindAsync(cid);
        if (profile == null)
        {
            throw new KeyNotFoundException("Candidate Profile not found");
        }
        return profile;
    }

    public async Task<CandidateProfileDto> SaveParsedProfileByUidAsync(int uid, ExtractedResumeDto dto)
    {
        var profile = await _context.CandidateProfiles.FirstOrDefaultAsync(p => p.Uid == uid);
        if (profile == null)
        {
            profile = new CandidateProfile
            {
                Uid = uid,
                Gender = "Other",
                Dob = new DateOnly(2000, 1, 1)
            };
            _context.CandidateProfiles.Add(profile);
        }

        if (dto != null && !string.IsNullOrWhiteSpace(dto.Summary))
        {
            profile.Summary = dto.Summary;
        }

        await _context.SaveChangesAsync();
        int cid = profile.Cid;

        if (dto != null && dto.Skills != null && dto.Skills.Any())
        {
            await _candidateSkillsService.SaveSkillsForCandidateAsync(cid, dto.Skills);
        }

        if (dto != null && dto.Experiences != null && dto.Experiences.Any())
        {
            try
            {
                var existingExp = await _context.CandidateExperiences.Where(e => e.Cid == cid).ToListAsync();
                if (existingExp.Any())
                {
                    _context.CandidateExperiences.RemoveRange(existingExp);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception) { }

            foreach (var exp in dto.Experiences)
            {
                if (!string.IsNullOrWhiteSpace(exp.Title) || !string.IsNullOrWhiteSpace(exp.Company))
                {
                    var experience = new CandidateExperience
                    {
                        Cid = cid,
                        CompanyName = !string.IsNullOrWhiteSpace(exp.Company) ? SafeTruncate(exp.Company, 150) : "N/A",
                        Designation = !string.IsNullOrWhiteSpace(exp.Title) ? SafeTruncate(exp.Title, 150) : "Role",
                        Status = "Previous",
                        StartDate = SafeParseDate(exp.StartDate, DateOnly.FromDateTime(DateTime.UtcNow.AddYears(-1))),
                        EndDate = SafeParseDate(exp.EndDate, null),
                        Description = exp.Description
                    };
                    _context.CandidateExperiences.Add(experience);
                }
            }
            await _context.SaveChangesAsync();
        }

        if (dto != null && dto.Educations != null && dto.Educations.Any())
        {
            try
            {
                var existingEdu = await _context.CandidateEducations.Where(e => e.Cid == cid).ToListAsync();
                if (existingEdu.Any())
                {
                    _context.CandidateEducations.RemoveRange(existingEdu);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception) { }

            foreach (var edu in dto.Educations)
            {
                if (!string.IsNullOrWhiteSpace(edu.Degree) || !string.IsNullOrWhiteSpace(edu.Institution))
                {
                    var education = new CandidateEducation
                    {
                        Cid = cid,
                        EducationType = !string.IsNullOrWhiteSpace(edu.Degree) ? SafeTruncate(edu.Degree, 50) : "Degree",
                        UniversityName = !string.IsNullOrWhiteSpace(edu.Institution) ? SafeTruncate(edu.Institution, 150) : "University",
                        PassingYear = SafeParseYear(edu.PassoutYear, DateTime.UtcNow.Year),
                        CourseType = "Full Time"
                    };
                    _context.CandidateEducations.Add(education);
                }
            }
            await _context.SaveChangesAsync();
        }

        if (dto != null && dto.Projects != null && dto.Projects.Any())
        {
            try
            {
                var existingProj = await _context.CandidateProjects.Where(p => p.Cid == cid).ToListAsync();
                if (existingProj.Any())
                {
                    _context.CandidateProjects.RemoveRange(existingProj);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception) { }

            foreach (var proj in dto.Projects)
            {
                if (!string.IsNullOrWhiteSpace(proj.Title))
                {
                    var project = new CandidateProject
                    {
                        Cid = cid,
                        ProjectTitle = SafeTruncate(proj.Title, 150),
                        Description = proj.Description,
                        ProjectUrl = string.IsNullOrWhiteSpace(proj.ProjectUrl) ? null : SafeTruncate(proj.ProjectUrl, 255),
                        StartDate = DateOnly.FromDateTime(DateTime.UtcNow.AddMonths(-6)),
                        Technologies = string.IsNullOrWhiteSpace(proj.Technologies) ? null : SafeTruncate(proj.Technologies, 255)
                    };
                    _context.CandidateProjects.Add(project);
                }
            }
            await _context.SaveChangesAsync();
        }

        return new CandidateProfileDto
        {
            Cid = profile.Cid,
            Uid = profile.Uid,
            Gender = profile.Gender,
            Dob = profile.Dob,
            Experience = profile.Experience,
            CurrentSalary = profile.CurrentSalary,
            ExpectedSalary = profile.ExpectedSalary,
            Summary = profile.Summary
        };
    }

    private string SafeTruncate(string? str, int maxLength)
    {
        if (str == null) return string.Empty;
        var trimmed = str.Trim();
        return trimmed.Length > maxLength ? trimmed.Substring(0, maxLength) : trimmed;
    }

    private DateOnly SafeParseDate(string? dateStr, DateOnly? fallback)
    {
        if (string.IsNullOrWhiteSpace(dateStr)) return fallback ?? default;
        try
        {
            var s = dateStr.Trim();
            if (DateOnly.TryParse(s, out DateOnly d))
            {
                if (d.Year >= 1900 && d.Year <= 2100) return d;
            }
            
            // Extract first 4 digits
            var digits = new string(s.Where(char.IsDigit).ToArray());
            if (digits.Length >= 4)
            {
                int y = int.Parse(digits.Substring(0, 4));
                if (y >= 1900 && y <= 2100) return new DateOnly(y, 1, 1);
            }
        }
        catch (Exception) { }
        return fallback ?? default;
    }

    private int SafeParseYear(string? yearStr, int fallback)
    {
        if (string.IsNullOrWhiteSpace(yearStr)) return fallback;
        try
        {
            var digits = new string(yearStr.Where(char.IsDigit).ToArray());
            if (digits.Length >= 4)
            {
                int y = int.Parse(digits.Substring(0, 4));
                if (y >= 1900 && y <= 2100) return y;
            }
        }
        catch (Exception) { }
        return fallback;
    }
}
