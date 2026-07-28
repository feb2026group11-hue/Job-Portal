package com.jobportal.candidateprofile.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "state")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sid")
    private Integer sid;

    @Column(name = "sname", length = 100)
    private String sname;

    // Default Constructor
    public State() {
    }

    // Parameterized Constructor
    public State(Integer sid, String sname) {
        this.sid = sid;
        this.sname = sname;
    }

    // Getters and Setters

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

    @Override
    public String toString() {
        return "State [sid=" + sid + ", sname=" + sname + "]";
    }

}