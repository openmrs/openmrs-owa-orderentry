import React from 'react';
import { shallow } from 'enzyme';
import ActiveOrders from '../../../app/js/components/labOrderEntry/ActiveOrders';

const orders = [
  {
    id: 1,
    date: '25 May 2018',
    details: 'Hemoglobin blood test',
  },
  {
    id: 2,
    date: '26 May 2018',
    details: 'Hemoatocrit blood test',
  },
]

const wrapper = shallow(<ActiveOrders orders={orders} />);

describe('Active orders component test-suite', () => {
  it('renders component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders data based on orders props parsed', () => {
    expect(wrapper.find('td').at(0).props().children).toEqual('25 May 2018')
    expect(wrapper.find('td').at(1).props().children).toEqual('Hemoglobin blood test')
    expect(wrapper.find('td').at(3).props().children).toEqual('26 May 2018')
    expect(wrapper.find('td').at(4).props().children).toEqual('Hemoatocrit blood test')
  })
});
