package com.jobportal.candidateprofile.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.candidateprofile.entities.CandidateResume;
import com.jobportal.candidateprofile.repository.CandidateResumeRepository;

@Service
public class CandidateResumeService {

    @Autowired
    private CandidateResumeRepository resumeRepository;

    public CandidateResume saveResume(CandidateResume resume) {

        resume.setUpdatedAt(LocalDateTime.now());

        return resumeRepository.save(resume);
    }

    public List<CandidateResume> getAllResumes() {

        return resumeRepository.findAll();
    }

    public CandidateResume getResumeById(Integer id) {

        return resumeRepository.findById(id).orElse(null);
    }

    public List<CandidateResume> getResumeByCandidate(Integer cid) {

        return resumeRepository.findByCandidateCid(cid);
    }

    public CandidateResume getDefaultResume(Integer cid) {

        return resumeRepository
                .findByCandidateCidAndIsDefaultTrue(cid)
                .orElse(null);
    }

    public CandidateResume updateResume(Integer id, CandidateResume resume) {

        resume.setResumeId(id);
        resume.setUpdatedAt(LocalDateTime.now());

        return resumeRepository.save(resume);
    }

    public void deleteResume(Integer id) {

        resumeRepository.deleteById(id);
    }

}