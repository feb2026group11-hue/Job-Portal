namespace JobPortal.CandidateService.DTOs;

public class CandidateSkillsDto
{
    public int CsId { get; set; }
    public int Cid { get; set; }
    public int SkillId { get; set; }
    public string Proficiency { get; set; } = "Intermediate";
    public string? SkillName { get; set; }
}
