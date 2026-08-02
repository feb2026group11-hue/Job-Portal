package com.jobportal.jobapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.jobportal.jobapp.dto.StateDto;
import com.jobportal.jobapp.service.StateService;



@RestController
@RequestMapping("/api/states")
public class StateController {

    @Autowired
    private StateService stateService;

    // Create
    @PostMapping
    public StateDto saveState(@RequestBody StateDto stateDTO) {
        return stateService.saveState(stateDTO);
    }

    // Get All
    @GetMapping
    public List<StateDto> getAllStates() {
        return stateService.getAllStates();
    }

    // Get By Id
    @GetMapping("/{id}")
    public StateDto getStateById(@PathVariable Integer id) {
        return stateService.getStateById(id);
    }

    // Update
    @PutMapping("/{id}")
    public StateDto updateState(@PathVariable Integer id,
                                @RequestBody StateDto stateDTO) {
        return stateService.updateState(id, stateDTO);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteState(@PathVariable Integer id) {
        return stateService.deleteState(id);
    }
}