import React from 'react';
import Routes from '../app/js/routes';

let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Routes />);
  }
  return mountedComponent;
};

describe('Routes', () => {
  it('successfully rendered', () => {
    expect(getComponent()).toMatchSnapshot();
  });
});
