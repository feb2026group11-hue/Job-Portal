package com.jobportal.candidateprofile.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateEducation;

public interface CandidateEducationRepository extends JpaRepository<CandidateEducation, Integer> {
    List<CandidateEducation> findByCid(int cid);
}
