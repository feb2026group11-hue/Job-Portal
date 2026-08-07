using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateProjectService
{
    private readonly JobPortalDbContext _context;

    public CandidateProjectService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateProjectDto> AddProjectAsync(CandidateProjectDto dto)
    {
        var project = new CandidateProject
        {
            Cid = dto.Cid,
            ProjectTitle = dto.ProjectTitle,
            Description = dto.Description,
            ProjectUrl = dto.ProjectUrl,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Technologies = dto.Technologies
        };

        _context.CandidateProjects.Add(project);
        await _context.SaveChangesAsync();

        return ToDto(project);
    }

    public async Task<CandidateProjectDto> UpdateProjectAsync(int cpid, CandidateProjectDto dto)
    {
        var project = await _context.CandidateProjects.FindAsync(cpid);
        if (project == null)
        {
            throw new KeyNotFoundException("Project not found");
        }

        project.Cid = dto.Cid;
        project.ProjectTitle = dto.ProjectTitle;
        project.Description = dto.Description;
        project.ProjectUrl = dto.ProjectUrl;
        project.StartDate = dto.StartDate;
        project.EndDate = dto.EndDate;
        project.Technologies = dto.Technologies;

        await _context.SaveChangesAsync();
        return ToDto(project);
    }

    public async Task DeleteProjectAsync(int cpid)
    {
        var project = await _context.CandidateProjects.FindAsync(cpid);
        if (project == null)
        {
            throw new KeyNotFoundException("Project not found");
        }

        _context.CandidateProjects.Remove(project);
        await _context.SaveChangesAsync();
    }

    public async Task<CandidateProjectDto> GetProjectByIdAsync(int cpid)
    {
        var project = await _context.CandidateProjects.FindAsync(cpid);
        if (project == null)
        {
            throw new KeyNotFoundException("Project not found");
        }
        return ToDto(project);
    }

    public async Task<List<CandidateProjectDto>> GetProjectsByCandidateAsync(int cid)
    {
        var list = await _context.CandidateProjects.Where(p => p.Cid == cid).ToListAsync();
        return list.Select(ToDto).ToList();
    }

    public async Task<List<CandidateProjectDto>> GetAllProjectsAsync()
    {
        var list = await _context.CandidateProjects.ToListAsync();
        return list.Select(ToDto).ToList();
    }

    private CandidateProjectDto ToDto(CandidateProject project)
    {
        return new CandidateProjectDto
        {
            Cpid = project.Cpid,
            Cid = project.Cid,
            ProjectTitle = project.ProjectTitle,
            Description = project.Description,
            ProjectUrl = project.ProjectUrl,
            StartDate = project.StartDate,
            EndDate = project.EndDate,
            Technologies = project.Technologies
        };
    }
}
