package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.CandidateProjectDto;
import com.jobportal.candidateprofile.service.CandidateProjectService;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class CandidateProjectController {

    @Autowired
    private CandidateProjectService service;

    @PostMapping
    public CandidateProjectDto addProject(@RequestBody CandidateProjectDto dto) {
        return service.addProject(dto);
    }

    @PutMapping("/{cpid}")
    public CandidateProjectDto updateProject(@PathVariable Integer cpid, @RequestBody CandidateProjectDto dto) {
        return service.updateProject(cpid, dto);
    }

    @DeleteMapping("/{cpid}")
    public String deleteProject(@PathVariable Integer cpid) {
        service.deleteProject(cpid);
        return "Project deleted successfully";
    }

    @GetMapping("/{cpid}")
    public CandidateProjectDto getProjectById(@PathVariable Integer cpid) {
        return service.getProjectById(cpid);
    }

    @GetMapping("/candidate/{cid}")
    public List<CandidateProjectDto> getProjectsByCandidate(@PathVariable Integer cid) {
        return service.getProjectsByCandidate(cid);
    }

    @GetMapping
    public List<CandidateProjectDto> getAllProjects() {
        return service.getAllProjects();
    }
}
