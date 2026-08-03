package com.jobportal.candidateprofile.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "candidate_profile")
public class CandidateProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cid")
	private Integer cid;

	@Column(nullable = false, unique = true)
	private int uid;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Gender gender;

	@Column(nullable = false)
	private LocalDate dob;

	@Column
	private Float experience;

	@Column(name = "current_salary")
	private Float currentSalary;

	@Column(name = "expected_salary")
	private Float expectedSalary;

	@Column(columnDefinition = "TEXT")
	private String summary;

	public enum Gender {
		Male, Female, Other
	}

	public CandidateProfile() {

	}

	public CandidateProfile(int uid, Gender gender, LocalDate dob, Float experience, Float currentSalary,
			Float expectedSalary, String summary) {
		super();
		this.uid = uid;
		this.gender = gender;
		this.dob = dob;
		this.experience = experience;
		this.currentSalary = currentSalary;
		this.expectedSalary = expectedSalary;
		this.summary = summary;
	}

	public Integer getCid() {
		return cid;
	}

	public int getUid() {
		return uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public Float getExperience() {
		return experience;
	}

	public void setExperience(Float experience) {
		this.experience = experience;
	}

	public Float getCurrentSalary() {
		return currentSalary;
	}

	public void setCurrentSalary(Float currentSalary) {
		this.currentSalary = currentSalary;
	}

	public Float getExpectedSalary() {
		return expectedSalary;
	}

	public void setExpectedSalary(Float expectedSalary) {
		this.expectedSalary = expectedSalary;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

}
