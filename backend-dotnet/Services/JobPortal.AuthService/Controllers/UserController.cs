using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using JobPortal.AuthService.Services;
using JobPortal.Shared.DTOs;
using JobPortal.Shared.Services;

namespace JobPortal.AuthService.Controllers;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly JwtTokenService _jwtService;

    public UserController(UserService userService, JwtTokenService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UserRegisterDTO dto)
    {
        try
        {
            bool isRegistered = await _userService.AddUserAsync(dto);
            if (isRegistered)
            {
                return Ok(new { message = "User registered successfully", status = true });
            }
            return BadRequest(new { message = "Registration failed", status = false });
        }
        catch (ArgumentException e)
        {
            return BadRequest(new { message = e.Message, status = false });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message, status = false });
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDTO request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Email and password are required", status = false });
        }

        var user = await _userService.GetUserByEmailAsync(request.Email.Trim());
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
        {
            return Unauthorized(new { message = "Invalid email or password", status = false });
        }

        var token = _jwtService.GenerateToken(user);
        var userDto = new UserDTO(
            user.Uid,
            user.Name,
            user.Email,
            user.Phone,
            user.Address,
            user.City,
            user.State,
            user.Country,
            user.Role?.Rname ?? "USER"
        );

        var response = new LoginResponse(userDto, token);
        return Ok(response);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> GetAuthenticatedUser()
    {
        var email = User.FindFirstValue(ClaimTypes.Email) ?? User.FindFirstValue(ClaimTypes.Name);
        if (string.IsNullOrEmpty(email))
        {
            return Unauthorized(new { message = "Unauthorized access" });
        }

        var user = await _userService.GetUserByEmailAsync(email);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var userDto = new UserDTO(
            user.Uid,
            user.Name,
            user.Email,
            user.Phone,
            user.Address,
            user.City,
            user.State,
            user.Country,
            user.Role?.Rname ?? "USER"
        );

        return Ok(userDto);
    }

    [HttpGet("{uid:int}")]
    public async Task<IActionResult> GetUserById(int uid)
    {
        var user = await _userService.GetUserByIdAsync(uid);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var userDto = new UserDTO(
            user.Uid,
            user.Name,
            user.Email,
            user.Phone,
            user.Address,
            user.City,
            user.State,
            user.Country,
            user.Role?.Rname ?? "USER"
        );

        return Ok(userDto);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDTO userDto)
    {
        try
        {
            var user = await _userService.UpdateUserDtoAsync(id, userDto);
            var responseDto = new UserDTO(
                user.Uid,
                user.Name,
                user.Email,
                user.Phone,
                user.Address,
                user.City,
                user.State,
                user.Country,
                user.Role?.Rname ?? "USER"
            );
            return Ok(responseDto);
        }
        catch (KeyNotFoundException)
        {
            return NotFound(new { message = "User not found" });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }

    [HttpPut("update/{uid:int}")]
    public async Task<IActionResult> UpdateUserRegister(int uid, [FromBody] UserRegisterDTO userRegisterDto)
    {
        try
        {
            bool isUpdated = await _userService.UpdateUserAsync(uid, userRegisterDto);
            if (isUpdated)
            {
                return Ok(new { message = "User updated successfully", status = true });
            }
            return BadRequest(new { message = "User update failed", status = false });
        }
        catch (ArgumentException e)
        {
            return BadRequest(new { message = e.Message, status = false });
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message, status = false });
        }
    }

    [HttpPut("{id:int}/change-password")]
    public async Task<IActionResult> ChangePassword(int id, [FromQuery] string oldPassword, [FromQuery] string newPassword)
    {
        try
        {
            bool success = await _userService.ChangePasswordAsync(id, oldPassword, newPassword);
            return Ok(success);
        }
        catch (KeyNotFoundException)
        {
            return NotFound(false);
        }
    }

    [HttpGet("counts")]
    public async Task<IActionResult> GetUserCounts()
    {
        var counts = await _userService.GetUserCountsAsync();
        return Ok(counts);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }
}
