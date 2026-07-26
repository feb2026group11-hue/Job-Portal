package com.jobportal.candidateprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateEducation;

public interface CandidateEducationRepository extends JpaRepository<CandidateEducation, Integer> {

}
