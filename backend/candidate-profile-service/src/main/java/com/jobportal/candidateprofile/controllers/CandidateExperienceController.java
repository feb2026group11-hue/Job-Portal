package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobportal.candidateprofile.dto.CandidateExperienceDto;
import com.jobportal.candidateprofile.service.CandidateExperienceService;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin("*")
public class CandidateExperienceController {

    @Autowired
    private CandidateExperienceService service;

    @PostMapping
    public CandidateExperienceDto addExperience(@RequestBody CandidateExperienceDto dto) {
        return service.addExperience(dto);
    }

    @PutMapping("/{expId}")
    public CandidateExperienceDto updateExperience(@PathVariable Integer expId, @RequestBody CandidateExperienceDto dto) {
        return service.updateExperience(expId, dto);
    }

    @DeleteMapping("/{expId}")
    public String deleteExperience(@PathVariable Integer expId) {
        service.deleteExperience(expId);
        return "Experience deleted successfully";
    }

    @GetMapping("/{expId}")
    public CandidateExperienceDto getExperienceById(@PathVariable Integer expId) {
        return service.getExperienceById(expId);
    }

    @GetMapping("/candidate/{cid}")
    public List<CandidateExperienceDto> getExperiencesByCandidate(@PathVariable Integer cid) {
        return service.getExperiencesByCandidate(cid);
    }

    @GetMapping
    public List<CandidateExperienceDto> getAllExperiences() {
        return service.getAllExperiences();
    }
}
