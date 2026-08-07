using System.ComponentModel.DataAnnotations;

namespace JobPortal.JobApplications.DTOs;

public class ApplicationRequestDto
{
    [Required(ErrorMessage = "Job ID is required")]
    public int? JobId { get; set; }

    [Required(ErrorMessage = "Candidate ID is required")]
    public int? CandidateId { get; set; }

    [Required(ErrorMessage = "Resume ID is required")]
    public int? ResumeId { get; set; }
}
