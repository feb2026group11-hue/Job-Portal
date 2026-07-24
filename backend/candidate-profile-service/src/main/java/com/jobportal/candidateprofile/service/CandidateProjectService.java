package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateProjectDto;
import com.jobportal.candidateprofile.entities.CandidateProject;
import com.jobportal.candidateprofile.repository.CandidateProjectRepository;

@Service
public class CandidateProjectService {

    @Autowired
    private CandidateProjectRepository repository;

    public CandidateProjectDto addProject(CandidateProjectDto dto) {
        CandidateProject project = new CandidateProject();
        BeanUtils.copyProperties(dto, project);

        CandidateProject saved = repository.save(project);

        CandidateProjectDto response = new CandidateProjectDto();
        BeanUtils.copyProperties(saved, response);

        return response;
    }

    public CandidateProjectDto updateProject(Integer cpid, CandidateProjectDto dto) {
        CandidateProject project = repository.findById(cpid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        BeanUtils.copyProperties(dto, project, "cpid");

        CandidateProject updated = repository.save(project);

        CandidateProjectDto response = new CandidateProjectDto();
        BeanUtils.copyProperties(updated, response);

        return response;
    }

    public void deleteProject(Integer cpid) {
        CandidateProject project = repository.findById(cpid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        repository.delete(project);
    }

    public CandidateProjectDto getProjectById(Integer cpid) {
        CandidateProject project = repository.findById(cpid)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        CandidateProjectDto dto = new CandidateProjectDto();
        BeanUtils.copyProperties(project, dto);

        return dto;
    }

    public List<CandidateProjectDto> getProjectsByCandidate(Integer cid) {
        return repository.findByCid(cid).stream().map(project -> {
            CandidateProjectDto dto = new CandidateProjectDto();
            BeanUtils.copyProperties(project, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    public List<CandidateProjectDto> getAllProjects() {
        return repository.findAll().stream().map(project -> {
            CandidateProjectDto dto = new CandidateProjectDto();
            BeanUtils.copyProperties(project, dto);
            return dto;
        }).collect(Collectors.toList());
    }
}
