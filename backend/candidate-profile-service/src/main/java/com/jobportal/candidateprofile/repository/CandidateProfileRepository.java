package com.jobportal.candidateprofile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateProfile;

public interface CandidateProfileRepository extends JpaRepository<CandidateProfile, Integer> {

	 Optional<CandidateProfile> findByUid(int uid);

	    boolean existsByUid(int uid);
}
