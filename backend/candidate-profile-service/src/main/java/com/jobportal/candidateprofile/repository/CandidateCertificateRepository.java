package com.jobportal.candidateprofile.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jobportal.candidateprofile.entities.CandidateCertificate;

public interface CandidateCertificateRepository extends JpaRepository<CandidateCertificate, Integer> {
	 List<CandidateCertificate> findByCid(Integer cid);
}
