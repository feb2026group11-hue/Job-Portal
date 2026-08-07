namespace JobPortal.Shared.DTOs;

public class LoginResponse
{
    public UserDTO User { get; set; } = null!;
    public string Token { get; set; } = string.Empty;

    public LoginResponse() { }

    public LoginResponse(UserDTO user, string token)
    {
        User = user;
        Token = token;
    }
}
