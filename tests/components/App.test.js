import React from 'react';

import App from '../../app/js/components/App';

describe('Test for routes', () => {
  it('run all the routes', () => {
    const wrapper = shallow(<App /> );
    expect(wrapper).toMatchSnapshot()
  });
});
