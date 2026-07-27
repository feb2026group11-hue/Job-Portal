package com.jobportal.candidateprofile.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.jobportal.candidateprofile.entities.Skill;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    Optional<Skill> findBySkillName(String skillName);
    boolean existsBySkillName(String skillName);
}
