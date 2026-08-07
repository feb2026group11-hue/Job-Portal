using JobPortal.JobApplications.DTOs;

namespace JobPortal.JobApplications.Interfaces;

public interface ICityService
{
    Task<CityDto> SaveCityAsync(CityDto cityDto);
    Task<List<CityDto>> GetAllCitiesAsync();
    Task<CityDto> GetCityByIdAsync(int id);
    Task<CityDto> UpdateCityAsync(int id, CityDto cityDto);
    Task<string> DeleteCityAsync(int id);
}
