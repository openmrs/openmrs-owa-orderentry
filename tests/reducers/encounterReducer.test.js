import {
    FETCH_ENCOUNTER_TYPE_FAILURE,
    FETCH_ENCOUNTER_TYPE_LOADING,
    FETCH_ENCOUNTER_TYPE_SUCCESS
} from '../../app/js/actions/actionTypes';

import encounterReducer from '../../app/js/reducers/encounterReducer';

const encounterType = mockData.encounterType;

describe('encounter reducer for get actions', () => {
    const initialState = {
        isLoading: false,
        encounterType: {},
        error: null,
      };
    it('should return loading as true', () => {
        const initialState = {};
        const action = {
            type: FETCH_ENCOUNTER_TYPE_LOADING,
        }
        const expected = {
            status: {
                loading: true
            },
        };
        const newSate = encounterReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return encounterType', () => {
        const action = {
            type: FETCH_ENCOUNTER_TYPE_SUCCESS,
            data: encounterType
        }
        const expected = {
            isLoading: false,
            encounterType: encounterType,
            error: null,
        };
        const newSate = encounterReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return an error', () => {
        const action = {
            type: FETCH_ENCOUNTER_TYPE_FAILURE,
            payload: "User not logged in"
        }
        const expected = {
            encounterType: {},
            errorMessage: "User not logged in",
            error: true,
            isLoading: false,
        };
        const newSate = encounterReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
});
