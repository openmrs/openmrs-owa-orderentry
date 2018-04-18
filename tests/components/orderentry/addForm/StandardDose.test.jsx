import React from 'react';

import StandardDose from '../../../../app/js/components/orderEntry/addForm/StandardDose';

describe('Test for Standard dose form', () => {
  it('should render component', () => {
    const wrapper = shallow(<StandardDose/>);
    expect(wrapper).toMatchSnapshot();
  });
});
