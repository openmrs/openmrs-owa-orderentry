import React from 'react';
import { shallow } from 'enzyme';
import ActiveOrders from '../../../app/js/components/labOrderEntry/ActiveOrders';

const props = {
  labOrderData: {
    uuid: 'fjhgfgfg',
    display: 'order-entry',
  },
  tests: ['hematocrit', 'hemogram']
}

const wrapper = shallow(<ActiveOrders {...props} />);

describe('Active orders component test-suite', () => {
  it('renders component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders data based on orders props parsed', () => {
    expect(wrapper.find('td').at(0).props().children).toEqual('order-entry')
    expect(wrapper.find('td').at(1).props().children).toEqual('hematocrit, hemogram')
  })
});
