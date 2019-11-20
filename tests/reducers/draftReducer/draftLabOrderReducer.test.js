import draftLabOrderReducer from '../../../app/js/reducers/draftReducer/draftLabOrderReducer';
import {
  ADD_PANEL_TO_DRAFT_LAB_ORDER,
  ADD_TEST_TO_DRAFT_LAB_ORDER,
  TOGGLE_DRAFT_LAB_ORDER_URGENCY,
  DELETE_PANEL_FROM_DRAFT_LAB_ORDER,
  DELETE_TEST_FROM_DRAFT_LAB_ORDER,
  DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER,
} from '../../../app/js/actions/actionTypes';

const initialState = {
  draftDrugOrders: {
    orders: [],
  },
  draftLabOrders: {
    orders: [],
    selectedLabPanels: [],
    defaultTests: [],
    selectedTests: [],
    singleTests: [],
  },
};

const mockTests = [
  { uuid: '123Abc-456', name: 'Concept A', set: false },
  { uuid: '321Abc-146', name: 'Concept C', set: false },
  { uuid: '456Abc-123', name: 'Concept D', set: false },
];

const mockPanels = [
  {
    uuid: '888ya-kkk',
    name: 'Concept B',
    set: true,
    setMembers: [
      { uuid: '456Abc-123', name: 'Concept D', set: false },
      { uuid: '138Abc-466', name: 'Concept E', set: false },
      { uuid: '123Def-456', name: 'Concept F', set: false },
    ]
  },
  {
    uuid: '999yar-kkk',
    name: 'Concept E',
    set: true,
    setMembers: [
      { uuid: '421Abc-123', name: 'Concept G', set: false },
    ],
  },
];

const selectTests = (panel) => panel.map((item) => item[identifier]);

