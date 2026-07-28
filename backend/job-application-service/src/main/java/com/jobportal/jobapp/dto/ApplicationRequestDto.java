package com.jobportal.jobapp.dto;

import jakarta.validation.constraints.NotNull;

public class ApplicationRequestDto {

    @NotNull(message = "Job ID is required")
    private Integer jobId;

    @NotNull(message = "Candidate ID is required")
    private Integer candidateId;

    @NotNull(message = "Resume ID is required")
    private Integer resumeId;

    public ApplicationRequestDto() {
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
}
