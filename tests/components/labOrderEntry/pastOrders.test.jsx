import React from 'react';
import { shallow } from 'enzyme';
import PastOrders from '../../../app/js/components/labOrderEntry/PastOrders';

const pastOrders = [
  {
    uuid: '1',
    dateActivated: '2018-08-27T10:23:22.228Z',
    concept: {
      display: 'Hemoglobin blood test',
    }
  },
  {
    uuid: '2',
    dateActivated: '2018-08-27T10:23:22.228Z',
    concept: {
      display: 'Hematocrit blood test',
    }
  },
]

const wrapper = shallow(<PastOrders orders={pastOrders} />);
describe('Past orders component test-suite', () => {
  it('renders component', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders data based on orders props parsed', () => {
    expect(wrapper.find('td').at(1).props().children).toEqual('Hemoglobin blood test');
    expect(wrapper.find('td').at(3).props().children).toEqual('Hematocrit blood test');
    expect(wrapper.find('tr')).toHaveLength(3);
  });
});
