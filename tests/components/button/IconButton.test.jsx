import React from 'react';
import IconButton from '../../../app/js/components/button/IconButton';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<IconButton {...props} />);
  }
  return mountedComponent;
};

describe('Component: IconButton', () => {
  beforeEach(() => {
    props = {
      iconClass: 'icon-remove',
      iconTitle: 'Header',
      onClick: jest.fn(),
      id:'icon-btn-anchor',
      icon: '&#x25B2;'
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('has a handler for click events', () => {
    const event = {
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    jest.spyOn(event, 'preventDefault');
    jest.spyOn(event, 'stopPropagation');
    const renderedComponent = getComponent();
    const anchor = renderedComponent.find('#icon-btn-anchor');
    const handleClick = jest.spyOn(props, 'onClick');
    anchor.simulate('click', event);
    expect(handleClick).toBeCalled();
    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });
});
