namespace JobPortal.Shared.DTOs;

public class UserRegisterDTO
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Address { get; set; }
    public int City { get; set; }
    public int State { get; set; }
    public string Country { get; set; } = string.Empty;
    public int Rid { get; set; }
}
