using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class SkillService
{
    private readonly JobPortalDbContext _context;

    public SkillService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<SkillDto> AddSkillAsync(SkillDto dto)
    {
        var cleanName = dto.SkillName.Trim();
        if (await _context.Skills.AnyAsync(s => s.SkillName.ToLower() == cleanName.ToLower()))
        {
            throw new ArgumentException("Skill already exists");
        }

        var skill = new Skill
        {
            SkillName = cleanName
        };

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return new SkillDto
        {
            SkillId = skill.SkillId,
            SkillName = skill.SkillName
        };
    }

    public async Task<SkillDto> UpdateSkillAsync(int skillId, SkillDto dto)
    {
        var skill = await _context.Skills.FindAsync(skillId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Skill not found");
        }

        var cleanName = dto.SkillName.Trim();
        if (!skill.SkillName.Equals(cleanName, StringComparison.OrdinalIgnoreCase) &&
            await _context.Skills.AnyAsync(s => s.SkillName.ToLower() == cleanName.ToLower()))
        {
            throw new ArgumentException("Skill with name already exists");
        }

        skill.SkillName = cleanName;
        await _context.SaveChangesAsync();

        return new SkillDto
        {
            SkillId = skill.SkillId,
            SkillName = skill.SkillName
        };
    }

    public async Task DeleteSkillAsync(int skillId)
    {
        var skill = await _context.Skills.FindAsync(skillId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Skill not found");
        }

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();
    }

    public async Task<SkillDto> GetSkillByIdAsync(int skillId)
    {
        var skill = await _context.Skills.FindAsync(skillId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Skill not found");
        }

        return new SkillDto
        {
            SkillId = skill.SkillId,
            SkillName = skill.SkillName
        };
    }

    public async Task<List<SkillDto>> GetAllSkillsAsync()
    {
        var list = await _context.Skills.ToListAsync();
        return list.Select(s => new SkillDto
        {
            SkillId = s.SkillId,
            SkillName = s.SkillName
        }).ToList();
    }
}
