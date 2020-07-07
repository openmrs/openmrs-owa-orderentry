import React from 'react';
import { shallowWithIntl } from '@openmrs/react-components';
import OrderHeader, { isCancellable, isEditable } from '../../../app/js/components/orderEntry/OrderHeader';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallowWithIntl(<OrderHeader {...props} />);
  }
  return mountedComponent;
};

describe('Component: OrderHeader', () => {
  beforeEach(() => {
    props = {
      status: 'iactive',
      orderable: 'some oderable',
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});


describe('isEditable', () => {

  // TODO
  xit('isEditable should return true for drug orders', () => {

    const order = {
      orderType: {
        "name": "Drug Order"
      },
    };

    expect(isEditable(order)).toBeTruthy();
  });

  it('isEditable should return false for lab orders', () => {

    const order = {
      orderType: {
        "name": "Test Order"
      },
    };

    expect(isEditable(order)).toBeFalsy();
  });

  it('isEditable should return false for unknown order type', () => {

    const order = {};

    expect(isEditable(order)).toBeFalsy();
  });

});

describe('isCancellable', () => {

  // TODO
  xit('isCancellable should return true for drug orders', () => {

    const order = {
      orderType: {
        "name": "Drug Order"
      },
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with no fulfiller status', () => {

    const order = {
      type: 'testorder',
      orderType: {
        "id": 3,
        "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        "display": "Test Order",
        "name": "Test Order"
      },
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with RECEIVED fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'RECEIVED',
      orderType: {
        "id": 3,
        "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        "display": "Test Order",
        "name": "Test Order"
      },
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with EXCEPTION fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'EXCEPTION',
      orderType: {
        "id": 3,
        "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        "display": "Test Order",
        "name": "Test Order"
      },
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return false for lab orders with IN_PROGRESS fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'IN_PROGRESS',
      orderType: {
        "id": 3,
        "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        "display": "Test Order",
        "name": "Test Order"
      },
    };

    expect(isCancellable(order)).toBeFalsy();
  });

  it('isCancellable should return false for lab orders with COMPLETED fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'COMPLETED',
      orderType: {
        "id": 3,
        "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
        "display": "Test Order",
        "name": "Test Order"
      },
    };

    expect(isCancellable(order)).toBeFalsy();
  })


});

