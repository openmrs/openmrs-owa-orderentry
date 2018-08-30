import orderSelectionReducer from '../../app/js/reducers/orderSelectionReducer';


describe('orderSelectionReducer Reducer', () => {
  describe('SET_SELECTED_ORDER', () => {
    it('set the state with provided data', () => {
      const initialState = {
        orderSelection: {
            currentOrderType: {},
            selectedOrder: {},
            activity: ''
          },
      };

      const action = {
        type: 'SET_SELECTED_ORDER',
        currentOrderType: { id: 1, type: 'some-type'},
        order: {
            drug: { display: 'Morphine'},
            uuid:'024b1459-f31d-46cb-8ad3-2a624c894e2c',
            dose:1,
            quantity:2,
            duration:2,
            auditInfo:{dateCreated:'2018-03-20 10:59:22'},
            drug:{display:'new drug'},
            doseUnits:{display:'drops'},
            frequency:{display:'twice a week'},
            route:{display:'reactally'},
            quantityUnits:{display:'drops'},
            durationUnits:{display:'weeks'},
            dosingType: "org.openmrs.FreeTextInstructions",
            status:'EDIT'
        },
        activity: 'EDIT'
      };
      const newState = orderSelectionReducer(initialState, action);
      expect(newState).toEqual({
          ...initialState,
          currentOrderType: action.currentOrderType,
          selectedOrder: action.order,
          activity: action.activity,
      });
    });
  });

  it('should return the state as default when action is not triggered',
    () => {
    const initialState = {
        orderSelection: {
            currentOrderType: {},
            selectedOrder: {},
            activity: ''
        },
    };
    const action = {
      type: 'SOME_OTHER_ACTION_TYPE',
    };

    const newState = orderSelectionReducer(undefined, action);
    expect(newState).toEqual(initialState.orderSelection);
  });
});
