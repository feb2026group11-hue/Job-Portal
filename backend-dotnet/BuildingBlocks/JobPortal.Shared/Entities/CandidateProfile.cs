using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("candidate_profile")]
public class CandidateProfile
{
    [Key]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [Column("uid")]
    public int Uid { get; set; }

    [Required]
    [Column("gender")]
    public string Gender { get; set; } = "Other";

    [Required]
    [Column("dob")]
    public DateOnly Dob { get; set; }

    [Column("experience")]
    public float? Experience { get; set; }

    [Column("current_salary")]
    public float? CurrentSalary { get; set; }

    [Column("expected_salary")]
    public float? ExpectedSalary { get; set; }

    [Column("summary", TypeName = "TEXT")]
    public string? Summary { get; set; }
}
