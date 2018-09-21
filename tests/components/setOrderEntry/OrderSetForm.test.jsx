import React from 'react';
import OrderSetForm from '../../../app/js/components/setsOrderEntry/OrderSetForm';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<OrderSetForm {...props} />);
  }
  return mountedComponent;
};

describe('Component: OrderSetForm', () => {
  beforeEach(() => {
    props = {};
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should hide the selectBox when changeSelectedOrderSet is called', () => {
    const renderedComponent = getComponent().instance();
    const { changeSelectedOrderSet } = renderedComponent;
    changeSelectedOrderSet();
    expect(renderedComponent.state.displaySets).toEqual('none');
  });
});
