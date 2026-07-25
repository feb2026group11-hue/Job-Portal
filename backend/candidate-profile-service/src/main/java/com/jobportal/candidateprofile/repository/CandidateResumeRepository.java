package com.jobportal.candidateprofile.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateResume;

public interface CandidateResumeRepository extends JpaRepository<CandidateResume, Integer> {

    List<CandidateResume> findByCandidateProfileCid(Integer cid);

    Optional<CandidateResume> findByCandidateProfileCidAndIsDefaultTrue(Integer cid);

}