import React from 'react';

import { ActiveOrders } from '../../../app/js/components/orderEntry/ActiveOrders';

const props = {
  activeOrderAction: jest.fn(),
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

describe('Test for Inpatient Active orders', () => {
  it('should render component', () => {
    const wrapper = shallow(<ActiveOrders {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
