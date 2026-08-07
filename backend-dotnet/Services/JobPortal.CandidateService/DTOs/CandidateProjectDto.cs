using System;

namespace JobPortal.CandidateService.DTOs;

public class CandidateProjectDto
{
    public int Cpid { get; set; }
    public int Cid { get; set; }
    public string ProjectTitle { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ProjectUrl { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public string? Technologies { get; set; }
}
