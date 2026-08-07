using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("candidate_skills")]
public class CandidateSkills
{
    [Key]
    [Column("csid")]
    public int CsId { get; set; }

    [Required]
    [Column("cid")]
    public int Cid { get; set; }

    [Required]
    [Column("skillid")]
    public int SkillId { get; set; }

    [Required]
    [MaxLength(30)]
    [Column("proficiency")]
    public string Proficiency { get; set; } = "Intermediate";
}
