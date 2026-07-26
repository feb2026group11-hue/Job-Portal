package com.jobportal.candidateprofile.dto;

import java.math.BigDecimal;
import java.time.Year;

public class CandidateEducationDTO {
	private int ceid;
    private int cid;
    private String educationType;
    private String specialization;
    private Year passingYear;
    private String universityName;
    private String courseType;
    private BigDecimal grade;
    private String duration;

    public CandidateEducationDTO() {
    }

    public int getCeid() {
        return ceid;
    }

    public void setCeid(int ceid) {
        this.ceid = ceid;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
    }

    public String getEducationType() {
        return educationType;
    }

    public void setEducationType(String educationType) {
        this.educationType = educationType;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Year getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Year passingYear) {
        this.passingYear = passingYear;
    }

    public String getUniversityName() {
        return universityName;
    }

    public void setUniversityName(String universityName) {
        this.universityName = universityName;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }

    public BigDecimal getGrade() {
        return grade;
    }

    public void setGrade(BigDecimal grade) {
        this.grade = grade;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
}
