package com.jobportal.candidateprofile.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CandidateExperienceDto {

    private Integer expId;
    private Integer cid;
    private String companyName;
    private String designation;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal salary;
    private String description;

    public CandidateExperienceDto() {
    }

    public CandidateExperienceDto(Integer expId, Integer cid, String companyName, String designation, String status,
            LocalDate startDate, LocalDate endDate, BigDecimal salary, String description) {
        this.expId = expId;
        this.cid = cid;
        this.companyName = companyName;
        this.designation = designation;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.salary = salary;
        this.description = description;
    }

    public Integer getExpId() { return expId; }
    public void setExpId(Integer expId) { this.expId = expId; }
    public Integer getCid() { return cid; }
    public void setCid(Integer cid) { this.cid = cid; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
