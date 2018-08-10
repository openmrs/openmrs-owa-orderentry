import React from 'react';
import OrdersTable from '../../../app/js/components/orderEntry/OrdersTable'

describe('Orders component test-suite', () => {
  const wrapper = mount(<OrdersTable />)
  it('renders properly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Accordion').exists()).toBeTruthy();
  });
});
