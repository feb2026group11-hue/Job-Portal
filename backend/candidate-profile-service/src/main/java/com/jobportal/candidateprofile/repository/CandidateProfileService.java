package com.jobportal.candidateprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateProfile;

public interface CandidateProfileService extends JpaRepository<CandidateProfile, Integer> {

}
