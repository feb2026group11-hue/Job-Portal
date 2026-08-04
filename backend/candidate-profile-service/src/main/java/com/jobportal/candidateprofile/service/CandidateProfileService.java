
package com.jobportal.candidateprofile.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateProfileDto;
import com.jobportal.candidateprofile.dto.ai.*;
import com.jobportal.candidateprofile.entities.*;
import com.jobportal.candidateprofile.entities.CandidateProfile.Gender;
import com.jobportal.candidateprofile.repository.*;

@Service
public class CandidateProfileService {

    @Autowired
    private CandidateProfileRepository repository;

    @Autowired
    private CandidateSkillsService candidateSkillsService;

    @Autowired
    private CandidateExperienceRepository experienceRepository;

    @Autowired
    private CandidateEducationRepository candidateEducationRepository;

    @Autowired
    private CandidateProjectRepository candidateProjectRepository;

    public CandidateProfileDto create(CandidateProfileDto dto) {

        if (repository.existsByUid(dto.getUid())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Candidate Profile already exists");
        }

        CandidateProfile profile = new CandidateProfile();

        BeanUtils.copyProperties(dto, profile);

        profile.setGender(Gender.valueOf(dto.getGender()));

        repository.save(profile);
        dto.setCid(profile.getCid());
        return dto;
    }

    public List<CandidateProfile> getAll() {
        return repository.findAll();
    }

