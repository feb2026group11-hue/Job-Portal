using System;

namespace JobPortal.CandidateService.DTOs;

public class CandidateExperienceDto
{
    public int ExpId { get; set; }
    public int Cid { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Designation { get; set; } = string.Empty;
    public string Status { get; set; } = "Active";
    public DateOnly StartDate { get; set; }
    public DateOnly? EndDate { get; set; }
    public decimal? Salary { get; set; }
    public string? Description { get; set; }
}
