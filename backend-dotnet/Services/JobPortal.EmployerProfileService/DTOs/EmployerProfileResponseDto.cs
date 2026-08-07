namespace JobPortal.EmployerProfiles.DTOs;

public class EmployerProfileResponseDto
{
    public int EmployerId { get; set; }
    public int UserId { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Address { get; set; }
    public int City { get; set; }
    public int State { get; set; }
    public string Country { get; set; } = string.Empty;
    public string RegistrationId { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Industry { get; set; } = string.Empty;
}
