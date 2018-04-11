import React from 'react';

import StandardDose from '../../../../app/js/components/orderEntry/addForm/StandardDose';
import store from '../../../../app/js/redux-store';

describe('Test for Standard dose form', () => {
  it('should render component', () => {
    const wrapper = shallow(<StandardDose/>);
    expect(wrapper).toMatchSnapshot();
  });
});
