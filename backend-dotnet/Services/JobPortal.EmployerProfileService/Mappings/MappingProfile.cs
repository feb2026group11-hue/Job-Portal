using AutoMapper;
using JobPortal.EmployerProfiles.Models;
using JobPortal.EmployerProfiles.DTOs;

namespace JobPortal.EmployerProfiles.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<EmployerProfileRequestDto, EmployerProfile>()
            .ForMember(dest => dest.EmployerId, opt => opt.Ignore())
            .ForMember(dest => dest.CompanyName, opt => opt.MapFrom(src => src.CompanyName.Trim()))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email.Trim().ToLower()))
            .ForMember(dest => dest.Country, opt => opt.MapFrom(src => src.Country.Trim()))
            .ForMember(dest => dest.RegistrationId, opt => opt.MapFrom(src => src.RegistrationId.Trim()))
            .ForMember(dest => dest.Industry, opt => opt.MapFrom(src => src.Industry.Trim()));

        CreateMap<EmployerProfile, EmployerProfileResponseDto>();
    }
}
