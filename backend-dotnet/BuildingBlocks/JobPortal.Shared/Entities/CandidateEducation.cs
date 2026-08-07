using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("candidate_education")]
public class CandidateEducation
{
    [Key]
    [Column("ceid")]
    public int Ceid { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("education_type")]
    public string EducationType { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("specialization")]
    public string? Specialization { get; set; }

    [Required]
    [Column("passing_year")]
    public int PassingYear { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("university_name")]
    public string UniversityName { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    [Column("course_type")]
    public string CourseType { get; set; } = string.Empty;

    [Column("grade")]
    public decimal? Grade { get; set; }

    [MaxLength(30)]
    [Column("duration")]
    public string? Duration { get; set; }
}
