using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("resume")]
public class CandidateResume
{
    [Key]
    [Column("resume_id")]
    public int ResumeId { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Column("summary", TypeName = "TEXT")]
    public string? Summary { get; set; }

    [Column("file")]
    public string? File { get; set; }

    [Column("isDefault")]
    public bool? IsDefault { get; set; }

    [Column("updatedat")]
    public DateTime? UpdatedAt { get; set; }

    [ForeignKey("Cid")]
    public CandidateProfile? CandidateProfile { get; set; }
}
