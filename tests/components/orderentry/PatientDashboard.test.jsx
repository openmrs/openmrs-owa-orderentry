import React from 'react';

import PatientDashboard from '../../../app/js/components/orderEntry/PatientDashboard';

describe('Test for Patient\'s Information', () => {
  it('should render component', () => {
    const wrapper = shallow(<PatientDashboard />  );
    expect(wrapper).toMatchSnapshot()
  });
});
