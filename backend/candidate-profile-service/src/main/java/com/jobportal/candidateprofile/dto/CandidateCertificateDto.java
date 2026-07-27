package com.jobportal.candidateprofile.dto;

import java.time.LocalDate;

public class CandidateCertificateDto {

    private Integer certiId;
    private Integer cid;
    private String name;
    private String issuedBy;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private Integer duration;
    private String image;

    public CandidateCertificateDto() {
    }

    public Integer getCertiId() {
        return certiId;
    }

    public void setCertiId(Integer certiId) {
        this.certiId = certiId;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIssuedBy() {
        return issuedBy;
    }

    public void setIssuedBy(String issuedBy) {
        this.issuedBy = issuedBy;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}