package com.jobportal.jobapp.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.jobapp.dto.StateDto;
import com.jobportal.jobapp.entities.State;
import com.jobportal.jobapp.repository.StateRepository;
import com.jobportal.jobapp.service.StateService;

 

@Service
public class StateServiceImpl implements StateService {

    @Autowired
    private StateRepository stateRepository;

    @Override
    public StateDto saveState(StateDto stateDTO) {

        State state = new State();
        state.setSname(stateDTO.getSname());

        State savedState = stateRepository.save(state);

        return new StateDto(
                savedState.getSid(),
                savedState.getSname());
    }

    @Override
    public List<StateDto> getAllStates() {

        return stateRepository.findAll()
                .stream()
                .map(state -> new StateDto(
                        state.getSid(),
                        state.getSname()))
                .collect(Collectors.toList());
    }

    @Override
    public StateDto getStateById(Integer id) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State Not Found"));

        return new StateDto(
                state.getSid(),
                state.getSname());
    }

    @Override
    public StateDto updateState(Integer id, StateDto stateDTO) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State Not Found"));

        state.setSname(stateDTO.getSname());

        State updatedState = stateRepository.save(state);

        return new StateDto(
                updatedState.getSid(),
                updatedState.getSname());
    }

    @Override
    public String deleteState(Integer id) {

        State state = stateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("State Not Found"));

        stateRepository.delete(state);

        return "State Deleted Successfully";
    }
}