describe('Draft Lab Order Reducer', () => {
  it('should add a panel of tests to draftOrder', () => {
    const action = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    }
    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders.length).toEqual(1);
  });

  it('should remove a suite of panel tests when panel is unselected', () => {
    const previousAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };
    const nextAction = { ...previousAction, type: DELETE_PANEL_FROM_DRAFT_LAB_ORDER };
    const previousState = draftLabOrderReducer(initialState, previousAction);
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(0);
  });

  it('should add multiple test panels to the draftOrder', () => {
    const previousAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };
    const previousState = draftLabOrderReducer(initialState, previousAction);

    const nextAction = { ...previousAction, orders: mockPanels[1] };
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(2);
  });

  it('should delete a test panel from the draftOrder', () => {
    const previousAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };
    const previousState = draftLabOrderReducer(initialState, previousAction);

    const nextAction = { ...previousAction, type: DELETE_PANEL_FROM_DRAFT_LAB_ORDER };
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(0);
  });

  it('should delete a test panel from the draftOrder if there are already panels present', () => {
    const firstAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };

    const secondAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[1],
    };

    const lastAction = { ...firstAction, type: DELETE_PANEL_FROM_DRAFT_LAB_ORDER };

    const firstState = draftLabOrderReducer(initialState, firstAction);
    const secondState = draftLabOrderReducer(firstState, secondAction);
    const newState = draftLabOrderReducer(secondState, lastAction);

    const mockedDraft = mockPanels[1].setMembers;
    expect(newState.draftLabOrders.orders.length).toEqual(1);
  });

  it('should delete all tests from the draftOrder at once', () => {
    const firstAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };

    const secondAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[1],
    };

    const lastAction = { type: DELETE_ALL_ITEMS_IN_DRAFT_LAB_ORDER };

    const firstState = draftLabOrderReducer(initialState, firstAction);
    const secondState = draftLabOrderReducer(firstState, secondAction);
    const newState = draftLabOrderReducer(secondState, lastAction);

    expect(newState.draftLabOrders.orders.length).toEqual(0);
  });

  it('should add single tests not part of the panel to the draftorder', () => {
    const action = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };
    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders.length).toEqual(1);
    expect(newState.draftLabOrders.orders[0].name).toEqual(mockTests[0].name);
  });

  it('should not add a single tests to the draftorder if it is part of the panel and already in draft', () => {
    const action = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };
    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders.length).toEqual(1);
    expect(newState.draftLabOrders.orders[0].name).toEqual(mockTests[0].name);
  });

  it('should delete single tests from the draft order if they are already selected', () => {
    const lastAction = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };
    const nextAction = { ...lastAction, type: DELETE_TEST_FROM_DRAFT_LAB_ORDER };
    const previousState = draftLabOrderReducer(initialState, nextAction);

    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(0);
  });

  it('should not remove a single test from the draftorder if it was previously selected and also part of the panel of tests', () => {
    const previousAction = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };

    const nextAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };
    const previousState = draftLabOrderReducer(initialState, previousAction);
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(2);
  });

  it('should not delete a single test from the draftorder when a new panel is added', () => {
    const previousAction = {
      type: ADD_PANEL_TO_DRAFT_LAB_ORDER,
      orders: mockPanels[0],
    };

    const nextAction = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };
    const previousState = draftLabOrderReducer(initialState, previousAction);
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(2);
  });

  it('should delete a single test from the draft order if it is unchecked', () => {
    const previousAction = {
      type: ADD_TEST_TO_DRAFT_LAB_ORDER,
      order: mockTests[0],
    };

    const nextAction = {
      ...previousAction,
      type: DELETE_TEST_FROM_DRAFT_LAB_ORDER
    };
    const previousState = draftLabOrderReducer(initialState, previousAction);
    const newState = draftLabOrderReducer(previousState, nextAction);
    expect(newState.draftLabOrders.orders.length).toEqual(0);
  });

  it('should set the toggle of the urgency of a draft order to "ROUTINE" for "lab tests"', () => {
    const initialState = {
      draftLabOrders: {
        orders: [
          { uuid: 1, test: 'Hemoglobin', urgency: 'STAT' },
          { uuid: 2, test: 'Hematocrit', urgency: 'ROUTINE' },
          { uuid: 3, test: 'blood', urgency: 'ROUTINE' },
        ],
        defaultTests: [],
        selectedTests: [],
        singleTests: [],
        selectedLabPanels: [],
      }
    };
    const order = { orderUuid: 1, orderUrgency: 'ROUTINE' };
    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    };

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders[0]).toEqual({ uuid: 1, test: 'Hemoglobin', urgency: 'ROUTINE' })
  });

  it('should set the toggle of the urgency of a draft order to "STAT" for "lab tests"', () => {
    const initialState = {
      draftLabOrders: {
        orders: [
          { uuid: 1, test: 'Hemoglobin', urgency: 'STAT' },
          { uuid: 2, test: 'Hematocrit', urgency: 'ROUTINE' },
          { uuid: 3, test: 'blood' },
        ],
        defaultTests: [],
        selectedTests: [],
        singleTests: [],
        selectedLabPanels: [],
      },
    };

    const order = { orderUuid: 2, orderUrgency: 'STAT' };

    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    };

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders[1]).toEqual({ uuid: 2, test: 'Hematocrit', urgency: 'STAT' })
  });

  it('should set the toggle of the urgency of a draft order to "STAT" for "lab panels"', () => {
    const initialState = {
      draftLabOrders: {
        orders: [
          {
            uuid: 1,
            name: "Hemogram",
            labCategory: 1,
            urgency: "ROUTINE",
          },
        ],
        defaultTests: [],
        selectedTests: [],
        singleTests: [],
        selectedLabPanels: [],
      },
    };
    const expectedState = {
      uuid: 1,
      name: "Hemogram",
      labCategory: 1,
      urgency: "STAT",
    };
    const order = { orderUuid: 1, orderUrgency: 'STAT' };
    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    };

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders[0]).toEqual(expectedState)
  });

  it('should set the toggle of the urgency of a draft order to "ROUTINE" for "lab tests"', () => {
    const initialState = {
      draftLabOrders: {
        orders: [
          {
            uuid: 2,
            name: "Hemogram",
            labCategory: 1,
            urgency: "STAT",
          },
        ],
        defaultTests: [],
        selectedTests: [],
        singleTests: [],
        selectedLabPanels: [],
      },
    };
    const expectedState = {
      uuid: 2,
      name: "Hemogram",
      labCategory: 1,
      urgency: "ROUTINE",
    };

    const order = { orderUuid: 2, orderUrgency: 'ROUTINE' };


    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    };

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders[0]).toEqual(expectedState)
  });
  it('should not set the toggle of the urgency of a npn-existent draft order', () => {
    const initialState = {
      draftLabOrders: {
        orders: [
          {
            uuid: 2,
            name: "Hemogram",
            labCategory: 1,
            urgency: "STAT",
          },
        ],
        defaultTests: [],
        selectedTests: [],
        singleTests: [],
        selectedLabPanels: [],
      },
    };
    const expectedState = {
      uuid: 2,
      name: "Hemogram",
      labCategory: 1,
      urgency: "STAT",
    };

    const order = { orderUuid: 1, orderUrgency: 'STAT' };


    const action = {
      type: TOGGLE_DRAFT_LAB_ORDER_URGENCY,
      order
    };

    const newState = draftLabOrderReducer(initialState, action);
    expect(newState.draftLabOrders.orders[0]).toEqual(expectedState)
  });
});
