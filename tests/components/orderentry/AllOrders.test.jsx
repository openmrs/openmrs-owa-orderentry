import React from 'react';
import AllOrders from '../../../app/js/components/orderEntry/AllOrders';

describe('AllOrders test-suite', () => {
  const wrapper = shallow(<AllOrders />)
  it('renders component properly', () => {
    expect(wrapper.exists()).toBeTruthy();
  })
})
