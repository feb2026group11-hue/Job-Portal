namespace JobPortal.Shared.DTOs;

public class UserDTO
{
    public int Uid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Address { get; set; }
    public int City { get; set; }
    public int State { get; set; }
    public string Country { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public UserDTO() { }

    public UserDTO(int uid, string name, string email, string phone, string? address, int city, int state, string country, string role)
    {
        Uid = uid;
        Name = name;
        Email = email;
        Phone = phone;
        Address = address;
        City = city;
        State = state;
        Country = country;
        Role = role;
    }
}
