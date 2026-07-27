package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateExperienceDto;
import com.jobportal.candidateprofile.entities.CandidateExperience;
import com.jobportal.candidateprofile.repository.CandidateExperienceRepository;

@Service
public class CandidateExperienceService {

    @Autowired
    private CandidateExperienceRepository repository;

    public CandidateExperienceDto addExperience(CandidateExperienceDto dto) {
        CandidateExperience experience = new CandidateExperience();
        BeanUtils.copyProperties(dto, experience);
        return toDto(repository.save(experience));
    }

    public CandidateExperienceDto updateExperience(Integer expId, CandidateExperienceDto dto) {
        CandidateExperience experience = repository.findById(expId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found"));

        BeanUtils.copyProperties(dto, experience, "expId");
        return toDto(repository.save(experience));
    }

    public void deleteExperience(Integer expId) {
        CandidateExperience experience = repository.findById(expId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found"));
        repository.delete(experience);
    }

    public CandidateExperienceDto getExperienceById(Integer expId) {
        CandidateExperience experience = repository.findById(expId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found"));
        return toDto(experience);
    }

    public List<CandidateExperienceDto> getExperiencesByCandidate(Integer cid) {
        return repository.findByCid(cid).stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<CandidateExperienceDto> getAllExperiences() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private CandidateExperienceDto toDto(CandidateExperience experience) {
        CandidateExperienceDto dto = new CandidateExperienceDto();
        BeanUtils.copyProperties(experience, dto);
        return dto;
    }
}
