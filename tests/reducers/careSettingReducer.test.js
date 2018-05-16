import {
  PATIENT_CARESETTING_SUCCESS,
  PATIENT_CARESETTING_ERROR,
  PATIENT_CARESETTING_LOADING,
} from '../../app/js/actions/actionTypes';
import careSettingReducer from '../../app/js/reducers/careSettingReducer';

describe('careSetting reducer', () => {
  it('should successfully fetch care settings', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_SUCCESS,
        patientCareSetting:[
          {},{}
        ],
    }
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.outpatientCareSetting).toEqual(action.patientCareSetting[0]);
    expect(newSate.inpatientCareSetting).toEqual(action.patientCareSetting[1]);
  });

  it('should set the caresetting fetch error', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_ERROR,
        error:'An error occured',
    }
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.error).toEqual(action.error);
  });

  it('should set the caresetting loading status', () => {
    const initialState = {};
    const action = {
        type: PATIENT_CARESETTING_LOADING,
        status:true
    }
    const newSate = careSettingReducer(initialState, action);
    expect(newSate.loading).toEqual(action.status);
  });
});
