using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.JobApplications.Entities;

[Table("job_status")]
public class JobStatus
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    [Column("jsid")]
    public int Jsid { get; set; }

    [MaxLength(50)]
    [Column("status")]
    public string? Status { get; set; }

    public JobStatus() { }

    public JobStatus(int jsid, string? status)
    {
        Jsid = jsid;
        Status = status;
    }
}
