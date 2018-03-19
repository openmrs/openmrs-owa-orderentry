import React from 'react';

import ConnectedDraftTable, { DraftDataTable } from '../../../../app/js/components/orderEntry/addForm/DraftDataTable';

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

let props = {
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

  it('should truncate text longer than 155 characters', () => {
    props = {
      ...props,
      draftOrders: [
        {
          action: 'DISCONTINUE',
          drugName: '',
          drugInstructions: 'Take 2 tablets, with warm water or lime in the morning (before meal) and evening (after meal). Not to be taken with alcohol neither should ne taken by before or while driving',
          orderNumber: 3,
        }
      ]
    }
    mountedComponent = undefined;
    const wrapper = getComponent().find('.discontinue-drug em');
    let text = `: "${props.draftOrders[0].drugInstructions}`;
    expect(wrapper.props().children).toBe(`${text.substring(0,155)}...`);
  });
});

describe('addDrugOrder(event) method', () => {
  const event = { preventDefault: () => { } };
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
    const wrapper = shallow(<DraftDataTable onClick={mockCallBack} {...props} />);
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
      addedOrderError: { data: { error: { message: '' } } },
      items,
      itemName,
    };
    const event = { preventDefault: () => { } };
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

describe('behaviour when status is not DISCONTINUE', () => {
  it('should have edit button with no click events', () => {
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
      addedOrderError: { data: { error: { message: '' } } },
      items,
      itemName,
      status: 'NEW'
    };
    const mockCallBack = jest.fn();
    const wrapper = shallow(<DraftDataTable onClick={mockCallBack} {...props} />);
    wrapper.find('#edit-draft-order').simulate('click');
    wrapper.find('#discard-draft-order').simulate('click');
    expect(mockCallBack.mock.calls.length).toBe(0);
    expect(wrapper.find('#edit-draft-order').length).toBe(1);
    expect(wrapper.find('#discard-draft-order').length).toBe(1);
  });
});

describe('details rendered by draft table', () => {
  it('should render standard dose draft order details', () => {
    const newProps = {...props, draftOrders: [standardDoseOrder]};
    const { drugName, dosingUnit, dose, frequency, route, drugInstructions } = standardDoseOrder;
    const wrapper = shallow(<DraftDataTable {...newProps} store={store} />);
    wrapper.instance().showOrders(props.draftOrders);
    expect(wrapper.find('div').first().text()).toContain(
      `${drugName}: ${dose} ${dosingUnit}, ${frequency}, ${route} (${drugInstructions})`
    );
  });
  it('should render free text dose draft order details', () => {
    const newProps = {...props, draftOrders: [freeTextOrder]};
    const { drugName, drugInstructions } = standardDoseOrder;
    const wrapper = shallow(<DraftDataTable {...newProps} store={store} />);
    wrapper.instance().showOrders(props.draftOrders);
    expect(wrapper.find('div').first().text()).toContain(
      `${drugName}: "${drugInstructions}"`
    );
  });
});

describe('Connected DraftDataTable component', () => {
  it('component successfully rendered', () => {
    const store = mockStore({
      draftTableReducer: { draftOrders },
      drugSearchReducer: { selected: "para" },
      patientReducer: {
        patient,
      },
      encounterReducer: { encounterType },
      encounterRoleReducer: { encounterRole },
      addDrugOrderReducer: { addedOrder, error: addedOrderError },
      sessionReducer: {},
      allConfigurations: {}
    });
    const wrapper = shallow(<ConnectedDraftTable store={store} />);
    expect(wrapper.length).toBe(1);
  });
});

describe('unsaved draft table buttons', () => {
  it('should have two inputs for cancel and save buttons', () => {
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
      draftOrders: [
        { dose : ''},
        { dose : ''}
      ],
      addedOrder: {},
      addedOrderError: { data: { error: { message: '' } } },
      items,
      itemName,
      status: 'NEW'
    };
    const wrapper = shallow(<DraftDataTable {...props} />);
    expect(wrapper.find('input').length).toBe(2);
  });
});
