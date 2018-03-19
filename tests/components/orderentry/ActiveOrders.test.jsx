import React from 'react';

import ActiveOrders from '../../../app/js/components/orderEntry/ActiveOrders';
import store from '../../../app/js/redux-store';

describe('Test for Active orders', () => {
  it('should render component', () => {
    const wrapper = shallow(<ActiveOrders />  );
    expect(wrapper).toMatchSnapshot()
  });
});
