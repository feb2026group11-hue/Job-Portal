package com.jobportal.candidateprofile.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.State;

public interface StateRepository extends JpaRepository<State, Integer> {

}
