import { SET_ORDER_ACTION } from '../../app/js/actions/actionTypes';
import { setOrderAction } from '../../app/js/actions/orderAction';

describe('Set Order Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should dispatch an order action', async (done) => {
    const order = {
      orderNumber: '3'
    };

    const expectedActions = {
      SET_ORDER_ACTION,
      action: 'EDIT',
      orderNumber: order.orderNumber,
    }

    const store = mockStore({});

    await store.dispatch(setOrderAction('EDIT', order.orderNumber), () => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
