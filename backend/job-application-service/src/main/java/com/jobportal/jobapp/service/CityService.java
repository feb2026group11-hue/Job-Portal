package com.jobportal.jobapp.service;

import java.util.List;

import com.jobportal.jobapp.dto.CityDto;

public interface CityService {

    CityDto saveCity(CityDto cityDTO);

    List<CityDto> getAllCities();

    CityDto getCityById(Integer id);

    CityDto updateCity(Integer id, CityDto cityDTO);

    String deleteCity(Integer id);
}