using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.Entities;
using JobPortal.CandidateService.DTOs;

namespace JobPortal.CandidateService.Services;

public class CandidateSkillsService
{
    private readonly JobPortalDbContext _context;

    public CandidateSkillsService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<CandidateSkillsDto> AddSkillAsync(CandidateSkillsDto dto)
    {
        var skill = new CandidateSkills
        {
            Cid = dto.Cid,
            SkillId = dto.SkillId,
            Proficiency = dto.Proficiency
        };

        _context.CandidateSkills.Add(skill);
        await _context.SaveChangesAsync();

        dto.CsId = skill.CsId;
        return dto;
    }

    public async Task<CandidateSkillsDto> UpdateSkillAsync(int csId, CandidateSkillsDto dto)
    {
        var skill = await _context.CandidateSkills.FindAsync(csId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Candidate skill not found");
        }

        skill.Cid = dto.Cid;
        skill.SkillId = dto.SkillId;
        skill.Proficiency = dto.Proficiency;

        await _context.SaveChangesAsync();

        var response = new CandidateSkillsDto
        {
            CsId = skill.CsId,
            Cid = skill.Cid,
            SkillId = skill.SkillId,
            Proficiency = skill.Proficiency
        };

        var nameSkill = await _context.Skills.FindAsync(skill.SkillId);
        if (nameSkill != null)
        {
            response.SkillName = nameSkill.SkillName;
        }

        return response;
    }

    public async Task DeleteSkillAsync(int csId)
    {
        var skill = await _context.CandidateSkills.FindAsync(csId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Candidate skill not found");
        }

        _context.CandidateSkills.Remove(skill);
        await _context.SaveChangesAsync();
    }

    public async Task<CandidateSkillsDto> GetSkillByIdAsync(int csId)
    {
        var skill = await _context.CandidateSkills.FindAsync(csId);
        if (skill == null)
        {
            throw new KeyNotFoundException("Candidate skill not found");
        }

        var dto = new CandidateSkillsDto
        {
            CsId = skill.CsId,
            Cid = skill.Cid,
            SkillId = skill.SkillId,
            Proficiency = skill.Proficiency
        };

        var s = await _context.Skills.FindAsync(skill.SkillId);
        if (s != null)
        {
            dto.SkillName = s.SkillName;
        }

        return dto;
    }

    public async Task<List<CandidateSkillsDto>> GetSkillsByCandidateAsync(int cid)
    {
        var list = await _context.CandidateSkills.Where(cs => cs.Cid == cid).ToListAsync();
        var dtos = new List<CandidateSkillsDto>();

        foreach (var skill in list)
        {
            var dto = new CandidateSkillsDto
            {
                CsId = skill.CsId,
                Cid = skill.Cid,
                SkillId = skill.SkillId,
                Proficiency = skill.Proficiency
            };

            var s = await _context.Skills.FindAsync(skill.SkillId);
            if (s != null)
            {
                dto.SkillName = s.SkillName;
            }
            dtos.Add(dto);
        }

        return dtos;
    }

    public async Task<List<CandidateSkillsDto>> GetAllSkillsAsync()
    {
        var list = await _context.CandidateSkills.ToListAsync();
        var dtos = new List<CandidateSkillsDto>();

        foreach (var skill in list)
        {
            var dto = new CandidateSkillsDto
            {
                CsId = skill.CsId,
                Cid = skill.Cid,
                SkillId = skill.SkillId,
                Proficiency = skill.Proficiency
            };

            var s = await _context.Skills.FindAsync(skill.SkillId);
            if (s != null)
            {
                dto.SkillName = s.SkillName;
            }
            dtos.Add(dto);
        }

        return dtos;
    }

    public async Task<List<CandidateSkillsDto>> SaveSkillsForCandidateAsync(int cid, List<string> skillNames)
    {
        var existing = await _context.CandidateSkills.Where(cs => cs.Cid == cid).ToListAsync();
        _context.CandidateSkills.RemoveRange(existing);
        await _context.SaveChangesAsync();

        var dtos = new List<CandidateSkillsDto>();

        foreach (var name in skillNames)
        {
            var cleanName = name.Trim();
            if (string.IsNullOrEmpty(cleanName)) continue;

            var skill = await _context.Skills.FirstOrDefaultAsync(s => s.SkillName.ToLower() == cleanName.ToLower());
            if (skill == null)
            {
                skill = new Skill { SkillName = cleanName };
                _context.Skills.Add(skill);
                await _context.SaveChangesAsync();
            }

            var cs = new CandidateSkills
            {
                Cid = cid,
                SkillId = skill.SkillId,
                Proficiency = "Intermediate"
            };

            _context.CandidateSkills.Add(cs);
            await _context.SaveChangesAsync();

            dtos.Add(new CandidateSkillsDto
            {
                CsId = cs.CsId,
                Cid = cs.Cid,
                SkillId = cs.SkillId,
                Proficiency = cs.Proficiency,
                SkillName = skill.SkillName
            });
        }

        return dtos;
    }
}
