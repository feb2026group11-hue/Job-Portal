namespace JobPortal.JobApplications.DTOs;

public class JobResponseDto
{
    public int JobId { get; set; }
    public int? EmpId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public decimal? Experience { get; set; }
    public decimal? Salary { get; set; }
    public string Location { get; set; } = string.Empty;
    public int? State { get; set; }
    public int? City { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime PostedDate { get; set; }
    public DateTime? ClosedDate { get; set; }
    public string? Status { get; set; }
}