    public CandidateProfile getById(int id) {

        return repository.findByUid(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Candidate Profile not found"));
    }

    public CandidateProfileDto update(int id, CandidateProfileDto dto) {

        CandidateProfile profile = repository.findByUid(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Candidate Profile not found"));

        if (dto.getGender() != null) {
            try {
                profile.setGender(Gender.valueOf(dto.getGender()));
            } catch (Exception ignored) {
            }
        }
        profile.setDob(dto.getDob());
        profile.setExperience(dto.getExperience());
        profile.setCurrentSalary(dto.getCurrentSalary());
        profile.setExpectedSalary(dto.getExpectedSalary());
        profile.setSummary(dto.getSummary());

        repository.save(profile);
        dto.setCid(profile.getCid());
        return dto;
    }

    public String delete(int id) {

        CandidateProfile profile = repository.findByUid(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Candidate Profile not found"));

        repository.delete(profile);

        return "Candidate Profile Deleted Successfully";
    }

    public CandidateProfile getByCid(int cid) {
        return repository.findById(cid)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Candidate Profile not found"));
    }

    @Transactional
    public CandidateProfileDto saveParsedProfileByUid(Integer uid, ExtractedResumeDto dto) {
        CandidateProfile profile = repository.findByUid(uid).orElseGet(() -> {
            CandidateProfile p = new CandidateProfile();
            p.setUid(uid);
            p.setGender(Gender.Other);
            p.setDob(LocalDate.of(2000, 1, 1));
            return p;
        });

        if (dto != null && dto.getSummary() != null && !dto.getSummary().isBlank()) {
            profile.setSummary(dto.getSummary());
        }

        CandidateProfile saved = repository.save(profile);
        int cid = saved.getCid();

        if (dto != null && dto.getSkills() != null && !dto.getSkills().isEmpty()) {
            candidateSkillsService.saveSkillsForCandidate(cid, dto.getSkills());
        }

        if (dto != null && dto.getExperiences() != null && !dto.getExperiences().isEmpty()) {
            try {
                List<CandidateExperience> existingExp = experienceRepository.findByCid(cid);
                if (existingExp != null && !existingExp.isEmpty()) {
                    experienceRepository.deleteAll(existingExp);
                }
            } catch (Exception ignored) {}

            for (ExtractedExperienceDto exp : dto.getExperiences()) {
                if ((exp.getTitle() != null && !exp.getTitle().isBlank()) || 
                    (exp.getCompany() != null && !exp.getCompany().isBlank())) {
                    CandidateExperience experience = new CandidateExperience();
                    experience.setCid(cid);
                    experience.setCompanyName(
                            exp.getCompany() != null && !exp.getCompany().isBlank() ? safeTruncate(exp.getCompany(), 150) : "N/A");
                    experience.setDesignation(
                            exp.getTitle() != null && !exp.getTitle().isBlank() ? safeTruncate(exp.getTitle(), 150) : "Role");
                    experience.setStatus("Previous");
                    
                    experience.setStartDate(safeParseDate(exp.getStartDate(), LocalDate.now().minusYears(1)));
                    experience.setEndDate(safeParseDate(exp.getEndDate(), null));
                    experience.setDescription(exp.getDescription());
                    experienceRepository.save(experience);
                }
            }
        }

        if (dto != null && dto.getEducations() != null && !dto.getEducations().isEmpty()) {
            try {
                List<CandidateEducation> existingEdu = candidateEducationRepository.findByCid(cid);
                if (existingEdu != null && !existingEdu.isEmpty()) {
                    candidateEducationRepository.deleteAll(existingEdu);
                }
            } catch (Exception ignored) {}

            for (ExtractedEducationDto edu : dto.getEducations()) {
                if ((edu.getDegree() != null && !edu.getDegree().isBlank()) || 
                    (edu.getInstitution() != null && !edu.getInstitution().isBlank())) {
                    CandidateEducation education = new CandidateEducation();
                    education.setCid(cid);
                    education.setEducationType(
                            edu.getDegree() != null && !edu.getDegree().isBlank() ? safeTruncate(edu.getDegree(), 50) : "Degree");
                    education.setUniversityName(
                            edu.getInstitution() != null && !edu.getInstitution().isBlank() ? safeTruncate(edu.getInstitution(), 150)
                                    : "University");
                    
                    education.setPassingYear(safeParseYear(edu.getPassoutYear(), Year.now()));
                    education.setCourseType("Full Time");
                    candidateEducationRepository.save(education);
                }
            }
        }

        if (dto != null && dto.getProjects() != null && !dto.getProjects().isEmpty()) {
            try {
                List<CandidateProject> existingProj = candidateProjectRepository.findByCid(cid);
                if (existingProj != null && !existingProj.isEmpty()) {
                    candidateProjectRepository.deleteAll(existingProj);
                }
            } catch (Exception ignored) {}

            for (ExtractedProjectDto proj : dto.getProjects()) {
                if (proj.getTitle() != null && !proj.getTitle().isBlank()) {
                    CandidateProject project = new CandidateProject();
                    project.setCid(cid);
                    project.setProjectTitle(safeTruncate(proj.getTitle(), 150));
                    project.setDescription(proj.getDescription());
                    project.setProjectUrl(safeTruncate(proj.getProjectUrl(), 255));
                    project.setStartDate(LocalDate.now().minusMonths(6));
                    project.setTechnologies(safeTruncate(proj.getTechnologies(), 255));
                    candidateProjectRepository.save(project);
                }
            }
        }

        CandidateProfileDto result = new CandidateProfileDto();
        BeanUtils.copyProperties(saved, result);
        if (saved.getGender() != null) {
            result.setGender(saved.getGender().name());
        }
        return result;
    }

    private String safeTruncate(String str, int maxLength) {
        if (str == null) return null;
        String trimmed = str.trim();
        return trimmed.length() > maxLength ? trimmed.substring(0, maxLength) : trimmed;
    }

    private LocalDate safeParseDate(String dateStr, LocalDate fallback) {
        if (dateStr == null || dateStr.isBlank()) return fallback;
        try {
            String s = dateStr.trim();
            if (s.matches("\\d{4}-\\d{2}-\\d{2}")) {
                LocalDate d = LocalDate.parse(s);
                if (d.getYear() >= 1900 && d.getYear() <= 2100) return d;
            }
            String digits = s.replaceAll("[^0-9]", "");
            if (digits.length() >= 4) {
                int y = Integer.parseInt(digits.substring(0, 4));
                if (y >= 1900 && y <= 2100) return LocalDate.of(y, 1, 1);
            }
        } catch (Exception ignored) {}
        return fallback;
    }

    private Year safeParseYear(String yearStr, Year fallback) {
        if (yearStr == null || yearStr.isBlank()) return fallback;
        try {
            String digits = yearStr.replaceAll("[^0-9]", "");
            if (digits.length() >= 4) {
                int y = Integer.parseInt(digits.substring(0, 4));
                if (y >= 1900 && y <= 2100) return Year.of(y);
            }
        } catch (Exception ignored) {}
        return fallback;
    }
}