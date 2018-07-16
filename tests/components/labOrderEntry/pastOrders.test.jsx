import React from 'react';
import { shallow } from 'enzyme';
import PastOrders from '../../../app/js/components/labOrderEntry/PastOrders';

const pastOrders = [
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

const wrapper = shallow(<PastOrders orders={pastOrders} />);
describe('Past orders component test-suite', () => {
  it('renders component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders data based on orders props parsed', () => {
    expect(wrapper.find('td').at(0).props().children).toEqual('25 May 2018')
    expect(wrapper.find('td').at(3).props().children).toEqual('Hemoatocrit blood test')
  });
});
