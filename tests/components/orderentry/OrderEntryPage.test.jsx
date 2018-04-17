import React from 'react';

import { OrderEntryPage } from '../../../app/js/components/orderEntry/OrderEntryPage';

const props = {
  fetchPatientCareSetting: jest.fn(),
}

describe('Test for Order entry page', () => {
  it('should render component', () => {
    const wrapper = shallow(<OrderEntryPage {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
