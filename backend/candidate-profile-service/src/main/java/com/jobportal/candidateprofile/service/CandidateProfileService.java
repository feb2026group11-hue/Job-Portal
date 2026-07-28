
package com.jobportal.candidateprofile.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateProfileDto;
import com.jobportal.candidateprofile.entities.CandidateProfile;
import com.jobportal.candidateprofile.entities.CandidateProfile.Gender;
import com.jobportal.candidateprofile.repository.CandidateProfileRepository;

@Service
public class CandidateProfileService {

    @Autowired
    private CandidateProfileRepository repository;

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
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Candidate Profile not found"));
    }

    public CandidateProfileDto update(int id, CandidateProfileDto dto) {

        CandidateProfile profile = repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Candidate Profile not found"));

        profile.setGender(Gender.valueOf(dto.getGender()));
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

        CandidateProfile profile = repository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Candidate Profile not found"));

        repository.delete(profile);

        return "Candidate Profile Deleted Successfully";
    }

}