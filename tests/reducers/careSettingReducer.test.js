import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_FAILURE,
  PATIENT_CARESETTING_LOADING,
} from '../../app/js/actions/actionTypes';
import careSettingReducer from '../../app/js/reducers/careSettingReducer';

describe('careSetting reducer', () => {
  it('should successfully fetch care settings', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_SUCCESS,
        data:{
          results: [
            {},{}
         ],
        },
    };
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.outpatientCareSetting).toEqual(action.data.results[0]);
    expect(newSate.inpatientCareSetting).toEqual(action.data.results[1]);
  });

  it('should set the caresetting fetch error', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_FAILURE,
        payload:'An error occured',
    }
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.errorMessage).toEqual(action.payload);
  });

  it('should set the caresetting loading status', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_LOADING,
    }
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.status.loading).toEqual(true);
  });
});
