package com.jobportal.candidateprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.City;

public interface CityRepository extends JpaRepository<City, Integer> {

}
