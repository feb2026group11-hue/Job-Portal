using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("experience")]
public class CandidateExperience
{
    [Key]
    [Column("exp_id")]
    public int ExpId { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("company_name")]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("designation")]
    public string Designation { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    [Column("status")]
    public string Status { get; set; } = "Active";

    [Required]
    [Column("start_date")]
    public DateOnly StartDate { get; set; }

    [Column("end_date")]
    public DateOnly? EndDate { get; set; }

    [Column("salary")]
    public decimal? Salary { get; set; }

    [Column("description", TypeName = "TEXT")]
    public string? Description { get; set; }
}
