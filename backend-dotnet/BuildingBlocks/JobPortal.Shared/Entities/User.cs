using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.Shared.Entities;

[Table("user")]
public class User
{
    [Key]
    [Column("uid")]
    public int Uid { get; set; }

    [Column("rid")]
    public int Rid { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(15)]
    [Column("phone")]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    [Column("password")]
    public string Password { get; set; } = string.Empty;

    [MaxLength(255)]
    [Column("address")]
    public string? Address { get; set; }

    [Column("city")]
    public int City { get; set; }

    [Column("state")]
    public int State { get; set; }

    [Required]
    [MaxLength(50)]
    [Column("country")]
    public string Country { get; set; } = string.Empty;

    [MaxLength(255)]
    [Column("image")]
    public string? Image { get; set; }

    [MaxLength(20)]
    [Column("status")]
    public string Status { get; set; } = "Active";

    [Column("createdat")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("Rid")]
    public Role? Role { get; set; }
}
