package com.jobportal.candidateprofile.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.candidateprofile.dto.CandidateResumeDto;
import com.jobportal.candidateprofile.entities.CandidateProfile;
import com.jobportal.candidateprofile.entities.CandidateResume;
import com.jobportal.candidateprofile.repository.CandidateProfileRepository;
import com.jobportal.candidateprofile.repository.CandidateResumeRepository;

@Service
public class CandidateResumeService {

    @Autowired
    private CandidateResumeRepository resumeRepository;

    @Autowired
    private CandidateProfileRepository candidateProfileRepository;

    private final String uploadPath = "./uploads/resumes/";

    public CandidateResumeDto saveResume(CandidateResumeDto dto, MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required");
        }

        CandidateProfile candidateProfile = candidateProfileRepository.findById(dto.getCid())
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + dto.getCid()));

        CandidateResume resume = new CandidateResume();
        resume.setSummary(dto.getSummary());
        resume.setFile(uploadFile(file));
        resume.setIsDefault(dto.isDefault());
        resume.setCandidateProfile(candidateProfile);
        resume.setUpdatedAt(LocalDateTime.now());

        return toDto(resumeRepository.save(resume));
    }

    public List<CandidateResumeDto> getAllResumes() {
        return resumeRepository.findAll().stream().map(this::toDto).toList();
    }

    public CandidateResumeDto getResumeById(Integer id) {
        return toDto(findResume(id));
    }

    public List<CandidateResumeDto> getResumeByCandidate(Integer cid) {
        return resumeRepository.findByCandidateProfileCid(cid).stream().map(this::toDto).toList();
    }

    public CandidateResumeDto getDefaultResume(Integer cid) {
        return resumeRepository.findByCandidateProfileCidAndIsDefaultTrue(cid)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Default resume not found"));
    }

    public void deleteResume(Integer id) {
        resumeRepository.delete(findResume(id));
    }

    private String uploadFile(MultipartFile file) throws IOException {
        Path folderPath = Paths.get(uploadPath);
        Files.createDirectories(folderPath);

        String originalName = Paths.get(file.getOriginalFilename() == null ? "resume.pdf" : file.getOriginalFilename())
                .getFileName().toString();
        Path filePath = folderPath.resolve(System.currentTimeMillis() + "_" + originalName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return filePath.toString();
    }

    private CandidateResume findResume(Integer id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resume not found with id: " + id));
    }

    private CandidateResumeDto toDto(CandidateResume resume) {
        CandidateResumeDto dto = new CandidateResumeDto();
        dto.setResumeId(resume.getResumeId());
        dto.setCid(resume.getCandidateProfile().getCid());
        dto.setSummary(resume.getSummary());
        dto.setFile(resume.getFile());
        dto.setDefault(resume.getIsDefault());
        return dto;
    }
}
