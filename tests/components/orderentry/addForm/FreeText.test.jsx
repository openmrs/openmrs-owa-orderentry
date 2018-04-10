import React from 'react';

import FreeText from '../../../../app/js/components/orderEntry/addForm/FreeText';
import store from '../../../../app/js/redux-store';

const props = {
  fields: {}
};

describe('Test for Free text form', () => {
  it('should render component', () => {
    const wrapper = shallow(<FreeText {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
