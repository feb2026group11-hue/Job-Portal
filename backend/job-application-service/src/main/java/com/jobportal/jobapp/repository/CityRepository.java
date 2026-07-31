package com.jobportal.jobapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.jobapp.entities.City;

public interface CityRepository extends JpaRepository<City, Integer> {

}
