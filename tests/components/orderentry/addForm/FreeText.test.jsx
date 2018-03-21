import React from 'react';

import FreeText from '../../../../app/js/components/orderEntry/addForm/FreeText';
import store from '../../../../app/js/redux-store';

describe('Test for Free text form', () => {
  it('should render component', () => {
    const wrapper = shallow(<FreeText />  );
    expect(wrapper).toMatchSnapshot()
  });
});
