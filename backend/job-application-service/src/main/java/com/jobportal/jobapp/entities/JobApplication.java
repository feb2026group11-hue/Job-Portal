package com.jobportal.jobapp.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_application")
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Integer applicationId;

    @Column(name = "job_id")
    private Integer jobId;

    @Column(name = "cid")
    private Integer candidateId;

    @Column(name = "resume_id")
    private Integer resumeId;

    @Column(name = "application_date")
    private LocalDateTime applicationDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "status")
    private JobStatus status;

    public JobApplication() {
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public Integer getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Integer candidateId) {
        this.candidateId = candidateId;
    }

    public Integer getResumeId() {
        return resumeId;
    }

    public void setResumeId(Integer resumeId) {
        this.resumeId = resumeId;
    }

    public LocalDateTime getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDateTime applicationDate) {
        this.applicationDate = applicationDate;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }
}
