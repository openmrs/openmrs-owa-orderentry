import React from 'react';
import TestsToolTip from '../../../app/js/components/labOrderEntry/TestsToolTip';

const props = {
  tests: [
    { uuid: 'asampleduuid1-234', display: 'sampleA' },
    { uuid: 'defmpleduuid1-566', display: 'sampleB' },
    { uuid: '5sampleduuid2-788', display: 'sampleC' }
  ]
};

describe('Component: TestsToolTip', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<TestsToolTip tests={props.tests} />);
    expect(wrapper).toMatchSnapshot();
  });
});
