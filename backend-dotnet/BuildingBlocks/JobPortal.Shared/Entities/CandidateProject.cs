using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("candidate_project")]
public class CandidateProject
{
    [Key]
    [Column("cpid")]
    public int Cpid { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("project_title")]
    public string ProjectTitle { get; set; } = string.Empty;

    [Column("description", TypeName = "TEXT")]
    public string? Description { get; set; }

    [MaxLength(255)]
    [Column("project_url")]
    public string? ProjectUrl { get; set; }

    [Required]
    [Column("start_date")]
    public DateOnly StartDate { get; set; }

    [Column("end_date")]
    public DateOnly? EndDate { get; set; }

    [MaxLength(255)]
    [Column("technologies")]
    public string? Technologies { get; set; }
}
