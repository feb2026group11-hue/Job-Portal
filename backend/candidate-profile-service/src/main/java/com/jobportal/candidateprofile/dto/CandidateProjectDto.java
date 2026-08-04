package com.jobportal.candidateprofile.dto;

import java.time.LocalDate;

public class CandidateProjectDto {

    private Integer cpid;
    private Integer cid;
    private String projectTitle;
    private String description;
    private String projectUrl;
    private LocalDate startDate;
    private LocalDate endDate;
    private String technologies;

    public CandidateProjectDto() {
    }

    public CandidateProjectDto(Integer cpid, Integer cid, String projectTitle, String description, String projectUrl, LocalDate startDate, LocalDate endDate, String technologies) {
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
