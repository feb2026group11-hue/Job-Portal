package com.jobportal.jobapp.dto;

public class CityDto {

    private Integer cid;
    private String cname;
    private Integer sid;

    public CityDto() {
    }

    public CityDto(Integer cid, String cname, Integer sid) {
        this.cid = cid;
        this.cname = cname;
        this.sid = sid;
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getCname() {
        return cname;
    }

    public void setCname(String cname) {
        this.cname = cname;
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }
}