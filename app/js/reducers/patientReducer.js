import { SET_PATIENT } from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultPatient, action) => {
  switch (action.type) {
    case SET_PATIENT:
      return {
        ...state,
        patient: action.patient,
      };
    default: return state;
  }
};
