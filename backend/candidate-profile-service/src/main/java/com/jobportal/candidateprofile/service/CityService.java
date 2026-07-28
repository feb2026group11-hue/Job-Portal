package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.candidateprofile.dto.CityDto;
import com.jobportal.candidateprofile.entities.City;
import com.jobportal.candidateprofile.repository.CityRepository;



@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    // Save City
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

    // Get All Cities
    public List<CityDto> getAllCities() {

        return cityRepository.findAll()
                .stream()
                .map(city -> new CityDto(
                        city.getCid(),
                        city.getCname(),
                        city.getSid()))
                .collect(Collectors.toList());
    }

    // Get City By Id
    public CityDto getCityById(Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with ID: " + id));

        return new CityDto(
                city.getCid(),
                city.getCname(),
                city.getSid());
    }

    // Update City
    public CityDto updateCity(Integer id, CityDto cityDTO) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with ID: " + id));

        city.setCname(cityDTO.getCname());
        city.setSid(cityDTO.getSid());

        City updatedCity = cityRepository.save(city);

        return new CityDto(
                updatedCity.getCid(),
                updatedCity.getCname(),
                updatedCity.getSid());
    }

    // Delete City
    public String deleteCity(Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City not found with ID: " + id));

        cityRepository.delete(city);

        return "City deleted successfully.";
    }
}