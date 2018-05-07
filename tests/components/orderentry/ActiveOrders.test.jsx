import React from 'react';

import { ActiveOrders } from '../../../app/js/components/orderEntry/ActiveOrders';

const props = {
  activeOrderAction: jest.fn(),
  addDraftOrder: jest.fn(),
  onDelete: jest.fn(),
  setOrderAction: jest.fn(),
  isDelete: false,
  drugOrder: {
    activeOrders: [],
    loading: false
  },
  location: {
    search: {}
  },
  careSetting: {
    uuid: 'c365e560-c3ec-11e3-9c1a-0800200c9a66'
  }
}

const setup = () => {
  const wrapper = shallow(<ActiveOrders {...props} store={store} />);
  return { wrapper }
}

describe('onClickDiscontinue', () => {
  it('should be called on discontinuing an active order', () => {
    const order = {
      drug: {
        display: 'panadol'
      },
      orderNumber: 3
    };

    const { wrapper } = setup();

    wrapper.instance().onClickDiscontinue(order);
  });
});

describe('Test for Inpatient Active orders', () => {
  it('should render component', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot()
  });
});
