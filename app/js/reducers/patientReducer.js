import { SET_PATIENT } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultPatient, action) => {
  switch (action.type) {
    case SET_PATIENT:
      return {
        ...state,
        patient: action.patient,
      };
    default: return state;
  }
};
