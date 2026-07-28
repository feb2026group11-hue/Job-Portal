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

@RestController
@RequestMapping("/candidate-profile")
@Validated
@CrossOrigin(origins = "http://localhost:5173")

public class CandidateProfileController {
	
	    @Autowired
	    private CandidateProfileService service;

	    @PostMapping
	    public ResponseEntity<CandidateProfileDto> create(
	            @Valid @RequestBody CandidateProfileDto dto){

	        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
	    }

	    @GetMapping
	    public ResponseEntity<List<CandidateProfile>> getAll(){

	        return ResponseEntity.ok(service.getAll());
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<CandidateProfile> getById(@PathVariable int id){

	        return ResponseEntity.ok(service.getById(id));
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<CandidateProfileDto> update(
	            @PathVariable int id,
	            @Valid @RequestBody CandidateProfileDto dto){

	        return ResponseEntity.ok(service.update(id, dto));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> delete(@PathVariable int id){

	        return ResponseEntity.ok(service.delete(id));
	    }

	}

