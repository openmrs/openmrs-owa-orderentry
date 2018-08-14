import {
  FETCH_LAB_CONCEPTS_LOADING,
  FETCH_LAB_CONCEPTS_SUCCESS,
  FETCH_LAB_CONCEPTS_FAILURE,
} from '../../actions/actionTypes';
import initialState from '../initialState';


const removeDuplicateTests = (tests) => {
  const uniqueTestIds = Array.from(new Set(tests.map(test => test.uuid)));
  const uniqueTests = [];
  tests.forEach((test) => {
    const testIndex = uniqueTestIds.indexOf(test.uuid);
    if (testIndex !== -1) {
      uniqueTests.push(test);
      uniqueTestIds.splice(testIndex, 1);
    }
  });
  return uniqueTests;
};

export default (state = initialState.labConcepts, action) => {
  switch (action.type) {
    case FETCH_LAB_CONCEPTS_SUCCESS: {
      const concepts = [...action.data.setMembers];
      const panels = concepts.filter(concept => concept.set);
      const panelTests = [].concat(...panels.map(panel => panel.setMembers));
      const standAloneTests = concepts.filter(concept => !concept.set);
      const allTests = [...standAloneTests, ...panelTests];
      return {
        ...state,
        concepts,
        conceptsAsTests: removeDuplicateTests(allTests),
        conceptsAsPanels: panels,
        standAloneTests,
        loading: false,
        error: null,
      };
    }
    case FETCH_LAB_CONCEPTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LAB_CONCEPTS_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
      };
    }
    default:
      return state;
  }
};
