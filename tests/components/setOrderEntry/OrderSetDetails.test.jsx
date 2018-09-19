import React from 'react';
import OrderSetDetails from '../../../app/js/components/setsOrderEntry/OrderSetDetails';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<OrderSetDetails {...props} />);
  }
  return mountedComponent;
};

describe('Component: OrderSetDetails', () => {
  beforeEach(() => {
    props = {};
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
