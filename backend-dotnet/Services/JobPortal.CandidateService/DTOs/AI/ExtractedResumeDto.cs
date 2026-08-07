using System.Collections.Generic;

namespace JobPortal.CandidateService.DTOs.AI;

public class ExtractedResumeDto
{
    public string? Summary { get; set; }
    public List<string> Skills { get; set; } = new();
    public List<ExtractedExperienceDto> Experiences { get; set; } = new();
    public List<ExtractedEducationDto> Educations { get; set; } = new();
    public List<ExtractedProjectDto> Projects { get; set; } = new();
}
