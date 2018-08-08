import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_FAILURE,
  PATIENT_CARESETTING_LOADING,
} from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.defaultCareSetting, action) => {
  switch (action.type) {
    case PATIENT_CARESETTING_SUCCESS: {
      const patientCareSetting = action.data.results;
      return {
        ...state,
        outpatientCareSetting: patientCareSetting[0],
        inpatientCareSetting: patientCareSetting[1],
      };
    }

    case PATIENT_CARESETTING_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          error: true,
          added: false,
        },
      };

    case PATIENT_CARESETTING_LOADING:
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };

    default: return state;
  }
};
