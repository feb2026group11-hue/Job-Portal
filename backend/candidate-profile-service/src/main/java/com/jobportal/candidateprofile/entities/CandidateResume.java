package com.jobportal.candidateprofile.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;



@Entity
@Table(name="resume")
public class CandidateResume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="resume_id")
    private Integer resumeId;

    /*
       Many resumes belong to one candidate

       resume table:
       cid -> candidate_profile.cid
    */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cid", nullable=false)
    @JsonBackReference
    private CandidateProfile candidateProfile;

    @Column(columnDefinition="TEXT")
    private String summary;

    /*
      Stores uploaded file path

      Example:
      uploads/resumes/172343_resume.pdf
    */
    private String file;
    
    
    private Boolean isDefault;

    @Column(name="updatedat")
    private LocalDateTime updatedAt;

	public Integer getResumeId() {
		return resumeId;
	}

	public void setResumeId(Integer resumeId) {
		this.resumeId = resumeId;
	}

	public CandidateProfile getCandidateProfile() {
		return candidateProfile;
	}

	public void setCandidateProfile(CandidateProfile candidateProfile) {
		this.candidateProfile = candidateProfile;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getFile() {
		return file;
	}

	public void setFile(String file) {
		this.file = file;
	}

	public Boolean getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Boolean isDefault) {
		this.isDefault = isDefault;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
    

}