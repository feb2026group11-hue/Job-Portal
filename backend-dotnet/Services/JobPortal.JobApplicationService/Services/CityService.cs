using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Entities;
using JobPortal.JobApplications.Exceptions;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Services;

public class CityService : ICityService
{
    private readonly ICityRepository _cityRepository;

    public CityService(ICityRepository cityRepository)
    {
        _cityRepository = cityRepository;
    }

    public async Task<CityDto> SaveCityAsync(CityDto cityDto)
    {
        var city = new City
        {
            Cname = cityDto.Cname,
            Sid = cityDto.Sid
        };

        var saved = await _cityRepository.SaveAsync(city);
        return new CityDto(saved.Cid, saved.Cname, saved.Sid);
    }

    public async Task<List<CityDto>> GetAllCitiesAsync()
    {
        var cities = await _cityRepository.GetAllAsync();
        return cities.Select(c => new CityDto(c.Cid, c.Cname, c.Sid)).ToList();
    }

    public async Task<CityDto> GetCityByIdAsync(int id)
    {
        var city = await _cityRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("City Not Found");

        return new CityDto(city.Cid, city.Cname, city.Sid);
    }

    public async Task<CityDto> UpdateCityAsync(int id, CityDto cityDto)
    {
        var city = await _cityRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("City Not Found");

        city.Cname = cityDto.Cname;
        city.Sid = cityDto.Sid;
        var updated = await _cityRepository.SaveAsync(city);
        return new CityDto(updated.Cid, updated.Cname, updated.Sid);
    }

    public async Task<string> DeleteCityAsync(int id)
    {
        var city = await _cityRepository.GetByIdAsync(id)
            ?? throw new NotFoundException("City Not Found");

        await _cityRepository.DeleteAsync(city);
        return "City Deleted Successfully";
    }
}
