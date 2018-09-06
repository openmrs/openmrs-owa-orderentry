import toggleUrgency from '../../../app/js/actions/labOrders/toggleUrgency';

describe('toggleUrgency action creator test-suite', () => {
  it('dispatches TOGGLE_URGENCY action type', async (done) => {
    const expectedAction = [
      {
        type: 'TOGGLE_URGENCY',
        previousOrderId: 1,
        newOrderId: 2,
        newUrgency: 'STAT',
      }
    ];

    const store = mockStore({});
    await store.dispatch(toggleUrgency(1, 2, 'STAT'))
    const returnedAction = store.getActions();
    expect(expectedAction).toEqual(returnedAction);
    done();
  });
});
