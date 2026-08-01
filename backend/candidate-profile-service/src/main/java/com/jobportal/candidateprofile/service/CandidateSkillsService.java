package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.jobportal.candidateprofile.dto.CandidateSkillsDto;
import com.jobportal.candidateprofile.entities.CandidateSkills;
import com.jobportal.candidateprofile.entities.Skill;
import com.jobportal.candidateprofile.repository.CandidateSkillsRepository;
import com.jobportal.candidateprofile.repository.SkillRepository;

@Service
public class CandidateSkillsService {

    @Autowired
    private CandidateSkillsRepository repository;

    @Autowired
    private SkillRepository skillRepository;

    public CandidateSkillsDto addSkill(CandidateSkillsDto dto) {
        CandidateSkills skill = new CandidateSkills();
        BeanUtils.copyProperties(dto, skill);

        CandidateSkills saved = repository.save(skill);

        CandidateSkillsDto response = new CandidateSkillsDto();
        BeanUtils.copyProperties(saved, response);

        return response;
    }

    public CandidateSkillsDto updateSkill(Integer csId, CandidateSkillsDto dto) {
        CandidateSkills skill = repository.findById(csId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidate skill not found"));

        BeanUtils.copyProperties(dto, skill, "csId");

        CandidateSkills updated = repository.save(skill);

        CandidateSkillsDto response = new CandidateSkillsDto();
        BeanUtils.copyProperties(updated, response);

        return response;
    }

    public void deleteSkill(Integer csId) {
        CandidateSkills skill = repository.findById(csId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidate skill not found"));

        repository.delete(skill);
    }

    public CandidateSkillsDto getSkillById(Integer csId) {
        CandidateSkills skill = repository.findById(csId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidate skill not found"));

        CandidateSkillsDto dto = new CandidateSkillsDto();
        BeanUtils.copyProperties(skill, dto);
        skillRepository.findById(skill.getSkillId()).ifPresent(s -> dto.setSkillName(s.getSkillName()));

        return dto;
    }

    public List<CandidateSkillsDto> getSkillsByCandidate(Integer cid) {
        return repository.findByCid(cid).stream().map(skill -> {
            CandidateSkillsDto dto = new CandidateSkillsDto();
            BeanUtils.copyProperties(skill, dto);
            skillRepository.findById(skill.getSkillId()).ifPresent(s -> dto.setSkillName(s.getSkillName()));
            return dto;
        }).collect(Collectors.toList());
    }

    public List<CandidateSkillsDto> getAllSkills() {
        return repository.findAll().stream().map(skill -> {
            CandidateSkillsDto dto = new CandidateSkillsDto();
            BeanUtils.copyProperties(skill, dto);
            skillRepository.findById(skill.getSkillId()).ifPresent(s -> dto.setSkillName(s.getSkillName()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public List<CandidateSkillsDto> saveSkillsForCandidate(Integer cid, List<String> skillNames) {
        List<CandidateSkills> existing = repository.findByCid(cid);
        repository.deleteAll(existing);

        return skillNames.stream().map(name -> {
            String cleanName = name.trim();
            if (cleanName.isEmpty()) return null;

            Skill skill = skillRepository.findBySkillName(cleanName)
                .orElseGet(() -> skillRepository.save(new Skill(null, cleanName)));

            CandidateSkills cs = new CandidateSkills(null, cid, skill.getSkillId(), "Intermediate");
            CandidateSkills saved = repository.save(cs);

            CandidateSkillsDto dto = new CandidateSkillsDto();
            BeanUtils.copyProperties(saved, dto);
            dto.setSkillName(skill.getSkillName());
            return dto;
        }).filter(java.util.Objects::nonNull).collect(Collectors.toList());
    }
}
