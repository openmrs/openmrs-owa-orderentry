import createLabOrder from '../../app/js/actions/createLabOrder';
import {
  SAVE_DRAFT_LAB_ORDER_LOADING,
  SAVE_DRAFT_LAB_ORDER_SUCCESS,
} from '../../app/js/actions/actionTypes';


describe('createLabOrder action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should save lab orders successfully', async (done) => {
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
    return store.dispatch(createLabOrder(order)).then(() => {
      const dispatchedActions = store.getActions();
      const actionTypes = dispatchedActions.map(action => action.type);
      expect(actionTypes).toEqual(expectedTypes);
      done();
    });
  });
});
