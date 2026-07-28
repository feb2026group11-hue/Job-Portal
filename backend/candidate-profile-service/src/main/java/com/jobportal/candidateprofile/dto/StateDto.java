package com.jobportal.candidateprofile.dto;

public class StateDto {

    private Integer sid;
    private String sname;

    public StateDto() {
    }

    public StateDto(Integer sid, String sname) {
        this.sid = sid;
        this.sname = sname;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }
}