import React from 'react';
import Accordion from '../../../app/js/components/accordion';

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

  it('calls the onclick', () => {
    const renderedComponent = getComponent();
    const toggleViewLink = renderedComponent.find('.header a').first();
    toggleViewLink.simulate('click');
    expect(renderedComponent.state('isVisible')).toEqual(false);
  });
});
