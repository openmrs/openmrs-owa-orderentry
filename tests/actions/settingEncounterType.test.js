import {
    settingEncounterTypeSuccess,
    settingEncounterTypeFailure,
    getSettingEncounterType,
} from '../../app/js/actions/settingEncounterType';
import {
    SETTING_ENCOUNTER_TYPE_SUCCESS,
    SETTING_ENCOUNTER_TYPE_FAILURE,
    FETCH_ENCOUNTER_TYPE_LOADING,
    SETTING_ENCOUNTER_TYPE_LOADING,
} from '../../app/js/actions/actionTypes';

describe ('Get the encounterType configuration actions', () => {
    it('should create an action to store fetched configuration', () => {
        const configuration = 'order entry';
        const expectedAction = {
            type: SETTING_ENCOUNTER_TYPE_SUCCESS,
            configuration
        };
        expect(settingEncounterTypeSuccess(configuration)).toEqual(expectedAction);
    });

    it('should create an action to log failure', () => {
        const error = 'No network connection';
        const expectedAction = {
            type: SETTING_ENCOUNTER_TYPE_FAILURE,
            error
        };
        expect(settingEncounterTypeFailure(error)).toEqual(expectedAction);
    });

    describe ('Get setting for encounterType API call', () => {

        beforeEach(() => {
            moxios.install();
        });

        it ('should dispatch `SETTING_ENCOUNTER_TYPE_SUCCESS` after sucessful fetching', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: {
                        results: 'order entry'
                    },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_TYPE_LOADING,
                SETTING_ENCOUNTER_TYPE_SUCCESS,
                FETCH_ENCOUNTER_TYPE_LOADING,
                SETTING_ENCOUNTER_TYPE_LOADING
            ];
            
            const store = mockStore({ setting: {}});

            return store.dispatch(getSettingEncounterType()).then(() => {
                const dispatchedActions = store.getActions();
                const dispatchedActionTypes = dispatchedActions.map(action => action.type);
                expect(dispatchedActionTypes).toEqual(expectedActions);
            });
        });

        it ('should dispatch `SETTING_ENCOUNTER_TYPE_SUCCESS` after an error', () => {
            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 401,
                    response: {
                        error: 'Not authorised'
                    },
                });
            });

            const expectedActions = [
                SETTING_ENCOUNTER_TYPE_LOADING,
                SETTING_ENCOUNTER_TYPE_FAILURE,
                SETTING_ENCOUNTER_TYPE_LOADING,
            ];
            
            const store = mockStore({ setting: {}});

            return store.dispatch(getSettingEncounterType()).then(() => {
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
