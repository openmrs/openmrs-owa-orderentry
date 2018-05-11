import {
    fetchEncounterRoleSuccess,
    fetchEncounterRole,
} from '../../app/js/actions/encounterRole';
import {
    FETCH_ENCOUNTER_ROLE_LOADING,
    FETCH_ENCOUNTER_ROLE_SUCCESS,
    SETTING_ENCOUNTER_ROLE_FAILURE,
  } from '../../app/js/actions/actionTypes';

const encounterRole = mockData.encounterRole;
const value = "Order Signer";

describe('encounterRole get action creators', () => {
    it('should create FETCH_ENCOUNTER_ROLE_SUCEESS action', () => {
        const store = mockStore({});
        const expectedAction = [ FETCH_ENCOUNTER_ROLE_SUCCESS ]
        store.dispatch(fetchEncounterRoleSuccess())
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedAction);
    });
});
describe('encounterRole get thunk', () => {
    beforeEach( () => {
        moxios.install();
    });
    afterEach( () => {
        moxios.uninstall();
    });

    it('should dispatch FETCH_ENCOUNTER_ROLE_SUCCESS on success with results', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounterrole?q=${value}`, {
            status: 200,
            response: encounterRole
        });
        const expectedActions = [
            FETCH_ENCOUNTER_ROLE_LOADING,
            FETCH_ENCOUNTER_ROLE_SUCCESS,
            FETCH_ENCOUNTER_ROLE_LOADING,
        ]
        await store.dispatch(fetchEncounterRole(value))
        .then(() => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done();
    });

    it('should dispatch FETCH_ENCOUNTER_ROLE_SUCCESS on success with empty result', async (done) => {
        const store = mockStore({});
        moxios.stubRequest(`${apiBaseUrl}/encounterrole?q=${value}`, {
            status: 200,
            response: {...encounterRole, ...encounterRole.data,
                results: []
            }
        });
        const expectedActions = [
            FETCH_ENCOUNTER_ROLE_LOADING,
            SETTING_ENCOUNTER_ROLE_FAILURE,
            FETCH_ENCOUNTER_ROLE_LOADING,
        ]
        await store.dispatch(fetchEncounterRole(value))
        .then(() => {
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
            SETTING_ENCOUNTER_ROLE_FAILURE,
            FETCH_ENCOUNTER_ROLE_LOADING,
        ]
        await store.dispatch(fetchEncounterRole(value))
        .then ( () => {
            const actionType = store.getActions().map(action => action.type);
            expect(actionType).toEqual(expectedActions);
        });
        done();
    });
});
