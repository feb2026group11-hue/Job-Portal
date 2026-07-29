package com.jobportal.jobapp.repository;

import com.jobportal.jobapp.entities.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

    List<JobApplication> findByCandidateId(Integer candidateId);

    List<JobApplication> findByJobId(Integer jobId);

    boolean existsByJobIdAndCandidateId(Integer jobId, Integer candidateId);
}
