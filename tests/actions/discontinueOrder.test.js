import {
  discontinueOrder,
  discontinueOrderFailure,
  discontinueOrderSuccess
} from '../../app/js/actions/discontinueOrder';
import loading from '../../app/js/actions/loading'
import {
  DISCONTINUE_ORDER_FAILURE,
  DISCONTINUE_ORDER_SUCCESS,
  DISCONTINUE_ORDER
} from '../../app/js/actions/actionTypes';


describe('Discontinue Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch a successful Discontinued Order', async (done) => {
    const payload = "3 tablet twice daily for 1 day";
    moxios.stubRequest(`${apiBaseUrl}/encounter`, {
      status: 201,
    });

    const expectedLoadingActions = `${DISCONTINUE_ORDER}_LOADING`

    const expectedActions = [
      expectedLoadingActions,
      DISCONTINUE_ORDER_SUCCESS
    ]

    const store = mockStore({});

    await store.dispatch(
      discontinueOrder(payload),
      loading(expectedLoadingActions, false)
    )
      .then(() => {
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedActions);
      });
    done();
  });

  it('should dispatch a failed Discontinued Order', async (done) => {
    const payload = {};
    moxios.stubRequest(`${apiBaseUrl}/encounter`, {
      status: 400,
      error: {
        response: "Bad request"
    }
    });

    const expectedActions = [
      `${DISCONTINUE_ORDER}_LOADING`,
      `${DISCONTINUE_ORDER}_LOADING`,
      DISCONTINUE_ORDER_FAILURE
    ]

    const store = mockStore({});

    await store.dispatch(discontinueOrder(payload))
      .then(() => {
        const actionType = store.getActions().map(action => action.type);
        expect(actionType).toEqual(expectedActions);
      });
    done();
  });
});
