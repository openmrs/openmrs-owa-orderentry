import drugSearchReducer from '../../app/js/reducers/drugSearchReducer';

const defaultDrugs = mockData.defaultDrugs.results;

const initialState = {
  drugs: [], selected: {}, error: null, loading: false,
};

describe('drugSearch Reducer', () => {
  describe('SEARCH_DRUGS_SUCCESS', () => {
    it('set the patient with provided data', () => {
      const action = {
        type: 'SEARCH_DRUGS_SUCCESS',
        drugs: defaultDrugs,
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.drugs).toEqual(defaultDrugs);
      expect(newState.selected).toEqual({});
      expect(newState.error).toEqual(null);
      expect(newState.loading).toEqual(false);
    });
  });

  describe('SEARCH_DRUGS_FAILURE', () => {
    it('set the patient with provided data', () => {
      const action = {
        type: 'SEARCH_DRUGS_FAILURE',
        error: 'Network error',
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.drugs).toEqual([]);
      expect(newState.selected).toEqual({});
      expect(newState.error).toEqual('Network error');
      expect(newState.loading).toEqual(false);
    });
  });

  describe('SEARCH_DRUGS_LOADING', () => {
    it('set the patient with provided data', () => {
      const action = {
        type: 'SEARCH_DRUGS_LOADING',
        status: true,
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.drugs).toEqual([]);
      expect(newState.selected).toEqual({});
      expect(newState.error).toEqual(null);
      expect(newState.loading).toEqual(true);
    });
  });
});
