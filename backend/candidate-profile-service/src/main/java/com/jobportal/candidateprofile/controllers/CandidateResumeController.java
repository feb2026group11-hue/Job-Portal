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

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.RequestParam;
import com.jobportal.candidateprofile.dto.CandidateResumeDto;
import com.jobportal.candidateprofile.dto.ai.ExtractedResumeDto;
import com.jobportal.candidateprofile.service.CandidateResumeService;
import com.jobportal.candidateprofile.service.ResumeParserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/candidate/resume")
public class CandidateResumeController {

    @Autowired
    private CandidateResumeService resumeService;

    @Autowired
    private ResumeParserService resumeParserService;

    @PostMapping(value = "/parse-ai", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ExtractedResumeDto> parseResumeWithAI(@RequestParam("file") MultipartFile file) {
        ExtractedResumeDto extracted = resumeParserService.parseResumeFile(file);
        return ResponseEntity.ok(extracted);
    }

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
        Path filePath = resolveFilePath(resume.getFile());
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

    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewResume(@PathVariable Integer id) throws IOException {
        CandidateResumeDto resume = resumeService.getResumeById(id);
        Path filePath = resolveFilePath(resume.getFile());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("File not found: " + filePath);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + filePath.getFileName() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Integer id) {
        resumeService.deleteResume(id);
        return "Resume deleted successfully";
    }

    private Path resolveFilePath(String savedPath) {
        Path path = Paths.get(savedPath).toAbsolutePath();
        if (java.nio.file.Files.exists(path)) {
            return path;
        }

        // Fallback 1: CWD is workspace root, file is in
        // backend/candidate-profile-service
        Path fallback1 = Paths.get("backend/candidate-profile-service").resolve(savedPath).toAbsolutePath();
        if (java.nio.file.Files.exists(fallback1)) {
            return fallback1;
        }

        // Fallback 2: CWD is inside backend/candidate-profile-service, file is in
        // workspace root uploads
        Path fallback2 = Paths.get("..", "..").resolve(savedPath).normalize().toAbsolutePath();
        if (java.nio.file.Files.exists(fallback2)) {
            return fallback2;
        }

        // Fallback 3: Search for any PDF in the standard upload locations as a last resort
        try {
            Path uploadsDir = Paths.get("uploads/resumes").toAbsolutePath();
            if (!java.nio.file.Files.exists(uploadsDir)) {
                uploadsDir = Paths.get("backend/candidate-profile-service/uploads/resumes").toAbsolutePath();
            }
            if (!java.nio.file.Files.exists(uploadsDir)) {
                uploadsDir = Paths.get("../../uploads/resumes").toAbsolutePath();
            }
            if (java.nio.file.Files.exists(uploadsDir)) {
                try (java.util.stream.Stream<Path> stream = java.nio.file.Files.walk(uploadsDir)) {
                    java.util.Optional<Path> anyPdf = stream
                            .filter(p -> p.toString().toLowerCase().endsWith(".pdf"))
                            .findFirst();
                    if (anyPdf.isPresent()) {
                        System.out.println("File " + savedPath + " not found. Falling back to: " + anyPdf.get());
                        return anyPdf.get();
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("Error searching for fallback PDF: " + e.getMessage());
        }

        return path;
    }
}
