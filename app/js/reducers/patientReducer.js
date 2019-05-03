import { SET_PATIENT, SET_PATIENT_FAILED } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PATIENT:
      return {
        ...state,
        patient: action.patient,
      };
    case SET_PATIENT_FAILED:
      return {
        ...state,
        patient: [],
      };
    default: return state;
  }
};
