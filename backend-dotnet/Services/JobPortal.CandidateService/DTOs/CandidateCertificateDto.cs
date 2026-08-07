using System;

namespace JobPortal.CandidateService.DTOs;

public class CandidateCertificateDto
{
    public int CertiId { get; set; }
    public int Cid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string IssuedBy { get; set; } = string.Empty;
    public DateOnly IssueDate { get; set; }
    public DateOnly? ExpiryDate { get; set; }
    public int? Duration { get; set; }
    public string? Image { get; set; }
}
