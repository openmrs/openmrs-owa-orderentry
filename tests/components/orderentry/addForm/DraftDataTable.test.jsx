import React from 'react';

import { DraftDataTable } from '../../../../app/js/components/orderEntry/addForm/DraftDataTable';

const {
  encounterRole,
  allConfigurations,
  sessionReducer,
  encounterType,
  orders,
  patient,
  careSetting,
  draftOrders,
} = mockData;

const props = {
    postDrugOrder: jest.fn(() => Promise.resolve(123)),
    getOrderEntryConfigurations: jest.fn(),
    fetchEncounterType: jest.fn(),
    fetchEncounterRole: jest.fn(),
    handleDiscardOneOrder: jest.fn(),
    handleDiscardAllOrders: jest.fn(),
    encounterRole: encounterRole.results,
    allConfigurations,
    sessionReducer,
    encounterType,
    orders,
    patient,
    careSetting,
    draftOrders,
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<DraftDataTable {...props} store={store} />);
  }
  return mountedComponent;
};

describe('Draft Data Table', () => {
  it('should render component', () => {
    const wrapper = getComponent();
    expect(props.handleDiscardOneOrder.mock.calls.length).toEqual(0);
    expect(wrapper).toMatchSnapshot()
  });
});

describe('addDrugOrder(event) method', () => {
  const event = { preventDefault: () => {} };
  beforeEach(() => {
    jest.spyOn(event, 'preventDefault');
  });
  it('should call addDrugOrder(event)', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'addDrugOrder');
    renderedComponent.addDrugOrder(event);
    expect(renderedComponent.addDrugOrder.calledOnce).toEqual(true);
  });
});
