import React from 'react';

import FreeText from '../../../../app/js/components/orderEntry/addForm/FreeText';

const props = {
  activateSaveButton: jest.fn(),
  fields: {},
  careSetting: {}
};

describe('Test for Free text form', () => {
  it('should render component', () => {
    const wrapper = shallow(<FreeText {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
