using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("job")]
public class Job
{
    [Key]
    [Column("job_id")]
    public int JobId { get; set; }

    [Column("emp_id")]
    public int? EmpId { get; set; }

    [Required]
    [MaxLength(150)]
    [Column("title")]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Column("description", TypeName = "TEXT")]
    public string Description { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("role")]
    public string Role { get; set; } = string.Empty;

    [Column("experience", TypeName = "decimal(18,2)")]
    public decimal? Experience { get; set; }

    [Column("salary", TypeName = "decimal(18,2)")]
    public decimal? Salary { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("location")]
    public string Location { get; set; } = string.Empty;

    [Column("state")]
    public int? State { get; set; }

    [Column("city")]
    public int? City { get; set; }

    [Required]
    [Column("type")]
    public string Type { get; set; } = string.Empty;

    [Column("posted_date")]
    public DateTime PostedDate { get; set; } = DateTime.Now;

    [Column("closed_date")]
    public DateTime? ClosedDate { get; set; }

    [MaxLength(20)]
    [Column("status")]
    public string? Status { get; set; } = "Open";
}
