package com.example.demo.dto;

import com.example.demo.entities.User;

public class LoginResponse {	
	UserDTO user;
	String token;	
	
	public LoginResponse() {
		super();
		// TODO Auto-generated constructor stub
	}	
	
	public LoginResponse(UserDTO user, String token) {
		super();
		this.user = user;
		this.token = token;
	}


	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
	

}
