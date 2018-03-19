import React from 'react';

import OrderEntryPage from '../../../app/js/components/orderEntry/OrderEntryPage';
import store from '../../../app/js/redux-store';

describe('Test for Order entry page', () => {
  it('should render component', () => {
    const wrapper = shallow(<OrderEntryPage />  );
    expect(wrapper).toMatchSnapshot()
  });
});
