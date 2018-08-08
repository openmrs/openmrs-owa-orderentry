import {
  FETCH_LAB_CONCEPTS_LOADING,
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
} from '../../../app/js/actions/actionTypes';
import initialState from '../../../app/js/reducers/initialState';
import labConceptsReducer from '../../../app/js/reducers/labOrders/labConceptsReducer';

const mockConcepts = [
  { uuid: '123Abc-456', name: 'Concept A', set: false },
  {
    uuid: '888ya-kkk',
    name: 'Concept B',
    set: true,
    setMembers: [
      { uuid: '456Abc-123', name: 'Concept D', set: false },
      { uuid: '138Abc-466', name: 'Concept E', set: false  },
      { uuid: '123Def-456', name: 'Concept F', set: false  },
    ]
  },
  { uuid: '321Abc-146', name: 'Concept C', set: false },
  { uuid: '456Abc-123', name: 'Concept D', set: false },
];

describe('Lab Concepts reducer', () => {
  it('should return the initial state', () => {
    const expectedState = labConceptsReducer(initialState.labConcepts, {});
    expect(initialState.labConcepts).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_CONCEPTS_SUCCESS`', () => {
    const mockAction = {
      type: FETCH_LAB_CONCEPTS_SUCCESS,
      data: { setMembers: mockConcepts }
    }
    const expectedState = {
      ...initialState.labConcepts,
      error: null,
      loading: false,
      concepts: mockConcepts,
      conceptsAsTests: [
        { uuid: '123Abc-456', name: 'Concept A', set: false },
        { uuid: '321Abc-146', name: 'Concept C', set: false },
        { uuid: '456Abc-123', name: 'Concept D', set: false },
        { uuid: '138Abc-466', name: 'Concept E', set: false  },
        { uuid: '123Def-456', name: 'Concept F', set: false  },
      ],
      conceptsAsPanels: [
        {
          uuid: '888ya-kkk',
          name: 'Concept B',
          set: true,
          setMembers: [
            { uuid: '456Abc-123', name: 'Concept D', set: false },
            { uuid: '138Abc-466', name: 'Concept E', set: false  },
            { uuid: '123Def-456', name: 'Concept F', set: false  },
          ]
        }
      ],
      standAloneTests: [
        { uuid: '123Abc-456', name: 'Concept A', set: false },
        { uuid: '321Abc-146', name: 'Concept C', set: false },
        { uuid: '456Abc-123', name: 'Concept D', set: false },
      ]
    };
    const actualState = labConceptsReducer(initialState.labConcepts, mockAction);
    expect(actualState).toEqual(expectedState);
  });

  it('should handle `FETCH_LAB_CONCEPTS_LOADING`', () => {
    const mockAction = { type: FETCH_LAB_CONCEPTS_LOADING };
    const expectedState = {
      ...initialState.labConcepts,
      error: null,
      loading: true,
      concepts: [],
      conceptsAsTests: [],
      conceptsAsPanels: [],
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
      ...initialState.labConcepts,
      errorMessage: error,
      error: true,
      loading: false,
      concepts: [],
      conceptsAsTests: [],
      conceptsAsPanels: [],
    };
    const actualState = labConceptsReducer(initialState.labConcepts, mockAction);
    expect(actualState).toEqual(expectedState);
  });
});
