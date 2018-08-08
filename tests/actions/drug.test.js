import {
  searchDrug,
  selectDrug
} from '../../app/js/actions/drug';

import {
  SEARCH_DRUGS_LOADING,
  SEARCH_DRUGS_SUCCESS,
  SELECT_DRUG,
} from '../../app/js/actions/actionTypes';

import mockData from '../../__mocks__/mockData';

const text = 'para';

describe('selectDrug action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should call `SELECT_DRUG` when drug is selected', async (done) => {
    const expectedAction = {
      type: SELECT_DRUG
    }
    const store = mockStore({});
    await store.dispatch(selectDrug('Paracentamol'));
    expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]));
    done();
  });
});

describe('searchDrug action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates SEARCH_DRUGS_LOADING and SEARCH_DRUGS_SUCCESS
  action types upon success response from server`, async (done) => {
    const { defaultDrugs } = mockData;
    moxios.stubRequest(
      `${apiBaseUrl}/drug?q=${text}`,
      {
        status: 200,
        response: defaultDrugs,
      },
    );

    const expectedTypes = [
      SEARCH_DRUGS_LOADING,
      SEARCH_DRUGS_SUCCESS,
    ];
    const store = mockStore({});

    return store.dispatch(searchDrug(text)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});
