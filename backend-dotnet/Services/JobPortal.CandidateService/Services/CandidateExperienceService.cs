using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateExperienceService
{
    private readonly JobPortalDbContext _context;

    public CandidateExperienceService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateExperienceDto> AddExperienceAsync(CandidateExperienceDto dto)
    {
        var experience = new CandidateExperience
        {
            Cid = dto.Cid,
            CompanyName = dto.CompanyName,
            Designation = dto.Designation,
            Status = dto.Status,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Salary = dto.Salary,
            Description = dto.Description
        };

        _context.CandidateExperiences.Add(experience);
        await _context.SaveChangesAsync();

        return ToDto(experience);
    }

    public async Task<CandidateExperienceDto> UpdateExperienceAsync(int expId, CandidateExperienceDto dto)
    {
        var experience = await _context.CandidateExperiences.FindAsync(expId);
        if (experience == null)
        {
            throw new KeyNotFoundException("Experience not found");
        }

        experience.Cid = dto.Cid;
        experience.CompanyName = dto.CompanyName;
        experience.Designation = dto.Designation;
        experience.Status = dto.Status;
        experience.StartDate = dto.StartDate;
        experience.EndDate = dto.EndDate;
        experience.Salary = dto.Salary;
        experience.Description = dto.Description;

        await _context.SaveChangesAsync();
        return ToDto(experience);
    }

    public async Task DeleteExperienceAsync(int expId)
    {
        var experience = await _context.CandidateExperiences.FindAsync(expId);
        if (experience == null)
        {
            throw new KeyNotFoundException("Experience not found");
        }

        _context.CandidateExperiences.Remove(experience);
        await _context.SaveChangesAsync();
    }

    public async Task<CandidateExperienceDto> GetExperienceByIdAsync(int expId)
    {
        var experience = await _context.CandidateExperiences.FindAsync(expId);
        if (experience == null)
        {
            throw new KeyNotFoundException("Experience not found");
        }
        return ToDto(experience);
    }

    public async Task<List<CandidateExperienceDto>> GetExperiencesByCandidateAsync(int cid)
    {
        var list = await _context.CandidateExperiences.Where(e => e.Cid == cid).ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<List<CandidateExperienceDto>> GetAllExperiencesAsync()
    {
        var list = await _context.CandidateExperiences.ToListAsync();
        return list.Select(ToDto).ToList();
    }

    private CandidateExperienceDto ToDto(CandidateExperience experience)
    {
        return new CandidateExperienceDto
        {
            ExpId = experience.ExpId,
            Cid = experience.Cid,
            CompanyName = experience.CompanyName,
            Designation = experience.Designation,
            Status = experience.Status,
            StartDate = experience.StartDate,
            EndDate = experience.EndDate,
            Salary = experience.Salary,
            Description = experience.Description
        };
    }
}
