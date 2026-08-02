package com.jobportal.candidateprofile.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CandidateResumeDto {

    private int resumeId;

    @NotNull(message = "Candidate id is required")
    private Integer cid;

    @NotBlank(message = "Summary cannot be empty")
    @Size(max = 255, message = "Summary must be less than 255 characters")
    private String summary;

    // The persisted server-side path. The multipart upload is received separately.
    private String file;

    @JsonProperty("isDefault")
    private boolean isDefault;

    public int getResumeId() { return resumeId; }
    public void setResumeId(int resumeId) { this.resumeId = resumeId; }
    public Integer getCid() { return cid; }
    public void setCid(Integer cid) { this.cid = cid; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getFile() { return file; }
    public void setFile(String file) { this.file = file; }

    @JsonProperty("isDefault")
    public boolean isDefault() { return isDefault; }

    @JsonProperty("isDefault")
    public void setDefault(boolean aDefault) { isDefault = aDefault; }
}
