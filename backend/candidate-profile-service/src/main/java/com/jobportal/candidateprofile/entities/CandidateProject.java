package com.jobportal.candidateprofile.entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_project")
public class CandidateProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cpid")
    private Integer cpid;

    @Column(name = "cid")
    private Integer cid;

    @Column(name = "project_title", nullable = false, length = 150)
    private String projectTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "project_url", length = 255)
    private String projectUrl;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "technologies", length = 255)
    private String technologies;

    public CandidateProject() {
    }

    public CandidateProject(Integer cpid, Integer cid, String projectTitle, String description, String projectUrl, LocalDate startDate, LocalDate endDate, String technologies) {
        this.cpid = cpid;
        this.cid = cid;
        this.projectTitle = projectTitle;
        this.description = description;
        this.projectUrl = projectUrl;
        this.startDate = startDate;
        this.endDate = endDate;
        this.technologies = technologies;
    }

    public Integer getCpid() {
        return cpid;
    }

    public void setCpid(Integer cpid) {
        this.cpid = cpid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(String projectTitle) {
        this.projectTitle = projectTitle;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectUrl() {
        return projectUrl;
    }

    public void setProjectUrl(String projectUrl) {
        this.projectUrl = projectUrl;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getTechnologies() {
        return technologies;
    }

    public void setTechnologies(String technologies) {
        this.technologies = technologies;
    }
}
