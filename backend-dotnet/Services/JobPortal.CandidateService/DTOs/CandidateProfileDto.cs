using System;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.CandidateService.DTOs;

public class CandidateProfileDto
{
    public int Cid { get; set; }

    [Required(ErrorMessage = "User Id is required")]
    public int Uid { get; set; }

    [Required(ErrorMessage = "Gender is required")]
    public string Gender { get; set; } = "Other";

    [Required(ErrorMessage = "Date of birth is required")]
    public DateOnly Dob { get; set; }

    [Range(0, 100, ErrorMessage = "Experience must be non-negative")]
    public float? Experience { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Current salary must be non-negative")]
    public float? CurrentSalary { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Expected salary must be non-negative")]
    public float? ExpectedSalary { get; set; }

    [MaxLength(1000, ErrorMessage = "Summary must be less than 1000 characters")]
    public string? Summary { get; set; }
}
