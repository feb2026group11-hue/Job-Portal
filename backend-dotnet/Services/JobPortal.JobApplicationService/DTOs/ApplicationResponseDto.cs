namespace JobPortal.JobApplications.DTOs;

public class ApplicationResponseDto
{
    public int ApplicationId { get; set; }
    public int? JobId { get; set; }
    public int? CandidateId { get; set; }
    public int? ResumeId { get; set; }
    public DateTime ApplicationDate { get; set; }
    public int? StatusId { get; set; }
    public string? StatusName { get; set; }
}
