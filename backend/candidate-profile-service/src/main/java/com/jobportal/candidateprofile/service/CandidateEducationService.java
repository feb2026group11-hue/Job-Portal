package com.jobportal.candidateprofile.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.candidateprofile.dto.CandidateEducationDTO;
import com.jobportal.candidateprofile.entities.CandidateEducation;
import com.jobportal.candidateprofile.repository.CandidateEducationRepository;

@Service
public class CandidateEducationService {
	
	@Autowired
    private CandidateEducationRepository repository;

    // Add
    public CandidateEducation addEducation(CandidateEducationDTO dto) {

        CandidateEducation entity = new CandidateEducation();

        BeanUtils.copyProperties(dto, entity);

        return repository.save(entity);
    }

    // Get All
    public List<CandidateEducation> getAllEducation() {
        return repository.findAll();
    }

    // Get By Id
    public CandidateEducation getEducationById(int id) {
        return repository.findById(id).orElse(null);
    }

    // Update
    public CandidateEducation updateEducation(int id, CandidateEducationDTO dto) {

        CandidateEducation entity = repository.findById(id).orElse(null);

        if (entity != null) {

            BeanUtils.copyProperties(dto, entity);
            entity.setCeid(id);

            return repository.save(entity);
        }

        return null;
    }

    // Delete
    public String deleteEducation(int id) {

        if (repository.existsById(id)) {

            repository.deleteById(id);

            return "Education Deleted Successfully";
        }
 
        return "Education Not Found";
    }
}
