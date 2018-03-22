import React from 'react';
import { shallow } from 'enzyme';
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
      name:  'John.Doe'
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
