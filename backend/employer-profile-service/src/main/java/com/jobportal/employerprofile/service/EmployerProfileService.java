package com.jobportal.employerprofile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.employerprofile.dto.EmployerProfileRequestDto;
import com.jobportal.employerprofile.dto.EmployerProfileResponseDto;
import com.jobportal.employerprofile.entities.EmployerProfile;
import com.jobportal.employerprofile.repository.EmployerProfileRepository;



@Service
public class EmployerProfileService {

    @Autowired
    private EmployerProfileRepository employerProfileRepository;

    @Transactional
    public EmployerProfileResponseDto createProfile(EmployerProfileRequestDto request) {
        if (employerProfileRepository.existsByUserId(request.getUserId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "An employer profile already exists for this user");
        }
        if (employerProfileRepository.existsByRegistrationId(request.getRegistrationId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Registration id is already in use");
        }

        EmployerProfile employerProfile = new EmployerProfile();
        copyRequest(request, employerProfile);
        return toResponse(employerProfileRepository.save(employerProfile));
    }

    @Transactional(readOnly = true)
    public EmployerProfileResponseDto getById(Integer employerId) {
        return toResponse(findEmployer(employerId));
    }

    @Transactional(readOnly = true)
    public EmployerProfileResponseDto getByUserId(Integer userId) {
        return employerProfileRepository.findByUserId(userId)
                .map(this::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Employer profile not found for user id: " + userId));
    }

    @Transactional
    public EmployerProfileResponseDto updateProfile(Integer employerId, EmployerProfileRequestDto request) {
        EmployerProfile employerProfile = findEmployer(employerId);

        if (!employerProfile.getUserId().equals(request.getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User id cannot be changed");
        }

        if (!employerProfile.getRegistrationId().equals(request.getRegistrationId())
                && employerProfileRepository.existsByRegistrationId(request.getRegistrationId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Registration id is already in use");
        }

        copyRequest(request, employerProfile);
        return toResponse(employerProfileRepository.save(employerProfile));
    }

    @Transactional
    public void deleteProfile(Integer employerId) {
        employerProfileRepository.delete(findEmployer(employerId));
    }

    private EmployerProfile findEmployer(Integer employerId) {
        return employerProfileRepository.findById(employerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Employer profile not found with id: " + employerId));
    }

    private void copyRequest(EmployerProfileRequestDto request, EmployerProfile employerProfile) {
        employerProfile.setUserId(request.getUserId());
        employerProfile.setCompanyName(request.getCompanyName().trim());
        employerProfile.setEmail(request.getEmail().trim().toLowerCase());
        employerProfile.setAddress(request.getAddress());
        employerProfile.setCity(request.getCity());
        employerProfile.setState(request.getState());
        employerProfile.setCountry(request.getCountry().trim());
        employerProfile.setRegistrationId(request.getRegistrationId().trim());
        employerProfile.setDescription(request.getDescription());
        employerProfile.setIndustry(request.getIndustry().trim());
    }

    private EmployerProfileResponseDto toResponse(EmployerProfile employerProfile) {
        EmployerProfileResponseDto response = new EmployerProfileResponseDto();
        response.setEmployerId(employerProfile.getEmployerId());
        response.setUserId(employerProfile.getUserId());
        response.setCompanyName(employerProfile.getCompanyName());
        response.setEmail(employerProfile.getEmail());
        response.setAddress(employerProfile.getAddress());
        response.setCity(employerProfile.getCity());
        response.setState(employerProfile.getState());
        response.setCountry(employerProfile.getCountry());
        response.setRegistrationId(employerProfile.getRegistrationId());
        response.setDescription(employerProfile.getDescription());
        response.setIndustry(employerProfile.getIndustry());
        return response;
    }
}
