package com.jobportal.candidateprofile.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Column(name = "resume_id")
private int resumeId;



@ManyToOne
@JoinColumn(name="cid")
private CandidateProfile candidate;


@Column(name = "summary")
private String summary;

@Column(name = "file")
private String file;

@Column(name = "isDefault")
private Boolean isDefault;

@Column(name = "updatedat")
private LocalDateTime updatedAt;

public int getResumeId() {
	return resumeId;
}

public void setResumeId(int resumeId) {
	this.resumeId = resumeId;
}

public CandidateProfile getCandidate() {
	return candidate;
}

public void setCandidate(CandidateProfile candidate) {
	this.candidate = candidate;
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

public Boolean isDefault() {
	return isDefault;
}

public void setDefault(Boolean isDefault) {
	this.isDefault = isDefault;
}

public LocalDateTime getUpdatedAt() {
	return updatedAt;
}

public void setUpdatedAt(LocalDateTime updatedAt) {
	this.updatedAt = updatedAt;
}



}
