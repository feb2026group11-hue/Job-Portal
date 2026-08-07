using Microsoft.AspNetCore.Mvc;
using JobPortal.EmployerProfiles.DTOs;
using JobPortal.EmployerProfiles.Services;

namespace JobPortal.EmployerProfiles.Controllers;

[ApiController]
[Route("api/employers")]
public class EmployerProfileController : ControllerBase
{
    private readonly EmployerProfileService _employerProfileService;

    public EmployerProfileController(EmployerProfileService employerProfileService)
    {
        _employerProfileService = employerProfileService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateProfile([FromBody] EmployerProfileRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _employerProfileService.CreateProfileAsync(request);
        return StatusCode(StatusCodes.Status201Created, response);
    }

    [HttpGet]
    public async Task<ActionResult<List<EmployerProfileResponseDto>>> GetAllProfiles()
    {
        var response = await _employerProfileService.GetAllProfilesAsync();
        return Ok(response);
    }

    [HttpGet("{employerId:int}")]
    public async Task<ActionResult<EmployerProfileResponseDto>> GetProfile([FromRoute] int employerId)
    {
        var response = await _employerProfileService.GetByIdAsync(employerId);
        return Ok(response);
    }

    [HttpGet("user/{userId:int}")]
    public async Task<ActionResult<EmployerProfileResponseDto>> GetProfileByUser([FromRoute] int userId)
    {
        var response = await _employerProfileService.GetByUserIdAsync(userId);
        return Ok(response);
    }

    [HttpPut("{employerId:int}")]
    public async Task<ActionResult<EmployerProfileResponseDto>> UpdateProfile([FromRoute] int employerId, [FromBody] EmployerProfileRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var response = await _employerProfileService.UpdateProfileAsync(employerId, request);
        return Ok(response);
    }

    [HttpDelete("{employerId:int}")]
    public async Task<IActionResult> DeleteProfile([FromRoute] int employerId)
    {
        await _employerProfileService.DeleteProfileAsync(employerId);
        return NoContent();
    }
}
