import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_ERROR,
  PATIENT_CARESETTING_LOADING,
} from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultCareSetting, action) => {
  switch (action.type) {
    case PATIENT_CARESETTING_SUCCESS:
      return {
        ...state,
        outpatientCareSetting: action.patientCareSetting[0],
        inpatientCareSetting: action.patientCareSetting[1],
      };

    case PATIENT_CARESETTING_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case PATIENT_CARESETTING_LOADING:
      return {
        ...state,
        loading: action.status,
      };

    default: return state;
  }
};
