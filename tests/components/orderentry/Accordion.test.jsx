import React from 'react';
import Accordion from '../../../app/js/components/orderEntry/Accordion';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Accordion {...props} />);
  }
  return mountedComponent;
};

describe('Component: Accordion', () => {
  beforeEach(() => {
    props = {
      open: true,
      title: 'Header',
      children: [
        <h1>I love this</h1>
      ]
    };
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('toggles the content visibility when clicked', () => {
    const renderedComponent = getComponent();
    const toggleViewLink = renderedComponent.find('.accordion-link')
    toggleViewLink.simulate('click');
    expect(renderedComponent.state('isVisible')).toEqual(false);
  });
});
