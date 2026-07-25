package com.jobportal.candidateprofile.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity 
@Table(name = "candidate_education")
public class CandidateEducation {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ceid")
	    private int ceid;

	    @Column(name = "cid", nullable = false)
	    private int cid;

	    @Column(name = "education_type", nullable = false, length = 50)
	    private String educationType;

	    @Column(name = "specialization", length = 100)
	    private String specialization;

	    @Column(name = "passing_year", nullable = false)
	    private java.time.Year passingYear;

	    @Column(name = "university_name", nullable = false, length = 150)
	    private String universityName;

	    @Column(name = "course_type", nullable = false, length = 20)
	    private String courseType;

	    @Column(name = "grade", precision = 5, scale = 2)
	    private BigDecimal grade;

	    @Column(name = "duration", length = 30)
	    private String duration;

	    // Default Constructor
	    public CandidateEducation() {
	    }

	    // Parameterized Constructor
	    public CandidateEducation(int ceid, int cid, String educationType,
	            String specialization, java.time.Year passingYear,
	            String universityName, String courseType,
	            BigDecimal grade, String duration) {

	        this.ceid = ceid;
	        this.cid = cid;
	        this.educationType = educationType;
	        this.specialization = specialization;
	        this.passingYear = passingYear;
	        this.universityName = universityName;
	        this.courseType = courseType;
	        this.grade = grade;
	        this.duration = duration;
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

	    public java.time.Year getPassingYear() {
	        return passingYear;
	    }

	    public void setPassingYear(java.time.Year passingYear) {
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

	    @Override
	    public String toString() {
	        return "CandidateEducationEntity{" +
	                "ceid=" + ceid +
	                ", cid=" + cid +
	                ", educationType='" + educationType + '\'' +
	                ", specialization='" + specialization + '\'' +
	                ", passingYear=" + passingYear +
	                ", universityName='" + universityName + '\'' +
	                ", courseType='" + courseType + '\'' +
	                ", grade=" + grade +
	                ", duration='" + duration + '\'' +
	                '}';
	    }

}
