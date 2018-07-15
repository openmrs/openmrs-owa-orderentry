import React from 'react';
import BreadCrumb from '../../../app/js/components/breadCrumb';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<BreadCrumb {...props} />);
  }
  return mountedComponent;
};

describe('Component: BreadCrumb', () => {
  beforeEach(() => {
    props = {
      patientId: 123,
      name:  'John.Doe',
      currentOrderTypeText: '',
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
