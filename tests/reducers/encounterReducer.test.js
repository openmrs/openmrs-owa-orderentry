import * as types from '../../app/js/actions/actionTypes';

import encounterReducer from '../../app/js/reducers/encounterReducer';

import mockData from '../../__mocks__/mockData';

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
            type: types.FETCH_ENCOUNTER_TYPE_LOADING,
            status: true
        }
        const expected = {
            isLoading: true,
            encounterType: {},
            error: null,
        };
        const newSate = encounterReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
    it('should return encounterType', () => {
        const action = {
            type: types.FETCH_ENCOUNTER_TYPE_SUCCESS,
            encounterType
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
            type: types.FETCH_ENCOUNTER_TYPE_FAILURE,
            error: "User not logged in"
        }
        const expected = {
            isLoading: false,
            encounterType: {},
            error: "User not logged in"
        };
        const newSate = encounterReducer(initialState, action);
        expect(newSate).toEqual(expected);
    });
});
