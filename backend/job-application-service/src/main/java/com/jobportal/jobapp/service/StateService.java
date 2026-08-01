package com.jobportal.jobapp.service;

import java.util.List;

import com.jobportal.jobapp.dto.StateDto;


public interface StateService {

    StateDto saveState(StateDto stateDTO);

    List<StateDto> getAllStates();

    StateDto getStateById(Integer id);

    StateDto updateState(Integer id, StateDto stateDTO);

    String deleteState(Integer id);

}