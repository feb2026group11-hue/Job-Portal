package com.jobportal.candidateprofile.dto.ai;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractedProjectDto {
    private String title;
    private String description;
    private String projectUrl;
    private String technologies;
}
