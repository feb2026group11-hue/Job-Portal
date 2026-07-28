package com.jobportal.jobapp.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class JobResponseDto {

    private Integer jobId;
    private Integer empId;
    private String title;
    private String description;
    private String role;
    private BigDecimal experience;
    private BigDecimal salary;
    private String location;
    private Integer state;
    private Integer city;
    private String type;
    private LocalDateTime postedDate;
    private LocalDateTime closedDate;
    private String status;

    public JobResponseDto() {
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public BigDecimal getExperience() {
        return experience;
    }

    public void setExperience(BigDecimal experience) {
        this.experience = experience;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getCity() {
        return city;
    }

    public void setCity(Integer city) {
        this.city = city;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public LocalDateTime getClosedDate() {
        return closedDate;
    }

    public void setClosedDate(LocalDateTime closedDate) {
        this.closedDate = closedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
