using AutoMapper;
using System.Net;
using JobPortal.EmployerProfiles.DTOs;
using JobPortal.EmployerProfiles.Exceptions;
using JobPortal.EmployerProfiles.Interfaces;
using JobPortal.EmployerProfiles.Models;

namespace JobPortal.EmployerProfiles.Services;

public class EmployerProfileService
{
    private readonly IEmployerProfileRepository _repository;
    private readonly IMapper _mapper;

    public EmployerProfileService(IEmployerProfileRepository repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    public async Task<EmployerProfileResponseDto> CreateProfileAsync(EmployerProfileRequestDto request)
    {
        if (request.UserId.HasValue && await _repository.ExistsByUserIdAsync(request.UserId.Value))
        {
            throw new HttpStatusException(HttpStatusCode.Conflict, "An employer profile already exists for this user");
        }

        if (await _repository.ExistsByRegistrationIdAsync(request.RegistrationId))
        {
            throw new HttpStatusException(HttpStatusCode.Conflict, "Registration id is already in use");
        }

        var employerProfile = _mapper.Map<EmployerProfile>(request);
        var savedProfile = await _repository.SaveAsync(employerProfile);
        return _mapper.Map<EmployerProfileResponseDto>(savedProfile);
    }

    public async Task<EmployerProfileResponseDto> GetByIdAsync(int employerId)
    {
        var profile = await _repository.GetByIdAsync(employerId);
        if (profile == null)
        {
            throw new HttpStatusException(HttpStatusCode.NotFound, $"Employer profile not found with id: {employerId}");
        }
        return _mapper.Map<EmployerProfileResponseDto>(profile);
    }

    public async Task<List<EmployerProfileResponseDto>> GetAllProfilesAsync()
    {
        var profiles = await _repository.GetAllAsync();
        return _mapper.Map<List<EmployerProfileResponseDto>>(profiles);
    }

    public async Task<EmployerProfileResponseDto> GetByUserIdAsync(int userId)
    {
        var profile = await _repository.GetByUserIdAsync(userId);
        if (profile == null)
        {
            throw new HttpStatusException(HttpStatusCode.NotFound, $"Employer profile not found for user id: {userId}");
        }
        return _mapper.Map<EmployerProfileResponseDto>(profile);
    }

    public async Task<EmployerProfileResponseDto> UpdateProfileAsync(int employerId, EmployerProfileRequestDto request)
    {
        var profile = await _repository.GetByIdAsync(employerId);
        if (profile == null)
        {
            throw new HttpStatusException(HttpStatusCode.NotFound, $"Employer profile not found with id: {employerId}");
        }

        if (profile.UserId != request.UserId)
        {
            throw new HttpStatusException(HttpStatusCode.BadRequest, "User id cannot be changed");
        }

        if (profile.RegistrationId != request.RegistrationId && await _repository.ExistsByRegistrationIdAsync(request.RegistrationId))
        {
            throw new HttpStatusException(HttpStatusCode.Conflict, "Registration id is already in use");
        }

        _mapper.Map(request, profile);
        var savedProfile = await _repository.SaveAsync(profile);
        return _mapper.Map<EmployerProfileResponseDto>(savedProfile);
    }

    public async Task DeleteProfileAsync(int employerId)
    {
        var profile = await _repository.GetByIdAsync(employerId);
        if (profile == null)
        {
            throw new HttpStatusException(HttpStatusCode.NotFound, $"Employer profile not found with id: {employerId}");
        }
        await _repository.DeleteAsync(profile);
    }
}
