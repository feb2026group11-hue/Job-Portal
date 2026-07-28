package com.jobportal.candidateprofile.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "city")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cid")
    private Integer cid;

    @Column(name = "cname", length = 100)
    private String cname;

    @Column(name = "sid")
    private Integer sid;

    // Default Constructor
    public City() {
    }

    // Parameterized Constructor
    public City(Integer cid, String cname, Integer sid) {
        this.cid = cid;
        this.cname = cname;
        this.sid = sid;
    }

    // Getters and Setters

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

    @Override
    public String toString() {
        return "City{" +
                "cid=" + cid +
                ", cname='" + cname + '\'' +
                ", sid=" + sid +
                '}';
    }
}