import deepFreeze from 'deep-freeze';
import {
    settingEncounterRoleSuccess,
    settingEncounterRoleFailure,
} from '../../app/js/actions/settingEncounterRole';

import loading from '../../app/js/actions/loading'
import settingEncounterRoleReducer from '../../app/js/reducers/settingEncounterRoleReducer';


describe('Setting Encounter Tole reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            settingEncounterRole: '',
            isLoading: false,
            roleError: '',
        };
        deepFreeze(initialState);
    });

    it('should return the initial state', () => {
        const expectedState = settingEncounterRoleReducer(initialState, {});
        expect(initialState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_ROLE_LOADING`', () => {
        const configuration = 'clinician';
        const expectedState = {
            settingEncounterRole: '',
            isLoading: true,
            roleError: ''
        };
        const actualState = settingEncounterRoleReducer(
            initialState,
            loading('SETTING_ENCOUNTER_ROLE', true)
        );
        expect(actualState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_ROLE_SUCCESS`', () => {
        const configuration = 'clinician';
        const expectedState = {
            settingEncounterRole: 'clinician',
            isLoading: false,
            roleError: ''
        };
        const actualState = settingEncounterRoleReducer(
            initialState,
            settingEncounterRoleSuccess(configuration)
        );
        expect(actualState).toEqual(expectedState);
    });

    it('should handle `SETTING_ENCOUNTER_ROLE_FAILURE`', () => {
        const expectedState = {
            settingEncounterRole: '',
            isLoading: false,
            roleError: 'Encounter Role property not found.'
        };
        const actualState = settingEncounterRoleReducer(
            initialState,
            settingEncounterRoleFailure('Encounter Role property not found.')
        );
        expect(actualState).toEqual(expectedState);
    });

    it('should set the loading status for the encounter role',() => {
        const initialState = {};
        const action = {
          type: 'SETTING_ENCOUNTER_ROLE_LOADING',
          status:true
        };
        const newState =settingEncounterRoleReducer(initialState, action);
        expect(newState.isLoading).toEqual(action.status);
      });
});
