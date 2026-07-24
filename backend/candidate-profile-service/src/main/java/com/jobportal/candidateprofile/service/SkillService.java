package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.SkillDto;
import com.jobportal.candidateprofile.entities.Skill;
import com.jobportal.candidateprofile.repository.SkillRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository repository;

    public SkillDto addSkill(SkillDto dto) {
        if (repository.existsBySkillName(dto.getSkillName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill already exists");
        }

        Skill skill = new Skill();
        BeanUtils.copyProperties(dto, skill);

        Skill saved = repository.save(skill);

        SkillDto response = new SkillDto();
        BeanUtils.copyProperties(saved, response);

        return response;
    }

    public SkillDto updateSkill(Integer skillId, SkillDto dto) {
        Skill skill = repository.findById(skillId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found"));

        if (!skill.getSkillName().equalsIgnoreCase(dto.getSkillName()) && repository.existsBySkillName(dto.getSkillName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Skill with name already exists");
        }

        BeanUtils.copyProperties(dto, skill, "skillId");

        Skill updated = repository.save(skill);

        SkillDto response = new SkillDto();
        BeanUtils.copyProperties(updated, response);

        return response;
    }

    public void deleteSkill(Integer skillId) {
        Skill skill = repository.findById(skillId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found"));

        repository.delete(skill);
    }

    public SkillDto getSkillById(Integer skillId) {
        Skill skill = repository.findById(skillId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found"));

        SkillDto dto = new SkillDto();
        BeanUtils.copyProperties(skill, dto);

        return dto;
    }

    public List<SkillDto> getAllSkills() {
        return repository.findAll().stream().map(skill -> {
            SkillDto dto = new SkillDto();
            BeanUtils.copyProperties(skill, dto);
            return dto;
        }).collect(Collectors.toList());
    }
}
