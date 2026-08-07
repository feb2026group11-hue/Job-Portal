using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JobPortal.EmployerProfiles.Models;

[Table("employer_profile")]
public class EmployerProfile
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("emp_id")]
    public int EmployerId { get; set; }

    [Column("uid")]
    [Required]
    public int UserId { get; set; }

    [Column("company_name")]
    [Required]
    [MaxLength(150)]
    public string CompanyName { get; set; } = string.Empty;

    [Column("email")]
    [Required]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Column("address")]
    [MaxLength(255)]
    public string? Address { get; set; }

    [Column("city")]
    [Required]
    public int City { get; set; }

    [Column("state")]
    [Required]
    public int State { get; set; }

    [Column("country")]
    [Required]
    [MaxLength(50)]
    public string Country { get; set; } = string.Empty;

    [Column("registration_id")]
    [Required]
    [MaxLength(100)]
    public string RegistrationId { get; set; } = string.Empty;

    [Column("description", TypeName = "TEXT")]
    public string? Description { get; set; }

    [Column("industry")]
    [Required]
    [MaxLength(100)]
    public string Industry { get; set; } = string.Empty;
}
