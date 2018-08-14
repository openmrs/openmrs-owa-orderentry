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
        encounterRole: [],
      };
    it('should return loading as true', () => {
        const initialState = {};
        const action = {
            type: FETCH_ENCOUNTER_ROLE_LOADING,
        }
        const expected = {
            status: {
                loading: true,
            },
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return encounterRole', () => {
        const action = {
            type: FETCH_ENCOUNTER_ROLE_SUCCESS,
            data: encounterRole
        }
        const expected = {
            isLoading: false,
            error: null,
            encounterRole: encounterRole,
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return an error', () => {
        const action = {
            type: FETCH_ENCOUNTER_ROLE_FAILURE,
            payload: "User not logged in"
        }
        const expected = {
            isLoading: false,
            encounterRole: [],
            errorMessage: "User not logged in",
            isLoading: false,
            status: {
                error: true,
                loading: false
            }
        };
        const newSate = encounterRoleReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
});
