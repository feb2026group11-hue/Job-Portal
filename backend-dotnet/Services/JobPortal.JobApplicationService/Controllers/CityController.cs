using Microsoft.AspNetCore.Mvc;
using JobPortal.JobApplications.DTOs;
using JobPortal.JobApplications.Interfaces;

namespace JobPortal.JobApplications.Controllers;

[ApiController]
[Route("api/cities")]
public class CityController : ControllerBase
{
    private readonly ICityService _cityService;

    public CityController(ICityService cityService)
    {
        _cityService = cityService;
    }

    [HttpPost]
    public async Task<ActionResult<CityDto>> SaveCity([FromBody] CityDto cityDto)
    {
        var response = await _cityService.SaveCityAsync(cityDto);
        return Ok(response);
    }

    [HttpGet]
    public async Task<ActionResult<List<CityDto>>> GetAllCities()
    {
        var response = await _cityService.GetAllCitiesAsync();
        return Ok(response);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CityDto>> GetCityById([FromRoute] int id)
    {
        var response = await _cityService.GetCityByIdAsync(id);
        return Ok(response);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<CityDto>> UpdateCity([FromRoute] int id, [FromBody] CityDto cityDto)
    {
        var response = await _cityService.UpdateCityAsync(id, cityDto);
        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<string>> DeleteCity([FromRoute] int id)
    {
        var response = await _cityService.DeleteCityAsync(id);
        return Ok(response);
    }
}
