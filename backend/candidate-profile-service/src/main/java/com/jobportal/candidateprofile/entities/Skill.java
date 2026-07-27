package com.jobportal.candidateprofile.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "skill_table")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skillid")
    private Integer skillId;

    @Column(name = "skillname", nullable = false, unique = true, length = 100)
    private String skillName;

    public Skill() {
    }

    public Skill(Integer skillId, String skillName) {
        this.skillId = skillId;
        this.skillName = skillName;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}
