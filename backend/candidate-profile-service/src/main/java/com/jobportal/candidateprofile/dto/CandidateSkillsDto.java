package com.jobportal.candidateprofile.dto;

public class CandidateSkillsDto {

    private Integer csId;
    private Integer cid;
    private Integer skillId;
    private String proficiency;

    public CandidateSkillsDto() {
    }

    public CandidateSkillsDto(Integer csId, Integer cid, Integer skillId, String proficiency) {
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
