package com.jobportal.candidateprofile.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.candidateprofile.dto.StateDto;
import com.jobportal.candidateprofile.entities.State;
import com.jobportal.candidateprofile.repository.StateRepository;



@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    // Save State
    public StateDto saveState(StateDto stateDTO) {

        State state = new State();
        state.setSname(stateDTO.getSname());

        State savedState = stateRepository.save(state);

        return new StateDto(
                savedState.getSid(),
                savedState.getSname());
    }

    // Get All States
    public List<StateDto> getAllStates() {

        return stateRepository.findAll()
                .stream()
                .map(state -> new StateDto(
                        state.getSid(),
                        state.getSname()))
                .collect(Collectors.toList());
    }

    // Get State By Id
    public StateDto getStateById(Integer id) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State not found with ID: " + id));

        return new StateDto(
                state.getSid(),
                state.getSname());
    }

    // Update State
    public StateDto updateState(Integer id, StateDto stateDTO) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State not found with ID: " + id));

        state.setSname(stateDTO.getSname());

        State updatedState = stateRepository.save(state);

        return new StateDto(
                updatedState.getSid(),
                updatedState.getSname());
    }

    // Delete State
    public String deleteState(Integer id) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State not found with ID: " + id));

        stateRepository.delete(state);

        return "State deleted successfully.";
    }
}