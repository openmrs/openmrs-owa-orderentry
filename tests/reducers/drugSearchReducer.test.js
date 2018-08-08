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
        data: {
          results: defaultDrugs,
        },
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
        payload: 'Network error',
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.drugs).toEqual([]);
      expect(newState.selected).toEqual({});
      expect(newState.errorMessage).toEqual('Network error');
      expect(newState.loading).toEqual(false);
    });
  });

  describe('SEARCH_DRUGS_LOADING', () => {
    it('set the patient with provided data', () => {
      const action = {
        type: 'SEARCH_DRUGS_LOADING',
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.drugs).toEqual([]);
      expect(newState.selected).toEqual({});
      expect(newState.error).toEqual(null);
      expect(newState.status.loading).toEqual(true);
    });
  });

  describe('SELECT_DRUG', () => {
    it('set the selected drug', () => {
      const initialState = {
        drugs: [{uuid:'d57f9b39-3bae-43ed-9f66-b3b728946f57'}],
        selected: {},
      };
      const action = {
        type: 'SELECT_DRUG',
        drug: 'd57f9b39-3bae-43ed-9f66-b3b728946f57',
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.selected).toEqual(initialState.drugs[0]);
    });

    it('set the selected drug to empty', () => {
      const initialState = {
        drugs: [{uuid:'d57f9b39-3bae-43ed-9f66-b3b728946f57'}],
        selected: '',
      };
      const action = {
        type: 'SELECT_DRUG',
        drug: 'xxxxxxxxxxxxxxx',
      };
      const newState = drugSearchReducer(initialState, action);
      expect(newState.selected).toEqual(initialState.selected);
    });
  });
});
