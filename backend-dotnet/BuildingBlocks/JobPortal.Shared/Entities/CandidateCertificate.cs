using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("candidate_certificate")]
public class CandidateCertificate
{
    [Key]
    [Column("certi_id")]
    public int CertiId { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("issued_by")]
    public string IssuedBy { get; set; } = string.Empty;

    [Required]
    [Column("issue_date")]
    public DateOnly IssueDate { get; set; }

    [Column("expiry_date")]
    public DateOnly? ExpiryDate { get; set; }

    [Column("duration")]
    public int? Duration { get; set; }

    [MaxLength(255)]
    [Column("image")]
    public string? Image { get; set; }
}
