package com.jobportal.jobapp.repository;

import com.jobportal.jobapp.entities.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobStatusRepository extends JpaRepository<JobStatus, Integer> {
}
