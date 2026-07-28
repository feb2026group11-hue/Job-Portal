package com.jobportal.jobapp.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "job_status")
public class JobStatus {

    @Id
    private Integer jsid;

    @Column(length = 50)
    private String status;

    public JobStatus() {
    }

    public JobStatus(Integer jsid, String status) {
        this.jsid = jsid;
        this.status = status;
    }

    public Integer getJsid() {
        return jsid;
    }

    public void setJsid(Integer jsid) {
        this.jsid = jsid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
