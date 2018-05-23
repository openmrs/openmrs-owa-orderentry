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
  addedOrder,
  addedOrderError,
  items,
  itemName,
  freeTextOrder,
  standardDoseOrder,
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
    addedOrder,
    addedOrderError,
    items,
    itemName,
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<DraftDataTable {...props} store={store} />);
  }
  return mountedComponent;
};

describe('onChange', () => {
  it('should change event', () => {
    const event = {
      target: { value: 'Allergic to something' },
    };

    const wrapper = getComponent();
    wrapper.instance().onChange(event);
    expect(wrapper.instance().state.discontinueReason).toBe('Allergic to something');
  });
});

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

describe('getUUID() method', () => {
  it('should call getUUID()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'getUUID');
    renderedComponent.getUUID(items, itemName);
    expect(renderedComponent.getUUID.calledOnce).toEqual(true);
  });
});

describe('showOrders() method', () => {
  it('should call showOrders() and no click events', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<DraftDataTable onClick={mockCallBack} {...props}/>);
    wrapper.find('#edit-draft-order').simulate('click');
    wrapper.find('#discard-draft-order').simulate('click');
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'showOrders');
    renderedComponent.showOrders(draftOrders);
    expect(renderedComponent.showOrders.calledOnce).toEqual(true);
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

describe('behaviour when adding an order fails', () => {
  it('should call addDrugOrder once with failure', () => {
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
      addedOrder: {},
      addedOrderError: { data : { error: { message: ''} } },
      items,
      itemName,
  };
    const event = { preventDefault: () => {} };
    beforeEach(() => {
      jest.spyOn(event, 'preventDefault');
    });
    const wrapper = shallow(<DraftDataTable {...props} />);
    const renderedComponent = wrapper.instance();
    sinon.spy(renderedComponent, 'addDrugOrder');
    renderedComponent.addDrugOrder(event);
    expect(renderedComponent.addDrugOrder.calledOnce).toEqual(true);
  });
});

describe('details rendered by draft table', () => {
  it('should render standard dose draft order details', () => {
    const newProps = {...props, draftOrders: [standardDoseOrder]};
    const { drugName, dosingUnit, dose, frequency, route, drugInstructions } = standardDoseOrder;
    const wrapper = shallow(<DraftDataTable {...newProps} store={store} />);
    wrapper.instance().showOrders(props.draftOrders);
    expect(wrapper.find('div').text()).toContain(
      `${drugName}: ${dose} ${dosingUnit}, ${frequency}, ${route} (${drugInstructions})`
    );
  });
  it('should render free text dose draft order details', () => {
    const newProps = {...props, draftOrders: [freeTextOrder]};
    const { drugName, drugInstructions } = standardDoseOrder;
    const wrapper = shallow(<DraftDataTable {...newProps} store={store} />);
    wrapper.instance().showOrders(props.draftOrders);
    expect(wrapper.find('div').text()).toContain(
      `${drugName}: "${drugInstructions}"`
    );
  });
});
