package com.jobportal.candidateprofile.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.CandidateProfileDto;
import com.jobportal.candidateprofile.entities.CandidateProfile;
import com.jobportal.candidateprofile.service.CandidateProfileService;

import jakarta.validation.Valid;

import com.jobportal.candidateprofile.dto.ai.ExtractedResumeDto;

@RestController
@Validated
public class CandidateProfileController {

	@Autowired
	private CandidateProfileService service;

	@PostMapping("/candidate-profile")
	public ResponseEntity<CandidateProfileDto> create(
			@Valid @RequestBody CandidateProfileDto dto) {

		return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
	}

	@PostMapping({ "/api/candidate/me/save-parsed-profile", "/candidate-profile/me/save-parsed-profile" })
	public ResponseEntity<CandidateProfileDto> saveMyParsedProfile(
			@RequestHeader(value = "Authorization", required = false) String tokenHeader,
			@RequestHeader(value = "X-User-Id", required = false) Integer headerUid,
			@RequestParam(value = "uid", required = false) Integer paramUid,
			@RequestBody ExtractedResumeDto dto) {
		Integer uid = extractUid(tokenHeader, headerUid, paramUid);
		return ResponseEntity.ok(service.saveParsedProfileByUid(uid, dto));
	}

	private Integer extractUid(String tokenHeader, Integer headerUid, Integer paramUid) {
		if (headerUid != null) {
			return headerUid;
		}
		if (paramUid != null) {
			return paramUid;
		}
		if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
			try {
				String token = tokenHeader.substring(7);
				String[] parts = token.split("\\.");
				if (parts.length >= 2) {
					String payloadJson = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
					com.fasterxml.jackson.databind.JsonNode node = new com.fasterxml.jackson.databind.ObjectMapper()
							.readTree(payloadJson);
					if (node.has("uid")) {
						return node.get("uid").asInt();
					}
					if (node.has("sub")) {
						String sub = node.get("sub").asText();
						try {
							return Integer.parseInt(sub);
						} catch (NumberFormatException ignored) {
						}
					}
				}
			} catch (Exception ignored) {
			}
		}
		return 1;
	}

	@GetMapping("/candidate-profile")
	public ResponseEntity<List<CandidateProfile>> getAll() {

		return ResponseEntity.ok(service.getAll());
	}

	@GetMapping("/candidate-profile/{id}")
	public ResponseEntity<CandidateProfile> getById(@PathVariable int id) {

		return ResponseEntity.ok(service.getById(id));
	}

	@PutMapping("/candidate-profile/{id}")
	public ResponseEntity<CandidateProfileDto> update(
			@PathVariable int id,
			@Valid @RequestBody CandidateProfileDto dto) {

		return ResponseEntity.ok(service.update(id, dto));
	}

	@DeleteMapping("/candidate-profile/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {

		return ResponseEntity.ok(service.delete(id));
	}

	@GetMapping("/candidate-profile/cid/{cid}")
	public ResponseEntity<CandidateProfile> getByCid(@PathVariable int cid) {
		return ResponseEntity.ok(service.getByCid(cid));
	}

}
