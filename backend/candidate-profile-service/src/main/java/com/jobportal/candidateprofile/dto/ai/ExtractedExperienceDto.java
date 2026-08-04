package com.jobportal.candidateprofile.dto.ai;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractedExperienceDto {
    private String title;
    private String company;
    private String startDate;
    private String endDate;
    private String description;
}
