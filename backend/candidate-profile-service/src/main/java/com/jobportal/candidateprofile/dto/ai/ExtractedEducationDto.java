package com.jobportal.candidateprofile.dto.ai;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractedEducationDto {
    private String degree;
    private String institution;
    private String passoutYear;
}
