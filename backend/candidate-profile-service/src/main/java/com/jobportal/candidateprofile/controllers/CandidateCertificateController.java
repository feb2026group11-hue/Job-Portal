package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.CandidateCertificateDto;
import com.jobportal.candidateprofile.service.CandidateCertificateService;


@RestController
@RequestMapping("/api/certificates")
@CrossOrigin("*")
public class CandidateCertificateController {

	@Autowired
	private CandidateCertificateService service;

	@PostMapping
	public CandidateCertificateDto addCertificate(@RequestBody CandidateCertificateDto dto) {
		return service.addCertificate(dto);
	}

	@PutMapping("/{certiId}")
	public CandidateCertificateDto updateCertificate(@PathVariable Integer certiId,
			@RequestBody CandidateCertificateDto dto) {
		return service.updateCertificate(certiId, dto);
	}

	@DeleteMapping("/{certiId}")
	public String deleteCertificate(@PathVariable Integer certiId) {
		service.deleteCertificate(certiId);
		return "Certificate deleted successfully";
	}

	@GetMapping("/{certiId}")
	public CandidateCertificateDto getCertificateById(@PathVariable Integer certiId) {
		return service.getCertificateById(certiId);
	}

	@GetMapping("/candidate/{cid}")
	public List<CandidateCertificateDto> getCertificatesByCandidate(@PathVariable Integer cid) {
		return service.getCertificatesByCandidate(cid);
	}

	@GetMapping
	public List<CandidateCertificateDto> getAllCertificates() {
		return service.getAllCertificates();
	}
}
