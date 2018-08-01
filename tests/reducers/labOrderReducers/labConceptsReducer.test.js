import {
  FETCH_LAB_CONCEPTS_LOADING,
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
} from '../../../app/js/actions/actionTypes';
import initialState from '../../../app/js/reducers/initialState';
import labConceptsReducer from '../../../app/js/reducers/labOrders/labConceptsReducer';

describe('Lab Concepts reducer', () => {
  it('should return the initial state', () => {
    const expectedState = labConceptsReducer(initialState.labConcepts, {});
    expect(initialState.labConcepts).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_CONCEPTS_SUCCESS`', () => {
    const mockAction = {
      type: FETCH_LAB_CONCEPTS_SUCCESS,
      payload: { data: { setMembers: [{ name: 'I am not a true concept' }] } }
    }
    const expectedState = {
      error: null,
      loading: false,
      concepts: [{ name: 'I am not a true concept' }],
    };
    const actualState = labConceptsReducer(initialState.labConcepts, mockAction);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_CONCEPTS_LOADING`', () => {
    const mockAction = { type: FETCH_LAB_CONCEPTS_LOADING };
    const expectedState = {
      error: null,
      loading: true,
      concepts: [],
    };
    const actualState = labConceptsReducer(initialState.labConcepts, mockAction);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_CONCEPTS_FAILURE`', () => {
    const error = 'There was an error fetching the lab conepts';
    const mockAction = {
      type: FETCH_LAB_CONCEPTS_FAILURE,
      payload: error
    };
    const expectedState = {
      error: error,
      loading: false,
      concepts: [],
    };
    const actualState = labConceptsReducer(initialState.labConcepts, mockAction);
    expect(actualState).toEqual(expectedState);
  });
});
