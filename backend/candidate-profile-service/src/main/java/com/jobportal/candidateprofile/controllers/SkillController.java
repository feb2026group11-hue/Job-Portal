package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.SkillDto;
import com.jobportal.candidateprofile.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService service;

    @PostMapping
    public SkillDto addSkill(@RequestBody SkillDto dto) {
        return service.addSkill(dto);
    }

    @PutMapping("/{skillId}")
    public SkillDto updateSkill(@PathVariable Integer skillId, @RequestBody SkillDto dto) {
        return service.updateSkill(skillId, dto);
    }

    @DeleteMapping("/{skillId}")
    public String deleteSkill(@PathVariable Integer skillId) {
        service.deleteSkill(skillId);
        return "Skill deleted successfully";
    }

    @GetMapping("/{skillId}")
    public SkillDto getSkillById(@PathVariable Integer skillId) {
        return service.getSkillById(skillId);
    }

    @GetMapping
    public List<SkillDto> getAllSkills() {
        return service.getAllSkills();
    }
}
