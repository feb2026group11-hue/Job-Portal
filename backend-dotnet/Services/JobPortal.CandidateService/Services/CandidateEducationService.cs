using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateEducationService
{
    private readonly JobPortalDbContext _context;

    public CandidateEducationService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateEducation> AddEducationAsync(CandidateEducationDTO dto)
    {
        var entity = new CandidateEducation
        {
            Cid = dto.Cid,
            EducationType = dto.EducationType,
            Specialization = dto.Specialization,
            PassingYear = dto.PassingYear,
            UniversityName = dto.UniversityName,
            CourseType = dto.CourseType,
            Grade = dto.Grade,
            Duration = dto.Duration
        };

        _context.CandidateEducations.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<List<CandidateEducation>> GetAllEducationAsync()
    {
        return await _context.CandidateEducations.ToListAsync();
    }

    public async Task<List<CandidateEducation>> GetEducationByCandidateAsync(int cid)
    {
        return await _context.CandidateEducations.Where(e => e.Cid == cid).ToListAsync();
    }

    public async Task<CandidateEducation?> GetEducationByIdAsync(int id)
    {
        return await _context.CandidateEducations.FindAsync(id);
    }

    public async Task<CandidateEducation?> UpdateEducationAsync(int id, CandidateEducationDTO dto)
    {
        var entity = await _context.CandidateEducations.FindAsync(id);
        if (entity == null) return null;

        entity.Cid = dto.Cid;
        entity.EducationType = dto.EducationType;
        entity.Specialization = dto.Specialization;
        entity.PassingYear = dto.PassingYear;
        entity.UniversityName = dto.UniversityName;
        entity.CourseType = dto.CourseType;
        entity.Grade = dto.Grade;
        entity.Duration = dto.Duration;

        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<string> DeleteEducationAsync(int id)
    {
        var entity = await _context.CandidateEducations.FindAsync(id);
        if (entity != null)
        {
            _context.CandidateEducations.Remove(entity);
            await _context.SaveChangesAsync();
            return "Education Deleted Successfully";
        }
        return "Education Not Found";
    }
}
