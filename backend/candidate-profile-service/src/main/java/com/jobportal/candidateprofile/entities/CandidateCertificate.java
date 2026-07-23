package com.jobportal.candidateprofile.entities;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "candidate_certificate")
public class CandidateCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certi_id")
    private Integer certiId;

    @Column(name = "cid", nullable = false)
    private Integer cid;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "issued_by", nullable = false, length = 150)
    private String issuedBy;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column
    private Integer duration;

    @Column(length = 255)
    private String image;

    public CandidateCertificate() {
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