import React from 'react';

import SearchAndAddOrder from '../../../app/js/components/orderEntry/SearchAndAddOrder';
import store from '../../../app/js/redux-store';

describe('Test for Searching and Adding an order', () => {
  it('should render component', () => {
    const wrapper = shallow(<SearchAndAddOrder />  );
    expect(wrapper).toMatchSnapshot()
  });
});
