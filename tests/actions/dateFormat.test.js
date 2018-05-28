import {
  GET_DATE_SUCCESS,
  GET_DATE_FAILURE
} from '../../app/js/actions/actionTypes';
import {
  getDateFormat, getDateFormatSuccess
} from '../../app/js/actions/dateFormat';

describe('dateFormat get action creators', () => {
  it('should create GET_DATE_SUCCESS action', () => {
    const store = mockStore({});
    const expectedAction = [GET_DATE_SUCCESS]
    store.dispatch(getDateFormatSuccess())
    const actionType = store.getActions().map(action => action.type);
    expect(actionType).toEqual(expectedAction);
  });
});

describe('Get date and time format actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const value = 'default';

  it('should dispatch getting date and time format successfuly', async (done) => {
    moxios.stubRequest(`${apiBaseUrl}/systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`, {
      status: 200,
      response: {
        results: [
          {
            uuid: '23fdv-3rtg-we6t-wuy33',
            value: 'DD-MMM-YYYY HH:mm'
          }
        ]
      }
    });

    const expectedActions = {
      GET_DATE_SUCCESS,
      dateFormat: 'DD-MMM-YYYY HH:mm',
    }

    const store = mockStore({});

    await store.dispatch(getDateFormat(value), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch getting date and time format successfuly with empty value', async (done) => {
    moxios.stubRequest(`${apiBaseUrl}/systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`, {
      status: 200,
      response: {
        results: [
          {
            uuid: '23fdv-3rtg-we6t-wuy33',
            value: null
          }
        ]
      }
    });

    const expectedActions = {
      GET_DATE_SUCCESS,
      dateFormat: '',
    }

    const store = mockStore({});

    await store.dispatch(getDateFormat(value), () => {
      const actionType = store.getActions().map(action => action.type);
      expect(actionType).toEqual(expectedActions);
    });
    done();
  });

  it('should throw an error when given an empty value', async (done) => {
    moxios.stubRequest(`${apiBaseUrl}/systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`, {
      status: 200,
      response: {
        results: [
          {
            uuid: '23fdv-3rtg-we6t-wuy33',
            value: null
          }
        ]
      }
    });

    const store = mockStore({});

    await store.dispatch(getDateFormat(value), () => {
      expect(store.getActions()).toThrowError(/^incomplete config$/);
    });
    done();
  });

  it('should dispatch error when gettig fate and time format fails', async (done) => {
    moxios.stubRequest(`${apiBaseUrl}/systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`, {
      status: 401,
      error: {
        message: "User not logged in"
      }
    });

    const expectedActions = [
      GET_DATE_FAILURE
    ]

    const store = mockStore({});

    await store.dispatch(getDateFormat(value))
      .then(() => {
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedActions);
      });
    done();
  });
});
