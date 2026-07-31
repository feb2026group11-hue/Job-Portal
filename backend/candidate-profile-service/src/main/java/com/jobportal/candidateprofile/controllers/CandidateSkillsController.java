package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.CandidateSkillsDto;
import com.jobportal.candidateprofile.service.CandidateSkillsService;

@RestController
@RequestMapping("/api/candidate-skills")
@CrossOrigin("*")
public class CandidateSkillsController {

    @Autowired
    private CandidateSkillsService service;

    @PostMapping
    public CandidateSkillsDto addSkill(@RequestBody CandidateSkillsDto dto) {
        return service.addSkill(dto);
    }

    @PutMapping("/{csId}")
    public CandidateSkillsDto updateSkill(@PathVariable Integer csId, @RequestBody CandidateSkillsDto dto) {
        return service.updateSkill(csId, dto);
    }

    @DeleteMapping("/{csId}")
    public String deleteSkill(@PathVariable Integer csId) {
        service.deleteSkill(csId);
        return "Candidate skill deleted successfully";
    }

    @GetMapping("/{csId}")
    public CandidateSkillsDto getSkillById(@PathVariable Integer csId) {
        return service.getSkillById(csId);
    }

    @GetMapping("/candidate/{cid}")
    public List<CandidateSkillsDto> getSkillsByCandidate(@PathVariable Integer cid) {
        return service.getSkillsByCandidate(cid);
    }

    @PutMapping("/candidate/{cid}")
    public List<CandidateSkillsDto> updateSkillsByCandidate(@PathVariable Integer cid, @RequestBody List<String> skillNames) {
        return service.saveSkillsForCandidate(cid, skillNames);
    }

    @GetMapping
    public List<CandidateSkillsDto> getAllSkills() {
        return service.getAllSkills();
    }
}
