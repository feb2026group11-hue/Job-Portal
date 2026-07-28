package com.jobportal.candidateprofile.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.candidateprofile.dto.CityDto;
import com.jobportal.candidateprofile.entities.City;
import com.jobportal.candidateprofile.repository.CityRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin("*")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    // Create
    @PostMapping
    public CityDto saveCity(@RequestBody CityDto cityDTO) {

        City city = new City();
        city.setCname(cityDTO.getCname());
        city.setSid(cityDTO.getSid());

        City savedCity = cityRepository.save(city);

        return new CityDto(
                savedCity.getCid(),
                savedCity.getCname(),
                savedCity.getSid());
    }

    // Get All
    @GetMapping
    public List<CityDto> getAllCities() {

        return cityRepository.findAll()
                .stream()
                .map(city -> new CityDto(
                        city.getCid(),
                        city.getCname(),
                        city.getSid()))
                .collect(Collectors.toList());
    }
 
    // Get By Id
    @GetMapping("/{id}")
    public CityDto getCityById(@PathVariable Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City Not Found"));

        return new CityDto(
                city.getCid(),
                city.getCname(),
                city.getSid());
    }

    // Update
    @PutMapping("/{id}")
    public CityDto updateCity(@PathVariable Integer id,
                              @RequestBody CityDto cityDTO) {

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

    // Delete
    @DeleteMapping("/{id}")
    public String deleteCity(@PathVariable Integer id) {

        City city = cityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("City Not Found"));

        cityRepository.delete(city);

        return "City Deleted Successfully";
    }
}