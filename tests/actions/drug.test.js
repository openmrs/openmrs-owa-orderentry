import { searchDrug } from '../../app/js/actions/drug';

import {
  SEARCH_DRUGS_FAILURE,
  SEARCH_DRUGS_LOADING,
  SEARCH_DRUGS_SUCCESS
} from '../../app/js/actions/actionTypes';

import mockData from '../../__mocks__/mockData';

const text = 'para';

describe('Drug Search actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('search drugs with success response', async (done) => {
    const { defaultDrugs } = mockData;

    let request = moxios.requests.mostRecent()
    moxios.stubRequest(`${apiBaseUrl}/drug?q=${text}`, {
      status: 200,
      response: defaultDrugs
    });
    const expectedActions = [
      {
        type: SEARCH_DRUGS_LOADING,
        status: true
      },
      {
        type: SEARCH_DRUGS_LOADING,
        status: false
      },
      {
        type: SEARCH_DRUGS_SUCCESS,
        drugs: defaultDrugs.results
      },
    ];
    const store = mockStore({});
    await store.dispatch(searchDrug(text))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('search drugs with server failure response', async (done) => {
    const errResp = {
      status: 422,
      response: { data: 'Server error' },
    };
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(errResp);
    });

    const expectedActions = [
      {
        type: SEARCH_DRUGS_LOADING,
        status: true
      },
      {
        type: SEARCH_DRUGS_LOADING,
        status: false
      },
      {
        type: SEARCH_DRUGS_FAILURE,
        error: {
          data: 'Server error'
        }
      }
    ];
    const store = mockStore({});
    await store.dispatch(searchDrug(text))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });

  it('search drugs with network failure response', async (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({});
    });

    const expectedActions = [
      {
        type: SEARCH_DRUGS_LOADING,
        status: true
      },
      {
        type: SEARCH_DRUGS_LOADING,
        status: false
      },
      {
        type: SEARCH_DRUGS_FAILURE,
        error: {
          data: { message: "Network connection error" }
        }
      }
    ];
    const store = mockStore({});
    await store.dispatch(searchDrug(text))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    done();
  });
});
