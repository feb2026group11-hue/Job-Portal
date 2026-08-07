using System.ComponentModel.DataAnnotations;

namespace JobPortal.EmployerProfiles.DTOs;

public class EmployerProfileRequestDto
{
    [Required(ErrorMessage = "User id is required")]
    public int? UserId { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Company name is required")]
    [MaxLength(150)]
    public string CompanyName { get; set; } = string.Empty;

    [Required(AllowEmptyStrings = false, ErrorMessage = "Company email is required")]
    [EmailAddress(ErrorMessage = "Company email must be valid")]
    [MaxLength(100)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(255)]
    public string? Address { get; set; }

    [Required(ErrorMessage = "City is required")]
    public int? City { get; set; }

    [Required(ErrorMessage = "State is required")]
    public int? State { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Country is required")]
    [MaxLength(50)]
    public string Country { get; set; } = string.Empty;

    [Required(AllowEmptyStrings = false, ErrorMessage = "Registration id is required")]
    [MaxLength(100)]
    public string RegistrationId { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required(AllowEmptyStrings = false, ErrorMessage = "Industry is required")]
    [MaxLength(100)]
    public string Industry { get; set; } = string.Empty;
}
