namespace JobPortal.JobApplications.DTOs;

public class StateDto
{
    public int? Sid { get; set; }
    public string? Sname { get; set; }

    public StateDto() { }

    public StateDto(int? sid, string? sname)
    {
        Sid = sid;
        Sname = sname;
    }
}
