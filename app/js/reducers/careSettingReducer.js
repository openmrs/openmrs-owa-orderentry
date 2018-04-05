import { INPATIENT_CARESETTING, OUTPATIENT_CARESETTING } from '../actions/actionTypes';
import mockData from '../../../__mocks__/mockData';

export default (state = mockData.defaultCareSetting, action) => {
  switch (action.type) {
    case INPATIENT_CARESETTING:
      return {
        ...state,
        inpatientCareSetting: action.inpatientCareSetting,
      };

    case OUTPATIENT_CARESETTING:
      return {
        ...state,
        outpatientCareSetting: action.outpatientCareSetting,
      };
    default: return state;
  }
};
