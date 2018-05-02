import {
    fetchEncounterRoleSuccess,
    fetchEncounterRoleFailure,
    fetchEncounterRole,
} from '../../app/js/actions/encounterRole';
import {
    FETCH_ENCOUNTER_ROLE_LOADING,
    FETCH_ENCOUNTER_ROLE_SUCCESS,
    FETCH_ENCOUNTER_ROLE_FAILURE,
  } from '../../app/js/actions/actionTypes';

const encounterRole = mockData.encounterRole;

describe('encounterRole get action creators', () => {
    it('should create FETCH_ENCOUNTER_ROLE_SUCEESS action', () => {
        const store = mockStore({});
        const expectedAction = [ FETCH_ENCOUNTER_ROLE_SUCCESS ]
        store.dispatch(fetchEncounterRoleSuccess())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
    it('should create FETCH_ENCOUNTER_ROLE_FAILURE action', () => {
        const store = mockStore({});
        const expectedAction = [ FETCH_ENCOUNTER_ROLE_FAILURE ]
        store.dispatch(fetchEncounterRoleFailure())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
});
describe('encounterRole get thunk', () => {
    const value = "Order Signer";
    beforeEach( () => {
        moxios.install();
    });
    afterEach( () => {
        moxios.uninstall();
    });
    it('should dispatch FETCH_ENCOUNTER_ROLE_SUCEESS on success', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounterrole?q=${value}`, {
            status: 200,
            response: encounterRole
        });
        const expectedActions = [
            FETCH_ENCOUNTER_ROLE_LOADING,
            FETCH_ENCOUNTER_ROLE_SUCCESS
        ]
        await store.dispatch(fetchEncounterRole(value))
        .then ( () => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done();
    });
    it('should dispatch FETCH_ENCOUNTER_ROLE_FAILURE on fail', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounterrole?q=${value}`, {
            status: 401,
            error: {
                response: "User not logged in"
            }
        });
        const expectedActions = [
            FETCH_ENCOUNTER_ROLE_LOADING,
            FETCH_ENCOUNTER_ROLE_LOADING,
            FETCH_ENCOUNTER_ROLE_FAILURE
        ]
        await store.dispatch(fetchEncounterRole(value))
        .then ( () => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done();
    });
});
