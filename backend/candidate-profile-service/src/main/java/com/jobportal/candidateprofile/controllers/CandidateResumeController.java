package com.jobportal.candidateprofile.controllers;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.candidateprofile.dto.CandidateResumeDto;
import com.jobportal.candidateprofile.service.CandidateResumeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate/resume")
@CrossOrigin("*")
public class CandidateResumeController {

    @Autowired
    private CandidateResumeService resumeService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CandidateResumeDto uploadResume(
            @Valid @RequestPart("resume") CandidateResumeDto resumeDto,
            @RequestPart("file") MultipartFile file) throws IOException {
        return resumeService.saveResume(resumeDto, file);
    }

    @GetMapping
    public List<CandidateResumeDto> getAllResumes() {
        return resumeService.getAllResumes();
    }

    @GetMapping("/{id}")
    public CandidateResumeDto getResumeById(@PathVariable Integer id) {
        return resumeService.getResumeById(id);
    }

    @GetMapping("/candidate/{cid}")
    public List<CandidateResumeDto> getByCandidate(@PathVariable Integer cid) {
        return resumeService.getResumeByCandidate(cid);
    }

    @GetMapping("/candidate/{cid}/default")
    public CandidateResumeDto getDefaultResume(@PathVariable Integer cid) {
        return resumeService.getDefaultResume(cid);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadResume(@PathVariable Integer id) throws IOException {
        CandidateResumeDto resume = resumeService.getResumeById(id);
        Path filePath = Paths.get(resume.getFile()).toAbsolutePath();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found: " + filePath);
        }
        // System.out.println("////////------ "+filePath+"------/////");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + filePath.getFileName() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Integer id) {
        resumeService.deleteResume(id);
        return "Resume deleted successfully";
    }
}
