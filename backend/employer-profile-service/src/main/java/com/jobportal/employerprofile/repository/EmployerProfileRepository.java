package com.jobportal.employerprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.employerprofile.entities.EmployerProfile;

import java.util.Optional;



public interface EmployerProfileRepository extends JpaRepository<EmployerProfile, Integer> {

    Optional<EmployerProfile> findByUserId(Integer userId);

     boolean existsByUserId(Integer userId);
		

    boolean existsByRegistrationId(String registrationId);
}
