package com.jobportal.employerprofile.dto;

public class EmployerProfileResponseDto {

    private Integer employerId;
    private Integer userId;
    private String companyName;
    private String email;
    private String address;
    private Integer city;
    private Integer state;
    private String country;
    private String registrationId;
    private String description;
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
