package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateCertificateDto;
import com.jobportal.candidateprofile.entities.CandidateCertificate;
import com.jobportal.candidateprofile.repository.CandidateCertificateRepository;

@Service
public class CandidateCertificateService {
	@Autowired
	private CandidateCertificateRepository repository;

	public CandidateCertificateDto addCertificate(CandidateCertificateDto dto) {

		CandidateCertificate certificate = new CandidateCertificate();
		BeanUtils.copyProperties(dto, certificate);

		CandidateCertificate saved = repository.save(certificate);

		CandidateCertificateDto response = new CandidateCertificateDto();
		BeanUtils.copyProperties(saved, response);

		return response;
	}

	public CandidateCertificateDto updateCertificate(Integer certiId, CandidateCertificateDto dto) {

		CandidateCertificate certificate = repository.findById(certiId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Certificate not found"));

		BeanUtils.copyProperties(dto, certificate, "certiId");

		CandidateCertificate updated = repository.save(certificate);

		CandidateCertificateDto response = new CandidateCertificateDto();
		BeanUtils.copyProperties(updated, response);

		return response;
	}

	public void deleteCertificate(Integer certiId) {

		CandidateCertificate certificate = repository.findById(certiId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Certificate not found"));

		repository.delete(certificate);
	}

	public CandidateCertificateDto getCertificateById(Integer certiId) {

		CandidateCertificate certificate = repository.findById(certiId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Certificate not found"));

		CandidateCertificateDto dto = new CandidateCertificateDto();
		BeanUtils.copyProperties(certificate, dto);

		return dto;
	}

	public List<CandidateCertificateDto> getCertificatesByCandidate(Integer cid) {

		return repository.findByCid(cid).stream().map(certificate -> {
			CandidateCertificateDto dto = new CandidateCertificateDto();
			BeanUtils.copyProperties(certificate, dto);
			return dto;
		}).collect(Collectors.toList());
	}

	public List<CandidateCertificateDto> getAllCertificates() {

		return repository.findAll().stream().map(certificate -> {
			CandidateCertificateDto dto = new CandidateCertificateDto();
			BeanUtils.copyProperties(certificate, dto);
			return dto;
		}).collect(Collectors.toList());
	}
}
