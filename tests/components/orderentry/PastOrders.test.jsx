import React from 'react';

import PastOrders from '../../../app/js/components/orderEntry/PastOrders';
import store from '../../../app/js/redux-store';

describe('Test for Past orders', () => {
  it('should render component', () => {
    const wrapper = shallow(<PastOrders />  );
    expect(wrapper).toMatchSnapshot()
  });
});
