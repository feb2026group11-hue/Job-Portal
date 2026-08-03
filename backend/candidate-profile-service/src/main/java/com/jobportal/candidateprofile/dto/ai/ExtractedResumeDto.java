package com.jobportal.candidateprofile.dto.ai;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractedResumeDto {
    private String summary;
    private List<String> skills;
    private List<ExtractedExperienceDto> experiences;
    private List<ExtractedEducationDto> educations;
    private List<ExtractedProjectDto> projects;
}
