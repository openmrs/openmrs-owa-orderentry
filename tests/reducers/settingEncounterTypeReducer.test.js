import deepFreeze from 'deep-freeze';
import {
    settingEncounterTypeSuccess,
    settingEncounterTypeLoading,
    settingEncounterTypeFailure,
} from '../../app/js/actions/settingEncounterType';

import loading from '../../app/js/actions/loading';
import settingEncounterTypeReducer from '../../app/js/reducers/settingEncounterTypeReducer';


describe('Setting Encounter Type reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            settingEncounterType: '',
            isLoading: false,
            error: '',
        };
        deepFreeze(initialState);
    });

    it('should return the initial state', () => {
        const expectedState = settingEncounterTypeReducer(initialState, {});
        expect(initialState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_TYPE_LOADING`', () => {
        const status = true;
        const expectedState = {
            settingEncounterType: '',
            isLoading: true,
            error: ''
        };
        const actualState = settingEncounterTypeReducer(
            initialState,
            loading('SETTING_ENCOUNTER_TYPE', status)
        );
        expect(actualState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_TYPE_SUCCESS`', () => {
        const configuration = 'order entry';
        const expectedState = {
            settingEncounterType: 'order entry',
            isLoading: false,
            error: ''
        };
        const actualState = settingEncounterTypeReducer(
            initialState,
            settingEncounterTypeSuccess(configuration)
        );
        expect(actualState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_TYPE_FAILURE`', () => {
        const expectedState = {
            settingEncounterType: '',
            isLoading: false,
            error: 'Encounter Type property not found.'
        };
        const actualState = settingEncounterTypeReducer(
            initialState,
            settingEncounterTypeFailure('Encounter Type property not found.')
        );
        expect(actualState).toEqual(expectedState);
    });
});
