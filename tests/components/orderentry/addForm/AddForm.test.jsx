import React from 'react';

import { AddForm } from '../../../../app/js/components/orderEntry/addForm/AddForm';

const props = {
  getOrderEntryConfigurations: jest.fn(),
};

describe('Test for Adding an order', () => {
  it('should render component', () => {
    const wrapper = shallow(<AddForm {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
