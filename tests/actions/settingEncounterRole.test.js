import {
    settingEncounterRoleSuccess,
    settingEncounterRoleFailure,
    getSettingEncounterRole,
} from '../../app/js/actions/settingEncounterRole';
import {
    SETTING_ENCOUNTER_ROLE_SUCCESS,
    SETTING_ENCOUNTER_ROLE_FAILURE,
    SETTING_ENCOUNTER_ROLE_LOADING,
    NETWORK_ERROR,
} from '../../app/js/actions/actionTypes';

jest.mock('../../app/js/actions/encounterRole', () => ({
    fetchEncounterRole: (value) => jest.fn()
}));

describe('Get the encounterRole configuration actions', () => {
    it('should create an action to store fetched configuration', () => {
        const configuration = 'order entry';
        const expectedAction = {
            type: SETTING_ENCOUNTER_ROLE_SUCCESS,
            configuration
        };
        expect(settingEncounterRoleSuccess(configuration)).toEqual(expectedAction);
    });

    it('should create an action to log failure', () => {
        const error = 'No network connection';
        const expectedAction = {
            type: SETTING_ENCOUNTER_ROLE_FAILURE,
            error
        };
        expect(settingEncounterRoleFailure(error)).toEqual(expectedAction);
    });

    describe('Get setting for encounterRole API call', () => {

        beforeEach(() => {
            moxios.install();
        });

        it('should dispatch `SETTING_ENCOUNTER_ROLE_SUCCESS` with results', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: { results: ['clinician'] },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_SUCCESS,
                NETWORK_ERROR,
                SETTING_ENCOUNTER_ROLE_LOADING,
            ];

            const store = mockStore({ setting: {} });

            return store.dispatch(getSettingEncounterRole()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it('should dispatch `SETTING_ENCOUNTER_ROLE_FAILURE` if empty results returned', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: { results: [] },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_FAILURE,
                SETTING_ENCOUNTER_ROLE_LOADING,
            ];

            const store = mockStore({ setting: {} });

            return store.dispatch(getSettingEncounterRole()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it('should dispatch `SETTING_ENCOUNTER_ROLE_FAILURE` after an error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.reject({
                    status: 401,
                    response: {
                        message: "Please login",
                    }
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_FAILURE,
                SETTING_ENCOUNTER_ROLE_LOADING,
            ];

            const store = mockStore({ setting: {} });

            return store.dispatch(getSettingEncounterRole()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it ('should dispatch `NETWORK_ERROR` when there is a network error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.reject({
                    status: 500,
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                NETWORK_ERROR,
                SETTING_ENCOUNTER_ROLE_LOADING
            ];

            const store = mockStore({ setting: {}});

            return store.dispatch(getSettingEncounterRole()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        afterEach(() => {
            moxios.uninstall();
        });
    });
});
