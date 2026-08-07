using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("job_application")]
public class JobApplication
{
    [Key]
    [Column("application_id")]
    public int ApplicationId { get; set; }

    [Column("job_id")]
    public int? JobId { get; set; }

    [Column("cid")]
    public int? CandidateId { get; set; }

    [Column("resume_id")]
    public int? ResumeId { get; set; }

    [Column("application_date")]
    public DateTime ApplicationDate { get; set; } = DateTime.Now;

    [Column("status")]
    public int? StatusId { get; set; }

    [ForeignKey("StatusId")]
    public JobStatus? Status { get; set; }
}
