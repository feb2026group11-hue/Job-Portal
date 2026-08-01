package com.jobportal.jobapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.jobapp.dto.CityDto;
import com.jobportal.jobapp.service.CityService;



@RestController
@RequestMapping("/api/cities")
@CrossOrigin("*")
public class CityController {

    @Autowired
    private CityService cityService;

    // Create
    @PostMapping
    public CityDto saveCity(@RequestBody CityDto cityDTO) {
        return cityService.saveCity(cityDTO);
    }

    // Get All
    @GetMapping
    public List<CityDto> getAllCities() {
        return cityService.getAllCities();
    }

    // Get By Id
    @GetMapping("/{id}")
    public CityDto getCityById(@PathVariable Integer id) {
        return cityService.getCityById(id);
    }

    // Update
    @PutMapping("/{id}")
    public CityDto updateCity(@PathVariable Integer id,
                              @RequestBody CityDto cityDTO) {
        return cityService.updateCity(id, cityDTO);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteCity(@PathVariable Integer id) {
        return cityService.deleteCity(id);
    }
}