import React from 'react';

import { SearchAndAddOrder } from '../../../app/js/components/orderEntry/SearchAndAddOrder';

const props = {
  outpatientCareSetting:{
    uuid:{}
  },
  inpatientCareSetting: {
    uuid: {}
  },
  getPastOrders: jest.fn(),
  location:{
    search:()=>{}
  },
  fetchInpatientCareSetting: jest.fn(),
  fetchOutpatientCareSetting: jest.fn(),
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
  const order = {
    drug: {
      uuid: "",
      display: ""
    }
  }
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

describe('clearEditOrderNumber() method', () => {
  it('should call clearEditOrderNumber()', () => {
    const renderedComponent = getComponent().instance();
    sinon.spy(renderedComponent, 'clearEditOrderNumber');
    renderedComponent.clearEditOrderNumber();
    expect(renderedComponent.clearEditOrderNumber.calledOnce).toEqual(true);
    expect(getComponent().state('editOrderNumber')).toEqual('');
  });
});
