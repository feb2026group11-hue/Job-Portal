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

import com.jobportal.candidateprofile.dto.CandidateEducationDTO;
import com.jobportal.candidateprofile.entities.CandidateEducation;
import com.jobportal.candidateprofile.service.CandidateEducationService;

@RestController
@RequestMapping("/education")
@CrossOrigin("*")
public class CandidateEducationController {
	
	@Autowired
    private CandidateEducationService service;

    // Add Education
    @PostMapping("/add")
    public CandidateEducation addEducation(@RequestBody CandidateEducationDTO dto) {
        return service.addEducation(dto);
    }

    // Get All
    @GetMapping("/all")
    public List<CandidateEducation> getAllEducation() {
        return service.getAllEducation();
    }

    // Get By Candidate ID
    @GetMapping("/candidate/{cid}")
    public List<CandidateEducation> getEducationByCandidate(@PathVariable int cid) {
        return service.getEducationByCandidate(cid);
    }

    // Get By Id
    @GetMapping("/{id}")
    public CandidateEducation getEducationById(@PathVariable int id) {
        return service.getEducationById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public CandidateEducation updateEducation(
            @PathVariable int id,
            @RequestBody CandidateEducationDTO dto) {

        return service.updateEducation(id, dto);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String deleteEducation(@PathVariable int id) {
        return service.deleteEducation(id);
    }
}
