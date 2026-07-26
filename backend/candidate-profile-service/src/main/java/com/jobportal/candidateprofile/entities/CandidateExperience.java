package com.jobportal.candidateprofile.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "experience")
public class CandidateExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_id")
    private Integer expId;

    @Column(name = "cid", nullable = false)
    private Integer cid;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 150)
    private String designation;

    @Column(nullable = false, length = 50)
    private String status;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(precision = 12, scale = 2)
    private BigDecimal salary;

    @Column(columnDefinition = "TEXT")
    private String description;

    public CandidateExperience() {
    }

    public CandidateExperience(Integer expId, Integer cid, String companyName, String designation, String status,
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
