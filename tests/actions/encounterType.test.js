import fetchEncounterType from '../../app/js/actions/encounterType';
import {
    FETCH_ENCOUNTER_TYPE_LOADING,
    FETCH_ENCOUNTER_TYPE_SUCCESS,
} from '../../app/js/actions/actionTypes';

const { encounterTypeValid } = mockData;
const value = "order entry";

describe('fetchEncounterType action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
  
    it(`creates FETCH_ENCOUNTER_TYPE_LOADING and FETCH_ENCOUNTER_TYPE_SUCCESS
    action types upon success response from server`, async (done) => {
      moxios.stubRequest(
        `${apiBaseUrl}/encountertype?q=${value}`,
        {
          status: 200,
          response: encounterTypeValid,
        },
      );
  
      const expectedTypes = [
        FETCH_ENCOUNTER_TYPE_LOADING,
        FETCH_ENCOUNTER_TYPE_SUCCESS,
      ];
      const store = mockStore({});
  
      return store.dispatch(fetchEncounterType(value)).then(() => {
        const dispatchedActions = store.getActions();
        const actionTypes = dispatchedActions.map(action => action.type);
        expect(actionTypes).toEqual(expectedTypes);
        done();
      });
    });
  });
