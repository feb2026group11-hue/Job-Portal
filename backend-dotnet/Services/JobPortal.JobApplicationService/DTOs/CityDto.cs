namespace JobPortal.JobApplications.DTOs;

public class CityDto
{
    public int? Cid { get; set; }
    public string? Cname { get; set; }
    public int? Sid { get; set; }

    public CityDto() { }

    public CityDto(int? cid, string? cname, int? sid)
    {
        Cid = cid;
        Cname = cname;
        Sid = sid;
    }
}
