package com.jobportal.employerprofile.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "employer_profile")
public class EmployerProfile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "emp_id")
	private Integer employerId;
	
	@Column(name = "uid", nullable = false, unique = true )
	private Integer userId;
	
	@Column(name = "company_name", nullable = false, length = 150)
	private String companyName;
	
	@Column(nullable = false, length = 150)
	private String email;
	
	@Column(length = 255)
	private String address;
	
	@Column(nullable = false)
	private Integer city;
	
	@Column(nullable = false)
	private Integer state;
	
	@Column(nullable = false, length = 50)
	private String country;
	
	@Column(name = "registration_id", nullable = false, unique = true, length = 100)
	private String registrationId;
	
	@Column(columnDefinition = "TEXT")
	private String description;
	
	@Column(nullable = false, length = 100)
	private String industry;
	
	
	public Integer getEmployerId() { return employerId; }
    public void setEmployerId(Integer employerId) { this.employerId = employerId; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public Integer getCity() { return city; }
    public void setCity(Integer city) { this.city = city; }
    public Integer getState() { return state; }
    public void setState(Integer state) { this.state = state; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getRegistrationId() { return registrationId; }
    public void setRegistrationId(String registrationId) { this.registrationId = registrationId; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; } 	
	
}
