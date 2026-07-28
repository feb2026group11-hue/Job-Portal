package com.jobportal.jobapp.repository;

import com.jobportal.jobapp.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByEmpId(Integer empId);

    List<Job> findByStatus(String status);

    @Query("SELECT j FROM Job j WHERE " +
            "(:title IS NULL OR LOWER(j.title) LIKE LOWER(CONCAT('%', :title, '%'))) AND " +
            "(:location IS NULL OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:type IS NULL OR j.type = :type) AND " +
            "(:status IS NULL OR j.status = :status)")
    List<Job> searchJobs(@Param("title") String title,
                         @Param("location") String location,
                         @Param("type") String type,
                         @Param("status") String status);
}
