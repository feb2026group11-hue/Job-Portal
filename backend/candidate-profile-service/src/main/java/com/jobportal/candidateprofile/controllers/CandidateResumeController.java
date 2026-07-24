package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.entities.CandidateResume;
import com.jobportal.candidateprofile.service.CandidateResumeService;

@RestController
@RequestMapping("/api/candidate/resume")
@CrossOrigin(origins = "*")
public class CandidateResumeController {

    @Autowired
    private CandidateResumeService resumeService;

    @PostMapping
    public CandidateResume saveResume(@RequestBody CandidateResume resume) {
        return resumeService.saveResume(resume);
    }

    @GetMapping
    public List<CandidateResume> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public CandidateResume getResumeById(@PathVariable Integer id) {
        return resumeService.getResumeById(id);
    }

    @GetMapping("/candidate/{cid}")
    public List<CandidateResume> getResumeByCandidate(@PathVariable Integer cid) {
        return resumeService.getResumeByCandidate(cid);
    }

    @GetMapping("/candidate/{cid}/default")
    public CandidateResume getDefaultResume(@PathVariable Integer cid) {
        return resumeService.getDefaultResume(cid);
    }

    @PutMapping("/{id}")
    public CandidateResume updateResume(@PathVariable Integer id,
                                        @RequestBody CandidateResume resume) {
        return resumeService.updateResume(id, resume);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Integer id) {
        resumeService.deleteResume(id);
        return "Resume deleted successfully";
    }

}