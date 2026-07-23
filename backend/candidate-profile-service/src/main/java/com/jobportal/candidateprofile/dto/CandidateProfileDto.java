package com.jobportal.candidateprofile.dto;
import java.time.LocalDate;

import jakarta.validation.constraints.*;

public class CandidateProfileDto {

    private int cid;

    @NotNull(message = "User Id is required")
    private Integer uid;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Date of birth is required")
    @Past(message = "DOB must be in the past")
    private LocalDate dob;

    @DecimalMin(value = "0.0")
    private Float experience;

    @PositiveOrZero
    private Float currentSalary;

    @PositiveOrZero
    private Float expectedSalary;

    @Size(max = 1000)
    private String summary;

    public CandidateProfileDto() {
    }

	public int getCid() {
		return cid;
	}

	public Integer getUid() {
		return uid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}


	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
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