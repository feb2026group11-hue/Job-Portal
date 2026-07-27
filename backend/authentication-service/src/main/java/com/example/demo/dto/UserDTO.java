package com.example.demo.dto;

public class UserDTO {

    // User Id
    private int uid;

    // Full Name
    private String name;

    // Email (used for login)
    private String email;

    // Contact Number
    private String phone;

    // Address
    private String address;

    // City Id
    private int city;

    // State Id
    private int state;

    // Country
    private String country;

    // Role Name (ADMIN, CANDIDATE, RECRUITER)
    private String role;

    public UserDTO() {
    }

    public UserDTO(int uid, String name, String email, String phone,
                   String address, int city, int state,
                   String country, String role) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.country = country;
        this.role = role;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCity() {
        return city;
    }

    public void setCity(int city) {
        this.city = city;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}