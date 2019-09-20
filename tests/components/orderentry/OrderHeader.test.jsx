import React from 'react';
import { shallowWithIntl } from '@openmrs/react-components';
import OrderHeader from '../../../app/js/components/orderEntry/OrderHeader';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallowWithIntl(<OrderHeader {...props} />);
  }
  return mountedComponent;
};

describe('Component: OrderHeader', () => {
  beforeEach(() => {
    props = {
      status: 'iactive',
      orderable: 'some oderable',
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });
});
