using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("skill_table")]
public class Skill
{
    [Key]
    [Column("skillid")]
    public int SkillId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("skillname")]
    public string SkillName { get; set; } = string.Empty;
}
