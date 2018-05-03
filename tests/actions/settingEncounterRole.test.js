import {
    settingEncounterRoleSuccess,
    settingEncounterRoleFailure,
    getSettingEncounterRole,
} from '../../app/js/actions/settingEncounterRole';
import {
    SETTING_ENCOUNTER_ROLE_SUCCESS,
    SETTING_ENCOUNTER_ROLE_FAILURE,
    SETTING_ENCOUNTER_ROLE_LOADING,
} from '../../app/js/actions/actionTypes';

describe ('Get the encounterRole configuration actions', () => {
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

    describe ('Get setting for encounterRole API call', () => {

        beforeEach(() => {
            moxios.install();
        });

        it ('should dispatch `SETTING_ENCOUNTER_ROLE_SUCCESS` after sucessful fetching', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {
                        results: 'clinician'
                    },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_SUCCESS
            ];
            
            const store = mockStore({ setting: {}});

            return store.dispatch(getSettingEncounterRole()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it ('should dispatch `SETTING_ENCOUNTER_ROLE_SUCCESS` after an error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 401,
                    response: {
                        error: 'Unauthorised'
                    },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_LOADING,
                SETTING_ENCOUNTER_ROLE_FAILURE
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
