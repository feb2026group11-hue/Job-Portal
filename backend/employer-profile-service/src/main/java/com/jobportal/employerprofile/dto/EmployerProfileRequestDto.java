package com.jobportal.employerprofile.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EmployerProfileRequestDto {

    @NotNull(message = "User id is required")
    private Integer userId;

    @NotBlank(message = "Company name is required")
    @Size(max = 150)
    private String companyName;

    @NotBlank(message = "Company email is required")
    @Email(message = "Company email must be valid")
    @Size(max = 100)
    private String email;

    @Size(max = 255)
    private String address;

    @NotNull(message = "City is required")
    private Integer city;

    @NotNull(message = "State is required")
    private Integer state;

    @NotBlank(message = "Country is required")
    @Size(max = 50)
    private String country;

    @NotBlank(message = "Registration id is required")
    @Size(max = 100)
    private String registrationId;

    private String description;

    @NotBlank(message = "Industry is required")
    @Size(max = 100)
    private String industry;

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
