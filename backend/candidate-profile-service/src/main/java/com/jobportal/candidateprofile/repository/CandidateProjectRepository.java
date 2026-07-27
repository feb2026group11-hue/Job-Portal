package com.jobportal.candidateprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.candidateprofile.entities.CandidateProject;

public interface CandidateProjectRepository extends JpaRepository<CandidateProject, Integer> {
    List<CandidateProject> findByCid(Integer cid);
}
