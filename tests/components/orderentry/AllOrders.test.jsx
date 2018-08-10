import React from 'react';
import Orders from '../../../app/js/components/orderEntry/AllOrders'
import AllOrders from '../../../app/js/components/orderEntry/AllOrders';

describe('AllOrders test-suite', () => {
  const wrapper = shallow(<AllOrders />)
  it('renders component properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('OrdersTable').exists()).toBeTruthy();
  })
})
