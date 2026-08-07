using System.ComponentModel.DataAnnotations;

namespace JobPortal.JobApplications.DTOs;

public class JobRequestDto
{
    [Required(ErrorMessage = "Employer ID is required")]
    public int? EmpId { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Job title is required")]
    public string Title { get; set; } = string.Empty;

    [Required(AllowEmptyStrings = false, ErrorMessage = "Job description is required")]
    public string Description { get; set; } = string.Empty;

    [Required(AllowEmptyStrings = false, ErrorMessage = "Role name is required")]
    public string Role { get; set; } = string.Empty;

    public decimal? Experience { get; set; }

    public decimal? Salary { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Location is required")]
    public string Location { get; set; } = string.Empty;

    public int? State { get; set; }

    public int? City { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Job type is required (e.g. FT, PT, Intern, Contract, Remote)")]
    public string Type { get; set; } = string.Empty;

    public string? Status { get; set; }
}
