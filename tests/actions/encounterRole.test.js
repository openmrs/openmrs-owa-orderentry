import fetchEncounterRole from '../../app/js/actions/encounterRole';
import {
    FETCH_ENCOUNTER_ROLE_LOADING,
    FETCH_ENCOUNTER_ROLE_SUCCESS,
  } from '../../app/js/actions/actionTypes';

const encounterRole = mockData.encounterRole;
const value = "Order Signer";

describe('fetchEncounterRole action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it(`creates FETCH_ENCOUNTER_ROLE_LOADING and FETCH_ENCOUNTER_ROLE_SUCCESS
    action types upon success response from server`, async (done) => {
      moxios.stubRequest(
        `${apiBaseUrl}/encounterrole?q=${value}`,
        {
          status: 200,
          response: encounterRole,
        },
      );
  
      const expectedTypes = [
        FETCH_ENCOUNTER_ROLE_LOADING,
        FETCH_ENCOUNTER_ROLE_SUCCESS,
      ];
      const store = mockStore({});
  
      return store.dispatch(fetchEncounterRole(value)).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedTypes);
        done();
      });
    });
  });
