package com.jobportal.jobapp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.jobapp.dto.CityDto;
import com.jobportal.jobapp.entities.City;
import com.jobportal.jobapp.repository.CityRepository;
import com.jobportal.jobapp.service.CityService;



@Service
public class CityServiceImpl implements CityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public CityDto saveCity(CityDto cityDTO) {

        City city = new City();
        city.setCname(cityDTO.getCname());
        city.setSid(cityDTO.getSid());

        City savedCity = cityRepository.save(city);

        return new CityDto(
                savedCity.getCid(),
                savedCity.getCname(),
                savedCity.getSid());
    }

    @Override
    public List<CityDto> getAllCities() {

        return cityRepository.findAll()
                .stream()
                .map(city -> new CityDto(
                        city.getCid(),
                        city.getCname(),
                        city.getSid()))
                .collect(Collectors.toList());
    }

    @Override
    public CityDto getCityById(Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City Not Found"));

        return new CityDto(
                city.getCid(),
                city.getCname(),
                city.getSid());
    }

    @Override
    public CityDto updateCity(Integer id, CityDto cityDTO) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City Not Found"));

        city.setCname(cityDTO.getCname());
        city.setSid(cityDTO.getSid());

        City updatedCity = cityRepository.save(city);

        return new CityDto(
                updatedCity.getCid(),
                updatedCity.getCname(),
                updatedCity.getSid());
    }

    @Override
    public String deleteCity(Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City Not Found"));

        cityRepository.delete(city);

        return "City Deleted Successfully";
    }
}