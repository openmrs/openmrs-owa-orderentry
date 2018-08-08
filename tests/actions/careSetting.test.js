import fetchPatientCareSetting from '../../app/js/actions/careSetting';
import {
    PATIENT_CARESETTING_LOADING,
    PATIENT_CARESETTING_SUCCESS,
    NETWORK_ERROR,
} from '../../app/js/actions/actionTypes';

describe('fetchPatientCareSetting action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it(`creates PATIENT_CARESETTING_LOADING and PATIENT_CARESETTING_SUCCESS
    action types upon success response from server`, async (done) => {
      moxios.stubRequest(`${apiBaseUrl}/caresetting`, {
        status: 200,
      });
  
      const expectedTypes = [
        PATIENT_CARESETTING_LOADING,
        PATIENT_CARESETTING_SUCCESS,
      ];
      
      const store = mockStore({});
      return store.dispatch(fetchPatientCareSetting()).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedTypes);
        done();
      });
    });
  });