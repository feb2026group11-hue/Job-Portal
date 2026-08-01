package com.jobportal.jobapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.jobapp.entities.State;

public interface StateRepository extends JpaRepository<State, Integer> {

}
