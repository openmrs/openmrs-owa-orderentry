import deepFreeze from 'deep-freeze';
import {
    settingEncounterRoleSuccess,
    settingEncounterRoleLoading,
    settingEncounterRoleFailure,
} from '../../app/js/actions/settingEncounterRole';
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
});
