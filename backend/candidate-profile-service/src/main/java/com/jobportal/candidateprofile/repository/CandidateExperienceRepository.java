package com.jobportal.candidateprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateExperience;

public interface CandidateExperienceRepository extends JpaRepository<CandidateExperience, Integer> {
    List<CandidateExperience> findByCid(Integer cid);
}
