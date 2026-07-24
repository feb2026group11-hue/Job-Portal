package com.jobportal.candidateprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.candidateprofile.entities.CandidateSkills;

public interface CandidateSkillsRepository extends JpaRepository<CandidateSkills, Integer> {
    List<CandidateSkills> findByCid(Integer cid);
    List<CandidateSkills> findBySkillId(Integer skillId);
}
