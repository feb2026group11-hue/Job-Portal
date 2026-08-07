using System;
using System.ComponentModel.DataAnnotations;

namespace JobPortal.CandidateService.DTOs;

public class CandidateEducationDTO
{
    public int Ceid { get; set; }
    public int Cid { get; set; }
    public string EducationType { get; set; } = string.Empty;
    public string? Specialization { get; set; }
    public int PassingYear { get; set; }
    public string UniversityName { get; set; } = string.Empty;
    public string CourseType { get; set; } = string.Empty;
    public decimal? Grade { get; set; }
    public string? Duration { get; set; }
}
