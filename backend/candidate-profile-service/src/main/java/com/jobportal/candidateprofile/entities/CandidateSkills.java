package com.jobportal.candidateprofile.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_skills")
public class CandidateSkills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "csid")
    private Integer csId;

    @Column(name = "cid")
    private Integer cid;

    @Column(name = "skillid")
    private Integer skillId;

    @Column(name = "proficiency", nullable = false, length = 30)
    private String proficiency;

    public CandidateSkills() {
    }

    public CandidateSkills(Integer csId, Integer cid, Integer skillId, String proficiency) {
        this.csId = csId;
        this.cid = cid;
        this.skillId = skillId;
        this.proficiency = proficiency;
    }

    public Integer getCsId() {
        return csId;
    }

    public void setCsId(Integer csId) {
        this.csId = csId;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getSkillId() {
        return skillId;
    }

    public void setSkillId(Integer skillId) {
        this.skillId = skillId;
    }

    public String getProficiency() {
        return proficiency;
    }

    public void setProficiency(String proficiency) {
        this.proficiency = proficiency;
    }
}
