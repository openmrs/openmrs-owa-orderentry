import createOrder from '../../app/js/actions/createOrder';
import {
  SAVE_DRAFT_LAB_ORDER_LOADING,
  SAVE_DRAFT_LAB_ORDER_SUCCESS,
} from '../../app/js/actions/actionTypes';


describe('createOrder action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should save orders successfully', async (done) => {
      const order = {
        order: 'testorder',
        concept: 'fkhfffkfjhf'
      };
    moxios.stubRequest(`${apiBaseUrl}/encounter`, {
      status: 201,
    });

    const expectedTypes = [
      SAVE_DRAFT_LAB_ORDER_LOADING,
      SAVE_DRAFT_LAB_ORDER_SUCCESS,
    ];
    
    const store = mockStore({});
    return store.dispatch(createOrder(order)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});
