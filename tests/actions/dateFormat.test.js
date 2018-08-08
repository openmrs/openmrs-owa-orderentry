import {
  GET_DATE_SUCCESS,
  GET_DATE_LOADING
} from '../../app/js/actions/actionTypes';
import getDateFormat from '../../app/js/actions/dateFormat';

describe('getDateFormat action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it(`creates GET_DATE_LOADING and GET_DATE_SUCCESS
  action types upon success response from server`, async (done) => {
    const value = 'default';
    moxios.stubRequest(
      `${apiBaseUrl}/systemsetting?v=${value}&q=orderentryowa.dateAndTimeFormat`,
      {
        status: 200,
        response: {
          results: [
            {
              uuid: '23fdv-3rtg-we6t-wuy33',
              value: 'DD-MMM-YYYY HH:mm'
            }
          ]
        },
      },
    );

    const expectedTypes = [
      GET_DATE_LOADING,
      GET_DATE_SUCCESS,
    ];
    const store = mockStore({});

    return store.dispatch(getDateFormat(value)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});
