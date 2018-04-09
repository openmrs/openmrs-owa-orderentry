import { PATIENT_CARESETTING, PATIENT_CARESETTING_ERROR } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultCareSetting, action) => {
  switch (action.type) {
    case PATIENT_CARESETTING:
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
    default: return state;
  }
};
