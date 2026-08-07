using Microsoft.EntityFrameworkCore;
using JobPortal.Shared.Data;
using JobPortal.Shared.DTOs;
using JobPortal.Shared.Entities;

namespace JobPortal.AuthService.Services;

public class UserService
{
    private readonly JobPortalDbContext _context;

    public UserService(JobPortalDbContext context)
    {
        _context = context;
    }

    public async Task<bool> AddUserAsync(UserRegisterDTO dto)
    {
        if (dto == null) throw new ArgumentNullException(nameof(dto));
        if (string.IsNullOrWhiteSpace(dto.Name)) throw new ArgumentException("Name is required");
        if (string.IsNullOrWhiteSpace(dto.Email)) throw new ArgumentException("Email is required");
        if (string.IsNullOrWhiteSpace(dto.Password)) throw new ArgumentException("Password is required");
        if (string.IsNullOrWhiteSpace(dto.Phone)) throw new ArgumentException("Phone number is required");

        var cleanEmail = dto.Email.Trim();
        var cleanPhone = dto.Phone.Trim();

        if (await _context.Users.AnyAsync(u => u.Email == cleanEmail))
        {
            throw new ArgumentException("Email is already registered");
        }

        if (await _context.Users.AnyAsync(u => u.Phone == cleanPhone))
        {
            throw new ArgumentException("Phone number is already registered");
        }

        var role = await _context.Roles.FindAsync(dto.Rid)
            ?? throw new ArgumentException($"Role not found for ID: {dto.Rid}");

        var user = new User
        {
            Name = dto.Name.Trim(),
            Email = cleanEmail,
            Phone = cleanPhone,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Address = dto.Address,
            City = dto.City,
            State = dto.State,
            Country = dto.Country,
            Rid = dto.Rid,
            Status = "Active",
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetUserByIdAsync(int uid)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Uid == uid);
    }

    public async Task<bool> UpdateUserAsync(int uid, UserRegisterDTO dto)
    {
        var user = await _context.Users.FindAsync(uid)
            ?? throw new ArgumentException("User not found");

        if (string.IsNullOrWhiteSpace(dto.Name)) throw new ArgumentException("Name is required");

        user.Name = dto.Name.Trim();

        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        user.Address = dto.Address;
        user.City = dto.City;
        user.State = dto.State;
        user.Country = dto.Country;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<User> UpdateUserDtoAsync(int id, UserDTO dto)
    {
        var user = await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Uid == id)
            ?? throw new KeyNotFoundException("User not found");

        user.Name = dto.Name;
        user.Phone = dto.Phone;
        user.Address = dto.Address;
        user.City = dto.City;
        user.State = dto.State;
        user.Country = dto.Country;

        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<bool> ChangePasswordAsync(int id, string oldPassword, string newPassword)
    {
        var user = await _context.Users.FindAsync(id)
            ?? throw new KeyNotFoundException("User not found");

        if (!BCrypt.Net.BCrypt.Verify(oldPassword, user.Password))
        {
            return false;
        }

        user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Dictionary<string, object>> GetUserCountsAsync()
    {
        var totalUsers = await _context.Users.CountAsync();
        var candidateCount = await _context.Users.CountAsync(u => u.Role != null && (u.Role.Rname == "Candidate" || u.Role.Rname == "CANDIDATE"));
        var employerCount = await _context.Users.CountAsync(u => u.Role != null && (u.Role.Rname == "Employer" || u.Role.Rname == "EMPLOYER" || u.Role.Rname == "Recruiter" || u.Role.Rname == "RECRUITER"));
        var adminCount = await _context.Users.CountAsync(u => u.Role != null && (u.Role.Rname == "Admin" || u.Role.Rname == "ADMIN"));

        return new Dictionary<string, object>
        {
            { "totalUsers", totalUsers },
            { "candidateCount", candidateCount },
            { "employerCount", employerCount },
            { "adminCount", adminCount }
        };
    }

    public async Task<List<UserDTO>> GetAllUsersAsync()
    {
        var users = await _context.Users.Include(u => u.Role).ToListAsync();
        return users.Select(u => new UserDTO(
            u.Uid,
            u.Name,
            u.Email,
            u.Phone,
            u.Address,
            u.City,
            u.State,
            u.Country,
            u.Role?.Rname ?? "N/A"
        )).ToList();
    }
}
