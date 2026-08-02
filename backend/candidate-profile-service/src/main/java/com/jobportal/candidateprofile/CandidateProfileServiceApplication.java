package com.jobportal.candidateprofile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CandidateProfileServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CandidateProfileServiceApplication.class, args);
	}
}
