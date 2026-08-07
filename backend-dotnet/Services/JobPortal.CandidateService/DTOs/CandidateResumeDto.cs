using System;

namespace JobPortal.CandidateService.DTOs;

public class CandidateResumeDto
{
    public int ResumeId { get; set; }
    public int Cid { get; set; }
    public string Summary { get; set; } = string.Empty;
    public string? File { get; set; }
    public bool IsDefault { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
