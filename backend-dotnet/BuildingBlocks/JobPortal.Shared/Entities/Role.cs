using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("role")]
public class Role
{
    [Key]
    [Column("rid")]
    public int Rid { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("rname")]
    public string Rname { get; set; } = string.Empty;
}
