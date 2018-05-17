import React from 'react';

import connectedSearchAndAddOrder, {SearchAndAddOrder} from '../../../app/js/components/orderEntry/SearchAndAddOrder';

const { order } = mockData;
const props = {
  outpatientCareSetting:{
    uuid:{}
  },
  inpatientCareSetting: {
    uuid: {}
  },
  getPastOrders: jest.fn(),
  draftOrders: [],
  setOrderAction: jest.fn(),
  location:{
    search:()=>{}
  },
  order,
  selectDrugSuccess: jest.fn(),
  fetchInpatientCareSetting: jest.fn(),
  fetchOutpatientCareSetting: jest.fn(),
  deleteDraftOrder: jest.fn(),
  deleteAllDraftOrders: jest.fn(),
  drug: "abc-e345-thed-uuid2345",
};

let mountedComponent;
const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<SearchAndAddOrder {...props} />);
  }
  return mountedComponent;
};

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    expect(getComponent()).toMatchSnapshot()
  });
});

describe('onSelectDrug() method', () => {
  it('should call onSelectDrug()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onSelectDrug');
    renderedComponent.onSelectDrug("paracetamol");
    expect(renderedComponent.onSelectDrug.calledOnce).toEqual(true);
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(false);
  });
});

describe('onChange() method', () => {
  it('should call onChange()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'onChange');
    renderedComponent.onChange("paracetamol");
    expect(renderedComponent.onChange.calledOnce).toEqual(true);
    expect(getComponent().state('value')).toEqual("paracetamol");
    expect(getComponent().state('focused')).toEqual(true);
  });
});

describe('clearSearchField() method', () => {
  it('should call clearSearchField()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'clearSearchField');
    renderedComponent.clearSearchField();
    expect(renderedComponent.clearSearchField.calledOnce).toEqual(true);
    expect(getComponent().state('editDrugUuid')).toEqual("");
    expect(getComponent().state('editDrugName')).toEqual("");
    expect(getComponent().state('editOrder')).toEqual({});
  });
});

describe('handleEditActiveDrugOrder() method', () => {
  it('should call handleEditActiveDrugOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'handleEditActiveDrugOrder');
    renderedComponent.handleEditActiveDrugOrder(order);
    expect(renderedComponent.handleEditActiveDrugOrder.calledOnce).toEqual(true);
    expect(getComponent().state('editDrugUuid')).toEqual("");
    expect(getComponent().state('editDrugName')).toEqual("");
    expect(getComponent().state('editOrder')).toEqual(order);
  });
});

describe('removeOrder() method', () => {
  it('should call removeOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'removeOrder');
    renderedComponent.removeOrder();
    expect(renderedComponent.removeOrder.calledOnce).toEqual(true);
    expect(getComponent().state('editOrder')).toEqual({});
  });
});

describe('handleEditDraftOrder() method', () => {
  it('should call handleEditDraftOrder()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'handleEditDraftOrder');
    renderedComponent.handleEditDraftOrder(order);
    expect(renderedComponent.handleEditDraftOrder.calledOnce).toEqual(true);
    expect(getComponent().state('draftOrder')).toEqual(order);
  });
});


const setup = () => {
  const wrapper = shallow(<SearchAndAddOrder {...props} store={store} />);
  return { wrapper }
}

describe('onDelete', () => {
  it('should change event', () => {
    const event = true
    const { wrapper } = setup();

    wrapper.instance().onDelete(event);
  });
});

describe('handleDiscardOneOrder', () => {
  it('should be called on discarding one draft order', () => {
    const { wrapper } = setup();
    
    wrapper.instance().handleDiscardOneOrder(order);
  });
});

describe('handleDiscardAllOrders', () => {
  it('should be called on discarding all draft orders', () => {
    const { wrapper } = setup();

    wrapper.instance().handleDiscardAllOrders();
    expect(props.deleteAllDraftOrders.mock.calls.length).toEqual(1);
  });
});

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
