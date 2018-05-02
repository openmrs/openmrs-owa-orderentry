import {
    FETCH_ENCOUNTER_ROLE_FAILURE,
    FETCH_ENCOUNTER_ROLE_LOADING,
    FETCH_ENCOUNTER_ROLE_SUCCESS
} from '../../app/js/actions/actionTypes';

import encounterRoleReducer from '../../app/js/reducers/encounterRoleReducer';

const encounterRole = mockData.encounterRole;

describe('encounterRole reducer for get actions', () => {
    const initialState = {
        isLoading: false,
        encounterRole: {},
        error: null,
      };
    it('should return loading as true', () => {
        const initialState = {};
        const action = {
            type: FETCH_ENCOUNTER_ROLE_LOADING,
            status: true
        }
        const expected = {
            isLoading: true,
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return encounterRole', () => {
        const action = {
            type: FETCH_ENCOUNTER_ROLE_SUCCESS,
            encounterRole
        }
        const expected = {
            isLoading: false,
            encounterRole: encounterRole,
            error: null,
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return an error', () => {
        const action = {
            type: FETCH_ENCOUNTER_ROLE_FAILURE,
            error: "User not logged in"
        }
        const expected = {
            isLoading: false,
            encounterRole: {},
            error: "User not logged in"
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
});
